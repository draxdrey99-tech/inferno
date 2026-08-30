import { SITE_URL } from './site';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

/**
 * Archivo, fetched from Google's static host at render time. Wrapped so a
 * network failure degrades to the default font rather than a broken image.
 */
export async function ogFonts() {
  try {
    const css = await fetch(
      'https://fonts.googleapis.com/css2?family=Archivo:wght@700&display=swap',
      { headers: { 'User-Agent': 'Mozilla/5.0 Chrome/120' } }
    ).then((r) => r.text());

    const url = css.match(/src:\s*url\((https:\/\/[^)]+\.woff2?)\)/)?.[1];
    if (!url) return undefined;

    const data = await fetch(url).then((r) => r.arrayBuffer());
    return [{ name: 'Archivo', data, style: 'normal' as const, weight: 700 as const }];
  } catch {
    return undefined;
  }
}

/** Shared card shell so every OG image on the site looks like a set. */
export function OgCard({
  eyebrow,
  title,
  footer,
}: {
  eyebrow: string;
  title: string;
  footer?: string;
}) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#0b0b0c',
        padding: '72px 76px',
        fontFamily: 'Archivo, sans-serif',
        position: 'relative',
      }}
    >
      {/* Flame-red rule across the top edge. */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 10,
          background: '#f51717',
          display: 'flex',
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 99,
            background: '#f51717',
            display: 'flex',
          }}
        />
        <div
          style={{
            fontSize: 24,
            letterSpacing: 5,
            textTransform: 'uppercase',
            color: '#8d8a85',
            display: 'flex',
          }}
        >
          {eyebrow}
        </div>
      </div>

      <div
        style={{
          fontSize: title.length > 72 ? 60 : title.length > 42 ? 74 : 92,
          lineHeight: 1.03,
          letterSpacing: -3,
          color: '#ecebe8',
          display: 'flex',
          maxWidth: 1000,
        }}
      >
        {title}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid rgba(255,255,255,0.14)',
          paddingTop: 30,
        }}
      >
        <div style={{ fontSize: 30, color: '#ecebe8', display: 'flex' }}>
          Inferno Emails
        </div>
        <div style={{ fontSize: 24, color: '#8d8a85', display: 'flex' }}>
          {footer || SITE_URL.replace(/^https?:\/\//, '')}
        </div>
      </div>
    </div>
  );
}
