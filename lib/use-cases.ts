/**
 * Industry pages: one short, specific page per kind of store, aimed at the
 * "email marketing for X brands" searcher who is close to buying. Each page
 * answers its own question in the first paragraph and links to real work
 * already shown on /work. The advice is general practitioner knowledge about
 * how each category buys; nothing here claims a client result.
 */
export type UseCase = {
  slug: string;
  /** Short label used in links, e.g. "coffee brands". */
  label: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  answer: string;
  /** Why email behaves differently in this category. */
  differences: { title: string; body: string }[];
  /** Flows worth building first for this kind of store. */
  firstFlows: string[];
  /** WORK slugs from lib/site.ts shown as proof. */
  work: string[];
  /** Glossary term slugs worth reading next. */
  terms: string[];
  faqs: { q: string; a: string }[];
};

export const USE_CASES: UseCase[] = [
  {
    slug: 'fashion-brands',
    label: 'fashion brands',
    metaTitle: 'Klaviyo Email Marketing for Fashion Brands',
    metaDescription:
      'Email and Klaviyo flows for fashion and apparel brands: welcome flows that sell the brand first, drop campaigns, and winback for lapsed buyers.',
    h1: 'Klaviyo email marketing for fashion brands.',
    answer:
      'Fashion email works when it sells the brand before the discount: strong imagery, a clear point of view, and flows timed around drops, restocks and seasons. Inferno Emails builds the Klaviyo flows and designs the campaigns for apparel and luxury brands, so the list buys at full price more often.',
    differences: [
      { title: 'The brand is the product', body: 'Shoppers buy a feeling as much as a garment. A welcome email that opens on the strongest image and the brand story earns the scroll before any code appears.' },
      { title: 'Timing follows the calendar', body: 'Drops, restocks and seasons create natural send moments. Segment by what someone browsed or bought so a new-season email does not go to people who just bought the last one.' },
      { title: 'Returns and sizing shape the second order', body: 'Post-purchase emails that help with fit and care reduce regret and make the next purchase easier.' },
    ],
    firstFlows: ['Welcome flow led by brand and imagery', 'Browse and cart recovery with sizing help', 'Back-in-stock and low-stock alerts', 'Post-purchase care and styling', 'Winback for lapsed buyers before a new season'],
    work: ['kilentar-welcome', 'girafon-bleu-welcome'],
    terms: ['welcome-flow', 'abandoned-cart-flow', 'winback-flow'],
    faqs: [
      { q: 'Do you design the emails as well as build the flows?', a: 'Yes. Every email is designed from scratch in your brand and built in Klaviyo, so the flows and the creative come from one team.' },
      { q: 'Can you work around product drops?', a: 'Yes. We plan sends and segments around drops and restocks so the right people hear first and nobody gets a message about something they just bought.' },
    ],
  },
  {
    slug: 'coffee-brands',
    label: 'coffee brands',
    metaTitle: 'Klaviyo Email Marketing for Coffee Brands',
    metaDescription:
      'Email and Klaviyo flows for coffee brands: replenishment timing, subscription nudges, a welcome flow that sells the first bag, and winback.',
    h1: 'Klaviyo email marketing for coffee brands.',
    answer:
      'Coffee is a repeat product, so email is mostly a timing problem: reach the customer just before their bag runs out. Inferno Emails builds replenishment, subscription and welcome flows in Klaviyo for coffee brands, and designs campaigns that survive dark mode and small screens.',
    differences: [
      { title: 'There is a natural reorder window', body: 'A 250g or 1kg bag runs out on a predictable schedule. A replenishment email timed to your real repurchase interval beats a generic reminder.' },
      { title: 'Subscription is the prize', body: 'Moving a one-off buyer to a subscription changes the value of the customer. The flow after the first order is where that offer belongs.' },
      { title: 'Product education sells', body: 'Roast, origin and brew method are what shoppers compare. Short, useful emails on how to brew build the habit.' },
    ],
    firstFlows: ['Welcome flow that sells the first bag', 'Replenishment based on bag size', 'Subscription offer after the first order', 'Cart recovery', 'Winback after the usual reorder window passes'],
    work: ['bondi-coffee-campaign'],
    terms: ['welcome-flow', 'winback-flow', 'email-segmentation'],
    faqs: [
      { q: 'How do you time replenishment emails?', a: 'We model it on your real repurchase intervals by product and bag size, then test the send point so the email lands just before the customer runs out.' },
      { q: 'Do you push subscriptions?', a: 'Where it fits the brand, yes. We build a post-purchase offer for subscription and measure it by attributed revenue and repeat rate.' },
    ],
  },
  {
    slug: 'food-and-bakery-brands',
    label: 'food and bakery brands',
    metaTitle: 'Email Marketing for Food and Bakery Brands',
    metaDescription:
      'Klaviyo email marketing for food and bakery brands: seasonal and gifting campaigns, reorder flows and a welcome flow that sells the first order.',
    h1: 'Email marketing for food and bakery brands.',
    answer:
      'Food and bakery brands live on seasons and gifting: Mother’s Day, Christmas, Easter. Email works best when each campaign is built around one clear decision, with reorder flows underneath for the rest of the year. Inferno Emails designs and runs both in Klaviyo.',
    differences: [
      { title: 'Seasons are the calendar', body: 'Gifting peaks are predictable. Plan the campaign and the segments early so shipping cut-offs and stock are part of the message, not a surprise.' },
      { title: 'One decision per email', body: 'A gifting email that asks for a single choice converts better than a catalogue of options.' },
      { title: 'Freshness drives reorders', body: 'Consumable products get reordered. Flows timed to when the last box is likely finished keep revenue steady between peaks.' },
      { title: 'Freshness shapes the message', body: 'Shelf life, delivery windows and storage matter to food buyers. Say clearly when orders ship and how to keep the product at its best, and the customer is more likely to reorder.' },
    ],
    firstFlows: ['Welcome flow', 'Seasonal and gifting campaigns planned early', 'Reorder reminders', 'Cart recovery', 'Post-purchase with storage and serving ideas'],
    work: ['kuchenkompane-mothers-day'],
    terms: ['abandoned-cart-flow', 'email-segmentation', 'welcome-flow'],
    faqs: [
      { q: 'How early should we plan seasonal campaigns?', a: 'Several weeks ahead for the big peaks, so the design, segments and shipping cut-off messaging are ready before the send window opens.' },
      { q: 'Can you handle gifting and self-purchase separately?', a: 'Yes. We segment by past behaviour so gift buyers and regular customers hear different messages.' },
    ],
  },
  {
    slug: 'wellness-brands',
    label: 'wellness brands',
    metaTitle: 'Klaviyo Email Marketing for Wellness Brands',
    metaDescription:
      'Email and Klaviyo flows for wellness brands: a single-product welcome, editorial campaigns that lead with benefit and proof, and replenishment.',
    h1: 'Klaviyo email marketing for wellness brands.',
    answer:
      'Wellness shoppers want a reason to trust you before they buy. Email works when it leads with the benefit, shows proof, then makes the offer, in that order. Inferno Emails builds the flows and designs the campaigns for wellness and single-product brands in Klaviyo.',
    differences: [
      { title: 'Trust comes before the offer', body: 'Benefit, proof, then offer is the order that holds up. Reviews and plain explanations carry more weight than hype.' },
      { title: 'Single-product stores need urgency that is honest', body: 'A dated first-order code gives the first purchase a reason to happen this week without inventing a fake deadline.' },
      { title: 'Claims need care', body: 'Health-adjacent copy has rules. Keep claims modest and sourced, and keep the emails compliant with your market’s guidance.' },
      { title: 'Consent and frequency need care', body: 'Wellness shoppers often sign up for one specific reason. Keep the promise you made at sign-up, and let people choose how often they hear from you so they do not feel pushed.' },
    ],
    firstFlows: ['Welcome flow with a dated first-order code', 'Cart and browse recovery', 'Post-purchase usage guidance', 'Replenishment for consumables', 'Review request after delivery'],
    work: ['iced-plunge-welcome', 'femmenal-campaign'],
    terms: ['welcome-flow', 'email-deliverability', 'abandoned-cart-flow'],
    faqs: [
      { q: 'Do you write the copy?', a: 'We write and design the emails with you, using your approved claims and tone, and you approve everything before it sends.' },
      { q: 'Does this work for a single-product store?', a: 'Yes. A focused welcome flow and a post-purchase sequence are often the highest-value pieces for a single-product brand.' },
    ],
  },
  {
    slug: 'kitchenware-and-premium-product-brands',
    label: 'premium product brands',
    metaTitle: 'Email Marketing for Premium Product Brands',
    metaDescription:
      'Klaviyo email marketing for kitchenware and other considered, higher-ticket products: long-form welcome sequences, education and careful cart recovery.',
    h1: 'Email marketing for premium product brands.',
    answer:
      'A higher-ticket product is a considered purchase, so the email job is education and confidence, not pressure. Inferno Emails builds long-form welcome sequences and careful cart recovery in Klaviyo for kitchenware and other premium product brands.',
    differences: [
      { title: 'Buyers research first', body: 'People compare before they buy. A welcome sequence that explains what makes the product different answers the questions they are already asking.' },
      { title: 'Discounts can hurt', body: 'Premium brands protect price. Lead with craft, use, and proof, and keep any offer measured.' },
      { title: 'Long consideration needs patience', body: 'Space the sequence out and let the reader decide. Cart recovery should help, not nag.' },
      { title: 'Reviews and proof carry the sale', body: 'A higher-priced item gets scrutinised. Customer photos, detailed reviews and honest specifications do more than urgency, so build them into the welcome sequence and the cart emails.' },
    ],
    firstFlows: ['Long-form welcome sequence', 'Product education and care emails', 'Considered cart and browse recovery', 'Post-purchase care guide', 'Cross-sell to accessories'],
    work: ['nikos-knife-welcome', 'next-step-funded-campaign'],
    terms: ['welcome-flow', 'abandoned-cart-flow', 'email-segmentation'],
    faqs: [
      { q: 'Will you discount our product?', a: 'Only if it fits the brand. For premium products we usually lead with craft and proof and keep any offer restrained.' },
      { q: 'How long should the welcome sequence be?', a: 'Long enough to answer the questions a careful buyer has, spaced so it does not feel like pressure. We tune length and timing against attributed revenue.' },
    ],
  },
];

export const getUseCase = (slug: string) => USE_CASES.find((u) => u.slug === slug);
