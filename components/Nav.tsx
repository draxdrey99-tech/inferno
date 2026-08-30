'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import { NAV, NAV_SECTIONS, SITE } from '@/lib/site';
import Wordmark from './Wordmark';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [section, setSection] = useState('');
  const sentinel = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
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
   * line just under the fixed header, so a section counts as current from
   * the moment its top clears the bar until the next one reaches it.
   */
  useEffect(() => {
    if (!onHome) {
      setSection('');
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

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

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

      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled || open
            ? 'border-b border-white/8 bg-ink/92 backdrop-blur-md'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="shell flex h-[4.25rem] items-center justify-between gap-6 md:h-[4.5rem]">
          <Wordmark priority />

          <ul className="hidden items-center gap-8 md:flex">
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`relative text-[0.9375rem] transition-colors ${
                      active ? 'text-bone' : 'text-mute hover:text-bone'
                    }`}
                  >
                    {item.label}
                    {active && (
                      <span className="absolute -bottom-1.5 left-0 h-px w-full bg-flame" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-flame hidden px-5 py-2.5 md:inline-flex"
            >
              Book your free audit
              <ArrowRight size={15} weight="bold" className="arr" aria-hidden />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden"
            >
              <span
                className={`h-px w-5 bg-bone transition-transform duration-300 ${
                  open ? 'translate-y-[3px] rotate-45' : ''
                }`}
              />
              <span
                className={`h-px w-5 bg-bone transition-transform duration-300 ${
                  open ? '-translate-y-[3px] -rotate-45' : ''
                }`}
              />
            </button>
          </div>
        </nav>

        <div
          id="mobile-nav"
          hidden={!open}
          className="border-t border-white/8 bg-ink md:hidden"
        >
          <ul className="shell flex flex-col py-2">
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-white/6 last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 font-display text-2xl tracking-tight text-bone"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="shell pb-7 pt-3">
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn btn-flame w-full"
            >
              Book your free audit
              <ArrowRight size={16} weight="bold" className="arr" aria-hidden />
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
