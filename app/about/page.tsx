import Link from 'next/link';
import type { Metadata } from 'next';
import { Check, X } from '@phosphor-icons/react/dist/ssr';

import SectionHead from '@/components/Section';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import Marquee from '@/components/Marquee';
import { breadcrumbLd, pageMeta } from '@/lib/seo';
import { SITE } from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'About: Email and Retention Marketing',
  description:
    'Inferno Emails is an email and retention marketing agency for ecommerce brands. How we work, what we believe about email, and who we are the wrong choice for.',
  path: '/about',
});

/* Beliefs, not biography. Everything here is a statement of how the team
   works, with no invented headcount, awards or founder story. See CONTENT.md
   for the details only the client can supply. */
const BELIEFS = [
  {
    index: '01',
    title: 'Attributed revenue, or it did not happen',
    body:
      'Opens are a diagnostic. Clicks are a diagnostic. The number that decides whether we earned our fee is how much revenue the channel attributed this month, and whether it is bigger than last month. We report on that first, every time.',
  },
  {
    index: '02',
    title: 'Templates are a tax on your brand',
    body:
      'A layout that has been sold to four hundred other stores does not stop looking like a layout that has been sold to four hundred other stores. We draw every email for the brand it belongs to. It costs us more time. It is the whole job.',
  },
  {
    index: '03',
    title: 'The boring part decides the exciting part',
    body:
      'Authentication records, list hygiene, sunset flows, send-time discipline. None of it is fun to talk about on a sales call, and all of it determines whether your best campaign of the year gets seen at all.',
  },
  {
    index: '04',
    title: 'We tell you when the answer is no',
    body:
      'If your list is too small to justify the spend, or the problem is your offer rather than your email, we will say so on the audit call. Selling you a retainer you should not buy is a bad month for you and a bad year for us.',
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'AboutPage',
          name: 'About Inferno Emails',
          url: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://infernoemails.com'}/about`,
          mainEntity: { '@id': 'https://infernoemails.com/#organization' },
        }}
      />

      <section className="border-b border-white/8 pt-24">
        <div className="shell pb-16 md:pb-20">
          <SectionHead
            eyebrow="About"
            as="h1"
            title={
              <>
                Every agency wants your money.{' '}
                <span className="accent">We want the account.</span>
              </>
            }
            lede="Building email and retention programmes for ecommerce brands since 2022, across apparel, coffee, bakery, wellness and kitchen goods in Europe, Australia and the US."
          />
        </div>
      </section>

      <section className="">
        <div className="shell py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div className="reveal">
              <div className="mt-7 space-y-6 text-[1.0625rem] leading-relaxed text-bone/85 md:text-[1.125rem]">
                <p>
                  Most ecommerce brands treat email as an afterthought: a
                  newsletter someone sends when there is a sale on, sitting on top
                  of three half-built flows that were configured during onboarding
                  and never touched again.
                </p>
                <p>
                  Meanwhile paid acquisition gets more expensive every year, and
                  the cheapest customers in the business, the ones who already
                  bought and already trust you, hear from you roughly never.
                </p>
                <p>
                  We take that channel over and run it properly: flows built
                  around how people actually buy from you, campaigns designed in
                  your brand rather than a template, and the unglamorous
                  deliverability work underneath that decides whether any of it
                  arrives.
                </p>
                <p className="font-display text-[1.4rem] italic leading-[1.15] tracking-tight text-bone">
                  You grow, we grow. That is the entire business model.
                </p>
              </div>
            </div>

            <div className="reveal" data-reveal-delay="110">
              <h2 className="display-md">What we believe</h2>
              <ol className="mt-7 border-t border-white/9">
                {BELIEFS.map((b) => (
                  <li key={b.index} className="border-b border-white/9 py-7">
                    <div className="flex gap-5">
                      <span className="font-display text-[0.875rem] tracking-[0.1em] text-flame">
                        {b.index}
                      </span>
                      <div>
                        <h2 className="font-display text-lg tracking-tight md:text-xl">
                          {b.title}
                        </h2>
                        <p className="mt-3 text-[0.9375rem] leading-relaxed text-mute">
                          {b.body}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- who/who not */}
      <section className="border-t border-white/8 bg-ink-raised">
        <div className="shell py-20 md:py-28">
          <SectionHead
            title={
              <>
                We are a very good fit for some brands and{' '}
                <span className="accent">a waste of money</span> for others.
              </>
            }
          />

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            <div className="reveal rounded-xl border border-white/10 bg-ink p-8 md:p-10">
              <h3 className="font-display text-lg tracking-tight text-flame">Good fit</h3>
              <ul className="mt-7 space-y-4">
                {[
                  'Ecommerce brands with consistent monthly revenue and an existing list',
                  'Klaviyo already installed, and visibly under-used',
                  'A brand with a real point of view that templates are flattening',
                  'Teams who want one partner owning the channel, not four suppliers',
                  'Founders who will look at an attributed-revenue number honestly',
                ].map((t) => (
                  <li key={t} className="flex gap-3.5 text-[0.9375rem] leading-relaxed text-bone/85">
                    <Check size={16} weight="bold" aria-hidden className="mt-1 shrink-0 text-flame" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="reveal rounded-xl border border-white/10 bg-ink p-8 md:p-10" data-reveal-delay="110">
              <h3 className="font-display text-lg tracking-tight text-mute">Bad fit</h3>
              <ul className="mt-7 space-y-4">
                {[
                  'Pre-revenue stores with no list to email yet',
                  'Anyone looking for a one-off template pack and no strategy',
                  'Brands whose core problem is the product or the offer, not the channel',
                  'Businesses that want to buy or scrape a list, which we will not send to',
                  'Anyone who needs a guaranteed revenue figure promised before the audit',
                ].map((t) => (
                  <li key={t} className="flex gap-3.5 text-[0.9375rem] leading-relaxed text-mute">
                    <X size={16} weight="bold" aria-hidden className="mt-1 shrink-0 text-mute/60" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <p className="reveal mt-10 text-[0.9375rem] text-mute">
            Not sure which you are?{' '}
            <Link href="/free-email-audit" className="text-flame underline underline-offset-4 hover:text-bone">
              Take the free audit
            </Link>{' '}
. We will tell you straight, and you can walk away with the findings.
          </p>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="shell">
          <p className="pt-12 text-center text-[0.6875rem] uppercase tracking-[0.22em] text-mute">
            Brands we have built for
          </p>
        </div>
        <Marquee />
        <div className="shell pb-16 text-center">
          <a
            href={`mailto:${SITE.email}`}
            className="text-[0.9375rem] text-mute transition-colors hover:text-flame"
          >
            {SITE.email}
          </a>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
