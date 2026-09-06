import {chromium} from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
const base=process.argv[2]||'http://localhost:3211';
const browser=await chromium.launch();
const routes=['/','/blog','/privacy','/terms','/missing-page'];
if(process.argv.includes('--services'))routes.push('/services',...['klaviyo-email-marketing','email-design','email-deliverability','retention-strategy','email-flows'].map(s=>'/services/'+s));
const failures=[],checks=[];
const check=(name,pass,detail)=>{checks.push({name,pass,detail});if(!pass)failures.push(name);};
for(const route of routes){
 const context=await browser.newContext();const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [320,375,768,1024,1440,1920]){
  await page.setViewportSize({width,height:900});await page.goto(base+route,{waitUntil:'load'});await page.waitForTimeout(300);
  check(`${route} ${width} no overflow`,await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 }
 check(`${route} single h1`,await page.locator('h1').count()===1);
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 check(`${route} axe`,axe.violations.length===0,axe.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))})));
 check(`${route} no runtime errors`,errors.length===0,errors);
 await context.close();console.log('checked',route);
}
for(const mode of ['no-js','reduced']){
 const context=await browser.newContext({javaScriptEnabled:mode!=='no-js',reducedMotion:mode==='reduced'?'reduce':'no-preference'});
 const page=await context.newPage();await page.goto(base);
 check(mode+' body copy visible',await page.getByText('What we believe',{exact:true}).isVisible());
 await page.locator('#faq summary').first().click();check(mode+' FAQ opens',await page.locator('#faq details').first().getAttribute('open')!==null);
 check(mode+' hero visible',await page.locator('h1').isVisible());await context.close();
}
const page=await browser.newPage({viewport:{width:375,height:812}});await page.goto(base);
check('mobile proof above fold',await page.locator('.hero-evidence').evaluate(el=>el.getBoundingClientRect().bottom<innerHeight));
await page.getByRole('button',{name:'Open menu'}).click();check('menu opens',await page.locator('#mobile-nav').isVisible());await page.keyboard.press('Escape');check('Escape closes menu',!(await page.locator('#mobile-nav').isVisible()));
await page.locator('#faq summary').first().focus();await page.keyboard.press('Enter');check('keyboard FAQ',await page.locator('#faq details').first().getAttribute('open')!==null);
await page.locator('#work').scrollIntoViewIfNeeded();await page.getByRole('button',{name:'Next emails'}).click();await page.waitForTimeout(600);check('gallery next advances',await page.locator('#work-rail').evaluate(el=>el.scrollLeft>0));
// Exercise UI success/error with intercepted responses; do not send real leads.
await page.route('**/api/lead',route=>route.fulfill({status:503,contentType:'application/json',body:JSON.stringify({error:'Our form is temporarily unavailable. Please email hello@infernoemails.com.'})}));
await page.locator('#name').fill('Test');await page.locator('#email').fill('test@example.test');await page.getByRole('button',{name:'Send my details'}).click();check('form error feedback',await page.getByRole('alert').isVisible());
await page.unroute('**/api/lead');await page.route('**/api/lead',route=>route.fulfill({status:200,contentType:'application/json',body:'{"ok":true}'}));await page.getByRole('button',{name:'Send my details'}).click();check('form confirmation',await page.getByRole('status').isVisible());
await browser.close();await fs.mkdir('docs/verification',{recursive:true});await fs.writeFile('docs/verification/checks.json',JSON.stringify(checks,null,2));console.log({checks:checks.length,failures});if(failures.length)process.exitCode=1;
