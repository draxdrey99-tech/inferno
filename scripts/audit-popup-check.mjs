import {chromium} from '@playwright/test';import AxeBuilder from '@axe-core/playwright';import fs from 'node:fs/promises';
const browser=await chromium.launch();const base='http://localhost:3210';const checks=[];
for(const width of [320,375,1440]){
 const context=await browser.newContext({viewport:{width,height:850},reducedMotion:'reduce'});const page=await context.newPage();await page.goto(base);const trigger=page.getByRole('button',{name:'What’s in the free audit?'});await trigger.click();const dialog=page.getByRole('dialog');await dialog.waitFor();
 checks.push({width,check:'manual popup opens',pass:await dialog.isVisible()});checks.push({width,check:'scroll locked',pass:await page.evaluate(()=>document.documentElement.style.overflow==='hidden')});
 const box=await dialog.boundingBox();checks.push({width,check:'popup fits viewport',pass:box.x>=0&&box.x+box.width<=width&&box.y>=0&&box.y+box.height<=850});
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();checks.push({width,check:'popup axe',pass:axe.violations.length===0,violations:axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))});
 await page.screenshot({path:`docs/screenshots/audit-popup-${width}.png`});
 for(let i=0;i<7;i++)await page.keyboard.press('Tab');checks.push({width,check:'focus stays in dialog',pass:await dialog.evaluate(el=>el.contains(document.activeElement))});
 await page.keyboard.press('Escape');await page.waitForTimeout(100);checks.push({width,check:'Escape dismisses and restores focus/scroll',pass:!await dialog.isVisible()&&await trigger.evaluate(el=>el===document.activeElement)&&await page.evaluate(()=>document.documentElement.style.overflow!=='hidden')});
 await trigger.click();await page.getByRole('button',{name:'Keep browsing',exact:true}).click();checks.push({width,check:'neutral dismissal works',pass:!await dialog.isVisible()});
 await trigger.click();await page.mouse.click(1,1);checks.push({width,check:'backdrop dismissal works',pass:!await dialog.isVisible()});await context.close();
}
for(const width of [375,1440]){
 const context=await browser.newContext({viewport:{width,height:850},reducedMotion:'reduce'});const page=await context.newPage();await page.clock.install();await page.goto(base);await page.clock.runFor(500);await page.evaluate(()=>window.scrollTo({top:2000,behavior:'instant'}));
 await page.locator('html').dispatchEvent('mouseout',{clientY:0,relatedTarget:null});checks.push({width,check:'no immediate exit popup',pass:!await page.getByRole('dialog').isVisible()});
 await page.clock.fastForward(21000);await page.locator('html').dispatchEvent('mouseout',{clientY:0,relatedTarget:null});
 checks.push({width,check:width<768?'no automatic mobile popup':'engaged desktop exit popup',pass:(await page.getByRole('dialog').isVisible())===(width>=1024)});
 if(width>=1024){await page.keyboard.press('Escape');await page.locator('html').dispatchEvent('mouseout',{clientY:0,relatedTarget:null});checks.push({check:'once per session',pass:!await page.getByRole('dialog').isVisible()});await page.reload();await page.clock.runFor(500);await page.evaluate(()=>window.scrollTo({top:2000,behavior:'instant'}));await page.clock.fastForward(21000);await page.locator('html').dispatchEvent('mouseout',{clientY:0,relatedTarget:null});checks.push({check:'suppression survives navigation',pass:!await page.getByRole('dialog').isVisible()});}
 await context.close();
}
await browser.close();await fs.writeFile('docs/verification/audit-popup.json',JSON.stringify(checks,null,2));console.log({checks:checks.length,failures:checks.filter(c=>!c.pass)});if(checks.some(c=>!c.pass))process.exitCode=1;
