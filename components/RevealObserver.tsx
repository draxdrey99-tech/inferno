'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { mountMobileRevenue } from './mobile-revenue';

/**
 * Route-aware progressive enhancement. Content stays server-visible;
 * desktop homepage choreography is split out of the critical bundle.
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
    if (!matchMedia('(min-width: 1024px) and (pointer: fine)').matches) return mountMobileRevenue();
    const remaining = 900 - performance.now();
    const entrances = remaining > 200 ? Array.from(document.querySelectorAll('.hero-word')).map((word,i)=>word.animate(
      [{transform:'translateY(110%)'},{transform:'translateY(0)'}],
      {duration:Math.min(400,remaining-100),delay:i*10,easing:'cubic-bezier(.16,1,.3,1)'}
    )) : [];
    const timer = window.setTimeout(() => {
      import('./motion').then(({mountMotion}) => {if(!stopped) dispose=mountMotion();}).catch(() => {/* static layout is complete */});
    }, 150);
    return () => {stopped=true;window.clearTimeout(timer);entrances.forEach(a=>a.cancel());dispose?.();};
  }, [pathname]);

  return null;
}
