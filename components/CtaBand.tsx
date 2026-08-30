import Link from 'next/link';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

/**
 * Closing conversion band, repeated at the foot of every marketing page.
 * One label per intent across the whole site: the audit is always
 * "Get your free audit", the secondary is always "Contact".
 */
export default function CtaBand({
  title,
  body,
}: {
  title?: React.ReactNode;
  body?: string;
}) {
  return (
    <section className="bg-ink-raised">
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
            <Link href="/free-email-audit" className="btn btn-flame">
              Get your free audit
              <ArrowRight size={16} weight="bold" className="arr" aria-hidden />
            </Link>
            <Link href="/contact" className="btn btn-ghost">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
