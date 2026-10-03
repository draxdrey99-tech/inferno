import Link from 'next/link';
import { notFound } from 'next/navigation';

import CtaBand from '@/components/CtaBand';
import EmailCard from '@/components/EmailCard';
import Faq from '@/components/Faq';
import JsonLd from '@/components/JsonLd';
import { breadcrumbLd, faqLd, pageLd, pageMeta } from '@/lib/seo';
import { WORK, getService } from '@/lib/site';
import { GLOSSARY } from '@/lib/glossary';
import { USE_CASES, getUseCase } from '@/lib/use-cases';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return USE_CASES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const u = getUseCase(slug);
  if (!u) return {};
  return pageMeta({
    title: u.metaTitle,
    description: u.metaDescription,
    path: `/email-marketing-for/${u.slug}`,
    image: '/opengraph-image',
  });
}

export default async function UseCasePage({ params }: Props) {
  const { slug } = await params;
  const u = getUseCase(slug);
  if (!u) notFound();

  const path = `/email-marketing-for/${u.slug}`;
  const work = WORK.filter((w) => u.work.includes(w.slug));
  const terms = GLOSSARY.filter((t) => u.terms.includes(t.slug));
  const flows = getService('klaviyo-email-marketing');
  const others = USE_CASES.filter((o) => o.slug !== u.slug);

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Services', path: '/services' }, { name: u.label, path }])} />
      <JsonLd data={pageLd({ type: 'WebPage', path, name: u.h1, description: u.metaDescription })} />
      <JsonLd data={faqLd(u.faqs)} />

      <section className="shell inner-page" aria-labelledby="uc-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span>
          <Link href="/services">Services</Link><span>/</span>
          <span>{u.label}</span>
        </nav>
        <h1 id="uc-title" className="display-xl max-w-4xl">{u.h1}</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">{u.answer}</p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
          <Link href="/free-email-audit" className="btn btn-flame">Book your free audit</Link>
          {flows && <Link href={`/services/${flows.slug}`} className="btn-line">How Klaviyo management works</Link>}
        </div>
        <p className="mt-3 text-[0.8125rem] text-mute">30 minutes, no obligation, and the findings are yours to keep.</p>
      </section>

      <section className="shell section-space border-t" aria-labelledby="uc-diff">
        <h2 id="uc-diff" className="display-lg">How email works for {u.label}.</h2>
        <div className="mt-10 grid gap-10 md:grid-cols-3">
          {u.differences.map((d) => (
            <div key={d.title}>
              <h3 className="font-display text-lg tracking-tight">{d.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-mute">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="shell section-space border-t" aria-labelledby="uc-flows">
        <h2 id="uc-flows" className="display-lg">What we build first.</h2>
        <ul className="deliverables mt-8 max-w-3xl">{u.firstFlows.map((f) => <li key={f}>{f}</li>)}</ul>
        <p className="lede mt-8 max-w-3xl">
          The flows sit under the{' '}
          <Link className="text-link" href="/services/email-flows">email flows service</Link>; the creative is covered by{' '}
          <Link className="text-link" href="/services/email-design">email design</Link>.
        </p>
      </section>

      {work.length > 0 && (
        <section className="shell section-space border-t" aria-labelledby="uc-work">
          <h2 id="uc-work" className="display-lg">Work we have done in this area.</h2>
          <div className="work-grid mt-10">
            {work.map((item) => <EmailCard key={item.slug} item={item} />)}
          </div>
          <p className="lede mt-8"><Link className="text-link" href="/work">See all the email design examples</Link>.</p>
        </section>
      )}

      <section className="shell section-space border-t" aria-labelledby="uc-faq">
        <h2 id="uc-faq" className="display-lg mb-10">Questions from {u.label}.</h2>
        <Faq items={u.faqs} />
      </section>

      <section className="shell section-space border-t" aria-labelledby="uc-more">
        <h2 id="uc-more" className="display-md">Keep reading.</h2>
        <div className="related-links">
          {terms.map((t) => <Link key={t.slug} href={`/glossary/${t.slug}`}>{t.term}</Link>)}
          {others.map((o) => <Link key={o.slug} href={`/email-marketing-for/${o.slug}`}>Email marketing for {o.label}</Link>)}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
