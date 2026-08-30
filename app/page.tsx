import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

import Marquee from '@/components/Marquee';
import EmailCard from '@/components/EmailCard';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { faqLd, pageMeta } from '@/lib/seo';
import {
  HOME_FAQS,
  PROCESS,
  PROOF,
  SERVICES,
  TESTIMONIALS,
  WORK,
} from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'Email Marketing Agency for Ecommerce Brands | Inferno Emails',
  description:
    'Email marketing agency for ecommerce brands. We build Klaviyo flows, design campaigns in your brand and fix deliverability. Free audit, no obligation.',
  path: '/',
});

/* Eyebrow budget: 9 sections, so at most 3 eyebrows and the hero is one
   of them. Every other section opens on its headline alone. */

export default function HomePage() {
  const [lead, ...rest] = PROOF;

  return (
    <>
      <JsonLd data={faqLd(HOME_FAQS)} />

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
              <Link href="/free-email-audit" className="btn btn-flame">
                Get your free audit
                <ArrowRight size={16} weight="bold" className="arr" aria-hidden />
              </Link>
              <Link href="/work" className="btn btn-ghost">
                See the work
              </Link>
            </div>
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
       * Divided row list. Four items, so a list is the right component.   */}
      <section className="border-b border-white/8">
        <div className="shell py-20 md:py-28">
          <div className="reveal max-w-3xl">
            <h2 className="display-lg">
              Four jobs, run as <span className="accent">one system.</span>
            </h2>
            <p className="lede mt-5">
              Design without deliverability lands in spam. Flows without
              strategy talk to the wrong people. We run all four.
            </p>
          </div>

          <ul className="mt-14 max-w-5xl divide-y divide-white/9">
            {SERVICES.map((s, i) => (
              <li key={s.slug} className="reveal group" data-reveal-delay={i * 70}>
                <Link
                  href={`/services/${s.slug}`}
                  className="flex items-start justify-between gap-8 py-8 md:py-9"
                >
                  <div>
                    <h3 className="display-md transition-colors group-hover:text-flame">
                      {s.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-[0.9375rem] leading-relaxed text-mute">
                      {s.summary}
                    </p>
                  </div>
                  <ArrowRight
                    size={20}
                    weight="bold"
                    aria-hidden
                    className="mt-1.5 hidden shrink-0 text-mute transition-all duration-300 group-hover:translate-x-1 group-hover:text-flame md:block"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------- WORK ---- *
       * Gallery grid. The only place a repeated card grid earns its keep. */}
      <section className="border-b border-white/8 bg-ink-raised">
        <div className="shell py-20 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="reveal max-w-2xl">
              <p className="eyebrow">Creative</p>
              <h2 className="display-lg mt-6">
                Emails that look like <span className="accent">your brand.</span>
              </h2>
              <p className="lede mt-5">
                Every piece was drawn from scratch for the brand it belongs to.
                Hover any of them to read the whole email.
              </p>
            </div>
            <Link href="/work" className="btn btn-ghost reveal">
              See the work
              <ArrowRight size={16} weight="bold" className="arr" aria-hidden />
            </Link>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WORK.slice(0, 6).map((item, i) => (
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

      {/* ----------------------------------------------- TESTIMONIALS ---- *
       * Offset composition, no card chrome, same dark ground as the rest. */}
      <section className="border-b border-white/8 bg-ink-raised">
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

      {/* -------------------------------------------------------- FAQ ---- *
       * Stacked full-width, so it does not repeat the process split.      */}
      <section className="border-b border-white/8">
        <div className="shell py-20 md:py-28">
          <h2 className="reveal display-lg max-w-2xl">
            The things people <span className="accent">actually ask.</span>
          </h2>
          <div className="reveal mt-12 max-w-3xl">
            <Faq items={HOME_FAQS} />
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
