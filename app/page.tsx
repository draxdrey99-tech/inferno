
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ArrowRight,
  Calendar,
  Check,
  Lightning,
  ListChecks,
  MagnifyingGlass,
  PaintBrush,
  Quotes,
  Repeat,
  Rocket,
  ShieldCheck,
  ChartLineUp,
  UsersThree,
  X,
} from '@phosphor-icons/react/dist/ssr';

import Hero from '@/components/Hero';
import ProofScenes from '@/components/ProofScenes';
import GalleryControls from '@/components/GalleryControls';
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
  SERVICES,
  SITE,
  SITE_URL,
  TESTIMONIALS,
  WORK,
} from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'Ecommerce Email Marketing Agency | Inferno Emails',
  description:
    'Email marketing agency for ecommerce brands. We build Klaviyo flows, design campaigns in your brand and fix deliverability. Book a free audit, no obligation.',
  path: '/',
});

/* The marketing site is one page. Everything that used to live on /services,
   /work, /about, /contact and /free-email-audit is a section here, and the
   nav scrolls between them. /blog is the only route with a page of its own.

   Eyebrow budget: 10 sections, so at most 4 badge pills. Used on the hero,
   the proof section, the work section and the audit-checks section. Every
   other section opens on its headline alone. */

const ALL_FAQS = [...HOME_FAQS, ...AUDIT_FAQS];

const SERVICE_ICON = {
  'klaviyo-email-marketing': Lightning,
  'email-design': PaintBrush,
  'email-deliverability': ShieldCheck,
  'retention-strategy': Repeat,
} as const;

const PROCESS_ICON = [MagnifyingGlass, Rocket, ChartLineUp];

const AUDIT_ICON = [ListChecks, UsersThree, ShieldCheck, ChartLineUp];



export default function HomePage() {


  return (
    <>
      <JsonLd data={faqLd(ALL_FAQS)} />
      {SERVICES.map((s) => (
        <JsonLd
          key={s.slug}
          data={serviceLd({
            name: s.title,
            description: s.summary,
            path: `/services/${s.slug}`,
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

      <Hero />
      <ProofScenes />

      {/* --------------------------------------------------- SERVICES ---- *
       * Bento grid: what we do, made scannable in one screenful. */}
      <section aria-label="Services" id="services" className="scroll-mt-20 border-b border-white/8">
        <div className="shell py-20 md:py-28">
          <div className="reveal max-w-3xl">
            <h2 className="display-lg">
              Four jobs, run as <span className="accent">one system.</span>
            </h2>
            <p className="lede mt-5">
              Design without deliverability lands in spam. Flows without
              strategy talk to the wrong people. Buy these separately from four
              suppliers and spend your week translating between them, or have
              one team own the whole channel.
            </p>
          </div>

          <div className="service-rows mt-14">
            {SERVICES.map((s, i) => {
              const Icon = SERVICE_ICON[s.slug as keyof typeof SERVICE_ICON];
              return (
                <div
                  key={s.slug}
                  className="card card-glow reveal flex flex-col rounded-xl p-8 md:p-9"
                  data-reveal-delay={i * 70}
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-flame/25 bg-gradient-to-br from-flame/20 to-ember/10 text-flame">
                    <Icon size={20} weight="bold" aria-hidden />
                  </div>
                  <h3 className="display-md mt-6">{s.title}</h3>
                  <Link href={`/services/${s.slug}`} className="text-link">Explore {s.navTitle.toLowerCase()}</Link>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-mute">
                    {s.summary}
                  </p>

                  <ul className="mt-6 grid flex-1 gap-x-6 gap-y-3 sm:grid-cols-2">
                    {s.deliverables.map((d) => (
                      <li
                        key={d}
                        className="flex gap-3 text-[0.8125rem] leading-relaxed text-bone/75"
                      >
                        <Check
                          size={14}
                          weight="bold"
                          aria-hidden
                          className="mt-1 shrink-0 text-flame"
                        />
                        {d}
                      </li>
                    ))}
                  </ul>

                  <p className="mt-6 border-t border-white/9 pt-5 text-[0.9375rem] leading-relaxed text-mute">
                    {s.outcome}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- WORK ---- *
       * Gallery grid. The only place a repeated card grid earns its keep. */}
      <section aria-label="Client email designs"
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

          <GalleryControls />
          <div id="work-rail" className="work-rail mt-8" role="region" aria-label="Email design portfolio" tabIndex={0}>
            {WORK.map((item, i) => (
              <div key={item.slug} className="reveal" data-reveal-delay={(i % 3) * 90}>
                <EmailCard item={item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- PROCESS ---- *
       * Three-step timeline with a connecting line. */}
      <section aria-label="Our process" className="border-b border-white/8">
        <div className="shell py-20 md:py-28">
          <div className="reveal max-w-2xl">
            <h2 className="display-lg">
              Audit. Build. <span className="accent">Compound.</span>
            </h2>
            <p className="lede mt-5">
              No ninety-day discovery phase. We are in your account in week one
              and sending by week two.
            </p>
          </div>

          <div className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-10">
            <div
              aria-hidden
              className="pointer-events-none absolute left-[16.6%] right-[16.6%] top-[1.375rem] hidden h-px bg-gradient-to-r from-flame/40 via-white/15 to-ember/40 md:block"
            />
            {PROCESS.map((step, i) => {
              const Icon = PROCESS_ICON[i];
              return (
                <div key={step.title} className="reveal" data-reveal-delay={i * 100}>
                  <div className="relative z-10 grid h-11 w-11 place-items-center rounded-full border border-flame/30 bg-ink text-flame">
                    <Icon size={18} weight="bold" aria-hidden />
                  </div>
                  <h3 className="display-md mt-6">{step.title}</h3>
                  <p className="mt-4 max-w-sm text-[0.9375rem] leading-relaxed text-mute">
                    {step.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ ABOUT ---- */}
      <section aria-label="About Inferno Emails"
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
                <p className="accent font-display text-[1.4rem] leading-[1.2] tracking-tight">
                  You grow, we grow. That is the entire business model.
                </p>
              </div>
            </div>

            <div className="reveal" data-reveal-delay="110">
              <p className="lede mb-8">Our aim: Turn your email list into your most profitable channel.</p>
              <h3 className="display-md">What we believe</h3>
              <div className="mt-7 space-y-5">
                {BELIEFS.map((b) => (
                  <div key={b.index} className="card rounded-xl p-6 md:p-7">
                    <div className="flex gap-4">
                      <div>
                        <h4 className="font-display text-lg tracking-tight md:text-xl">
                          {b.title}
                        </h4>
                        <p className="mt-3 text-[0.9375rem] leading-relaxed text-mute">
                          {b.body}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ------------------------------------------------ who / who not */}
          <div className="mt-20 md:mt-28">
            <h3 className="reveal display-lg max-w-4xl">
              We are a very good fit for some brands and{' '}
              <span className="accent">a waste of money</span> for others.
            </h3>

            <div className="mt-14 grid gap-6 md:grid-cols-2">
              <div className="card reveal rounded-xl p-8 md:p-10">
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
                className="card reveal rounded-xl p-8 md:p-10"
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

      {/* ----------------------------------------------- TESTIMONIALS ---- */}
      <section aria-label="Client testimonials" className="border-b border-white/8">
        <div className="shell py-20 md:py-28">
          <h2 className="reveal display-lg max-w-3xl">
            Don’t just take <span className="accent">our word</span> for it.
          </h2>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.author}
                className="card reveal flex flex-col rounded-xl p-8"
                data-reveal-delay={i * 100}
              >
                <Quotes size={28} weight="fill" aria-hidden className="text-flame/50" />
                <blockquote className="mt-5 flex-1 font-display text-xl leading-snug tracking-tight text-bone">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 border-t border-white/9 pt-5 text-[0.875rem]">
                  <span className="text-bone">{t.author}</span>
                  <span className="mt-0.5 block text-mute">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ AUDIT CHECKS ---- */}
      <section aria-label="Free audit scope" className="border-b border-white/8 bg-ink-raised">
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

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {AUDIT_CHECKS.map((c, i) => {
              const Icon = AUDIT_ICON[i];
              return (
                <div
                  key={c.index}
                  className="card reveal rounded-xl p-8"
                  data-reveal-delay={(i % 2) * 90}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-flame/25 bg-gradient-to-br from-flame/20 to-ember/10 text-flame">
                    <Icon size={20} weight="bold" aria-hidden />
                  </div>
                  <h3 className="display-md mt-5">{c.title}</h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-mute">
                    {c.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- FAQ ---- */}
      <section aria-label="Frequently asked questions" id="faq" className="scroll-mt-20 border-b border-white/8">
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
      <section aria-label="Book or request your audit" id="contact" className="scroll-mt-20 relative isolate overflow-hidden bg-ink-raised">
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="orb orb-flame -bottom-40 -left-24 h-96 w-96 opacity-20" />
        </div>
        <div className="shell relative grid gap-14 py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:py-28">
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
            className="card reveal rounded-xl p-7 md:p-10"
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
