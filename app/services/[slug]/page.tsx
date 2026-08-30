import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ArrowRight, Check } from '@phosphor-icons/react/dist/ssr';

import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { breadcrumbLd, faqLd, pageMeta, serviceLd } from '@/lib/seo';
import { SERVICES, getService } from '@/lib/site';

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMeta({
    title: service.metaTitle,
    description: service.metaDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const others = SERVICES.filter((s) => s.slug !== service.slug);
  const path = `/services/${service.slug}`;

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.title, path },
        ])}
      />
      <JsonLd
        data={serviceLd({
          name: service.title,
          description: service.metaDescription,
          path,
        })}
      />
      <JsonLd data={faqLd(service.faqs)} />

      {/* ------------------------------------------------------- header */}
      <section className="border-b border-white/8 pt-24">
        <div className="shell pb-16 md:pb-20">
          <nav aria-label="Breadcrumb" className="mb-9">
            <ol className="flex flex-wrap items-center gap-2 text-[0.75rem] uppercase tracking-[0.14em] text-mute">
              <li><Link href="/" className="hover:text-bone">Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/services" className="hover:text-bone">Services</Link></li>
            </ol>
          </nav>

          <div className="reveal">
            <p className="eyebrow">Service</p>
            <h1 className="display-lg mt-7 max-w-4xl">{service.title}</h1>
            <p className="lede mt-7 max-w-2xl">{service.summary}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link href="/free-email-audit" className="btn btn-flame">
                Get your free audit
                <ArrowRight size={16} weight="bold" className="arr" aria-hidden />
              </Link>
              <Link href="/work" className="btn btn-ghost">
                See the work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------------------------------- body */}
      <section className="border-b border-white/8">
        <div className="shell py-20 md:py-28">
          <div className="reveal max-w-3xl">
            <p className="text-[1.125rem] leading-relaxed text-bone/85 md:text-[1.25rem]">
              {service.intro}
            </p>
            <p className="mt-8 border-l-2 border-flame pl-5 font-display text-[1.35rem] italic leading-[1.15] tracking-tight text-bone">
              {service.outcome}
            </p>
          </div>

          {/* Six deliverables is past the point where a hairline list reads
              well, so each one gets its own tile instead. */}
          <h2 className="reveal display-md mt-16">What you get</h2>
          <ul className="mt-8 grid gap-4 md:grid-cols-2">
            {service.deliverables.map((d, i) => (
              <li
                key={d}
                className="reveal flex items-start gap-3.5 rounded-xl border border-white/10 bg-ink-raised p-5"
                data-reveal-delay={(i % 2) * 80}
              >
                <Check
                  size={17}
                  weight="bold"
                  aria-hidden
                  className="mt-0.5 shrink-0 text-flame"
                />
                <span className="text-[0.9375rem] leading-relaxed text-bone/85">
                  {d}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------- FAQ */}
      <section className="border-t border-white/8 bg-ink-raised">
        <div className="shell py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="lg:sticky lg:top-32 lg:self-start">
              <h2 className="display-lg">
                About <span className="accent">{service.navTitle.toLowerCase()}.</span>
              </h2>
            </div>
            <div className="reveal">
              <Faq items={service.faqs} />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ siblings */}
      <section className="border-t border-white/8">
        <div className="shell py-20 md:py-24">
          <h2 className="display-md">The rest of the system</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-3">
            {others.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="group flex h-full flex-col rounded-xl border border-white/10 p-7 transition-colors hover:border-flame/50"
                >
                  <span className="font-display text-[0.8125rem] tracking-[0.1em] text-flame">
                    {s.index}
                  </span>
                  <span className="mt-4 font-display text-xl tracking-tight transition-colors group-hover:text-flame">
                    {s.title}
                  </span>
                  <span className="mt-3 flex-1 text-[0.875rem] leading-relaxed text-mute">
                    {s.summary}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
