import { NextResponse } from 'next/server';

import { analyseSpf, cleanDomain, validDomain } from '@/lib/spf';

export const runtime = 'nodejs';

/* Light per instance rate limit. Enough to stop casual abuse; the platform
   firewall is the real control. */
const hits = new Map<string, { n: number; t: number }>();
const WINDOW = 60_000;
const MAX = 20;

export async function GET(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || now - h.t > WINDOW) hits.set(ip, { n: 1, t: now });
  else if (++h.n > MAX) return NextResponse.json({ error: 'Too many checks. Try again in a minute.' }, { status: 429 });
  if (hits.size > 2000) for (const [k, v] of hits) if (now - v.t > WINDOW) hits.delete(k);

  const domain = cleanDomain(new URL(req.url).searchParams.get('domain') || '');
  if (!validDomain(domain)) return NextResponse.json({ error: 'Enter a domain such as example.com.' }, { status: 400 });
  const result = await analyseSpf(domain);
  return NextResponse.json(result, { headers: { 'Cache-Control': 'no-store' } });
}
