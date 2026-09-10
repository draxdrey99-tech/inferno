'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * One fixed, page-wide ember layer behind every section. A single WebGL
 * context and a single draw call, instead of one canvas per section.
 * Progressive enhancement only: empty and invisible until the page has
 * loaded and gone idle, and never mounted on narrow screens, touch
 * devices, reduced-motion settings, data-saver connections or low-end
 * hardware. Section backgrounds are slightly translucent so the embers
 * read through them; the page is complete without it.
 */
export default function PageEmbers() {
  const ref = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const enabled = !pathname.startsWith('/admin');

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !enabled) return;
    if (
      !matchMedia(
        '(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)'
      ).matches
    )
      return;
    const device = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { saveData?: boolean };
    };
    if (
      device.connection?.saveData ||
      (device.deviceMemory && device.deviceMemory < 4) ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4)
    )
      return;

    let stopped = false;
    let dispose: (() => void) | undefined;
    let idle = 0;
    let timer = 0;
    const mount = () => {
      import('./embers')
        .then(({ mountEmbers }) => {
          if (!stopped) dispose = mountEmbers(canvas, { density: 1, opacity: 0.8 });
        })
        .catch(() => {
          /* The flat background is the complete design. */
        });
    };
    const whenIdle = () => {
      if (typeof window.requestIdleCallback === 'function') {
        idle = window.requestIdleCallback(mount, { timeout: 4000 });
      } else {
        timer = window.setTimeout(mount, 1500);
      }
    };
    if (document.readyState === 'complete') whenIdle();
    else window.addEventListener('load', whenIdle, { once: true });

    return () => {
      stopped = true;
      window.removeEventListener('load', whenIdle);
      if (idle && typeof window.cancelIdleCallback === 'function') window.cancelIdleCallback(idle);
      window.clearTimeout(timer);
      dispose?.();
    };
  }, [enabled]);

  if (!enabled) return null;
  return <canvas ref={ref} className="page-embers" aria-hidden="true" />;
}
