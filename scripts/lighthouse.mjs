import lighthouse from 'lighthouse';
import { launch } from 'chrome-launcher';
import { chromium } from '@playwright/test';
import fs from 'node:fs/promises';
const phase=process.argv[2]||'before';
const base=process.argv[3]||'http://localhost:3210';
await fs.mkdir('docs/lighthouse',{recursive:true});
const scores=[];
for(const desktop of [false,true]){
 const chrome=await launch({chromePath:chromium.executablePath(),chromeFlags:['--headless','--no-sandbox','--disable-dev-shm-usage']});
 try{
  const result=await lighthouse(base,{port:chrome.port,output:['json','html'],logLevel:'error',onlyCategories:['performance','accessibility','best-practices','seo'],...(desktop?{formFactor:'desktop',screenEmulation:{mobile:false,width:1350,height:940,deviceScaleFactor:1,disabled:false},throttling:{rttMs:40,throughputKbps:10240,cpuSlowdownMultiplier:1}}:{})});
  const mode=desktop?'desktop':'mobile';
  await fs.writeFile(`docs/lighthouse/${phase}-${mode}.json`,result.report[0]);
  await fs.writeFile(`docs/lighthouse/${phase}-${mode}.html`,result.report[1]);
  const row={phase,mode,scores:Object.fromEntries(Object.entries(result.lhr.categories).map(([k,v])=>[k,Math.round(v.score*100)])),lcp:result.lhr.audits['largest-contentful-paint'].numericValue,cls:result.lhr.audits['cumulative-layout-shift'].numericValue,tbt:result.lhr.audits['total-blocking-time'].numericValue};scores.push(row);console.log(row);
 }finally{try{await chrome.kill();}catch(error){console.warn('Chrome temp cleanup:',error.code);}}
}
await fs.writeFile(`docs/lighthouse/${phase}-summary.json`,JSON.stringify(scores,null,2));
