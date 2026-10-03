import { ImageResponse } from 'next/og';
import { OG_CONTENT_TYPE, OG_SIZE, OgCard, ogFonts } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Every agency wants your money. We want the account. | Inferno Emails';

export default async function Image() {
  return new ImageResponse(
    <OgCard eyebrow="About" title="Every agency wants your money. We want the account." />,
    { ...size, fonts: await ogFonts() }
  );
}
