import Link from 'next/link';
import { FOOTER_NAV, SITE } from '@/lib/site';
import Wordmark from './Wordmark';

/**
 * Statement footer: link columns under mono labels, then the red brand
 * block beside a wordmark set as large as the shell allows. The giant
 * wordmark is decorative; the linked Wordmark above already names the site.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div>
            <Wordmark />
            <p className="lede mt-6 max-w-sm text-[0.9375rem]">
              Email and retention marketing for ecommerce brands. Flows,
              campaigns, design and deliverability, run as one system.
            </p>
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3">
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-line"
              >
                Instagram
              </a>
              <a href={`mailto:${SITE.email}`} className="btn-line normal-case">
                {SITE.email}
              </a>
            </div>
          </div>

          <div className="footer-links">
            {FOOTER_NAV.map((col, i) => (
              <div key={col.title}>
                <h2 className="mono-label">
                  <span className="section-index" aria-hidden="true">.0{i + 1}.</span>
                  {col.title}
                </h2>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {'external' in l && l.external ? (
                        <a href={l.href} target="_blank" rel="noopener noreferrer">
                          {l.label}
                        </a>
                      ) : (
                        <Link href={l.href}>{l.label}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-legal">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p>Built for brands that would rather own the inbox than rent the feed.</p>
        </div>
      </div>
    </footer>
  );
}
