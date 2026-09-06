import fs from 'node:fs';
let css=fs.readFileSync('app/globals.css','utf8');
const prose=css.slice(css.indexOf('  .prose-inferno {'),css.indexOf('/* Every animation'));
const admin=css.slice(css.indexOf('.tiptap p'));
const foundation=`@import 'tailwindcss';

/* Proof desk system. docs/DESIGN-PLAN.md supersedes the old theme locks. */
@theme {
 --color-ink:#171916; --color-ink-raised:#222820; --color-ink-soft:#2b3128;
 --color-flame:#d6f276; --color-ember:#f66b45;
 --color-bone:#f1eedf; --color-mute:#b7bcab;
 --font-display:var(--font-archivo),'Archivo',sans-serif;
 --font-sans:var(--font-geist),'Geist',sans-serif;
}
@layer base {
 :root {color-scheme:dark;--rule:rgba(241,238,223,.16);--rule-strong:rgba(241,238,223,.3);--ease:cubic-bezier(.16,1,.3,1);--ease-travel:cubic-bezier(.65,0,.35,1);}
 * {border-color:var(--rule);}
 html {scroll-behavior:smooth;-webkit-text-size-adjust:100%;scroll-padding-top:6rem;}
 body {background:var(--color-ink);color:var(--color-bone);font-family:var(--font-sans);-webkit-font-smoothing:antialiased;}
 ::selection {background:var(--color-flame);color:var(--color-ink);}
 h1,h2,h3,h4 {font-family:var(--font-display);font-weight:700;letter-spacing:-.04em;line-height:1.08;text-wrap:balance;}
 p {text-wrap:pretty;}
 :focus-visible {outline:3px solid var(--color-flame);outline-offset:5px;}
 .skip-link {position:absolute;left:-9999px;top:0;z-index:100;}
 .skip-link:focus {left:1rem;top:1rem;background:var(--color-flame);color:var(--color-ink);padding:.8rem 1rem;}
 section {scroll-margin-top:6rem;}
}
@layer components {
 .shell {width:100%;max-width:90rem;margin-inline:auto;padding-inline:1.25rem;}
 @media(min-width:768px){.shell{padding-inline:3rem;}}
 .display-xl {font-size:clamp(2.5rem,5.8vw,5.25rem);font-weight:800;line-height:.98;letter-spacing:-.065em;}
 .display-lg {font-size:clamp(2.125rem,4.5vw,4rem);line-height:1.04;letter-spacing:-.05em;}
 .display-md {font-size:clamp(1.5rem,2.6vw,2rem);line-height:1.1;letter-spacing:-.035em;}
 .accent {color:inherit;font-style:normal;}
 .lede {font-size:clamp(1rem,1.2vw,1.125rem);line-height:1.7;color:var(--color-mute);max-width:58ch;}
 .eyebrow {display:block;font-size:.8125rem;font-weight:500;letter-spacing:0;text-transform:none;color:var(--color-mute);}
 .btn {display:inline-flex;align-items:center;justify-content:center;gap:.65rem;font-size:.875rem;font-weight:650;padding:1rem 1.5rem;border-radius:4px;white-space:nowrap;min-height:44px;transition:transform .35s var(--ease);}
 .btn:active {transform:scale(.98);}
 .btn-flame {background:var(--color-flame);color:var(--color-ink);}
 .btn-flame:hover {background:var(--color-bone);}
 .btn-ghost {color:var(--color-bone);border:1px solid var(--rule-strong);}
 .btn-ghost:hover {background:var(--color-ink-soft);}
 .btn .arr {display:none;}
 .card {background:transparent;border:0;border-top:1px solid var(--rule-strong);border-radius:0;}
 .field {width:100%;border-radius:2px;border:1px solid var(--rule-strong);background:var(--color-ink);color:var(--color-bone);padding:.9rem 1rem;font-size:1rem;}
 .field::placeholder {color:var(--color-mute);}
 .field:focus {outline:2px solid var(--color-flame);outline-offset:2px;}
 .reveal {opacity:1;transform:none;}
 .marquee {display:flex;width:max-content;animation:marquee 38s linear infinite;}
 .marquee-wrap:hover .marquee,.marquee-wrap:focus-within .marquee {animation-play-state:paused;}
 @keyframes marquee {from{transform:translateX(0)}to{transform:translateX(-50%)}}
 .email-card {position:relative;overflow:hidden;background:var(--color-ink-soft);border:1px solid var(--rule);border-radius:2px;}
 .email-card img {width:100%;height:auto;display:block;transition:transform 6s var(--ease-travel);}
 .email-card .viewport {height:26rem;overflow:hidden;}
 .email-card:hover img,.email-card:focus-within img {transform:translateY(calc(-100% + 26rem));}
 .email-card figcaption {display:block;}
 .email-card figcaption>span {display:inline-block;margin-top:.75rem;}
 .faq-item summary {cursor:pointer;display:flex;align-items:center;justify-content:space-between;gap:1rem;padding:1.5rem 0;list-style:none;}
 .faq-item summary::-webkit-details-marker {display:none;}
 .faq-item summary::after {content:'+';font-size:1.5rem;color:var(--color-flame);}
 .faq-item[open] summary::after {content:'−';}
 .faq-item h3 {font-size:1.125rem;line-height:1.4;}
 .faq-item p {max-width:65ch;padding:0 0 1.5rem;color:var(--color-mute);line-height:1.75;}
`;
fs.writeFileSync('app/globals.css',foundation+prose+`\n@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*::before,*::after{animation:none!important;transition:none!important}.email-card:hover img,.email-card:focus-within img{transform:none}}\n`+admin);
let layout=fs.readFileSync('app/layout.tsx','utf8').replace("style: ['normal', 'italic']","style: ['normal']").replace("themeColor: '#0b0b0c'","themeColor: '#171916'");
fs.writeFileSync('app/layout.tsx',layout);
