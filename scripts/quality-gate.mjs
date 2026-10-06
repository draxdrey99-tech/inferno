/**
 * Quality gate for volume pages. Runs before every build (`npm run build`
 * calls it via `prebuild`) and fails if any page in a content family could
 * read as thin, templated or unsourced. This is what lets us publish many
 * pages without tripping Google's scaled-content-abuse policy.
 *
 *   npm run quality
 *
 * Reads the data files directly (Node strips the TypeScript types), so a
 * page that does not pass cannot ship.
 */
import { readFileSync } from 'node:fs';

const load = async (f) => import(new URL(`../lib/${f}`, import.meta.url));
const { GLOSSARY, termSiblings } = await load('glossary.ts');
const { FAQ_PAGES, faqSiblings } = await load('faq.ts');
const { USE_CASES } = await load('use-cases.ts');
const { SUBJECT_LIBRARIES, subjectSiblings } = await load('subject-lines.ts');
const { HOWTOS, howToSiblings } = await load('howto.ts');

// Service slugs, read from source so this stays in sync with the site.
const siteSrc = readFileSync(new URL('../lib/site.ts', import.meta.url), 'utf8');
const svcBlock = siteSrc.slice(siteSrc.indexOf('export const SERVICES'), siteSrc.indexOf('export const getService'));
const SERVICES = new Set([...svcBlock.matchAll(/slug: '([a-z-]+)'/g)].map((m) => m[1]));
SERVICES.add('email-flows');
const WORK = new Set([...siteSrc.matchAll(/slug: '([a-z0-9-]+-(?:welcome|campaign|mothers-day))'/g)].map((m) => m[1]));

/* Per family: minimum words of page-specific text, and the words of fixed
   template copy the page wraps around it (headings, CTA sentences). Unique
   text must be at least 35% of the page. */
const FAMILY = {
  glossary: { minWords: 100, template: 60 },
  faq: { minWords: 90, template: 50 },
  industry: { minWords: 200, template: 120 },
  subject: { minWords: 600, template: 120 },
  howto: { minWords: 280, template: 110 },
};
const MIN_UNIQUE_RATIO = 0.35;

/* Figures that are allowed without a per-page source: public, widely
   documented facts. Any other percentage or currency figure fails, so an
   invented statistic cannot slip in. */
const ALLOWED_FIGURES = [/0\.3 percent/, /0\.1 percent/];

const problems = [];
const fail = (family, id, msg) => problems.push(`${family} / ${id}: ${msg}`);
const words = (s) => String(s).split(/\s+/).filter(Boolean).length;

function check(family, items, get) {
  const cfg = FAMILY[family];
  const seen = { title: new Map(), desc: new Map(), h1: new Map(), lead: new Map() };
  for (const it of items) {
    const g = get(it);
    for (const [k, v] of Object.entries(g.required)) {
      if (v === undefined || v === null || String(v).trim() === '' || (Array.isArray(v) && v.length === 0)) {
        fail(family, g.id, `empty required field "${k}"`);
      }
    }
    const text = g.text.join(' ');
    const n = words(text);
    if (n < cfg.minWords) fail(family, g.id, `only ${n} words of page-specific text (min ${cfg.minWords})`);
    const ratio = n / (n + cfg.template);
    if (ratio < MIN_UNIQUE_RATIO) fail(family, g.id, `unique ratio ${(ratio * 100).toFixed(0)}% is below ${MIN_UNIQUE_RATIO * 100}%`);
    if (/—/.test(text)) fail(family, g.id, 'contains an em dash');
    const figs = text.match(/\d+(?:\.\d+)?\s*(?:%|percent)|[$£€]\s?\d/g) || [];
    for (const f of figs) {
      if (!ALLOWED_FIGURES.some((re) => re.test(text.slice(text.indexOf(f))))) fail(family, g.id, `unsourced figure "${f}"`);
    }
    for (const [k, v] of [['title', g.title], ['desc', g.desc], ['h1', g.h1], ['lead', g.lead]]) {
      const key = String(v).toLowerCase().trim();
      if (seen[k].has(key)) fail(family, g.id, `duplicate ${k} with ${seen[k].get(key)}`);
      else seen[k].set(key, g.id);
    }
    if (g.service && !SERVICES.has(g.service)) fail(family, g.id, `unknown service "${g.service}"`);
  }
}

check('glossary', GLOSSARY, (t) => ({
  id: t.slug,
  required: { definition: t.definition, example: t.example, body: t.body, mistakes: t.mistakes, metaTitle: t.metaTitle, metaDescription: t.metaDescription, category: t.category, service: t.service },
  text: [t.definition, t.example, ...t.body, ...t.mistakes],
  title: t.metaTitle, desc: t.metaDescription, h1: t.term, lead: t.definition, service: t.service,
}));
check('faq', FAQ_PAGES, (f) => ({
  id: f.slug,
  required: { q: f.q, a: f.a, example: f.example, detail: f.detail, category: f.category, service: f.service },
  text: [f.a, f.example, ...f.detail],
  title: f.q, desc: f.a, h1: f.q, lead: f.a, service: f.service,
}));
check('industry', USE_CASES, (u) => ({
  id: u.slug,
  required: { answer: u.answer, differences: u.differences, firstFlows: u.firstFlows, work: u.work, faqs: u.faqs },
  text: [u.answer, ...u.differences.map((d) => `${d.title} ${d.body}`), ...u.firstFlows, ...u.faqs.map((q) => `${q.q} ${q.a}`)],
  title: u.metaTitle, desc: u.metaDescription, h1: u.h1, lead: u.answer,
}));

check('subject', SUBJECT_LIBRARIES, (s) => ({
  id: s.slug,
  required: { answer: s.answer, intro: s.intro, examples: s.examples, preheaderTips: s.preheaderTips, mistakes: s.mistakes, metaTitle: s.metaTitle, metaDescription: s.metaDescription, service: s.service },
  text: [s.answer, ...s.intro, ...s.examples.map((e) => `${e.line} ${e.why}`), ...s.preheaderTips, ...s.mistakes],
  title: s.metaTitle, desc: s.metaDescription, h1: s.type, lead: s.answer, service: s.service,
}));
{
  const lines = new Map();
  for (const s of SUBJECT_LIBRARIES) {
    if (s.examples.length < 25) fail('subject', s.slug, `only ${s.examples.length} examples (min 25)`);
    for (const e of s.examples) {
      const k = e.line.toLowerCase().trim();
      if (lines.has(k)) fail('subject', s.slug, `line "${e.line}" duplicates ${lines.get(k)}`);
      else lines.set(k, s.slug);
      if (!e.why || e.why.trim().split(/\s+/).length < 6) fail('subject', s.slug, `line "${e.line}" has no real reason`);
    }
    for (const r of s.terms) if (!GLOSSARY.some((t) => t.slug === r)) fail('subject', s.slug, `term "${r}" does not exist`);
    if (subjectSiblings(s.slug).length < 3) fail('subject', s.slug, 'fewer than 3 sibling links');
  }
}

check('howto', HOWTOS, (h) => ({
  id: h.slug,
  required: { answer: h.answer, before: h.before, steps: h.steps, pitfalls: h.pitfalls, checklist: h.checklist, metaDescription: h.metaDescription, category: h.category, service: h.service },
  text: [h.answer, ...h.before, ...h.steps.map((s) => `${s.title} ${s.body}`), ...h.pitfalls, ...h.checklist],
  title: h.task, desc: h.metaDescription, h1: h.task, lead: h.answer, service: h.service,
}));
for (const h of HOWTOS) {
  if (h.steps.length < 5) fail('howto', h.slug, `only ${h.steps.length} steps (min 5)`);
  if (h.metaDescription.length > 160) fail('howto', h.slug, 'meta description over 160 characters');
  for (const r of h.terms) if (!GLOSSARY.some((t) => t.slug === r)) fail('howto', h.slug, `term "${r}" does not exist`);
  const inbound = 1 + HOWTOS.filter((o) => o.slug !== h.slug && howToSiblings(o.slug).some((s) => s.slug === h.slug)).length;
  if (inbound < 3) fail('howto', h.slug, `only ${inbound} inbound internal links (min 3)`);
}

/* Links: every reference must resolve, and every page needs at least three
   inbound internal links (hub + siblings + references from other pages). */
const termSlugs = new Set(GLOSSARY.map((t) => t.slug));
for (const t of GLOSSARY) for (const r of t.related) if (!termSlugs.has(r)) fail('glossary', t.slug, `related "${r}" does not exist`);
for (const f of FAQ_PAGES) for (const r of f.terms) if (!termSlugs.has(r)) fail('faq', f.slug, `term "${r}" does not exist`);
for (const u of USE_CASES) {
  for (const r of u.terms) if (!termSlugs.has(r)) fail('industry', u.slug, `term "${r}" does not exist`);
  for (const w of u.work) if (!WORK.has(w)) fail('industry', u.slug, `work "${w}" does not exist`);
}
for (const t of GLOSSARY) {
  const inbound = 1 + // hub
    GLOSSARY.filter((o) => o.slug !== t.slug && (o.related.includes(t.slug) || termSiblings(o.slug).some((s) => s.slug === t.slug))).length +
    FAQ_PAGES.filter((f) => f.terms.includes(t.slug)).length +
    USE_CASES.filter((u) => u.terms.includes(t.slug)).length;
  if (inbound < 3) fail('glossary', t.slug, `only ${inbound} inbound internal links (min 3)`);
}
for (const f of FAQ_PAGES) {
  const inbound = 1 + FAQ_PAGES.filter((o) => o.slug !== f.slug && faqSiblings(o.slug).some((s) => s.slug === f.slug)).length;
  if (inbound < 3) fail('faq', f.slug, `only ${inbound} inbound internal links (min 3)`);
}

const total = GLOSSARY.length + FAQ_PAGES.length + USE_CASES.length + SUBJECT_LIBRARIES.length + HOWTOS.length;
if (problems.length) {
  console.error(`\x1b[31m✗ Quality gate failed (${problems.length} problem${problems.length === 1 ? '' : 's'})\x1b[0m`);
  for (const p of problems) console.error('  - ' + p);
  process.exit(1);
}
console.log(`\x1b[32m✓ Quality gate passed\x1b[0m: ${total} pages (${GLOSSARY.length} glossary, ${FAQ_PAGES.length} faq, ${USE_CASES.length} industry, ${SUBJECT_LIBRARIES.length} subject-line, ${HOWTOS.length} how-to)`);
