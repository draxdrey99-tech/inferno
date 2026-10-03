import Image from 'next/image';
import Link from 'next/link';
import {permanentRedirect} from 'next/navigation';
import {SERVICE_PAGES,SERVICE_DETAIL,FIRST_30_DAYS,NEEDED_FROM_YOU,getServicePage,relatedReadingFor,serviceForWork} from '@/lib/service-pages';
import {PROOF,WORK,CONTENT_UPDATED} from '@/lib/site';
import {GLOSSARY} from '@/lib/glossary';
import {USE_CASES} from '@/lib/use-cases';
import {pageMeta,breadcrumbLd,serviceLd,faqLd} from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';
import CalendlyLink from '@/components/CalendlyLink';
import {Check,X} from '@phosphor-icons/react/dist/ssr';

type Props={params:Promise<{slug:string}>};
export function generateStaticParams(){return SERVICE_PAGES.map(({slug})=>({slug}));}
export async function generateMetadata({params}:Props){const {slug}=await params;const s=getServicePage(slug);if(!s)return {};return pageMeta({title:s.metaTitle,description:s.metaDescription,path:`/services/${s.slug}`});}

export default async function ServicePage({params}:Props){
 const {slug}=await params;const s=getServicePage(slug);if(!s)permanentRedirect('/#services');
 const path=`/services/${s.slug}`;const proof=PROOF[0];const related=relatedReadingFor(s.slug);
 const detail=SERVICE_DETAIL[s.slug];
 const examples=WORK.filter(w=>serviceForWork(w.type).slug===s.slug||(s.slug==='klaviyo-email-marketing'&&/campaign/i.test(w.type))).slice(0,3);
 const reviewed=new Date(CONTENT_UPDATED).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});

 return <>
  <JsonLd data={breadcrumbLd([{name:'Home',path:'/'},{name:'Services',path:'/services'},{name:s.title,path}])}/>
  <JsonLd data={serviceLd({name:s.title,description:s.summary,path})}/>
  <JsonLd data={faqLd(s.faqs)}/>

  <section className="shell inner-page" aria-labelledby="service-title">
   <nav aria-label="Breadcrumb" className="breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/services">Services</Link><span>/</span><span>{s.title}</span></nav>

   <div className="panel panel-grid panel-corners mt-8 p-7 md:p-12">
    <p className="mono-label mono-label-dot">Service</p>
    <h1 id="service-title" className="display-xl mt-5 max-w-4xl">{s.title} for <span className="hud-box">ecommerce brands.</span></h1>
    <p className="lede mt-7 max-w-3xl" id="answer">{s.answer}</p>
    <p className="mt-5 max-w-3xl text-[0.9375rem] leading-relaxed text-mute">{s.intro}</p>
    <CalendlyLink source={`service-${s.slug}`} className="btn btn-flame mt-8">Book your free audit</CalendlyLink>
    <p className="mt-3 text-sm text-mute">30 minutes, no obligation, and the findings are yours to keep.</p>
   </div>

   <section className="service-scope" aria-labelledby="scope-title">
    <div className="section-head">
     <p className="section-meta" aria-hidden="true"><span className="section-index">.01.</span><span className="mono-label">Scope</span></p>
     <h2 id="scope-title" className="display-lg">What we take care of.</h2>
    </div>
    <div>
     <p className="lede">{s.summary}</p>
     <ul className="deliverables">{s.deliverables.map(d=><li key={d}>{d}</li>)}</ul>
     <p className="lede">{s.outcome}</p>
    </div>
   </section>

   <section aria-labelledby="fit-title" className="mt-20 md:mt-24">
    <p className="section-meta" aria-hidden="true"><span className="section-index">.02.</span><span className="mono-label">Fit</span></p>
    <h2 id="fit-title" className="display-lg mt-5">Is this the right fit?</h2>
    <div className="panel-set cols-2 mt-8">
     <div className="panel panel-grid fit-panel">
      <h3 className="text-flame"><span className="section-index" aria-hidden="true">.01.</span>Who this is for</h3>
      <ul className="mt-7 space-y-4">{detail.goodFit.map(f=><li key={f} className="flex gap-3.5 text-[0.9375rem] leading-relaxed text-bone/85"><Check size={16} weight="bold" aria-hidden className="mt-1 shrink-0 text-flame"/>{f}</li>)}</ul>
     </div>
     <div className="panel panel-grid fit-panel">
      <h3 className="text-mute"><span className="section-index" aria-hidden="true">.02.</span>Who this is not for</h3>
      <ul className="mt-7 space-y-4">{detail.badFit.map(f=><li key={f} className="flex gap-3.5 text-[0.9375rem] leading-relaxed text-mute"><X size={16} weight="bold" aria-hidden className="mt-1 shrink-0 text-mute/60"/>{f}</li>)}</ul>
     </div>
    </div>
   </section>

   <section aria-labelledby="start-title" className="mt-20 md:mt-24">
    <p className="section-meta" aria-hidden="true"><span className="section-index">.03.</span><span className="mono-label">Getting started</span></p>
    <h2 id="start-title" className="display-lg mt-5">The first 30 days.</h2>
    <ol className="mt-8 max-w-3xl space-y-5">{FIRST_30_DAYS.map(f=><li key={f.when} className="grid gap-1 sm:grid-cols-[9rem_1fr] sm:gap-6"><span className="mono-label">{f.when}</span><span className="text-[0.9375rem] leading-relaxed text-bone/85">{f.what}</span></li>)}</ol>
    <h3 className="eyebrow mt-12">What we need from you</h3>
    <ul className="mt-5 max-w-3xl space-y-3">{NEEDED_FROM_YOU.map(n=><li key={n} className="text-[0.9375rem] leading-relaxed text-mute">{n}</li>)}</ul>
   </section>

   <section aria-labelledby="mistakes-title" className="mt-20 md:mt-24">
    <p className="section-meta" aria-hidden="true"><span className="section-index">.04.</span><span className="mono-label">Common mistakes</span></p>
    <h2 id="mistakes-title" className="display-lg mt-5">What we fix most often.</h2>
    <ul className="deliverables mt-8 max-w-3xl">{detail.mistakes.map(m=><li key={m}>{m}</li>)}</ul>
   </section>

   {examples.length>0&&<section aria-labelledby="examples-title" className="mt-20 md:mt-24">
    <p className="section-meta" aria-hidden="true"><span className="section-index">.05.</span><span className="mono-label">Examples</span></p>
    <h2 id="examples-title" className="display-lg mt-5">Work in this area.</h2>
    <div className="related-links">{examples.map(w=><Link key={w.slug} href={`/work#${w.slug}`}>{w.client}: {w.title}</Link>)}</div>
   </section>}

   <p className="mt-16 text-[0.8125rem] text-mute">Last reviewed <time dateTime={CONTENT_UPDATED}>{reviewed}</time>.</p>
  </section>

  <section className="proof-section" aria-labelledby="service-proof">
   <div className="shell">
    <p className="section-meta" aria-hidden="true"><span className="section-index">.06.</span><span className="mono-label">Proof</span></p>
    <h2 id="service-proof" className="display-lg mt-5">The account is the evidence.</h2>
    <p className="lede mt-6">This is a whole-channel client result, not a claim that any single service produced it.</p>
    <div className="proof-panel mt-8">
     <div className="proof-readout">
      <p className="proof-window">{proof.window}</p>
      <h3>{proof.headline}</h3>
      <p className="proof-share">{proof.metric}</p>
      <p className="proof-note">{proof.note}</p>
      <Link href="/#proof" className="text-link">See all three Klaviyo account screenshots</Link>
     </div>
     <figure className="proof-picture">
      <a href={proof.image} target="_blank" rel="noopener noreferrer">
       <Image src={proof.image} alt={proof.alt} width={proof.width} height={proof.height} sizes="(max-width:768px) 90vw, 55vw" loading="lazy"/>
      </a>
      <figcaption>Unattributed account / {proof.window}</figcaption>
     </figure>
    </div>
    <p className="proof-disclaimer">Results vary by brand, list size, category and offer. Individual accounts are not an average or a guarantee.</p>
   </div>
  </section>

  <section className="shell section-space" aria-labelledby="service-faq">
   <p className="section-meta" aria-hidden="true"><span className="section-index">.07.</span><span className="mono-label">FAQ</span></p>
   <h2 id="service-faq" className="display-lg mt-5 mb-10">Questions about {s.navTitle.toLowerCase()}.</h2>
   <Faq items={s.faqs}/>
  </section>

  <section className="shell section-space border-t" aria-labelledby="related-reading">
   <p className="section-meta" aria-hidden="true"><span className="section-index">.08.</span><span className="mono-label">Keep reading</span></p>
   <h2 id="related-reading" className="display-md mt-5">Related reading.</h2>
   <div className="related-links">
    {related.map(r=><Link href={`/services/${r.slug}`} key={r.slug}>Explore {r.navTitle.toLowerCase()}</Link>)}
    {GLOSSARY.filter(t=>t.service===s.slug).map(t=><Link href={`/glossary/${t.slug}`} key={t.slug}>What is {t.term}?</Link>)}
    {USE_CASES.slice(0,3).map(u=><Link href={`/email-marketing-for/${u.slug}`} key={u.slug}>Email marketing for {u.label}</Link>)}
    <Link href="/work">See real client emails in the portfolio</Link>
   </div>
  </section>

  <section className="shell section-space border-t" aria-labelledby="related-services">
   <p className="section-meta" aria-hidden="true"><span className="section-index">.09.</span><span className="mono-label">Channel</span></p>
   <h2 id="related-services" className="display-md mt-5">The rest of the channel.</h2>
   <div className="related-links">
    {SERVICE_PAGES.filter(p=>p.slug!==slug).map(p=><Link href={`/services/${p.slug}`} key={p.slug}>{p.title}</Link>)}
    <Link href="/blog">Email marketing blog</Link>
   </div>
  </section>
  <CtaBand/>
 </>;
}
