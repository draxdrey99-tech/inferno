import { ImageResponse } from 'next/og';
import { OG_CONTENT_TYPE, OG_SIZE, OgCard, ogFonts } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Free email marketing audit for ecommerce brands. | Inferno Emails';

export default async function Image() {
  return new ImageResponse(
    <OgCard eyebrow="Free audit" title="Free email marketing audit for ecommerce brands." />,
    { ...size, fonts: await ogFonts() }
  );
}
