'use client';

import { useMemo, useState } from 'react';

const EMAIL_RE = /^[^\s@;,]+@[^\s@;,]+\.[^\s@;,]{2,}$/;

export default function DmarcGenerator() {
  const [domain, setDomain] = useState('');
  const [policy, setPolicy] = useState<'none' | 'quarantine' | 'reject'>('none');
  const [sub, setSub] = useState<'' | 'none' | 'quarantine' | 'reject'>('');
  const [rua, setRua] = useState('');
  const [ruf, setRuf] = useState('');
  const [pct, setPct] = useState(100);
  const [adkim, setAdkim] = useState<'r' | 's'>('r');
  const [aspf, setAspf] = useState<'r' | 's'>('r');
  const [copied, setCopied] = useState(false);

  const ruaOk = rua === '' || EMAIL_RE.test(rua.trim());
  const rufOk = ruf === '' || EMAIL_RE.test(ruf.trim());

  const record = useMemo(() => {
    const parts = ['v=DMARC1', `p=${policy}`];
    if (sub) parts.push(`sp=${sub}`);
    if (rua.trim() && ruaOk) parts.push(`rua=mailto:${rua.trim()}`);
    if (ruf.trim() && rufOk) parts.push(`ruf=mailto:${ruf.trim()}`);
    if (pct < 100) parts.push(`pct=${pct}`);
    if (adkim === 's') parts.push('adkim=s');
    if (aspf === 's') parts.push('aspf=s');
    return parts.join('; ');
  }, [policy, sub, rua, ruf, pct, adkim, aspf, ruaOk, rufOk]);

  const host = `_dmarc.${domain.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '') || 'yourdomain.com'}`;

  async function copy() {
    try { await navigator.clipboard.writeText(record); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* clipboard blocked: the text is selectable */ }
  }

  const sel = 'field mt-2.5';
  return (
    <div className="grid max-w-5xl gap-8 md:grid-cols-2">
      <div className="panel panel-grid space-y-6 p-6 md:p-8">
        <div>
          <label htmlFor="d-domain" className="mono-label">Your domain</label>
          <input id="d-domain" className="field mt-2.5" value={domain} onChange={(e) => setDomain(e.target.value)} placeholder="yourstore.com" autoComplete="off" />
        </div>
        <div>
          <label htmlFor="d-policy" className="mono-label">Policy</label>
          <select id="d-policy" className={sel} value={policy} onChange={(e) => setPolicy(e.target.value as typeof policy)}>
            <option value="none">none: monitor only (start here)</option>
            <option value="quarantine">quarantine: send failures to spam</option>
            <option value="reject">reject: block failures</option>
          </select>
        </div>
        <div>
          <label htmlFor="d-sub" className="mono-label">Subdomain policy (optional)</label>
          <select id="d-sub" className={sel} value={sub} onChange={(e) => setSub(e.target.value as typeof sub)}>
            <option value="">Same as the main policy</option>
            <option value="none">none</option>
            <option value="quarantine">quarantine</option>
            <option value="reject">reject</option>
          </select>
        </div>
        <div>
          <label htmlFor="d-rua" className="mono-label">Aggregate report email (recommended)</label>
          <input id="d-rua" type="email" className="field mt-2.5" value={rua} onChange={(e) => setRua(e.target.value)} placeholder="dmarc@yourstore.com" aria-invalid={!ruaOk} />
          {!ruaOk && <p className="mt-2 text-[0.8125rem] text-[#ff4747]">Enter one valid email address.</p>}
        </div>
        <div>
          <label htmlFor="d-ruf" className="mono-label">Failure report email (optional)</label>
          <input id="d-ruf" type="email" className="field mt-2.5" value={ruf} onChange={(e) => setRuf(e.target.value)} placeholder="forensic@yourstore.com" aria-invalid={!rufOk} />
        </div>
        <div>
          <label htmlFor="d-pct" className="mono-label">Apply the policy to {pct} percent of mail</label>
          <input id="d-pct" type="range" min={1} max={100} value={pct} onChange={(e) => setPct(Number(e.target.value))} className="mt-3 w-full" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="d-dkim" className="mono-label">DKIM alignment</label>
            <select id="d-dkim" className={sel} value={adkim} onChange={(e) => setAdkim(e.target.value as 'r' | 's')}><option value="r">relaxed</option><option value="s">strict</option></select>
          </div>
          <div>
            <label htmlFor="d-spf" className="mono-label">SPF alignment</label>
            <select id="d-spf" className={sel} value={aspf} onChange={(e) => setAspf(e.target.value as 'r' | 's')}><option value="r">relaxed</option><option value="s">strict</option></select>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="panel p-6 md:p-8" aria-live="polite">
          <p className="mono-label">Your DMARC record</p>
          <p className="mt-4 break-all font-mono text-[0.85rem] text-bone/90">{record}</p>
          <button type="button" onClick={copy} className="btn-solid mt-5">{copied ? 'Copied' : 'Copy record'}</button>
        </div>
        <div className="panel p-6 md:p-8">
          <p className="mono-label">Add it to your DNS</p>
          <ul className="mt-4 space-y-2 text-[0.95rem] text-bone/85">
            <li>Type: <strong className="font-medium text-bone">TXT</strong></li>
            <li>Host or name: <strong className="break-all font-medium text-bone">{host}</strong></li>
            <li>Value: the record on the left</li>
          </ul>
          {policy !== 'none' && <p className="mt-4 text-[0.875rem] text-bone/70">Only move beyond none once your reports show every legitimate sender passing, or real mail will be junked or blocked.</p>}
        </div>
      </div>
    </div>
  );
}
