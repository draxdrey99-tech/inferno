import {ImageResponse} from 'next/og';
import {OG_SIZE,OG_CONTENT_TYPE,OgCard,ogFonts} from '@/lib/og';
import {getServicePage} from '@/lib/service-pages';
export const size=OG_SIZE;
export const contentType=OG_CONTENT_TYPE;
export const alt='Inferno Emails service';
export default async function Image({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;const service=getServicePage(slug);
 return new ImageResponse(<OgCard eyebrow="Email & retention marketing" title={service?.title||'Email marketing services'}/>,{...size,fonts:await ogFonts()});
}
