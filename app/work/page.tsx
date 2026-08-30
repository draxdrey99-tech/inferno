import Image from 'next/image';
import type { Metadata } from 'next';

import SectionHead from '@/components/Section';
import EmailCard from '@/components/EmailCard';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import Marquee from '@/components/Marquee';
import { breadcrumbLd, pageMeta } from '@/lib/seo';
import { PROOF, TESTIMONIALS, WORK } from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'Our Work: Email Design Portfolio',
  description:
    'Email campaigns and flows designed and shipped by Inferno Emails for ecommerce brands, plus the Klaviyo dashboards showing what they earned.',
  path: '/work',
});

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/work' },
        ])}
      />

      <section className="border-b border-white/8 pt-24">
        <div className="shell pb-16 md:pb-20">
          <SectionHead
            eyebrow="Work"
            as="h1"
            title={
              <>
                Every one of these was drawn{' '}
                <span className="accent">from scratch.</span>
              </>
            }
            lede="No template packs. Put the Girafon Bleu welcome next to the Kuchenkompane campaign and you would not guess the same team made both. Hover any email to read the whole thing."
          />
        </div>
      </section>

      <section className="">
        <div className="shell py-16 md:py-20">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WORK.map((item, i) => (
              <div key={item.slug} className="reveal" data-reveal-delay={(i % 3) * 90}>
                <EmailCard item={item} priority={i < 3} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ receipts */}
      <section className="border-t border-white/8 bg-ink-raised">
        <div className="shell py-20 md:py-28">
          <SectionHead
            title={
              <>
                The <span className="accent">dashboards</span>, not the adjectives.
              </>
            }
            lede="Klaviyo business performance summaries from client accounts, exact reporting windows shown."
          />

          <div className="mt-16 grid gap-8 lg:grid-cols-3">
            {PROOF.map((p, i) => (
              <figure
                key={p.image}
                className="reveal flex flex-col overflow-hidden rounded-xl border border-white/10 bg-ink"
                data-reveal-delay={i * 110}
              >
                <div className="overflow-hidden border-b border-white/8 bg-white">
                  <Image
                    src={p.image}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    sizes="(max-width: 1024px) 92vw, 30vw"
                    className="w-full"
                  />
                </div>
                <figcaption className="flex flex-1 flex-col p-6">
                  <p className="font-display text-2xl tracking-tight text-bone">
                    {p.headline}
                  </p>
                  <p className="mt-1.5 text-[0.9375rem] text-flame">{p.metric}</p>
                  <p className="mt-4 flex-1 text-[0.875rem] leading-relaxed text-mute">
                    {p.note}
                  </p>
                  <p className="mt-5 border-t border-white/8 pt-4 text-[0.75rem] uppercase tracking-[0.14em] text-mute/70">
                    {p.window}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>

          <p className="reveal mt-10 max-w-2xl text-[0.8125rem] leading-relaxed text-mute/70">
            Results vary by brand, list size, category and offer. These are
            individual client accounts over the periods stated, not an average or
            a guarantee of what your store will do.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------- testimonials */}
      <section className="border-t border-white/8">
        <div className="shell py-20 md:py-28">
          <SectionHead
            title={
              <>
                In <span className="accent">their words.</span>
              </>
            }
          />
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.author}
                className="reveal flex flex-col border-t border-white/12 pt-7"
                data-reveal-delay={i * 110}
              >
                <blockquote className="flex-1 font-display text-xl leading-snug tracking-tight text-bone">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-6 text-[0.875rem]">
                  <span className="text-bone">{t.author}</span>
                  <span className="mt-0.5 block text-mute">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8">
        <div className="shell">
          <p className="pt-12 text-center text-[0.6875rem] uppercase tracking-[0.22em] text-mute">
            Brands we have built for
          </p>
        </div>
        <Marquee />
      </section>

      <CtaBand />
    </>
  );
}
