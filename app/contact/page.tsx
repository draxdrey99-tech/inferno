import type { Metadata } from 'next';

import AuditForm from '@/components/AuditForm';
import JsonLd from '@/components/JsonLd';
import { breadcrumbLd, pageMeta } from '@/lib/seo';
import { SITE, SITE_URL } from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'Contact',
  description:
    'Talk to Inferno Emails about email marketing, Klaviyo, deliverability or retention for your ecommerce brand. We reply within one business day.',
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
        data={{
          '@context': 'https://schema.org',
          '@type': 'ContactPage',
          '@id': `${SITE_URL}/contact#page`,
          url: `${SITE_URL}/contact`,
          mainEntity: { '@id': `${SITE_URL}/#organization` },
        }}
      />

      <section className="pt-24">
        <div className="shell grid gap-14 pb-24 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:pb-32">
          <div className="reveal">
            <p className="eyebrow">Contact</p>
            <h1 className="display-lg mt-7">
              Let’s talk about your <span className="accent">list.</span>
            </h1>
            <p className="lede mt-7">
              Tell us what is going on with your email programme and we will come
              back within one business day. If a free audit would answer the
              question faster, we will start there.
            </p>

            <dl className="mt-12 space-y-8 border-t border-white/9 pt-10">
              <div>
                <dt className="text-[0.875rem] text-mute">
                  Email
                </dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${SITE.email}`}
                    className="font-display text-xl tracking-tight text-bone transition-colors hover:text-flame"
                  >
                    {SITE.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.875rem] text-mute">
                  Instagram
                </dt>
                <dd className="mt-2">
                  <a
                    href={SITE.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-xl tracking-tight text-bone transition-colors hover:text-flame"
                  >
                    @infernoemails
                  </a>
                </dd>
              </div>
              <div>
                <dt className="text-[0.875rem] text-mute">
                  Response time
                </dt>
                <dd className="mt-2 text-[0.9375rem] text-mute">
                  One business day, from a person who has looked at your account.
                </dd>
              </div>
            </dl>
          </div>

          <div
            className="reveal rounded-xl border border-white/10 bg-ink-raised p-7 md:p-10"
            data-reveal-delay="110"
          >
            <h2 className="font-display text-xl tracking-tight">Send us a note</h2>
            <p className="mt-2 text-[0.875rem] text-mute">
              The more you tell us, the more useful the first reply.
            </p>
            <div className="mt-8">
              <AuditForm source="contact" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
