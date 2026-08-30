/**
 * Mechanical slice of the anti-slop Pre-Flight Check, run against the
 * rendered HTML of a running site.
 *
 *   npm run taste:check                       # http://localhost:3000
 *   npm run taste:check https://infernoemails.com
 *
 * Only the rules that can be verified by machine are here. The judgement
 * calls (layout-family variety, motion motivation, copy quality) still need
 * a human eye.
 */
const BASE = (process.argv[2] || 'http://localhost:3000').replace(/\/$/, '');

const PATHS = [
  '/', '/blog', '/privacy', '/terms',
];

let fail = 0, warn = 0;
const ok = (m) => console.log(`  \x1b[32m✓\x1b[0m ${m}`);
const bad = (m) => { fail++; console.log(`  \x1b[31m✗\x1b[0m ${m}`); };
const soft = (m) => { warn++; console.log(`  \x1b[33m!\x1b[0m ${m}`); };

/** Visible text only: strip head, script, style and all tags. */
function visibleText(html) {
  return html
    .replace(/<head[\s\S]*?<\/head>/gi, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ');
}

// One label per intent, site-wide. Collected across pages, asserted at the end.
const ctaLabels = new Map();
const INTENTS = [
  { name: 'audit', re: /\b(free\s+audit|email\s+audit|audit)\b/i },
  { name: 'contact', re: /\b(contact|get in touch|talk to us|let'?s talk|reach out|send us a note)\b/i },
  { name: 'portfolio', re: /\b(see the work|view all work|view work|browse|see our work|our work)\b/i },
];

async function checkPage(path) {
  console.log(`\n\x1b[1m${path}\x1b[0m`);
  const res = await fetch(`${BASE}${path}`);
  if (res.status !== 200) return bad(`HTTP ${res.status}`);
  const html = await res.text();
  const text = visibleText(html);

  // 9.G em-dash ban
  const dashes = (text.match(/[—–]/g) || []).length;
  if (dashes) bad(`${dashes} em/en dash(es) in visible copy`);
  else ok('zero em-dashes');

  // 4.7 eyebrow budget: one per three sections, hero counts as one
  const sections = (html.match(/<section\b/g) || []).length;
  const eyebrows = (html.match(/class="[^"]*\beyebrow\b/g) || []).length;
  const budget = Math.max(1, Math.ceil(sections / 3));
  if (eyebrows > budget) bad(`${eyebrows} eyebrows across ${sections} sections (budget ${budget})`);
  else ok(`${eyebrows} eyebrow(s), ${sections} sections, budget ${budget}`);

  // 9.F section-number eyebrows
  if (/\b0\d\s*[—–\-/·]\s*[A-Za-z]/.test(text)) bad('section-number eyebrow pattern found');

  // 4.11 theme lock: no light-ground utility classes on a dark page
  const light = html.match(/\b(bg-paper[\w-]*|on-paper|bg-white(?!\/)|bg-amber-\d+|bg-zinc-50)\b/g) || [];
  const realLight = light.filter((c) => c !== 'bg-white');
  if (realLight.length) bad(`light-theme classes on a dark page: ${[...new Set(realLight)].join(', ')}`);
  else ok('theme lock holds');

  // one h1
  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) bad(`${h1} <h1> tags`);
  else ok('exactly one h1');

  // 4.4 shape lock: only the three documented radii
  const radii = [...new Set(html.match(/rounded-(?:none|full|xl|lg|sm|md|2xl|3xl)/g) || [])];
  const allowed = new Set(['rounded-full', 'rounded-xl', 'rounded-lg']);
  const stray = radii.filter((r) => !allowed.has(r));
  if (stray.length) soft(`radii outside the documented scale: ${stray.join(', ')}`);
  else ok(`radii: ${radii.join(', ') || 'none'}`);

  // 9.F hand-rolled icon SVG paths
  const paths = (html.match(/<path\b/g) || []).length;
  const svgs = (html.match(/<svg\b/g) || []).length;
  if (svgs && paths / svgs > 6) soft(`${paths} paths across ${svgs} svgs, check for hand-rolled art`);

  // 4.5 collect CTA labels
  for (const m of html.matchAll(/class="[^"]*\bbtn\b[^"]*"[^>]*>([\s\S]{0,80}?)</g)) {
    const label = m[1].replace(/<[^>]+>/g, '').trim();
    if (!label) continue;
    for (const it of INTENTS) {
      if (it.re.test(label)) {
        if (!ctaLabels.has(it.name)) ctaLabels.set(it.name, new Set());
        ctaLabels.get(it.name).add(label);
      }
    }
  }

  // 6.F viewport units
  if (/h-screen/.test(html)) bad('h-screen used, expected min-h-[100dvh]');
}

console.log(`\x1b[1mAnti-slop check — ${BASE}\x1b[0m`.replace('—', ':'));
for (const p of PATHS) await checkPage(p);

console.log('\n\x1b[1mCTA intent labels (site-wide)\x1b[0m');
for (const [intent, labels] of ctaLabels) {
  if (labels.size > 1) bad(`"${intent}" has ${labels.size} labels: ${[...labels].join(' | ')}`);
  else ok(`"${intent}": ${[...labels][0]}`);
}

console.log(
  `\n${fail ? '\x1b[31m' : '\x1b[32m'}${fail} failure(s)\x1b[0m, \x1b[33m${warn} warning(s)\x1b[0m\n`
);
process.exit(fail ? 1 : 0);
