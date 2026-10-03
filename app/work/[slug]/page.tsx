import Link from 'next/link';
import { notFound } from 'next/navigation';

import CtaBand from '@/components/CtaBand';
import EmailCard from '@/components/EmailCard';
import JsonLd from '@/components/JsonLd';
import { breadcrumbLd, pageMeta } from '@/lib/seo';
import { serviceForWork } from '@/lib/service-pages';
import { USE_CASES } from '@/lib/use-cases';
import { SITE_URL, WORK, getWork } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return WORK.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) return {};
  return pageMeta({
    title: `${w.client} ${w.title}: Email Design Example`,
    description: `${w.type} designed for ${w.client} in Klaviyo. ${w.note}`,
    path: `/work/${w.slug}`,
    image: w.image,
  });
}

export default async function WorkCase({ params }: Props) {
  const { slug } = await params;
  const w = getWork(slug);
  if (!w) notFound();

  const path = `/work/${w.slug}`;
  const service = serviceForWork(w.type);
  const industry = USE_CASES.find((u) => u.work.includes(w.slug));
  const more = WORK.filter((o) => o.slug !== w.slug).slice(0, 3);

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Work', path: '/work' }, { name: w.client, path }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'ImageObject',
          '@id': `${SITE_URL}${path}#image`,
          name: `${w.client}: ${w.title}`,
          description: w.note,
          caption: w.alt,
          contentUrl: `${SITE_URL}${w.image}`,
          genre: w.type,
          creator: { '@id': `${SITE_URL}/#organization` },
          copyrightHolder: { '@type': 'Organization', name: w.client },
        }}
      />
      <section className="shell inner-page" aria-labelledby="case-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span>
          <Link href="/work">Work</Link><span>/</span>
          <span>{w.client}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,26rem)] lg:gap-20">
          <div>
            <p className="mono-label mono-label-dot">{w.type}</p>
            <h1 id="case-title" className="display-xl mt-5">{w.client}: {w.title.toLowerCase()}.</h1>
            <p className="lede mt-7" id="answer">
              A {w.type.toLowerCase()} designed from scratch and built in Klaviyo for {w.client}. {w.note}
            </p>

            <h2 className="display-md mt-14">What we made.</h2>
            <p className="mt-4 text-[1rem] leading-relaxed text-bone/85">
              Inferno Emails designed and built this email for {w.client}. It was drawn for their brand rather than adapted from a template, and built to render properly across inboxes, including dark mode.
            </p>

            <h2 className="display-md mt-12">Where it fits.</h2>
            <p className="mt-4 text-[1rem] leading-relaxed text-bone/85">
              This is part of our{' '}
              <Link className="text-link" href={`/services/${service.slug}`}>{service.navTitle.toLowerCase()}</Link> work
              {industry && (
                <>
                  , and shows how we approach{' '}
                  <Link className="text-link" href={`/email-marketing-for/${industry.slug}`}>email marketing for {industry.label}</Link>
                </>
              )}
              .
            </p>

            <p className="mt-10 text-[0.8125rem] text-mute">
              Results are not shown per email. Dated, unattributed account results are on the{' '}
              <Link className="text-link" href="/#proof">home page</Link>.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/free-email-audit" className="btn btn-flame">Book your free audit</Link>
              <Link href="/work" className="btn-line">All examples</Link>
            </div>
          </div>
          <div><EmailCard item={w} priority /></div>
        </div>
      </section>

      <section className="shell section-space border-t" aria-labelledby="case-more">
        <h2 id="case-more" className="display-md">More examples.</h2>
        <div className="related-links">
          {more.map((o) => <Link key={o.slug} href={`/work/${o.slug}`}>{o.client}: {o.title}</Link>)}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
