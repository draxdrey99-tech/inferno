import {readFile} from 'node:fs/promises';
import path from 'node:path';
import { SITE_URL } from './site';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

/**
 * Archivo, loaded from the installed local font package. A missing font
 * degrades to the default rather than a broken image.
 */
export async function ogFonts() {
  try {
    const file = await readFile(path.join(process.cwd(), 'node_modules/@fontsource/archivo/files/archivo-latin-700-normal.woff'));
    return [{ name: 'Archivo', data: new Uint8Array(file).buffer, style: 'normal' as const, weight: 700 as const }];
  } catch { return undefined; }
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
        background: '#171717',
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
            background: '#f51717',
            display: 'flex',
          }}
        />
        <div
          style={{
            fontSize: 24,
            letterSpacing: 0,
            color: '#bdb6b2',
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
          color: '#f2efed',
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
        <div style={{ fontSize: 30, color: '#f2efed', display: 'flex' }}>
          Inferno Emails
        </div>
        <div style={{ fontSize: 24, color: '#bdb6b2', display: 'flex' }}>
          {footer || SITE_URL.replace(/^https?:\/\//, '')}
        </div>
      </div>
    </div>
  );
}
