import Link from 'next/link';

import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { breadcrumbLd, pageLd, pageMeta } from '@/lib/seo';
import { SUBJECT_LIBRARIES } from '@/lib/subject-lines';

export const metadata = pageMeta({
  title: 'Ecommerce Email Subject Line Libraries',
  description: 'Original subject lines for abandoned cart, welcome, winback, launch, back-in-stock, post-purchase, sale and newsletter emails, each with the reason it works.',
  path: '/email-subject-lines',
  image: '/opengraph-image',
});

export default function SubjectLinesIndex() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Subject lines', path: '/email-subject-lines' }])} />
      <JsonLd data={pageLd({ type: 'CollectionPage', path: '/email-subject-lines', name: 'Ecommerce email subject line libraries', description: 'Original subject lines by email type, each with the reason it works.' })} />
      <section className="shell inner-page" aria-labelledby="sl-hub">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><span>Subject lines</span>
        </nav>
        <h1 id="sl-hub" className="display-xl max-w-4xl">Subject lines that earn the open.</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">
          A library for each email type your store sends. Every line is original and comes with the reason it works, so you can adapt the thinking, not just copy the words.
        </p>
        <ul className="mt-10 space-y-3">
          {SUBJECT_LIBRARIES.map((s) => (
            <li key={s.slug}><Link className="text-link" href={`/email-subject-lines/${s.slug}`}>{s.type} email subject lines</Link></li>
          ))}
        </ul>
      </section>
      <CtaBand />
    </>
  );
}
