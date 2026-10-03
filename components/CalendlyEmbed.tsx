'use client';

import { useEffect } from 'react';
import { sendGAEvent } from '@next/third-parties/google';
import { calendlyHref } from '@/lib/site';

/**
 * Inline booking widget. Booking happens on our own page, so the visitor
 * never leaves the domain and a completed booking can be counted: Calendly
 * posts `calendly.event_scheduled` to the parent window, which we forward
 * to GA4 as `calendly_booked`. Lazy-loaded; the iframe costs nothing until
 * it nears the viewport.
 */
export default function CalendlyEmbed({ source = 'audit-embed' }: { source?: string }) {
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== 'https://calendly.com') return;
      if (e.data?.event === 'calendly.event_scheduled') {
        sendGAEvent('event', 'calendly_booked', { source });
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [source]);

  const host = typeof window === 'undefined' ? 'infernoemails.com' : window.location.hostname;
  const src = `${calendlyHref(source)}&embed_domain=${encodeURIComponent(host)}&embed_type=Inline&hide_gdpr_banner=1&background_color=121212&text_color=f2f0eb&primary_color=f51717`;

  return (
    <iframe
      src={src}
      title="Book your free email audit"
      loading="lazy"
      className="h-[720px] w-full border border-[#2a2a2a] bg-ink-raised"
    />
  );
}
