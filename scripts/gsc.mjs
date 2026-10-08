/**
 * Google Search Console helper. No dependencies: signs a service-account JWT
 * with node:crypto and calls the REST APIs directly.
 *
 *   node scripts/gsc.mjs sites                         sites the key can see
 *   node scripts/gsc.mjs sitemap [url]                 submit a sitemap (default /sitemap.xml)
 *   node scripts/gsc.mjs sitemaps                      sitemap status and errors
 *   node scripts/gsc.mjs report [days] [dimension]     clicks and impressions (page|query|country|device), default 28 page
 *   node scripts/gsc.mjs inspect <url|path> [...]      index status for URLs
 *   node scripts/gsc.mjs inspect --family klaviyo      inspect every sitemap URL under a path prefix
 *
 * Credentials (never commit the key):
 *   GSC_SERVICE_ACCOUNT_JSON   the JSON itself, or a path to the key file
 *   GSC_SITE                   property, default sc-domain:infernoemails.com
 * The service account's email must be added as an Owner in Search Console
 * (Settings, Users and permissions). Env is read from .env.local if present.
 */
import { createSign } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';

const ORIGIN = 'https://infernoemails.com';
const envFile = new URL('../.env.local', import.meta.url);
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}

const SITE = process.env.GSC_SITE || 'sc-domain:infernoemails.com';
const die = (msg) => { console.error(`\x1b[31m${msg}\x1b[0m`); process.exit(1); };

function loadKey() {
  const raw = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!raw) die('GSC_SERVICE_ACCOUNT_JSON is not set (JSON or path to the key file). See the header of scripts/gsc.mjs.');
  try {
    return JSON.parse(raw.trim().startsWith('{') ? raw : readFileSync(raw, 'utf8'));
  } catch {
    die('GSC_SERVICE_ACCOUNT_JSON is neither valid JSON nor a readable file path.');
  }
}

const b64 = (b) => Buffer.from(b).toString('base64url');

async function token() {
  const key = loadKey();
  const now = Math.floor(Date.now() / 1000);
  const head = b64(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64(JSON.stringify({
    iss: key.client_email,
    scope: 'https://www.googleapis.com/auth/webmasters',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }));
  const sig = createSign('RSA-SHA256').update(`${head}.${claim}`).sign(key.private_key, 'base64url');
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${head}.${claim}.${sig}` }),
  });
  const json = await res.json();
  if (!json.access_token) die(`Token request failed: ${JSON.stringify(json)}`);
  return { access: json.access_token, email: key.client_email };
}

let auth;
async function api(url, init = {}) {
  auth ??= await token();
  const res = await fetch(url, { ...init, headers: { Authorization: `Bearer ${auth.access}`, 'Content-Type': 'application/json', ...init.headers } });
  const text = await res.text();
  if (!res.ok) {
    if (res.status === 403) die(`403 from Google. Add ${auth.email} as an Owner of ${SITE} in Search Console, and enable the Search Console API in Google Cloud.\n${text}`);
    die(`${res.status} ${url}\n${text}`);
  }
  return text ? JSON.parse(text) : {};
}

const S = encodeURIComponent(SITE);
const BASE = 'https://www.googleapis.com/webmasters/v3';
const abs = (u) => (u.startsWith('http') ? u : `${ORIGIN}${u.startsWith('/') ? '' : '/'}${u}`);
const day = (d) => new Date(Date.now() - d * 864e5).toISOString().slice(0, 10);

const [cmd, ...args] = process.argv.slice(2);

if (cmd === 'sites') {
  const r = await api(`${BASE}/sites`);
  for (const s of r.siteEntry || []) console.log(`${s.permissionLevel.padEnd(18)} ${s.siteUrl}`);
} else if (cmd === 'sitemap') {
  const url = abs(args[0] || '/sitemap.xml');
  await api(`${BASE}/sites/${S}/sitemaps/${encodeURIComponent(url)}`, { method: 'PUT' });
  console.log(`Submitted ${url}`);
} else if (cmd === 'sitemaps') {
  const r = await api(`${BASE}/sites/${S}/sitemaps`);
  for (const m of r.sitemap || []) {
    const sub = (m.contents || []).map((c) => `${c.type}: ${c.submitted} submitted`).join(', ');
    console.log(`${m.path}\n  last read ${m.lastDownloaded || 'never'}, errors ${m.errors}, warnings ${m.warnings}${sub ? `, ${sub}` : ''}`);
  }
  if (!(r.sitemap || []).length) console.log('No sitemaps submitted yet.');
} else if (cmd === 'report') {
  const days = Number(args[0]) || 28;
  const dim = args[1] || 'page';
  const r = await api(`https://searchconsole.googleapis.com/webmasters/v3/sites/${S}/searchAnalytics/query`, {
    method: 'POST',
    body: JSON.stringify({ startDate: day(days + 2), endDate: day(2), dimensions: [dim], rowLimit: 100 }),
  });
  console.log(`Last ${days} days by ${dim} (data lags about 2 days)\n`);
  console.log('clicks  impr   ctr    pos   ' + dim);
  for (const row of r.rows || []) {
    console.log(`${String(row.clicks).padStart(6)} ${String(row.impressions).padStart(6)} ${(row.ctr * 100).toFixed(1).padStart(5)}% ${row.position.toFixed(1).padStart(5)}  ${row.keys[0].replace(ORIGIN, '')}`);
  }
  if (!(r.rows || []).length) console.log('No data yet. A new property takes a few days to show anything.');
} else if (cmd === 'inspect') {
  let urls = args.filter((a) => !a.startsWith('--'));
  const fam = args.indexOf('--family');
  if (fam >= 0) {
    const prefix = args[fam + 1];
    urls = urls.filter((u) => u !== prefix);
    const xml = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
    urls.push(...[...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).filter((u) => u.startsWith(`${ORIGIN}/${prefix.replace(/^\//, '')}`)));
  }
  if (!urls.length) die('Give one or more URLs, or --family <path-prefix>.');
  const tally = {};
  for (const u of urls.map(abs)) {
    const r = await api('https://searchconsole.googleapis.com/v1/urlInspection/index:inspect', {
      method: 'POST',
      body: JSON.stringify({ inspectionUrl: u, siteUrl: SITE }),
    });
    const i = r.inspectionResult?.indexStatusResult || {};
    const state = i.coverageState || 'unknown';
    tally[state] = (tally[state] || 0) + 1;
    console.log(`${state.padEnd(42)} ${i.lastCrawlTime ? i.lastCrawlTime.slice(0, 10) : 'not crawled'}  ${u.replace(ORIGIN, '')}`);
  }
  console.log('\nSummary:', tally);
} else {
  console.log(readFileSync(new URL(import.meta.url), 'utf8').split('*/')[0]);
}
