import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { CustomEase } from 'gsap/CustomEase';

/** Homepage-only enhancement. All copy and layout are usable before this module loads. */
export function mountMotion() {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create('settle', '.16,1,.3,1');
  const cleanups: (() => void)[] = [];
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
    const device = navigator as Navigator & {deviceMemory?:number;connection?:{saveData?:boolean}};
    if (device.connection?.saveData || (device.deviceMemory && device.deviceMemory < 4) || navigator.hardwareConcurrency < 4) return;
    const lenis = new Lenis({duration:1.05,anchors:true,easing:gsap.parseEase('settle')});
    lenis.on('scroll',ScrollTrigger.update);
    const tick=(time:number)=>lenis.raf(time*1000);
    gsap.ticker.add(tick);
    const sheets=gsap.utils.toArray<HTMLElement>('.hero-sheet');
    sheets.forEach((sheet,i)=>gsap.to(sheet,{y:-(i+1)*35,z:0,rotationZ:0,ease:'none',scrollTrigger:{trigger:'#hero',start:'top top',end:'bottom top',scrub:1}}));
    // Proof amounts play a one-shot reel on entry (see revenue-reels.ts); no pin, no scrub.
    // Native horizontal rail remains scrollable. The scrub is only a small
    // image-scale handoff, so keyboard focus and scroll position never disagree.
    gsap.utils.toArray<HTMLElement>('.work-rail .viewport img').forEach(img=>gsap.fromTo(img,{scale:1.035},{scale:1,ease:'none',scrollTrigger:{trigger:'#work',start:'top bottom',end:'top 20%',scrub:true}}));
    return ()=>{gsap.ticker.remove(tick);lenis.destroy();};
  });
  if(matchMedia('(pointer:fine) and (prefers-reduced-motion:no-preference)').matches){
    document.querySelectorAll<HTMLElement>('[data-magnetic], [data-tilt]').forEach(el=>{
      const move=(e:PointerEvent)=>{const r=el.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
        gsap.to(el,el.hasAttribute('data-tilt')?{rotationX:-y*6,rotationY:x*6,duration:.35,ease:'settle'}:{x:x*8,y:y*8,duration:.35,ease:'settle'});};
      const leave=()=>gsap.to(el,{x:0,y:0,rotationX:0,rotationY:0,duration:.35,ease:'settle'});
      el.addEventListener('pointermove',move);el.addEventListener('pointerleave',leave);
      cleanups.push(()=>{el.removeEventListener('pointermove',move);el.removeEventListener('pointerleave',leave);gsap.set(el,{clearProps:'transform'});});
    });
  }
  ScrollTrigger.refresh();
  return ()=>{mm.revert();cleanups.forEach(fn=>fn());};
}
