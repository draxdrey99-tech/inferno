import Link from 'next/link';
import { notFound } from 'next/navigation';

import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { FAQ_PAGES, faqSiblings, getFaq } from '@/lib/faq';
import { GLOSSARY } from '@/lib/glossary';
import { guidesForFaq } from '@/lib/crosslinks';
import { getServicePage } from '@/lib/service-pages';
import { breadcrumbLd, faqLd, pageMeta } from '@/lib/seo';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return FAQ_PAGES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const f = getFaq(slug);
  if (!f) return {};
  return pageMeta({ title: f.q, description: f.a, path: `/faq/${f.slug}`, image: '/opengraph-image' });
}

export default async function FaqPage({ params }: Props) {
  const { slug } = await params;
  const f = getFaq(slug);
  if (!f) notFound();

  const path = `/faq/${f.slug}`;
  const service = getServicePage(f.service);
  const terms = GLOSSARY.filter((t) => f.terms.includes(t.slug));

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'FAQ', path: '/faq' }, { name: f.q, path }])} />
      <JsonLd data={faqLd([{ q: f.q, a: f.a }], `${path}#faq`)} />
      <section className="shell inner-page" aria-labelledby="faq-q">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/faq">FAQ</Link>
        </nav>
        <h1 id="faq-q" className="display-xl max-w-4xl">{f.q}</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">{f.a}</p>
        <div className="mt-8 max-w-3xl space-y-5 text-[1rem] leading-relaxed text-bone/85">
          {f.detail.map((p) => <p key={p}>{p}</p>)}
        </div>
        <h2 className="display-md mt-12">In practice.</h2>
        <p className="mt-4 max-w-3xl text-[1rem] leading-relaxed text-bone/85">{f.example}</p>
        {service && (
          <p className="lede mt-12 max-w-3xl">
            Want this handled for your store? See our{' '}
            <Link className="text-link" href={`/services/${service.slug}`}>{service.navTitle.toLowerCase()} service</Link>{' '}
            or <Link className="text-link" href="/free-email-audit">book a free audit</Link>.
          </p>
        )}
        {/agency|freelanc|hire|hiring|cost|pric|in-house/i.test(f.slug) && (
          <p className="lede mt-8 max-w-3xl">
            Comparing agencies? Read how to <Link className="text-link" href="/email-marketing-agency/best-ecommerce-email-marketing-agency">choose the best ecommerce email marketing agency</Link>,
            or see the <Link className="text-link" href="/email-marketing-agency">email marketing agency page</Link> and the{' '}
            <Link className="text-link" href="/hiring-guides/klaviyo-agency-pricing-models">pricing models guide</Link>.
          </p>
        )}
        {guidesForFaq(f.slug).length > 0 && (
          <>
            <h2 className="display-md mt-14">Guides that go deeper.</h2>
            <div className="related-links mt-6">
              {guidesForFaq(f.slug).map((g) => <Link key={g.href} href={g.href}>{g.label}</Link>)}
            </div>
          </>
        )}
        <div className="related-links mt-8">
          {terms.map((t) => <Link key={t.slug} href={`/glossary/${t.slug}`}>{t.term}</Link>)}
          {faqSiblings(f.slug).map((s) => <Link key={s.slug} href={`/faq/${s.slug}`}>{s.q}</Link>)}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
