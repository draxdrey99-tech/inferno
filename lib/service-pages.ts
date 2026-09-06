import {SERVICES, type Service} from './site';

export const FLOW_SERVICE:Service={
 slug:'email-flows',index:'',title:'Email flows & automation',navTitle:'Email flows & automation',keyword:'ecommerce email automation agency',
 summary:'Turn sign-ups, abandoned carts and repeat purchases into a connected Klaviyo lifecycle.',
 metaTitle:'Klaviyo Email Flows & Automation',
 metaDescription:'Welcome, cart recovery, post-purchase and winback flows for ecommerce brands. Custom Klaviyo automation, tested and measured against revenue.',
 intro:'Every customer action is a chance to continue the conversation. We map the moments between signing up and buying again, then build Klaviyo flows around them. Timing, exclusions and the next useful message matter as much as the design.',
 deliverables:['Welcome sequences that introduce the brand and first-order offer','Browse and cart recovery with purchase exclusions','Post-purchase education, replenishment and cross-sell sequences','Winback and re-engagement flows for lapsed customers','Trigger, filter and mobile rendering checks before launch','Ongoing tests and reporting against attributed revenue'],
 outcome:'A connected set of useful messages that keeps working between campaigns.',
 faqs:[{q:'Which flows should we build first?',a:'The audit identifies the gaps in your account. Welcome, cart recovery and post-purchase are usually the starting points; the order depends on your traffic, products and existing coverage.'},{q:'Can you improve flows we already have?',a:'Yes. We review triggers, exclusions, timing, content and performance before deciding what to keep or rebuild. Useful existing work stays.'},{q:'How do you measure automation performance?',a:'We review flow-attributed revenue in the context of the reporting window, audience and store performance. Attribution is a reporting measure, not a promise of incremental revenue.'}],
};
export const SERVICE_PAGES=[...SERVICES,FLOW_SERVICE];
export const getServicePage=(slug:string)=>SERVICE_PAGES.find(s=>s.slug===slug);
