import { resolveTxt } from 'node:dns/promises';

/**
 * SPF record analysis for the checker tool. Follows include and redirect
 * recursively and counts the DNS lookups the way RFC 7208 does: include, a,
 * mx, ptr, exists and redirect each cost one, with a limit of ten.
 */
export type SpfResult = {
  domain: string;
  record: string | null;
  recordCount: number;
  lookups: number;
  all: string | null;
  mechanisms: string[];
  includes: string[];
  warnings: string[];
  errors: string[];
};

const LIMIT = 10;
const DOMAIN_RE = /^(?=.{1,253}$)([a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}$/;

export const cleanDomain = (v: string) =>
  v.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/^.*@/, '').replace(/[/?#].*$/, '').replace(/\.$/, '');

export const validDomain = (v: string) => DOMAIN_RE.test(v);

async function spfFor(domain: string): Promise<{ records: string[]; error?: string }> {
  try {
    const out = await Promise.race([
      resolveTxt(domain),
      new Promise<never>((_, rej) => setTimeout(() => rej(new Error('timeout')), 4000)),
    ]);
    return { records: out.map((chunks) => chunks.join('')).filter((r) => /^v=spf1(\s|$)/i.test(r)) };
  } catch (e) {
    const code = (e as NodeJS.ErrnoException).code;
    if (code === 'ENODATA' || code === 'ENOTFOUND') return { records: [] };
    return { records: [], error: code === 'ETIMEOUT' || (e as Error).message === 'timeout' ? 'The DNS lookup timed out.' : 'The DNS lookup failed.' };
  }
}

export async function analyseSpf(domain: string): Promise<SpfResult> {
  const result: SpfResult = { domain, record: null, recordCount: 0, lookups: 0, all: null, mechanisms: [], includes: [], warnings: [], errors: [] };
  const first = await spfFor(domain);
  if (first.error) { result.errors.push(first.error); return result; }
  result.recordCount = first.records.length;
  if (first.records.length === 0) { result.errors.push('No SPF record was found at this domain.'); return result; }
  if (first.records.length > 1) result.errors.push('More than one SPF record exists. Receivers treat this as a permanent error, so merge them into one.');
  result.record = first.records[0];

  const seen = new Set<string>([domain]);
  let budget = 40; // hard stop so a hostile record cannot make us do unbounded work

  async function walk(record: string, depth: number, top: boolean) {
    for (const raw of record.split(/\s+/).slice(1)) {
      const term = raw.replace(/^[+\-~?]/, '');
      const lower = term.toLowerCase();
      if (top && /^[+\-~?]?all$/i.test(raw)) { result.all = raw.toLowerCase(); continue; }
      if (top) result.mechanisms.push(raw);
      if (lower.startsWith('include:') || lower.startsWith('redirect=')) {
        const target = lower.split(/[:=]/)[1];
        result.lookups += 1;
        if (lower.startsWith('include:') && depth === 0) result.includes.push(target);
        if (!target || seen.has(target) || budget-- <= 0 || depth >= 10) continue;
        seen.add(target);
        const next = await spfFor(target);
        if (next.records[0]) await walk(next.records[0], depth + 1, false);
        else if (!next.error) result.warnings.push(`${target} has no SPF record, which makes the include fail.`);
      } else if (/^(a|mx|ptr|exists)(:|\/|$)/.test(lower)) {
        result.lookups += 1;
        if (lower.startsWith('ptr')) result.warnings.push('The ptr mechanism is discouraged by the SPF standard. Replace it with ip4, ip6 or include.');
      }
    }
  }
  await walk(result.record, 0, true);

  if (result.lookups > LIMIT) result.errors.push(`This record needs ${result.lookups} DNS lookups, over the limit of ${LIMIT}. Receivers will fail it with a permanent error. Remove unused includes or flatten them.`);
  else if (result.lookups >= 8) result.warnings.push(`This record uses ${result.lookups} of ${LIMIT} allowed lookups. Adding another sender may push it over.`);
  if (!result.all && !/redirect=/i.test(result.record)) result.warnings.push('There is no all mechanism at the end, so nothing tells receivers what to do with unlisted senders.');
  if (result.all === '+all') result.errors.push('+all lets any server send as this domain. Change it to ~all or -all.');
  if (result.all === '?all') result.warnings.push('?all is neutral and gives receivers no guidance. Prefer ~all or -all.');
  return result;
}
