import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Check } from '@phosphor-icons/react/dist/ssr';

import SectionHead from '@/components/Section';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { breadcrumbLd, pageMeta } from '@/lib/seo';
import { PROCESS, SERVICES, SITE_URL } from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'Ecommerce Email Marketing Services',
  description:
    'Klaviyo email marketing, custom email design, deliverability repair and retention strategy, run as one system for ecommerce brands.',
  path: '/services',
});

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ])}
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          '@id': `${SITE_URL}/services#list`,
          name: 'Email marketing services',
          itemListElement: SERVICES.map((s, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: s.title,
            url: `${SITE_URL}/services/${s.slug}`,
          })),
        }}
      />

      <section className="border-b border-white/8 pt-24">
        <div className="shell pb-16 md:pb-20">
          <SectionHead
            eyebrow="Services"
            as="h1"
            title={
              <>
                Four jobs, run as{' '}
                <span className="accent">one system.</span>
              </>
            }
            lede="You can buy these separately from four different suppliers and spend your week translating between them. Or you can have one team own the whole channel."
          />
        </div>
      </section>

      <section className="">
        <div className="shell py-16 md:py-20">
          <div className="grid gap-6 md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <article
                key={s.slug}
                className="reveal group flex flex-col rounded-xl border border-white/10 bg-ink-raised p-8 transition-colors hover:border-flame/50 md:p-10"
                data-reveal-delay={(i % 2) * 90}
              >
                <p className="font-display text-[0.9375rem] tracking-[0.1em] text-flame">
                  {s.index}
                </p>
                <h2 className="display-md mt-5 transition-colors group-hover:text-flame">
                  <Link href={`/services/${s.slug}`} className="before:absolute before:inset-0">
                    {s.title}
                  </Link>
                </h2>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-mute">
                  {s.summary}
                </p>

                <ul className="mt-7 flex-1 space-y-2.5 border-t border-white/9 pt-7">
                  {s.deliverables.slice(0, 4).map((d) => (
                    <li key={d} className="flex gap-3 text-[0.875rem] text-bone/75">
                      <Check size={15} weight="bold" aria-hidden className="mt-0.5 shrink-0 text-flame" />
                      {d}
                    </li>
                  ))}
                </ul>

                <p className="mt-7 inline-flex items-center gap-2 text-[0.875rem] font-semibold text-bone">
                  What this includes
                  <ArrowRight size={15} weight="bold" aria-hidden className="transition-transform group-hover:translate-x-1" />
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/8 bg-ink-raised">
        <div className="shell py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <SectionHead
                    title={
                  <>
                    Audit. Build. <span className="accent">Compound.</span>
                  </>
                }
              />
            </div>
            <ol className="border-t border-white/9">
              {PROCESS.map((step, i) => (
                <li
                  key={step.index}
                  className="reveal grid gap-4 border-b border-white/9 py-9 md:grid-cols-[5rem_1fr] md:gap-8 md:py-11"
                  data-reveal-delay={i * 100}
                >
                  <span className="font-display text-[0.9375rem] tracking-[0.1em] text-flame">
                    {step.index}
                  </span>
                  <div>
                    <h3 className="display-md">{step.title}</h3>
                    <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-mute">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
