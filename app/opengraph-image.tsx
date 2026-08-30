import { ImageResponse } from 'next/og';
import { OG_CONTENT_TYPE, OG_SIZE, OgCard, ogFonts } from '@/lib/og';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Inferno Emails, email marketing agency for ecommerce brands';

export default async function Image() {
  return new ImageResponse(
    (
      <OgCard
        eyebrow="Email & retention marketing"
        title="The cheapest revenue in your business is already on your list."
      />
    ),
    { ...size, fonts: await ogFonts() }
  );
}
