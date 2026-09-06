import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
import sharp from 'sharp';
const base=process.argv[2]||'http://localhost:3210';
const results=[];
const routes=['/','/blog','/privacy','/terms','/services',...['klaviyo-email-marketing','email-design','email-deliverability','retention-strategy','email-flows'].map(s=>'/services/'+s)];
for(const route of routes){
 const imagePath=route==='/'?'/opengraph-image':route+'/opengraph-image';const res=await fetch(base+imagePath);const bytes=Buffer.from(await res.arrayBuffer());const size=await sharp(bytes).metadata();results.push({check:imagePath,pass:res.ok&&size.width===1200&&size.height===630});
}
for(const [route,target] of [['/home','/'],['/work','/#work'],['/our-work','/#work'],['/portfolio','/#work'],['/about','/#about'],['/contact','/#contact'],['/contact-us','/#contact'],['/free-email-audit','/#contact'],['/audit','/#contact'],['/services/unknown-service','/#services'],['/infernomedia/old','/']]){
 const res=await fetch(base+route,{redirect:'manual'});results.push({check:route,pass:res.status===308&&res.headers.get('location')===target,status:res.status,location:res.headers.get('location')});
}
const browser=await chromium.launch();const page=await browser.newPage({viewport:{width:1440,height:900}});await page.goto(base);await page.waitForTimeout(1000);
for(const width of [320,375,768,1024,1440,1920]){await page.setViewportSize({width,height:900});await page.goto(base);await page.waitForTimeout(650);await page.screenshot({path:`docs/screenshots/final-hero-${width}.png`});}
await page.setViewportSize({width:1440,height:900});await page.goto(base);await page.waitForTimeout(1200);
for(let i=0;i<3;i++){
 const scene=page.locator('.proof-scene').nth(i);await scene.evaluate(el=>window.scrollTo({top:scrollY+el.getBoundingClientRect().top+300,behavior:'instant'}));await page.waitForTimeout(1300);
 const digits=await scene.locator('.revenue-strip').evaluateAll(strips=>strips.map(el=>({digit:Number(el.dataset.digit),actual:-new DOMMatrix(getComputedStyle(el).transform).m42/(el.getBoundingClientRect().height/10)})));
 results.push({check:`revenue reels ${i}`,pass:digits.every(d=>Math.abs(d.digit-d.actual)<.05),digits});
 await scene.locator('.proof-panel').screenshot({path:`docs/screenshots/final-proof-${i}.png`});
 results.push({check:`dashboard ${i} loaded`,pass:await scene.locator('img').evaluate(img=>img.complete&&img.naturalWidth>0)});
}
await page.locator('#work').scrollIntoViewIfNeeded();await page.waitForTimeout(500);await page.locator('#work').screenshot({path:'docs/screenshots/final-work.png'});
await page.setViewportSize({width:320,height:812});await page.goto(base);const logos=page.getByRole('region',{name:'Client logos'});await logos.scrollIntoViewIfNeeded();await logos.evaluate(el=>el.scrollLeft=el.scrollWidth);results.push({check:'mobile logos can scroll',pass:await logos.evaluate(el=>el.scrollLeft>0)});
await page.emulateMedia({reducedMotion:'reduce'});await page.goto(base);await page.screenshot({path:'docs/screenshots/final-reduced-320.png'});
await browser.close();await fs.writeFile('docs/verification/details.json',JSON.stringify(results,null,2));console.log(results.filter(r=>!r.pass));console.log(`${results.length} details checked`);if(results.some(r=>!r.pass))process.exitCode=1;
