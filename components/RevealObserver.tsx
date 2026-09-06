'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Mounted once in the root layout. Any server-rendered element with the
 * `reveal` class fades up when it enters the viewport — no per-section
 * client component, no wrapper divs, no layout shift.
 */
export default function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches || pathname.startsWith('/admin')) return;
    let stopped = false;
    let dispose: (() => void) | undefined;
    if (pathname !== '/') {
      const animation = document.querySelector('main')?.animate([{transform:'translateY(8px)'},{transform:'none'}],{duration:250,easing:'cubic-bezier(.16,1,.3,1)'});
      return () => animation?.cancel();
    }
    const timer = window.setTimeout(() => {
      import('./motion').then(({mountMotion}) => {if(!stopped) dispose=mountMotion();}).catch(() => {/* static layout is complete */});
    }, 150);
    return () => {stopped=true;window.clearTimeout(timer);dispose?.();};
  }, [pathname]);

  return null;
}
