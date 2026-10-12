/**
 * Submit every sitemap URL to IndexNow (Bing, Yandex and partners) in one go.
 *
 *   INDEXNOW_KEY=yourkey node scripts/indexnow.mjs
 *
 * The same key must be set as INDEXNOW_KEY in Vercel so that
 * https://infernoemails.com/indexnow-key.txt serves it. Reads .env.local too.
 */
import { existsSync, readFileSync } from 'node:fs';

const ORIGIN = 'https://infernoemails.com';
const envFile = new URL('../.env.local', import.meta.url);
if (existsSync(envFile)) {
  for (const line of readFileSync(envFile, 'utf8').split('\n')) {
    const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  }
}
const key = process.env.INDEXNOW_KEY;
if (!key) { console.error('Set INDEXNOW_KEY first.'); process.exit(1); }

const served = (await (await fetch(`${ORIGIN}/indexnow-key.txt`)).text()).trim();
if (served !== key) { console.error('The live /indexnow-key.txt does not match this key. Set INDEXNOW_KEY in Vercel and redeploy first.'); process.exit(1); }

const xml = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(ORIGIN).host, key, keyLocation: `${ORIGIN}/indexnow-key.txt`, urlList }),
});
console.log(`Submitted ${urlList.length} URLs: HTTP ${res.status}`);
