import Link from 'next/link';

import CalendlyLink from '@/components/CalendlyLink';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { AGENCY_PAGES } from '@/lib/agency';
import { citiesIn, countries } from '@/lib/agency-locations';
import { breadcrumbLd, faqLd, pageLd, pageMeta, serviceLd } from '@/lib/seo';
import { HIRING_GUIDES } from '@/lib/hiring-guides';

export const metadata = pageMeta({
  title: 'Email Marketing Agency for Ecommerce Brands | Inferno',
  description: 'Email marketing agency for ecommerce brands in the US, Canada, UK and Europe. Klaviyo flows, campaign design and deliverability. Free audit, no obligation.',
  path: '/email-marketing-agency',
  image: '/opengraph-image',
});

const FAQS = [
  { q: 'What does an email marketing agency do for an online store?', a: 'It builds and manages your automated flows, designs and sends campaigns, grows and cleans your list and protects deliverability, then reports on the revenue email earns.' },
  { q: 'How do I know if an email marketing agency is any good?', a: 'Look for work in your category that you can see in full, a process you can repeat back, named people on your account and honest reporting. Be wary of guaranteed revenue numbers before an audit.' },
  { q: 'Where does Inferno Emails work?', a: 'We are a remote agency and work with ecommerce brands in the United States, Canada, the United Kingdom and mainland Europe. We have shipped work in Europe, Australia and the United States.' },
  { q: 'What happens after I book the free audit?', a: 'We review your Klaviyo account, flows, list health and authentication, then send a ranked list of what is missing and what to fix first. There is no obligation to hire us.' },
];

export default function AgencyHub() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Email marketing agency', path: '/email-marketing-agency' }])} />
      <JsonLd data={faqLd(FAQS)} />
      <JsonLd data={pageLd({ type: 'CollectionPage', path: '/email-marketing-agency', name: 'Email marketing agency for ecommerce brands', description: 'Inferno Emails is an email marketing agency for ecommerce brands, working remotely in the US, Canada, UK and Europe.' })} />
      <JsonLd data={serviceLd({ name: 'Email marketing agency for ecommerce brands', description: 'Klaviyo flows, campaign design and deliverability for ecommerce brands.', path: '/email-marketing-agency' })} />
      <section className="shell inner-page" aria-labelledby="ag-hub">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><span>Email marketing agency</span>
        </nav>
        <h1 id="ag-hub" className="display-xl max-w-4xl">An email marketing agency for ecommerce brands.</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">
          Inferno Emails builds and runs the email channel for online stores: the Klaviyo flows that earn in the background, campaigns that look like your brand and the deliverability work that keeps both in the inbox. We are remote, we work with brands in the United States, Canada, the United Kingdom and Europe, and we start every engagement with a free audit.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <CalendlyLink source="agency-hub" className="btn btn-flame">Book your free audit</CalendlyLink>
          <Link className="text-link self-center" href="/work">See our email work</Link>
        </div>

        <h2 className="display-md mt-14">Choose the page that matches what you are looking for.</h2>
        <ul className="mt-6 max-w-3xl space-y-3">
          {AGENCY_PAGES.map((p) => (
            <li key={p.slug}><Link className="text-link" href={`/email-marketing-agency/${p.slug}`}>{p.h1}</Link></li>
          ))}
        </ul>

        <h2 className="display-md mt-14">Where we work.</h2>
        <p className="mt-6 max-w-3xl text-[0.95rem] leading-relaxed text-bone/80">
          Email rules, seasons and customer habits differ by market, so each page covers what actually changes: consent law, language, pricing conventions, the retail calendar and time zone. We work remotely and do not claim offices where we have none.
        </p>
        <div className="mt-8 max-w-4xl space-y-6">
          {countries().map((c) => (
            <div key={c.slug}>
              <h3 className="text-[1.05rem] font-medium text-bone"><Link className="text-link" href={`/email-marketing-agency/${c.slug}`}>{c.name}</Link></h3>
              <p className="mt-2 text-[0.95rem] text-bone/75">
                {citiesIn(c.name).map((x, i) => (
                  <span key={x.slug}>{i > 0 && ', '}<Link className="text-link" href={`/email-marketing-agency/${x.slug}`}>{x.name}</Link></span>
                ))}
                {citiesIn(c.name).length === 0 && 'Country guide'}
              </p>
            </div>
          ))}
        </div>

        <h2 className="display-md mt-14">What every engagement includes.</h2>
        <ul className="deliverables mt-6 max-w-3xl">
          <li>A free audit of flows, list health, authentication and signup forms before any quote</li>
          <li>Core Klaviyo flows built and tested: welcome, cart and browse recovery, post-purchase, winback</li>
          <li>Campaign design built around your brand, not a template with your logo on it</li>
          <li>Deliverability checks: authentication records, list cleaning and sending reputation</li>
          <li>Reporting that says what was measured and how, including the limits of attribution</li>
        </ul>

        <h2 className="display-md mt-14">Questions people ask.</h2>
        <div className="mt-6 max-w-3xl space-y-6">
          {FAQS.map((f) => (
            <div key={f.q}>
              <h3 className="text-[1.05rem] font-medium text-bone">{f.q}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-bone/80">{f.a}</p>
            </div>
          ))}
        </div>

        <p className="lede mt-10 max-w-3xl">
          Still deciding whether to hire? Read the <Link className="text-link" href="/hiring-guides">{HIRING_GUIDES.length} hiring guides</Link>, compare <Link className="text-link" href="/email-agency-vs-in-house">agency and in-house</Link>, see the <Link className="text-link" href="/services">services</Link> or <Link className="text-link" href="/free-email-audit">book your free audit</Link>.
        </p>
      </section>
      <CtaBand />
    </>
  );
}
