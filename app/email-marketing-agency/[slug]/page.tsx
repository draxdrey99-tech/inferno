import Link from 'next/link';
import { notFound } from 'next/navigation';

import CalendlyLink from '@/components/CalendlyLink';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { AGENCY_PAGES, agencySiblings, getAgencyPage } from '@/lib/agency';
import { LOCATIONS, getLocation } from '@/lib/agency-locations';
import { GLOSSARY } from '@/lib/glossary';
import { breadcrumbLd, faqLd, pageLd, pageMeta, serviceLd } from '@/lib/seo';
import { getServicePage } from '@/lib/service-pages';

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [...AGENCY_PAGES, ...LOCATIONS].map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const p = getAgencyPage(slug) ?? getLocation(slug);
  if (!p) return {};
  return pageMeta({ title: p.metaTitle, description: p.metaDescription, path: `/email-marketing-agency/${p.slug}`, image: '/opengraph-image' });
}

export default async function AgencyPage({ params }: Props) {
  const { slug } = await params;
  const page = getAgencyPage(slug);
  const loc = getLocation(slug);
  const p = page ?? loc;
  if (!p) notFound();

  const path = `/email-marketing-agency/${p.slug}`;
  const service = getServicePage(p.service);
  const terms = GLOSSARY.filter((t) => p.terms.includes(t.slug));
  const nearby = loc ? loc.nearby.map((s) => getLocation(s)).filter((x) => !!x) : [];
  const siblings = page ? agencySiblings(page.slug) : [];
  const country = loc && loc.kind === 'city' ? getLocation(loc.country === 'United States' ? 'usa' : loc.country === 'United Kingdom' ? 'united-kingdom' : loc.country.toLowerCase()) : null;

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Email marketing agency', path: '/email-marketing-agency' }, { name: p.h1, path }])} />
      <JsonLd data={faqLd(p.faqs)} />
      <JsonLd data={pageLd({ type: 'WebPage', path, name: p.metaTitle, description: p.metaDescription })} />
      <JsonLd data={serviceLd({ name: p.h1, description: p.metaDescription, path, ...(loc ? { areaServed: { name: loc.name, type: loc.kind === 'city' ? 'City' : 'Country' } } : {}) })} />
      <section className="shell inner-page" aria-labelledby="ag-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/email-marketing-agency">Email marketing agency</Link>
        </nav>
        <h1 id="ag-title" className="display-xl max-w-4xl">{p.h1}.</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">{p.answer}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <CalendlyLink source="agency-page" className="btn btn-flame">Book your free audit</CalendlyLink>
          <Link className="text-link self-center" href="/work">See our email work</Link>
        </div>

        {p.sections.map((s) => (
          <div key={s.heading}>
            <h2 className="display-md mt-14">{s.heading}.</h2>
            <div className="mt-6 max-w-3xl space-y-4 text-[0.95rem] leading-relaxed text-bone/80">
              {s.body.map((t) => <p key={t}>{t}</p>)}
            </div>
          </div>
        ))}

        {page && (
          <>
            <h2 className="display-md mt-14">Questions to ask any agency.</h2>
            <ul className="deliverables mt-6 max-w-3xl">{page.checklist.map((x) => <li key={x}>{x}</li>)}</ul>
            <div className="mt-14 grid max-w-4xl gap-10 md:grid-cols-2">
              <div>
                <h2 className="display-md">Who it suits.</h2>
                <ul className="deliverables mt-6">{page.suits.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
              <div>
                <h2 className="display-md">Who should look elsewhere.</h2>
                <ul className="deliverables mt-6">{page.notFor.map((x) => <li key={x}>{x}</li>)}</ul>
              </div>
            </div>
          </>
        )}

        <h2 className="display-md mt-14">Questions people ask.</h2>
        <div className="mt-6 max-w-3xl space-y-6">
          {p.faqs.map((f) => (
            <div key={f.q}>
              <h3 className="text-[1.05rem] font-medium text-bone">{f.q}</h3>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-bone/80">{f.a}</p>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-[0.95rem] leading-relaxed text-bone/70">
          {loc
            ? 'We are a remote agency and do not claim an office or a local team in ' + loc.name + '. Nothing here is legal advice; take advice on consent and privacy rules for your own list.'
            : 'Inferno Emails is an agency, so we have an interest in you hiring one. This page is written to help you choose well, including choosing someone else or doing the work yourself.'}
        </p>
        <p className="lede mt-8 max-w-3xl">
          Want a straight answer on your own account? Our free audit lists what is missing and what to fix first, with no obligation. See the{' '}
          {service ? <Link className="text-link" href={`/services/${service.slug}`}>{service.navTitle.toLowerCase()} service</Link> : 'services'}{' '}
          or <Link className="text-link" href="/free-email-audit">book your free audit</Link>.
        </p>
        <div className="related-links mt-8">
          {country && <Link href={`/email-marketing-agency/${country.slug}`}>{country.name}</Link>}
          {nearby.map((x) => x && <Link key={x.slug} href={`/email-marketing-agency/${x.slug}`}>{x.name}</Link>)}
          {siblings.map((x) => <Link key={x.slug} href={`/email-marketing-agency/${x.slug}`}>{x.h1}</Link>)}
          {terms.map((t) => <Link key={t.slug} href={`/glossary/${t.slug}`}>{t.term}</Link>)}
          <Link href="/email-marketing-agency">All agency pages</Link>
        </div>
      </section>
      <CtaBand />
    </>
  );
}
