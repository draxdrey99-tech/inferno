import sharp from 'sharp';
for(const [source,slug] of [['bondi','bondi-coffee-campaign'],['kuchenkompane','kuchenkompane-mothers-day'],['girafon','girafon-bleu-welcome']]){
 await sharp(`public/images/work-${source}.png`).resize({width:480}).extract({left:0,top:0,width:480,height:620}).webp({quality:82}).toFile(`public/images/hero-${slug}.webp`);
}
