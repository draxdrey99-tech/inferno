import Link from 'next/link';
import {SERVICE_PAGES} from '@/lib/service-pages';
import {pageMeta,breadcrumbLd} from '@/lib/seo';
import JsonLd from '@/components/JsonLd';
import CtaBand from '@/components/CtaBand';
export const metadata=pageMeta({title:'Ecommerce Email Marketing Services',description:'Klaviyo management, email automation, campaign design, deliverability and retention strategy. One team for your ecommerce email channel.',path:'/services'});
export default function Services(){return <>
 <JsonLd data={breadcrumbLd([{name:'Home',path:'/'},{name:'Services',path:'/services'}])}/>
 <section className="shell inner-page" aria-labelledby="services-title">
<nav aria-label="Breadcrumb" className="breadcrumb"><Link href="/">Home</Link><span>/</span><span>Services</span></nav><h1 id="services-title" className="display-xl max-w-4xl">An email channel that works together.</h1><p className="lede mt-7">Klaviyo, creative, deliverability and retention. One team responsible for the whole programme.</p>
 <div className="service-index">{SERVICE_PAGES.map(s=><article key={s.slug}><h2 className="display-md"><Link href={`/services/${s.slug}`}>{s.title}</Link></h2><p className="lede mt-4">{s.summary}</p><Link className="text-link" href={`/services/${s.slug}`}>Explore {s.navTitle.toLowerCase()}</Link></article>)}</div>
 <p className="lede">See the <Link className="text-link" href="/work">email design examples</Link>, inspect the <Link className="text-link" href="/#proof">dated account results</Link>, or read the <Link className="text-link" href="/blog">blog</Link>.</p></section><CtaBand/>
 </>}
