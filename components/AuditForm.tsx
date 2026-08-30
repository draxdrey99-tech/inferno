'use client';

import { useState } from 'react';
import { ArrowRight } from '@phosphor-icons/react';

type Status = 'idle' | 'sending' | 'sent' | 'error';

const FIELDS = [
  { name: 'name', label: 'Full name', type: 'text', required: true, autoComplete: 'name' },
  { name: 'email', label: 'Business email', type: 'email', required: true, autoComplete: 'email' },
  { name: 'company', label: 'Company name', type: 'text', required: true, autoComplete: 'organization' },
  { name: 'website', label: 'Store URL', type: 'url', required: true, autoComplete: 'url', placeholder: 'https://' },
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
        className="rounded-lg border border-flame/40 bg-flame/6 p-8 md:p-10"
      >
        <p className="eyebrow">Received</p>
        <h3 className="display-md mt-5">That’s all we need.</h3>
        <p className="lede mt-4">
          We’ll review your account and come back within one business day with
          what we found. If we don’t think we can help, we’ll tell you that too.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate={false} className="grid gap-5">
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
          <div
            key={f.name}
            className={f.name === 'website' || f.name === 'phone' ? '' : ''}
          >
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
              className="mt-2.5 w-full rounded-lg border border-white/12 bg-ink px-4 py-3.5 text-[0.9375rem] text-bone outline-none transition-colors placeholder:text-mute/60 focus:border-flame"
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
          className="mt-2.5 w-full resize-y rounded-lg border border-white/12 bg-ink px-4 py-3.5 text-[0.9375rem] text-bone outline-none transition-colors placeholder:text-mute/60 focus:border-flame"
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
