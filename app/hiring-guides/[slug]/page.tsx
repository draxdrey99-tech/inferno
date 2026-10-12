import Link from 'next/link';
import { notFound } from 'next/navigation';

import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { GLOSSARY } from '@/lib/glossary';
import { HIRING_GUIDES, getHiringGuide, hiringSiblings } from '@/lib/hiring-guides';
import { breadcrumbLd, faqLd, pageLd, pageMeta } from '@/lib/seo';
import { getServicePage } from '@/lib/service-pages';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return HIRING_GUIDES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const g = getHiringGuide(slug);
  if (!g) return {};
  return pageMeta({ title: g.metaTitle, description: g.metaDescription, path: `/hiring-guides/${g.slug}`, image: '/opengraph-image' });
}

export default async function HiringGuidePage({ params }: Props) {
  const { slug } = await params;
  const g = getHiringGuide(slug);
  if (!g) notFound();

  const path = `/hiring-guides/${g.slug}`;
  const service = getServicePage(g.service);
  const terms = GLOSSARY.filter((t) => g.terms.includes(t.slug));

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Hiring guides', path: '/hiring-guides' }, { name: g.title, path }])} />
      <JsonLd data={faqLd(g.faqs)} />
      <JsonLd data={pageLd({ type: 'WebPage', path, name: g.metaTitle, description: g.metaDescription })} />
      <section className="shell inner-page" aria-labelledby="hg-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/hiring-guides">Hiring guides</Link>
        </nav>
        <h1 id="hg-title" className="display-xl max-w-4xl">{g.title}.</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">{g.answer}</p>

        {g.sections.map((s) => (
          <div key={s.heading}>
            <h2 className="display-md mt-14">{s.heading}.</h2>
            <div className="mt-6 max-w-3xl space-y-4 text-[0.95rem] leading-relaxed text-bone/80">
              {s.body.map((p) => <p key={p}>{p}</p>)}
            </div>
          </div>
        ))}

        <h2 className="display-md mt-14">In practice.</h2>
        <p className="mt-6 max-w-3xl text-[0.95rem] leading-relaxed text-bone/80">{g.scenario}</p>

        <h2 className="display-md mt-14">Checklist.</h2>
        <ul className="deliverables mt-6 max-w-3xl">{g.checklist.map((x) => <li key={x}>{x}</li>)}</ul>

        <h2 className="display-md mt-14">Common mistakes.</h2>
        <ul className="deliverables mt-6 max-w-3xl">{g.mistakes.map((x) => <li key={x}>{x}</li>)}</ul>

        <h2 className="display-md mt-14">Questions people ask.</h2>
        <div className="mt-6 max-w-3xl space-y-6">
          {g.faqs.map((f) => (
            <div key={f.q}>
              <h3 className="text-[1.05rem] font-medium text-bone">{f.q}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-bone/80">{f.a}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-[0.95rem] leading-relaxed text-bone/70">
          Inferno Emails is an agency, so we have an interest in you hiring one. This guide is written to help you choose well, including choosing someone else or doing the work yourself.
        </p>
        <p className="lede mt-8 max-w-3xl">
          Want a straight answer on your own account? Our free audit lists what is missing and what to fix first, with no obligation. See the{' '}
          {service ? <Link className="text-link" href={`/services/${service.slug}`}>{service.navTitle.toLowerCase()} service</Link> : 'services'}{' '}
          or <Link className="text-link" href="/free-email-audit">book your free audit</Link>.
        </p>
        <div className="related-links mt-8">
          {terms.map((t) => <Link key={t.slug} href={`/glossary/${t.slug}`}>{t.term}</Link>)}
          {hiringSiblings(g.slug).map((x) => <Link key={x.slug} href={`/hiring-guides/${x.slug}`}>{x.title}</Link>)}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
