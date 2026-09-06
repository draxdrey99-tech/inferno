import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const phase = process.argv[2] || 'before';
const base = process.argv[3] || 'http://localhost:3210';
const browser = await chromium.launch({headless:true});
const widths = [320,375,768,1024,1440,1920];
const routes = ['/', '/blog', '/privacy', '/terms', '/admin', '/missing-page'];
if (phase === 'after') routes.push('/services', ...['klaviyo-email-marketing','email-design','email-deliverability','retention-strategy','email-flows'].map(s=>'/services/'+s));
const sitemap = await fetch(base+'/sitemap.xml').then(r=>r.text());
for(const match of sitemap.matchAll(/<loc>[^<]+(\/blog\/[^<]+)<\/loc>/g)) routes.push(match[1]);
await fs.mkdir(`docs/screenshots/${phase}`,{recursive:true});
await fs.mkdir(`docs/${phase}`,{recursive:true});
const results=[];
for(const route of routes){
 const page=await browser.newPage();
 for(const width of widths){
  await page.setViewportSize({width,height:width<768?812:1000});
  const response=await page.goto(base+route,{waitUntil:'load',timeout:60000});
  await page.evaluate(async()=>{await document.fonts.ready; for(let y=0;y<document.body.scrollHeight;y+=650){window.scrollTo({top:y,behavior:'instant'}); await new Promise(r=>setTimeout(r,70));} window.scrollTo({top:0,behavior:'instant'});});
  await page.evaluate(async()=>{const images=Array.from(document.images).filter(img=>img.getBoundingClientRect().left<innerWidth);await Promise.race([Promise.all(images.map(img=>img.complete?Promise.resolve():new Promise(resolve=>{img.addEventListener('load',resolve,{once:true});img.addEventListener('error',resolve,{once:true});}))),new Promise(r=>setTimeout(r,5000))]);});
  await page.waitForTimeout(800);
  const slug=route==='/'?'home':route.slice(1).replaceAll('/','-');
  await page.screenshot({path:`docs/screenshots/${phase}/${slug}-${width}.png`,fullPage:true});
  if(width===1440){await fs.writeFile(`docs/${phase}/${slug}.txt`,await page.locator('body').innerText());await fs.writeFile(`docs/${phase}/${slug}.html`,await response.text());}
  results.push({route,width,status:response.status(),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
 }
 await page.close(); console.log('captured',phase,route);
}
await fs.writeFile(`docs/${phase}/screenshots.json`,JSON.stringify(results,null,2));
await browser.close();
