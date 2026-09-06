import {chromium} from '@playwright/test';
import fs from 'node:fs/promises';
const browser=await chromium.launch();const base='http://localhost:3210';const checks=[];
for(const width of [320,375,768]){
 const page=await browser.newPage({viewport:{width,height:850},isMobile:true,hasTouch:true});await page.goto(base);await page.waitForTimeout(500);
 await page.screenshot({path:`docs/screenshots/crimson-hero-${width}.png`});
 for(let i=0;i<3;i++){
  if(i>0){await page.goto(base);await page.waitForTimeout(300);}
  const reels=page.locator('.revenue-reels').nth(i);await reels.evaluate(el=>window.scrollTo({top:scrollY+el.getBoundingClientRect().top-250,behavior:'instant'}));await page.waitForTimeout(200);
  const running=await reels.locator('.revenue-strip').evaluateAll(es=>es.some(e=>e.getAnimations().some(a=>a.playState==='running')));checks.push({width,scene:i,check:'animation starts on entry',pass:running});
  await page.waitForTimeout(1500);checks.push({width,scene:i,check:'exact final digits',pass:await reels.locator('.revenue-strip').evaluateAll(es=>es.every(e=>Math.abs(-new DOMMatrix(getComputedStyle(e).transform).m42/(e.getBoundingClientRect().height/10)-Number(e.dataset.digit))<.01&&e.getAnimations().length===0))});
  await page.screenshot({path:`docs/screenshots/crimson-proof-${width}-${i}.png`});
 }
 await page.locator('.revenue-reels').nth(2).evaluate(el=>window.scrollTo({top:scrollY+el.getBoundingClientRect().top-250,behavior:'instant'}));await page.waitForTimeout(100);checks.push({width,check:'does not replay',pass:await page.locator('.revenue-strip').evaluateAll(es=>es.every(e=>e.getAnimations().length===0))});await page.close();
}
for(const mode of ['reduced','no-js']){const page=await browser.newPage({viewport:{width:375,height:850},isMobile:true,hasTouch:true,reducedMotion:mode==='reduced'?'reduce':'no-preference',javaScriptEnabled:mode!=='no-js'});await page.goto(base);await page.locator('.revenue-reels').first().scrollIntoViewIfNeeded();checks.push({mode,check:'complete static figures',pass:await page.locator('.revenue-strip').evaluateAll(es=>es.every(e=>Math.abs(-new DOMMatrix(getComputedStyle(e).transform).m42/(e.getBoundingClientRect().height/10)-Number(e.dataset.digit))<.01&&e.getAnimations().length===0))});await page.close();}
const page=await browser.newPage({viewport:{width:375,height:850},isMobile:true,hasTouch:true});await page.goto(base);await page.locator('.revenue-reels').first().scrollIntoViewIfNeeded();await page.waitForTimeout(100);await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(100);checks.push({check:'motion preference change cancels active reels',pass:await page.locator('.revenue-strip').evaluateAll(es=>es.every(e=>e.getAnimations().length===0))});
await browser.close();await fs.writeFile('docs/verification/mobile-revenue.json',JSON.stringify(checks,null,2));console.log({checks:checks.length,failures:checks.filter(c=>!c.pass)});if(checks.some(c=>!c.pass))process.exitCode=1;
