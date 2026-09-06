import {ImageResponse} from 'next/og';
import {OG_SIZE,OG_CONTENT_TYPE,OgCard,ogFonts} from '@/lib/og';
export const size=OG_SIZE;
export const contentType=OG_CONTENT_TYPE;
export const alt="Clear terms. Good work. | Inferno Emails";
export default async function Image(){return new ImageResponse(<OgCard eyebrow="terms" title="Clear terms. Good work."/>,{...size,fonts:await ogFonts()});}
