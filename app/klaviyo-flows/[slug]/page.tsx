import Link from 'next/link';
import { notFound } from 'next/navigation';

import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { FLOW_TEARDOWNS, flowSiblings, getFlowTeardown } from '@/lib/flow-teardowns';
import { GLOSSARY } from '@/lib/glossary';
import { breadcrumbLd, pageLd, pageMeta } from '@/lib/seo';
import { getServicePage } from '@/lib/service-pages';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return FLOW_TEARDOWNS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const f = getFlowTeardown(slug);
  if (!f) return {};
  return pageMeta({ title: f.metaTitle, description: f.metaDescription, path: `/klaviyo-flows/${f.slug}`, image: '/opengraph-image' });
}

export default async function FlowPage({ params }: Props) {
  const { slug } = await params;
  const f = getFlowTeardown(slug);
  if (!f) notFound();

  const path = `/klaviyo-flows/${f.slug}`;
  const service = getServicePage(f.service);
  const terms = GLOSSARY.filter((t) => f.terms.includes(t.slug));

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Klaviyo flows', path: '/klaviyo-flows' }, { name: f.flow, path }])} />
      <JsonLd data={pageLd({ type: 'WebPage', path, name: f.metaTitle, description: f.metaDescription })} />
      <section className="shell inner-page" aria-labelledby="fl-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/klaviyo-flows">Klaviyo flows</Link>
        </nav>
        <h1 id="fl-title" className="display-xl max-w-4xl">{f.flow}.</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">{f.answer}</p>

        <h2 className="display-md mt-14">Trigger and filters.</h2>
        <p className="mt-6 max-w-3xl text-[0.95rem] leading-relaxed text-bone/80">{f.trigger}</p>
        <ul className="deliverables mt-5 max-w-3xl">{f.filters.map((x) => <li key={x}>{x}</li>)}</ul>

        <h2 className="display-md mt-14">Sequence and timing.</h2>
        <ol className="mt-6 max-w-3xl space-y-5">
          {f.sequence.map((s, n) => (
            <li key={s.step}>
              <p className="text-[1.05rem] font-medium text-bone">{n + 1}. {s.step} <span className="text-bone/60">({s.timing})</span></p>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-bone/75">{s.purpose}</p>
            </li>
          ))}
        </ol>

        <h2 className="display-md mt-14">Branch logic.</h2>
        <ul className="deliverables mt-6 max-w-3xl">{f.branches.map((x) => <li key={x}>{x}</li>)}</ul>

        <h2 className="display-md mt-14">Copy outline.</h2>
        <ul className="mt-6 max-w-3xl space-y-5">
          {f.copyOutline.map((c) => (
            <li key={c.email}>
              <p className="text-[1.05rem] font-medium text-bone">{c.email}</p>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-bone/75">{c.outline}</p>
            </li>
          ))}
        </ul>

        <h2 className="display-md mt-14">What to watch.</h2>
        <ul className="deliverables mt-6 max-w-3xl">{f.measure.map((x) => <li key={x}>{x}</li>)}</ul>

        <h2 className="display-md mt-14">Common mistakes.</h2>
        <ul className="deliverables mt-6 max-w-3xl">{f.mistakes.map((x) => <li key={x}>{x}</li>)}</ul>

        <p className="mt-10 max-w-3xl text-[0.95rem] leading-relaxed text-bone/70">
          This is a starting structure, not a promise of results. Timing and offers depend on your product, your repurchase window and your list, so test and adjust.
        </p>
        {service && (
          <p className="lede mt-8 max-w-3xl">
            Want this built and tested for you? See our{' '}
            <Link className="text-link" href={`/services/${service.slug}`}>{service.navTitle.toLowerCase()} service</Link>{' '}
            or <Link className="text-link" href="/free-email-audit">book a free audit</Link>.
          </p>
        )}
        <div className="related-links mt-8">
          {terms.map((t) => <Link key={t.slug} href={`/glossary/${t.slug}`}>{t.term}</Link>)}
          {flowSiblings(f.slug).map((x) => <Link key={x.slug} href={`/klaviyo-flows/${x.slug}`}>{x.flow}</Link>)}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
