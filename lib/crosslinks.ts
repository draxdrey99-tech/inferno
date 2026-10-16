/**
 * Inbound links for the guide families Google has not crawled yet. Glossary
 * and FAQ pages are already indexed, so each one links to a few guides that
 * cite the same glossary terms. Picks are balanced: every source takes the
 * guides with the fewest inbound links so far, so no guide is left orphaned
 * and none is over-linked.
 */
import { AGENCY_PAGES } from '@/lib/agency';
import { LOCATIONS } from '@/lib/agency-locations';
import { EVENTS } from '@/lib/calendar';
import { FAQ_PAGES } from '@/lib/faq';
import { FLOW_TEARDOWNS } from '@/lib/flow-teardowns';
import { GLOSSARY } from '@/lib/glossary';
import { HIRING_GUIDES } from '@/lib/hiring-guides';
import { HOWTOS } from '@/lib/howto';
import { INTEGRATIONS } from '@/lib/integrations';
import { USE_CASES } from '@/lib/use-cases';

export type GuideLink = { href: string; label: string };
type Target = GuideLink & { terms: string[] };

const TARGETS: Target[] = [
  ...FLOW_TEARDOWNS.map((x) => ({ href: `/klaviyo-flows/${x.slug}`, label: x.flow, terms: x.terms })),
  ...EVENTS.map((x) => ({ href: `/email-calendar/${x.slug}`, label: x.event, terms: x.terms })),
  ...HOWTOS.map((x) => ({ href: `/klaviyo/${x.slug}`, label: x.task, terms: x.terms })),
  ...INTEGRATIONS.map((x) => ({ href: `/klaviyo/integrations/${x.slug}`, label: x.app, terms: x.terms })),
  ...USE_CASES.map((x) => ({ href: `/email-marketing-for/${x.slug}`, label: x.label, terms: x.terms })),
  ...HIRING_GUIDES.map((x) => ({ href: `/hiring-guides/${x.slug}`, label: x.title, terms: x.terms })),
  ...AGENCY_PAGES.map((x) => ({ href: `/email-marketing-agency/${x.slug}`, label: x.h1, terms: x.terms })),
  ...LOCATIONS.map((x) => ({ href: `/email-marketing-agency/${x.slug}`, label: x.h1, terms: x.terms })),
];

const PER_PAGE = 4;

function build() {
  const inbound = new Map<string, number>(TARGETS.map((t) => [t.href, 0]));
  const picks = new Map<string, GuideLink[]>();
  const sources = [
    ...GLOSSARY.map((g) => ({ key: `glossary:${g.slug}`, terms: [g.slug] })),
    ...FAQ_PAGES.map((f) => ({ key: `faq:${f.slug}`, terms: f.terms })),
  ];
  for (const s of sources) {
    const chosen: Target[] = [];
    const pool = TARGETS.filter((t) => t.terms.some((x) => s.terms.includes(x)));
    while (chosen.length < PER_PAGE && chosen.length < pool.length) {
      const next = pool
        .filter((t) => !chosen.includes(t))
        .sort((a, b) => (inbound.get(a.href)! - inbound.get(b.href)!) || a.href.localeCompare(b.href))[0];
      chosen.push(next);
      inbound.set(next.href, inbound.get(next.href)! + 1);
    }
    picks.set(s.key, chosen.map(({ href, label }) => ({ href, label })));
  }
  return picks;
}

const PICKS = build();

export const guidesForTerm = (slug: string) => PICKS.get(`glossary:${slug}`) ?? [];
export const guidesForFaq = (slug: string) => PICKS.get(`faq:${slug}`) ?? [];
