import {chromium} from '@playwright/test';
const base=process.argv[2]||'http://localhost:3210';
const browser=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
const page=await browser.newPage({viewport:{width:1440,height:900}});
await page.goto(base,{waitUntil:'load'});await page.waitForTimeout(5000);
const info=await page.evaluate(()=>{const c=document.querySelector('canvas.page-embers');const gl=c.getContext('webgl2')||c.getContext('webgl');if(!gl)return 'no gl';const px=new Uint8Array(c.width*c.height*4);gl.readPixels(0,0,c.width,c.height,gl.RGBA,gl.UNSIGNED_BYTE,px);let lit=0,max=0;for(let i=3;i<px.length;i+=4){if(px[i]>0){lit++;if(px[i]>max)max=px[i];}}return {lit,max,total:c.width*c.height,version:gl.getParameter(gl.VERSION)};});
console.log(JSON.stringify(info));
await page.screenshot({path:'docs/screenshots/embers-hero-zoom.png',clip:{x:700,y:60,width:740,height:500}});
await browser.close();
