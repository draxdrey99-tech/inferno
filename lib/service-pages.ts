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

/**
 * Service-specific fit and mistakes. The home page keeps the generic
 * GOOD_FIT / BAD_FIT lists; each service page says who *this* service is
 * for, so the pages stop repeating one block of ten bullets. The mistakes
 * are general practitioner knowledge, not claims about any client.
 */
export const SERVICE_DETAIL:Record<string,{goodFit:string[];badFit:string[];mistakes:string[];approach:string[]}>={
 'klaviyo-email-marketing':{
  approach:['We start by reading the account the way a new owner would: which flows exist, which are switched off, how the list is segmented and what each send earned. That tells us where the revenue is leaking before we build anything.', 'Core flows come first because they keep earning while everything else is being approved. Campaigns run on a calendar, each with a reason to exist, and every one is tested against the last.', 'Reporting is monthly and tied to attributed revenue and repeat rate. Anything that does not earn gets changed or cut.'],
  goodFit:['Klaviyo is installed but only a welcome flow and the occasional newsletter go out','You want one team accountable for flows, campaigns and reporting','Email is under 20% of revenue and you suspect it should be more'],
  badFit:['You have no Klaviyo account and no plan to adopt it','You want a one-off template, not an ongoing programme','You are pre-revenue with no list to send to'],
  mistakes:['Sending the same campaign to the whole list instead of segmenting by engagement','Reporting on open rates, which Apple Mail Privacy Protection inflates','Leaving flows live for years without testing the first email or the delay between steps'],
 },
 'email-design':{
  approach:['We begin with your brand: type, colour, photography and tone. From that we build a small design system, so every email looks like it came from the same house without looking like a template.', 'Each email is designed for the inbox, not a browser. That means real text alongside imagery, layouts that hold up when images are blocked, and dark mode checked before anything sends.', 'Designs are built in Klaviyo as reusable blocks so your team can keep sending on brand after we hand over.'],
  goodFit:['Your emails look like a stock template rather than your brand','You have a strong brand and a product that photographs well','You need design capacity alongside an in-house or existing Klaviyo team'],
  badFit:['You want dozens of cheap template swaps a month','You cannot share brand assets, photography or guidelines','You need the design only, with no say over what gets sent or when'],
  mistakes:['Designing in a single image, so nothing renders when images are blocked','Dark mode left untested, turning logos and text unreadable','A dozen competing calls to action where one clear button would earn more clicks'],
 },
 'email-deliverability':{
  approach:['We check authentication first: SPF, DKIM and DMARC on the domain you actually send from. Most delivery problems that are not list-related start here.', 'Next we look at list health: how much of the list has not engaged in six months, how bounces and complaints are trending and whether inactive contacts are dragging reputation down.', 'Fixes are staged. We clean and segment, smooth out sending volume, and warm up carefully, then monitor placement so the improvement shows up in revenue, not just in a report.'],
  goodFit:['Open rates have drifted down and nobody can say why','Mail is landing in spam or the Promotions tab at Gmail or Outlook','You have never checked SPF, DKIM and DMARC, or are unsure they are correct'],
  badFit:['You bought or scraped your list and plan to keep mailing it','You are not willing to stop sending to long-inactive contacts','You expect a fix without any change to how you send'],
  mistakes:['Mailing the full list at full volume after a long gap, which spikes complaints','Publishing a DMARC record at p=none and never moving beyond it','Ignoring the share of the list that has not opened in six months'],
 },
 'retention-strategy':{
  approach:['We map the customer lifecycle from first click to loyal repeat buyer and mark where people drop off. That map decides which flows and campaigns matter most.', 'Then we work from your real data: repurchase intervals by product, the gap between first and second orders and which customers are worth treating differently.', 'The plan is built into Klaviyo as flows and segments, and measured on repeat purchase rate and revenue per recipient so it improves every quarter.'],
  goodFit:['Most of your revenue comes from first-time buyers','You have a repeatable product or a natural reorder window','You want a lifecycle plan, not just more sends'],
  badFit:['Your product is bought once, ever, with no add-ons or referrals','You have under a few hundred past customers to learn from','You want only acquisition and have no interest in repeat revenue'],
  mistakes:['Ending the conversation at the shipping confirmation','Sending replenishment reminders on a guess rather than your real repurchase interval','Treating a first-time buyer and a ten-time buyer to the same discount'],
 },
 'email-flows':{
  approach:['We audit the flows you have and list the ones you do not. Welcome, cart recovery and post-purchase usually come first, but the order depends on your traffic and products.', 'Each flow is built with timing, exclusions and a next useful message, so people are not emailed after they buy or put through overlapping sequences.', 'Once live, we test subject lines, delays and order of messages, and report flow-attributed revenue so the best performers can be extended.'],
  goodFit:['Flow coverage has gaps: no browse abandonment, no winback, a thin post-purchase','Your existing flows were built once and never revisited','You want revenue that keeps arriving between campaigns'],
  badFit:['You send under a few hundred emails a month, so flows have nobody to trigger on','You want a flow built but nobody to approve copy or offers','You are not able to give us access to your store data'],
  mistakes:['A cart-recovery flow that keeps emailing after the customer has purchased','Welcome flows that open with a discount before the brand has said anything','Flows with no exit conditions, so the same person receives overlapping sequences'],
 },
};

/** Shared across all five service pages: how an engagement actually starts. */
export const FIRST_30_DAYS=[
 {when:'Week 1',what:'We are in your account. Audit, authentication check, and a list of what to fix first, in order.'},
 {when:'Weeks 2 to 3',what:'Core flows go live and the first campaigns send, designed in your brand and approved by you.'},
 {when:'Week 4',what:'First monthly report against attributed revenue, and the test plan for the month ahead.'},
] as const;

export const NEEDED_FROM_YOU=[
 'Read-only access to Klaviyo and your store platform, or screenshots if you prefer',
 'Brand assets: logo, fonts, colours and product photography',
 'One person who can approve copy and offers within a couple of working days',
] as const;
