/**
 * Klaviyo versus alternatives, for ecommerce stores. Each page is a fair,
 * general comparison of well-known characteristics only. No prices, plan
 * names or statistics: vendors change those often, so readers are told to
 * check current details. Inferno Emails builds in Klaviyo and says so in
 * every verdict. `a` is always Klaviyo.
 */
export type Comparison = {
  slug: string;
  a: string;
  b: string;
  metaTitle: string;
  metaDescription: string;
  /** Direct, quotable verdict. */
  answer: string;
  table: { feature: string; a: string; b: string }[];
  suitsA: string[];
  suitsB: string[];
  verdict: string[];
  /** Steps for moving from b to a. */
  migration: string[];
  /** Glossary term slugs. */
  terms: string[];
  /** Service page slug. */
  service: string;
};

export const COMPARISONS: Comparison[] = [
  {
    slug: 'klaviyo-vs-mailchimp',
    a: 'Klaviyo',
    b: 'Mailchimp',
    metaTitle: 'Klaviyo vs Mailchimp for Ecommerce Stores',
    metaDescription: 'Klaviyo vs Mailchimp for online stores: store data, flows, segmentation and ease of use compared fairly, with a short guide to switching.',
    answer: 'For stores that treat email as a revenue channel, Klaviyo is usually the stronger fit because it is built around store events such as browsing, carts and orders. Mailchimp remains a sensible, approachable choice for simple newsletters and small lists. Pick on how much behavioural targeting you genuinely need, and check current features before deciding.',
    table: [
      { feature: 'Ecommerce focus', a: 'Built around store data from the start', b: 'Broader marketing tool with store integrations' },
      { feature: 'Behavioural segmentation', a: 'A core strength, with fine-grained conditions', b: 'Available, often simpler to set up but less granular' },
      { feature: 'Flow builder', a: 'Branching, filters and splits aimed at lifecycle moments', b: 'Capable journeys, lighter on ecommerce logic' },
      { feature: 'Template flexibility', a: 'Drag and drop plus custom code and dynamic blocks', b: 'Long-established editor, easy for first-time designers' },
      { feature: 'SMS', a: 'Offered alongside email, check current regions', b: 'Offered in some form, check current availability' },
      { feature: 'Ease for beginners', a: 'Gentle at the start, deeper once you build flows', b: 'Widely seen as very approachable' },
      { feature: 'Revenue reporting', a: 'Attributed revenue by flow and campaign', b: 'Reporting leans toward campaign engagement' },
      { feature: 'Typical fit', a: 'Stores where repeat purchase matters', b: 'Newsletters, small lists, mixed business types' },
    ],
    suitsA: [
      'Stores whose growth depends on repeat customers',
      'Teams that want cart, browse and post-purchase flows driven by real events',
      'Brands that plan to segment by products viewed or bought',
      'Merchants ready to invest a little time in setup for a deeper tool',
    ],
    suitsB: [
      'Very small lists that mainly need a monthly newsletter',
      'Businesses that are not purely ecommerce and want one general tool',
      'Beginners who value a long-established, familiar editor',
      'Stores that do not yet plan automated lifecycle emails',
    ],
    verdict: [
      'The honest difference is centre of gravity. Klaviyo started with ecommerce events and shows it in segmentation and flows. Mailchimp grew from newsletters and shows it in an approachable editor and a wide general feature set. Neither is wrong; they are aimed at different jobs.',
      'Disclosure: Inferno Emails builds in Klaviyo, so we are not neutral. If your store sends only occasional newsletters, Mailchimp may serve you well and moving would be effort without reward. Check each vendor\'s current plans and features before you decide.',
    ],
    migration: [
      'Export your subscribers from Mailchimp with their consent status, tags and signup dates, and keep unsubscribed and cleaned contacts as a suppression list.',
      'Connect your store to Klaviyo so historical orders and products sync before you build anything.',
      'Import the list into Klaviyo, mapping tags to properties or segments you will actually use.',
      'Rebuild your welcome and cart flows first, then recreate your best-performing templates.',
      'Run both tools briefly, then switch sending over and close the old automations to avoid duplicate emails.',
    ],
    terms: ['email-segmentation', 'abandoned-cart-flow', 'attributed-revenue'],
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'klaviyo-vs-omnisend',
    a: 'Klaviyo',
    b: 'Omnisend',
    metaTitle: 'Klaviyo vs Omnisend for Ecommerce: A Fair Look',
    metaDescription: 'Klaviyo vs Omnisend compared for ecommerce: segmentation depth, flows, SMS and ease of setup, with honest notes on who each suits.',
    answer: 'Klaviyo and Omnisend are both ecommerce-first, so the choice is about depth versus simplicity. Klaviyo tends to offer more granular segmentation and a larger ecosystem, while Omnisend is often praised for getting multichannel campaigns running quickly. Compare current features against your team\'s skills, not against a checklist.',
    table: [
      { feature: 'Ecommerce focus', a: 'Ecommerce-first with deep store events', b: 'Also ecommerce-first, with store events built in' },
      { feature: 'Segmentation depth', a: 'Very granular, with many condition types', b: 'Solid, generally simpler to configure' },
      { feature: 'Flow builder', a: 'Flexible branching and filters', b: 'Visual, with ready-made ecommerce workflows' },
      { feature: 'Multichannel', a: 'Email and SMS, check current coverage', b: 'Email, SMS and other channels in one workflow' },
      { feature: 'Template flexibility', a: 'Drag and drop with code and dynamic content', b: 'Clean editor with ecommerce content blocks' },
      { feature: 'Ease for beginners', a: 'Easy start, rewards deeper learning', b: 'Often described as quick to launch' },
      { feature: 'Third-party ecosystem', a: 'Large community and many integrations', b: 'Growing, covers common store needs' },
      { feature: 'Reporting', a: 'Revenue attribution and rich metrics', b: 'Clear campaign and automation reporting' },
    ],
    suitsA: [
      'Stores that want very precise segments and custom event logic',
      'Teams that benefit from a large pool of agencies and guides',
      'Brands that expect their programme to grow in complexity',
      'Merchants who use many connected apps with their store',
    ],
    suitsB: [
      'Stores that want email and SMS in one fast-to-build workflow',
      'Small teams that prize quick setup over maximum granularity',
      'Merchants who like prebuilt ecommerce automations to start from',
      'Brands comparing tools mainly on day-to-day simplicity',
    ],
    verdict: [
      'There is no dramatic gap here. Both understand carts, products and orders. The differences are in how far you can bend the tool: Klaviyo gives more room to build unusual segments, Omnisend gives a smoother path to a working multichannel setup.',
      'Disclosure: Inferno Emails builds in Klaviyo, so weigh our view accordingly. If your programme is straightforward and your team is small, Omnisend may be perfectly enough. Check current features, regions and plans on both sites.',
    ],
    migration: [
      'Export contacts from Omnisend including channel consent, because email and SMS permissions must carry across correctly.',
      'Connect your store to Klaviyo and let order history sync first.',
      'Import contacts and recreate the segments you rely on, using store events rather than copied tags where possible.',
      'Rebuild your automations in priority order, starting with welcome and abandoned cart.',
      'Update signup forms to point at Klaviyo, then retire the Omnisend forms and workflows.',
    ],
    terms: ['event-trigger', 'email-segmentation', 'klaviyo-metric'],
    service: 'email-flows',
  },
  {
    slug: 'klaviyo-vs-shopify-email',
    a: 'Klaviyo',
    b: 'Shopify Email',
    metaTitle: 'Klaviyo vs Shopify Email for Online Stores',
    metaDescription: 'Klaviyo vs Shopify Email: when a built-in tool is enough, when to move to a dedicated platform, and what changes when you switch.',
    answer: 'Shopify Email is a convenient built-in tool for simple campaigns and is a sensible starting point. Klaviyo is a dedicated platform with deeper segmentation, automation and reporting. If you only send occasional announcements, stay simple; if email should drive repeat revenue, a dedicated tool usually earns its place.',
    table: [
      { feature: 'Where it lives', a: 'Separate platform connected to your store', b: 'Inside the Shopify admin' },
      { feature: 'Setup effort', a: 'Connect, sync and configure', b: 'Minimal, already part of your store' },
      { feature: 'Segmentation', a: 'Deep behavioural and product-level conditions', b: 'Useful basics drawn from customer data' },
      { feature: 'Automation depth', a: 'Extensive flow builder with branching', b: 'Simpler automations for common needs' },
      { feature: 'Template flexibility', a: 'Drag and drop, code and dynamic blocks', b: 'Clean, store-themed templates' },
      { feature: 'SMS', a: 'Available, check current regions', b: 'Check what is currently offered' },
      { feature: 'Reporting', a: 'Attributed revenue by flow and campaign', b: 'Straightforward campaign results' },
      { feature: 'Platform scope', a: 'Works with several store platforms', b: 'Tied to Shopify only' },
    ],
    suitsA: [
      'Stores that want lifecycle flows beyond a welcome email',
      'Teams that need segments built from browsing and purchase behaviour',
      'Merchants who want revenue attributed clearly to each flow',
      'Brands that might change store platform and want email to move with them',
    ],
    suitsB: [
      'New stores sending their first announcements',
      'Owners who want everything in one admin with little to learn',
      'Merchants with a small list and an occasional promotion calendar',
      'Anyone testing whether email is worth more investment',
    ],
    verdict: [
      'These are less rivals than steps on a ladder. A built-in tool removes friction, which matters when you are starting. A dedicated platform adds control, which matters once email carries real revenue and you want to target and automate with precision.',
      'Disclosure: Inferno Emails builds in Klaviyo. That said, the right moment to move is usually when you notice limits, not before. Check Shopify\'s current email features, as they develop over time, and compare against your actual needs.',
    ],
    migration: [
      'Export your customer list from Shopify with marketing consent status, so only people who agreed are imported.',
      'Install and connect Klaviyo to your store so orders, products and events sync.',
      'Import or sync the list and confirm consent fields came through correctly.',
      'Build the core flows that Shopify Email did not cover: cart recovery, post-purchase and winback.',
      'Move campaign sending over, keep your sender domain consistent and update store forms to feed Klaviyo.',
    ],
    terms: ['email-flow-vs-campaign', 'abandoned-cart-flow', 'catalog-feed'],
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'klaviyo-vs-flodesk',
    a: 'Klaviyo',
    b: 'Flodesk',
    metaTitle: 'Klaviyo vs Flodesk: Design or Data for Your Store',
    metaDescription: 'Klaviyo vs Flodesk for ecommerce: Flodesk\'s design-led emails against Klaviyo\'s store data and flows, with notes on who each suits.',
    answer: 'Flodesk is loved for beautiful, easy-to-design emails, which suits brands built on look and feel. Klaviyo is stronger where behaviour and store data drive the sends. If design polish is your priority and your needs are simple, Flodesk can delight; for data-led retention, Klaviyo usually fits better.',
    table: [
      { feature: 'Primary strength', a: 'Store data and automation', b: 'Visual design and ease of creation' },
      { feature: 'Template style', a: 'Flexible, from simple to fully custom code', b: 'Polished, editorial-style layouts' },
      { feature: 'Ease for beginners', a: 'Approachable, with depth to grow into', b: 'Very easy for non-designers' },
      { feature: 'Ecommerce data', a: 'Deep, event-based', b: 'Lighter, check current store integrations' },
      { feature: 'Segmentation', a: 'Granular behavioural segments', b: 'Simpler, often tag-based' },
      { feature: 'Flows', a: 'Branching lifecycle flows', b: 'Straightforward workflows' },
      { feature: 'SMS', a: 'Available, check current regions', b: 'Check what is currently offered' },
      { feature: 'Typical fit', a: 'Stores growing through repeat orders', b: 'Creators, boutiques and brand-led senders' },
    ],
    suitsA: [
      'Stores that want product-aware emails, such as cart contents and recommendations',
      'Teams that segment by behaviour and purchase history',
      'Brands whose retention programme needs several automated flows',
      'Merchants who want revenue reporting tied to each send',
    ],
    suitsB: [
      'Brands where the look of each email is the main priority',
      'Small businesses and creators sending thoughtful, editorial emails',
      'Teams without a designer who still want beautiful layouts',
      'Senders who need simple lists rather than behavioural targeting',
    ],
    verdict: [
      'A great email is both well designed and well targeted. Flodesk leans into the first, Klaviyo into the second, though Klaviyo can also produce attractive, on-brand emails with some design effort. The question is which gap hurts you more today.',
      'Disclosure: Inferno Emails builds in Klaviyo, and design is part of what we do there. If your emails are mostly stories and announcements, Flodesk may be a joy to use. Check its current ecommerce capabilities before assuming either way.',
    ],
    migration: [
      'Export subscribers from Flodesk with their segment memberships and signup dates, and note anyone who unsubscribed.',
      'Connect your store to Klaviyo so product and order data is available for design blocks.',
      'Import contacts and turn the most useful Flodesk segments into Klaviyo lists or segments.',
      'Recreate your favourite layouts as Klaviyo templates, saving reusable blocks for fonts, colours and footers.',
      'Rebuild automations, test the rendering in major inboxes and switch your signup forms over.',
    ],
    terms: ['dynamic-content', 'dark-mode-email', 'email-segmentation'],
    service: 'email-design',
  },
  {
    slug: 'klaviyo-vs-activecampaign',
    a: 'Klaviyo',
    b: 'ActiveCampaign',
    metaTitle: 'Klaviyo vs ActiveCampaign for Ecommerce',
    metaDescription: 'Klaviyo vs ActiveCampaign: ecommerce depth against general-purpose automation and CRM, with a fair guide to which suits your business.',
    answer: 'ActiveCampaign is a powerful general-purpose automation platform with CRM features, well suited to businesses with sales pipelines and service work. Klaviyo is purpose-built for online retail and speaks the language of products, carts and orders. For a store, Klaviyo is typically the more direct fit.',
    table: [
      { feature: 'Core orientation', a: 'Ecommerce retention marketing', b: 'General automation with CRM and sales tools' },
      { feature: 'Store data', a: 'Native, event-driven', b: 'Integrates with stores, often via connectors' },
      { feature: 'Automation builder', a: 'Flows tuned to retail lifecycle moments', b: 'Highly flexible automations across many use cases' },
      { feature: 'CRM and pipelines', a: 'Not the focus', b: 'A genuine strength' },
      { feature: 'Segmentation', a: 'Product and purchase behaviour', b: 'Contact, deal and behaviour conditions' },
      { feature: 'Ease for beginners', a: 'Retail-friendly starting points', b: 'Powerful, with a steeper learning curve for some' },
      { feature: 'SMS', a: 'Available, check current regions', b: 'Check what is currently offered' },
      { feature: 'Typical fit', a: 'Product-based online stores', b: 'Service firms, B2B and mixed models' },
    ],
    suitsA: [
      'Retail brands built on repeat product purchases',
      'Teams that want cart and browse flows ready to adapt',
      'Merchants who want ecommerce reporting without extra tooling',
      'Stores where the main goal is customer lifetime value',
    ],
    suitsB: [
      'Businesses that sell through sales teams as well as a website',
      'Companies that want email, CRM and pipeline in one system',
      'Service businesses and B2B firms with longer buying cycles',
      'Teams with someone comfortable designing complex automations',
    ],
    verdict: [
      'These tools overlap in automation but come from different worlds. ActiveCampaign thinks in contacts, deals and stages; Klaviyo thinks in customers, products and purchases. A pure online store rarely needs a sales pipeline, while a consultancy rarely needs a product catalogue feed.',
      'Disclosure: Inferno Emails builds in Klaviyo, so we naturally favour retail use cases. If your business blends ecommerce with high-touch sales, ActiveCampaign deserves a serious look. Check current features, as both products keep evolving.',
    ],
    migration: [
      'Export contacts from ActiveCampaign with tags, custom fields and consent status, and decide which fields still matter for a store.',
      'Connect your store to Klaviyo and let purchase history sync as the source of truth.',
      'Import contacts, keeping only properties you will use in segmentation or personalisation.',
      'Translate each automation into a Klaviyo flow, simplifying anything that existed only to support a sales pipeline.',
      'Test triggers, then pause the old automations to avoid double sends.',
    ],
    terms: ['event-trigger', 'customer-lifetime-value', 'conditional-split'],
    service: 'email-flows',
  },
  {
    slug: 'klaviyo-vs-brevo',
    a: 'Klaviyo',
    b: 'Brevo',
    metaTitle: 'Klaviyo vs Brevo for Ecommerce Email and SMS',
    metaDescription: 'Klaviyo vs Brevo for online stores: ecommerce depth, transactional sending, SMS and simplicity compared, with notes on who suits each.',
    answer: 'Brevo is a flexible all-in-one platform covering email, SMS and transactional messaging, often appreciated for its breadth and approachable setup. Klaviyo goes deeper on ecommerce segmentation and lifecycle flows. For stores centred on retention revenue, Klaviyo usually fits; for broad messaging needs on a simpler footing, Brevo is credible.',
    table: [
      { feature: 'Scope', a: 'Focused on ecommerce marketing', b: 'Broad messaging suite with marketing tools' },
      { feature: 'Transactional email', a: 'Focus is marketing; check how you handle receipts', b: 'Transactional sending is a recognised feature' },
      { feature: 'Store data depth', a: 'Deep, event-based', b: 'Good integrations, generally lighter depth' },
      { feature: 'Segmentation', a: 'Granular behavioural conditions', b: 'Capable, more list-and-attribute oriented' },
      { feature: 'Flow builder', a: 'Retail lifecycle emphasis', b: 'General-purpose workflows' },
      { feature: 'SMS', a: 'Available, check current regions', b: 'Available, check current regions' },
      { feature: 'Ease for beginners', a: 'Gentle start, deeper later', b: 'Often seen as accessible' },
      { feature: 'Typical fit', a: 'Stores prioritising retention', b: 'Businesses wanting several channels in one tool' },
    ],
    suitsA: [
      'Stores that live or die on repeat orders',
      'Teams that want advanced product-level segmentation',
      'Brands building a full flow programme over time',
      'Merchants who want ecommerce metrics at their fingertips',
    ],
    suitsB: [
      'Businesses that want marketing and transactional messages together',
      'Teams looking for a broad toolset on a simple footing',
      'Stores with straightforward automation needs',
      'Merchants who also run non-ecommerce activity',
    ],
    verdict: [
      'The trade here is breadth against depth. Brevo covers many message types in one place and keeps the learning curve manageable. Klaviyo concentrates on what an online store does with customer behaviour, which pays off as segmentation and flows become more ambitious.',
      'Disclosure: Inferno Emails builds in Klaviyo, so we have a stake in this view. If your needs are modest and you value an all-round messaging tool, Brevo may be enough. Check current features and plans before you commit.',
    ],
    migration: [
      'Export contacts from Brevo with their attributes, list memberships and consent records.',
      'Decide where transactional messages will come from, since Klaviyo is mainly for marketing, and keep that sending set up separately.',
      'Connect your store to Klaviyo and import contacts once the order history has synced.',
      'Rebuild marketing automations as flows, beginning with the highest-revenue ones.',
      'Authenticate your sending domain in Klaviyo, warm up sensibly and then switch campaigns across.',
    ],
    terms: ['transactional-vs-marketing-email', 'sending-domain', 'ip-warming'],
    service: 'email-deliverability',
  },
  {
    slug: 'klaviyo-vs-drip',
    a: 'Klaviyo',
    b: 'Drip',
    metaTitle: 'Klaviyo vs Drip: Ecommerce CRM Compared Fairly',
    metaDescription: 'Klaviyo vs Drip for ecommerce: two retention-focused platforms compared on segmentation, workflows, templates and day-to-day usability.',
    answer: 'Drip and Klaviyo are close in spirit, both aimed at ecommerce brands that want behavioural email. Drip is known for a clean visual workflow approach and a focus on brands wanting a simple customer view. Klaviyo tends to offer a larger ecosystem and more depth. Which feels better often comes down to a trial.',
    table: [
      { feature: 'Positioning', a: 'Ecommerce marketing platform', b: 'Ecommerce CRM with marketing automation' },
      { feature: 'Store data', a: 'Deep, event-based', b: 'Strong ecommerce integration' },
      { feature: 'Workflow builder', a: 'Flexible flows with filters and splits', b: 'Visual workflow canvas, often called intuitive' },
      { feature: 'Segmentation', a: 'Very granular', b: 'Capable, with a customer-centred view' },
      { feature: 'Template flexibility', a: 'Drag and drop plus custom code', b: 'Clean editor, simpler options' },
      { feature: 'SMS', a: 'Available, check current regions', b: 'Check what is currently offered' },
      { feature: 'Ecosystem and community', a: 'Large, with many guides and specialists', b: 'Smaller, tight-knit' },
      { feature: 'Ease for beginners', a: 'Approachable, with depth', b: 'Approachable, often praised for clarity' },
    ],
    suitsA: [
      'Brands that want many integrations and a wide pool of expertise',
      'Teams that expect to build advanced segmentation',
      'Stores that want predictive and benchmark-style insights',
      'Merchants who may hire an agency or specialist later',
    ],
    suitsB: [
      'Brands that like a clean, visual way to map customer journeys',
      'Teams that want a customer-centred view without extra complexity',
      'Stores with focused, moderate automation needs',
      'Merchants who value a smaller, closer community',
    ],
    verdict: [
      'Because both target online stores, the gap is narrower than with general tools. The deciding factors are tooling feel, ecosystem and how advanced your segmentation will become, rather than basic capability. Test both against one real flow, such as abandoned cart.',
      'Disclosure: Inferno Emails builds in Klaviyo, which shapes where we have experience. Drip is a respectable alternative and may suit you if its workflow style clicks with your team. Check current features, as both tools develop quickly.',
    ],
    migration: [
      'Export subscribers from Drip with tags, custom fields and subscription status.',
      'Connect your store to Klaviyo so catalogue and order data sync across.',
      'Map Drip tags to Klaviyo properties or segments, merging duplicates and dropping any you no longer use.',
      'Recreate each workflow as a flow, comparing triggers carefully, since names and timing logic differ.',
      'Run a short test period, then turn off old workflows and move signup forms.',
    ],
    terms: ['klaviyo-metric', 'predictive-analytics', 'email-segmentation'],
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'klaviyo-vs-hubspot',
    a: 'Klaviyo',
    b: 'HubSpot',
    metaTitle: 'Klaviyo vs HubSpot for Ecommerce Marketing',
    metaDescription: 'Klaviyo vs HubSpot: a retail email specialist against a broad CRM and marketing suite, with an honest take on which suits an online store.',
    answer: 'HubSpot is a broad CRM and marketing suite, strongest where sales, service and marketing share one system. Klaviyo is a specialist for online retail email and SMS. A store focused on repeat purchases usually gets more direct value from Klaviyo, while businesses with sales teams and long buying journeys may prefer HubSpot.',
    table: [
      { feature: 'Scope', a: 'Specialist for ecommerce retention', b: 'Broad suite: CRM, marketing, sales and service' },
      { feature: 'Store data', a: 'Native events for browsing, carts and orders', b: 'Possible through integrations, less central' },
      { feature: 'Email automation', a: 'Retail lifecycle flows', b: 'Workflows across the whole customer record' },
      { feature: 'Segmentation', a: 'Product and purchase behaviour', b: 'Contact, company and deal properties' },
      { feature: 'Reporting', a: 'Attributed revenue by flow and campaign', b: 'Broad marketing and sales reporting' },
      { feature: 'Template flexibility', a: 'Drag and drop, code, dynamic product blocks', b: 'Flexible editor, geared to general marketing' },
      { feature: 'Complexity', a: 'Focused, so easier to scope', b: 'Large platform, more to learn and configure' },
      { feature: 'Typical fit', a: 'Online stores', b: 'B2B, services and mixed sales models' },
    ],
    suitsA: [
      'Stores where most revenue comes through the website',
      'Teams that want carts, browsing and orders to drive messaging',
      'Merchants who prefer a focused tool to a large suite',
      'Brands measuring success by revenue per send',
    ],
    suitsB: [
      'Companies with sales teams who need CRM and email together',
      'B2B businesses with lead nurturing and deal stages',
      'Organisations wanting marketing, sales and service data in one place',
      'Teams that value one connected system over specialist depth',
    ],
    verdict: [
      'These tools answer different questions. HubSpot asks who your contacts are and where they sit in a relationship; Klaviyo asks what customers did in your store and what to send next. If your business is mostly retail, the second question is usually the money question.',
      'Disclosure: Inferno Emails builds in Klaviyo, so we lean toward specialist retail tooling. If your company is as much sales-led as shop-led, HubSpot may serve you better. Check both vendors for current features and how they fit your store platform.',
    ],
    migration: [
      'Export contacts from HubSpot with lifecycle fields, lists and consent status, deciding which properties a store really needs.',
      'Connect your store to Klaviyo so order and product data become the source for customer behaviour.',
      'Import contacts and recreate the lists you actually mail as Klaviyo segments.',
      'Rebuild only the customer-facing workflows as flows, leaving sales-specific automation behind in your CRM if you keep it.',
      'Decide whether HubSpot stays as a CRM, then update forms and sync so the two do not send conflicting messages.',
    ],
    terms: ['attributed-revenue', 'customer-lifetime-value', 'event-trigger'],
    service: 'retention-strategy',
  },
];

export const getComparison = (slug: string) => COMPARISONS.find((c) => c.slug === slug);

/** Four other comparisons, wrapping round, so every page gets inbound links from siblings. */
export function comparisonSiblings(slug: string) {
  const i = COMPARISONS.findIndex((c) => c.slug === slug);
  if (i < 0) return [];
  return [1, 2, 3, 4].map((n) => COMPARISONS[(i + n) % COMPARISONS.length]).filter((x, k, arr) => x.slug !== slug && arr.findIndex((y) => y.slug === x.slug) === k);
}
