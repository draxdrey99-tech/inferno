import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';
import { SITE } from '@/lib/site';

/**
 * Closing conversion band, repeated at the foot of the site and the blog.
 * One label per intent across the whole site: the audit is always
 * "Book your free audit" and always goes to Calendly; the secondary is
 * always the contact form, which lives in the #contact section.
 */
export default function CtaBand({
  title,
  body,
}: {
  title?: React.ReactNode;
  body?: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink-raised">
      <div className="shell py-20 md:py-28">
        <div className="reveal max-w-3xl">
          <h2 className="display-lg">
            {title ?? (
              <>
                Find out what your list is{' '}
                <span className="accent">actually worth.</span>
              </>
            )}
          </h2>
          <p className="lede mt-5">
            {body ??
              'We review your flows, list health, authentication records and last ninety days of performance, then send back what we found. Free, and the findings are yours either way.'}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-flame"
            >
              Book your free audit
              <ArrowRight size={16} weight="bold" className="arr" aria-hidden />
            </a>
            <Link href="/#contact" className="btn btn-ghost">
              Send a message instead
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
