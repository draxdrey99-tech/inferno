import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
const base=process.argv[2]||'http://localhost:3214';
const browser=await chromium.launch();const context=await browser.newContext({viewport:{width:1440,height:900}});const page=await context.newPage();
await page.goto(base);await page.waitForTimeout(1500);
const session=await context.newCDPSession(page);
await session.send('Tracing.start',{categories:'devtools.timeline,blink.user_timing',transferMode:'ReturnAsStream'});
const frameData=await page.evaluate(async()=>{
 const frames=[];let last=performance.now();
 const start=last;await new Promise(resolve=>{const tick=now=>{frames.push(now-last);last=now;window.scrollTo({top:Math.min((now-start)*1.6,document.body.scrollHeight-innerHeight),behavior:'instant'});if(now-start<6500)requestAnimationFrame(tick);else resolve();};requestAnimationFrame(tick);});
 return frames.slice(2);
});
const completed=new Promise(resolve=>session.once('Tracing.tracingComplete',resolve));await session.send('Tracing.end');const {stream}=await completed;
let trace='';for(;;){const chunk=await session.send('IO.read',{handle:stream});trace+=chunk.data;if(chunk.eof)break;}await session.send('IO.close',{handle:stream});
await fs.mkdir('docs/verification',{recursive:true});await fs.writeFile('docs/verification/scroll-trace.json',trace);
// Lab Event Timing sample; not a field INP claim.
await page.evaluate(()=>{window.__events=[];new PerformanceObserver(list=>{for(const e of list.getEntries())if(e.interactionId)window.__events.push({name:e.name,duration:e.duration});}).observe({type:'event',buffered:true,durationThreshold:16});});
await page.locator('#faq summary').first().scrollIntoViewIfNeeded();await page.locator('#faq summary').first().click();await page.waitForTimeout(400);
const interactions=await page.evaluate(()=>window.__events);
const sorted=[...frameData].sort((a,b)=>a-b);const summary={frames:sorted.length,median:sorted[Math.floor(sorted.length*.5)],p95:sorted[Math.floor(sorted.length*.95)],over33ms:sorted.filter(t=>t>33.4).length,interactions,note:'Desktop headless Chromium lab sample; refresh scheduling is host-dependent. Trace can be loaded in Chrome DevTools Performance. Event Timing is not production field INP.'};
await fs.writeFile('docs/verification/profile.json',JSON.stringify(summary,null,2));console.log(summary);await browser.close();
