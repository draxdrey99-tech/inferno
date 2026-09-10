import Link from 'next/link';
import type { Metadata } from 'next';

import EmailCard from '@/components/EmailCard';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { breadcrumbLd, faqLd, pageMeta, workGalleryLd } from '@/lib/seo';
import { serviceForWork } from '@/lib/service-pages';
import { SITE, WORK } from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'Ecommerce Email Design Examples',
  description:
    'Nine real Klaviyo campaign and flow emails designed from scratch for ecommerce brands. Welcome flows, seasonal campaigns and product stories, shown in full.',
  path: '/work',
});

/**
 * The GEO answer for this page: what a reader (or an answer engine) gets
 * here, stated once and plainly before the gallery. Every fact is already
 * in WORK or on the home page.
 */
const ANSWER = `These are ${WORK.length} real emails Inferno Emails designed and built for named ecommerce clients in Klaviyo: welcome flows, seasonal campaigns and long-form product stories. Each one was drawn from scratch for the brand it belongs to, with no template packs. Hover or focus any email to read the whole thing, or open the full-length original.`;

/**
 * Written to answer the question in the first sentence. Nothing here is a
 * performance claim; the dated account results live on the home page and
 * are deliberately not attached to any named client.
 */
const WORK_FAQS = [
  {
    q: 'Who designed these emails?',
    a: `Inferno Emails designed and built every email on this page for the client named in its caption. Nothing here is a template, a mock-up or a redesign of someone else's work.`,
  },
  {
    q: 'Which of these are flows and which are campaigns?',
    a: 'The type under each email says which. Welcome emails are the first message in an automated welcome flow. Campaigns and seasonal campaigns are one-off sends to a segment of the list on a chosen date.',
  },
  {
    q: 'Can you show results for these emails?',
    a: `Not per email, and not per client. We show three dated, unattributed Klaviyo account results on the home page, with the exact reporting windows. Individual client revenue is commercially sensitive and stays private unless the client chooses to share it.`,
  },
  {
    q: 'Can we get emails like this for our brand?',
    a: `Yes. Book the free audit and we will review your current flows and campaigns, then show you what we would build and design. Book at ${SITE.calendly.replace('https://', '')} or use the form on the home page.`,
  },
];

export default function WorkPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Work', path: '/work' },
        ])}
      />
      <JsonLd data={workGalleryLd(WORK)} />
      <JsonLd data={faqLd(WORK_FAQS)} />

      <section className="shell inner-page" aria-labelledby="work-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Work</span>
        </nav>

        <p className="section-meta" aria-hidden="true">
          <span className="section-index">.01.</span>
          <span className="mono-label">Portfolio</span>
        </p>
        <h1 id="work-title" className="display-xl mt-5 max-w-4xl">
          Ecommerce email design examples, shown in <span className="hud-box">full.</span>
        </h1>
        <p className="lede mt-7 max-w-3xl">{ANSWER}</p>
        <p className="mt-4 max-w-3xl text-[0.9375rem] leading-relaxed text-mute">
          The one we point to first is KÍLÈNTÀR, the London luxury womenswear
          house whose founder, Michelle Adepoju, was named to the Forbes 30
          Under 30 Europe list in 2025.
        </p>

        <div className="work-grid mt-14">
          {WORK.map((item, i) => {
            const service = serviceForWork(item.type);
            return (
              <article key={item.slug} id={item.slug} className="work-entry">
                <h2 className="work-entry-title">
                  <span>{item.client}</span> {item.title}
                </h2>
                <EmailCard item={item} priority={i < 3} />
                <p className="work-entry-service">
                  Part of{' '}
                  <Link href={`/services/${service.slug}`}>
                    {service.navTitle.toLowerCase()}
                  </Link>
                </p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="shell section-space border-t" aria-labelledby="work-faq">
        <p className="section-meta" aria-hidden="true">
          <span className="section-index">.02.</span>
          <span className="mono-label">FAQ</span>
        </p>
        <h2 id="work-faq" className="display-lg mt-5 mb-10">
          Questions about the work.
        </h2>
        <Faq items={WORK_FAQS} />
      </section>

      <section className="shell section-space border-t" aria-labelledby="work-related">
        <p className="section-meta" aria-hidden="true">
          <span className="section-index">.03.</span>
          <span className="mono-label">Keep reading</span>
        </p>
        <h2 id="work-related" className="display-md mt-5">
          Where the emails come from.
        </h2>
        <div className="related-links">
          <Link href="/services/email-design">Email design</Link>
          <Link href="/services/email-flows">Email flows &amp; automation</Link>
          <Link href="/services/klaviyo-email-marketing">Klaviyo email marketing</Link>
          <Link href="/#proof">See the Klaviyo account screenshots</Link>
          <Link href="/blog">Email marketing blog</Link>
        </div>
      </section>
      <CtaBand
        title={
          <>
            Want emails that look like{' '}
            <span className="accent">your brand?</span>
          </>
        }
      />
    </>
  );
}
