/**
 * Single source of truth for brand, navigation and marketing content.
 *
 * CONTENT RULE: everything in this file is either (a) taken from the old
 * site, (b) read off the client's own watermarked Klaviyo screenshots in
 * /public/images, or (c) a description of process. No revenue figure,
 * client count or ROI multiple is invented. If you add a claim here, make
 * sure you can screenshot it.
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'https://infernoemails.com'
).replace(/\/$/, '');

export const SITE = {
  name: 'Inferno Emails',
  legalName: 'Inferno Emails',
  tagline: 'Email & retention marketing for ecommerce brands',
  description:
    'Inferno Emails is an email marketing agency for ecommerce brands. We build Klaviyo flows, design campaigns that look like your brand, and fix deliverability so the revenue actually lands.',
  email: 'hello@infernoemails.com',
  instagram: 'https://www.instagram.com/infernoemails/',
  /** Booking link for the free audit call. Every audit CTA points here. */
  calendly: 'https://calendly.com/infernoemails/new-meeting',
  linkedin: 'https://www.linkedin.com/company/infernoemails/',
  founded: '2022',
  locale: 'en_US',
  /** Where the work has shipped. Read off the About copy, not invented. */
  regions: ['Europe', 'Australia', 'United States'],
} as const;

/**
 * Last substantive content edit to the static marketing pages. Feeds the
 * sitemap lastModified for those routes so crawlers get an honest date
 * instead of "now" on every request. Bump it when copy changes.
 */
export const CONTENT_UPDATED = '2026-09-10';

/**
 * The extractable one-paragraph answer to "what is Inferno Emails?".
 * Answer engines quote direct statements, not scene-setting, so this sits
 * in the first screen of body copy and in llms.txt. Every clause is
 * already stated elsewhere on the site.
 */
export const QUICK_ANSWER = `${SITE.description} Founded in ${SITE.founded}, working with ecommerce brands in Europe, Australia and the United States. The first step is a free, no-obligation audit of your account.`;

/* ------------------------------------------------------------------ *
 * Navigation
 * ------------------------------------------------------------------ */

/**
 * The marketing site is a single page. Nav entries are in-page anchors,
 * written absolute (`/#services`) rather than bare (`#services`) so they
 * still resolve when the visitor is on /blog. The blog is the one route
 * that gets a page of its own.
 */
export const NAV = [
  { label: 'Services', href: '/services' },
  { label: 'Work', href: '/work' },
  { label: 'About', href: '/#about' },
  { label: 'Blog', href: '/blog' },
] as const;

/** Section ids the nav scroll-spy watches, in document order. */
export const NAV_SECTIONS = [
  'services',
  'work',
  'about',
  'faq',
  'contact',
] as const;

export const FOOTER_NAV = [
  {
    title: 'What we do',
    links: [
      { label: 'Klaviyo email marketing', href: '/services/klaviyo-email-marketing' },
      { label: 'Email design', href: '/services/email-design' },
      { label: 'Email flows & automation', href: '/services/email-flows' },
      { label: 'Email deliverability', href: '/services/email-deliverability' },
      { label: 'Retention strategy', href: '/services/retention-strategy' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/#about' },
      { label: 'Work', href: '/work' },
      { label: 'Blog', href: '/blog' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
  {
    title: 'Start here',
    links: [
      { label: 'Book a free audit', href: SITE.calendly, external: true },
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Terms of service', href: '/terms' },
    ],
  },
] as const;

/* ------------------------------------------------------------------ *
 * Services. Each maps to its own indexable page targeting a distinct
 * high-intent keyword.
 * ------------------------------------------------------------------ */

export type Service = {
  slug: string;
  index: string;
  title: string;
  navTitle: string;
  keyword: string;
  summary: string;
  metaTitle: string;
  metaDescription: string;
  /**
   * GEO quick answer. A direct, two-sentence definition of the service
   * that an answer engine can lift verbatim: what the thing is, then what
   * we do about it. Rendered as the first paragraph under the H1.
   */
  answer: string;
  intro: string;
  deliverables: string[];
  outcome: string;
  faqs: { q: string; a: string }[];
};

export const SERVICES: Service[] = [
  {
    slug: 'klaviyo-email-marketing',
    index: '01',
    title: 'Klaviyo email marketing',
    navTitle: 'Klaviyo email marketing',
    keyword: 'Klaviyo email marketing agency',
    summary:
      'Flows and campaigns built in Klaviyo, mapped to how people actually buy from you, not a template pack dropped into your account.',
    metaTitle: 'Klaviyo Email Marketing Agency',
    metaDescription:
      'We build and manage Klaviyo email marketing for ecommerce brands: welcome, abandoned cart, post-purchase and winback flows, plus a weekly campaign calendar.',
    answer:
      'Klaviyo email marketing management means an agency runs your Klaviyo account end to end: flow strategy and build, a weekly campaign calendar, segmentation, testing and reporting against attributed revenue. Inferno Emails does this for ecommerce brands that have Klaviyo installed and are not getting much out of it.',
    intro:
      'Most stores have Klaviyo installed and three half-finished flows in it. The money is in the gap between installed and actually running. We take the account over, map every point where someone hesitates, and build a flow for each one, then keep a campaign calendar moving on top of it.',
    deliverables: [
      'Full Klaviyo account audit and clean-up',
      'Core flow build: welcome, abandoned cart, browse abandonment, post-purchase, winback',
      'Segmentation by engagement, purchase history and lifecycle stage',
      'Weekly campaign calendar, written and designed',
      'A/B tests on subject lines, offers and send times',
      'Monthly reporting against attributed revenue, not opens',
    ],
    outcome:
      'A Klaviyo account where flows earn while you sleep and campaigns have a reason to exist.',
    faqs: [
      {
        q: 'Do you work with platforms other than Klaviyo?',
        a: 'Klaviyo is where we do our best work and where most of our clients already are. We have worked in Mailchimp, Omnisend and Shopify Email, and we will migrate you to Klaviyo if it makes sense, but we will tell you honestly if your current setup is fine.',
      },
      {
        q: 'How long before flows are live?',
        a: 'The core flow set is typically live within the first two to three weeks, depending on how fast brand assets and approvals come back. Campaigns usually start in week one, because those do not need to wait on the full build.',
      },
      {
        q: 'Do I need a big list for this to work?',
        a: 'No. Flows are triggered by behaviour, so they work on a small list from day one. If your list is small we will also work on capture: pop-ups, sign-up incentives and segmentation, so the list grows while the flows run.',
      },
    ],
  },
  {
    slug: 'email-design',
    index: '02',
    title: 'Email design',
    navTitle: 'Email design',
    keyword: 'ecommerce email design agency',
    summary:
      'Emails designed to look like your brand rather than like an email. Every campaign in our portfolio was built from scratch.',
    metaTitle: 'Ecommerce Email Design Agency',
    metaDescription:
      'Custom email design for ecommerce brands. Every campaign and flow email is drawn from scratch in your brand, with no template packs. Built to render everywhere.',
    answer:
      'Ecommerce email design is the work of turning a brand\'s identity into campaign and flow emails that render correctly in every inbox. Inferno Emails designs every email from scratch for the brand it belongs to, with no template packs, and tests each one across Gmail, Apple Mail, Outlook and mobile clients.',
    intro:
      'A template with your logo dropped in the corner still looks like a template, and customers can tell. We design each email around the brand it belongs to: your type, your colour, your photography, your tone. The portfolio on this site is the whole argument. Look at the Girafon Bleu welcome email next to the Bondi Coffee one and you would not guess the same team made both.',
    deliverables: [
      'Custom design for every campaign and flow email',
      'Brand-matched type, colour and layout system',
      'Mobile-first layouts, because most of your list reads on a phone',
      'Dark-mode safe colour and image handling',
      'Bulletproof buttons and live text where it matters for accessibility',
      'Tested across Gmail, Apple Mail, Outlook and mobile clients',
    ],
    outcome:
      'Emails people screenshot and forward, instead of ones they scroll past on the way to the delete button.',
    faqs: [
      {
        q: 'Do you use templates?',
        a: 'We build a reusable design system for your brand so production stays fast, but the layouts are drawn for you. We do not buy or resell template packs.',
      },
      {
        q: 'Can you match our existing brand guidelines?',
        a: 'Yes. Send them over and we will work inside them. If you do not have guidelines, we will infer a system from your site and product photography and document it as we go.',
      },
      {
        q: 'Will the emails work in dark mode?',
        a: 'Yes. We handle dark mode explicitly: logos get transparent or inverted variants, background colours are chosen so they do not invert badly, and we test in the clients that force dark mode rather than hoping for the best.',
      },
    ],
  },
  {
    slug: 'email-deliverability',
    index: '03',
    title: 'Email deliverability',
    navTitle: 'Email deliverability',
    keyword: 'email deliverability agency',
    summary:
      'The best offer in the world earns nothing from the spam folder. Authentication, reputation and list hygiene, handled.',
    metaTitle: 'Email Deliverability Services',
    metaDescription:
      'Email deliverability for ecommerce brands: SPF, DKIM and DMARC setup, sender reputation repair, list hygiene and inbox placement monitoring.',
    answer:
      'Email deliverability is whether your emails reach the inbox rather than the spam folder or the promotions tab. Inferno Emails fixes it for ecommerce brands by configuring SPF, DKIM and DMARC, repairing sender reputation, cleaning the list and monitoring inbox placement.',
    intro:
      'Deliverability is the least glamorous part of email and the one that quietly decides whether any of the rest of it matters. If Gmail has decided you are promotional noise, your best campaign of the year lands in a tab nobody opens. We fix the technical foundation first, then keep it clean.',
    deliverables: [
      'SPF, DKIM and DMARC configured and verified',
      'Dedicated or shared sending decision, made on your actual volume',
      'Sender reputation diagnosis and warm-up plan where needed',
      'List hygiene: suppression of hard bounces, spam traps and long-dead contacts',
      'Sunset and re-engagement flows so dead weight stops dragging you down',
      'Ongoing inbox placement and complaint-rate monitoring',
    ],
    outcome:
      'Emails that reach the inbox, so campaign performance reflects the offer rather than the filter.',
    faqs: [
      {
        q: 'How do I know if I have a deliverability problem?',
        a: 'The usual signs are open rates falling steadily over months, a widening gap between delivered and opened, complaint rates above 0.1%, or revenue dropping while send volume stays flat. Our free audit checks your authentication records and flags these.',
      },
      {
        q: 'How long does it take to fix a damaged sender reputation?',
        a: 'Authentication problems are fixed in days. Reputation repair is slower: typically four to eight weeks of disciplined sending to engaged segments while the damaged history ages out. Anyone promising a fix in a week is guessing.',
      },
      {
        q: 'Will cleaning my list hurt my revenue?',
        a: 'Suppressing unengaged contacts almost always raises revenue, not lowers it. Those contacts were not buying; they were dragging your reputation down and taking the engaged ones with them into the promotions tab.',
      },
    ],
  },
  {
    slug: 'retention-strategy',
    index: '04',
    title: 'Retention strategy',
    navTitle: 'Retention strategy',
    keyword: 'ecommerce retention marketing agency',
    summary:
      'One-time buyers are fine. Repeat buyers are the business. We build the lifecycle that turns the first into the second.',
    metaTitle: 'Ecommerce Retention Marketing Agency',
    metaDescription:
      'Retention marketing for ecommerce brands: lifecycle mapping, post-purchase sequences, replenishment timing, VIP segmentation and winback sequences.',
    answer:
      'Retention marketing is the plan for earning a customer\'s second, third and fourth order instead of paying to acquire a new one. Inferno Emails builds it in email: lifecycle mapping, post-purchase and replenishment sequences, VIP segmentation and winback, reported on repeat rate and revenue per recipient.',
    intro:
      'Paid acquisition gets more expensive every year. The customers you already paid for are the cheapest revenue in your business, and most stores do almost nothing with them after the shipping confirmation. Retention strategy is the plan for that second, third and fourth purchase.',
    deliverables: [
      'Lifecycle map: every stage from first click to loyal repeat buyer',
      'Post-purchase sequences that set up the next order rather than ending the conversation',
      'Replenishment timing modelled on your actual repurchase intervals',
      'VIP and high-LTV segmentation with treatment that matches',
      'Winback sequences that catch people before they are gone for good',
      'Reporting on repeat rate and revenue per recipient, not vanity metrics',
    ],
    outcome:
      'A larger share of revenue coming from people who already trust you, which is the cheapest growth available.',
    faqs: [
      {
        q: 'Is retention worth it if we are still small?',
        a: 'Yes, and arguably more so. Small brands feel rising ad costs hardest, and a repeat purchase costs you an email instead of a click. The systems are also cheaper to build before your catalogue and data get complicated.',
      },
      {
        q: 'How is this different from just sending more emails?',
        a: 'Sending more emails without a lifecycle plan burns your list and your reputation. Retention strategy decides who hears from you, when, and about what, so volume goes to the people ready for it.',
      },
      {
        q: 'What do you measure?',
        a: 'Repeat purchase rate, revenue per recipient, time between orders and share of total revenue attributed to email. Opens and clicks are diagnostics, not goals.',
      },
    ],
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);

/* ------------------------------------------------------------------ *
 * Proof, read directly off the client's own watermarked Klaviyo
 * dashboard exports. Captions state the exact metric and window shown
 * in each screenshot. Do not round these up.
 * ------------------------------------------------------------------ */

export type Proof = {
  image: string;
  width: number;
  height: number;
  alt: string;
  headline: string;
  metric: string;
  window: string;
  note: string;
};

export const PROOF: Proof[] = [
  {
    image: '/images/proof-klaviyo-996k.png',
    width: 1304,
    height: 553,
    alt: 'Klaviyo business performance summary showing $996,568.72 total revenue and $477,929.14 attributed to email between 4 September and 4 November 2023',
    headline: '$477,929 attributed to email',
    metric: '47.96% of total revenue',
    window: '4 Sep - 4 Nov 2023',
    note: 'Total store revenue up 47% against the previous period. Campaigns drove $316,870; flows drove $161,058.',
  },
  {
    image: '/images/proof-klaviyo-220k.png',
    width: 1245,
    height: 582,
    alt: 'Klaviyo business performance summary showing $220,628.81 total revenue and $98,625.63 attributed to email between 30 December 2022 and 30 January 2023',
    headline: '$98,625 attributed to email',
    metric: '44.7% of total revenue',
    window: '30 Dec 2022 - 30 Jan 2023',
    note: 'Attributed revenue up 39% against the previous period, with flows out-earning campaigns roughly two to one.',
  },
  {
    image: '/images/proof-klaviyo-gbp.png',
    width: 1188,
    height: 542,
    alt: 'Klaviyo business performance summary showing £20,313.58 total revenue and £9,100.94 attributed to email between 30 May and 26 November 2023',
    headline: '£9,100 attributed to email',
    metric: '44.8% of total revenue',
    window: '30 May - 26 Nov 2023',
    note: 'Email-attributed revenue more than doubled year on year, up 104%, in a period where the store’s overall revenue fell.',
  },
];

/* ------------------------------------------------------------------ *
 * Clients and testimonials, carried over from the previous site, lightly
 * copy-edited for grammar only. Wording and meaning are unchanged.
 * ------------------------------------------------------------------ */

export const CLIENTS = [
  { name: 'KÍLÈNTÀR', logo: '/images/client-kilentar.png', width: 251, height: 53 },
  { name: 'Girafon Bleu', logo: '/images/client-girafon.png', width: 290, height: 379 },
  { name: 'Bondi Coffee', logo: '/images/client-bondi.png', width: 160, height: 61 },
  { name: 'The Nikos Knife', logo: '/images/client-nikos-knife.png', width: 209, height: 32 },
  { name: 'Iced Plunge', logo: '/images/client-iced-plunge.png', width: 300, height: 114 },
  { name: 'Future Nurse Bundle', logo: '/images/client-future-nurse.png', width: 478, height: 109 },
] as const;

export type Testimonial = {
  quote: string;
  author: string;
  role: string;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'I never thought email marketing could bring us that big a share of revenue.',
    author: 'Girafon Bleu',
    role: 'Apparel, France',
  },
  {
    quote:
      'Their email design made me reconsider and revamp our whole site.',
    author: 'Bondi Coffee',
    role: 'Coffee, Australia',
  },
  {
    quote:
      'They understood our vision from day one and led an amazing jump in revenue.',
    author: 'Kuchenkompane',
    role: 'Bakery, Germany',
  },
];

/* ------------------------------------------------------------------ *
 * Portfolio: real campaign creative shipped for real clients.
 * ------------------------------------------------------------------ */

export type WorkItem = {
  slug: string;
  client: string;
  title: string;
  type: string;
  image: string;
  width: number;
  height: number;
  alt: string;
  note: string;
};

export const WORK: WorkItem[] = [
  {
    slug: 'kilentar-welcome',
    client: 'KÍLÈNTÀR',
    title: 'Welcome email',
    type: 'Welcome flow',
    image: '/images/work-kilentar.png',
    width: 600,
    height: 2500,
    alt: 'KÍLÈNTÀR welcome email opening on a red-carpet photograph of three women in handcrafted pieces, followed by a first-order discount code, a twelve-piece product grid and a Slaying in a Different Styles editorial section',
    note: 'Welcome flow for the London luxury house of Michelle Adepoju, Forbes 30 Under 30 Europe 2025. Runway imagery earns the scroll before the code.',
  },
  {
    slug: 'girafon-bleu-welcome',
    client: 'Girafon Bleu',
    title: 'Welcome email',
    type: 'Welcome flow',
    image: '/images/work-girafon.png',
    width: 600,
    height: 2189,
    alt: 'Girafon Bleu welcome email in orange and blue, introducing the brand with a 10% welcome code and pre-order product cards',
    note: 'Brand-forward welcome that leads with the mission before the discount code.',
  },
  {
    slug: 'bondi-coffee-campaign',
    client: 'Bondi Coffee',
    title: 'Campaign email',
    type: 'Campaign',
    image: '/images/work-bondi.png',
    width: 600,
    height: 2516,
    alt: 'Bondi Coffee campaign email featuring product photography and a clear call to action',
    note: 'Clean product-led layout designed to survive dark mode intact.',
  },
  {
    slug: 'kuchenkompane-mothers-day',
    client: 'Kuchenkompane',
    title: 'Mother’s Day campaign',
    type: 'Seasonal campaign',
    image: '/images/work-kuchenkompane.png',
    width: 600,
    height: 2282,
    alt: 'Kuchenkompane Mother’s Day campaign email with seasonal styling and gift product cards',
    note: 'Seasonal campaign built around a single gifting decision.',
  },
  {
    slug: 'nikos-knife-welcome',
    client: 'The Nikos Knife',
    title: 'Welcome sequence',
    type: 'Welcome flow',
    image: '/images/work-nikos-welcome.png',
    width: 1200,
    height: 5666,
    alt: 'The Nikos Knife long-form welcome email introducing the product story and craftsmanship',
    note: 'Long-form welcome for a considered, higher-ticket product.',
  },
  {
    slug: 'femmenal-campaign',
    client: 'Femmenal',
    title: 'Campaign email',
    type: 'Campaign',
    image: '/images/work-femmenal.png',
    width: 600,
    height: 2825,
    alt: 'Femmenal campaign email with editorial layout and product benefit sections',
    note: 'Editorial pacing: benefit, proof, offer, in that order.',
  },
  {
    slug: 'iced-plunge-welcome',
    client: 'Iced Plunge',
    title: 'Welcome email',
    type: 'Welcome flow',
    image: '/images/work-iced-plunge.png',
    width: 600,
    height: 1951,
    alt: 'Iced Plunge welcome email in teal showing the ice bath range, a WELCOME10 code valid for seven days, and three benefit icons for performance, immunity and stress',
    note: 'Single-product welcome with a dated code, so the first order has a reason to happen this week.',
  },
  {
    slug: 'future-nurse-welcome',
    client: 'The Future Nurse Bundle',
    title: 'Welcome email',
    type: 'Welcome flow',
    image: '/images/work-the-future-nurse-bundle.png',
    width: 600,
    height: 2165,
    alt: 'The Future Nurse Bundle welcome email in red and blue showing the printed and digital study guides, a FAMILY10 discount code, and instant, safe and economic benefit icons',
    note: 'Digital-product welcome that says what the list will send before it asks for the sale.',
  },
  {
    slug: 'next-step-funded-campaign',
    client: 'Next Step Funded',
    title: 'Campaign email',
    type: 'Campaign',
    image: '/images/work-next-step-funded.png',
    width: 600,
    height: 1674,
    alt: 'Next Step Funded campaign email in green showing three funded trading account tiers with pricing and rules, a Discord invitation, and a five-star Trustpilot review',
    note: 'Three price tiers, one decision, and a real review carrying the trust underneath.',
  },
];

export const getWork = (slug: string) => WORK.find((w) => w.slug === slug);

/* ------------------------------------------------------------------ *
 * Process
 * ------------------------------------------------------------------ */

export const PROCESS = [
  {
    index: '01',
    title: 'Audit',
    body:
      'We go into your account before we pitch you anything. Flow coverage, list health, authentication records, segment quality, what your last ninety days actually earned. You get the findings whether or not you hire us.',
  },
  {
    index: '02',
    title: 'Build',
    body:
      'Core flows first, because they compound while everything else is still being approved. Then the campaign calendar, designed in your brand, with a reason behind each send rather than a slot to fill.',
  },
  {
    index: '03',
    title: 'Compound',
    body:
      'Test, cut what loses, scale what wins. Monthly reporting against attributed revenue and repeat rate. The account should be worth more every quarter than it was the last one.',
  },
] as const;

/* ------------------------------------------------------------------ *
 * FAQs for the home page. Emitted as FAQPage JSON-LD for rich results.
 * ------------------------------------------------------------------ */

export const HOME_FAQS = [
  {
    q: 'What does Inferno Emails do?',
    a: 'We run email and retention marketing for ecommerce brands. That means building and managing Klaviyo flows and campaigns, designing every email from scratch in your brand, fixing deliverability so those emails reach the inbox, and building the lifecycle that turns first-time buyers into repeat customers.',
  },
  {
    q: 'What size brand do you work with?',
    a: 'Mostly ecommerce brands doing consistent monthly revenue who have Klaviyo installed but are not getting much out of it. If you are pre-revenue or have no list yet, we are probably the wrong spend for you right now, and we will say so.',
  },
  {
    q: 'How much does email marketing management cost?',
    a: 'It depends on scope: flow build only, full management, or design support alongside your in-house team. We quote after the audit, because quoting before it would be a guess. The audit itself is free.',
  },
  {
    q: 'How long until we see results?',
    a: 'Campaigns can start earning in the first few weeks. Flows compound over months as more people enter them. Deliverability repair, where it is needed, typically takes four to eight weeks. Anyone promising a fixed number by a fixed date has not looked at your account.',
  },
  {
    q: 'Do you only work in Klaviyo?',
    a: 'Klaviyo is where we do our best work and where most ecommerce brands already are. We have worked in Mailchimp, Omnisend and Shopify Email too, and we can migrate you if it makes sense.',
  },
  {
    q: 'What happens on the free email audit?',
    a: 'You send us access or screenshots, we review your flows, list health, authentication records and last ninety days of performance, and we send back what we found and what we would do about it. No obligation, and the findings are yours to keep.',
  },
] as const;

/* ------------------------------------------------------------------ *
 * Beliefs. Statements of how the team works, not biography. No invented
 * headcount, awards or founder story — see CONTENT.md for the details
 * only the client can supply.
 * ------------------------------------------------------------------ */

export const BELIEFS = [
  {
    index: '01',
    title: 'Attributed revenue, or it did not happen',
    body:
      'Opens are a diagnostic. Clicks are a diagnostic. The number that decides whether we earned our fee is how much revenue the channel attributed this month, and whether it is bigger than last month. We report on that first, every time.',
  },
  {
    index: '02',
    title: 'Templates are a tax on your brand',
    body:
      'A layout that has been sold to four hundred other stores does not stop looking like a layout that has been sold to four hundred other stores. We draw every email for the brand it belongs to. It costs us more time. It is the whole job.',
  },
  {
    index: '03',
    title: 'The boring part decides the exciting part',
    body:
      'Authentication records, list hygiene, sunset flows, send-time discipline. None of it is fun to talk about on a sales call, and all of it determines whether your best campaign of the year gets seen at all.',
  },
  {
    index: '04',
    title: 'We tell you when the answer is no',
    body:
      'If your list is too small to justify the spend, or the problem is your offer rather than your email, we will say so on the audit call. Selling you a retainer you should not buy is a bad month for you and a bad year for us.',
  },
] as const;

export const GOOD_FIT = [
  'Ecommerce brands with consistent monthly revenue and an existing list',
  'Klaviyo already installed, and visibly under-used',
  'A brand with a real point of view that templates are flattening',
  'Teams who want one partner owning the channel, not four suppliers',
  'Founders who will look at an attributed-revenue number honestly',
] as const;

export const BAD_FIT = [
  'Pre-revenue stores with no list to email yet',
  'Anyone looking for a one-off template pack and no strategy',
  'Brands whose core problem is the product or the offer, not the channel',
  'Businesses that want to buy or scrape a list, which we will not send to',
  'Anyone who needs a guaranteed revenue figure promised before the audit',
] as const;

/* ------------------------------------------------------------------ *
 * The free audit: what the call actually covers.
 * ------------------------------------------------------------------ */

export const AUDIT_CHECKS = [
  {
    index: '01',
    title: 'Flow coverage',
    body:
      'Which of the money flows exist, which are half-built, and which are quietly switched off. Welcome, abandoned cart, browse abandonment, post-purchase, winback.',
  },
  {
    index: '02',
    title: 'List health',
    body:
      'Engagement decay, share of your list that has not opened in six months, suppression hygiene, and whether unengaged contacts are dragging your reputation down.',
  },
  {
    index: '03',
    title: 'Deliverability',
    body:
      'SPF, DKIM and DMARC records checked and verified. Complaint and bounce rates against the thresholds Gmail and Outlook actually enforce.',
  },
  {
    index: '04',
    title: 'Last ninety days',
    body:
      'What the channel earned, split between flows and campaigns, revenue per recipient, and the gap between what it did and what it should be doing.',
  },
] as const;

/**
 * Audit-specific questions. Rendered after HOME_FAQS in one FAQ block and
 * emitted as a single FAQPage. Kept free of overlap with HOME_FAQS, which
 * already answers "what happens on the free email audit?".
 */
export const AUDIT_FAQS = [
  {
    q: 'Is the audit actually free?',
    a: 'Yes. There is no fee and no obligation. We send you the findings whether or not you hire us. If the report is useful and you fix it yourself, that is a fine outcome for us.',
  },
  {
    q: 'What access do you need?',
    a: 'Read-only access to your Klaviyo account is fastest and most useful. If you would rather not grant access, screenshots of your flow list, your last 90 days of performance and your list growth will get us most of the way there.',
  },
  {
    q: 'Will this turn into a sales call?',
    a: 'You get the findings in writing either way. If we think we can help we will say what we would do and what it costs. If we do not think we can help, we will tell you that instead.',
  },
  {
    q: 'What if I am not on Klaviyo?',
    a: 'We can still audit Mailchimp, Omnisend, Shopify Email and most other ESPs. The flow and deliverability questions are the same everywhere; only the interface changes.',
  },
] as const;
