import Link from 'next/link';

import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { breadcrumbLd, pageLd, pageMeta } from '@/lib/seo';
import { GLOSSARY } from '@/lib/glossary';

export const metadata = pageMeta({
  title: 'Email Marketing Glossary for Ecommerce Brands',
  description: 'Plain-English definitions of the email marketing terms ecommerce brands run into: deliverability, SPF, DKIM, DMARC, flows and segmentation.',
  path: '/glossary',
  image: '/opengraph-image',
});

const LABELS: Record<string, string> = {
  deliverability: 'Deliverability',
  flows: 'Flows and automation',
  metrics: 'Metrics and reporting',
  lists: 'Lists',
  strategy: 'Strategy',
};

export default function GlossaryIndex() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Glossary', path: '/glossary' }])} />
      <JsonLd data={pageLd({ type: 'CollectionPage', path: '/glossary', name: 'Email marketing glossary', description: 'Plain-English definitions of email marketing terms for ecommerce brands.' })} />
      <section className="shell inner-page" aria-labelledby="gl-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><span>Glossary</span>
        </nav>
        <h1 id="gl-title" className="display-xl max-w-4xl">Email marketing glossary.</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">
          Short, plain definitions of the email terms ecommerce brands run into, each on its own page with what to do about it.
        </p>
        {Object.entries(LABELS).map(([c, label]) => {
          const items = GLOSSARY.filter((t) => t.category === c);
          if (!items.length) return null;
          return (
            <div key={c} className="mt-14">
              <h2 className="display-md">{label}</h2>
              <ul className="mt-6 grid gap-6 md:grid-cols-2">
                {items.map((t) => (
                  <li key={t.slug} className="panel panel-grid p-6">
                    <h3 className="font-display text-xl tracking-tight">
                      <Link href={`/glossary/${t.slug}`} className="service-title-link">{t.term}</Link>
                    </h3>
                    <p className="mt-3 text-[0.9375rem] leading-relaxed text-mute">{t.definition}</p>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </section>
      <CtaBand />
    </>
  );
}
