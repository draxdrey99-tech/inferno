import { listPublished } from '@/lib/blog';
import { dbConfigured } from '@/lib/db';
import { SERVICE_PAGES } from '@/lib/service-pages';
import { AUDIT_CHECKS, PROOF, QUICK_ANSWER, SITE, SITE_URL, WORK } from '@/lib/site';

export const revalidate = 3600;

/**
 * llms.txt: a plain-text map of the site for answer engines, following the
 * llmstxt.org convention. Everything in it is already on a public page;
 * this just removes the need for a crawler to infer structure from HTML.
 */
export async function GET() {
  let posts: { title: string; slug: string; excerpt: string }[] = [];
  if (dbConfigured()) {
    try {
      posts = await listPublished(50);
    } catch (err) {
      console.error('[llms.txt] post query failed', err);
    }
  }

  const lines = [
    `# ${SITE.name}`,
    '',
    `> ${QUICK_ANSWER}`,
    '',
    `Contact: ${SITE.email}. Book a free audit: ${SITE.calendly}`,
    '',
    '## How to work with us',
    '',
    `The first step is always a free, 30-minute audit of the account: ${SITE.calendly}. No fee, no obligation, and the findings are yours to keep either way.`,
    '',
    'The audit covers:',
    '',
    ...AUDIT_CHECKS.map((c) => `- ${c.title}`),
    '',
    'We quote after the audit, only if we can help. There is no flat rate or price list published because scope depends on what the audit finds.',
    '',
    '## Services',
    '',
    ...SERVICE_PAGES.map(
      (s) => `- [${s.title}](${SITE_URL}/services/${s.slug}): ${s.answer}`
    ),
    '',
    '## Results',
    '',
    'Screenshots of real, unattributed client Klaviyo accounts with the exact reporting window shown. Results vary by brand, list size, category and offer; these are individual accounts, not an average or a guarantee.',
    '',
    ...PROOF.map((p) => `- ${p.headline}, ${p.metric}, ${p.window}. ${p.note}`),
    '',
    `See the dashboards: ${SITE_URL}/#proof`,
    '',
    '## Email design examples',
    '',
    `${WORK.length} campaign and flow emails designed from scratch for named ecommerce clients: ${SITE_URL}/work`,
    '',
    ...WORK.map((w) => `- ${w.client}, ${w.title} (${w.type}): ${w.note}`),
    '',
    '## Blog',
    '',
    ...(posts.length
      ? posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.excerpt}`)
      : [`- Index: ${SITE_URL}/blog`]),
    '',
    '## Optional',
    '',
    `- [Privacy policy](${SITE_URL}/privacy)`,
    `- [Terms of service](${SITE_URL}/terms)`,
    `- [RSS feed](${SITE_URL}/rss.xml)`,
    `- [Sitemap](${SITE_URL}/sitemap.xml)`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
