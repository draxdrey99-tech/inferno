import Image from 'next/image';
import Link from 'next/link';
import {permanentRedirect} from 'next/navigation';
import {SERVICE_PAGES,getServicePage,relatedReadingFor} from '@/lib/service-pages';
import {PROOF,SITE,GOOD_FIT,BAD_FIT} from '@/lib/site';
import {pageMeta,breadcrumbLd,serviceLd,faqLd} from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';
import {Check,X} from '@phosphor-icons/react/dist/ssr';
type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return SERVICE_PAGES.map(({slug})=>({slug}));}
export async function generateMetadata({params}:Props){const {slug}=await params;const s=getServicePage(slug);if(!s)return {};return pageMeta({title:s.metaTitle,description:s.metaDescription,path:`/services/${s.slug}`});}
export default async function ServicePage({params}:Props){
 const {slug}=await params;const s=getServicePage(slug);if(!s)permanentRedirect('/#services');
 const path=`/services/${s.slug}`;const proof=PROOF[0];const related=relatedReadingFor(s.slug);
 return <>
 <JsonLd data={breadcrumbLd([{name:'Home',path:'/'},{name:'Services',path:'/services'},{name:s.title,path}])}/><JsonLd data={serviceLd({name:s.title,description:s.summary,path})}/><JsonLd data={faqLd(s.faqs)}/>
 <section className="shell inner-page" aria-labelledby="service-title">
<nav aria-label="Breadcrumb" className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><span>{s.title}</span></nav>
 <p className="eyebrow">{s.keyword}</p><h1 id="service-title" className="display-xl mt-5 max-w-4xl">{s.title} for ecommerce brands.</h1><p className="lede mt-7 max-w-3xl" id="answer">{s.answer}</p><p className="mt-5 max-w-3xl text-[0.9375rem] leading-relaxed text-mute">{s.intro}</p><a className="btn btn-flame mt-8" href={SITE.calendly} target="_blank" rel="noopener noreferrer">Book your free audit</a><p className="mt-3 text-sm text-mute">30 minutes, no obligation, and the findings are yours to keep.</p>
 <section className="service-scope" aria-labelledby="scope-title"><h2 id="scope-title" className="display-lg">What we take care of.</h2><div><p className="lede">{s.summary}</p><ul className="deliverables">{s.deliverables.map(d=><li key={d}>{d}</li>)}</ul><p className="lede">{s.outcome}</p></div></section>
 <section aria-labelledby="fit-title" className="mt-20 md:mt-24"><h2 id="fit-title" className="display-lg">Is this the right fit?</h2><div className="mt-8 grid gap-6 md:grid-cols-2"><div className="card rounded-xl p-8"><h3 className="font-display text-lg tracking-tight text-flame">Who this is for</h3><ul className="mt-6 space-y-4">{GOOD_FIT.map(f=><li key={f} className="flex gap-3.5 text-[0.9375rem] leading-relaxed text-bone/85"><Check size={16} weight="bold" aria-hidden className="mt-1 shrink-0 text-flame"/>{f}</li>)}</ul></div><div className="card rounded-xl p-8"><h3 className="font-display text-lg tracking-tight text-mute">Who this is not for</h3><ul className="mt-6 space-y-4">{BAD_FIT.map(f=><li key={f} className="flex gap-3.5 text-[0.9375rem] leading-relaxed text-mute"><X size={16} weight="bold" aria-hidden className="mt-1 shrink-0 text-mute/60"/>{f}</li>)}</ul></div></div></section>
 </section>
 <section className="proof-section" aria-labelledby="service-proof"><div className="shell"><h2 id="service-proof" className="display-lg">The account is the evidence.</h2><p className="lede mt-6" style={{color:'#57514e'}}>This is a whole-channel client result, not a claim that any single service produced it.</p><div className="proof-panel mt-8"><div className="proof-readout"><p className="proof-window">{proof.window}</p><h3>{proof.headline}</h3><p className="proof-share">{proof.metric}</p><p className="proof-note">{proof.note}</p><Link href="/#proof" className="text-link">See all three Klaviyo account screenshots</Link></div><figure className="proof-picture"><a href={proof.image} target="_blank" rel="noopener noreferrer"><Image src={proof.image} alt={proof.alt} width={proof.width} height={proof.height} sizes="(max-width:768px) 90vw, 55vw" loading="lazy"/></a><figcaption>Unattributed account / {proof.window}</figcaption></figure></div><p className="proof-disclaimer">Results vary by brand, list size, category and offer. Individual accounts are not an average or a guarantee.</p></div></section>
 <section className="shell section-space" aria-labelledby="service-faq"><h2 id="service-faq" className="display-lg mb-10">Questions about {s.navTitle.toLowerCase()}.</h2><Faq items={s.faqs}/></section>
 <section className="shell section-space border-t" aria-labelledby="related-reading"><h2 id="related-reading" className="display-md">Related reading.</h2><div className="related-links">{related.map(r=><Link href={`/services/${r.slug}`} key={r.slug}>Explore {r.navTitle.toLowerCase()}</Link>)}<Link href="/work">See real client emails in the portfolio</Link></div></section>
 <section className="shell section-space border-t" aria-labelledby="related-services"><h2 id="related-services" className="display-md">The rest of the channel.</h2><div className="related-links">{SERVICE_PAGES.filter(p=>p.slug!==slug).map(p=><Link href={`/services/${p.slug}`} key={p.slug}>{p.title}</Link>)}<Link href="/blog">Email marketing blog</Link></div></section><CtaBand/>
 </>;
}
