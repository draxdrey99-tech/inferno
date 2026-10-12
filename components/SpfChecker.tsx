'use client';

import { useState } from 'react';

import type { SpfResult } from '@/lib/spf';

export default function SpfChecker() {
  const [domain, setDomain] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'error'>('idle');
  const [error, setError] = useState('');
  const [result, setResult] = useState<SpfResult | null>(null);

  async function run(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    setError('');
    setResult(null);
    try {
      const res = await fetch(`/api/tools/spf?domain=${encodeURIComponent(domain)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'The check failed.');
      setResult(data);
      setState('idle');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The check failed.');
      setState('error');
    }
  }

  return (
    <div>
      <form onSubmit={run} className="panel panel-grid max-w-3xl p-6 md:p-8">
        <label htmlFor="spf-domain" className="mono-label">Your sending domain</label>
        <input id="spf-domain" className="field mt-2.5" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="yourstore.com" autoComplete="off" inputMode="url" required />
        <button type="submit" className="btn-solid mt-5" disabled={state === 'loading'}>{state === 'loading' ? 'Checking' : 'Check SPF record'}</button>
        <p role="alert" className="mt-4 text-[0.875rem] text-[#ff4747]">{state === 'error' ? error : ''}</p>
      </form>

      {result && (
        <div className="mt-8 max-w-3xl space-y-6" aria-live="polite">
          <div className="panel p-6 md:p-8">
            <p className="mono-label">Record for {result.domain}</p>
            {result.record ? <p className="mt-3 break-all font-mono text-[0.85rem] text-bone/85">{result.record}</p> : <p className="mt-3 text-[0.95rem] text-bone/80">No SPF record found.</p>}
            {result.record && (
              <ul className="mt-5 space-y-1 text-[0.95rem] text-bone/85">
                <li>DNS lookups: <strong className="font-medium text-bone">{result.lookups} of 10</strong></li>
                <li>Ends with: <strong className="font-medium text-bone">{result.all ?? 'no all mechanism'}</strong></li>
                {result.includes.length > 0 && <li>Includes: {result.includes.join(', ')}</li>}
              </ul>
            )}
          </div>
          {result.errors.length > 0 && (
            <div className="panel p-6 md:p-8">
              <p className="mono-label">Problems</p>
              <ul className="deliverables mt-4">{result.errors.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          )}
          {result.warnings.length > 0 && (
            <div className="panel p-6 md:p-8">
              <p className="mono-label">Worth fixing</p>
              <ul className="deliverables mt-4">{result.warnings.map((x) => <li key={x}>{x}</li>)}</ul>
            </div>
          )}
          {result.record && result.errors.length === 0 && result.warnings.length === 0 && (
            <p className="text-[0.95rem] text-bone/80">No problems found in the record. SPF is one part of authentication, so also check DKIM and DMARC.</p>
          )}
        </div>
      )}
    </div>
  );
}
