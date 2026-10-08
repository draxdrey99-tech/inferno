import Link from 'next/link';
import { notFound } from 'next/navigation';

import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { GLOSSARY } from '@/lib/glossary';
import { INTEGRATIONS, getIntegration, integrationSiblings } from '@/lib/integrations';
import { breadcrumbLd, pageLd, pageMeta } from '@/lib/seo';
import { getServicePage } from '@/lib/service-pages';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return INTEGRATIONS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const i = getIntegration(slug);
  if (!i) return {};
  return pageMeta({ title: i.metaTitle, description: i.metaDescription, path: `/klaviyo/integrations/${i.slug}`, image: '/opengraph-image' });
}

export default async function IntegrationPage({ params }: Props) {
  const { slug } = await params;
  const i = getIntegration(slug);
  if (!i) notFound();

  const path = `/klaviyo/integrations/${i.slug}`;
  const service = getServicePage(i.service);
  const terms = GLOSSARY.filter((t) => i.terms.includes(t.slug));

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Klaviyo how-to', path: '/klaviyo' }, { name: 'Integrations', path: '/klaviyo/integrations' }, { name: i.app, path }])} />
      <JsonLd data={pageLd({ type: 'WebPage', path, name: i.metaTitle, description: i.metaDescription })} />
      <section className="shell inner-page" aria-labelledby="int-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/klaviyo">Klaviyo how-to</Link><span>/</span><Link href="/klaviyo/integrations">Integrations</Link>
        </nav>
        <h1 id="int-title" className="display-xl max-w-4xl">Klaviyo and {i.app}.</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">{i.answer}</p>

        <h2 className="display-md mt-14">What {i.app} sends to Klaviyo.</h2>
        <ul className="deliverables mt-6 max-w-3xl">{i.events.map((e) => <li key={e.name}><strong>{e.name}.</strong> {e.meaning}</li>)}</ul>

        <h2 className="display-md mt-14">Flows it enables.</h2>
        <ul className="mt-6 max-w-3xl space-y-5">
          {i.flows.map((f) => (
            <li key={f.title}>
              <p className="text-[1.05rem] font-medium text-bone">{f.title}</p>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-bone/75">{f.body}</p>
            </li>
          ))}
        </ul>

        <h2 className="display-md mt-14">Setup order.</h2>
        <ol className="mt-6 max-w-3xl space-y-5">
          {i.setup.map((s, n) => (
            <li key={s.title}>
              <p className="text-[1.05rem] font-medium text-bone">{n + 1}. {s.title}</p>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-bone/75">{s.body}</p>
            </li>
          ))}
        </ol>

        <h2 className="display-md mt-14">Common pitfalls.</h2>
        <ul className="deliverables mt-6 max-w-3xl">{i.pitfalls.map((m) => <li key={m}>{m}</li>)}</ul>

        <p className="mt-10 max-w-3xl text-[0.95rem] leading-relaxed text-bone/70">
          Apps and Klaviyo both change their screens and options over time, so confirm names against what you see and check each app&apos;s own documentation for current details.
        </p>
        {service && (
          <p className="lede mt-8 max-w-3xl">
            Want this wired up and tested for you? See our{' '}
            <Link className="text-link" href={`/services/${service.slug}`}>{service.navTitle.toLowerCase()} service</Link>{' '}
            or <Link className="text-link" href="/free-email-audit">book a free audit</Link>.
          </p>
        )}
        <div className="related-links mt-8">
          {terms.map((t) => <Link key={t.slug} href={`/glossary/${t.slug}`}>{t.term}</Link>)}
          {integrationSiblings(i.slug).map((x) => <Link key={x.slug} href={`/klaviyo/integrations/${x.slug}`}>Klaviyo and {x.app}</Link>)}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
