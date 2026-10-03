import Link from 'next/link';

import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { FAQ_PAGES } from '@/lib/faq';
import { breadcrumbLd, pageLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Ecommerce Email Marketing FAQ: Straight Answers',
  description: 'Short, direct answers to the questions ecommerce brands ask about email marketing, Klaviyo flows, deliverability and results.',
  path: '/faq',
  image: '/opengraph-image',
});

const LABELS: Record<string, string> = {
  strategy: 'Strategy',
  flows: 'Flows and automation',
  metrics: 'Metrics and reporting',
  lists: 'Lists',
  deliverability: 'Deliverability',
};

export default function FaqIndex() {
  const groups = Object.keys(LABELS)
    .map((c) => ({ c, items: FAQ_PAGES.filter((f) => f.category === c) }))
    .filter((g) => g.items.length);
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }])} />
      <JsonLd data={pageLd({ type: 'CollectionPage', path: '/faq', name: 'Ecommerce email marketing FAQ', description: 'Direct answers to common ecommerce email marketing questions.' })} />
      <section className="shell inner-page" aria-labelledby="faq-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><span>FAQ</span>
        </nav>
        <h1 id="faq-title" className="display-xl max-w-4xl">Email marketing questions, answered.</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">
          One page per question, each answered in the first sentence. Find yours below, or book a free audit and ask us directly.
        </p>
        {groups.map((g) => (
          <div key={g.c} className="mt-14">
            <h2 className="display-md">{LABELS[g.c]}</h2>
            <ul className="mt-6 space-y-3">
              {g.items.map((f) => (
                <li key={f.slug}>
                  <Link className="text-link" href={`/faq/${f.slug}`}>{f.q}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <CtaBand />
    </>
  );
}
