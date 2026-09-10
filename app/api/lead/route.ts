import { NextResponse } from 'next/server';
import { db, dbConfigured } from '@/lib/db';
import { notifyLead } from '@/lib/notify';

export const runtime = 'nodejs';

const MAX = 4000;
const clip = (v: unknown, n = 300) => String(v ?? '').trim().slice(0, n);

/** Deliberately permissive — a valid-looking address, not RFC 5322. */
const looksLikeEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot: only bots fill a field that is positioned off-screen. Return
  // 200 so they get no signal that the submission was discarded.
  if (clip(body.company_website)) {
    return NextResponse.json({ ok: true });
  }

  const name = clip(body.name, 120);
  const email = clip(body.email, 200).toLowerCase();
  const company = clip(body.company, 160);
  const website = clip(body.website, 300);
  const phone = clip(body.phone, 60);
  const message = clip(body.message, MAX);
  const source = clip(body.source, 80) || 'free-email-audit';

  if (!name) return NextResponse.json({ error: 'Please add your name.' }, { status: 400 });
  if (!looksLikeEmail(email)) {
    return NextResponse.json({ error: 'Please add a valid business email.' }, { status: 400 });
  }

  // Without a database the form must not appear to succeed silently.
  if (!dbConfigured()) {
    console.error('[lead] DATABASE_URL missing — submission dropped:', {
      name, email, company, website,
    });
    return NextResponse.json(
      { error: 'Our form is temporarily unavailable. Please email hello@infernoemails.com.' },
      { status: 503 }
    );
  }

  try {
    const sql = db();
    await sql`
      INSERT INTO leads (name, email, company, website, phone, message, source, user_agent)
      VALUES (${name}, ${email}, ${company}, ${website}, ${phone}, ${message}, ${source},
              ${clip(req.headers.get('user-agent'), 400)})
    `;
    // The lead is saved. Tell the team, but never let a mail problem turn a
    // stored lead into an error on screen.
    await notifyLead({ name, email, company, website, phone, message, source });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[lead] insert failed', err);
    return NextResponse.json(
      { error: 'Could not save that. Please email hello@infernoemails.com.' },
      { status: 500 }
    );
  }
}
