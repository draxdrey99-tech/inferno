import Link from 'next/link';

import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { FLOW_TEARDOWNS } from '@/lib/flow-teardowns';
import { breadcrumbLd, pageLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Klaviyo Flow Teardowns for Ecommerce',
  description: 'Twenty Klaviyo flows taken apart: trigger, filters, timing, branch logic and a copy outline for each, so you can build or audit your own.',
  path: '/klaviyo-flows',
  image: '/opengraph-image',
});

export default function FlowsIndex() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Klaviyo flows', path: '/klaviyo-flows' }])} />
      <JsonLd data={pageLd({ type: 'CollectionPage', path: '/klaviyo-flows', name: 'Klaviyo flow teardowns', description: 'Ecommerce Klaviyo flows taken apart step by step.' })} />
      <section className="shell inner-page" aria-labelledby="fl-index">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><span>Klaviyo flows</span>
        </nav>
        <h1 id="fl-index" className="display-xl max-w-4xl">Klaviyo flows, taken apart.</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">
          For each flow: what triggers it, who is filtered out, how the messages are timed, where it branches and what each email should say. Use them to build, or to audit what you have.
        </p>
        <p className="mt-6 max-w-3xl text-[0.95rem] text-bone/75">
          Not sure which of these you are missing? The <Link className="text-link" href="/flow-coverage-checklist">flow coverage checklist</Link> shows the gaps in a few minutes.
        </p>
        <ul className="mt-12 space-y-3">
          {FLOW_TEARDOWNS.map((f) => (
            <li key={f.slug}><Link className="text-link" href={`/klaviyo-flows/${f.slug}`}>{f.flow}</Link></li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
