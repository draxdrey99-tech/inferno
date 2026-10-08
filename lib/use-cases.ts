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
  {
    slug: 'skincare-and-beauty-brands',
    label: 'skincare and beauty brands',
    metaTitle: 'Klaviyo Email Marketing for Skincare and Beauty Brands',
    metaDescription:
      'Klaviyo flows and campaigns for skincare and beauty brands: routine-led welcome emails, refill timing, shade and skin-type segments, and careful claims.',
    h1: 'Klaviyo email marketing for skincare and beauty brands.',
    answer:
      'Skincare and beauty shoppers buy into a routine, so the best emails teach the routine and then time the refill. Inferno Emails builds the Klaviyo flows and designs the campaigns for skincare and beauty brands, with segments for skin type, shade and concern.',
    differences: [
      { title: 'A routine is a sequence of products', body: 'Someone who bought a cleanser is a natural next buyer for a moisturiser. Post-purchase emails that explain the order of use make the second product feel obvious rather than pushy.' },
      { title: 'Refill timing depends on pack size', body: 'A small serum and a large body product run out at very different speeds. Model the reorder window per product and per size, then test where the reminder lands.' },
      { title: 'Skin type and shade drive relevance', body: 'Ask for skin type, concern or shade in the sign-up or a short quiz, and store it as a profile property. Every later email can then show products that suit the person.' },
      { title: 'Cosmetic claims need restraint', body: 'Beauty copy is held to advertising rules in most markets. Keep before and after language modest, avoid medical promises, and have your approved claims to hand before any email is written.' },
    ],
    firstFlows: ['Welcome flow that introduces the routine', 'Quiz or skin-type follow-up with matched products', 'Post-purchase how-to-use guidance', 'Refill reminder timed per product size', 'Winback for customers who have stopped reordering'],
    work: ['femmenal-campaign', 'girafon-bleu-welcome'],
    terms: ['replenishment-flow', 'dynamic-content', 'post-purchase-flow'],
    faqs: [
      { q: 'Can you segment by skin type or shade?', a: 'Yes. We capture the answer at sign-up or through a quiz, store it in Klaviyo, and use it to change which products each email shows.' },
      { q: 'How do you handle cosmetic claims in emails?', a: 'We write only from the claims you have approved, keep the language modest, and send you every email for sign-off before it goes out.' },
    ],
  },
  {
    slug: 'jewellery-brands',
    label: 'jewellery brands',
    metaTitle: 'Klaviyo Email Marketing for Jewellery Brands',
    metaDescription:
      'Email and Klaviyo flows for jewellery brands: gifting moments, considered cart recovery, care and resizing guidance, and anniversary reminders.',
    h1: 'Klaviyo email marketing for jewellery brands.',
    answer:
      'Jewellery is bought for occasions and often as a gift, so email should follow the calendar and reassure a careful buyer. Inferno Emails builds Klaviyo flows and designs campaigns for jewellery brands that help the shopper decide and come back for the next milestone.',
    differences: [
      { title: 'Occasions create the demand', body: 'Birthdays, anniversaries and gifting seasons drive most purchases. Capture a date at checkout where the customer is happy to share it, and use it to time a reminder the following year.' },
      { title: 'Gift buyers need different emails', body: 'A person buying for a partner wants delivery dates, packaging and a way to swap size. Separate gift buyers from self-purchasers so each hears what they need.' },
      { title: 'Confidence beats urgency', body: 'Materials, sizing, returns and care are the real objections. Answer them plainly in the welcome flow and cart recovery instead of leaning on countdowns.' },
      { title: 'Care and resizing keep the relationship going', body: 'A short guide to looking after a piece, and a clear route to resizing, gives a reason to write after delivery and builds trust for the next purchase.' },
    ],
    firstFlows: ['Welcome flow built around craft and materials', 'Considered cart and browse recovery', 'Gift buyer flow with delivery and packaging clarity', 'Care and resizing guidance after delivery', 'Anniversary and birthday reminders'],
    work: ['kilentar-welcome', 'nikos-knife-welcome'],
    terms: ['birthday-and-anniversary-flow', 'abandoned-cart-flow', 'welcome-flow'],
    faqs: [
      { q: 'Can email help with gift deadlines?', a: 'Yes. We plan campaigns around gifting dates and put the last order and delivery cut-offs in the message, so shoppers know what is still possible.' },
      { q: 'Do you recommend discounting jewellery?', a: 'Usually not first. We lead with craft, materials and proof, and keep any offer restrained so the brand holds its position.' },
    ],
  },
  {
    slug: 'pet-brands',
    label: 'pet brands',
    metaTitle: 'Klaviyo Email Marketing for Pet Brands',
    metaDescription:
      'Klaviyo flows and campaigns for pet brands: food and treat replenishment, pet-profile segments, new-pet welcome emails and lifecycle timing.',
    h1: 'Klaviyo email marketing for pet brands.',
    answer:
      'Pet owners buy on a schedule set by the animal, so email works best when it knows the pet and the pack size. Inferno Emails builds the Klaviyo flows and designs the campaigns for pet food, treat and accessory brands, from first welcome to the next refill.',
    differences: [
      { title: 'The pet is the real customer profile', body: 'Species, size, age and dietary needs change what is relevant. Collect them early and store them as properties so a puppy owner and a senior cat owner never get the same email.' },
      { title: 'Food runs out on the animal’s schedule', body: 'How fast a bag is eaten depends on pack size and the pet. Build the reorder reminder from your own repurchase data rather than a guess, and offer a subscription where it fits.' },
      { title: 'Life stages open new needs', body: 'A new puppy, a switch to senior food or a move from kitten to adult products are natural moments to write. Age-based triggers keep the product advice accurate.' },
      { title: 'Treats and toys are impulse add-ons', body: 'Accessories sell well as a cross-sell after a food order, but only if the suggestions match the pet already on file.' },
    ],
    firstFlows: ['Welcome flow that asks about the pet', 'Replenishment based on pack size', 'Subscription offer after the first order', 'Life-stage and age follow-ups', 'Cross-sell of treats and accessories matched to the pet'],
    work: ['bondi-coffee-campaign', 'iced-plunge-welcome'],
    terms: ['replenishment-flow', 'subscription-churn', 'email-segmentation'],
    faqs: [
      { q: 'How do you personalise by pet?', a: 'We collect the pet’s details at sign-up or checkout, store them in Klaviyo, and use them to choose products and timing in each flow.' },
      { q: 'Can you set up reorder reminders for different bag sizes?', a: 'Yes. We build a separate reminder window for each pack size, then test the send point so the email arrives before the bag is empty.' },
    ],
  },
  {
    slug: 'supplement-brands',
    label: 'supplement brands',
    metaTitle: 'Klaviyo Email Marketing for Supplement Brands',
    metaDescription:
      'Klaviyo flows and campaigns for supplement brands: compliant claims, replenishment by pack size, subscription retention and education-led welcome emails.',
    h1: 'Klaviyo email marketing for supplement brands.',
    answer:
      'Supplements are a repeat purchase wrapped in a regulated claim, so email has to stay careful and still keep people reordering. Inferno Emails builds the Klaviyo flows and designs the campaigns for supplement brands, with replenishment and retention at the centre.',
    differences: [
      { title: 'Claims are regulated', body: 'Health and nutrition wording is controlled in most markets. Write only from claims you can support, avoid promising to treat or cure anything, and have your compliance reviewer approve each template.' },
      { title: 'Results take time, so retention is the job', body: 'People rarely notice a change overnight, and many stop early. Usage tips and expectation-setting emails in the first weeks help customers stay on the product long enough to judge it.' },
      { title: 'Replenishment depends on pack size and serving', body: 'How long a tub lasts depends on the serving and the person. Build the reminder from real repurchase data and let customers move to a subscription with an easy way to pause.' },
      { title: 'Education builds trust', body: 'Plain explanations of ingredients, how to take the product and what to expect carry more weight than hype, and they keep complaint and unsubscribe rates down.' },
    ],
    firstFlows: ['Welcome flow that explains the product plainly', 'Usage guidance across the first weeks', 'Replenishment timed to pack size', 'Subscription offer with a clear pause option', 'Winback for lapsed customers'],
    work: ['femmenal-campaign', 'iced-plunge-welcome'],
    terms: ['replenishment-flow', 'subscription-churn', 'spam-complaint-rate'],
    faqs: [
      { q: 'Will you write health claims?', a: 'We stay inside the claims you have approved and flag anything that looks risky. You or your compliance reviewer sign off every email before it sends.' },
      { q: 'How do you reduce subscription cancellations?', a: 'We build usage and expectation emails for the early weeks, offer pause and skip options, and keep cancelling easy and honest.' },
    ],
  },
  {
    slug: 'home-and-furniture-brands',
    label: 'home and furniture brands',
    metaTitle: 'Klaviyo Email Marketing for Home and Furniture Brands',
    metaDescription:
      'Email and Klaviyo flows for home and furniture brands: long consideration sequences, delivery and assembly clarity, room-based segments and cross-sell.',
    h1: 'Klaviyo email marketing for home and furniture brands.',
    answer:
      'Furniture and homeware are slow, considered purchases, so email should help people plan a room rather than rush a basket. Inferno Emails builds the Klaviyo flows and designs the campaigns for home brands, covering consideration, delivery and the next room.',
    differences: [
      { title: 'Consideration can run for weeks', body: 'Large items are measured, compared and discussed with a partner. Browse and cart emails that offer swatches, dimensions and a way to save a basket respect that pace.' },
      { title: 'Delivery and assembly are the anxiety', body: 'Lead times, delivery windows and assembly questions decide whether someone completes the order. State them clearly before purchase and keep the customer informed after it.' },
      { title: 'Repurchase is rare, expansion is not', body: 'Few people buy a sofa twice in a year, but many add a rug, lighting or storage. Post-purchase emails should suggest pieces that suit what was bought.' },
      { title: 'Seasons and moves shape timing', body: 'Spring refreshes, new-home moments and autumn nesting give natural campaign themes. Segment by room or style interest so each send feels chosen.' },
    ],
    firstFlows: ['Long-form welcome sequence on style and quality', 'Browse and cart recovery with dimensions and swatches', 'Delivery and assembly reassurance after purchase', 'Cross-sell of matching pieces', 'Seasonal room-refresh campaigns'],
    work: ['next-step-funded-campaign', 'nikos-knife-welcome'],
    terms: ['browse-abandonment-flow', 'cross-sell-email', 'abandoned-cart-flow'],
    faqs: [
      { q: 'How do you email for a long buying cycle?', a: 'We space the sequence out, answer the practical questions in turn, and keep cart reminders helpful so nobody feels hurried on a large purchase.' },
      { q: 'Can you segment by room or style?', a: 'Yes. We capture interest from browsing or a short sign-up question and use it to choose which collections each email features.' },
    ],
  },
  {
    slug: 'outdoor-and-sports-brands',
    label: 'outdoor and sports brands',
    metaTitle: 'Klaviyo Email Marketing for Outdoor and Sports Brands',
    metaDescription:
      'Klaviyo flows and campaigns for outdoor and sports brands: seasonal gear timing, activity segments, kit-up emails and restocks before the season.',
    h1: 'Klaviyo email marketing for outdoor and sports brands.',
    answer:
      'Outdoor and sports shoppers buy for a season or an event, so email works when it arrives before the trip or training block. Inferno Emails builds the Klaviyo flows and designs the campaigns for outdoor and sports brands, segmented by activity.',
    differences: [
      { title: 'Seasons set the buying window', body: 'Winter kit sells in autumn and summer kit in spring. Plan campaigns ahead of the season and use back-in-stock emails so keen buyers get first access to limited sizes.' },
      { title: 'Activity beats demographics', body: 'A trail runner, a climber and a casual walker want different gear. Segment by the activity they browse or buy and tailor product picks and content to match.' },
      { title: 'Gear is bought as a kit', body: 'Someone buying a jacket may need layers, gloves or a pack. Post-purchase and cross-sell emails that complete the kit feel helpful rather than salesy.' },
      { title: 'Fit and care reduce returns', body: 'Sizing guidance, use tips and care instructions help the product perform and protect the relationship, which matters for technical items.' },
    ],
    firstFlows: ['Welcome flow that asks about activity', 'Back-in-stock alerts for popular sizes', 'Pre-season campaigns by activity segment', 'Kit completion after purchase', 'Winback timed to the next season'],
    work: ['next-step-funded-campaign', 'bondi-coffee-campaign'],
    terms: ['back-in-stock-flow', 'email-segmentation', 'cross-sell-email'],
    faqs: [
      { q: 'How do you plan around seasons?', a: 'We map the buying calendar for your range, schedule campaigns ahead of each season, and build flows that reach people just before they need the gear.' },
      { q: 'Can emails change by sport or activity?', a: 'Yes. We use browsing, purchase history or a sign-up answer to place people in activity segments and change the content for each one.' },
    ],
  },
  {
    slug: 'baby-and-kids-brands',
    label: 'baby and kids brands',
    metaTitle: 'Klaviyo Email Marketing for Baby and Kids Brands',
    metaDescription:
      'Klaviyo flows for baby and kids brands: stage-based timing, parent-focused consent, size-up reminders and gifting, with care around marketing to children.',
    h1: 'Klaviyo email marketing for baby and kids brands.',
    answer:
      'Baby and kids products are bought by parents on a timeline set by a growing child, so email should follow the stage rather than the calendar. Inferno Emails builds the Klaviyo flows and designs the campaigns for baby and kids brands, always addressed to the adult.',
    differences: [
      { title: 'Children grow, so needs change fast', body: 'Sizes, stages and products move on within months. A size-up reminder or a next-stage suggestion, timed from a due date or birthday the parent chose to share, stays relevant.' },
      { title: 'Marketing is aimed at the parent', body: 'Rules around children and data are strict in many markets. Address the adult, do not collect a child’s details beyond what you need, and take advice on consent for anything touching a minor.' },
      { title: 'Gifting is a big share of purchases', body: 'Grandparents and friends buy for new arrivals and birthdays. Separate gift buyers from parents and keep delivery and gift messaging clear.' },
      { title: 'Trust and safety drive the choice', body: 'Parents read materials, certifications and care notes closely. Put that information in the welcome flow and product emails in plain words.' },
    ],
    firstFlows: ['Welcome flow that speaks to parents', 'Stage or size-up reminders from a shared date', 'Gift buyer flow with clear delivery messaging', 'Care and safety guidance after purchase', 'Restock alerts for sold-out sizes'],
    work: ['girafon-bleu-welcome', 'kilentar-welcome'],
    terms: ['birthday-and-anniversary-flow', 'double-opt-in', 'back-in-stock-flow'],
    faqs: [
      { q: 'Is it safe to ask for a child’s birthday?', a: 'Keep it minimal and optional, ask the parent, explain why, and check the rules in your market. We build the flow to use only what you have consent to hold.' },
      { q: 'Can you time emails to a child’s age?', a: 'Yes, where the parent has chosen to share a date. We use it to trigger size-up and next-stage emails that match where the child is.' },
    ],
  },
  {
    slug: 'tea-brands',
    label: 'tea brands',
    metaTitle: 'Klaviyo Email Marketing for Tea Brands',
    metaDescription:
      'Klaviyo flows and campaigns for tea brands: tin and refill timing, sampler-to-full-size journeys, brewing guidance and gifting at seasonal peaks.',
    h1: 'Klaviyo email marketing for tea brands.',
    answer:
      'Tea is a ritual product with many small varieties, so email should help people find a favourite and then keep it stocked. Inferno Emails builds the Klaviyo flows and designs the campaigns for tea brands, from first sampler to a steady refill rhythm.',
    differences: [
      { title: 'Discovery leads to loyalty', body: 'Many shoppers start with a sampler or a single blend. A follow-up that asks which they liked and offers a full-size tin turns curiosity into a regular order.' },
      { title: 'Refill timing varies by habit', body: 'Someone who drinks several cups a day finishes a tin far faster than an occasional drinker. Learn the common intervals from your own orders and ask drinking habit in the post-purchase flow.' },
      { title: 'Brewing guidance protects the first impression', body: 'Water temperature and steeping time change the cup. A short brewing guide after delivery improves the first experience and the reorder.' },
      { title: 'Gifting and seasons are strong', body: 'Tea gift sets suit winter and festive periods. Plan gifting campaigns early and segment gift buyers from regular drinkers.' },
    ],
    firstFlows: ['Welcome flow that helps pick a first blend', 'Sampler follow-up with a full-size offer', 'Brewing guide after delivery', 'Refill reminders by tin or pouch size', 'Seasonal gifting campaigns'],
    work: ['bondi-coffee-campaign', 'kuchenkompane-mothers-day'],
    terms: ['replenishment-flow', 'welcome-flow', 'post-purchase-flow'],
    faqs: [
      { q: 'How do you move sampler buyers to full size?', a: 'We send a follow-up after the sampler arrives that asks which blend they preferred and links straight to that blend in a full-size format.' },
      { q: 'Can you personalise by tea type?', a: 'Yes. We use purchase history and browsing to separate black, green, herbal and other tea drinkers, then choose content and products to suit.' },
    ],
  },
  {
    slug: 'candle-and-fragrance-brands',
    label: 'candle and fragrance brands',
    metaTitle: 'Klaviyo Email Marketing for Candle and Fragrance Brands',
    metaDescription:
      'Klaviyo flows and campaigns for candle and fragrance brands: scent-led storytelling, burn-down reorders, seasonal launches, gifting and discovery sets.',
    h1: 'Klaviyo email marketing for candle and fragrance brands.',
    answer:
      'Candles and fragrance are sold by mood and scent, which an inbox cannot smell, so the email must describe it well and then time the reorder. Inferno Emails builds the Klaviyo flows and designs the campaigns for candle and fragrance brands.',
    differences: [
      { title: 'Scent has to be written and shown', body: 'Customers cannot sample through a screen. Strong imagery, evocative but honest notes and a discovery set option reduce the risk of buying blind.' },
      { title: 'Burn time sets the reorder window', body: 'How long a candle lasts depends on size and how often it is lit. Use your own repurchase data to time the reminder, and treat it as an estimate rather than a promise.' },
      { title: 'Seasons drive launches', body: 'Autumn, winter and festive ranges are the big moments, with spring and summer scents between them. Build an early-access segment for loyal buyers so launches start strong.' },
      { title: 'Gifting is a major use', body: 'Candles are a default gift. Give gift buyers clear delivery dates, packaging details and a message option, and keep them apart from repeat self-purchasers.' },
    ],
    firstFlows: ['Welcome flow led by scent stories', 'Discovery set follow-up with a full-size nudge', 'Reorder reminder timed to size', 'Seasonal launch early access for past buyers', 'Gifting campaigns with delivery cut-offs'],
    work: ['girafon-bleu-welcome', 'kuchenkompane-mothers-day'],
    terms: ['replenishment-flow', 'vip-segment', 'welcome-flow'],
    faqs: [
      { q: 'How do you sell scent over email?', a: 'We pair strong imagery with clear scent notes and mood, and offer discovery sets so a shopper can try before committing to a full size.' },
      { q: 'Can you run early access for new scents?', a: 'Yes. We build a segment of past buyers and engaged subscribers who hear about launches first, which suits limited and seasonal ranges.' },
    ],
  },
  {
    slug: 'wine-and-spirits-brands',
    label: 'wine and spirits brands',
    metaTitle: 'Klaviyo Email Marketing for Wine and Spirits Brands',
    metaDescription:
      'Klaviyo flows and campaigns for wine and spirits brands: age gates, responsible marketing, club and case reorders, gifting peaks and tasting-note content.',
    h1: 'Klaviyo email marketing for wine and spirits brands.',
    answer:
      'Alcohol email has to be age-aware and responsible before it is persuasive, and then it can build a loyal drinker through tasting notes and reorders. Inferno Emails builds the Klaviyo flows and designs the campaigns for wine and spirits brands within those limits.',
    differences: [
      { title: 'Age and audience rules come first', body: 'Alcohol marketing is restricted in most markets. Confirm age at sign-up, keep the audience to adults, and have your advertising rules checked before any campaign design starts.' },
      { title: 'Responsible messaging is part of the brief', body: 'Avoid language that links drinking with success, youth appeal or excess, and include responsible drinking notes where your market expects them.' },
      { title: 'Reorders come in cases and clubs', body: 'Wine is often bought by the case or through a club. Time reminders from your own order history and build a clear club or subscription path with an easy way to pause.' },
      { title: 'Occasions and gifting spike demand', body: 'Festive periods, holidays and celebrations bring gifting. Plan campaigns early and make delivery cut-offs obvious, since alcohol delivery can be stricter.' },
    ],
    firstFlows: ['Age-confirmed welcome flow', 'Tasting-note and pairing content', 'Case or club reorder reminders', 'Gifting campaigns with delivery cut-offs', 'Winback for customers who stopped ordering'],
    work: ['kuchenkompane-mothers-day', 'bondi-coffee-campaign'],
    terms: ['double-opt-in', 'replenishment-flow', 'subscription-churn'],
    faqs: [
      { q: 'Do you build age gates into the sign-up?', a: 'We build the age confirmation into the sign-up flow and keep the welcome email adult-only, though the gate itself should follow your legal advice for each market.' },
      { q: 'Can you write alcohol campaigns responsibly?', a: 'Yes. We follow your approved guidance, keep the tone measured, and send every email for your review before it goes out.' },
    ],
  },
  {
    slug: 'plant-and-garden-brands',
    label: 'plant and garden brands',
    metaTitle: 'Klaviyo Email Marketing for Plant and Garden Brands',
    metaDescription:
      'Klaviyo flows and campaigns for plant and garden brands: growing-season timing, care guidance, delivery condition messaging and seasonal reorders.',
    h1: 'Klaviyo email marketing for plant and garden brands.',
    answer:
      'Plant and garden shoppers want their purchase to thrive, so email should teach care and follow the growing season. Inferno Emails builds the Klaviyo flows and designs the campaigns for plant and garden brands, from delivery day to the next planting window.',
    differences: [
      { title: 'The growing season is the calendar', body: 'Planting, feeding and pruning happen at set points in the year, and they differ by region. Time campaigns to the season and segment by climate where you can.' },
      { title: 'Care guidance is the retention tool', body: 'A plant that survives creates a happy customer. Care emails timed to arrival and to later stages protect the experience and invite the next purchase.' },
      { title: 'Delivery condition matters', body: 'Live products are sensitive to transit and weather. Say clearly when plants ship and what to do on arrival, and set expectations so problems are reported early.' },
      { title: 'Reorders are consumables and add-ons', body: 'Soil, feed, pots and seeds are repeat items, while a new plant may lead to a matching one. Suggest what fits what was bought.' },
    ],
    firstFlows: ['Welcome flow tied to the growing season', 'Arrival care guide', 'Care check-in emails at later stages', 'Reorder reminders for feed and soil', 'Seasonal planting campaigns by region'],
    work: ['kuchenkompane-mothers-day', 'iced-plunge-welcome'],
    terms: ['post-purchase-flow', 'email-segmentation', 'replenishment-flow'],
    faqs: [
      { q: 'How do you handle regional growing seasons?', a: 'We segment by region or climate where you hold that data and time campaigns to each segment, so a planting email never lands in the wrong season.' },
      { q: 'Can you set up plant care emails?', a: 'Yes. We build a care sequence that starts at delivery and continues through later stages, with advice written for each product type.' },
    ],
  },
  {
    slug: 'art-and-print-brands',
    label: 'art and print brands',
    metaTitle: 'Klaviyo Email Marketing for Art and Print Brands',
    metaDescription:
      'Klaviyo flows and campaigns for art and print brands: artist-led storytelling, limited release alerts, framing guidance and collector segments.',
    h1: 'Klaviyo email marketing for art and print brands.',
    answer:
      'Art and print buyers respond to the artist, the edition and the story, so email should be as considered as the work. Inferno Emails builds the Klaviyo flows and designs the campaigns for art and print brands, including release alerts for collectors.',
    differences: [
      { title: 'The story sells the piece', body: 'Who made it, how and why matter as much as the image. Welcome emails and release announcements that tell that story earn a closer look.' },
      { title: 'Limited editions need early access', body: 'Collectors want to hear first. A segment of past buyers and engaged subscribers with early access to limited releases rewards loyalty and fills editions fast.' },
      { title: 'Size, framing and placement are the hurdles', body: 'Buyers worry about how a print will look at home. Show sizes in context, explain framing options and answer paper and finish questions in the flow.' },
      { title: 'Collectors buy more than once', body: 'A first print often leads to a second by the same artist or a matching piece. Post-purchase emails that point to related work keep the collector close.' },
    ],
    firstFlows: ['Welcome flow led by the artist story', 'Limited release alerts with early access', 'Framing and placement guidance', 'Cross-sell of related work', 'Winback with new releases for past collectors'],
    work: ['kilentar-welcome', 'girafon-bleu-welcome'],
    terms: ['vip-segment', 'cross-sell-email', 'back-in-stock-flow'],
    faqs: [
      { q: 'Can you run early access for limited editions?', a: 'Yes. We build a segment of past buyers and engaged subscribers who receive release emails first, then open the release to the wider list.' },
      { q: 'How do you reduce hesitation over size and framing?', a: 'We show prints in context, explain sizes and framing options plainly, and put those answers in the welcome flow and cart emails.' },
    ],
  },
  {
    slug: 'tech-accessory-brands',
    label: 'tech accessory brands',
    metaTitle: 'Klaviyo Email Marketing for Tech Accessory Brands',
    metaDescription:
      'Klaviyo flows and campaigns for tech accessory brands: device-model segments, launch-cycle timing, compatibility clarity and cross-sell bundles.',
    h1: 'Klaviyo email marketing for tech accessory brands.',
    answer:
      'Tech accessories are tied to a device, so email must know which model the customer owns and react when new devices launch. Inferno Emails builds the Klaviyo flows and designs the campaigns for tech accessory brands, with compatibility at the centre.',
    differences: [
      { title: 'The device decides relevance', body: 'A case for one phone is useless to the owner of another. Capture the device model at sign-up or from the first order and use it to filter every product suggestion.' },
      { title: 'Launch cycles reset demand', body: 'New device releases create bursts of interest in compatible cases, chargers and cables. Prepare campaigns and early-access segments ahead of the launch window.' },
      { title: 'Compatibility is the main objection', body: 'Shoppers fear buying the wrong fit. State compatibility clearly in cart recovery and product emails so doubt does not stop the order.' },
      { title: 'Bundles and add-ons lift the basket', body: 'Chargers, cables and cases are bought together. Post-purchase cross-sell that matches the device feels like help, not a pitch.' },
    ],
    firstFlows: ['Welcome flow that asks for the device model', 'Compatibility-aware cart and browse recovery', 'Launch-window campaigns by device', 'Post-purchase accessory cross-sell', 'Review request after delivery'],
    work: ['nikos-knife-welcome', 'next-step-funded-campaign'],
    terms: ['browse-abandonment-flow', 'cross-sell-email', 'dynamic-content'],
    faqs: [
      { q: 'How do you target by device model?', a: 'We capture the model at sign-up or checkout, store it as a profile property in Klaviyo, and use it to show only compatible products.' },
      { q: 'Can you prepare for a new device launch?', a: 'Yes. We plan a campaign and an early-access segment ahead of the launch so compatible products are ready to promote as soon as demand rises.' },
    ],
  },
  {
    slug: 'subscription-box-brands',
    label: 'subscription box brands',
    metaTitle: 'Klaviyo Email Marketing for Subscription Box Brands',
    metaDescription:
      'Klaviyo flows and campaigns for subscription box brands: onboarding, churn prevention, pause and skip options, honest cancellation and renewal reminders.',
    h1: 'Klaviyo email marketing for subscription box brands.',
    answer:
      'For a subscription box the first month and the cancel button decide the business, so email should onboard well and keep leaving easy and honest. Inferno Emails builds the Klaviyo flows and designs the campaigns for subscription box brands, aimed at retention.',
    differences: [
      { title: 'Onboarding sets the lifetime', body: 'The first box and the weeks around it shape whether someone stays. A short onboarding series that explains what to expect and how to get the most from each box reduces early drop-off.' },
      { title: 'Churn needs options, not traps', body: 'Offer skip, pause and swap before cancellation, and make cancelling clear. Cancellation and renewal rules exist in many markets, so keep reminders and exit routes plain and compliant.' },
      { title: 'Renewal and billing messages must be clear', body: 'Customers dislike surprise charges. Send renewal reminders and receipts that state what is happening and when, and treat these as transactional rather than promotional.' },
      { title: 'Acquisition and retention differ', body: 'A person weighing a first box needs reassurance, while a long-term member needs novelty and recognition. Segment by tenure so each message fits.' },
    ],
    firstFlows: ['Welcome and onboarding series for new members', 'Pre-shipment and unboxing emails', 'Skip, pause and swap prompts', 'Honest cancellation and save flow', 'Winback for former members'],
    work: ['iced-plunge-welcome', 'bondi-coffee-campaign'],
    terms: ['subscription-churn', 'transactional-vs-marketing-email', 'winback-flow'],
    faqs: [
      { q: 'How do you reduce churn without dark patterns?', a: 'We offer skip, pause and swap routes and a fair save offer, while keeping the cancel path clear, in line with the rules in your market.' },
      { q: 'Can you segment by how long someone has subscribed?', a: 'Yes. We split members by tenure so new subscribers get onboarding, long-term members get recognition, and lapsed ones get a winback.' },
    ],
  },
  {
    slug: 'eyewear-brands',
    label: 'eyewear brands',
    metaTitle: 'Klaviyo Email Marketing for Eyewear Brands',
    metaDescription:
      'Klaviyo flows and campaigns for eyewear brands: fit and try-on reassurance, prescription clarity, new-frame launches and replacement reminders.',
    h1: 'Klaviyo email marketing for eyewear brands.',
    answer:
      'Eyewear is a fit-sensitive purchase, so email must reduce doubt about size, face shape and prescription before it pushes a launch. Inferno Emails builds the Klaviyo flows and designs the campaigns for eyewear brands, from first frame to the next pair.',
    differences: [
      { title: 'Fit is the main worry', body: 'Shoppers cannot try frames on easily. Fit guides, face-shape advice and a clear returns or try-at-home route belong in the welcome flow and cart emails.' },
      { title: 'Prescription adds complexity', body: 'Prescription orders have extra steps. Explain what is needed and what happens next so the customer does not stall mid-order, and keep health-related wording careful.' },
      { title: 'Replacement and second pairs create repeat orders', body: 'People replace, upgrade or add sunglasses and spare pairs over time. Time a reminder from your own repurchase data rather than a fixed guess.' },
      { title: 'Launches and seasons matter', body: 'New frame collections and summer sunglasses are natural campaign moments. Early access for past buyers rewards loyalty.' },
    ],
    firstFlows: ['Welcome flow with fit and face-shape guidance', 'Cart recovery that answers fit and prescription questions', 'Order updates and care guidance', 'Second pair and sunglasses cross-sell', 'Replacement reminder timed to your repurchase data'],
    work: ['nikos-knife-welcome', 'kilentar-welcome'],
    terms: ['abandoned-cart-flow', 'cross-sell-email', 'replenishment-flow'],
    faqs: [
      { q: 'Can email reduce fit doubts?', a: 'It can help. We put fit guides, face-shape advice and the returns route into the welcome flow and cart recovery so shoppers feel safer ordering.' },
      { q: 'How do you time a replacement reminder?', a: 'We study your own repurchase intervals and test where the reminder lands, rather than using a generic number.' },
    ],
  },
  {
    slug: 'footwear-brands',
    label: 'footwear brands',
    metaTitle: 'Klaviyo Email Marketing for Footwear Brands',
    metaDescription:
      'Klaviyo flows and campaigns for footwear brands: size-specific restocks, fit and return reassurance, seasonal ranges and wear-out replacement timing.',
    h1: 'Klaviyo email marketing for footwear brands.',
    answer:
      'Footwear sells by size, and the right size sells out, so email should be built around stock and fit. Inferno Emails builds the Klaviyo flows and designs the campaigns for footwear brands, covering restocks, returns and the next pair.',
    differences: [
      { title: 'Size availability is the trigger', body: 'A shopper who wanted a size that sold out will buy when it returns. Size-specific back-in-stock emails capture that intent far better than a general announcement.' },
      { title: 'Fit uncertainty drives returns', body: 'Shoes fit differently between brands. Sizing guidance and a clear returns policy in the welcome and cart emails reduce hesitation and later regret.' },
      { title: 'Seasons change the range', body: 'Boots, sandals and trainers have their own windows. Plan campaigns ahead of each season and segment by the type of shoe someone browses.' },
      { title: 'Wear-out sets a loose reorder window', body: 'How long a pair lasts depends on use and care. Time a replacement or care product reminder from your own data, and treat it as an estimate.' },
    ],
    firstFlows: ['Welcome flow with sizing guidance', 'Size-specific back-in-stock alerts', 'Browse and cart recovery', 'Care and cleaning follow-up', 'Seasonal range campaigns by shoe type'],
    work: ['kilentar-welcome', 'next-step-funded-campaign'],
    terms: ['back-in-stock-flow', 'browse-abandonment-flow', 'email-segmentation'],
    faqs: [
      { q: 'Can restock emails be size-specific?', a: 'Yes. We capture the size a shopper wanted and notify them only when that size returns, which keeps the email useful and the click-through strong.' },
      { q: 'How do you handle returns concerns in email?', a: 'We state the returns route plainly in the welcome flow and cart emails and add sizing help, so buyers feel safer choosing a size.' },
    ],
  },
  {
    slug: 'haircare-brands',
    label: 'haircare brands',
    metaTitle: 'Klaviyo Email Marketing for Haircare Brands',
    metaDescription:
      'Klaviyo flows and campaigns for haircare brands: hair-type segments, routine education, refill timing by bottle size and careful cosmetic claims.',
    h1: 'Klaviyo email marketing for haircare brands.',
    answer:
      'Haircare buyers choose by hair type and goal, so email should sort them early and then teach the routine and time the refill. Inferno Emails builds the Klaviyo flows and designs the campaigns for haircare brands, with hair-type segments throughout.',
    differences: [
      { title: 'Hair type decides the product', body: 'Texture, length, scalp condition and colour treatment change what suits a person. Ask in a quiz or sign-up and store the answers so recommendations stay accurate.' },
      { title: 'Results depend on how it is used', body: 'Washing frequency, amount and order matter. Post-purchase usage emails help people get results and are less likely to blame the product.' },
      { title: 'Refill timing depends on bottle size and routine', body: 'A person who washes daily runs out faster than one who washes twice a week. Use your own repurchase data and ask frequency in the flow rather than assuming.' },
      { title: 'Claims need restraint', body: 'Words about growth, repair or scalp conditions are watched in many markets. Keep claims modest, supportable and approved before sending.' },
    ],
    firstFlows: ['Welcome flow with hair-type quiz', 'Routine and usage guidance after purchase', 'Refill reminder by bottle size', 'Cross-sell of styling or treatment products', 'Winback for lapsed customers'],
    work: ['femmenal-campaign', 'girafon-bleu-welcome'],
    terms: ['replenishment-flow', 'email-segmentation', 'dynamic-content'],
    faqs: [
      { q: 'Can the emails change by hair type?', a: 'Yes. We save the quiz answers in Klaviyo and use them to pick which products and tips each customer sees in every flow.' },
      { q: 'How do you time haircare refills?', a: 'We combine your repurchase data with a question about wash frequency, then test the reminder point so it lands before the bottle is empty.' },
    ],
  },
  {
    slug: 'stationery-and-gift-brands',
    label: 'stationery and gift brands',
    metaTitle: 'Klaviyo Email Marketing for Stationery and Gift Brands',
    metaDescription:
      'Klaviyo flows and campaigns for stationery and gift brands: occasion calendars, gift buyer flows, back-to-school and planner seasons, and delivery cut-offs.',
    h1: 'Klaviyo email marketing for stationery and gift brands.',
    answer:
      'Stationery and gifts are driven by occasions and seasons, so email should run on a calendar and make last-order dates obvious. Inferno Emails builds the Klaviyo flows and designs the campaigns for stationery and gift brands, including flows for people buying for someone else.',
    differences: [
      { title: 'The year has fixed peaks', body: 'Planner season, back to school, cards for celebrations and festive gifting each have their own window. Map them early and prepare designs and segments in advance.' },
      { title: 'Gift buyers need clear logistics', body: 'Someone buying a present cares about delivery dates, wrapping and a message. Put last-order dates in the email and keep gift buyers apart from regular customers.' },
      { title: 'Repeat purchase is occasion-based', body: 'A customer may buy a card for every birthday or a new planner each year. Use dates they chose to share to time a quiet reminder before the next occasion.' },
      { title: 'Low basket values need smart bundles', body: 'Individual items are inexpensive, so bundles, sets and personalisation lift the order. Suggest them after the first add to basket.' },
    ],
    firstFlows: ['Welcome flow that shows the range and gift ideas', 'Occasion calendar campaigns planned early', 'Gift buyer flow with last-order dates', 'Reminder before a shared birthday or anniversary', 'Bundle cross-sell after purchase'],
    work: ['kuchenkompane-mothers-day', 'girafon-bleu-welcome'],
    terms: ['birthday-and-anniversary-flow', 'cross-sell-email', 'welcome-flow'],
    faqs: [
      { q: 'How do you plan for the busiest gifting weeks?', a: 'We schedule designs, segments and delivery cut-off messaging several weeks ahead, so the campaign is ready when the buying window opens.' },
      { q: 'Can you remind customers before the next birthday?', a: 'Yes, where the customer chose to share a date. We time a reminder ahead of the occasion with ideas that suit what they bought before.' },
    ],
  },
  {
    slug: 'bike-and-cycling-brands',
    label: 'bike and cycling brands',
    metaTitle: 'Klaviyo Email Marketing for Bike and Cycling Brands',
    metaDescription:
      'Klaviyo flows and campaigns for bike and cycling brands: considered bike purchases, parts and apparel cross-sell, service reminders and riding-season timing.',
    h1: 'Klaviyo email marketing for bike and cycling brands.',
    answer:
      'Cycling mixes a large considered purchase with a steady stream of parts, kit and service, so email has to handle both. Inferno Emails builds the Klaviyo flows and designs the campaigns for bike and cycling brands, from the first ride to the next upgrade.',
    differences: [
      { title: 'Bikes are researched, accessories are habitual', body: 'A bike buyer compares frame, size and spec over weeks, while a rider buys tubes, lights and kit often. Treat them as different journeys and segment by what they have bought.' },
      { title: 'Riding season shapes demand', body: 'Spring brings first rides and upgrades, and winter brings lights and layers. Plan campaigns ahead of each shift in weather.' },
      { title: 'Service and wear parts create reorders', body: 'Chains, tyres and pads wear out depending on distance and conditions. Use your repurchase data, and invite customers to share how often they ride so reminders stay relevant.' },
      { title: 'Fit and compatibility are the hurdles', body: 'Frame size, wheel standard and part fit decide whether a purchase works. State compatibility clearly and offer sizing help to avoid returns.' },
    ],
    firstFlows: ['Welcome flow that asks what and how they ride', 'Considered cart recovery for bikes', 'Post-purchase setup and care guidance', 'Parts and wear-item reminders', 'Seasonal kit campaigns by riding type'],
    work: ['next-step-funded-campaign', 'bondi-coffee-campaign'],
    terms: ['cross-sell-email', 'replenishment-flow', 'abandoned-cart-flow'],
    faqs: [
      { q: 'How do you email for a high-value bike purchase?', a: 'We build a patient sequence that answers sizing, spec and delivery questions, and keep cart reminders helpful rather than pressured.' },
      { q: 'Can you remind riders about wear parts?', a: 'Yes. We use your repurchase patterns and, where shared, how often someone rides, to time reminders for tyres, chains and similar parts.' },
    ],
  },
  {
    slug: 'vegan-and-plant-based-food-brands',
    label: 'vegan and plant-based food brands',
    metaTitle: 'Klaviyo Email Marketing for Vegan and Plant-Based Food Brands',
    metaDescription:
      'Klaviyo flows and campaigns for vegan and plant-based food brands: taste-first welcome emails, recipe content, reorder timing and honest ingredient messaging.',
    h1: 'Klaviyo email marketing for vegan and plant-based food brands.',
    answer:
      'Plant-based shoppers are often trying a product to see whether it tastes right, so email should lead with taste and use, then bring them back for the next order. Inferno Emails builds the Klaviyo flows and designs the campaigns for vegan and plant-based food brands.',
    differences: [
      { title: 'Taste is the first barrier', body: 'Many buyers are curious rather than committed. Lead the welcome flow with flavour, texture and how to serve it, not just the values behind the brand.' },
      { title: 'Recipes and ideas drive repeat use', body: 'Short recipe emails show how the product fits into a week of meals, which builds the habit that leads to reorders.' },
      { title: 'Dietary labels demand accuracy', body: 'Vegan, allergen and ingredient statements are checked by shoppers and regulators. Repeat only what your packaging and labelling support, and keep allergen details clear.' },
      { title: 'Reorders follow pack size and habit', body: 'How fast a pack is used depends on household size and how often it is cooked. Time reminders from your own repurchase data and offer a subscription where it suits.' },
    ],
    firstFlows: ['Welcome flow led by taste and serving ideas', 'Recipe series across the first weeks', 'Reorder reminders by pack size', 'Subscription offer after the first order', 'Seasonal and gifting campaigns'],
    work: ['kuchenkompane-mothers-day', 'bondi-coffee-campaign'],
    terms: ['welcome-flow', 'replenishment-flow', 'post-purchase-flow'],
    faqs: [
      { q: 'How do you turn trial buyers into repeat customers?', a: 'We follow the first order with serving ideas and recipes, then time a reorder reminder from your repurchase data so the habit forms.' },
      { q: 'How do you handle allergen and vegan statements?', a: 'We repeat only the wording on your approved labelling and keep allergen information clear, with your team signing off every email before it sends.' },
    ],
  },
];

export const getUseCase = (slug: string) => USE_CASES.find((u) => u.slug === slug);
