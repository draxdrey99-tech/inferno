import fs from 'node:fs';
let page=fs.readFileSync('app/page.tsx','utf8');
page=page.replace("import Image from 'next/image';",'').replace("import Marquee from '@/components/Marquee';", "import Hero from '@/components/Hero';\nimport ProofScenes from '@/components/ProofScenes';\nimport GalleryControls from '@/components/GalleryControls';");
page=page.replace(/const HERO_STATS = \[[\s\S]*?\];/,'');
page=page.replace('  const [lead, ...rest] = PROOF;','');
const start=page.indexOf('      {/* ---------------------------------------------------------- HERO');
const end=page.indexOf('      {/* --------------------------------------------------- SERVICES');
page=page.slice(0,start)+'      <Hero />\n      <ProofScenes />\n\n'+page.slice(end);
page=page.replace('className="mt-14 grid gap-6 lg:grid-cols-2"','className="service-rows mt-14"');
page=page.replace('<h3 className="display-md mt-6">{s.title}</h3>','<h3 className="display-md mt-6">{s.title}</h3>');
page=page.replace('className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"','id="work-rail" className="work-rail mt-8" role="region" aria-label="Email design portfolio" tabIndex={0}');
page=page.replace('          <div id="work-rail"','          <GalleryControls />\n          <div id="work-rail"');
page=page.replace('<h3 className="display-md">What we believe</h3>','<p className="lede mb-8">Our aim: Turn your email list into your most profitable channel.</p>\n              <h3 className="display-md">What we believe</h3>');
// Remove visual sequence labels from beliefs, preserving the actual prose.
page=page.replace(/\s*<span className="grid h-8[\s\S]*?\{b.index\}[\s\S]*?<\/span>/,'');
fs.writeFileSync('app/page.tsx',page);
