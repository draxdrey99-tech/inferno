import Link from 'next/link';
import { Check } from '@phosphor-icons/react/dist/ssr';

import AuditForm from '@/components/AuditForm';
import CalendlyEmbed from '@/components/CalendlyEmbed';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import { breadcrumbLd, faqLd, pageLd, pageMeta } from '@/lib/seo';
import { AUDIT_CHECKS, AUDIT_FAQS, PROCESS, SITE, SITE_URL } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Free Email Marketing Audit for Ecommerce Brands',
  description:
    'A free review of your Klaviyo flows, list health, deliverability and last 90 days of results. Written findings you keep, whether or not you hire us.',
  path: '/free-email-audit',
});

const SENT_BACK = [
  'Which of your core flows exist, which are half-built and which are switched off',
  'How much of your list is dragging your sender reputation down',
  'Whether SPF, DKIM and DMARC are set up so Gmail and Outlook trust you',
  'What email earned in the last ninety days, and the gap to what it should earn',
  'The three changes we would make first, in order, and why',
] as const;

const NEED = [
  'Read-only access to your Klaviyo account, which is fastest and most useful',
  'Or screenshots of your flow list, last 90 days of performance and list growth',
  'The URL of your store, so we can see the sign-up and checkout experience',
] as const;

export default function FreeAuditPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Free email audit', path: '/free-email-audit' },
        ])}
      />
      <JsonLd
        data={pageLd({
          type: 'WebPage',
          path: '/free-email-audit',
          name: 'Free email marketing audit',
          description: 'A free review of an ecommerce brand’s Klaviyo flows, list health, deliverability and recent performance.',
        })}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Offer',
          '@id': `${SITE_URL}/free-email-audit#offer`,
          name: 'Free email marketing audit',
          description:
            'A manual review of your ecommerce email programme: flow coverage, list health, deliverability and last-90-day performance, with written findings.',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}/free-email-audit`,
          seller: { '@id': `${SITE_URL}/#organization` },
        }}
      />
      <JsonLd data={faqLd(AUDIT_FAQS)} />

      <section className="shell inner-page" aria-labelledby="audit-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Free email audit</span>
        </nav>

        <div className="panel panel-grid panel-corners p-7 md:p-12">
          <p className="mono-label mono-label-dot">Free, no obligation</p>
          <h1 id="audit-title" className="display-xl mt-5 max-w-4xl">
            Free email marketing audit for{' '}
            <span className="hud-box">ecommerce brands.</span>
          </h1>
          <p className="lede mt-7 max-w-3xl" id="answer">
            {SITE.name} reviews your Klaviyo account by hand: flow coverage,
            list health, deliverability and the last ninety days of
            performance. You get the findings in writing, and they are yours
            whether or not you hire us.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <a href="#audit-book" className="btn btn-flame">
              Pick a time
            </a>
            <a href="#audit-request" className="btn-line">
              Or send a written request
            </a>
          </div>
          <p className="mt-3 text-[0.8125rem] text-mute">
            30 minutes, no obligation, and the findings are yours to keep.
          </p>
        </div>

        <div className="mt-20 grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="section-meta" aria-hidden="true">
              <span className="section-index">.01.</span>
              <span className="mono-label">Scope</span>
            </p>
            <h2 className="display-lg mt-5">What the audit covers.</h2>
            <ol className="mt-8 space-y-6">
              {AUDIT_CHECKS.map((c) => (
                <li key={c.index}>
                  <h3 className="font-display text-lg tracking-tight">{c.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-mute">{c.body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <p className="section-meta" aria-hidden="true">
              <span className="section-index">.02.</span>
              <span className="mono-label">Deliverable</span>
            </p>
            <h2 className="display-lg mt-5">What we send back.</h2>
            <ul className="mt-8 space-y-4">
              {SENT_BACK.map((t) => (
                <li key={t} className="flex gap-3.5 text-[0.9375rem] leading-relaxed text-bone/85">
                  <Check size={16} weight="bold" aria-hidden className="mt-1 shrink-0 text-flame" />
                  {t}
                </li>
              ))}
            </ul>
            <h3 className="eyebrow mt-12">What we need from you</h3>
            <ul className="mt-5 space-y-3">
              {NEED.map((t) => (
                <li key={t} className="text-[0.9375rem] leading-relaxed text-mute">
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section id="audit-book" className="shell section-space border-t scroll-mt-20" aria-labelledby="audit-book-title">
        <p className="section-meta" aria-hidden="true">
          <span className="section-index">.03.</span>
          <span className="mono-label">Book</span>
        </p>
        <h2 id="audit-book-title" className="display-lg mt-5">Pick a time.</h2>
        <p className="lede mt-5 max-w-2xl">
          Thirty minutes. We walk your account with you and tell you plainly
          what is missing and what is leaking.
        </p>
        <div className="mt-10">
          <CalendlyEmbed source="free-email-audit" />
        </div>

        <div id="audit-request" className="card panel-grid panel-corners mt-16 max-w-2xl scroll-mt-24 p-7 md:p-10">
          <p className="eyebrow">Written request</p>
          <h3 className="display-md mt-5">Rather not book a call?</h3>
          <p className="mt-2 text-[0.875rem] text-mute">
            Send the details and we will reply within one business day.
          </p>
          <div className="mt-8">
            <AuditForm source="free-email-audit" />
          </div>
        </div>
      </section>

      <section className="shell section-space border-t" aria-labelledby="audit-process">
        <p className="section-meta" aria-hidden="true">
          <span className="section-index">.04.</span>
          <span className="mono-label">After the audit</span>
        </p>
        <h2 id="audit-process" className="display-lg mt-5">What happens next.</h2>
        <ol className="start-steps panel-set mt-10">
          {PROCESS.map((step) => (
            <li key={step.title} className="panel panel-grid start-step">
              <span className="section-index" aria-hidden="true">.{step.index}.</span>
              <h3 className="display-md">{step.title}</h3>
              <p className="text-[0.9375rem] leading-relaxed text-mute">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="shell section-space border-t" aria-labelledby="audit-faq">
        <p className="section-meta" aria-hidden="true">
          <span className="section-index">.05.</span>
          <span className="mono-label">FAQ</span>
        </p>
        <h2 id="audit-faq" className="display-lg mt-5 mb-10">Questions about the audit.</h2>
        <Faq items={AUDIT_FAQS} />
        <p className="lede mt-10">
          Want to see the work first? Browse the{' '}
          <Link className="text-link" href="/work">email design examples</Link>{' '}
          or read about{' '}
          <Link className="text-link" href="/services/klaviyo-email-marketing">Klaviyo email marketing</Link>.
        </p>
      </section>
    </>
  );
}
