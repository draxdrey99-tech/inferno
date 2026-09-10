'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

/**
 * One fixed, page-wide ember layer behind every section. A single WebGL
 * context and a single draw call, instead of one canvas per section.
 * Progressive enhancement only: empty and invisible until the page has
 * loaded and gone idle, and never mounted under reduced-motion settings,
 * data-saver connections or low-end hardware. Phones get a lighter field. Section backgrounds are slightly translucent so the embers
 * read through them; the page is complete without it.
 */
export default function PageEmbers() {
  const ref = useRef<HTMLCanvasElement>(null);
  const pathname = usePathname();
  const enabled = !pathname.startsWith('/admin');

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || !enabled) return;
    if (!matchMedia('(prefers-reduced-motion: no-preference)').matches) return;
    // Phones and tablets get a lighter field: fewer embers, lower pixel
    // ratio, the same shader. Scroll speed drives the motion where there is
    // no hover.
    const coarse = matchMedia('(pointer: coarse), (max-width: 1023px)').matches;
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
          if (!stopped)
            dispose = mountEmbers(canvas, coarse
              ? { density: 0.55, opacity: 0.85, maxDpr: 1.25 }
              : { density: 1, opacity: 0.8, maxDpr: 1.5 });
        })
        .catch(() => {
          /* The flat background is the complete design. */
        });
    };
    // Phones wait a little longer so the WebGL setup never competes with
    // the first interactions; the field fades in a few seconds after load.
    const whenIdle = () => {
      const begin = () => {
        if (typeof window.requestIdleCallback === 'function') {
          idle = window.requestIdleCallback(mount, { timeout: 6000 });
        } else {
          timer = window.setTimeout(mount, 1500);
        }
      };
      if (coarse) timer = window.setTimeout(begin, 2500);
      else begin();
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
