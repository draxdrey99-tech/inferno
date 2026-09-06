import fs from 'node:fs/promises';
import {chromium} from '@playwright/test';
const base=process.argv[2]||'http://localhost:3213';
const baseline=JSON.parse(await fs.readFile('docs/baseline/content.json','utf8'));
const browser=await chromium.launch();const page=await browser.newPage({javaScriptEnabled:false});
const routes=['/','/blog','/privacy','/terms','/services',...baseline.SERVICES.map(s=>'/services/'+s.slug),'/services/email-flows'];
let html='',text='';
for(const route of routes){const res=await page.goto(base+route);html+=await res.text();text+=await page.locator('body').textContent();}
const normalize=s=>String(s).normalize('NFKC').replace(/\s+/g,' ').trim();text=normalize(text);
const checks=[];
const check=(label,expected,kind='copy')=>{checks.push({label,kind,pass:kind==='asset'?html.includes(expected.replaceAll('&','&amp;'))||html.includes(encodeURIComponent(expected)):text.includes(normalize(expected)),expected});};
for(const key of ['HOME_FAQS','AUDIT_FAQS','PROCESS','BELIEFS','AUDIT_CHECKS','TESTIMONIALS'])baseline[key].forEach((entry,i)=>{for(const [field,value] of Object.entries(entry))if(field!=='index')check(`${key}.${i}.${field}`,value);});
for(const key of ['GOOD_FIT','BAD_FIT'])baseline[key].forEach((value,i)=>check(`${key}.${i}`,value));
baseline.SERVICES.forEach(s=>{for(const field of ['title','summary','intro','outcome'])check(`${s.slug}.${field}`,s[field]);s.deliverables.forEach((d,i)=>check(`${s.slug}.deliverables.${i}`,d));s.faqs.forEach((f,i)=>{check(`${s.slug}.faq.${i}.q`,f.q);check(`${s.slug}.faq.${i}.a`,f.a);});});
baseline.WORK.forEach(w=>{for(const field of ['client','title','type','note'])check(`${w.slug}.${field}`,w[field]);check(w.slug+'.image',w.image,'asset');});
baseline.PROOF.forEach((p,i)=>{for(const field of ['headline','metric','window','note'])check(`proof.${i}.${field}`,p[field]);check(`proof.${i}.image`,p.image,'asset');});
baseline.CLIENTS.forEach(c=>check(c.name,c.logo,'asset'));
for(const asset of JSON.parse(await fs.readFile('docs/baseline/assets.json','utf8'))){const stat=await fs.stat('public/images/'+asset.file).catch(()=>null);checks.push({label:asset.file,kind:'original asset retained',pass:stat?.size===asset.bytes});}
await browser.close();await fs.mkdir('docs/verification',{recursive:true});await fs.writeFile('docs/verification/content.json',JSON.stringify(checks,null,2));const failures=checks.filter(c=>!c.pass);console.log({checks:checks.length,failures});if(failures.length)process.exitCode=1;
