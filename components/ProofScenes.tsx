import Revenue from './Revenue';
import Image from 'next/image';
import { PROOF } from '@/lib/site';
const amounts=[477929.14,98625.63,9100.94];
export default function ProofScenes(){
 return <section id="proof" className="proof-section" aria-labelledby="proof-title"><div className="shell">
  <div className="proof-heading"><div><p className="eyebrow">Receipts, not adjectives</p><h2 id="proof-title" className="display-lg">Screenshots of real Klaviyo accounts.</h2></div><p className="lede">Client dashboards, exact reporting windows shown. On these three, email accounted for 44% to 48% of total store revenue.</p></div>
  {PROOF.map((p,i)=><article className="proof-scene" key={p.image} aria-label={p.headline}>
   <div className="proof-panel">
    <div className="proof-readout"><p className="proof-window">{p.window}</p><p className="proof-amount"><Revenue amount={new Intl.NumberFormat('en-US',{style:'currency',currency:i===2?'GBP':'USD'}).format(amounts[i])} /></p><h3>{p.headline}</h3><p className="proof-share">{p.metric}</p><p className="proof-note">{p.note}</p></div>
    <figure className="proof-picture"><a href={p.image} target="_blank" rel="noopener noreferrer" aria-label={`Open original dashboard: ${p.window}`}><Image src={p.image} alt={p.alt} width={p.width} height={p.height} sizes="(max-width:1024px) 90vw, 55vw" loading="lazy" /></a><figcaption>Klaviyo / Unattributed client account <span>Open original screenshot</span></figcaption></figure>
   </div>
  </article>)}
  <p className="proof-disclaimer">Results vary by brand, list size, category and offer. These are individual client accounts over the periods stated, not an average or a guarantee of what your store will do.</p>
 </div></section>;
}
