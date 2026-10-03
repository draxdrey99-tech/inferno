import { SITE, SITE_URL } from '@/lib/site';

export const revalidate = 86400;

/** RFC 9116. `Expires` is rolled forward a year from each regeneration. */
export function GET() {
  const expires = new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString();
  const body = [
    `Contact: mailto:${SITE.email}`,
    `Expires: ${expires}`,
    'Preferred-Languages: en',
    `Canonical: ${SITE_URL}/.well-known/security.txt`,
    '',
  ].join('\n');
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
