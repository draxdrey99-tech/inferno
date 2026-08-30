import { listPublished } from '@/lib/blog';
import { dbConfigured } from '@/lib/db';
import { SITE, SITE_URL } from '@/lib/site';

export const revalidate = 3600;

const esc = (s: unknown) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export async function GET() {
  let items = '';

  if (dbConfigured()) {
    try {
      const posts = await listPublished(50);
      items = posts
        .map((p) => {
          const url = `${SITE_URL}/blog/${p.slug}`;
          const date = p.published_at
            ? new Date(p.published_at).toUTCString()
            : new Date().toUTCString();
          return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(p.excerpt)}</description>
      <pubDate>${date}</pubDate>
    </item>`;
        })
        .join('\n');
    } catch (err) {
      console.error('[rss] query failed', err);
    }
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(SITE.name)} Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>${esc(SITE.description)}</description>
    <language>en</language>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
