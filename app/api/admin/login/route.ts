import { NextResponse } from 'next/server';
import { adminConfigured, issueToken, passwordOk, setSession } from '@/lib/auth';

export const runtime = 'nodejs';

/**
 * Best-effort lockout: five wrong passwords from one IP locks that IP out
 * for fifteen minutes. State is per server instance, so it slows a casual
 * guesser rather than stopping a distributed one; a Vercel Firewall rate
 * limit on /api/admin/login is the durable layer.
 */
const MAX_FAILURES = 5;
const WINDOW_MS = 15 * 60 * 1000;
const failures = new Map<string, { count: number; resetAt: number }>();

function clientIp(req: Request) {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
}

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: 'BLOG_ADMIN_PASSWORD is not set on this deployment.' },
      { status: 503 }
    );
  }

  const ip = clientIp(req);
  const now = Date.now();
  const entry = failures.get(ip);
  if (entry && entry.resetAt > now && entry.count >= MAX_FAILURES) {
    return NextResponse.json(
      { error: 'Too many attempts. Try again later.' },
      { status: 429, headers: { 'Retry-After': String(Math.ceil((entry.resetAt - now) / 1000)) } }
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (!passwordOk(body.password)) {
    const current = entry && entry.resetAt > now ? entry : { count: 0, resetAt: now + WINDOW_MS };
    failures.set(ip, { count: current.count + 1, resetAt: current.resetAt });
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  failures.delete(ip);
  await setSession(await issueToken());
  return NextResponse.json({ ok: true });
}
