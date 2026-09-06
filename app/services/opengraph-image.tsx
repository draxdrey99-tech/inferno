import {ImageResponse} from 'next/og';
import {OG_SIZE,OG_CONTENT_TYPE,OgCard,ogFonts} from '@/lib/og';
export const size=OG_SIZE;
export const contentType=OG_CONTENT_TYPE;
export const alt="An email channel that works together. | Inferno Emails";
export default async function Image(){return new ImageResponse(<OgCard eyebrow="services" title="An email channel that works together."/>,{...size,fonts:await ogFonts()});}
