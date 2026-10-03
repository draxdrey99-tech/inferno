import Link from 'next/link';
import { notFound } from 'next/navigation';

import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { breadcrumbLd, pageMeta } from '@/lib/seo';
import { SITE_URL } from '@/lib/site';
import { GLOSSARY, getTerm, termSiblings } from '@/lib/glossary';
import { FAQ_PAGES } from '@/lib/faq';
import { getServicePage } from '@/lib/service-pages';

type Props = { params: Promise<{ term: string }> };

export function generateStaticParams() {
  return GLOSSARY.map(({ slug }) => ({ term: slug }));
}

export async function generateMetadata({ params }: Props) {
  const { term } = await params;
  const t = getTerm(term);
  if (!t) return {};
  return pageMeta({
    title: t.metaTitle,
    description: t.metaDescription,
    path: `/glossary/${t.slug}`,
    image: '/opengraph-image',
  });
}

export default async function TermPage({ params }: Props) {
  const { term } = await params;
  const t = getTerm(term);
  if (!t) notFound();

  const path = `/glossary/${t.slug}`;
  const service = getServicePage(t.service);
  const related = [...GLOSSARY.filter((g) => t.related.includes(g.slug)), ...termSiblings(t.slug)].filter((g, i, a) => a.findIndex((x) => x.slug === g.slug) === i);
  const faqs = FAQ_PAGES.filter((f) => f.terms.includes(t.slug)).slice(0, 3);

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Glossary', path: '/glossary' }, { name: t.term, path }])} />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'DefinedTerm',
          '@id': `${SITE_URL}${path}#term`,
          name: t.term,
          description: t.definition,
          url: `${SITE_URL}${path}`,
          inDefinedTermSet: `${SITE_URL}/glossary`,
        }}
      />
      <section className="shell inner-page" aria-labelledby="term-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span>
          <Link href="/glossary">Glossary</Link><span>/</span>
          <span>{t.term}</span>
        </nav>
        <h1 id="term-title" className="display-xl max-w-4xl">What is {t.term}?</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">{t.definition}</p>
        <div className="mt-8 max-w-3xl space-y-5 text-[1rem] leading-relaxed text-bone/85">
          {t.body.map((p) => <p key={p}>{p}</p>)}
        </div>

        <h2 className="display-md mt-14">A worked example.</h2>
        <p className="mt-4 max-w-3xl text-[1rem] leading-relaxed text-bone/85">{t.example}</p>

        <h2 className="display-md mt-14">Common mistakes.</h2>
        <ul className="deliverables mt-6 max-w-3xl">{t.mistakes.map((m) => <li key={m}>{m}</li>)}</ul>

        {service && (
          <p className="lede mt-12 max-w-3xl">
            Want this handled for your store? See our{' '}
            <Link className="text-link" href={`/services/${service.slug}`}>{service.navTitle.toLowerCase()} service</Link>{' '}
            or <Link className="text-link" href="/free-email-audit">book a free audit</Link>.
          </p>
        )}
        {related.length > 0 && (
          <div className="related-links mt-8">
            {related.map((r) => <Link key={r.slug} href={`/glossary/${r.slug}`}>{r.term}</Link>)}
            {faqs.map((f) => <Link key={f.slug} href={`/faq/${f.slug}`}>{f.q}</Link>)}
          </div>
        )}
      </section>
      <CtaBand />
    </>
  );
}
