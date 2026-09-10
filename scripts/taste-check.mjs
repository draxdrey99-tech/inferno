/** Design checks for the approved proof-desk plan (supersedes old theme locks). */
import {chromium} from '@playwright/test';
const browser=await chromium.launch();
const page=await browser.newPage();
const base=process.argv[2]||'http://localhost:3000';
await page.goto(base);
const checks=await page.evaluate(()=>({
  'one h1':document.querySelectorAll('h1').length===1,
  'server-visible content':Array.from(document.querySelectorAll('.reveal')).every(el=>getComputedStyle(el).opacity==='1'),
  'sentence-case labels':Array.from(document.querySelectorAll('.eyebrow')).every(el=>getComputedStyle(el).textTransform==='none'),
  'three complete receipts':document.querySelectorAll('.proof-panel').length===3,
  'nine email designs':document.querySelectorAll('.work-rail .email-card').length===9,
  'native FAQ answers':document.querySelectorAll('#faq details').length===10,
  'adjacent audit risk reversal':!!document.querySelector('.hero-risk'),
  'pauseable logos':!!document.querySelector('.marquee-pause input'),
  'canvases are decorative only':Array.from(document.querySelectorAll('canvas')).every(el=>el.closest('[aria-hidden="true"]')),
  'subordinate work CTA':!!document.querySelector('.hero-secondary'),
}))
for(const [name,pass] of Object.entries(checks))console.log(pass?'PASS':'FAIL',name);
await browser.close();if(Object.values(checks).some(pass=>!pass))process.exitCode=1;
