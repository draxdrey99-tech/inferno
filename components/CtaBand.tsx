import Link from 'next/link';
import { SITE } from '@/lib/site';

/**
 * Closing conversion band: a red-to-charcoal gradient panel behind a
 * centred CTA. One label per intent across the whole site: the audit is
 * always "Book your free audit" and always goes to Calendly; the secondary
 * is always the contact form, which lives in the #contact section.
 */
export default function CtaBand({
  title,
  body,
}: {
  title?: React.ReactNode;
  body?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="shell py-20 md:py-28">
        <div className="start-box cta-gradient panel-corners reveal">
          <div className="rule-dots w-full max-w-xs" aria-hidden="true" />
          <h2 className="display-lg max-w-3xl">
            {title ?? (
              <>
                Find out what your list is{' '}
                <span className="accent">actually worth.</span>
              </>
            )}
          </h2>
          <p className="lede mx-auto">
            {body ??
              'We review your flows, list health, authentication records and last ninety days of performance, then send back what we found.'}
          </p>
          <div className="mt-2 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-flame"
            >
              Book your free audit
            </a>
            <Link href="/#contact" className="btn-line">
              Send a message instead
            </Link>
          </div>
          <p className="start-note">
            30 minutes, no obligation, and the findings are yours to keep either way.
          </p>
        </div>
      </div>
    </section>
  );
}
