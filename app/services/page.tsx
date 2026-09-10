import Link from 'next/link';
import {SERVICE_PAGES,SERVICE_COMPARISON} from '@/lib/service-pages';
import {pageMeta,breadcrumbLd,faqLd} from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';

export const metadata=pageMeta({title:'Ecommerce Email Marketing Services',description:'Klaviyo management, email automation, campaign design, deliverability and retention strategy. One team for your ecommerce email channel.',path:'/services'});

/**
 * Three honest positions on choosing between the five service pages,
 * every answer already stated elsewhere on the site (the audit-first
 * model, quoting after the audit, no bundling by default).
 */
const CHOOSING_FAQS=[
 {
  q:'Which service should we start with?',
  a:'Start with the free audit. We review your flow coverage, list health, authentication records and last ninety days of performance, then tell you which gap costs you the most before recommending a service.',
 },
 {
  q:'Do we need all five services at once?',
  a:'No. Most engagements start with whichever gap the audit finds first, often deliverability or the core flow set, and expand from there. We quote after the audit rather than bundling everything by default.',
 },
 {
  q:'What if we are not sure which service we need?',
  a:'That is what the audit is for. Book it and we will tell you what we found and what we would do about it, whether that is one service or several. There is no fee and no obligation.',
 },
] as const;

export default function Services(){
 return <>
  <JsonLd data={breadcrumbLd([{name:'Home',path:'/'},{name:'Services',path:'/services'}])}/>
  <JsonLd data={faqLd(CHOOSING_FAQS)}/>

  <section className="shell inner-page" aria-labelledby="services-title">
   <nav aria-label="Breadcrumb" className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Services</span></nav>

   <p className="section-meta" aria-hidden="true"><span className="section-index">.01.</span><span className="mono-label">Services</span></p>
   <h1 id="services-title" className="display-xl max-w-4xl mt-5">An email channel that <span className="hud-box">works together.</span></h1>
   <p className="lede mt-7">Klaviyo, creative, deliverability and retention. One team responsible for the whole programme. Each page below covers one service in full; this page is the two-minute comparison.</p>

   <div className="ruler mt-14" aria-hidden="true" />
   <div className="service-index">
    {SERVICE_PAGES.map((s,i)=>{
     const c=SERVICE_COMPARISON[s.slug];
     return (
      <article key={s.slug} className="panel-grid">
       <div className="flex items-center justify-between gap-4" aria-hidden="true">
        <span className="section-index">.0{i+1}.</span>
        <span className="mono-label">{s.keyword}</span>
       </div>
       <h2 className="display-md mt-5">
        <Link href={`/services/${s.slug}`} className="service-title-link">{s.title}</Link>
       </h2>
       <p className="lede mt-4">{s.summary}</p>
       {c&&<dl className="mt-6 grid grid-cols-[6rem_1fr] gap-x-4 gap-y-3 text-[0.8125rem] leading-relaxed">
        <dt className="mono-label">Best for</dt><dd>{c.bestFor}</dd>
        <dt className="mono-label">Starts with</dt><dd>{c.startsWith}</dd>
        <dt className="mono-label">Measured by</dt><dd>{c.measuredBy}</dd>
       </dl>}
       <Link className="text-link mt-6 inline-block" href={`/services/${s.slug}`}>Explore {s.navTitle.toLowerCase()}</Link>
      </article>
     );
    })}
   </div>
   <p className="lede mt-10">See the <Link className="text-link" href="/work">email design examples</Link>, inspect the <Link className="text-link" href="/#proof">Klaviyo account screenshots</Link>, or read the <Link className="text-link" href="/blog">blog</Link>.</p>
  </section>

  <section className="shell section-space border-t" aria-labelledby="choosing-faq">
   <p className="section-meta" aria-hidden="true"><span className="section-index">.02.</span><span className="mono-label">FAQ</span></p>
   <h2 id="choosing-faq" className="display-lg mt-5 mb-10">Choosing between them.</h2>
   <Faq items={CHOOSING_FAQS}/>
  </section>
  <CtaBand/>
 </>;
}
