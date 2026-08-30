import type { Metadata } from 'next';
import { Check } from '@phosphor-icons/react/dist/ssr';

import AuditForm from '@/components/AuditForm';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import Marquee from '@/components/Marquee';
import { breadcrumbLd, faqLd, pageMeta } from '@/lib/seo';
import { SITE_URL, TESTIMONIALS } from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'Free Email Marketing Audit',
  description:
    'Request a free email marketing audit. We review your Klaviyo flows, list health, authentication and last 90 days of performance. No obligation.',
  path: '/free-email-audit',
});

const CHECKS = [
  {
    index: '01',
    title: 'Flow coverage',
    body:
      'Which of the money flows exist, which are half-built, and which are quietly switched off. Welcome, abandoned cart, browse abandonment, post-purchase, winback.',
  },
  {
    index: '02',
    title: 'List health',
    body:
      'Engagement decay, share of your list that has not opened in six months, suppression hygiene, and whether unengaged contacts are dragging your reputation down.',
  },
  {
    index: '03',
    title: 'Deliverability',
    body:
      'SPF, DKIM and DMARC records checked and verified. Complaint and bounce rates against the thresholds Gmail and Outlook actually enforce.',
  },
  {
    index: '04',
    title: 'Last ninety days',
    body:
      'What the channel earned, split between flows and campaigns, revenue per recipient, and the gap between what it did and what it should be doing.',
  },
];

const AUDIT_FAQS = [
  {
    q: 'Is the audit actually free?',
    a: 'Yes. There is no fee and no obligation. We send you the findings whether or not you hire us. If the report is useful and you fix it yourself, that is a fine outcome for us.',
  },
  {
    q: 'What access do you need?',
    a: 'Read-only access to your Klaviyo account is fastest and most useful. If you would rather not grant access, screenshots of your flow list, your last 90 days of performance and your list growth will get us most of the way there.',
  },
  {
    q: 'How long does it take?',
    a: 'We come back within one business day. It is a real review by a person, not an automated PDF generator.',
  },
  {
    q: 'Will this turn into a sales call?',
    a: 'You get the findings in writing either way. If we think we can help we will say what we would do and what it costs. If we do not think we can help, we will tell you that instead.',
  },
  {
    q: 'What if I am not on Klaviyo?',
    a: 'We can still audit Mailchimp, Omnisend, Shopify Email and most other ESPs. The flow and deliverability questions are the same everywhere; only the interface changes.',
  },
];

export default function AuditPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Free email audit', path: '/free-email-audit' },
        ])}
      />
      <JsonLd data={faqLd(AUDIT_FAQS)} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Offer',
          '@id': `${SITE_URL}/free-email-audit#offer`,
          name: 'Free email marketing audit',
          description:
            'A manual review of your ecommerce email programme: flow coverage, list health, deliverability and last-90-day performance.',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: `${SITE_URL}/free-email-audit`,
          seller: { '@id': `${SITE_URL}/#organization` },
        }}
      />

      {/* --------------------------------------------------- hero + form */}
      <section className="border-b border-white/8 pt-24">
        <div className="shell grid gap-14 pb-20 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:pb-28">
          <div className="reveal">
            <p className="eyebrow">Free audit</p>
            <h1 className="display-lg mt-7">
              Find out what your list is{' '}
              <span className="accent">actually worth.</span>
            </h1>
            <p className="lede mt-7">
              Send us your account and we will review it properly: flows, list
              health, authentication records and the last ninety days of
              performance. We come back within one business day.
            </p>
            <p className="mt-8 max-w-md border-l-2 border-flame pl-4 text-[0.875rem] leading-relaxed text-mute">
              No fee, no obligation, and the findings are yours to keep. If we do
              not think we can help you, we will say that too.
            </p>

            <ul className="mt-10 space-y-3">
              {[
                'Reviewed by a person, not an automated PDF generator',
                'One business day turnaround',
                'Written findings you can hand to any agency, including not us',
              ].map((t) => (
                <li key={t} className="flex gap-3.5 text-[0.9375rem] text-bone/80">
                  <Check size={16} weight="bold" aria-hidden className="mt-0.5 shrink-0 text-flame" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="reveal rounded-xl border border-white/10 bg-ink-raised p-7 md:p-10"
            data-reveal-delay="110"
          >
            <h2 className="font-display text-xl tracking-tight">
              Request your audit
            </h2>
            <p className="mt-2 text-[0.875rem] text-mute">
              Five fields. We will do the rest.
            </p>
            <div className="mt-8">
              <AuditForm />
            </div>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- what we check */}
      <section className="">
        <div className="shell py-20 md:py-28">
          <div className="reveal">
            <h2 className="display-lg mt-6 max-w-3xl">
              Four things that decide{' '}
              <span className="accent">almost everything.</span>
            </h2>
          </div>

          <ol className="mt-14 grid gap-6 md:grid-cols-2">
            {CHECKS.map((c, i) => (
              <li
                key={c.index}
                className="reveal rounded-xl border border-white/10 p-8"
                data-reveal-delay={(i % 2) * 90}
              >
                <span className="font-display text-[0.875rem] tracking-[0.1em] text-flame">
                  {c.index}
                </span>
                <h3 className="display-md mt-4">{c.title}</h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-mute">
                  {c.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------ social proof */}
      <section className="border-t border-white/8">
        <div className="shell py-20 md:py-24">
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <figure key={t.author} className="reveal flex flex-col">
                <blockquote className="flex-1 font-display text-lg leading-snug tracking-tight text-bone">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-5 border-t border-white/12 pt-4 text-[0.875rem]">
                  <span className="text-bone">{t.author}</span>
                  <span className="mt-0.5 block text-mute">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <Marquee />
      </section>

      {/* ---------------------------------------------------------- FAQ */}
      <section className="border-t border-white/8">
        <div className="shell py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h2 className="display-lg mt-6">
                Before you <span className="accent">send it.</span>
              </h2>
            </div>
            <div className="reveal">
              <Faq items={AUDIT_FAQS} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
