import Link from 'next/link';

import CtaBand from '@/components/CtaBand';
import DmarcGenerator from '@/components/DmarcGenerator';
import JsonLd from '@/components/JsonLd';
import { SITE_URL } from '@/lib/site';
import { breadcrumbLd, pageLd, pageMeta } from '@/lib/seo';

const path = '/tools/dmarc-record-generator';

export const metadata = pageMeta({
  title: 'DMARC Record Generator (Free, No Signup)',
  description: 'Generate a DMARC TXT record for your sending domain: pick a policy, add a reporting address and alignment, then copy it into DNS. Free and private.',
  path,
  image: '/opengraph-image',
});

export default function DmarcPage() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Tools', path: '/tools' }, { name: 'DMARC record generator', path }])} />
      <JsonLd data={pageLd({ type: 'WebPage', path, name: 'DMARC record generator', description: 'Build a DMARC TXT record for a sending domain.' })} />
      <JsonLd data={{ '@context': 'https://schema.org', '@type': 'WebApplication', name: 'DMARC record generator', url: `${SITE_URL}${path}`, applicationCategory: 'UtilitiesApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' } }} />
      <section className="shell inner-page" aria-labelledby="dm-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/tools">Tools</Link>
        </nav>
        <h1 id="dm-title" className="display-xl max-w-4xl">DMARC record generator.</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">
          A DMARC record is one TXT line at <code>_dmarc.yourdomain.com</code> that tells receiving servers what to do with mail that fails SPF and DKIM checks. Build yours below, start with the policy set to none, read the reports, then tighten it.
        </p>
        <div className="mt-12"><DmarcGenerator /></div>

        <h2 className="display-md mt-16">How to roll it out.</h2>
        <ol className="mt-6 max-w-3xl space-y-4 text-[0.95rem] leading-relaxed text-bone/80">
          <li>1. Publish the record with p=none and an address for aggregate reports. Nothing is blocked yet.</li>
          <li>2. Read the reports for two to four weeks. They list every system sending as your domain, including Klaviyo, your store platform and your help desk.</li>
          <li>3. Fix any legitimate sender that fails. Usually that means finishing the DKIM setup for that tool.</li>
          <li>4. Move to quarantine, ideally with a lower percentage first, then to reject once nothing legitimate fails.</li>
        </ol>
        <p className="mt-8 max-w-3xl text-[0.95rem] leading-relaxed text-bone/80">
          The tool runs in your browser and sends nothing anywhere. It does not check your live DNS. For background, read <Link className="text-link" href="/glossary/spf-dkim-dmarc">SPF, DKIM and DMARC explained</Link> and <Link className="text-link" href="/faq/do-i-need-dmarc">do I need DMARC</Link>, and check the other half with the <Link className="text-link" href="/tools/spf-record-checker">SPF record checker</Link>.
        </p>
        <p className="lede mt-8 max-w-3xl">
          Want this set up and monitored for you? See our <Link className="text-link" href="/services/email-deliverability">email deliverability service</Link> or <Link className="text-link" href="/free-email-audit">book a free audit</Link>.
        </p>
      </section>
      <CtaBand />
    </>
  );
}
