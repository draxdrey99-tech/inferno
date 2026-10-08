import Link from 'next/link';

import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { COMPARISONS } from '@/lib/comparisons';
import { breadcrumbLd, pageLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Klaviyo Compared with the Alternatives',
  description: 'Fair, side-by-side comparisons of Klaviyo against Mailchimp, Omnisend, Shopify Email and others, for ecommerce stores deciding where to run email.',
  path: '/compare',
  image: '/opengraph-image',
});

export default function CompareIndex() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Compare', path: '/compare' }])} />
      <JsonLd data={pageLd({ type: 'CollectionPage', path: '/compare', name: 'Klaviyo comparisons', description: 'Klaviyo compared with other email platforms for ecommerce.' })} />
      <section className="shell inner-page" aria-labelledby="cmp-index">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><span>Compare</span>
        </nav>
        <h1 id="cmp-index" className="display-xl max-w-4xl">Klaviyo against the alternatives.</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">
          We build in Klaviyo, so we say so on every page. Each comparison is as fair as we can make it, with who each tool suits and how to move between them.
        </p>
        <ul className="mt-12 space-y-3">
          {COMPARISONS.map((c) => (
            <li key={c.slug}><Link className="text-link" href={`/compare/${c.slug}`}>{c.a} vs {c.b}</Link></li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
