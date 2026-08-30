/**
 * Crawls a running site and asserts the SEO basics.
 *
 *   npm run seo:check                       # http://localhost:3000
 *   npm run seo:check https://infernoemails.com
 *
 * Exits non-zero if anything fails, so it can gate a deploy.
 */
const BASE = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');

const PATHS = [
  '/', '/services', '/services/klaviyo-email-marketing', '/services/email-design',
  '/services/email-deliverability', '/services/retention-strategy',
  '/work', '/about', '/contact', '/free-email-audit', '/blog', '/privacy', '/terms',
];

let failures = 0;
let warnings = 0;

const ok = (m) => console.log(`  \x1b[32m✓\x1b[0m ${m}`);
const bad = (m) => { failures++; console.log(`  \x1b[31m✗\x1b[0m ${m}`); };
const warn = (m) => { warnings++; console.log(`  \x1b[33m!\x1b[0m ${m}`); };

const attr = (html, re) => (html.match(re)?.[1] ?? '').trim();
const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
   .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'");

async function checkPage(path) {
  console.log(`\n\x1b[1m${path}\x1b[0m`);
  let res, html;
  try {
    res = await fetch(`${BASE}${path}`);
    html = await res.text();
  } catch (err) {
    bad(`request failed: ${err.message}`);
    return;
  }
  if (res.status !== 200) return bad(`HTTP ${res.status}`);

  const head = html.split('</head>')[0];

  // --- title
  const title = decode(attr(html, /<title>([\s\S]*?)<\/title>/));
  if (!title) bad('no <title>');
  else if (title.length > 60) warn(`title ${title.length} chars — will truncate: "${title}"`);
  else if (title.length < 15) warn(`title only ${title.length} chars: "${title}"`);
  else ok(`title (${title.length}) "${title}"`);

  // --- meta description
  const desc = decode(attr(head, /<meta name="description" content="([^"]*)"/));
  if (!desc) bad('no meta description');
  else if (desc.length > 165) warn(`description ${desc.length} chars — will truncate`);
  else if (desc.length < 70) warn(`description only ${desc.length} chars`);
  else ok(`description (${desc.length})`);

  // --- canonical
  const canon = attr(head, /<link rel="canonical" href="([^"]*)"/);
  if (!canon) bad('no canonical');
  else if (!canon.startsWith('http')) bad(`canonical is not absolute: ${canon}`);
  else ok(`canonical ${canon}`);

  // --- one h1
  const h1s = html.match(/<h1[\s>]/g) || [];
  if (h1s.length === 0) bad('no <h1>');
  else if (h1s.length > 1) bad(`${h1s.length} <h1> tags — should be exactly 1`);
  else ok('exactly one <h1>');

  // --- open graph
  const ogImage = attr(head, /<meta property="og:image" content="([^"]*)"/);
  if (!ogImage) bad('no og:image');
  else ok('og:image');
  if (!/<meta property="og:title"/.test(head)) bad('no og:title');
  if (!/<meta name="twitter:card"/.test(head)) bad('no twitter:card');

  // --- structured data
  const blocks = [...html.matchAll(
    /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g
  )].map((m) => m[1]);
  if (!blocks.length) bad('no JSON-LD');
  else {
    const types = [];
    for (const raw of blocks) {
      try {
        const parsed = JSON.parse(raw.replace(/\\u003c/g, '<'));
        const nodes = parsed['@graph'] || [parsed];
        for (const n of nodes) {
          const t = n['@type'];
          types.push(...(Array.isArray(t) ? t : [t]));
        }
      } catch (err) {
        bad(`JSON-LD does not parse: ${err.message}`);
      }
    }
    ok(`JSON-LD: ${types.filter(Boolean).join(', ')}`);
  }

  // --- images without alt
  const imgs = html.match(/<img\b[^>]*>/g) || [];
  const noAlt = imgs.filter((t) => !/\balt=/.test(t));
  if (noAlt.length) bad(`${noAlt.length} <img> without alt`);
  else if (imgs.length) ok(`${imgs.length} images, all with alt`);

  // --- robots
  const robots = attr(head, /<meta name="robots" content="([^"]*)"/);
  if (/noindex/.test(robots)) warn(`noindex on a public page: ${robots}`);
}

async function checkSiteFiles() {
  console.log('\n\x1b[1msite files\x1b[0m');

  const r = await fetch(`${BASE}/robots.txt`);
  const robotsTxt = await r.text();
  if (r.status !== 200) bad('robots.txt missing');
  else if (!/Sitemap:/i.test(robotsTxt)) bad('robots.txt has no Sitemap line');
  else if (!/Disallow: \/admin/.test(robotsTxt)) warn('robots.txt does not disallow /admin');
  else ok('robots.txt');

  const s = await fetch(`${BASE}/sitemap.xml`);
  const xml = await s.text();
  if (s.status !== 200) return bad('sitemap.xml missing');
  const locs = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  if (!locs.length) return bad('sitemap.xml has no URLs');
  ok(`sitemap.xml — ${locs.length} URLs`);

  // Every sitemap URL must actually resolve. A sitemap full of 404s is worse
  // than no sitemap at all.
  let broken = 0;
  for (const loc of locs) {
    const path = loc.replace(/^https?:\/\/[^/]+/, '') || '/';
    const res = await fetch(`${BASE}${path}`, { method: 'HEAD' });
    if (res.status !== 200) { broken++; bad(`sitemap URL ${res.status}: ${path}`); }
  }
  if (!broken) ok('every sitemap URL returns 200');

  const rss = await fetch(`${BASE}/rss.xml`);
  if (rss.status !== 200) bad('rss.xml missing');
  else ok('rss.xml');

  const admin = await fetch(`${BASE}/admin`);
  const adminHtml = await admin.text();
  if (!/noindex/.test(adminHtml)) bad('/admin is not noindex');
  else ok('/admin is noindex');

  const notFound = await fetch(`${BASE}/definitely-not-a-real-page-xyz`);
  if (notFound.status !== 404) bad(`unknown URL returned ${notFound.status}, expected 404`);
  else ok('unknown URLs return 404');
}

console.log(`\x1b[1mSEO check — ${BASE}\x1b[0m`);
for (const p of PATHS) await checkPage(p);
await checkSiteFiles();

console.log(
  `\n${failures ? '\x1b[31m' : '\x1b[32m'}${failures} failure(s)\x1b[0m, ` +
  `\x1b[33m${warnings} warning(s)\x1b[0m\n`
);
process.exit(failures ? 1 : 0);
