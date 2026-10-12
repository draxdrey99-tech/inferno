import Link from 'next/link';
import { notFound } from 'next/navigation';

import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { CALENDAR_REVIEWED, EVENTS, calendarSiblings, eventDates, getCalendarEvent } from '@/lib/calendar';
import { GLOSSARY } from '@/lib/glossary';
import { breadcrumbLd, pageLd, pageMeta } from '@/lib/seo';
import { getServicePage } from '@/lib/service-pages';
import { SUBJECT_LIBRARIES } from '@/lib/subject-lines';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return EVENTS.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const e = getCalendarEvent(slug);
  if (!e) return {};
  return pageMeta({ title: e.metaTitle, description: e.metaDescription, path: `/email-calendar/${e.slug}`, image: '/opengraph-image' });
}

export default async function CalendarEventPage({ params }: Props) {
  const { slug } = await params;
  const e = getCalendarEvent(slug);
  if (!e) notFound();

  const path = `/email-calendar/${e.slug}`;
  const service = getServicePage(e.service);
  const terms = GLOSSARY.filter((t) => e.terms.includes(t.slug));
  const library = SUBJECT_LIBRARIES.find((s) => s.slug === e.library);
  const dates = eventDates(e);

  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Email calendar', path: '/email-calendar' }, { name: e.event, path }])} />
      <JsonLd data={pageLd({ type: 'WebPage', path, name: e.metaTitle, description: e.metaDescription })} />
      <section className="shell inner-page" aria-labelledby="cal-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><Link href="/email-calendar">Email calendar</Link>
        </nav>
        <h1 id="cal-title" className="display-xl max-w-4xl">{e.event}.</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">{e.answer}</p>

        <div className="panel panel-grid mt-10 max-w-3xl p-6 md:p-8">
          <p className="mono-label">{e.region === 'Global' ? 'Key dates' : `Key dates (${e.region})`}</p>
          <ul className="mt-4 space-y-2 text-[0.95rem] text-bone/85">
            {dates.map((d) => <li key={d.year}>{d.year ? <><strong className="font-medium text-bone">{d.year}:</strong> {d.label}</> : d.label}</li>)}
          </ul>
          <p className="mt-4 text-[0.8125rem] text-mute">Last reviewed {CALENDAR_REVIEWED}. Dates are calculated from the rule for the day, so they stay correct each year.</p>
        </div>

        <h2 className="display-md mt-14">Why it matters.</h2>
        <div className="mt-6 max-w-3xl space-y-4 text-[0.95rem] leading-relaxed text-bone/80">
          {e.why.map((p) => <p key={p}>{p}</p>)}
        </div>

        <h2 className="display-md mt-14">Send plan.</h2>
        <ol className="mt-6 max-w-3xl space-y-5">
          {e.plan.map((s, n) => (
            <li key={s.when}>
              <p className="text-[1.05rem] font-medium text-bone">{n + 1}. {s.when}</p>
              <p className="mt-1 text-[0.95rem] leading-relaxed text-bone/75">{s.action}</p>
            </li>
          ))}
        </ol>

        <h2 className="display-md mt-14">Before you send.</h2>
        <ul className="deliverables mt-6 max-w-3xl">{e.prep.map((x) => <li key={x}>{x}</li>)}</ul>

        <h2 className="display-md mt-14">Segments to use.</h2>
        <ul className="deliverables mt-6 max-w-3xl">{e.segments.map((x) => <li key={x}>{x}</li>)}</ul>

        <h2 className="display-md mt-14">Subject line ideas.</h2>
        <ul className="deliverables mt-6 max-w-3xl">{e.subjectIdeas.map((x) => <li key={x}>{x}</li>)}</ul>
        {library && (
          <p className="mt-5 max-w-3xl text-[0.95rem] text-bone/75">
            More in the <Link className="text-link" href={`/email-subject-lines/${library.slug}`}>{library.type.toLowerCase()} subject line library</Link>.
          </p>
        )}

        <h2 className="display-md mt-14">Common mistakes.</h2>
        <ul className="deliverables mt-6 max-w-3xl">{e.mistakes.map((x) => <li key={x}>{x}</li>)}</ul>

        <p className="mt-10 max-w-3xl text-[0.95rem] leading-relaxed text-bone/70">
          This is a planning structure, not a promise of results. Your offer, stock, list and shipping options decide what is right, so test and adjust.
        </p>
        {service && (
          <p className="lede mt-8 max-w-3xl">
            Want this planned and built for you? See our{' '}
            <Link className="text-link" href={`/services/${service.slug}`}>{service.navTitle.toLowerCase()} service</Link>{' '}
            or <Link className="text-link" href="/free-email-audit">book a free audit</Link>.
          </p>
        )}
        <div className="related-links mt-8">
          {terms.map((t) => <Link key={t.slug} href={`/glossary/${t.slug}`}>{t.term}</Link>)}
          {calendarSiblings(e.slug).map((x) => <Link key={x.slug} href={`/email-calendar/${x.slug}`}>{x.event}</Link>)}
        </div>
      </section>
      <CtaBand />
    </>
  );
}
