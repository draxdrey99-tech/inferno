import { ImageResponse } from 'next/og';
import { OG_CONTENT_TYPE, OG_SIZE, OgCard, ogFonts } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Talk to Inferno Emails. | Inferno Emails';

export default async function Image() {
  return new ImageResponse(
    <OgCard eyebrow="Contact" title="Talk to Inferno Emails." />,
    { ...size, fonts: await ogFonts() }
  );
}
