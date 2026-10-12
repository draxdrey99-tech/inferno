import Link from 'next/link';

import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { HIRING_GUIDES } from '@/lib/hiring-guides';
import { breadcrumbLd, pageLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'How to Hire an Email Marketing Agency: Guides',
  description: 'Plain guides for ecommerce brands choosing an email or Klaviyo agency: what to ask, red flags, pricing models, contracts, reporting and the first 90 days.',
  path: '/hiring-guides',
  image: '/opengraph-image',
});

export default function HiringIndex() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Hiring guides', path: '/hiring-guides' }])} />
      <JsonLd data={pageLd({ type: 'CollectionPage', path: '/hiring-guides', name: 'Email agency hiring guides', description: 'Guides for brands choosing an email marketing agency.' })} />
      <section className="shell inner-page" aria-labelledby="hg-index">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><span>Hiring guides</span>
        </nav>
        <h1 id="hg-index" className="display-xl max-w-4xl">Hiring an email agency, without the guesswork.</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">
          How to choose, brief, pay and measure an email or Klaviyo agency, written for ecommerce brands. We are an agency, so we say so, and the guides include when to hire someone else or do it yourself.
        </p>
        <ul className="mt-12 space-y-3">
          {HIRING_GUIDES.map((g) => (
            <li key={g.slug}><Link className="text-link" href={`/hiring-guides/${g.slug}`}>{g.title}</Link></li>
          ))}
        </ul>
        <p className="mt-10 max-w-3xl text-[0.95rem] text-bone/75">
          Also see <Link className="text-link" href="/email-agency-vs-in-house">agency vs in-house</Link> and the <Link className="text-link" href="/work">work we have done</Link>.
        </p>
      </section>
      <CtaBand />
    </>
  );
}
