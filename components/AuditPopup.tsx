'use client';

import {useCallback, useEffect, useRef} from 'react';

const SEEN_KEY = 'inferno-audit-popup-seen';

export default function AuditPopup({bookingUrl, checks}:{bookingUrl:string;checks:string[]}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const seen = useRef(false);
  const previousOverflow = useRef<string | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const restoreScroll = useCallback(() => {
    if (previousOverflow.current !== null) {
      document.documentElement.style.overflow = previousOverflow.current;
      previousOverflow.current = null;
    }
  }, []);
  const remember = useCallback(() => {
    seen.current = true;
    try { sessionStorage.setItem(SEEN_KEY, '1'); } catch { /* Session memory still applies. */ }
  }, []);
  const open = useCallback(() => {
    if (!dialog.current || dialog.current.open) return;
    remember();
    previousFocus.current = document.activeElement as HTMLElement | null;
    previousOverflow.current = document.documentElement.style.overflow;
    dialog.current.showModal();
    document.documentElement.style.overflow = 'hidden';
  }, [remember]);

  useEffect(() => {
    try { seen.current = sessionStorage.getItem(SEEN_KEY) === '1'; } catch { /* Storage is optional. */ }
    const started = performance.now();
    const exit = (event:MouseEvent) => {
      if (seen.current || event.relatedTarget || event.clientY > 0 || performance.now() - started < 20000) return;
      if (!matchMedia('(min-width:1024px) and (pointer:fine)').matches || document.querySelector('dialog[open]')) return;
      if (document.activeElement?.matches('input, textarea, select, [contenteditable="true"]')) return;
      const hero = document.getElementById('hero');
      if (!hero || hero.getBoundingClientRect().bottom > 0) return;
      open();
    };
    const booking = (event:MouseEvent) => {
      const anchor = (event.target as Element).closest?.('a');
      if (anchor?.href.startsWith(bookingUrl)) remember();
    };
    document.addEventListener('mouseout', exit);
    document.addEventListener('click', booking);
    return () => {
      document.removeEventListener('mouseout', exit);
      document.removeEventListener('click', booking);
      restoreScroll();
    };
  }, [bookingUrl, open, remember, restoreScroll]);

  return <>
    <button type="button" className="audit-popup-trigger" onClick={open} aria-haspopup="dialog">What’s in the free audit?</button>
    <noscript><style>{'.audit-popup-trigger {display:none;}'}</style></noscript>
    <dialog ref={dialog} className="audit-popup" aria-labelledby="audit-popup-title" aria-describedby="audit-popup-description" data-lenis-prevent onClose={() => {
      restoreScroll();
      previousFocus.current?.focus({preventScroll:true});
    }} onKeyDown={event => {
      if (event.key !== 'Tab') return;
      const controls = Array.from(event.currentTarget.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]')).filter(el => el.getClientRects().length > 0);
      const first = controls[0], last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {event.preventDefault();last?.focus();}
      if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first?.focus();}
    }} onClick={event => {
      if (event.target !== event.currentTarget) return;
      const rect = event.currentTarget.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.current?.close();
    }}>
      <button type="button" className="audit-popup-close" aria-label="Close audit preview" onClick={() => dialog.current?.close()}>×</button>
      <div className="audit-popup-grid">
        <div className="audit-popup-art">
          <div className="audit-preview-sheet">
            <p className="audit-preview-heading">Inferno Emails <span>Audit scope</span></p>
            <p className="audit-preview-title">Your list. A clearer plan.</p>
            <ul>{checks.map(check => <li key={check}><span>{check}</span><span aria-label="Included">✓</span></li>)}</ul>
            <p className="audit-preview-foot">Written findings <span>Yours to keep</span></p>
          </div>
        </div>
        <div className="audit-popup-copy">
          <p className="eyebrow">Free, 30-minute audit</p>
          <h2 id="audit-popup-title">Find the gaps in your email revenue.</h2>
          <p id="audit-popup-description">We review your flows, list health, deliverability and last 90 days, then tell you what we found.</p>
          <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="btn btn-flame" onClick={() => dialog.current?.close()}>Book your free audit</a>
          <p className="audit-popup-risk">No obligation. The findings are yours to keep either way.</p>
          <button type="button" className="audit-popup-dismiss" onClick={() => dialog.current?.close()}>Keep browsing</button>
        </div>
      </div>
    </dialog>
  </>;
}
