import { SITE_URL } from './site';

/**
 * IndexNow tells Bing (and through it Copilot and ChatGPT search), Yandex
 * and others a URL changed, instead of waiting for a recrawl. Needs
 * INDEXNOW_KEY in the environment: any 8 to 128 character string of
 * letters, digits and dashes. The key is served at /indexnow-key.txt, which
 * is where the ping tells the search engine to verify it.
 */
export const indexNowKey = () => process.env.INDEXNOW_KEY || '';

export async function pingIndexNow(paths: string[]) {
  const key = indexNowKey();
  if (!key) return;
  try {
    await fetch('https://api.indexnow.org/indexnow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: new URL(SITE_URL).host,
        key,
        keyLocation: `${SITE_URL}/indexnow-key.txt`,
        urlList: paths.map((p) => `${SITE_URL}${p}`),
      }),
    });
  } catch (err) {
    console.error('[indexnow] ping failed', err);
  }
}
