'use client';
export default function GalleryControls(){
 const move=(direction:number)=>{const rail=document.getElementById('work-rail');if(rail)rail.scrollBy({left:direction*rail.clientWidth*.8,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});};
 return <div className="gallery-controls"><span>Explore all eight emails</span><button type="button" onClick={()=>move(-1)} aria-label="Previous emails">←</button><button type="button" onClick={()=>move(1)} aria-label="Next emails">→</button></div>;
}
