import fs from 'node:fs';
for(const [path,title] of [['blog','Email marketing, in practice.'],['privacy','Your data. Your trust.'],['terms','Clear terms. Good work.'],['services','An email channel that works together.']]){
fs.writeFileSync(`app/${path}/opengraph-image.tsx`,`import {ImageResponse} from 'next/og';
import {OG_SIZE,OG_CONTENT_TYPE,OgCard,ogFonts} from '@/lib/og';
export const size=OG_SIZE;
export const contentType=OG_CONTENT_TYPE;
export const alt=${JSON.stringify(title+' | Inferno Emails')};
export default async function Image(){return new ImageResponse(<OgCard eyebrow=${JSON.stringify(path)} title=${JSON.stringify(title)}/>,{...size,fonts:await ogFonts()});}
`);
}
for(const path of ['privacy','terms']){
let source=fs.readFileSync(`app/${path}/page.tsx`,'utf8').replace("import { pageMeta }", "import { pageMeta, breadcrumbLd }");
source="import JsonLd from '@/components/JsonLd';\nimport Link from 'next/link';\n"+source;
source=source.replace('<section className="pt-24">',`<section className="pt-24" aria-labelledby="legal-title"><JsonLd data={breadcrumbLd([{name:'Home',path:'/'},{name:'${path==='privacy'?'Privacy policy':'Terms of service'}',path:'/${path}'}])}/>`);
source=source.replace('<p className="eyebrow">Legal</p>','<nav aria-label="Breadcrumb" className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Legal</span></nav>');
source=source.replace('<h1 className=', '<h1 id="legal-title" className=');
fs.writeFileSync(`app/${path}/page.tsx`,source);
}
let site=fs.readFileSync('lib/site.ts','utf8');
site=site.replace("{ label: 'Services', href: '/#services' }","{ label: 'Services', href: '/services' }");
for(const [label,slug] of [['Klaviyo email marketing','klaviyo-email-marketing'],['Email design','email-design'],['Email deliverability','email-deliverability'],['Retention strategy','retention-strategy']])site=site.replace(`{ label: '${label}', href: '/#services' }`,`{ label: '${label}', href: '/services/${slug}' }`);
site=site.replace("{ label: 'Email design', href: '/services/email-design' },","{ label: 'Email design', href: '/services/email-design' },\n      { label: 'Email flows & automation', href: '/services/email-flows' },");
fs.writeFileSync('lib/site.ts',site);
let page=fs.readFileSync('app/page.tsx','utf8');
const labels=['Services','Client email designs','Our process','About Inferno Emails','Client testimonials','Free audit scope','Frequently asked questions','Book or request your audit'];let i=0;
page=page.replace(/<section(?=\s)/g,()=>`<section aria-label="${labels[i++]}"`);
fs.writeFileSync('app/page.tsx',page);
