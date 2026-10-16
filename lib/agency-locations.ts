/**
 * Market pages for brands searching for an email marketing agency in a
 * country or city. Inferno Emails is remote: no page claims an office, a
 * local team or local clients. Each page earns its place with what is true
 * of that market (privacy and consent rules, language, seasons, how people
 * shop, time zone) and says plainly that the work is done remotely.
 * General practice only, not legal advice; no prices, statistics or results.
 */
export type Location = {
  slug: string;
  kind: 'country' | 'city';
  /** Place name as searched, e.g. "San Francisco". */
  name: string;
  /** Country the place belongs to (the same as name for a country). */
  country: string;
  h1: string;
  /** 59 characters or fewer. */
  metaTitle: string;
  /** 155 characters or fewer. */
  metaDescription: string;
  answer: string;
  sections: { heading: string; body: string[] }[];
  faqs: { q: string; a: string }[];
  /** Slugs of related locations to link to. */
  nearby: string[];
  /** Glossary term slugs. */
  terms: string[];
  /** Service page slug. */
  service: string;
};

export const LOCATIONS: Location[] = [
  /* ------------------------------ countries ------------------------------ */
  {
    slug: 'usa',
    kind: 'country',
    name: 'United States',
    country: 'United States',
    h1: 'Email marketing agency for US ecommerce brands',
    metaTitle: 'Email Marketing Agency for US Ecommerce Brands',
    metaDescription: 'Remote email marketing agency for US ecommerce brands. Klaviyo flows, campaigns and deliverability, built around CAN-SPAM and state privacy rules.',
    answer: 'Inferno Emails is a remote email marketing agency that works with ecommerce brands in the United States. We build and run Klaviyo flows, campaigns and deliverability, and plan sends around US time zones, US shopping seasons and US consent rules. We work remotely and have no US office.',
    sections: [
      {
        heading: 'What US ecommerce email has to get right',
        body: [
          'The United States is the largest ecommerce market we work in, and it is also the most competitive inbox. Customers are used to heavy promotion, so a brand that sends the same discount to everyone is easy to ignore. Segmentation and relevance matter more here than almost anywhere.',
          'Mailbox providers also watch engagement closely. Sending to people who no longer open mail damages inbox placement for the people who do, which is why list hygiene is part of the work and not an afterthought.',
        ],
      },
      {
        heading: 'CAN-SPAM, state privacy laws and your footer',
        body: [
          'Federal law, the CAN-SPAM Act, requires honest sender and subject information, a working way to opt out, honouring opt-outs promptly and a valid physical postal address in every commercial email. Check that your footer carries that address and that unsubscribes are processed.',
          'Several states, California most visibly, add their own privacy rights, including rights to access and delete personal data. We build forms and flows with consent recorded, and we leave the legal advice to your lawyer.',
        ],
      },
      {
        heading: 'Time zones and the US calendar',
        body: [
          'A single US send spans four main time zones, so a nine o clock send lands at very different moments for different customers. We schedule by recipient time zone where we can and test send times against your own data.',
          'The commercial calendar is dominated by the Black Friday and Cyber Monday period, with Mother’s Day, Father’s Day, back to school and Prime Day windows shaping the rest of the year. We plan these weeks ahead, including the warm-up needed to send more volume safely.',
        ],
      },
      {
        heading: 'How we work with you from outside the US',
        body: [
          'We are a remote team, so we do not claim a US office or a local team. Calls are arranged around your working day, work happens in shared documents and Klaviyo, and approvals follow a plan agreed in advance.',
          'The free audit is the best first step. It shows what is missing in your account, ranked by likely impact, with no obligation to hire us.',
        ],
      },
    ],
    faqs: [
      { q: 'Do you work with US ecommerce brands?', a: 'Yes. We work with US brands remotely, building and managing their Klaviyo email programmes, and we have shipped work in the United States.' },
      { q: 'Are you a US company?', a: 'We are a remote agency and do not claim a US office. Our work for US brands is done through scheduled calls, shared documents and Klaviyo.' },
      { q: 'Do you handle CAN-SPAM compliance?', a: 'We build emails with the required unsubscribe and address elements, and we check them. Legal interpretation is for your counsel.' },
    ],
    nearby: ['san-francisco', 'new-york', 'los-angeles', 'austin', 'canada'],
    terms: ['one-click-unsubscribe', 'send-time-optimization', 'email-deliverability'],
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'canada',
    kind: 'country',
    name: 'Canada',
    country: 'Canada',
    h1: 'Email marketing agency for Canadian ecommerce brands',
    metaTitle: 'Email Marketing Agency for Canadian Ecommerce Brands',
    metaDescription: 'Remote email marketing agency for Canadian ecommerce brands. Klaviyo flows and campaigns built around CASL consent rules, CAD and bilingual sending.',
    answer: 'Inferno Emails is a remote email marketing agency for Canadian ecommerce brands. We build Klaviyo flows and campaigns with CASL consent in mind, plan around Canadian seasons and cross-border shoppers, and handle bilingual sending where Quebec is in scope. We have no Canadian office.',
    sections: [
      {
        heading: 'Why Canada needs more care than the US',
        body: [
          'Canada’s anti-spam law, CASL, is stricter than the American approach. It generally requires consent before sending commercial email, which can be express or, in limited situations, implied, along with clear sender identification and a working unsubscribe.',
          'Implied consent from a purchase or enquiry does not last forever. If your list was built from old orders, it is worth auditing how each contact was collected before sending to everyone.',
        ],
      },
      {
        heading: 'Consent records and list hygiene',
        body: [
          'We recommend storing how and when each subscriber opted in, and setting up signup forms that capture it automatically. In Klaviyo that means using consent fields and clean source tracking rather than uploading a spreadsheet with no history.',
          'This is also good for deliverability. A list of people who actually asked to hear from you gets better engagement and fewer complaints.',
        ],
      },
      {
        heading: 'Language, currency and cross-border shoppers',
        body: [
          'If you sell to Quebec, French is not optional in practice, and your emails, signup forms and unsubscribe pages should be ready in both languages. We build the templates and segmentation so each customer gets the right version.',
          'Many Canadian shoppers also buy from US stores, and many Canadian brands sell south of the border. We plan currency display, delivery expectations and duties messaging so customers are not surprised at checkout.',
        ],
      },
      {
        heading: 'Seasons and working with us remotely',
        body: [
          'Canadian shoppers respond to Black Friday and Cyber Monday, Boxing Day and the long winter buying season, and the weather shapes categories from outerwear to home goods. We build that into the campaign calendar.',
          'We are remote and have no Canadian office. We arrange calls in your working hours, and the free audit is a low-risk way to see how we work.',
        ],
      },
    ],
    faqs: [
      { q: 'Do you understand CASL?', a: 'We build forms and flows with CASL consent principles in mind and keep records of how people opted in. For legal interpretation, speak to a Canadian lawyer.' },
      { q: 'Can you send bilingual emails?', a: 'We can build bilingual templates and segment by language. Copy in French is best written or reviewed by a native speaker.' },
      { q: 'Are you based in Canada?', a: 'No. We are a remote agency, and we say so. We work with Canadian brands through scheduled calls and shared documents.' },
    ],
    nearby: ['toronto', 'vancouver', 'usa', 'united-kingdom'],
    terms: ['double-opt-in', 'suppression-list', 'email-segmentation'],
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'united-kingdom',
    kind: 'country',
    name: 'United Kingdom',
    country: 'United Kingdom',
    h1: 'Email marketing agency for UK ecommerce brands',
    metaTitle: 'Email Marketing Agency for UK Ecommerce Brands',
    metaDescription: 'Remote email marketing agency for UK ecommerce brands. Klaviyo flows and campaigns built for PECR, UK GDPR, VAT-inclusive pricing and British seasons.',
    answer: 'Inferno Emails is a remote email marketing agency for UK ecommerce brands. We build Klaviyo flows and campaigns that follow PECR and UK GDPR principles, write in British English and plan around the UK calendar. We work remotely and have no UK office, though our work has shipped across Europe.',
    sections: [
      {
        heading: 'PECR, UK GDPR and the soft opt-in',
        body: [
          'UK email marketing is governed by the Privacy and Electronic Communications Regulations alongside UK GDPR. In general you need consent to email consumers, with a limited soft opt-in for existing customers where you offered an easy way to refuse at collection and in every message.',
          'The Information Commissioner’s Office enforces these rules. We build signup and checkout consent so that you can show who agreed to what, and we keep suppression lists clean.',
        ],
      },
      {
        heading: 'Pricing, delivery and the details UK shoppers notice',
        body: [
          'UK consumers expect prices shown with VAT included, clear delivery estimates and simple returns. Emails that quote a price without VAT, or promise a delivery date the carrier cannot meet, erode trust quickly.',
          'Since Brexit, shipping to the European Union also involves customs and duties. A cart reminder that mentions delivery cost and duties up front reduces abandoned baskets at the last step.',
        ],
      },
      {
        heading: 'The British calendar is not the American one',
        body: [
          'Mothering Sunday falls in spring, not May, so a Mother’s Day plan copied from a US template will arrive weeks late. Boxing Day and the January sales matter more than they do in North America, while Black Friday has become a major event here too.',
          'We plan the calendar around UK dates and write in British English, so spelling and tone match what customers expect.',
        ],
      },
      {
        heading: 'Working with us remotely',
        body: [
          'We are a remote agency without a UK office, and our work has shipped across Europe. Calls are arranged around your working hours.',
          'Start with the free audit. It lists what to fix first in your Klaviyo account, with no obligation.',
        ],
      },
    ],
    faqs: [
      { q: 'Do you follow PECR and UK GDPR?', a: 'We build forms, flows and suppression practices around their principles and record consent. Final legal judgement should come from your adviser.' },
      { q: 'Do you write in British English?', a: 'Yes. Spelling, tone, dates and price formats follow UK conventions.' },
      { q: 'Do you have a UK office?', a: 'No. We are a remote agency and work with UK brands through scheduled calls and shared documents.' },
    ],
    nearby: ['london', 'germany', 'france', 'canada'],
    terms: ['double-opt-in', 'suppression-list', 'spam-complaint-rate'],
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'germany',
    kind: 'country',
    name: 'Germany',
    country: 'Germany',
    h1: 'Email marketing agency for German ecommerce brands',
    metaTitle: 'Email Marketing Agency for German Ecommerce Brands',
    metaDescription: 'Remote email marketing agency for ecommerce brands in Germany. Klaviyo flows built around DSGVO, double opt-in, the Impressum and German shopping habits.',
    answer: 'Inferno Emails is a remote email marketing agency for ecommerce brands selling in Germany. We build Klaviyo programmes around DSGVO, double opt-in and the Impressum, and plan flows around how German customers pay. We do not have a German office, and German copy should be written or checked by a native speaker.',
    sections: [
      {
        heading: 'Double opt-in is the default',
        body: [
          'German marketing law is among the strictest in Europe. Under DSGVO and the unfair competition act, you need clear consent, and you must be able to prove it. In practice that means double opt-in: the subscriber confirms by clicking a link in an email.',
          'We set up confirmation emails, store the consent timestamp and source and keep a record you can produce if challenged. It reduces list growth slightly, and it pays back in cleaner engagement.',
        ],
      },
      {
        heading: 'The Impressum and other legal furniture',
        body: [
          'German commercial websites and emails are expected to carry an Impressum, the legal notice identifying the business. Emails should link to it and to the privacy policy, and unsubscribes must work without friction.',
          'We build these elements into the footer template once, so every flow and campaign inherits them. Your lawyer should confirm the wording.',
        ],
      },
      {
        heading: 'How German customers pay and what that means for flows',
        body: [
          'Buying on invoice, direct debit and PayPal are common in Germany, and returns are a normal part of shopping. A cart reminder should reflect the payment options you offer, and a post-purchase flow should make returns clear rather than hide them.',
          'Customers also expect precise, factual language. Hype that works in a US inbox can read badly here, so copy should be plain and specific.',
        ],
      },
      {
        heading: 'Language and working with us remotely',
        body: [
          'We build German-language templates, logic and segmentation, and recommend that a native speaker writes or reviews the copy. A machine-translated subject line costs you more than it saves.',
          'We are remote with no German office. Calls are held in your working hours, and the free audit is the best first step.',
        ],
      },
    ],
    faqs: [
      { q: 'Do I need double opt-in in Germany?', a: 'It is widely treated as the safe standard because you need to prove consent. Ask your lawyer to confirm what applies to your list.' },
      { q: 'Can you write emails in German?', a: 'We build German templates and logic and work best with copy written or reviewed by a native speaker.' },
      { q: 'Do you have an office in Germany?', a: 'No. We are a remote agency, and our work has shipped across Europe.' },
    ],
    nearby: ['berlin', 'france', 'united-kingdom'],
    terms: ['double-opt-in', 'suppression-list', 'email-deliverability'],
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'france',
    kind: 'country',
    name: 'France',
    country: 'France',
    h1: 'Email marketing agency for French ecommerce brands',
    metaTitle: 'Email Marketing Agency for French Ecommerce Brands',
    metaDescription: 'Remote email marketing agency for ecommerce brands in France. Klaviyo flows built around CNIL guidance, French-language rules and the soldes calendar.',
    answer: 'Inferno Emails is a remote email marketing agency for ecommerce brands selling in France. We build Klaviyo flows and campaigns around CNIL guidance and the French shopping calendar, and we plan for French-language communication. We have no French office, and French copy should be written by a native speaker.',
    sections: [
      {
        heading: 'Consent under CNIL and RGPD',
        body: [
          'France applies the European data protection rules through the regulator CNIL. In general, emailing consumers for marketing needs their prior consent, with a limited exception for customers who bought similar products from you and were offered an easy way to opt out.',
          'We build signup forms that record consent, keep source data in Klaviyo and make unsubscribing simple, so you can show how each person joined your list.',
        ],
      },
      {
        heading: 'French is the expected language',
        body: [
          'French law expects commercial communication aimed at consumers in France to be available in French. Emails, forms and legal pages should be in French, and a native speaker should write or review the copy.',
          'We build the templates and segmentation around it, including language fields in Klaviyo so a customer who prefers French never gets an English send by mistake.',
        ],
      },
      {
        heading: 'Les soldes and the French calendar',
        body: [
          'French retail has regulated sale periods, the soldes, in winter and summer, and promotional rules around them are stricter than in many countries. The calendar also differs in smaller ways, since Mother’s Day falls on a different date from the UK or US.',
          'We plan campaigns around these dates, and we check offers against your own advice so emails do not promise something the rules disallow.',
        ],
      },
      {
        heading: 'Practical first steps for a French store',
        body: [
          'Check that your signup forms record consent and the date, that unsubscribes work in one step and that your emails link to French legal pages. Then review whether older contacts joined in a way you can show.',
          'Those checks make the rest of the programme safer, and they usually improve engagement because the list is made up of people who asked to hear from you.',
        ],
      },
      {
        heading: 'Working with us remotely',
        body: [
          'We are a remote agency with no French office, and our work has shipped across Europe. Calls are arranged in your working hours, and approvals follow a shared plan.',
          'The free audit shows what is missing in your Klaviyo account, with no obligation to hire us.',
        ],
      },
    ],
    faqs: [
      { q: 'Do you understand CNIL rules?', a: 'We build consent capture, suppression and unsubscribe handling around the principles CNIL applies. For specific legal questions, take advice from a French professional.' },
      { q: 'Can you write emails in French?', a: 'We build French templates and logic, and recommend native-speaker copy.' },
      { q: 'Are you based in France?', a: 'No. We are a remote agency and work with French brands through scheduled calls and shared documents.' },
    ],
    nearby: ['paris', 'germany', 'united-kingdom'],
    terms: ['double-opt-in', 'suppression-list', 'email-segmentation'],
    service: 'klaviyo-email-marketing',
  },

  /* -------------------------------- cities -------------------------------- */
  {
    slug: 'san-francisco',
    kind: 'city',
    name: 'San Francisco',
    country: 'United States',
    h1: 'Email marketing agency for San Francisco ecommerce brands',
    metaTitle: 'Email Marketing Agency for San Francisco Ecommerce Brands',
    metaDescription: 'Remote email marketing agency for San Francisco and Bay Area ecommerce brands. Klaviyo flows, campaigns and deliverability. Free audit, no obligation.',
    answer: 'Inferno Emails is a remote email marketing agency for ecommerce brands in San Francisco and the wider Bay Area. We build and manage Klaviyo flows, campaigns and deliverability, and schedule calls in Pacific time. We do not have a San Francisco office, and we will not pretend otherwise.',
    sections: [
      {
        heading: 'Founders who expect to see the numbers',
        body: [
          'Many Bay Area ecommerce founders come from product or engineering backgrounds. They want to see the events, the segments and the reasoning, not a deck of promises. We lay out the flow logic and the measurement approach in writing so you can check it.',
          'That also means being honest about attribution. Email revenue in Klaviyo counts orders it touched, and we explain what that does and does not prove.',
        ],
      },
      {
        heading: 'Rising acquisition costs make retention matter',
        body: [
          'Brands that grew on paid social know that each new customer costs more than it used to. The next order from an existing customer is far cheaper, which is why lifecycle email deserves the same attention as the ad account.',
          'We start with the flows that bring first-time buyers back: post-purchase education, replenishment where it fits and a winback flow for lapsed customers.',
        ],
      },
      {
        heading: 'California privacy and a national audience',
        body: [
          'A San Francisco brand usually sells nationally, so email has to meet CAN-SPAM everywhere and California’s privacy rights for residents, including access and deletion requests. We build forms and suppression handling so those requests can be honoured.',
          'Your lawyer owns the legal interpretation. Our job is to make the tooling support it.',
        ],
      },
      {
        heading: 'How we work with Bay Area brands remotely',
        body: [
          'We are a remote agency. We do not have an office in San Francisco and do not claim a local team. Calls are arranged in Pacific time, and work happens in Klaviyo, your store and shared documents.',
          'The free audit is the quickest way to judge fit. It lists what is missing in your account, ranked by likely impact.',
        ],
      },
    ],
    faqs: [
      { q: 'Do you have an office in San Francisco?', a: 'No. We are remote and say so. We work with Bay Area brands through scheduled calls in Pacific time and shared documents.' },
      { q: 'Can you work with a Shopify store in the Bay Area?', a: 'Yes. Most of our work is Shopify stores running Klaviyo, and the location makes no difference to how the work is done.' },
      { q: 'What does an audit include?', a: 'A review of your flows, segments, deliverability and signup forms, with what is missing ranked by likely impact. It is free and there is no obligation.' },
    ],
    nearby: ['los-angeles', 'usa', 'vancouver', 'austin'],
    terms: ['customer-lifetime-value', 'attributed-revenue', 'post-purchase-flow'],
    service: 'retention-strategy',
  },
  {
    slug: 'new-york',
    kind: 'city',
    name: 'New York',
    country: 'United States',
    h1: 'Email marketing agency for New York ecommerce brands',
    metaTitle: 'Email Marketing Agency for New York Ecommerce Brands',
    metaDescription: 'Remote email marketing agency for New York ecommerce brands. Klaviyo flows and campaign design for fashion, beauty and lifestyle. Free audit.',
    answer: 'Inferno Emails is a remote email marketing agency for ecommerce brands in New York. We build Klaviyo flows and design campaigns that carry a brand’s look, which suits the fashion, beauty and lifestyle brands the city is known for. We have no New York office and work remotely in Eastern time.',
    sections: [
      {
        heading: 'Brand-led categories need brand-led email',
        body: [
          'New York is a centre for fashion, beauty, jewellery and food brands, where the look of the brand is part of what customers buy. A generic template cheapens that.',
          'We design each email around the brand’s type, colour and photography, and the portfolio shows how different those emails can look from one client to the next.',
        ],
      },
      {
        heading: 'Drops, seasons and fashion weeks',
        body: [
          'Many New York brands work to a seasonal rhythm, with collections, drops and moments tied to fashion weeks in February and September. Email has to build anticipation before a launch and keep momentum after it.',
          'We plan launch sequences with an early-access segment, a launch send and a follow-up for people who clicked but did not buy.',
        ],
      },
      {
        heading: 'Wholesale and direct together',
        body: [
          'Some New York brands sell through retailers as well as direct. Keep those audiences separate in Klaviyo, so a wholesale buyer never receives a shopper discount and a customer never sees a trade message.',
          'We set up the segmentation so each group hears from you in the right voice.',
        ],
      },
      {
        heading: 'Built for phones and commutes',
        body: [
          'Many New Yorkers read email on a phone, on the move, so layout and load time matter more than clever design. We test every template on small screens and in dark mode before it ships, including how images behave when they are blocked.',
          'Send time is worth testing too. Commuter hours and lunch breaks may suit your audience, or they may not, and your own click data will say which. We run the test rather than assume.',
        ],
      },
      {
        heading: 'Working with us remotely',
        body: [
          'We are a remote agency and do not have a New York office. Calls run in Eastern time, and we agree review windows ahead of every launch.',
          'Start with the free audit. It shows what is missing in your Klaviyo account and what to fix first.',
        ],
      },
    ],
    faqs: [
      { q: 'Do you have a New York office?', a: 'No. We are remote and say so. We work with New York brands in Eastern time through calls and shared documents.' },
      { q: 'Do you design emails for fashion brands?', a: 'Yes. Design is central to our work, and the portfolio shows campaign and flow emails built around each brand’s look.' },
      { q: 'Can you handle product drops?', a: 'Yes. We plan drop sequences with early-access segments, launch sends and follow-ups.' },
    ],
    nearby: ['usa', 'los-angeles', 'toronto', 'san-francisco'],
    terms: ['dynamic-content', 'email-template', 'vip-segment'],
    service: 'email-design',
  },
  {
    slug: 'los-angeles',
    kind: 'city',
    name: 'Los Angeles',
    country: 'United States',
    h1: 'Email marketing agency for Los Angeles ecommerce brands',
    metaTitle: 'Email Marketing Agency for Los Angeles Ecommerce Brands',
    metaDescription: 'Remote email marketing agency for Los Angeles ecommerce brands. Klaviyo flows for beauty, wellness and activewear. Free audit, no obligation.',
    answer: 'Inferno Emails is a remote email marketing agency for ecommerce brands in Los Angeles. We build Klaviyo flows and campaigns for the beauty, wellness and activewear brands that the city produces, and schedule calls in Pacific time. We have no Los Angeles office.',
    sections: [
      {
        heading: 'Creator-led brands and their audiences',
        body: [
          'Many Los Angeles brands grow from a founder or creator with a social following. That audience follows for content, and only part of it buys, so email has to turn followers into customers without losing the voice that attracted them.',
          'A strong welcome flow does most of that work, introducing the brand story before it asks for a first order.',
        ],
      },
      {
        heading: 'Beauty, wellness and activewear patterns',
        body: [
          'Products like skincare, supplements and apparel are bought again or collected, which makes replenishment, cross-sell and routine-based emails valuable. A customer who buys a cleanser may be ready for a moisturiser in a few weeks.',
          'We map those patterns for each category and build flows around when customers are likely to need the next product.',
        ],
      },
      {
        heading: 'Launches built around social moments',
        body: [
          'Launches often start on social, and email catches the people who clicked but did not buy. We build a launch segment for engaged subscribers, a send that reaches them early and a follow-up that handles the questions that stopped the others.',
          'We also keep an eye on frequency, so excited launches do not burn out the list.',
        ],
      },
      {
        heading: 'Keeping creator and affiliate sales honest',
        body: [
          'Creator codes, affiliate links and paid social all send traffic to the same store, so attribution gets muddy fast. We use consistent UTM tagging so you can separate what email earned from what a creator drove.',
          'That clarity stops email taking credit for sales it did not cause, and stops it being cut when it is quietly doing the work.',
        ],
      },
      {
        heading: 'Working with us remotely',
        body: [
          'We are a remote agency with no Los Angeles office. Calls are held in Pacific time, and approvals follow a shared plan.',
          'The free audit lists what is missing in your Klaviyo account and what to fix first, with no obligation.',
        ],
      },
    ],
    faqs: [
      { q: 'Do you have a Los Angeles office?', a: 'No. We are remote and say so. We work with Los Angeles brands in Pacific time.' },
      { q: 'Do you work with beauty and wellness brands?', a: 'Yes. These categories suit lifecycle email well, because customers reorder and add products over time.' },
      { q: 'Can you help convert social followers?', a: 'Yes. A welcome flow and a launch segment are the main tools for turning followers into buyers.' },
    ],
    nearby: ['san-francisco', 'usa', 'austin', 'vancouver'],
    terms: ['welcome-flow', 'replenishment-flow', 'cross-sell-email'],
    service: 'email-flows',
  },
  {
    slug: 'austin',
    kind: 'city',
    name: 'Austin',
    country: 'United States',
    h1: 'Email marketing agency for Austin ecommerce brands',
    metaTitle: 'Email Marketing Agency for Austin Ecommerce Brands',
    metaDescription: 'Remote email marketing agency for Austin ecommerce brands. Klaviyo flows and campaigns for food, outdoor and wellness brands. Free audit.',
    answer: 'Inferno Emails is a remote email marketing agency for ecommerce brands in Austin. We build Klaviyo flows and campaigns for food and drink, outdoor and wellness brands, working around Central time. We do not have an Austin office.',
    sections: [
      {
        heading: 'Growing brands that have outgrown the founder’s inbox',
        body: [
          'Many Austin brands start with a founder writing every email. That works until the list grows, and then the sends become irregular and the flows never get built.',
          'We build the automated foundation first, so the brand earns from email on the days nobody is writing a campaign.',
        ],
      },
      {
        heading: 'Food, outdoor and wellness categories',
        body: [
          'Food and drink, outdoor gear and wellness products share a pattern: customers reorder, gift and share. Subscription and replenishment flows, referral nudges and gift-season campaigns all fit.',
          'For food and drink in particular, we check shipping windows and seasonal availability so email never sells something that cannot arrive in time.',
        ],
      },
      {
        heading: 'Events and local moments',
        body: [
          'Austin runs on events, from spring festivals to autumn music weekends, and brands near those audiences can tie campaigns to them. We plan local moments without hiding the national calendar.',
          'A brand selling across the US should still build around the large seasons, with local touches on top.',
        ],
      },
      {
        heading: 'Gifting, subscriptions and the holiday rush',
        body: [
          'Food, drink and wellness brands often see a gifting peak in the last quarter. We plan order deadlines, gift messaging and shipping cut-offs into those emails, so a customer knows by when to order.',
          'If you offer subscriptions, we add churn-aware flows that deal with skipped or paused deliveries before a customer cancels.',
        ],
      },
      {
        heading: 'Working with us remotely',
        body: [
          'We are a remote agency with no Austin office. Calls are arranged in Central time, and work happens in Klaviyo and shared documents. Approvals follow a plan agreed in advance, so a launch never waits on a missed message.',
          'The free audit is the simplest way to see how we work, and it carries no obligation.',
        ],
      },
    ],
    faqs: [
      { q: 'Do you have an office in Austin?', a: 'No. We are a remote agency and say so. We work with Austin brands in Central time.' },
      { q: 'Do you work with food and drink brands?', a: 'Yes, and we pay attention to shipping windows and availability so emails do not overpromise.' },
      { q: 'Can you set up subscription or replenishment flows?', a: 'Yes. Replenishment reminders suit products that customers run out of, and we time them to the buying cycle.' },
    ],
    nearby: ['usa', 'los-angeles', 'san-francisco', 'new-york'],
    terms: ['replenishment-flow', 'subscription-churn', 'email-frequency-cap'],
    service: 'email-flows',
  },
  {
    slug: 'toronto',
    kind: 'city',
    name: 'Toronto',
    country: 'Canada',
    h1: 'Email marketing agency for Toronto ecommerce brands',
    metaTitle: 'Email Marketing Agency for Toronto Ecommerce Brands',
    metaDescription: 'Remote email marketing agency for Toronto ecommerce brands. Klaviyo flows built around CASL, CAD pricing and bilingual sending. Free audit.',
    answer: 'Inferno Emails is a remote email marketing agency for ecommerce brands in Toronto. We build Klaviyo flows and campaigns with CASL consent in mind, handle Canadian dollar pricing and cross-border shoppers, and schedule calls in Eastern time. We have no Toronto office.',
    sections: [
      {
        heading: 'A big market with a regulated inbox',
        body: [
          'Toronto is Canada’s largest retail market, and brands here often sell across the country. That makes CASL, the anti-spam law, a day-to-day concern, since consent must be established before commercial messages go out.',
          'We set up forms that record how and when each person opted in and review older lists to see whether consent can be shown.',
        ],
      },
      {
        heading: 'Selling across the border',
        body: [
          'Many Toronto brands sell into the United States, which brings currency, delivery time and duty questions. An email that shows a price in the wrong currency, or hides duties until checkout, loses the sale.',
          'We build flows that reflect where the customer is, with the right currency and clear delivery messaging.',
        ],
      },
      {
        heading: 'A multilingual audience',
        body: [
          'Toronto is one of the most diverse cities in the world, and brands often serve several language communities as well as French-speaking customers elsewhere in Canada. Segmentation by language can improve relevance.',
          'We build the structure and leave the translation to native speakers.',
        ],
      },
      {
        heading: 'Winter delivery and honest expectations',
        body: [
          'Canadian winters can slow deliveries, and a customer who is told to expect a parcel by Friday and gets it on Tuesday remembers. We build shipping messages that give honest windows and update them when conditions change.',
          'Clear expectations reduce support emails, and they protect the repeat purchase that email is meant to earn.',
        ],
      },
      {
        heading: 'Working with us remotely',
        body: [
          'We are a remote agency with no Toronto office. Calls are held in Eastern time, and we agree review windows before every launch.',
          'Start with the free audit, which lists what is missing in your Klaviyo account and carries no obligation.',
        ],
      },
    ],
    faqs: [
      { q: 'Do you have a Toronto office?', a: 'No. We are remote and say so. We work with Toronto brands in Eastern time through calls and shared documents.' },
      { q: 'Do you handle CASL?', a: 'We build consent capture and unsubscribe handling around CASL principles. Legal interpretation is for your lawyer.' },
      { q: 'Can you show prices in CAD?', a: 'Yes. Klaviyo and your store can pass currency through to emails, and we check it in testing.' },
    ],
    nearby: ['canada', 'vancouver', 'new-york', 'usa'],
    terms: ['double-opt-in', 'suppression-list', 'email-segmentation'],
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'vancouver',
    kind: 'city',
    name: 'Vancouver',
    country: 'Canada',
    h1: 'Email marketing agency for Vancouver ecommerce brands',
    metaTitle: 'Email Marketing Agency for Vancouver Ecommerce Brands',
    metaDescription: 'Remote email marketing agency for Vancouver ecommerce brands. Klaviyo flows for outdoor, activewear and wellness. Free audit, no obligation.',
    answer: 'Inferno Emails is a remote email marketing agency for ecommerce brands in Vancouver. We build Klaviyo flows and campaigns for outdoor, activewear and wellness brands, and schedule calls in Pacific time. We have no Vancouver office.',
    sections: [
      {
        heading: 'Outdoor and activewear heritage',
        body: [
          'Vancouver has a strong tradition in outdoor and activewear brands, and customers here are knowledgeable and quick to compare. Product education and honest detail work better than hype.',
          'We build post-purchase flows that teach customers how to care for and get the most from what they bought, which supports repeat purchases and fewer returns.',
        ],
      },
      {
        heading: 'Weather shapes the calendar',
        body: [
          'Seasonal categories follow the weather, and Pacific Northwest weather is changeable. Email can respond with segments for rain gear, trail season or winter sport, based on browsing and purchase history.',
          'We plan the year around those seasons and keep the Black Friday and Boxing Day weeks well prepared.',
        ],
      },
      {
        heading: 'Canadian consent and a US neighbour',
        body: [
          'CASL applies to Canadian lists, so consent records matter. Many Vancouver brands also sell to customers in Washington and beyond, so US rules apply to part of the list as well.',
          'We keep both in mind when building forms and flows, so one list does not break either set of rules.',
        ],
      },
      {
        heading: 'Fit, sizing and returns education',
        body: [
          'For apparel and gear, returns often come from fit and use, not defects. A post-purchase email that explains sizing, care and how to get started can prevent a return, and it keeps the customer on good terms.',
          'We build these into the first weeks after delivery, timed to when the product has arrived and been tried.',
        ],
      },
      {
        heading: 'Working with us remotely',
        body: [
          'We are a remote agency without a Vancouver office. Calls are held in Pacific time, which suits Vancouver working hours, and every launch gets a review window agreed ahead of the send.',
          'The free audit shows what to fix first in your Klaviyo account, with no obligation, and you keep the findings whether or not we work together.',
        ],
      },
    ],
    faqs: [
      { q: 'Do you have a Vancouver office?', a: 'No. We are remote and say so. We work with Vancouver brands in Pacific time.' },
      { q: 'Do you work with outdoor brands?', a: 'Yes. Product education and seasonal segmentation suit outdoor and activewear categories well.' },
      { q: 'Can you handle sales into the US?', a: 'Yes. We plan currency, delivery and consent for brands that sell on both sides of the border.' },
    ],
    nearby: ['canada', 'toronto', 'san-francisco', 'usa'],
    terms: ['post-purchase-flow', 'email-segmentation', 'browse-abandonment-flow'],
    service: 'retention-strategy',
  },
  {
    slug: 'london',
    kind: 'city',
    name: 'London',
    country: 'United Kingdom',
    h1: 'Email marketing agency for London ecommerce brands',
    metaTitle: 'Email Marketing Agency for London Ecommerce Brands',
    metaDescription: 'Remote email marketing agency for London ecommerce brands. Klaviyo flows and campaigns for fashion, beauty and food. Free audit, no obligation.',
    answer: 'Inferno Emails is a remote email marketing agency for ecommerce brands in London. We build Klaviyo flows and campaigns for fashion, beauty and food brands, following UK consent rules and writing in British English. We do not have a London office, though our work has shipped across Europe.',
    sections: [
      {
        heading: 'A crowded, sophisticated inbox',
        body: [
          'London shoppers are used to well-designed email from well-funded brands, so standards are high. Generic templates and constant discounts stand out for the wrong reasons.',
          'We design around your brand and focus on relevance, so customers hear about what suits them and not everything at once.',
        ],
      },
      {
        heading: 'Fashion, beauty and food',
        body: [
          'London is a centre for fashion, beauty and food and drink brands. Each has a different pattern: fashion lives on drops and seasons, beauty on routines and reorders, food and drink on gifting and subscriptions.',
          'We build the flows that fit your category, from replenishment reminders to early-access segments.',
        ],
      },
      {
        heading: 'UK rules and dates',
        body: [
          'PECR and UK GDPR set the consent rules, with a limited soft opt-in for existing customers. We build consent capture at checkout and signup, keep suppression lists clean and set up clear unsubscribes.',
          'The calendar matters too. Mothering Sunday sits in spring, Boxing Day and January sales are major, and Christmas delivery cut-offs need to be in every December email.',
        ],
      },
      {
        heading: 'Delivery promises and consumer rights',
        body: [
          'UK online shoppers have a statutory cancellation window, and clear returns information is a trust signal as well as a legal expectation. Emails should state the delivery estimate and the returns route in plain words.',
          'We include both in order, shipping and post-purchase emails, and keep the wording consistent across flows so it never contradicts the site.',
        ],
      },
      {
        heading: 'Working with us remotely',
        body: [
          'We are a remote agency and do not have a London office. Calls are held in UK working hours.',
          'The free audit lists what is missing in your Klaviyo account and what to fix first, with no obligation.',
        ],
      },
    ],
    faqs: [
      { q: 'Do you have a London office?', a: 'No. We are remote and say so. We work with London brands in UK hours through calls and shared documents.' },
      { q: 'Do you write in British English?', a: 'Yes. Spelling, tone, dates and price formats follow UK conventions.' },
      { q: 'Can you plan Christmas delivery cut-offs?', a: 'Yes. We build delivery deadlines into the December calendar and flows so customers know when to order by.' },
    ],
    nearby: ['united-kingdom', 'paris', 'berlin', 'new-york'],
    terms: ['double-opt-in', 'dynamic-content', 'replenishment-flow'],
    service: 'email-design',
  },
  {
    slug: 'berlin',
    kind: 'city',
    name: 'Berlin',
    country: 'Germany',
    h1: 'Email marketing agency for Berlin ecommerce brands',
    metaTitle: 'Email Marketing Agency for Berlin Ecommerce Brands',
    metaDescription: 'Remote email marketing agency for Berlin ecommerce brands. Klaviyo flows built around DSGVO and double opt-in. Free audit, no obligation.',
    answer: 'Inferno Emails is a remote email marketing agency for ecommerce brands in Berlin. We build Klaviyo flows around DSGVO and double opt-in, plan for German payment habits and work with native speakers for copy. We do not have a Berlin office.',
    sections: [
      {
        heading: 'Startup speed with strict rules',
        body: [
          'Berlin is full of fast-moving direct-to-consumer brands, often in fashion, sustainable goods and food. They grow quickly, and German consent law does not bend to speed.',
          'We build the double opt-in, consent record and Impressum link into the foundation so growth does not create compliance debt.',
        ],
      },
      {
        heading: 'Sustainable and conscious brands',
        body: [
          'Many Berlin brands sell on values such as sustainability, repair and transparency. Customers will check those claims, so emails should be specific and avoid vague green language.',
          'We help write plain explanations of what the brand actually does, which suits the German preference for facts.',
        ],
      },
      {
        heading: 'Payment and returns in the flows',
        body: [
          'Invoice payment, direct debit and PayPal are common, and returns are normal. Cart flows should mention the payment options you offer, and post-purchase emails should make returns clear.',
          'Buy-now-pay-later options can also change what customers do at checkout, so we check which methods are shown in emails.',
        ],
      },
      {
        heading: 'Data processing and the tools you use',
        body: [
          'DSGVO expects a data processing agreement with the vendors that handle your customers’ data, and your email platform is one of them. Ask for it, keep a copy and record which tools connect to your list.',
          'We document which apps feed Klaviyo and which data they pass, so your privacy notice matches what actually happens.',
        ],
      },
      {
        heading: 'Working with us remotely',
        body: [
          'We are a remote agency and have no Berlin office. Calls run in your working hours, and a native German speaker should review the copy before anything is scheduled.',
          'The free audit is the best first step. It reviews your flows, consent set-up and list health, and it carries no obligation.',
        ],
      },
    ],
    faqs: [
      { q: 'Do you have a Berlin office?', a: 'No. We are remote and say so. We work with Berlin brands in European hours.' },
      { q: 'Do you set up double opt-in?', a: 'Yes. We build the confirmation email, store the consent record and keep it in Klaviyo, so you can show when and how each person agreed.' },
      { q: 'Who writes the German copy?', a: 'We recommend a native speaker, either on your team or one you nominate. We build the templates and logic around it.' },
    ],
    nearby: ['germany', 'london', 'paris', 'united-kingdom'],
    terms: ['double-opt-in', 'preheader-text', 'post-purchase-flow'],
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'paris',
    kind: 'city',
    name: 'Paris',
    country: 'France',
    h1: 'Email marketing agency for Paris ecommerce brands',
    metaTitle: 'Email Marketing Agency for Paris Ecommerce Brands',
    metaDescription: 'Remote email marketing agency for Paris ecommerce brands. Klaviyo flows for fashion, beauty and gourmet food, built around CNIL rules. Free audit.',
    answer: 'Inferno Emails is a remote email marketing agency for ecommerce brands in Paris. We build Klaviyo flows and campaigns for fashion, beauty and food brands, following CNIL consent principles and the expectation of French-language communication. We have no Paris office.',
    sections: [
      {
        heading: 'Design and restraint',
        body: [
          'Paris brands in fashion, beauty and gourmet food are known for taste, and customers notice when email does not match. Restraint often beats volume: fewer, better emails with strong photography and clear typography.',
          'We design around your brand’s look and keep layout calm so the product does the talking.',
        ],
      },
      {
        heading: 'French language and tone',
        body: [
          'French customers expect email in French, with the right level of formality for the brand. Tone matters, and a direct translation of an English template rarely feels right.',
          'We build the structure and language fields, and recommend a native speaker writes the copy.',
        ],
      },
      {
        heading: 'Soldes and gifting seasons',
        body: [
          'The regulated winter and summer sale periods, the soldes, set the rhythm of the retail year. Gifting seasons and local dates such as Fête des mères also matter, and they differ from UK and US dates.',
          'We plan the calendar around French dates and treat the promotional rules as something to check with an adviser.',
        ],
      },
      {
        heading: 'Protecting a premium image',
        body: [
          'Constant discounting can undermine a premium brand. We test alternatives such as early access, a story behind a product or a thoughtful gift note, so promotion does not cheapen the brand.',
          'Where a sale is part of the calendar, we keep the creative calm and consistent with the rest of the brand.',
        ],
      },
      {
        heading: 'Working with us remotely',
        body: [
          'We are a remote agency with no Paris office. Calls run in your working hours, and approvals follow a shared plan.',
          'The free audit lists what is missing in your Klaviyo account and what to fix first, with no obligation, and you keep the findings either way.',
        ],
      },
    ],
    faqs: [
      { q: 'Do you have an office in Paris?', a: 'No. We are remote and say so. We work with Paris brands in European hours.' },
      { q: 'Can you design for luxury and beauty brands?', a: 'Yes. Design is central to our work, and the portfolio shows how emails can take on each brand’s look, from type and colour to photography and tone.' },
      { q: 'Who writes the French copy?', a: 'We recommend a native speaker. We build the templates, language fields and logic around it.' },
    ],
    nearby: ['france', 'london', 'berlin', 'germany'],
    terms: ['email-template', 'dynamic-content', 'email-segmentation'],
    service: 'email-design',
  },
];

export const getLocation = (slug: string) => LOCATIONS.find((l) => l.slug === slug);
export const countries = () => LOCATIONS.filter((l) => l.kind === 'country');
export const cities = () => LOCATIONS.filter((l) => l.kind === 'city');
export const citiesIn = (country: string) => LOCATIONS.filter((l) => l.kind === 'city' && l.country === country);
