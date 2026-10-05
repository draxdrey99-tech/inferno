import Link from 'next/link';
import { notFound } from 'next/navigation';

import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { GLOSSARY } from '@/lib/glossary';
import { breadcrumbLd, pageMeta } from '@/lib/seo';
import { getServicePage } from '@/lib/service-pages';
import { SUBJECT_LIBRARIES, getSubjectLibrary, subjectSiblings } from '@/lib/subject-lines';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return SUBJECT_LIBRARIES.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = getSubjectLibrary(slug);
  if (!s) return {};
  return pageMeta({ title: s.metaTitle, description: s.metaDescription, path: `/email-subject-lines/${s.slug}`, image: '/opengraph-image' });
}

export default async function SubjectLibraryPage({ params }: Props) {
  const { slug } = await params;
  const s = getSubjectLibrary(slug);
  if (!s) notFound();

  const path = `/email-subject-lines/${s.slug}`;
  const service = getServicePage(s.service);
  const terms = GLOSSARY.filter((t) => s.terms.includes(t.slug));

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Subject lines', path: '/email-subject-lines' }, { name: s.type, path }])} />
      <section className="shell inner-page" aria-labelledby="sl-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/email-subject-lines">Subject lines</Link>
        </nav>
        <h1 id="sl-title" className="display-xl max-w-4xl">{s.type} email subject lines.</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">{s.answer}</p>
        <div className="mt-8 max-w-3xl space-y-5 text-[1rem] leading-relaxed text-bone/85">
          {s.intro.map((p) => <p key={p}>{p}</p>)}
        </div>

        <h2 className="display-md mt-14">{s.examples.length} {s.type.toLowerCase()} subject lines, and why they work.</h2>
        <ol className="mt-6 max-w-3xl space-y-5">
          {s.examples.map((e) => (
            <li key={e.line}>
              <p className="text-[1.05rem] font-medium text-bone">{e.line}</p>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-bone/70">{e.why}</p>
            </li>
          ))}
        </ol>

        <h2 className="display-md mt-14">Pair it with the preheader.</h2>
        <ul className="deliverables mt-6 max-w-3xl">{s.preheaderTips.map((m) => <li key={m}>{m}</li>)}</ul>

        <h2 className="display-md mt-14">Common mistakes.</h2>
        <ul className="deliverables mt-6 max-w-3xl">{s.mistakes.map((m) => <li key={m}>{m}</li>)}</ul>

        <p className="mt-10 max-w-3xl text-[0.95rem] leading-relaxed text-bone/70">
          These lines are starting points. Test them against your own audience and judge by clicks and revenue, not opens alone.
        </p>
        {service && (
          <p className="lede mt-8 max-w-3xl">
            Want these tested and built into your flows? See our{' '}
            <Link className="text-link" href={`/services/${service.slug}`}>{service.navTitle.toLowerCase()} service</Link>{' '}
            or <Link className="text-link" href="/free-email-audit">book a free audit</Link>.
          </p>
        )}
        <div className="related-links mt-8">
          {terms.map((t) => <Link key={t.slug} href={`/glossary/${t.slug}`}>{t.term}</Link>)}
          {subjectSiblings(s.slug).map((x) => <Link key={x.slug} href={`/email-subject-lines/${x.slug}`}>{x.type} subject lines</Link>)}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
