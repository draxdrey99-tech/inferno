import Link from 'next/link';
import { notFound } from 'next/navigation';

import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { COMPARISONS, comparisonSiblings, getComparison } from '@/lib/comparisons';
import { GLOSSARY } from '@/lib/glossary';
import { breadcrumbLd, pageLd, pageMeta } from '@/lib/seo';
import { getServicePage } from '@/lib/service-pages';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return COMPARISONS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) return {};
  return pageMeta({ title: c.metaTitle, description: c.metaDescription, path: `/compare/${c.slug}`, image: '/opengraph-image' });
}

export default async function ComparePage({ params }: Props) {
  const { slug } = await params;
  const c = getComparison(slug);
  if (!c) notFound();

  const path = `/compare/${c.slug}`;
  const service = getServicePage(c.service);
  const terms = GLOSSARY.filter((t) => c.terms.includes(t.slug));

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Compare', path: '/compare' }, { name: `${c.a} vs ${c.b}`, path }])} />
      <JsonLd data={pageLd({ type: 'WebPage', path, name: c.metaTitle, description: c.metaDescription })} />
      <section className="shell inner-page" aria-labelledby="cmp-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/compare">Compare</Link>
        </nav>
        <h1 id="cmp-title" className="display-xl max-w-4xl">{c.a} vs {c.b}.</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">{c.answer}</p>

        <h2 className="display-md mt-14">Side by side.</h2>
        <div className="mt-6 max-w-4xl overflow-x-auto">
          <table className="w-full border-collapse text-left text-[0.92rem]">
            <thead>
              <tr className="border-b border-bone/20">
                <th scope="col" className="py-3 pr-4 font-medium text-bone">Feature</th>
                <th scope="col" className="py-3 pr-4 font-medium text-bone">{c.a}</th>
                <th scope="col" className="py-3 font-medium text-bone">{c.b}</th>
              </tr>
            </thead>
            <tbody>
              {c.table.map((r) => (
                <tr key={r.feature} className="border-b border-bone/10 align-top">
                  <th scope="row" className="py-3 pr-4 font-medium text-bone">{r.feature}</th>
                  <td className="py-3 pr-4 leading-relaxed text-bone/75">{r.a}</td>
                  <td className="py-3 leading-relaxed text-bone/75">{r.b}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="display-md mt-14">{c.a} suits you if.</h2>
        <ul className="deliverables mt-6 max-w-3xl">{c.suitsA.map((x) => <li key={x}>{x}</li>)}</ul>
        <h2 className="display-md mt-14">{c.b} suits you if.</h2>
        <ul className="deliverables mt-6 max-w-3xl">{c.suitsB.map((x) => <li key={x}>{x}</li>)}</ul>

        <h2 className="display-md mt-14">Our view.</h2>
        <div className="mt-6 max-w-3xl space-y-4 text-[0.95rem] leading-relaxed text-bone/80">
          {c.verdict.map((p) => <p key={p}>{p}</p>)}
        </div>

        <h2 className="display-md mt-14">Moving from {c.b} to {c.a}.</h2>
        <ol className="mt-6 max-w-3xl list-decimal space-y-3 pl-5 text-[0.95rem] leading-relaxed text-bone/80">
          {c.migration.map((m) => <li key={m}>{m}</li>)}
        </ol>

        <p className="mt-10 max-w-3xl text-[0.95rem] leading-relaxed text-bone/70">
          Plans, features and limits change often. Check each vendor&apos;s current documentation before you decide.
        </p>
        {service && (
          <p className="lede mt-8 max-w-3xl">
            Want a second opinion on your own account? See our{' '}
            <Link className="text-link" href={`/services/${service.slug}`}>{service.navTitle.toLowerCase()} service</Link>{' '}
            or <Link className="text-link" href="/free-email-audit">book a free audit</Link>.
          </p>
        )}
        <div className="related-links mt-8">
          {terms.map((t) => <Link key={t.slug} href={`/glossary/${t.slug}`}>{t.term}</Link>)}
          {comparisonSiblings(c.slug).map((x) => <Link key={x.slug} href={`/compare/${x.slug}`}>{x.a} vs {x.b}</Link>)}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
