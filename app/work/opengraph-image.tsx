import { ImageResponse } from 'next/og';
import { OG_CONTENT_TYPE, OG_SIZE, OgCard, ogFonts } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Ecommerce email design examples | Inferno Emails';

export default async function Image() {
  return new ImageResponse(
    <OgCard eyebrow="Work" title="Ecommerce email design examples, shown in full." />,
    { ...size, fonts: await ogFonts() }
  );
}
