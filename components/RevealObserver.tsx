'use client';

import { useEffect } from 'react';

/**
 * Mounted once in the root layout. Any server-rendered element with the
 * `reveal` class fades up when it enters the viewport — no per-section
 * client component, no wrapper divs, no layout shift.
 */
export default function RevealObserver() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));

    if (reduce) {
      nodes.forEach((n) => n.classList.add('in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          // Stagger siblings so a row of cards cascades instead of popping.
          const delay = Number(el.dataset.revealDelay || 0);
          window.setTimeout(() => el.classList.add('in'), delay);
          io.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );

    nodes.forEach((n) => {
      // Anything already on screen at load shows immediately — avoids a
      // blank hero on first paint.
      if (n.getBoundingClientRect().top < window.innerHeight * 0.92) {
        n.classList.add('in');
      } else {
        io.observe(n);
      }
    });

    return () => io.disconnect();
  }, []);

  return null;
}
