'use client';
import { WORK } from '@/lib/site';
const WORDS=['zero','one','two','three','four','five','six','seven','eight','nine','ten','eleven','twelve'];
export default function GalleryControls(){
 const move=(direction:number)=>{const rail=document.getElementById('work-rail');if(rail)rail.scrollBy({left:direction*rail.clientWidth*.8,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};
 // Spelled out to match the rest of the page; falls back to digits past twelve.
 const count=WORDS[WORK.length]??String(WORK.length);
 return <div className="gallery-controls"><span>Explore all {count} emails</span><button type="button" onClick={()=>move(-1)} aria-label="Previous emails">←</button><button type="button" onClick={()=>move(1)} aria-label="Next emails">→</button></div>;
}
