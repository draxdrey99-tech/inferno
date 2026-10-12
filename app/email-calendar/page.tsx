import Link from 'next/link';

import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { CALENDAR_REVIEWED, CALENDAR_YEARS, EVENTS, eventDates, type CalendarEvent } from '@/lib/calendar';
import { breadcrumbLd, pageLd, pageMeta } from '@/lib/seo';

export const metadata = pageMeta({
  title: 'Ecommerce Email Calendar: Dates and Send Plans',
  description: 'Twenty five retail moments with calculated dates, a send plan, segments and subject line ideas for each, so you can plan Klaviyo campaigns well ahead.',
  path: '/email-calendar',
  image: '/opengraph-image',
});

const ORDER: CalendarEvent['season'][] = ['Winter', 'Spring', 'Summer', 'Autumn', 'Peak season'];

export default function CalendarIndex() {
  return (
    <>
      <JsonLd data={breadcrumbLd([{ name: 'Home', path: '/' }, { name: 'Email calendar', path: '/email-calendar' }])} />
      <JsonLd data={pageLd({ type: 'CollectionPage', path: '/email-calendar', name: 'Ecommerce email calendar', description: 'Retail moments with dates and send plans for ecommerce email.' })} />
      <section className="shell inner-page" aria-labelledby="cal-index">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link><span>/</span><span>Email calendar</span>
        </nav>
        <h1 id="cal-index" className="display-xl max-w-4xl">The ecommerce email calendar.</h1>
        <p className="lede mt-7 max-w-3xl" id="answer">
          One page per retail moment, with the dates for {CALENDAR_YEARS.join(' and ')}, a send plan counted back from the day, the segments worth using and the mistakes to avoid. Last reviewed {CALENDAR_REVIEWED}.
        </p>
        {ORDER.map((season) => (
          <div key={season} className="mt-14">
            <h2 className="display-md">{season}.</h2>
            <ul className="mt-6 space-y-3">
              {EVENTS.filter((e) => e.season === season).map((e) => (
                <li key={e.slug}>
                  <Link className="text-link" href={`/email-calendar/${e.slug}`}>{e.event}</Link>
                  {eventDates(e)[0].year > 0 && <span className="text-bone/60"> ({eventDates(e)[0].label.replace(/^[A-Za-z]+ /, '')} {eventDates(e)[0].year})</span>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <CtaBand />
    </>
  );
}
