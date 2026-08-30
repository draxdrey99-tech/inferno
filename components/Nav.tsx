'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react';
import { NAV } from '@/lib/site';
import Wordmark from './Wordmark';

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

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
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
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
            <Link
              href="/free-email-audit"
              className="btn btn-flame hidden px-5 py-2.5 md:inline-flex"
            >
              Get your free audit
              <ArrowRight size={15} weight="bold" className="arr" aria-hidden />
            </Link>

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
                  className="block py-4 font-display text-2xl tracking-tight text-bone"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="shell pb-7 pt-3">
            <Link href="/free-email-audit" className="btn btn-flame w-full">
              Get your free audit
              <ArrowRight size={16} weight="bold" className="arr" aria-hidden />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
