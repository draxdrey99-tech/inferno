import Link from 'next/link';
import { FOOTER_NAV, SITE } from '@/lib/site';
import Wordmark from './Wordmark';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/8 bg-ink">
      <div className="shell py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-[1.3fr_2fr]">
          <div>
            <Wordmark />
            <p className="lede mt-6 max-w-sm text-[0.9375rem]">
              Email and retention marketing for ecommerce brands. Flows,
              campaigns, design and deliverability, run as one system.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost px-5 py-2.5 text-[0.8125rem]"
              >
                Instagram
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="btn btn-ghost px-5 py-2.5 text-[0.8125rem]"
              >
                {SITE.email}
              </a>
            </div>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {FOOTER_NAV.map((col) => (
              <div key={col.title}>
                <h2 className="font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.22em] text-mute">
                  {col.title}
                </h2>
                <ul className="mt-5 space-y-3">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {'external' in l && l.external ? (
                        <a
                          href={l.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[0.9375rem] text-bone/75 transition-colors hover:text-flame"
                        >
                          {l.label}
                        </a>
                      ) : (
                        <Link
                          href={l.href}
                          className="text-[0.9375rem] text-bone/75 transition-colors hover:text-flame"
                        >
                          {l.label}
                        </Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-white/8 pt-7 text-[0.8125rem] text-mute sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE.name}. All rights reserved.</p>
          <p>Built for brands that would rather own the inbox than rent the feed.</p>
        </div>
      </div>
    </footer>
  );
}
