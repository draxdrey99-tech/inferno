import { NextResponse } from 'next/server';
import { adminConfigured, issueToken, passwordOk, setSession } from '@/lib/auth';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return NextResponse.json(
      { error: 'BLOG_ADMIN_PASSWORD is not set on this deployment.' },
      { status: 503 }
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  if (!passwordOk(body.password)) {
    return NextResponse.json({ error: 'Incorrect password.' }, { status: 401 });
  }

  await setSession(await issueToken());
  return NextResponse.json({ ok: true });
}
