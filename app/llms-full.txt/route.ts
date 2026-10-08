import { FAQ_PAGES } from '@/lib/faq';
import { HOWTOS } from '@/lib/howto';
import { INTEGRATIONS } from '@/lib/integrations';
import { FLOW_TEARDOWNS } from '@/lib/flow-teardowns';
import { COMPARISONS } from '@/lib/comparisons';
import { GLOSSARY } from '@/lib/glossary';
import { SUBJECT_LIBRARIES } from '@/lib/subject-lines';
import { SERVICE_PAGES } from '@/lib/service-pages';
import { QUICK_ANSWER, SITE, SITE_URL } from '@/lib/site';
import { USE_CASES } from '@/lib/use-cases';

export const revalidate = 3600;

/**
 * llms-full.txt: the substance of the site in one plain-text file, so an
 * answer engine can read definitions, answers and services without
 * crawling every page. Built from the same data the pages render, so it
 * can never drift from them.
 */
export function GET() {
  const out: string[] = [`# ${SITE.name}: full text`, '', `> ${QUICK_ANSWER}`, ''];

  out.push('## Services', '');
  for (const s of SERVICE_PAGES) {
    out.push(`### ${s.title}`, `URL: ${SITE_URL}/services/${s.slug}`, '', s.answer, '', s.intro, '', ...s.deliverables.map((d) => `- ${d}`), '');
  }

  out.push('## Industries', '');
  for (const u of USE_CASES) {
    out.push(`### Email marketing for ${u.label}`, `URL: ${SITE_URL}/email-marketing-for/${u.slug}`, '', u.answer, '', ...u.differences.map((d) => `- ${d.title}: ${d.body}`), '');
  }

  out.push('## Glossary', '');
  for (const t of GLOSSARY) {
    out.push(`### ${t.term}`, `URL: ${SITE_URL}/glossary/${t.slug}`, '', t.definition, '', ...t.body, '', `Example: ${t.example}`, '');
  }

  out.push('## Subject line libraries', '');
  for (const s of SUBJECT_LIBRARIES) {
    out.push(`### ${s.type} email subject lines`, `URL: ${SITE_URL}/email-subject-lines/${s.slug}`, '', s.answer, '', ...s.examples.slice(0, 10).map((e) => `- ${e.line}: ${e.why}`), '');
  }

  out.push('## Klaviyo how-to guides', '');
  for (const h of HOWTOS) {
    out.push(`### ${h.task}`, `URL: ${SITE_URL}/klaviyo/${h.slug}`, '', h.answer, '', ...h.steps.map((s, i) => `${i + 1}. ${s.title}: ${s.body}`), '');
  }

  out.push('## Klaviyo integrations', '');
  for (const i of INTEGRATIONS) {
    out.push(`### Klaviyo and ${i.app}`, `URL: ${SITE_URL}/klaviyo/integrations/${i.slug}`, '', i.answer, '', ...i.events.map((e) => `- ${e.name}: ${e.meaning}`), '', ...i.setup.map((s, n) => `${n + 1}. ${s.title}: ${s.body}`), '');
  }

  out.push('## Klaviyo flow teardowns', '');
  for (const f of FLOW_TEARDOWNS) {
    out.push(`### ${f.flow}`, `URL: ${SITE_URL}/klaviyo-flows/${f.slug}`, '', f.answer, '', `Trigger: ${f.trigger}`, '', ...f.sequence.map((s, n) => `${n + 1}. ${s.step} (${s.timing}): ${s.purpose}`), '', ...f.branches.map((b) => `- ${b}`), '');
  }

  out.push('## Comparisons', '');
  for (const c of COMPARISONS) {
    out.push(`### ${c.a} vs ${c.b}`, `URL: ${SITE_URL}/compare/${c.slug}`, '', c.answer, '', ...c.table.map((r) => `- ${r.feature}: ${c.a}, ${r.a}. ${c.b}, ${r.b}.`), '', ...c.verdict, '');
  }

  out.push('## FAQ', '');
  for (const f of FAQ_PAGES) {
    out.push(`### ${f.q}`, `URL: ${SITE_URL}/faq/${f.slug}`, '', f.a, '', ...f.detail, '', `In practice: ${f.example}`, '');
  }

  return new Response(out.join('\n'), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
