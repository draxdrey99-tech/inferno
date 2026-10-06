import Link from 'next/link';

import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { HOWTOS } from '@/lib/howto';
import { breadcrumbLd, pageLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Klaviyo How-To Guides for Ecommerce Stores',
  description: 'Step-by-step Klaviyo guides for ecommerce: set up flows, fix deliverability, clean lists, run campaigns and read your reports.',
  path: '/klaviyo',
  image: '/opengraph-image',
});

const LABELS: Record<string, string> = {
  flows: 'Flows',
  lists: 'Lists and segments',
  deliverability: 'Deliverability',
  campaigns: 'Campaigns',
  reporting: 'Reporting',
};

export default function HowToIndex() {
  const groups = Object.keys(LABELS)
    .map((c) => ({ c, items: HOWTOS.filter((h) => h.category === c) }))
    .filter((g) => g.items.length);
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Klaviyo how-to', path: '/klaviyo' }])} />
      <JsonLd data={pageLd({ type: 'CollectionPage', path: '/klaviyo', name: 'Klaviyo how-to guides for ecommerce', description: 'Step-by-step Klaviyo guides for ecommerce stores.' })} />
      <section className="shell inner-page" aria-labelledby="ht-index">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><span>Klaviyo how-to</span>
        </nav>
        <h1 id="ht-index" className="display-xl max-w-4xl">Klaviyo, step by step.</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">
          One page per task, each with the steps, the pitfalls and a checklist to confirm it worked. Or book a free audit and we will do it with you.
        </p>
        {groups.map((g) => (
          <div key={g.c} className="mt-14">
            <h2 className="display-md">{LABELS[g.c]}</h2>
            <ul className="mt-6 space-y-3">
              {g.items.map((h) => (
                <li key={h.slug}><Link className="text-link" href={`/klaviyo/${h.slug}`}>{h.task}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <CtaBand />
    </>
  );
}
