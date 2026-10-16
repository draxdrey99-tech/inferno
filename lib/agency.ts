/**
 * Commercial pages for people searching for an email marketing agency:
 * the head-term variations ("ecommerce email marketing agency", "best ...",
 * "Klaviyo agency", "Shopify ...") plus the hub copy. General practice only:
 * no prices, no statistics and no client results (see scripts/quality-gate.mjs).
 * Each page answers the question the searcher actually has, including when
 * we are not the right fit.
 */
export type AgencyPage = {
  slug: string;
  /** The H1, without a trailing full stop. */
  h1: string;
  /** 59 characters or fewer, so Google does not cut it with an ellipsis. */
  metaTitle: string;
  /** 155 characters or fewer. */
  metaDescription: string;
  /** A direct answer, quotable as it stands. */
  answer: string;
  sections: { heading: string; body: string[] }[];
  /** Questions to put to any agency on this topic. */
  checklist: string[];
  /** Who it suits. */
  suits: string[];
  /** Who should look elsewhere. */
  notFor: string[];
  faqs: { q: string; a: string }[];
  /** Glossary term slugs. */
  terms: string[];
  /** Service page slug. */
  service: string;
};

export const AGENCY_PAGES: AgencyPage[] = [
  {
    slug: 'ecommerce-email-marketing-agency',
    h1: 'Ecommerce email marketing agency',
    metaTitle: 'Ecommerce Email Marketing Agency (Klaviyo Specialists)',
    metaDescription: 'Ecommerce email marketing agency for Klaviyo stores. Flows, campaigns and deliverability run by one team. Start with a free audit and no obligation.',
    answer: 'An ecommerce email marketing agency runs your email channel for you: the automated flows, the campaigns, the list growth and the deliverability behind them. Inferno Emails does this for online stores in Klaviyo, and starts every engagement with a free audit of what you already have.',
    sections: [
      {
        heading: 'What an ecommerce email agency actually does',
        body: [
          'The work splits into three parts. Flows are the automated sequences triggered by what a customer does: signing up, browsing, abandoning a basket, buying. Campaigns are the one-off sends for launches, sales and stories. Deliverability is the unglamorous layer that decides whether any of it reaches the inbox.',
          'An agency that only sends newsletters is doing a third of the job. The revenue that holds up month after month usually comes from flows that run quietly in the background, which is why we look at those first.',
        ],
      },
      {
        heading: 'Why ecommerce email is different from other email marketing',
        body: [
          'A shop has product data, order history and browsing behaviour that most businesses never have. That lets email respond to a specific action rather than blasting the same message to everyone, and it is the reason an ecommerce programme needs different skills from a service business sending a monthly update.',
          'It also means mistakes are expensive in a particular way. A cart reminder that fires after someone has already bought, or a discount sent to a customer who just paid full price, teaches people to wait for offers.',
        ],
      },
      {
        heading: 'How we work with a new store',
        body: [
          'We begin with the free audit. It lists what is missing, what is broken and what to fix first, ranked by likely impact, and you keep it whether or not you hire us. If we work together, the usual order is the core flows, then a campaign rhythm, then testing and list growth.',
          'You get named people, a shared plan and reporting that says what was measured and how. We do not quote a flat package before seeing the account, because the right scope depends on what is already built.',
        ],
      },
      {
        heading: 'When an agency is the wrong answer',
        body: [
          'If your list is very small and you are still finding product fit, spending on an agency may be early. A clear welcome flow and a cart reminder built by you can take a store a long way. If you have a strong in-house lifecycle team, you may only need an occasional audit.',
          'We would rather tell you that on the first call than take a retainer you do not need.',
        ],
      },
    ],
    checklist: [
      'Can they show a flow and explain the trigger, timing and reasoning behind each email?',
      'Will they tell you what they would fix first, in writing, before you sign anything?',
      'Do they work in the platform you already use, or push you to move?',
      'Who builds your emails, who reviews them and who do you escalate to?',
      'How do they separate email revenue from sales that would have happened anyway?',
    ],
    suits: [
      'Stores with an existing list and steady traffic that are under-using email',
      'Brands that want one partner for flows, campaigns and deliverability',
      'Teams without a full-time lifecycle marketer',
    ],
    notFor: [
      'Pre-launch stores with no customers or list yet',
      'Brands wanting a guaranteed revenue number before an audit',
      'Businesses that need an agency to run paid social as well',
    ],
    faqs: [
      { q: 'What does an ecommerce email marketing agency do?', a: 'It builds and manages your automated flows, designs and sends campaigns, grows the list and protects deliverability, then reports on the revenue email is responsible for.' },
      { q: 'Do you only work with Klaviyo?', a: 'Klaviyo is where we do our best work for ecommerce, so we focus there. The audit is the right place to discuss your current platform and whether a move makes sense.' },
      { q: 'How is this different from hiring a freelancer?', a: 'A team gives you cover when one person is away, a second pair of eyes on every send and design, strategy and deliverability under one roof. A freelancer can be a good fit for a narrower, cheaper scope.' },
    ],
    terms: ['email-flow-vs-campaign', 'abandoned-cart-flow', 'email-deliverability'],
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'best-ecommerce-email-marketing-agency',
    h1: 'How to find the best ecommerce email marketing agency',
    metaTitle: 'Best Ecommerce Email Marketing Agency: How to Choose',
    metaDescription: 'Searching for the best ecommerce email marketing agency? Seven criteria that separate a good partner from a good pitch, and where we fit. Free audit.',
    answer: 'The best ecommerce email marketing agency for you is the one that can show work in your category, explain its process plainly, assign named people to your account and measure results without inflating them. No agency is best for everyone, so judge on those four things and ignore ranking lists that cannot say how they were compiled.',
    sections: [
      {
        heading: 'Why a single best agency does not exist',
        body: [
          'A fashion brand with weekly drops, a supplement brand with a monthly reorder and a furniture store that sells once a year all need different programmes. An agency that is excellent at one can be ordinary at another, so best is always relative to your store.',
          'Be careful with lists titled best that are written by the agencies on them, or that rank by who paid. A fair list says how it chose and discloses relationships. When it does not, treat it as advertising.',
        ],
      },
      {
        heading: 'Seven things that separate good from good at pitching',
        body: [
          'First, relevant proof: real flows and campaigns in a similar category, with the reasoning behind them. Second, a process you can repeat back after one call. Third, named people and a plan for what happens if one leaves. Fourth, honest reporting that explains attribution rather than hiding behind it.',
          'Fifth, a willingness to say no, including to work that would not help you. Sixth, platform skill in what you already use. Seventh, an audit or diagnostic before a quote, because a price given without seeing the account is a guess.',
        ],
      },
      {
        heading: 'Where Inferno Emails fits, and where it does not',
        body: [
          'We are a specialist team for ecommerce brands on Klaviyo, working across Europe, Australia and the United States. Our strengths are flows, campaign design that looks like the brand and deliverability, and our work is shown in full on the portfolio.',
          'We are a poor fit if you want paid media, SEO and email under one agency, if you need a guaranteed number or if your store has not launched. We would rather say so than win the wrong client.',
        ],
      },
      {
        heading: 'A fair way to compare two or three agencies',
        body: [
          'Send the same short brief to each and give them the same access. Ask each to tell you the three most important fixes to your current email, then compare how specific the answers are. Specific beats confident every time.',
          'Ask for a reference you can speak to, and ask what the agency would do differently on a past project. Honest answers to that question tell you more than a case study.',
        ],
      },
    ],
    checklist: [
      'Is there work you can see in full, not just a logo wall?',
      'Did they ask about your margins, repurchase rate and offer before proposing anything?',
      'Do they explain how revenue is attributed and what the limits of that are?',
      'Will they disclose any commission, referral fee or platform incentive?',
      'Can you speak to a current or former client?',
    ],
    suits: [
      'Buyers shortlisting two or three email agencies',
      'Founders who want criteria they can use rather than a ranking',
    ],
    notFor: [
      'Anyone who wants a single ranked list of agencies handed to them',
      'Stores looking for a full-service marketing agency',
    ],
    faqs: [
      { q: 'Who is the best email marketing agency for ecommerce?', a: 'There is no single best. The best one for you has relevant proof, a clear process, named people and honest reporting. Compare two or three on those points rather than trusting a ranking.' },
      { q: 'Are best email marketing agency lists reliable?', a: 'Only when they explain how agencies were chosen and disclose any paid placement. Many are written by the agencies listed, so read them as marketing.' },
      { q: 'Is Inferno Emails the best agency?', a: 'We cannot be best for every store. We can be a strong fit for ecommerce brands on Klaviyo that want flows, design and deliverability handled by one team, and the free audit lets you judge that yourself.' },
    ],
    terms: ['email-flow-vs-campaign', 'attributed-revenue', 'holdout-group'],
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'klaviyo-email-marketing-agency',
    h1: 'Klaviyo email marketing agency',
    metaTitle: 'Klaviyo Email Marketing Agency for Ecommerce Brands',
    metaDescription: 'A Klaviyo email marketing agency for ecommerce: account audits, flows, campaigns, segmentation and deliverability. Start with a free audit of your account.',
    answer: 'A Klaviyo email marketing agency builds, manages and improves your email programme inside Klaviyo: the flows, the segments, the campaigns and the tracking that connects them to store revenue. Inferno Emails is a specialist team for ecommerce brands on Klaviyo, and the free audit starts with your actual account.',
    sections: [
      {
        heading: 'Why specialise in one platform',
        body: [
          'Klaviyo is built around ecommerce data: events from the store, profile properties and product catalogue feeds. Knowing it well means using those events properly, so a flow reacts to the product a customer viewed rather than a generic list tag.',
          'Agencies that spread across ten platforms tend to build the lowest common denominator. A specialist knows where Klaviyo does something unusually well and where its defaults quietly hurt you.',
        ],
      },
      {
        heading: 'What we look at first in a Klaviyo account',
        body: [
          'We check the foundation before the creative: whether events are firing correctly, whether flows are excluding people who already bought, whether the sending domain is authenticated and whether the list has been cleaned of people who stopped engaging years ago.',
          'Then we look for missing flows and weak ones. A welcome flow that is one email long, or a cart flow with no exclusions, usually costs more than any campaign tweak could recover.',
        ],
      },
      {
        heading: 'Segmentation and flow logic done properly',
        body: [
          'Good segmentation uses behaviour and purchase history rather than guesswork: new subscribers who have not bought, repeat customers by category, lapsed buyers, your best customers. Each group gets messages that suit where they are.',
          'Flow logic matters as much. Conditional splits, filters and smart sending rules decide who sees what and when, and they are where most inherited accounts go wrong.',
        ],
      },
      {
        heading: 'Working with an account you already have',
        body: [
          'You rarely need to start again. We keep what works, rebuild what does not and document the changes so your team understands the account afterwards.',
          'If you want to move from another platform, we can discuss that during the audit, but we will not recommend a migration unless the numbers and workflow justify it.',
        ],
      },
    ],
    checklist: [
      'Do they ask for read access to your Klaviyo account before quoting?',
      'Can they explain your current flow triggers, filters and exclusions back to you?',
      'Will they document changes so you are not locked into the agency?',
      'Do they check authentication and list health, not only creative?',
      'Do they tell you what to leave alone?',
    ],
    suits: [
      'Stores already on Klaviyo that suspect the account is under-used',
      'Brands inheriting an account built by a previous agency or freelancer',
    ],
    notFor: [
      'Stores committed to a different platform with no plan to move',
      'Teams who only want template design with no strategy',
    ],
    faqs: [
      { q: 'What does a Klaviyo agency do?', a: 'It audits, builds and manages your Klaviyo account: flows, segments, campaigns, signup forms, tracking and deliverability, reporting on the revenue attributed to each.' },
      { q: 'Do I need to give you access to my account?', a: 'For an audit, read access is enough, and we can usually do it from there. We would only need edit access if you decide to work with us.' },
      { q: 'Can you fix an account another agency built?', a: 'Yes, and it is a common starting point. We review what exists, keep the useful parts and fix or replace the rest, with notes on what changed.' },
    ],
    terms: ['klaviyo-metric', 'flow-filter', 'email-segmentation'],
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'shopify-email-marketing-agency',
    h1: 'Shopify email marketing agency',
    metaTitle: 'Shopify Email Marketing Agency: Klaviyo Flows & Campaigns',
    metaDescription: 'Email marketing agency for Shopify stores. We connect Klaviyo to your store data and build flows and campaigns that use it. Free audit, no obligation.',
    answer: 'A Shopify email marketing agency turns your store data into email that responds to what customers do: what they browsed, what they left in the basket, what they bought and when. Inferno Emails builds this in Klaviyo for Shopify stores, starting with a free audit of your current setup.',
    sections: [
      {
        heading: 'What the Shopify and Klaviyo connection gives you',
        body: [
          'Once connected, Klaviyo receives events from the store: viewed product, added to basket, started checkout, placed order. Each of those can trigger a message or place someone in a segment, with the product details attached.',
          'The integration only works as well as it is configured. A connection with the wrong sync settings, duplicate events or missing consent data quietly produces flows that misfire, which is the first thing we check.',
        ],
      },
      {
        heading: 'Flows that make sense for a Shopify store',
        body: [
          'The core set is a welcome flow, browse and cart recovery, a post-purchase sequence and a winback flow for lapsed customers. After that come replenishment reminders for products people reorder and back-in-stock alerts for sold-out lines.',
          'Which ones matter most depends on your catalogue. A store selling consumables earns from replenishment, while a store selling single large items leans on browse recovery and post-purchase education.',
        ],
      },
      {
        heading: 'Signup forms, consent and list growth',
        body: [
          'Email starts with a good signup experience. We look at where visitors are asked, what they are offered and whether consent is recorded properly, because a list built on unclear consent hurts deliverability and creates legal risk.',
          'Growth should not rely on a permanent discount. A welcome offer can work, but we test it against alternatives such as early access or a useful guide so you are not teaching customers to wait.',
        ],
      },
      {
        heading: 'Keeping the store and the inbox in step',
        body: [
          'Out-of-stock products, changed shipping times and sale prices all need to match what an email says. We build with live product feeds and dynamic content where possible so a message does not promise something the store cannot deliver.',
          'Where manual steps remain, we write them into a checklist so your team knows what to update before a send.',
        ],
      },
    ],
    checklist: [
      'Have they checked that Shopify events are syncing without duplicates?',
      'Do your flows exclude people who have already bought?',
      'Is consent captured and recorded at every signup point?',
      'Are product feeds and dynamic blocks used instead of hard-coded items?',
      'Is there a plan for sold-out and low-stock products?',
    ],
    suits: [
      'Shopify and Shopify Plus stores with an existing list and steady orders',
      'Brands whose flows were set up once and never revisited',
    ],
    notFor: [
      'Stores on another platform with no plan to change',
      'Brands who need Shopify theme or app development rather than email',
    ],
    faqs: [
      { q: 'Is Klaviyo better than Shopify Email?', a: 'Shopify Email is a simple way to send campaigns. Klaviyo goes much further on segmentation, flows and reporting, which is why most stores that take email seriously move to it.' },
      { q: 'Do you work with Shopify Plus?', a: 'Yes. The email work is the same in principle, and larger catalogues and more complex segmentation usually make the audit more valuable.' },
      { q: 'Can you migrate us from Shopify Email or Mailchimp?', a: 'We can plan and carry out a move to Klaviyo, including list, consent history and flows. We will say in the audit whether the move is worth the effort.' },
    ],
    terms: ['event-trigger', 'catalog-feed', 'abandoned-cart-flow'],
    service: 'email-flows',
  },
  {
    slug: 'dtc-email-marketing-agency',
    h1: 'DTC email marketing agency',
    metaTitle: 'DTC Email Marketing Agency for Direct-to-Consumer Brands',
    metaDescription: 'Email marketing agency for DTC brands: lifecycle flows, campaign design and deliverability that lift repeat purchase. Free audit, no obligation.',
    answer: 'A DTC email marketing agency helps a direct-to-consumer brand earn repeat purchases from customers it already paid to acquire. For brands selling straight to shoppers, email is the cheapest way to bring a buyer back, and Inferno Emails builds that lifecycle in Klaviyo.',
    sections: [
      {
        heading: 'Why email matters more when you own the customer',
        body: [
          'A DTC brand pays for each new customer through ads, creators or search, then holds the relationship itself. If the second purchase never happens, the economics of that first sale rarely work, which makes retention the lever with the best return.',
          'Email is where that retention lives. You own the list, you control the timing and you are not renting attention from a platform whose rules can change overnight.',
        ],
      },
      {
        heading: 'Lifecycle thinking instead of one-off sends',
        body: [
          'We map the customer journey: first visit, first purchase, second purchase, loyal customer, lapsed customer. Each stage has a different job for email, from introducing the brand to encouraging a reorder to winning someone back.',
          'This is why a calendar of promotions alone disappoints. Campaigns cover moments you choose, while lifecycle flows cover the moments your customers create.',
        ],
      },
      {
        heading: 'Creative that feels like the brand',
        body: [
          'DTC customers buy into a brand, not only a product. Emails that read like a generic template undercut the brand work done everywhere else, so we design around your type, colour, photography and tone.',
          'You can see the range of that on the portfolio, where emails for different brands look nothing alike.',
        ],
      },
      {
        heading: 'Measuring what email adds',
        body: [
          'Attributed revenue is the standard measure, but it counts sales that might have happened anyway. We discuss holdouts and cohort comparisons where your volume allows, so you know what email is adding rather than only what it touched.',
          'Honest measurement also tells you when to stop. If a flow is not earning its keep, we say so.',
        ],
      },
    ],
    checklist: [
      'Do they talk about repeat purchase and lifetime value, not only open rates?',
      'Is there a plan for each lifecycle stage, not just campaigns?',
      'Does the creative look like your brand, not a template?',
      'Will they test offers rather than defaulting to discounts?',
      'Do they report on cohorts as well as attributed revenue?',
    ],
    suits: [
      'Founder-led brands selling directly through their own store',
      'Brands with strong acquisition but weak repeat purchase',
    ],
    notFor: [
      'Wholesale-only businesses with no consumer list',
      'Brands expecting email to replace acquisition',
    ],
    faqs: [
      { q: 'What is a DTC email marketing agency?', a: 'An agency that runs email for brands selling directly to consumers, focused on repeat purchase, lifetime value and keeping the brand consistent across every message.' },
      { q: 'How soon does email affect repeat purchase?', a: 'Flows can start working within weeks of going live, but the repeat-purchase effect shows over a full buying cycle, which depends on what you sell.' },
      { q: 'Should a DTC brand rely on discounts in email?', a: 'Not by default. Discounts work, but overusing them trains customers to wait for one. We test alternatives such as early access and product education.' },
    ],
    terms: ['customer-lifetime-value', 'post-purchase-flow', 'cohort-analysis'],
    service: 'retention-strategy',
  },
  {
    slug: 'email-marketing-agency-for-small-ecommerce-brands',
    h1: 'Email marketing agency for small ecommerce brands',
    metaTitle: 'Email Marketing Agency for Small Ecommerce Brands',
    metaDescription: 'Is an email agency worth it for a small online store? When to hire one, when to wait and what to fix yourself first. Free audit, no obligation.',
    answer: 'A small ecommerce brand should hire an email marketing agency when it has a list and steady orders but not the time or skill to build flows properly. Before that point, a welcome flow and a cart reminder built yourself usually beat paying for more than the audit.',
    sections: [
      {
        heading: 'When a small store is ready for an agency',
        body: [
          'The signs are practical. You have a list that has grown past the point where you can write to it by hand, orders come in steadily and you know your email is under-used, but nobody on the team owns it.',
          'If you are still testing whether people want the product at all, spend on that first. Email amplifies a product that already sells.',
        ],
      },
      {
        heading: 'What to do yourself first',
        body: [
          'Build a welcome flow with a few emails, a cart reminder with an exclusion for people who have bought and a simple post-purchase thank you. Authenticate your sending domain so mail lands in the inbox.',
          'Those four things cover most of the early gains and cost nothing but time. An agency adds most when these exist and need to be improved.',
        ],
      },
      {
        heading: 'How an engagement scales to your size',
        body: [
          'We do not use one package for every store. A small brand may need a flow build and a short campaign rhythm rather than full management, and the scope is set after the audit.',
          'If the right answer is a one-off project and then you take it in-house, we say so, and document the build so your team can run it.',
        ],
      },
      {
        heading: 'Protecting a small budget',
        body: [
          'Ask for a defined scope, a clear first deliverable and a read-out after the first period. Be wary of long contracts before any result is visible, and of agencies that cannot explain what they will do in the first month.',
          'A free audit is a low-risk way to test the relationship, since it shows how an agency thinks before you commit anything.',
        ],
      },
    ],
    checklist: [
      'Do you have a list and steady orders that email can build on?',
      'Is there a clear first deliverable, not just a retainer?',
      'Can the agency scope to your size rather than sell a fixed package?',
      'Will they document the build so you can run it later?',
      'Is the contract short enough to leave if it is not working?',
    ],
    suits: [
      'Small stores with a growing list and nobody owning email',
      'Founders who want the foundations built right once',
    ],
    notFor: [
      'Stores with no list or no steady orders yet',
      'Founders who want the cheapest option above all else',
    ],
    faqs: [
      { q: 'Is an email agency worth it for a small business?', a: 'It can be, once you have a list and steady orders. Before that, building a welcome flow and cart reminder yourself is usually the better use of money.' },
      { q: 'What is the minimum list size for an agency?', a: 'There is no fixed number. What matters is whether there is enough traffic and order volume for flows to earn from. The audit gives you a straight answer.' },
      { q: 'Can you do a one-off flow build?', a: 'Yes. A project-based build with documentation is a sensible option for stores that will run email in-house afterwards.' },
    ],
    terms: ['welcome-flow', 'abandoned-cart-flow', 'email-list-growth'],
    service: 'email-flows',
  },
  {
    slug: 'email-retention-marketing-agency',
    h1: 'Email and retention marketing agency',
    metaTitle: 'Email & Retention Marketing Agency for Ecommerce',
    metaDescription: 'Email and retention marketing agency for ecommerce brands: win repeat purchases with post-purchase, replenishment and winback flows. Free audit.',
    answer: 'An email and retention marketing agency focuses on getting existing customers to buy again, using lifecycle email rather than constant promotion. Inferno Emails plans the retention programme, builds the Klaviyo flows behind it and reports on repeat purchase, not only opens and clicks.',
    sections: [
      {
        heading: 'What retention marketing is for',
        body: [
          'Acquisition brings a customer in once. Retention is everything that makes a second and third order likely: a good first experience, helpful follow-up, a timely reminder and a reason to come back.',
          'Email is the main retention channel for most online stores because it reaches a customer you already know, at a moment you can choose, at little cost per message.',
        ],
      },
      {
        heading: 'The flows that carry retention',
        body: [
          'Post-purchase sequences set expectations and teach the customer how to get the most from what they bought. Replenishment reminders arrive when a product is likely to run out. Cross-sell emails suggest what goes with the original order.',
          'Winback flows reach customers who have gone quiet, and a sunset policy removes the ones who never return so they stop harming deliverability.',
        ],
      },
      {
        heading: 'Segmenting by value and behaviour',
        body: [
          'Not every customer deserves the same treatment. We separate first-time buyers, repeat customers, high-value customers and lapsed ones, then change the messages and the frequency for each group.',
          'Your best customers can hear from you more often and earlier, while a lapsed customer needs a gentler, different approach.',
        ],
      },
      {
        heading: 'Measuring retention honestly',
        body: [
          'We track repeat purchase rate, time between orders and revenue per recipient alongside flow revenue. The aim is a programme that visibly improves the shape of your customer base over time, not just the top line of a monthly report.',
          'Retention results arrive over a buying cycle, so we agree up front what a fair first read looks like, and we explain it in plain words.',
        ],
      },
    ],
    checklist: [
      'Do they track repeat purchase rate and not only email revenue?',
      'Is there a plan for post-purchase, replenishment and winback?',
      'Do they segment by customer value?',
      'Do they have a sunset policy for unengaged subscribers?',
      'Is the first read timed to your buying cycle?',
    ],
    suits: [
      'Brands with good acquisition but low repeat purchase',
      'Stores selling products that are reordered or collected over time',
    ],
    notFor: [
      'Brands looking for new-customer acquisition from an email agency',
      'One-off purchase products with no reason to return',
    ],
    faqs: [
      { q: 'What is retention marketing?', a: 'Marketing aimed at existing customers so they buy again, using lifecycle email, loyalty and timely follow-up rather than only paid acquisition.' },
      { q: 'Why use email for retention?', a: 'Because you own the list, can time messages to behaviour and reach a customer at low cost. It is usually the highest-return retention channel for online stores.' },
      { q: 'How is retention measured?', a: 'Repeat purchase rate, time between orders, customer lifetime value and revenue per recipient, read over a full buying cycle.' },
    ],
    terms: ['replenishment-flow', 'winback-flow', 'sunset-policy'],
    service: 'retention-strategy',
  },
  {
    slug: 'remote-email-marketing-agency',
    h1: 'Remote email marketing agency',
    metaTitle: 'Remote Email Marketing Agency for Ecommerce Brands',
    metaDescription: 'A remote email marketing agency working with ecommerce brands in the US, Canada, UK and Europe. How we run calls, approvals and reporting. Free audit.',
    answer: 'A remote email marketing agency runs your email programme without an office near you, using shared documents, scheduled calls and a clear approvals process. Inferno Emails works this way with ecommerce brands across the United States, Canada, the United Kingdom and Europe.',
    sections: [
      {
        heading: 'Why location matters less than process for email',
        body: [
          'Email work happens inside Klaviyo, your store and shared design files. None of it needs anyone to sit in your building, and the quality of the output depends on the clarity of the plan, not on where it was built.',
          'What matters is whether the agency is easy to reach and clear about what happens next. That is a process question, and good remote teams answer it well.',
        ],
      },
      {
        heading: 'How a remote engagement runs',
        body: [
          'You get a shared plan, a regular call in your working hours, a written summary after it and a single place to approve designs and copy. Changes are tracked so you can see what shipped and why.',
          'We say plainly where we are based and do not pretend to have an office we do not have. If you need someone on site, we are not the right fit.',
        ],
      },
      {
        heading: 'Time zones and approvals',
        body: [
          'Time zones become a problem only when approvals bunch up. We agree a send calendar ahead of time, with review windows, so a campaign for Tuesday morning in your time zone is signed off before the day.',
          'For brands across several regions, we schedule sends by recipient time zone rather than ours, so the work follows your customers.',
        ],
      },
      {
        heading: 'Where remote works less well',
        body: [
          'Shoots, in-person workshops and same-day changes on a launch are harder remotely. We plan around them, but a brand that wants an embedded team member sitting alongside its staff should hire in-house.',
          'We will say so during the audit call if we think another model suits you better.',
        ],
      },
    ],
    checklist: [
      'Is there a named lead and a regular call in your working hours?',
      'Is there a single place to review and approve work?',
      'Does the agency send recipients emails by their time zone?',
      'Are launch days planned with review windows?',
      'Are they honest about where they are based?',
    ],
    suits: [
      'Brands comfortable with scheduled calls and shared documents',
      'Stores in several regions that want one team for all of them',
    ],
    notFor: [
      'Brands that need an on-site or embedded team member',
      'Businesses that require an agency in their own city for contract reasons',
    ],
    faqs: [
      { q: 'Does a remote agency work as well as a local one?', a: 'For email, usually yes, because the work is done in software. The difference is in communication, which depends on the agency having a clear process.' },
      { q: 'Which countries do you work with?', a: 'We work with ecommerce brands across the United States, Canada, the United Kingdom and mainland Europe, and we have shipped work in Europe, Australia and the United States.' },
      { q: 'Do you have an office?', a: 'No. We are a remote agency and say so. Calls are held in your working hours.' },
    ],
    terms: ['send-time-optimization', 'email-flow-vs-campaign', 'email-deliverability'],
    service: 'klaviyo-email-marketing',
  },
];

export const getAgencyPage = (slug: string) => AGENCY_PAGES.find((p) => p.slug === slug);

export function agencySiblings(slug: string) {
  const i = AGENCY_PAGES.findIndex((p) => p.slug === slug);
  if (i < 0) return [];
  return [1, 2, 3].map((n) => AGENCY_PAGES[(i + n) % AGENCY_PAGES.length]).filter((x) => x.slug !== slug);
}
