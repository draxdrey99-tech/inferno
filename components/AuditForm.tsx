'use client';

import { useState } from 'react';
import { ArrowRight, Calendar } from '@phosphor-icons/react';
import { SITE } from '@/lib/site';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/* Ordered by how little friction each field adds: the two required fields
   first, then the store URL because it is the one optional field that
   actually helps us before the call, company next, phone last since it is
   the field people are most reluctant to hand over. */
const FIELDS = [
  { name: 'name', label: 'Full name', type: 'text', required: true, autoComplete: 'name' },
  { name: 'email', label: 'Business email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'website', label: 'Store URL (optional)', type: 'url', required: false, autoComplete: 'url', placeholder: 'https://' },
  { name: 'company', label: 'Company name (optional)', type: 'text', required: false, autoComplete: 'organization' },
  { name: 'phone', label: 'Phone (optional)', type: 'tel', required: false, autoComplete: 'tel' },
] as const;

export default function AuditForm({ source = 'free-email-audit' }: { source?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === 'sending') return;

    const form = e.currentTarget;
    const payload = { ...Object.fromEntries(new FormData(form).entries()), source };

    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Something went wrong.');
      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error ? err.message : 'Something went wrong.');
    }
  }

  if (status === 'sent') {
    return (
      <div
        role="status"
        className="card rounded-xl border-flame/30 p-8 md:p-10"
      >
        <p className="eyebrow">Received</p>
        <h3 className="display-md mt-5">That’s all we need.</h3>
        <p className="lede mt-4">
          Next: we review your account and reply within one business day with
          what we found, and what we’d do about it.
        </p>
        <a
          href={SITE.calendly}
          target="_blank"
          rel="noopener noreferrer"
          className="text-link mt-6 inline-flex items-center gap-1.5"
        >
          <Calendar size={15} weight="bold" aria-hidden />
          Don’t want to wait? Book a time now
        </a>
      </div>
    );
  }

  return (
    <form id="audit-form" onSubmit={onSubmit} noValidate={false} className="grid gap-5">
      <noscript><style>{'#audit-form > :not(noscript) { display: none; }'}</style><p>To send the details without JavaScript, <a className="underline" href="mailto:hello@infernoemails.com">email hello@infernoemails.com</a>. We will come back within one business day.</p></noscript>
      {/* Honeypot: bots fill it, humans never see it. */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="company_website">Leave this field empty</label>
        <input
          id="company_website"
          name="company_website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((f) => (
          <div key={f.name}>
            <label
              htmlFor={f.name}
              className="block text-[0.875rem] text-mute"
            >
              {f.label}
              {f.required && <span className="ml-1 text-flame">*</span>}
            </label>
            <input
              id={f.name}
              name={f.name}
              type={f.type}
              required={f.required}
              autoComplete={f.autoComplete}
              placeholder={'placeholder' in f ? f.placeholder : undefined}
              className="field mt-2.5"
            />
          </div>
        ))}
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-[0.875rem] text-mute"
        >
          What’s the main problem right now?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder="e.g. flows are set up but barely earning, opens have been sliding for months, we send campaigns with no plan…"
          className="field mt-2.5 resize-y"
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-[0.875rem] text-flame">
          {error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="btn btn-flame disabled:opacity-60"
        >
          {status === 'sending' ? 'Sending…' : 'Send my details'}
          {status !== 'sending' && (
            <ArrowRight size={16} weight="bold" className="arr" aria-hidden />
          )}
        </button>
        <p className="text-[0.8125rem] text-mute">
          One business day. No pitch deck.
        </p>
      </div>
    </form>
  );
}
