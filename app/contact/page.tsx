import Link from 'next/link';

import AuditForm from '@/components/AuditForm';
import CalendlyLink from '@/components/CalendlyLink';
import JsonLd from '@/components/JsonLd';
import { breadcrumbLd, pageLd, pageMeta } from '@/lib/seo';
import { ADDRESS, SITE } from '@/lib/site';

export const metadata = pageMeta({
  title: 'Contact Inferno Emails',
  description:
    'Book a free email audit or send us the details of your store. We reply to every written request within one business day.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ])}
      />
      <JsonLd
        data={pageLd({
          type: 'ContactPage',
          path: '/contact',
          name: 'Contact Inferno Emails',
          description: 'Book a free email audit or send a written request.',
        })}
      />

      <section className="shell inner-page" aria-labelledby="contact-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Contact</span>
        </nav>

        <div className="grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <div className="section-head content-start">
            <p className="section-meta" aria-hidden="true">
              <span className="section-index">.01.</span>
              <span className="mono-label">Contact</span>
            </p>
            <h1 id="contact-title" className="display-xl">
              Talk to <span className="hud-box">Inferno Emails.</span>
            </h1>
            <p className="lede" id="answer">
              The quickest way in is the free audit: pick a time and we will
              walk your account with you. Prefer writing? Send the details and
              we reply within one business day.
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link href="/free-email-audit" className="btn btn-flame">
                Book your free audit
              </Link>
              <CalendlyLink source="contact-page" className="btn-line">
                Open the calendar
              </CalendlyLink>
            </div>

            <dl className="contact-meta mt-10 grid gap-6 border-t border-[#3d3d3d] pt-8 sm:grid-cols-2">
              <div>
                <dt>Email</dt>
                <dd className="mt-2">
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </dd>
              </div>
              <div>
                <dt>Instagram</dt>
                <dd className="mt-2">
                  <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
                    @infernoemails
                  </a>
                </dd>
              </div>
              {ADDRESS?.phone && (
                <div>
                  <dt>Phone</dt>
                  <dd className="mt-2">
                    <a href={`tel:${ADDRESS.phone.replace(/\s+/g, '')}`}>{ADDRESS.phone}</a>
                  </dd>
                </div>
              )}
              {ADDRESS && (
                <div>
                  <dt>Address</dt>
                  <dd className="mt-2">
                    {ADDRESS.street}, {ADDRESS.city} {ADDRESS.postalCode}, {ADDRESS.country}
                  </dd>
                </div>
              )}
            </dl>
          </div>

          <div className="card panel-grid panel-corners p-7 md:p-10">
            <p className="eyebrow">Written request</p>
            <h2 className="display-md mt-5">Send the details.</h2>
            <p className="mt-2 text-[0.875rem] text-mute">
              We come back within one business day.
            </p>
            <div className="mt-8">
              <AuditForm source="contact-page" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
