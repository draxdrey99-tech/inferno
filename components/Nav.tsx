'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { NAV, NAV_SECTIONS, SITE } from '@/lib/site';
import Wordmark from './Wordmark';

export default function Nav() {
  const pathname = usePathname();
  return <Navigation key={pathname} pathname={pathname} />;
}

/**
 * A floating, centred instrument bar rather than a full-width header: dark,
 * hairline, blurred. On phones the menu drops out of the same bar.
 */
function Navigation({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState('');
  const sentinel = useRef<HTMLDivElement>(null);
  const onHome = pathname === '/';

  /**
   * A one-pixel sentinel at the top of the document tells us when the page
   * has scrolled. IntersectionObserver fires only when it crosses the edge,
   * where a scroll listener would run on every frame.
   */
  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /**
   * Scroll-spy for the single-page nav. The root margin pins the detection
   * line just under the fixed bar, so a section counts as current from
   * the moment its top clears the bar until the next one reaches it.
   */
  useEffect(() => {
    if (!onHome) {
      return;
    }
    const nodes = NAV_SECTIONS.map((id) => document.getElementById(id)).filter(
      (n): n is HTMLElement => Boolean(n)
    );
    if (!nodes.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setSection(visible[0].target.id);
      },
      { rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );
    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, [onHome]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /**
   * An anchor entry is current when its section is the one in view; the
   * blog, being a real route, is current whenever we are inside /blog.
   */
  const isActive = (href: string) => {
    if (href.startsWith('/#')) return onHome && section === href.slice(2);
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <>
      <div ref={sentinel} aria-hidden className="absolute top-0 h-px w-full" />

      <header className="site-header fixed inset-x-0 top-0 z-50">
        <nav className="site-nav" data-scrolled={scrolled || open ? 'true' : 'false'}>
          <Wordmark priority />

          <ul className="site-nav-links">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link href={item.href} aria-current={active ? 'page' : undefined}>
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            {scrolled && (
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-flame mobile-audit"
              >
                Book your free audit
              </a>
            )}
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-flame site-nav-desktop-cta"
            >
              Book your free audit
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="site-nav-menu"
            >
              <span />
              <span />
            </button>
          </div>
        </nav>

        <div id="mobile-nav" hidden={!open} className="mobile-nav md:hidden">
          <ul>
            {NAV.map((item, i) => (
              <li key={item.href}>
                <Link href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                  <span aria-hidden="true">.0{i + 1}.</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="mobile-nav-foot">
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn btn-flame"
            >
              Book your free audit
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
