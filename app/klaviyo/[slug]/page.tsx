import Link from 'next/link';
import { notFound } from 'next/navigation';

import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { GLOSSARY } from '@/lib/glossary';
import { HOWTOS, getHowTo, howToSiblings } from '@/lib/howto';
import { breadcrumbLd, pageMeta } from '@/lib/seo';
import { getServicePage } from '@/lib/service-pages';
import { SITE_URL } from '@/lib/site';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return HOWTOS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const h = getHowTo(slug);
  if (!h) return {};
  return pageMeta({ title: h.task, description: h.metaDescription, path: `/klaviyo/${h.slug}`, image: '/opengraph-image' });
}

export default async function HowToPage({ params }: Props) {
  const { slug } = await params;
  const h = getHowTo(slug);
  if (!h) notFound();

  const path = `/klaviyo/${h.slug}`;
  const service = getServicePage(h.service);
  const terms = GLOSSARY.filter((t) => h.terms.includes(t.slug));
  const howToLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    '@id': `${SITE_URL}${path}#howto`,
    name: h.task,
    description: h.answer,
    step: h.steps.map((s, i) => ({ '@type': 'HowToStep', position: i + 1, name: s.title, text: s.body })),
  };

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Klaviyo how-to', path: '/klaviyo' }, { name: h.task, path }])} />
      <JsonLd data={howToLd} />
      <section className="shell inner-page" aria-labelledby="ht-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/klaviyo">Klaviyo how-to</Link>
        </nav>
        <h1 id="ht-title" className="display-xl max-w-4xl">{h.task}</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">{h.answer}</p>

        <h2 className="display-md mt-14">Have this ready.</h2>
        <ul className="deliverables mt-6 max-w-3xl">{h.before.map((b) => <li key={b}>{b}</li>)}</ul>

        <h2 className="display-md mt-14">Steps.</h2>
        <ol className="mt-6 max-w-3xl space-y-5">
          {h.steps.map((s, i) => (
            <li key={s.title}>
              <p className="text-[1.05rem] font-medium text-bone">{i + 1}. {s.title}</p>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-bone/75">{s.body}</p>
            </li>
          ))}
        </ol>

        <h2 className="display-md mt-14">Common pitfalls.</h2>
        <ul className="deliverables mt-6 max-w-3xl">{h.pitfalls.map((m) => <li key={m}>{m}</li>)}</ul>

        <h2 className="display-md mt-14">Check it worked.</h2>
        <ul className="deliverables mt-6 max-w-3xl">{h.checklist.map((m) => <li key={m}>{m}</li>)}</ul>

        <p className="mt-10 max-w-3xl text-[0.95rem] leading-relaxed text-bone/70">
          Klaviyo changes its interface from time to time, so treat the steps as the order of work and match the names to what you see on screen.
        </p>
        {service && (
          <p className="lede mt-8 max-w-3xl">
            Rather have this done for you? See our{' '}
            <Link className="text-link" href={`/services/${service.slug}`}>{service.navTitle.toLowerCase()} service</Link>{' '}
            or <Link className="text-link" href="/free-email-audit">book a free audit</Link>.
          </p>
        )}
        <div className="related-links mt-8">
          {terms.map((t) => <Link key={t.slug} href={`/glossary/${t.slug}`}>{t.term}</Link>)}
          {howToSiblings(h.slug).map((x) => <Link key={x.slug} href={`/klaviyo/${x.slug}`}>{x.task}</Link>)}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
