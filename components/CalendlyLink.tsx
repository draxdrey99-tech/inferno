'use client';

import { sendGAEvent } from '@next/third-parties/google';
import { calendlyHref } from '@/lib/site';

type CalendlyLinkProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  /** Short, stable identifier for this CTA's position, e.g. "hero", "faq". */
  source: string;
} & { [attr: `data-${string}`]: string | boolean | undefined };

/**
 * The one place a Calendly booking link is built and clicked from: adds the
 * UTM params `calendlyHref` needs, and fires a `calendly_click` GA4 event
 * (with `source` so Analytics can be sliced the same way Calendly's own
 * report is) before the new tab opens. `sendGAEvent` is a no-op with a
 * console warning if GA has not been configured, so this is safe with or
 * without `NEXT_PUBLIC_GA_ID` set.
 */
export default function CalendlyLink({ source, onClick, children, ...rest }: CalendlyLinkProps) {
  return (
    <a
      href={calendlyHref(source)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => {
        sendGAEvent('event', 'calendly_click', { source });
        onClick?.(event);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}
