import Link from 'next/link';

import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import SpfChecker from '@/components/SpfChecker';
import { SITE_URL } from '@/lib/site';
import { breadcrumbLd, pageLd, pageMeta } from '@/lib/seo';

const path = '/tools/spf-record-checker';

export const metadata = pageMeta({
  title: 'SPF Record Checker: Lookups and Errors (Free)',
  description: 'Check a domain\'s SPF record, count its DNS lookups against the limit of 10 and spot errors such as duplicate records or +all. Free, no signup.',
  path,
  image: '/opengraph-image',
});

export default function SpfPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Tools', path: '/tools' }, { name: 'SPF record checker', path }])} />
      <JsonLd data={pageLd({ type: 'WebPage', path, name: 'SPF record checker', description: 'Look up and validate a domain SPF record.' })} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'SPF record checker', url: `${SITE_URL}${path}`, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }} />
      <section className="shell inner-page" aria-labelledby="spf-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/tools">Tools</Link>
        </nav>
        <h1 id="spf-title" className="display-xl max-w-4xl">SPF record checker.</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">
          An SPF record lists the servers allowed to send mail for your domain, and it must stay within ten DNS lookups or receivers reject it. Enter your domain to see the record, the lookup count and anything that needs fixing.
        </p>
        <div className="mt-12"><SpfChecker /></div>

        <h2 className="display-md mt-16">What the checker looks for.</h2>
        <ul className="deliverables mt-6 max-w-3xl">
          <li>More than one SPF record on the domain, which is a permanent error</li>
          <li>More than ten DNS lookups once every include and redirect is followed</li>
          <li>An all mechanism that is missing, neutral or +all</li>
          <li>The ptr mechanism, which the standard discourages</li>
          <li>Includes that point at a domain with no SPF record</li>
        </ul>
        <p className="mt-8 max-w-3xl text-[0.95rem] leading-relaxed text-bone/80">
          The check queries public DNS for the domain you type and does not store it. A passing SPF record is only part of authentication: you also need DKIM signing and a DMARC policy, so build the latter with the <Link className="text-link" href="/tools/dmarc-record-generator">DMARC record generator</Link> and read <Link className="text-link" href="/glossary/spf-dkim-dmarc">SPF, DKIM and DMARC explained</Link>.
        </p>
        <p className="lede mt-8 max-w-3xl">
          Too many lookups, or not sure which senders belong? See our <Link className="text-link" href="/services/email-deliverability">email deliverability service</Link> or <Link className="text-link" href="/free-email-audit">book a free audit</Link>.
        </p>
      </section>
      <CtaBand />
    </>
  );
}
