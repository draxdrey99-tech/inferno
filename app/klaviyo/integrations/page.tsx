import Link from 'next/link';

import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { INTEGRATIONS } from '@/lib/integrations';
import { breadcrumbLd, pageLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Klaviyo Integrations for Ecommerce Stores',
  description: 'How the apps in an ecommerce stack connect to Klaviyo: the events they send, the flows they enable and the setup order that works.',
  path: '/klaviyo/integrations',
  image: '/opengraph-image',
});

export default function IntegrationsIndex() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Klaviyo how-to', path: '/klaviyo' }, { name: 'Integrations', path: '/klaviyo/integrations' }])} />
      <JsonLd data={pageLd({ type: 'CollectionPage', path: '/klaviyo/integrations', name: 'Klaviyo integration guides', description: 'How ecommerce apps connect to Klaviyo.' })} />
      <section className="shell inner-page" aria-labelledby="int-index">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/klaviyo">Klaviyo how-to</Link><span>/</span><span>Integrations</span>
        </nav>
        <h1 id="int-index" className="display-xl max-w-4xl">Klaviyo and the rest of your stack.</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">
          Klaviyo is only as good as the data it receives. One page per app: what it sends, which flows it unlocks and the setup order that avoids the usual gaps.
        </p>
        <ul className="mt-12 space-y-3">
          {INTEGRATIONS.map((i) => (
            <li key={i.slug}><Link className="text-link" href={`/klaviyo/integrations/${i.slug}`}>Klaviyo and {i.app}</Link></li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
