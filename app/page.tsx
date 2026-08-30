import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Calendar, Check, X } from '@phosphor-icons/react/dist/ssr';

import Marquee from '@/components/Marquee';
import EmailCard from '@/components/EmailCard';
import Faq from '@/components/Faq';
import AuditForm from '@/components/AuditForm';
import JsonLd from '@/components/JsonLd';
import { faqLd, pageMeta, serviceLd } from '@/lib/seo';
import {
  AUDIT_CHECKS,
  AUDIT_FAQS,
  BAD_FIT,
  BELIEFS,
  GOOD_FIT,
  HOME_FAQS,
  PROCESS,
  PROOF,
  SERVICES,
  SITE,
  SITE_URL,
  TESTIMONIALS,
  WORK,
} from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'Email Marketing Agency for Ecommerce Brands | Inferno Emails',
  description:
    'Email marketing agency for ecommerce brands. We build Klaviyo flows, design campaigns in your brand and fix deliverability. Book a free audit, no obligation.',
  path: '/',
});

/* The marketing site is one page. Everything that used to live on /services,
   /work, /about, /contact and /free-email-audit is a section here, and the
   nav scrolls between them. /blog is the only route with a page of its own.

   Eyebrow budget: ~12 sections, so at most 4 eyebrows and the hero is one of
   them. Every other section opens on its headline alone. */

const ALL_FAQS = [...HOME_FAQS, ...AUDIT_FAQS];

export default function HomePage() {
  const [lead, ...rest] = PROOF;

  return (
    <>
      <JsonLd data={faqLd(ALL_FAQS)} />
      {SERVICES.map((s) => (
        <JsonLd
          key={s.slug}
          data={serviceLd({
            name: s.title,
            description: s.summary,
            path: `/#services`,
          })}
        />
      ))}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Offer',
          '@id': `${SITE_URL}/#audit-offer`,
          name: 'Free email marketing audit',
          description:
            'A manual review of your ecommerce email programme: flow coverage, list health, deliverability and last-90-day performance.',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: SITE.calendly,
          seller: { '@id': `${SITE_URL}/#organization` },
        }}
      />

      {/* ---------------------------------------------------------- HERO */}
      <section className="pt-24 md:pt-24">
        <div className="shell grid items-center gap-12 pb-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14 lg:pb-24">
          <div className="reveal">
            <p className="eyebrow">Email and retention marketing</p>

            <h1 className="display-xl mt-6">
              Your cheapest revenue is{' '}
              <span className="accent">already on your list.</span>
            </h1>

            <p className="lede mt-6">
              Email marketing for ecommerce brands. We build the Klaviyo flows,
              design the campaigns, and fix the deliverability underneath.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-flame"
              >
                Book your free audit
                <ArrowRight size={16} weight="bold" className="arr" aria-hidden />
              </a>
              <Link href="#work" className="btn btn-ghost">
                See the work
              </Link>
            </div>

            <p className="mt-6 text-[0.875rem] text-mute">
              30 minutes, no obligation, and the findings are yours to keep.
            </p>
          </div>

          {/* A real client email, not a div-built mock of one. */}
          <div className="reveal" data-reveal-delay="120">
            <figure className="relative mx-auto max-w-md overflow-hidden rounded-xl border border-white/10 bg-ink-soft shadow-2xl shadow-black/60">
              <div className="h-[26rem] overflow-hidden md:h-[31rem]">
                <Image
                  src="/images/work-girafon.png"
                  alt="Girafon Bleu welcome email designed by Inferno Emails, introducing the brand with a 10% welcome offer"
                  width={600}
                  height={2189}
                  priority
                  sizes="(max-width: 1024px) 90vw, 31rem"
                  className="w-full"
                />
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-soft to-transparent"
                />
              </div>
              <figcaption className="border-t border-white/8 px-5 py-3.5 text-[0.8125rem] text-mute">
                Girafon Bleu, welcome flow
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Logo wall sits under the hero, never inside it. */}
        <div className="border-y border-white/8">
          <Marquee />
        </div>
      </section>

      {/* ------------------------------------------------------ PROOF ---- *
       * Asymmetric: one dashboard carries the section, two support it.    */}
      <section className="border-b border-white/8 bg-ink-raised">
        <div className="shell py-20 md:py-28">
          <div className="reveal max-w-3xl">
            <p className="eyebrow">Receipts</p>
            <h2 className="display-lg mt-6">
              Screenshots, <span className="accent">not adjectives.</span>
            </h2>
            <p className="lede mt-5">
              Klaviyo dashboards from client accounts, exact reporting windows
              shown. On these three, email accounted for 44% to 48% of total
              store revenue.
            </p>
          </div>

          <div className="mt-14 grid gap-6 lg:grid-cols-[1.35fr_1fr] lg:gap-8">
            <figure className="reveal overflow-hidden rounded-xl border border-white/10 bg-ink">
              <Image
                src={lead.image}
                alt={lead.alt}
                width={lead.width}
                height={lead.height}
                sizes="(max-width: 1024px) 92vw, 52vw"
                className="w-full border-b border-white/8 bg-white"
              />
              <figcaption className="p-7">
                <p className="font-display text-3xl tracking-tight text-bone">
                  {lead.headline}
                </p>
                <p className="mt-2 text-[1rem] text-flame">{lead.metric}</p>
                <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-mute">
                  {lead.note}
                </p>
                <p className="mt-6 border-t border-white/8 pt-4 text-[0.75rem] uppercase tracking-[0.14em] text-mute/70">
                  {lead.window}
                </p>
              </figcaption>
            </figure>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
              {rest.map((p, i) => (
                <figure
                  key={p.image}
                  className="reveal flex flex-col overflow-hidden rounded-xl border border-white/10 bg-ink"
                  data-reveal-delay={(i + 1) * 110}
                >
                  <Image
                    src={p.image}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    sizes="(max-width: 1024px) 92vw, 30vw"
                    className="w-full border-b border-white/8 bg-white"
                  />
                  <figcaption className="flex flex-1 flex-col p-6">
                    <p className="font-display text-xl tracking-tight text-bone">
                      {p.headline}
                    </p>
                    <p className="mt-1.5 text-[0.875rem] text-flame">{p.metric}</p>
                    <p className="mt-4 flex-1 text-[0.8125rem] leading-relaxed text-mute">
                      {p.note}
                    </p>
                    <p className="mt-5 border-t border-white/8 pt-3.5 text-[0.6875rem] uppercase tracking-[0.14em] text-mute/70">
                      {p.window}
                    </p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>

          <p className="reveal mt-9 max-w-2xl text-[0.8125rem] leading-relaxed text-mute/70">
            Results vary by brand, list size, category and offer. These are
            individual client accounts over the periods stated, not an average
            or a guarantee of what your store will do.
          </p>
        </div>
      </section>

      {/* --------------------------------------------------- SERVICES ---- *
       * Divided row list. The deliverables that used to sit behind four    *
       * separate service pages are inline here, two columns per row.      */}
      <section id="services" className="scroll-mt-20 border-b border-white/8">
        <div className="shell py-20 md:py-28">
          <div className="reveal max-w-3xl">
            <h2 className="display-lg">
              Four jobs, run as <span className="accent">one system.</span>
            </h2>
            <p className="lede mt-5">
              Design without deliverability lands in spam. Flows without
              strategy talk to the wrong people. You can buy these separately
              from four suppliers and spend your week translating between them,
              or have one team own the whole channel.
            </p>
          </div>

          <ul className="mt-14 divide-y divide-white/9 border-t border-white/9">
            {SERVICES.map((s, i) => (
              <li
                key={s.slug}
                className="reveal grid gap-6 py-10 md:py-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16"
                data-reveal-delay={i * 70}
              >
                <div>
                  <p className="font-display text-[0.875rem] tracking-[0.1em] text-flame">
                    {s.index}
                  </p>
                  <h3 className="display-md mt-4">{s.title}</h3>
                  <p className="mt-4 max-w-md text-[0.9375rem] leading-relaxed text-mute">
                    {s.summary}
                  </p>
                </div>

                <div>
                  <p className="max-w-2xl text-[1rem] leading-relaxed text-bone/85">
                    {s.intro}
                  </p>
                  <ul className="mt-7 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                    {s.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex gap-3 text-[0.875rem] leading-relaxed text-bone/75"
                      >
                        <Check
                          size={15}
                          weight="bold"
                          aria-hidden
                          className="mt-1 shrink-0 text-flame"
                        />
                        {d}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-7 border-l-2 border-flame pl-4 text-[0.9375rem] leading-relaxed text-mute">
                    {s.outcome}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------- WORK ---- *
       * Gallery grid. The only place a repeated card grid earns its keep. */}
      <section
        id="work"
        className="scroll-mt-20 border-b border-white/8 bg-ink-raised"
      >
        <div className="shell py-20 md:py-28">
          <div className="reveal max-w-2xl">
            <p className="eyebrow">Creative</p>
            <h2 className="display-lg mt-6">
              Emails that look like <span className="accent">your brand.</span>
            </h2>
            <p className="lede mt-5">
              Every piece was drawn from scratch for the brand it belongs to.
              Put the Girafon Bleu welcome next to the Kuchenkompane campaign
              and you would not guess the same team made both. Hover any of them
              to read the whole email.
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WORK.map((item, i) => (
              <div key={item.slug} className="reveal" data-reveal-delay={(i % 3) * 90}>
                <EmailCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- PROCESS ---- *
       * Sticky split. Used once on this page.                             */}
      <section className="border-b border-white/8">
        <div className="shell grid gap-12 py-20 md:py-28 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="reveal lg:sticky lg:top-28 lg:self-start">
            <h2 className="display-lg">
              Audit. Build. <span className="accent">Compound.</span>
            </h2>
            <p className="lede mt-5">
              No ninety-day discovery phase. We are in your account in week one
              and sending by week two.
            </p>
          </div>

          <ol className="divide-y divide-white/9 border-t border-white/9">
            {PROCESS.map((step, i) => (
              <li
                key={step.title}
                className="reveal py-8 md:py-10"
                data-reveal-delay={i * 90}
              >
                <h3 className="display-md">{step.title}</h3>
                <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-mute">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ------------------------------------------------------ ABOUT ---- */}
      <section
        id="about"
        className="scroll-mt-20 border-b border-white/8 bg-ink-raised"
      >
        <div className="shell py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="reveal">
              <h2 className="display-lg">
                Every agency wants your money.{' '}
                <span className="accent">We want the account.</span>
              </h2>
              <div className="mt-8 space-y-6 text-[1.0625rem] leading-relaxed text-bone/85 md:text-[1.125rem]">
                <p>
                  Building email and retention programmes for ecommerce brands
                  since 2022, across apparel, coffee, bakery, wellness and
                  kitchen goods in Europe, Australia and the US.
                </p>
                <p>
                  Most ecommerce brands treat email as an afterthought: a
                  newsletter someone sends when there is a sale on, sitting on
                  top of three half-built flows that were configured during
                  onboarding and never touched again. Meanwhile paid
                  acquisition gets more expensive every year, and the cheapest
                  customers in the business, the ones who already bought and
                  already trust you, hear from you roughly never.
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
              <h3 className="display-md">What we believe</h3>
              <ol className="mt-7 border-t border-white/9">
                {BELIEFS.map((b) => (
                  <li key={b.index} className="border-b border-white/9 py-7">
                    <div className="flex gap-5">
                      <span className="font-display text-[0.875rem] tracking-[0.1em] text-flame">
                        {b.index}
                      </span>
                      <div>
                        <h4 className="font-display text-lg tracking-tight md:text-xl">
                          {b.title}
                        </h4>
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

          {/* ------------------------------------------------ who / who not */}
          <div className="mt-20 md:mt-28">
            <h3 className="reveal display-lg max-w-4xl">
              We are a very good fit for some brands and{' '}
              <span className="accent">a waste of money</span> for others.
            </h3>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              <div className="reveal rounded-xl border border-white/10 bg-ink p-8 md:p-10">
                <h4 className="font-display text-lg tracking-tight text-flame">
                  Good fit
                </h4>
                <ul className="mt-7 space-y-4">
                  {GOOD_FIT.map((t) => (
                    <li
                      key={t}
                      className="flex gap-3.5 text-[0.9375rem] leading-relaxed text-bone/85"
                    >
                      <Check
                        size={16}
                        weight="bold"
                        aria-hidden
                        className="mt-1 shrink-0 text-flame"
                      />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className="reveal rounded-xl border border-white/10 bg-ink p-8 md:p-10"
                data-reveal-delay="110"
              >
                <h4 className="font-display text-lg tracking-tight text-mute">
                  Bad fit
                </h4>
                <ul className="mt-7 space-y-4">
                  {BAD_FIT.map((t) => (
                    <li
                      key={t}
                      className="flex gap-3.5 text-[0.9375rem] leading-relaxed text-mute"
                    >
                      <X
                        size={16}
                        weight="bold"
                        aria-hidden
                        className="mt-1 shrink-0 text-mute/60"
                      />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="reveal mt-10 text-[0.9375rem] text-mute">
              Not sure which you are?{' '}
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="text-flame underline underline-offset-4 hover:text-bone"
              >
                Book the free audit
              </a>
              . We will tell you straight, and you can walk away with the
              findings.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------- TESTIMONIALS ---- *
       * Offset composition, no card chrome, same dark ground as the rest. */}
      <section className="border-b border-white/8">
        <div className="shell py-20 md:py-28">
          <h2 className="reveal display-lg max-w-3xl">
            Don’t just take <span className="accent">our word</span> for it.
          </h2>

          <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-12">
            {TESTIMONIALS.map((t, i) => {
              const place = [
                'md:col-span-5 md:col-start-1',
                'md:col-span-5 md:col-start-8 md:mt-14',
                'md:col-span-5 md:col-start-3',
              ][i];
              return (
                <figure
                  key={t.author}
                  className={`reveal border-t border-white/12 pt-7 ${place}`}
                  data-reveal-delay={i * 110}
                >
                  <blockquote className="font-display text-xl leading-snug tracking-tight text-bone md:text-2xl">
                    “{t.quote}”
                  </blockquote>
                  <figcaption className="mt-6 text-[0.875rem]">
                    <span className="text-bone">{t.author}</span>
                    <span className="mt-0.5 block text-mute">{t.role}</span>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ AUDIT CHECKS ---- */}
      <section className="border-b border-white/8 bg-ink-raised">
        <div className="shell py-20 md:py-28">
          <div className="reveal max-w-3xl">
            <p className="eyebrow">The free audit</p>
            <h2 className="display-lg mt-6">
              Four things that decide{' '}
              <span className="accent">almost everything.</span>
            </h2>
            <p className="lede mt-5">
              Book the call and we review your account properly before it:
              flows, list health, authentication records and the last ninety
              days of performance. Reviewed by a person, not an automated PDF
              generator.
            </p>
          </div>

          <ol className="mt-14 grid gap-6 md:grid-cols-2">
            {AUDIT_CHECKS.map((c, i) => (
              <li
                key={c.index}
                className="reveal rounded-xl border border-white/10 bg-ink p-8"
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

      {/* -------------------------------------------------------- FAQ ---- */}
      <section id="faq" className="scroll-mt-20 border-b border-white/8">
        <div className="shell py-20 md:py-28">
          <h2 className="reveal display-lg max-w-2xl">
            The things people <span className="accent">actually ask.</span>
          </h2>
          <div className="reveal mt-12 max-w-3xl">
            <Faq items={ALL_FAQS} />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- CONTACT ---- *
       * Two ways in: book the call, or send the details and let us come    *
       * back to you. Same destination, different appetite for a calendar.  */}
      <section id="contact" className="scroll-mt-20 bg-ink-raised">
        <div className="shell grid gap-14 py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:py-28">
          <div className="reveal">
            <h2 className="display-lg">
              Find out what your list is{' '}
              <span className="accent">actually worth.</span>
            </h2>
            <p className="lede mt-7">
              Pick a time and we will walk your account with you: what is
              missing, what is leaking, and what we would do about it. No fee,
              no obligation, and the findings are yours to keep.
            </p>

            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-flame mt-9"
            >
              <Calendar size={17} weight="bold" aria-hidden />
              Book your free audit
              <ArrowRight size={16} weight="bold" className="arr" aria-hidden />
            </a>

            <ul className="mt-10 space-y-3 border-t border-white/9 pt-9">
              {[
                'Reviewed by a person, not an automated PDF generator',
                'One business day turnaround if you send it in writing',
                'Written findings you can hand to any agency, including not us',
              ].map((t) => (
                <li key={t} className="flex gap-3.5 text-[0.9375rem] text-bone/80">
                  <Check
                    size={16}
                    weight="bold"
                    aria-hidden
                    className="mt-0.5 shrink-0 text-flame"
                  />
                  {t}
                </li>
              ))}
            </ul>

            <dl className="mt-10 grid gap-6 border-t border-white/9 pt-9 sm:grid-cols-2">
              <div>
                <dt className="text-[0.875rem] text-mute">Email</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="font-display text-lg tracking-tight text-bone transition-colors hover:text-flame"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.875rem] text-mute">Instagram</dt>
                <dd className="mt-2">
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-lg tracking-tight text-bone transition-colors hover:text-flame"
                  >
                    @infernoemails
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div
            className="reveal rounded-xl border border-white/10 bg-ink p-7 md:p-10"
            data-reveal-delay="110"
          >
            <h3 className="font-display text-xl tracking-tight">
              Rather not book a call?
            </h3>
            <p className="mt-2 text-[0.875rem] text-mute">
              Send the details and we will come back within one business day.
            </p>
            <div className="mt-8">
              <AuditForm source="home-contact" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
