import {SERVICES, type Service} from './site';

export const FLOW_SERVICE:Service={
 slug:'email-flows',index:'',title:'Email flows & automation',navTitle:'Email flows & automation',keyword:'ecommerce email automation agency',
 summary:'Turn sign-ups, abandoned carts and repeat purchases into a connected Klaviyo lifecycle.',
 metaTitle:'Klaviyo Email Flows & Automation',
 metaDescription:'Welcome, cart recovery, post-purchase and winback flows for ecommerce brands. Custom Klaviyo automation, tested and measured against revenue.',
 answer:'Email flows are automated sequences triggered by what a customer does: signing up, browsing, abandoning a cart, buying. Inferno Emails builds and tunes them in Klaviyo for ecommerce brands, with timing, exclusions and rendering tested before anything goes live.',
 intro:'Every customer action is a chance to continue the conversation. We map the moments between signing up and buying again, then build Klaviyo flows around them. Timing, exclusions and the next useful message matter as much as the design.',
 deliverables:['Welcome sequences that introduce the brand and first-order offer','Browse and cart recovery with purchase exclusions','Post-purchase education, replenishment and cross-sell sequences','Winback and re-engagement flows for lapsed customers','Trigger, filter and mobile rendering checks before launch','Ongoing tests and reporting against attributed revenue'],
 outcome:'A connected set of useful messages that keeps working between campaigns.',
 faqs:[{q:'Which flows should we build first?',a:'The audit identifies the gaps in your account. Welcome, cart recovery and post-purchase are usually the starting points; the order depends on your traffic, products and existing coverage.'},{q:'Can you improve flows we already have?',a:'Yes. We review triggers, exclusions, timing, content and performance before deciding what to keep or rebuild. Useful existing work stays.'},{q:'How do you measure automation performance?',a:'We review flow-attributed revenue in the context of the reporting window, audience and store performance. Attribution is a reporting measure, not a promise of incremental revenue.'},{q:'How much does Klaviyo flow build cost?',a:'It depends on how many flows need building versus rebuilding, so we quote after the free audit instead of a flat rate. The audit itself is free and comes with no obligation to hire us.'},{q:'How long until flows are live?',a:'The core flow set is typically live within two to three weeks, depending on how quickly brand assets and approvals come back. Campaigns can start in week one because they do not need to wait on the full build.'}],
};
export const SERVICE_PAGES=[...SERVICES,FLOW_SERVICE];
export const getServicePage=(slug:string)=>SERVICE_PAGES.find(s=>s.slug===slug);

/**
 * Which service page a piece of creative belongs to. Flows are automation
 * work; everything else is campaign design. Used for the "part of" link on
 * the work page so every portfolio item points at a commercial page.
 */
export const serviceForWork=(type:string)=>/flow/i.test(type)?getServicePage('email-flows')!:getServicePage('email-design')!;

/**
 * Blog post to service page linking. Matches tags and the title against
 * each service's vocabulary so every post links back to at least one
 * commercial page without the author having to remember to do it.
 */
const SERVICE_TERMS:[RegExp,string][]=[
 [/deliverab|spam|dmarc|dkim|spf|inbox placement|sender reputation|bounce/i,'email-deliverability'],
 [/design|template|dark mode|layout|creative/i,'email-design'],
 [/flow|automation|abandon|welcome|post-purchase|winback|browse/i,'email-flows'],
 [/retention|repeat|ltv|lifetime|lifecycle|loyal|replenish/i,'retention-strategy'],
 [/klaviyo|campaign|segment|newsletter|a\/b|subject line/i,'klaviyo-email-marketing'],
];
export function relatedServicesFor(text:string,limit=2):Service[]{
 const hits=SERVICE_TERMS.filter(([re])=>re.test(text)).map(([,slug])=>getServicePage(slug)!);
 const out=hits.length?hits:[getServicePage('klaviyo-email-marketing')!];
 return out.slice(0,limit);
}

/**
 * The two other service pages most worth reading next from each service
 * page, for the "Related reading" block. Picked by overlap in the work
 * itself (e.g. flows and retention both live inside Klaviyo automation),
 * not by any metric; every page keeps a link to the rest via the footer.
 */
const RELATED_BY_SLUG:Record<string,[string,string]>={
 'klaviyo-email-marketing':['email-flows','retention-strategy'],
 'email-design':['klaviyo-email-marketing','email-flows'],
 'email-deliverability':['klaviyo-email-marketing','email-flows'],
 'retention-strategy':['email-flows','klaviyo-email-marketing'],
 'email-flows':['klaviyo-email-marketing','retention-strategy'],
};
export function relatedReadingFor(slug:string):Service[]{
 const pair=RELATED_BY_SLUG[slug]||['klaviyo-email-marketing','email-flows'];
 return pair.map(s=>getServicePage(s)!).filter(s=>s.slug!==slug);
}

/**
 * One line each for the /services comparison table: what the service is
 * best for, what the engagement starts with, and what it is measured by.
 * Every phrase paraphrases copy already approved on that service's own
 * page (summary, intro, deliverables, outcome, faqs): nothing new is
 * claimed here, it is just gathered into a scannable row.
 */
export const SERVICE_COMPARISON:Record<string,{bestFor:string;startsWith:string;measuredBy:string}>={
 'klaviyo-email-marketing':{
  bestFor:'Stores with Klaviyo installed and visibly under-used',
  startsWith:'A full account audit and clean-up',
  measuredBy:'Attributed revenue, not opens',
 },
 'email-design':{
  bestFor:'Brands whose emails still look like a template',
  startsWith:'A brand-matched design system',
  measuredBy:'Emails people screenshot and forward',
 },
 'email-deliverability':{
  bestFor:'Accounts where opens have quietly declined',
  startsWith:'SPF, DKIM and DMARC checked and verified',
  measuredBy:'Inbox placement and complaint rate',
 },
 'retention-strategy':{
  bestFor:'Stores earning most of their revenue from first-time buyers',
  startsWith:'A lifecycle map from first click to repeat buyer',
  measuredBy:'Repeat purchase rate and revenue per recipient',
 },
 'email-flows':{
  bestFor:'Accounts with gaps in flow coverage',
  startsWith:'Welcome, cart recovery and post-purchase flows',
  measuredBy:'Flow-attributed revenue',
 },
};
