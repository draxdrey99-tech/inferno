/**
 * Klaviyo integration guides for ecommerce apps. Each page explains what the
 * app sends to Klaviyo, the flows that data makes possible, the usual setup
 * order and the mistakes to avoid. General practice only: no client results,
 * prices or plan names, and event names are described in general terms where
 * they vary by app version.
 */
export type Integration = {
  slug: string;
  app: string;
  category: 'platform' | 'reviews' | 'subscriptions' | 'loyalty' | 'support' | 'sms' | 'forms' | 'shipping';
  metaTitle: string;
  metaDescription: string;
  /** Direct, quotable answer. */
  answer: string;
  events: { name: string; meaning: string }[];
  flows: { title: string; body: string }[];
  setup: { title: string; body: string }[];
  pitfalls: string[];
  /** Glossary term slugs. */
  terms: string[];
  /** Service page slug. */
  service: string;
};

export const INTEGRATIONS: Integration[] = [
  {
    slug: 'shopify',
    app: 'Shopify',
    category: 'platform',
    metaTitle: 'Klaviyo and Shopify Integration Guide for Ecommerce Stores',
    metaDescription: 'How the Klaviyo Shopify integration works: what syncs, which flows it powers, the setup order and the mistakes that break tracking on a live store.',
    answer: 'The Klaviyo Shopify integration connects your store to Klaviyo so customer profiles, browsing, cart, checkout and order activity flow in automatically. That data triggers abandoned cart, browse abandonment, post purchase and winback flows. You connect the app from Shopify or Klaviyo, confirm the metrics appear, then build flows on top.',
    events: [
      { name: 'Browsing activity', meaning: 'Product views and searches on the storefront, used for browse abandonment and recommendations once onsite tracking is running.' },
      { name: 'Cart and checkout activity', meaning: 'Items added to a cart and checkouts that start but do not finish, which power abandoned cart flows.' },
      { name: 'Order events', meaning: 'Placed and fulfilled orders with line items, so you can segment by what people bought and when.' },
      { name: 'Customer and consent data', meaning: 'Profiles, addresses and marketing consent taken from Shopify customers and checkout.' },
      { name: 'Catalogue sync', meaning: 'Products, images, prices and availability, used for dynamic blocks and back in stock messages.' }
    ],
    flows: [
      { title: 'Abandoned cart and checkout', body: 'Triggered when a checkout starts and no order follows. Keep the first message close to the moment of interest and show the actual items left behind.' },
      { title: 'Post purchase', body: 'Starts from the order event. Use it for a thank you, care advice and a review request once the item should have arrived.' },
      { title: 'Browse abandonment', body: 'Reaches people who looked at products but never added to cart. It relies on identified visitors, so list growth and onsite tracking matter.' },
      { title: 'Winback', body: 'Uses the gap since the last placed order to bring lapsed customers back with a reason to return rather than a blanket discount.' }
    ],
    setup: [
      { title: 'Connect from the integrations page', body: 'In Klaviyo open the integrations section, choose Shopify and follow the prompts, signing in as a store owner or staff member with permission to install apps.' },
      { title: 'Confirm the sync has started', body: 'Large stores take time to import history. Check that profiles and orders are arriving before you judge any report.' },
      { title: 'Check the metrics', body: 'Open the metrics list and look for checkout, cart and order activity. A missing metric usually means a permission or tracking setting needs attention.' },
      { title: 'Turn on onsite tracking', body: 'Make sure the Klaviyo script loads on the storefront so browsing and cart activity are tied to known visitors.' },
      { title: 'Align consent settings', body: 'Decide how Shopify checkout consent maps to Klaviyo subscription status so you only email people who agreed.' },
      { title: 'Build and test a flow', body: 'Create the abandoned cart flow first, then place a test order and a test abandoned checkout using your own address to see each message.' }
    ],
    pitfalls: [
      'Connecting a development or duplicate store to the live account and mixing test data into real profiles.',
      'Assuming consent at checkout is the same as subscription in Klaviyo without checking the mapping.',
      'Running a second app that also sends cart emails, so customers receive two reminders.',
      'Editing the theme and accidentally removing the tracking script.',
      'Judging flow results before the historical import has finished.'
    ],
    terms: ['abandoned-cart-flow', 'klaviyo-metric', 'event-trigger'],
    service: 'klaviyo-email-marketing'
  },
  {
    slug: 'woocommerce',
    app: 'WooCommerce',
    category: 'platform',
    metaTitle: 'Klaviyo and WooCommerce Integration Guide for Ecommerce',
    metaDescription: 'Connect WooCommerce to Klaviyo with the plugin: what data syncs, which flows it powers and the WordPress specific problems to watch for.',
    answer: 'WooCommerce connects to Klaviyo through a plugin installed in WordPress. Once linked with your Klaviyo API keys, it sends customer, cart, checkout and order activity so you can run abandoned cart, post purchase and winback flows. Because it runs on your own hosting, caching and plugin conflicts are the usual cause of missing data.',
    events: [
      { name: 'Order activity', meaning: 'Orders placed and their status changes as the plugin reports them, with the products in each order.' },
      { name: 'Cart and checkout activity', meaning: 'Started checkouts and carts that were left, available once the visitor has been identified by an email address.' },
      { name: 'Customer profiles', meaning: 'Names, emails and account details from WooCommerce customers and guest checkouts.' },
      { name: 'Newsletter opt in at checkout', meaning: 'The consent checkbox you add to checkout, which can place people on a chosen Klaviyo list.' },
      { name: 'Product and catalogue data', meaning: 'Product details used in emails, which depend on how the plugin is configured and kept up to date.' }
    ],
    flows: [
      { title: 'Abandoned cart', body: 'Depends on the plugin tracking carts for identified visitors. Test it with a real browser session, since caching can hide it.' },
      { title: 'Order follow up', body: 'Starts from order events and suits a thank you plus usage advice, separate from the standard WooCommerce receipt.' },
      { title: 'Checkout opt in welcome', body: 'Welcomes people who ticked the newsletter box at checkout and tells them what to expect from you.' },
      { title: 'Repeat purchase nudge', body: 'Uses order history to remind buyers of consumable products around the time they usually need more.' }
    ],
    setup: [
      { title: 'Install the plugin', body: 'Add the Klaviyo plugin from your WordPress admin, preferably on a staging copy first if the site takes real orders.' },
      { title: 'Add your API keys', body: 'Create keys in your Klaviyo account settings and paste them into the plugin. Use keys with only the access the plugin needs.' },
      { title: 'Choose the signup list', body: 'Pick the list that checkout opt ins join, and set the checkbox wording and default state to match your consent rules.' },
      { title: 'Check metrics appear', body: 'Place a test order and confirm order and checkout activity shows against your profile in Klaviyo.' },
      { title: 'Review caching rules', body: 'Exclude cart and checkout pages from page caching, otherwise tracking scripts may not run for each visitor.' },
      { title: 'Build and test a flow', body: 'Create the abandoned cart flow, abandon a cart in a private window with your email, and check the message arrives.' }
    ],
    pitfalls: [
      'Page caching or optimisation plugins stripping or delaying the tracking script.',
      'A pre ticked opt in box that does not meet consent requirements.',
      'Leaving staging site traffic connected to the live Klaviyo account.',
      'Skipping plugin updates, which can break sync after a WooCommerce upgrade.',
      'Expecting every historical order to be present without checking the import.'
    ],
    terms: ['abandoned-cart-flow', 'double-opt-in', 'klaviyo-metric'],
    service: 'klaviyo-email-marketing'
  },
  {
    slug: 'bigcommerce',
    app: 'BigCommerce',
    category: 'platform',
    metaTitle: 'Klaviyo and BigCommerce Integration Guide for Online Stores',
    metaDescription: 'How the Klaviyo BigCommerce integration works: data that syncs, flows it supports, setup order and the checkout and catalogue issues to check.',
    answer: 'Klaviyo connects to BigCommerce through its native integration, which syncs customers, catalogue, carts and orders into Klaviyo. From that data you can run abandoned cart, post purchase, back in stock and winback flows. After connecting, confirm the metrics are present and check that your checkout setup passes visitor identity through correctly.',
    events: [
      { name: 'Order events', meaning: 'Placed orders and their line items, which drive post purchase flows and purchase based segments.' },
      { name: 'Cart and checkout events', meaning: 'Carts and started checkouts, used to trigger recovery messages when no order follows.' },
      { name: 'Customer data', meaning: 'Customer records and groups from BigCommerce that can be used as profile properties.' },
      { name: 'Catalogue sync', meaning: 'Products, categories and images so emails can show current items and prices.' },
      { name: 'Subscription consent', meaning: 'Marketing consent captured at signup or checkout, mapped to a Klaviyo list.' }
    ],
    flows: [
      { title: 'Abandoned cart recovery', body: 'Triggered by a started checkout with no order. It depends on the visitor being identified before they leave.' },
      { title: 'Back in stock', body: 'Uses catalogue availability so shoppers who asked to be told are emailed when the item returns.' },
      { title: 'Post purchase education', body: 'Follows the order event with setup help or product advice suited to what was actually bought.' },
      { title: 'Customer group welcome', body: 'Uses customer group data to greet trade or wholesale buyers differently from retail shoppers.' }
    ],
    setup: [
      { title: 'Start the connection in Klaviyo', body: 'Choose BigCommerce in the integrations section and authorise it from your BigCommerce admin with an account that can install apps.' },
      { title: 'Let the first sync run', body: 'Catalogue, customers and orders are imported in the background. Wait for it to settle before checking any numbers.' },
      { title: 'Verify metrics', body: 'Look for order, cart and checkout activity in Klaviyo after a test purchase, matched to a profile with your email.' },
      { title: 'Check the tracking script', body: 'Confirm the script is present on storefront and checkout pages where your plan and theme allow it.' },
      { title: 'Map consent', body: 'Decide which list receives newsletter sign ups at checkout and confirm the wording is clear.' },
      { title: 'Build and test', body: 'Create the abandoned cart flow, run a test checkout abandonment, and read each message on desktop and mobile.' }
    ],
    pitfalls: [
      'Custom or headless checkouts that never pass the shopper email back to Klaviyo.',
      'Assuming every customer group is imported as a profile property without checking.',
      'Duplicate tracking from a second marketing app on the same store.',
      'Testing with an address already suppressed in Klaviyo and getting no messages.',
      'Leaving theme changes untested after a template update.'
    ],
    terms: ['back-in-stock-flow', 'catalog-feed', 'event-trigger'],
    service: 'klaviyo-email-marketing'
  },
  {
    slug: 'magento',
    app: 'Magento',
    category: 'platform',
    metaTitle: 'Klaviyo and Magento Integration Guide for Ecommerce Teams',
    metaDescription: 'Connect Magento or Adobe Commerce to Klaviyo with the extension: what syncs, which flows it enables, setup order and common server side problems.',
    answer: 'Klaviyo connects to Magento and Adobe Commerce through an extension that you install on your own server. It sends customers, carts, orders and catalogue data to Klaviyo, powering abandoned cart, post purchase and winback flows. Because you host it, cron jobs, queues and store view settings matter as much as the Klaviyo side.',
    events: [
      { name: 'Order and fulfilment events', meaning: 'Orders placed and later status changes reported by the extension, useful for confirmation and shipping aware messages.' },
      { name: 'Cart activity', meaning: 'Quote and cart changes tied to a known customer, which trigger recovery flows.' },
      { name: 'Customer attributes', meaning: 'Account details and customer groups that can become profile properties for segmentation.' },
      { name: 'Catalogue data', meaning: 'Product information per store view, used for dynamic blocks and feeds.' },
      { name: 'Newsletter subscription', meaning: 'Magento newsletter signups synced to a Klaviyo list so consent stays aligned.' }
    ],
    flows: [
      { title: 'Abandoned cart', body: 'Built on cart activity for identified customers. Multi store setups need the right store view mapped to the right sender.' },
      { title: 'Order follow up', body: 'Starts after an order and can branch by customer group, for example trade accounts versus retail.' },
      { title: 'Account activation', body: 'Encourages new registered customers to complete a first purchase with helpful guidance rather than pressure.' },
      { title: 'Reorder reminder', body: 'Uses past orders to prompt repeat buying for products that run out, ideally with a direct reorder link.' }
    ],
    setup: [
      { title: 'Install the extension', body: 'Add it through your normal deployment route, using a staging environment first, then clear caches and compile as your setup requires.' },
      { title: 'Enter API keys', body: 'Create keys in Klaviyo and enter them in the extension configuration for each website or store view you plan to use.' },
      { title: 'Check scheduled jobs', body: 'Confirm cron is running, since syncs and queued events depend on it. A stalled cron looks like missing data.' },
      { title: 'Map lists and consent', body: 'Choose the Klaviyo list for newsletter signups per store view and review the wording used at checkout.' },
      { title: 'Verify metrics', body: 'Place a test order and confirm order and cart activity appears against your profile.' },
      { title: 'Build and test a flow', body: 'Create an abandoned cart flow and test it from a logged in and a guest session, as they can behave differently.' }
    ],
    pitfalls: [
      'Cron not running, so events queue up and arrive late or not at all.',
      'Full page cache serving pages without the tracking script.',
      'Mixing store views in one list without separating languages or currencies.',
      'Upgrading Magento without retesting the extension.',
      'Testing only as a guest and missing logged in behaviour.'
    ],
    terms: ['event-trigger', 'email-segmentation', 'klaviyo-metric'],
    service: 'email-flows'
  },
  {
    slug: 'yotpo',
    app: 'Yotpo',
    category: 'reviews',
    metaTitle: 'Klaviyo and Yotpo Integration Guide for Reviews and Ratings',
    metaDescription: 'How Yotpo reviews connect to Klaviyo: the activity that syncs, flows it enables, setup order and how to avoid duplicate review request emails.',
    answer: 'Yotpo connects to Klaviyo so review and rating activity appears as events and profile data you can use in flows and segments. You can trigger messages when a review is submitted, feature star ratings in emails, and separate reviewers from non reviewers. Decide whether Yotpo or Klaviyo sends the review request, never both.',
    events: [
      { name: 'Review submitted', meaning: 'A customer has left a review, usable to thank them and to exclude them from further requests.' },
      { name: 'Review request activity', meaning: 'Signals about requests sent from Yotpo, so you can see who has already been asked.' },
      { name: 'Rating information', meaning: 'Star ratings and review content that can be placed in emails as social proof.' },
      { name: 'Reviewer profile properties', meaning: 'Properties on a profile that mark reviewers, helpful for building segments of advocates.' }
    ],
    flows: [
      { title: 'Review thank you', body: 'Sent when a review arrives. Keep it short, thank the reviewer and point to a related product rather than asking for more.' },
      { title: 'Review request timing', body: 'If Klaviyo owns the request, time it from the order or fulfilment event with a delay long enough for the item to arrive.' },
      { title: 'Social proof in cart recovery', body: 'Add review stars and a short quote to abandoned cart or browse flows to reassure hesitant shoppers.' },
      { title: 'Advocate segment campaigns', body: 'Use reviewers as a segment for early access or feedback requests, as they have shown they will engage.' }
    ],
    setup: [
      { title: 'Connect inside Yotpo', body: 'Open the Klaviyo option in the Yotpo integrations area and sign in with your Klaviyo account to authorise it.' },
      { title: 'Confirm what is sent', body: 'Check which review and request activity the connection reports, as it can vary by Yotpo product and configuration.' },
      { title: 'Look for the activity in Klaviyo', body: 'Submit a test review and check that the event appears on your profile in Klaviyo.' },
      { title: 'Choose who sends requests', body: 'Decide between Yotpo request emails or a Klaviyo flow, and switch the other off.' },
      { title: 'Place reviews in templates', body: 'Add rating blocks to key emails and confirm they show the right product.' },
      { title: 'Test the journey', body: 'Order a product, trigger the request, leave a review and check the thank you and the suppression of further requests.' }
    ],
    pitfalls: [
      'Customers receiving a request from both Yotpo and Klaviyo.',
      'Asking for a review before the product could have arrived.',
      'Showing ratings for the wrong product in a template block.',
      'Emailing reviewers with a request again straight after they submitted one.',
      'Assuming every reviewer is a subscriber with marketing consent.'
    ],
    terms: ['post-purchase-flow', 'email-segmentation', 'dynamic-content'],
    service: 'email-flows'
  },
  {
    slug: 'judge-me',
    app: 'Judge.me',
    category: 'reviews',
    metaTitle: 'Klaviyo and Judge.me Integration Guide for Product Reviews',
    metaDescription: 'Use Judge.me with Klaviyo: what review data syncs, flows you can build, a sensible setup order and how to stop double review request emails.',
    answer: 'Judge.me works with Klaviyo so review activity can feed your emails and segments. Typical uses are showing review ratings in flows, suppressing review requests for people who already reviewed, and thanking reviewers. Choose one tool to send review requests, then use Klaviyo for the wider customer journey around them.',
    events: [
      { name: 'Review created', meaning: 'A shopper has posted a review, which you can use to start a thank you or to exclude them from requests.' },
      { name: 'Review request status', meaning: 'Information on whether a request has gone out, helping you avoid asking twice.' },
      { name: 'Ratings for products', meaning: 'Star rating data you can surface in emails to support product choices.' },
      { name: 'Reviewer marker on profiles', meaning: 'A property or metric that lets you build a segment of customers who have reviewed.' }
    ],
    flows: [
      { title: 'Reviewer appreciation', body: 'A short message after a review is posted, with a link to something relevant and no hard sell.' },
      { title: 'Non reviewer follow up', body: 'A gentle second nudge for buyers who ignored the first request, sent once and then left alone.' },
      { title: 'Rating led product emails', body: 'Add star ratings to browse abandonment and cross sell emails to give products credibility.' },
      { title: 'Photo review invitation', body: 'Invite happy reviewers to add a photo, because images make social proof more persuasive.' }
    ],
    setup: [
      { title: 'Open the app settings', body: 'In Judge.me find the Klaviyo connection option and follow its prompts to link your account.' },
      { title: 'Enter or authorise credentials', body: 'Use the method the app asks for, keeping keys limited to what the connection needs.' },
      { title: 'Run a test review', body: 'Post a review as a test customer and check that the matching activity or property appears in Klaviyo.' },
      { title: 'Decide on request ownership', body: 'Keep Judge.me requests or move them to a flow, and turn the unused option off.' },
      { title: 'Add ratings to templates', body: 'Insert rating content into the flows where it helps most, usually cart and browse recovery.' },
      { title: 'Test end to end', body: 'Follow an order through delivery, request, review and thank you, checking each trigger fires once.' }
    ],
    pitfalls: [
      'Two systems sending different review requests to the same buyer.',
      'Requesting reviews for orders that were refunded or returned.',
      'Using ratings in an email block that has not been refreshed after changes.',
      'Over emailing non reviewers with repeated nudges.',
      'Forgetting that reviewing does not equal marketing consent.'
    ],
    terms: ['post-purchase-flow', 'flow-filter', 'dynamic-content'],
    service: 'email-flows'
  },
  {
    slug: 'recharge',
    app: 'Recharge',
    category: 'subscriptions',
    metaTitle: 'Klaviyo and Recharge Integration Guide for Subscriptions',
    metaDescription: 'Connect Recharge to Klaviyo: subscription events that sync, flows for renewals and cancellations, setup order and mistakes to avoid on subscription stores.',
    answer: 'Recharge connects to Klaviyo so subscription lifecycle activity becomes events you can build flows on. That includes new subscriptions, upcoming charges, changes, skips and cancellations. Use it to send helpful renewal notices, save attempts and winback messages, while leaving the legally required billing emails to Recharge itself.',
    events: [
      { name: 'Subscription created', meaning: 'A customer has started a subscription, which begins an onboarding path distinct from a one off buyer.' },
      { name: 'Upcoming charge or order', meaning: 'Activity ahead of the next billing, useful for reminders that let people skip or swap before charging.' },
      { name: 'Subscription changes', meaning: 'Skips, frequency changes and product swaps, which show how engaged a subscriber is.' },
      { name: 'Cancellation activity', meaning: 'A subscription ending, with any reason captured, used for save and winback flows.' },
      { name: 'Payment problem activity', meaning: 'Failed charge signals that can start a polite prompt to update payment details.' }
    ],
    flows: [
      { title: 'Subscriber onboarding', body: 'Explains how to manage, skip or change the plan and sets expectations for the first delivery.' },
      { title: 'Pre charge reminder', body: 'Gives a clear chance to skip or edit before the next charge, which reduces complaints and chargebacks.' },
      { title: 'Cancellation save', body: 'Offers a pause, skip or frequency change when someone cancels, rather than only a discount.' },
      { title: 'Subscriber winback', body: 'Reaches former subscribers later with a reason to return, such as a new product or flexible plan.' }
    ],
    setup: [
      { title: 'Connect in Recharge', body: 'Open the Klaviyo option in the Recharge integrations area and authorise your Klaviyo account.' },
      { title: 'Check which events are sent', body: 'Review the subscription events the connection reports and match them to the flows you intend to build.' },
      { title: 'Create a test subscription', body: 'Subscribe with a test address and confirm the creation event appears on the profile in Klaviyo.' },
      { title: 'Separate transactional messages', body: 'Keep required billing notices in Recharge and use Klaviyo for onboarding, education and retention.' },
      { title: 'Build segments', body: 'Make segments for active, paused and cancelled subscribers so campaigns never address them wrongly.' },
      { title: 'Test lifecycle paths', body: 'Skip, change and cancel the test subscription and check each flow triggers once and in the right order.' }
    ],
    pitfalls: [
      'Sending a promotional campaign to active subscribers that offers a deal they already pay more for.',
      'Replacing required billing notices with marketing messages.',
      'Treating a paused subscriber as a cancelled one.',
      'Cancellation flows that make it hard to find the cancel option.',
      'Not excluding subscribers from abandoned cart emails for items they already receive.'
    ],
    terms: ['subscription-churn', 'transactional-vs-marketing-email', 'winback-flow'],
    service: 'retention-strategy'
  },
  {
    slug: 'loop-subscriptions',
    app: 'Loop Subscriptions',
    category: 'subscriptions',
    metaTitle: 'Klaviyo and Loop Subscriptions Integration Guide',
    metaDescription: 'How Loop Subscriptions works with Klaviyo: subscription activity that syncs, retention flows to build, setup order and common mistakes for Shopify stores.',
    answer: 'Loop Subscriptions, built for Shopify, can send subscription activity into Klaviyo so you can run onboarding, reminder, skip and cancellation flows. Use the synced data to treat subscribers differently from one off buyers. Keep required order and billing notices in Loop, and use Klaviyo for guidance and retention around them.',
    events: [
      { name: 'Subscription started', meaning: 'A shopper has joined a subscription plan, which sets them apart from one time customers.' },
      { name: 'Order upcoming', meaning: 'Activity before the next shipment, ideal for a reminder with edit and skip links.' },
      { name: 'Subscription modified', meaning: 'Swaps, quantity or frequency changes, hinting at how satisfied the subscriber is.' },
      { name: 'Subscription paused or cancelled', meaning: 'Status changes that begin a save or winback path.' }
    ],
    flows: [
      { title: 'First delivery guidance', body: 'Helps new subscribers get value from the first box, with tips on use and how to manage the plan.' },
      { title: 'Reminder with options', body: 'Sent ahead of the next order, offering to skip, swap or change timing so nobody is surprised.' },
      { title: 'Pause instead of cancel', body: 'Presents a pause as a gentle alternative at the moment of cancelling, framed as a real option.' },
      { title: 'Lapsed subscriber return', body: 'Invites former subscribers back after a while with news and a straightforward way to restart.' }
    ],
    setup: [
      { title: 'Find the Klaviyo connection', body: 'In Loop open the integrations or settings area and choose Klaviyo, then authorise with your account.' },
      { title: 'Review the data sent', body: 'Confirm which subscription activity is passed on, noting any naming differences from the Shopify order events.' },
      { title: 'Run a test subscription', body: 'Buy a plan with a test email and check that activity shows up in Klaviyo against that profile.' },
      { title: 'Plan the message split', body: 'Decide which emails remain in Loop, such as billing and shipping, and which are Klaviyo flows.' },
      { title: 'Create subscriber segments', body: 'Segment active, paused and cancelled customers to keep campaigns relevant.' },
      { title: 'Exclude subscribers from clashing flows', body: 'Add filters so active subscribers are kept out of replenishment and abandoned cart messages for the same product.' }
    ],
    pitfalls: [
      'A replenishment flow nudging someone who already subscribes.',
      'Duplicated reminder emails from Loop and Klaviyo.',
      'Marketing wording in what should be a clear account notice.',
      'Forgetting to test after changing plan or product structure.',
      'Reporting subscription revenue and one off revenue as a single figure.'
    ],
    terms: ['subscription-churn', 'replenishment-flow', 'flow-filter'],
    service: 'retention-strategy'
  },
  {
    slug: 'smile-io',
    app: 'Smile.io',
    category: 'loyalty',
    metaTitle: 'Klaviyo and Smile.io Integration: Loyalty Programmes',
    metaDescription: 'Connect Smile.io to Klaviyo: loyalty points and tier data that syncs, flows to build, setup order and how to keep reward emails useful, not noisy.',
    answer: 'Smile.io shares loyalty information with Klaviyo, such as points balances, reward activity and programme membership, as profile properties and events. You can then show balances in emails, announce earned rewards and build segments by loyalty status. The aim is useful reminders tied to real balances, not constant promotion.',
    events: [
      { name: 'Points balance', meaning: 'A profile property showing how many points a customer has, used to personalise emails.' },
      { name: 'Points earned', meaning: 'Activity when a customer gains points, which can trigger a short update or be left silent.' },
      { name: 'Reward redeemed', meaning: 'A customer has used points, useful for confirming the reward and suppressing nudges.' },
      { name: 'Programme membership or tier', meaning: 'Information on whether and where someone sits in the programme, used for segments.' },
      { name: 'Referral activity', meaning: 'Signals from referral features where enabled, so advocates can be thanked.' }
    ],
    flows: [
      { title: 'Programme welcome', body: 'Explains how to earn and spend points and shows the first easy action, such as an account sign up.' },
      { title: 'Balance reminder', body: 'Tells customers when they have enough points for a reward, using their actual balance and a clear link.' },
      { title: 'Reward expiry or nudge', body: 'Reminds people before points lapse, if your programme has expiry, in plain, honest terms.' },
      { title: 'Referral thank you', body: 'Thanks advocates when a friend orders and shows them what they earned.' }
    ],
    setup: [
      { title: 'Connect from Smile.io', body: 'Use the Klaviyo integration option in Smile.io and authorise your Klaviyo account.' },
      { title: 'Check properties and events', body: 'Look at a profile of a test member to see which loyalty properties are present and how they are named.' },
      { title: 'Earn and redeem a test reward', body: 'Complete a test order and a redemption to confirm balances update in Klaviyo.' },
      { title: 'Segment by status', body: 'Create segments for members, near reward and non members so each group gets relevant messages.' },
      { title: 'Add balances to templates', body: 'Use dynamic content to show the balance, with a fallback for customers who have none.' },
      { title: 'Test the reminders', body: 'Confirm balance and reward flows fire once and show correct numbers.' }
    ],
    pitfalls: [
      'Sending a message for every small points movement and teaching people to ignore you.',
      'Showing a stale balance because the property has not refreshed.',
      'Pushing loyalty messages to customers who never joined.',
      'Promising rewards in an email that the programme rules do not allow.',
      'Missing fallbacks in templates so empty balances look broken.'
    ],
    terms: ['vip-segment', 'dynamic-content', 'customer-lifetime-value'],
    service: 'retention-strategy'
  },
  {
    slug: 'gorgias',
    app: 'Gorgias',
    category: 'support',
    metaTitle: 'Klaviyo and Gorgias Integration Guide for Support and Email',
    metaDescription: 'How Gorgias and Klaviyo work together: support activity in Klaviyo, customer context for agents, setup order and how to avoid emailing unhappy customers.',
    answer: 'Gorgias and Klaviyo connect so support and marketing share context. Support activity can appear in Klaviyo, and agents can see marketing and order context inside tickets. The main benefit is restraint: you can pause promotions to customers with an open complaint and follow up sensibly once a ticket is resolved.',
    events: [
      { name: 'Ticket created', meaning: 'A customer has contacted support, which can mark them as someone to leave out of promotions for now.' },
      { name: 'Ticket closed or resolved', meaning: 'A support issue has ended, which can start a considerate follow up or return them to normal sends.' },
      { name: 'Support contact history', meaning: 'Whether a customer has ever raised a ticket, useful for segmentation and care.' },
      { name: 'Customer context in tickets', meaning: 'Klaviyo profile information shown to agents, such as orders and past activity.' }
    ],
    flows: [
      { title: 'Post resolution check in', body: 'A short message after a ticket closes, asking whether the problem is sorted, with no sales content.' },
      { title: 'Open ticket suppression', body: 'Not a message but a filter that stops campaigns going to people in a live dispute.' },
      { title: 'Repeat contact review', body: 'Flags customers who contact support often so your team can reach out personally.' },
      { title: 'Review request after good service', body: 'Where appropriate, invite a review from customers whose issue was solved well.' }
    ],
    setup: [
      { title: 'Connect inside Gorgias', body: 'Add the Klaviyo integration from the Gorgias apps area and sign in to authorise it.' },
      { title: 'Check customer context', body: 'Open a test ticket and confirm Klaviyo information appears in the sidebar for that customer.' },
      { title: 'Confirm activity reaches Klaviyo', body: 'Create and close a test ticket and look for the related activity on the profile.' },
      { title: 'Build a suppression segment', body: 'Create a segment of customers with an open ticket and decide which sends exclude them.' },
      { title: 'Agree rules with the support team', body: 'Settle who owns follow ups so marketing and support do not both contact the same customer.' },
      { title: 'Test the follow up', body: 'Close a test ticket and check the follow up fires once, in plain language and with no offers.' }
    ],
    pitfalls: [
      'A promotional email landing in the inbox of someone who just complained.',
      'Support follow ups written like marketing copy.',
      'Agents seeing stale or incomplete customer context.',
      'Leaving the suppression segment out of campaign sends.',
      'No agreement on who owns customer contact after a ticket closes.'
    ],
    terms: ['email-segmentation', 'flow-filter', 'transactional-vs-marketing-email'],
    service: 'retention-strategy'
  },
  {
    slug: 'postscript',
    app: 'Postscript',
    category: 'sms',
    metaTitle: 'Klaviyo and Postscript Integration Guide for SMS and Email',
    metaDescription: 'How Postscript SMS works alongside Klaviyo email: consent and subscriber data, coordinated flows, setup order and rules for avoiding message overload.',
    answer: 'Postscript is an SMS marketing tool for ecommerce that can run alongside Klaviyo. The practical job is coordination: share subscriber and consent information, keep email and text from repeating each other, and decide which channel leads each flow. Klaviyo email and Postscript text then cover different moments in the same journey.',
    events: [
      { name: 'SMS subscriber status', meaning: 'Whether a customer has agreed to text messages, which should be separate from email consent.' },
      { name: 'SMS engagement signals', meaning: 'Activity such as clicks on text links, where the connection reports it, to compare channel behaviour.' },
      { name: 'Phone number on profile', meaning: 'A collected number attached to the Klaviyo profile so segments can consider channel reach.' },
      { name: 'Opt out status', meaning: 'A stop request from a customer, which must be respected across your sending.' }
    ],
    flows: [
      { title: 'Channel aware cart recovery', body: 'Send email first and a single text later for people who consented, rather than both at once.' },
      { title: 'Combined welcome', body: 'Welcome email subscribers and invite them to add text, explaining plainly what texts will be about.' },
      { title: 'Shipping updates by text', body: 'Keep short, time sensitive notices on SMS and use email for fuller content.' },
      { title: 'Sunset by channel', body: 'Stop messaging people on a channel they no longer engage with, while keeping the other open.' }
    ],
    setup: [
      { title: 'Check consent rules first', body: 'SMS has stricter consent expectations than email. Confirm your signup wording and records before connecting.' },
      { title: 'Connect the two tools', body: 'Use the Klaviyo option within Postscript or the integrations area, following the prompts to authorise.' },
      { title: 'Confirm profile data', body: 'Check that phone numbers and subscription status arrive on a test profile.' },
      { title: 'Assign channel roles', body: 'Write down which journey stages use email, which use text and which use both with a delay.' },
      { title: 'Build segments', body: 'Create segments for email only, text only and both, so campaigns respect each group.' },
      { title: 'Test opt out', body: 'Send a test text, reply with a stop word and verify the status updates and no further texts go out.' }
    ],
    pitfalls: [
      'Treating email consent as permission to send texts.',
      'Sending the same message on both channels within minutes.',
      'Texting outside sensible hours for the customer.',
      'Long text messages that read like emails.',
      'Not syncing opt outs, so someone who said stop keeps receiving messages.'
    ],
    terms: ['double-opt-in', 'suppression-list', 'email-flow-vs-campaign'],
    service: 'klaviyo-email-marketing'
  },
  {
    slug: 'typeform',
    app: 'Typeform',
    category: 'forms',
    metaTitle: 'Klaviyo and Typeform Integration: Quizzes and Forms',
    metaDescription: 'Use Typeform with Klaviyo to turn quiz and survey answers into profile data: what you can capture, flows to build, setup order and consent pitfalls.',
    answer: 'Typeform can pass quiz and survey answers into Klaviyo, usually through a connection or an automation tool, so each answer becomes profile data. That lets you personalise emails by what people told you, such as skin type or budget range. Keep questions few, record consent clearly and test that every answer lands where you expect.',
    events: [
      { name: 'Form submitted', meaning: 'A person has completed the quiz or survey, which can start a flow and add them to a list.' },
      { name: 'Answer properties', meaning: 'Individual responses stored as profile properties, ready to use in segments and dynamic blocks.' },
      { name: 'Email and name fields', meaning: 'Identity details collected in the form, which are required for the profile to be created or matched.' },
      { name: 'Consent question', meaning: 'A clearly worded checkbox or choice that records whether the person agreed to marketing.' }
    ],
    flows: [
      { title: 'Quiz result follow up', body: 'Sends tailored recommendations based on the answers, with products matched to each result.' },
      { title: 'Preference based welcome', body: 'Greets new subscribers with content that reflects what they said they care about.' },
      { title: 'Post purchase feedback', body: 'Sends a short survey after delivery and routes low or high responses to different follow ups.' },
      { title: 'Re engagement by interest', body: 'Reminds lapsed contacts about their stated interest instead of sending generic offers.' }
    ],
    setup: [
      { title: 'Plan the data first', body: 'Write down each question and the Klaviyo property it will fill, keeping names short and consistent.' },
      { title: 'Choose the connection route', body: 'Use the available Typeform to Klaviyo connection or an automation tool, depending on what your plans allow.' },
      { title: 'Map fields', body: 'Match email, name and each answer to the right profile property, checking spelling and case.' },
      { title: 'Add a consent step', body: 'Include a clear question about marketing, and only subscribe people who say yes.' },
      { title: 'Submit a test response', body: 'Complete the form with a test address and inspect the profile for every expected property.' },
      { title: 'Build the flow and test branches', body: 'Create the result flow with a split per answer and test each branch with a different test answer.' }
    ],
    pitfalls: [
      'Typos in property names creating several near duplicate fields.',
      'Subscribing everyone who completes the form regardless of consent.',
      'Long quizzes that people abandon before the final question.',
      'Free text answers that cannot be used cleanly in segments.',
      'Never testing the less common answer paths.'
    ],
    terms: ['lead-magnet', 'dynamic-content', 'conditional-split'],
    service: 'email-flows'
  },
  {
    slug: 'shipstation',
    app: 'ShipStation',
    category: 'shipping',
    metaTitle: 'Klaviyo and ShipStation Integration: Shipping Emails',
    metaDescription: 'How ShipStation shipping data can reach Klaviyo: tracking and delivery events, flows to build, setup order and how to keep shipping emails consistent.',
    answer: 'ShipStation handles labels and fulfilment, and its shipping and tracking details can reach Klaviyo through the connected store platform or a connector. With that data you can send branded shipping, delivery and post delivery messages. The main job is deciding which system sends the plain tracking notice, so customers get one clear message.',
    events: [
      { name: 'Order fulfilled', meaning: 'A shipment has been created, usually reaching Klaviyo through the store platform as a fulfilment event.' },
      { name: 'Tracking details', meaning: 'Carrier and tracking number or link, used to show a track my order button in emails.' },
      { name: 'Delivery status', meaning: 'Whether the parcel is in transit or delivered, where your setup reports it.' },
      { name: 'Shipping method', meaning: 'The chosen service, which can change wording about expected arrival.' }
    ],
    flows: [
      { title: 'Shipping confirmation', body: 'Tells the customer the order has left, with tracking and a calm summary of what happens next.' },
      { title: 'Delivered follow up', body: 'Sent after delivery with usage tips, care advice and a gentle review request.' },
      { title: 'Delay notice', body: 'Reassures customers when an order is late, with honest information and a way to ask for help.' },
      { title: 'Cross sell after delivery', body: 'Suggests complementary products once the customer has had time to use the first item.' }
    ],
    setup: [
      { title: 'Know the data path', body: 'ShipStation usually updates the store, and the store integration reports fulfilment to Klaviyo. Confirm which path yours uses.' },
      { title: 'Connect the store to Klaviyo', body: 'Make sure the main platform integration is working before expecting shipping data.' },
      { title: 'Check fulfilment metrics', body: 'Ship a test order and look for the fulfilment activity and tracking details in Klaviyo.' },
      { title: 'Decide who sends tracking', body: 'Choose between the platform notice, ShipStation emails or a Klaviyo flow, and switch off duplicates.' },
      { title: 'Design the template', body: 'Include the tracking link, delivery estimate language and support contact, kept short and clear.' },
      { title: 'Test with partial shipments', body: 'Test an order shipped in two parts to be sure each shipment sends a sensible message.' }
    ],
    pitfalls: [
      'Customers receiving tracking emails from three different systems.',
      'Missing tracking links because the field is not passed through.',
      'Marketing content cluttering a tracking message.',
      'Not handling split shipments, so customers get confusing or repeated notices.',
      'Promising specific delivery dates that carriers do not guarantee.'
    ],
    terms: ['post-purchase-flow', 'transactional-vs-marketing-email', 'cross-sell-email'],
    service: 'email-flows'
  },
  {
    slug: 'stamped-io',
    app: 'Stamped.io',
    category: 'reviews',
    metaTitle: 'Klaviyo and Stamped.io Integration: Reviews and Loyalty',
    metaDescription: 'Connect Stamped.io to Klaviyo: review and loyalty data that syncs, flows to build, setup order and how to avoid overlapping review request emails.',
    answer: 'Stamped.io combines reviews with loyalty and referral features, and it can share that activity with Klaviyo. You can use reviews in emails, trigger thank yous, segment by reviewer status and, where used, reflect loyalty information. As with any review app, pick one sender for review requests and keep Klaviyo for the surrounding journey.',
    events: [
      { name: 'Review submitted', meaning: 'A customer has left feedback, which can start a thank you and remove them from request flows.' },
      { name: 'Review request sent', meaning: 'Information that a request went out, which helps you avoid asking again too soon.' },
      { name: 'Rating content', meaning: 'Ratings and quotes available for placing in templates as social proof.' },
      { name: 'Loyalty or referral activity', meaning: 'Where those features are enabled, points and referral signals that can inform segments.' }
    ],
    flows: [
      { title: 'Request after delivery', body: 'If sent from Klaviyo, trigger it from fulfilment with a delay, so the customer has used the product.' },
      { title: 'Thank you with next step', body: 'Acknowledge the review and point to a related product or a loyalty action where relevant.' },
      { title: 'Negative review care', body: 'Route low ratings to a personal support response rather than a marketing follow up.' },
      { title: 'Social proof for browsers', body: 'Show ratings in browse abandonment to help undecided shoppers.' }
    ],
    setup: [
      { title: 'Open the integration option', body: 'In Stamped find the Klaviyo connection and authorise your account when prompted.' },
      { title: 'Confirm which data is shared', body: 'Check what review, rating and loyalty activity is reported, as it depends on the features you use.' },
      { title: 'Submit a test review', body: 'Leave a review as a test customer and look for the activity in Klaviyo.' },
      { title: 'Pick the request sender', body: 'Choose either Stamped or a Klaviyo flow, and disable the other.' },
      { title: 'Split by rating', body: 'Use a conditional split so low ratings go to support and high ratings get a thank you.' },
      { title: 'Check template blocks', body: 'Insert rating blocks and verify the right product shows in each flow.' }
    ],
    pitfalls: [
      'Sending a cheerful promotion to someone who just left a poor review.',
      'Two request emails going to the same customer.',
      'Asking for a review on an order that was returned.',
      'Mixing loyalty and review messages so neither is clear.',
      'Blocks showing ratings from a different product.'
    ],
    terms: ['conditional-split', 'post-purchase-flow', 'event-trigger'],
    service: 'email-flows'
  },
  {
    slug: 'okendo',
    app: 'Okendo',
    category: 'reviews',
    metaTitle: 'Klaviyo and Okendo Integration: Reviews and Referrals',
    metaDescription: 'How Okendo works with Klaviyo: review, rating and referral data in your flows, a clear setup order and how to coordinate who sends review requests.',
    answer: 'Okendo is a reviews and customer marketing app that connects to Klaviyo so review and referral activity can feed your flows and segments. You can show ratings in emails, thank reviewers and separate them from non reviewers. Decide whether Okendo or Klaviyo sends review requests, and make the other stay quiet.',
    events: [
      { name: 'Review published', meaning: 'A review has gone live, which can start an acknowledgement and stop further requests.' },
      { name: 'Review request activity', meaning: 'Reports of requests sent, helpful for keeping track of who has already been asked.' },
      { name: 'Ratings and content', meaning: 'Star ratings and review text you can bring into emails to reassure shoppers.' },
      { name: 'Referral activity', meaning: 'Where the referral feature is in use, signals about invites and rewards for advocates.' },
      { name: 'Reviewer attributes', meaning: 'Properties that mark people who have reviewed, usable for advocate segments.' }
    ],
    flows: [
      { title: 'Review request and reminder', body: 'A single request after likely delivery, with one reminder at most, then the customer is left alone.' },
      { title: 'Reviewer acknowledgement', body: 'Thanks people when their review is published and shows how it helps other shoppers.' },
      { title: 'Referral invitation', body: 'Invites satisfied customers to refer friends, with clear and honest terms about the reward.' },
      { title: 'Rating enhanced recovery', body: 'Adds ratings and a short quote to abandoned cart messages for items with good feedback.' }
    ],
    setup: [
      { title: 'Connect in Okendo', body: 'Choose the Klaviyo integration in Okendo settings and authorise it with your account.' },
      { title: 'Review the shared data', body: 'Check which review and referral activity is reported to Klaviyo for your Okendo setup.' },
      { title: 'Create a test review', body: 'Place an order, leave a review and confirm the event appears on the Klaviyo profile.' },
      { title: 'Settle request ownership', body: 'Pick one tool for review requests and turn off the other.' },
      { title: 'Build reviewer segments', body: 'Segment reviewers, non reviewers and referrers to guide different campaigns.' },
      { title: 'Test the full path', body: 'Follow an order from delivery to request, review and thank you to verify each message appears once.' }
    ],
    pitfalls: [
      'Both tools asking for the same review.',
      'Referral wording that overpromises compared with the programme rules.',
      'Requests going out before delivery has happened.',
      'Using reviews in templates without checking that content is approved.',
      'Treating reviewers as automatically consented to marketing.'
    ],
    terms: ['email-segmentation', 'dynamic-content', 'post-purchase-flow'],
    service: 'email-flows'
  },
  {
    slug: 'wix',
    app: 'Wix',
    category: 'platform',
    metaTitle: 'Klaviyo and Wix Integration Guide for Online Stores',
    metaDescription: 'How to connect a Wix store to Klaviyo: what customer and order data can sync, which flows it supports and the setup checks that matter first.',
    answer: 'Wix stores can connect to Klaviyo so customer, cart and order activity is available for email flows. The connection is set up from the Wix side or from Klaviyo, and what syncs can differ by Wix product and version, so confirm the current details in the Wix and Klaviyo documentation. Once data arrives, you build abandoned cart, welcome and post purchase flows on top of it.',
    events: [
      { name: 'Customer and contact data', meaning: 'Names, emails and sign ups collected through the site, used to build profiles and lists.' },
      { name: 'Cart and checkout activity', meaning: 'Where the connection supports it, carts and checkouts that were started but not finished, which power recovery flows.' },
      { name: 'Order activity', meaning: 'Placed orders and the products in them, so you can segment by purchase and trigger post purchase messages.' },
      { name: 'Form submissions', meaning: 'Sign ups from site forms or pop ups, which depend on how you connect them to a Klaviyo list.' },
      { name: 'Product details', meaning: 'Catalogue information for emails, which varies by how the store and connection are configured.' }
    ],
    flows: [
      { title: 'Welcome series', body: 'Starts when someone joins a list from the site. Introduce the brand, set expectations and point to best sellers.' },
      { title: 'Abandoned cart', body: 'Reaches shoppers who began checkout and left. It only works if the connection reports cart activity, so test it before relying on it.' },
      { title: 'Post purchase', body: 'Starts from an order and covers thanks, care advice and a later review request.' },
      { title: 'Winback', body: 'Uses time since the last order to bring lapsed customers back with a real reason to return.' }
    ],
    setup: [
      { title: 'Check what your Wix setup supports', body: 'Read the current Wix and Klaviyo documentation to see which data your store type can send and how the connection is made.' },
      { title: 'Connect the accounts', body: 'Follow the documented route to link the store to your Klaviyo account and authorise it.' },
      { title: 'Confirm data arrives', body: 'Place a test order and sign up with a test address, then check the profile in Klaviyo for the activity.' },
      { title: 'Check tracking on the live site', body: 'Make sure any required tracking is active on the published site, not only in the editor.' },
      { title: 'Map consent properly', body: 'Decide how site forms and checkout consent map to Klaviyo subscription status.' },
      { title: 'Build and test one flow', body: 'Create the welcome flow first, then the abandoned cart flow once cart activity is confirmed.' }
    ],
    pitfalls: [
      'Assuming every event exists without testing a real order and cart.',
      'Connecting before the domain and live site are final, then losing tracking after a change.',
      'Sign up forms that add people to a list without recording consent.',
      'Running a second app that also sends cart reminders.',
      'Judging flow results before the data has been verified.'
    ],
    terms: ['abandoned-cart-flow', 'welcome-flow', 'email-segmentation'],
    service: 'klaviyo-email-marketing'
  },
  {
    slug: 'squarespace',
    app: 'Squarespace',
    category: 'platform',
    metaTitle: 'Klaviyo and Squarespace Integration Guide for Stores',
    metaDescription: 'Connect Squarespace to Klaviyo: what data can sync from forms and commerce, the flows it enables and the setup steps to check before you launch.',
    answer: 'Squarespace sites can send sign ups and, for stores, commerce activity to Klaviyo so you can run welcome, abandoned cart and post purchase flows. How the connection works and how much data syncs depends on your Squarespace setup and version, so confirm the current approach in the Squarespace and Klaviyo documentation before you build.',
    events: [
      { name: 'Form and newsletter sign ups', meaning: 'People who join through site forms or blocks, added to a Klaviyo list when the connection is set up.' },
      { name: 'Customer data', meaning: 'Names and emails gathered at sign up or checkout, used to build and enrich profiles.' },
      { name: 'Order activity', meaning: 'Where commerce data is supported, placed orders and their products, used for segmentation and post purchase messages.' },
      { name: 'Cart activity', meaning: 'Carts left behind, available only where the connection reports them. Verify with a test.' },
      { name: 'Product details', meaning: 'Catalogue information for emails, which varies by setup and how the connection is configured.' }
    ],
    flows: [
      { title: 'Welcome series', body: 'Starts when a new subscriber joins from the site. Keep it short and useful, with a clear first step.' },
      { title: 'Abandoned cart', body: 'Useful only if cart activity reaches Klaviyo. Test with a real browser session before turning it on.' },
      { title: 'Post purchase', body: 'Follows an order with thanks, usage tips and a review request after delivery.' },
      { title: 'Newsletter and campaigns', body: 'Use list and purchase data to send relevant campaigns rather than one blast to everyone.' }
    ],
    setup: [
      { title: 'Confirm the supported route', body: 'Check the current Squarespace and Klaviyo documentation for how your plan of site can connect and what it sends.' },
      { title: 'Connect the accounts', body: 'Follow the documented steps to link Squarespace with Klaviyo and authorise access.' },
      { title: 'Point forms at the right list', body: 'Make sure each form adds people to the intended Klaviyo list with clear consent wording.' },
      { title: 'Test with a real order', body: 'Sign up and place a test order, then confirm both appear on the Klaviyo profile.' },
      { title: 'Check tracking after publishing', body: 'Confirm any tracking works on the live site, not just in preview.' },
      { title: 'Build the first flow', body: 'Start with the welcome flow, then add cart and post purchase flows once their data is confirmed.' }
    ],
    pitfalls: [
      'Assuming commerce activity syncs without testing it.',
      'Forms that add subscribers with no consent wording.',
      'Changing site structure and breaking form connections.',
      'Duplicate sign up tools feeding different lists.',
      'Relying on cart flows that never receive cart data.'
    ],
    terms: ['welcome-flow', 'abandoned-cart-flow', 'email-segmentation'],
    service: 'klaviyo-email-marketing'
  },
  {
    slug: 'loox',
    app: 'Loox',
    category: 'reviews',
    metaTitle: 'Klaviyo and Loox Integration Guide for Photo Reviews',
    metaDescription: 'How Loox photo reviews can work with Klaviyo: review activity in your flows, a sensible setup order and how to avoid duplicate review requests.',
    answer: 'Loox is a photo review app that can connect to Klaviyo so review activity feeds your flows and segments. The details of the connection and the events it sends depend on the app version, so check the Loox documentation. Choose whether Loox or Klaviyo sends the review request, and let only one do it.',
    events: [
      { name: 'Review request activity', meaning: 'Signals about requests sent, where reported, so you can see who has already been asked.' },
      { name: 'Review submitted', meaning: 'A customer has left a review, which can stop further requests and start a thank you.' },
      { name: 'Photo and rating content', meaning: 'Ratings and customer photos that can reassure shoppers in emails, subject to how the connection exposes them.' },
      { name: 'Reviewer attributes', meaning: 'Properties that mark people who have reviewed, usable for advocate segments.' },
      { name: 'Discount or reward activity', meaning: 'Where review incentives are used, signals about rewards, which vary by setup.' }
    ],
    flows: [
      { title: 'Review request', body: 'One request after likely delivery, then at most one reminder, then the customer is left alone.' },
      { title: 'Reviewer thank you', body: 'Acknowledges a published review and points to a related product or helpful content.' },
      { title: 'Photo social proof', body: 'Uses approved customer photos in campaigns and recovery emails to show the product in real use.' },
      { title: 'Non reviewer follow up', body: 'Reaches buyers who did not review with a lighter, different ask, without repeating the same request.' }
    ],
    setup: [
      { title: 'Read the current documentation', body: 'Check how Loox connects to Klaviyo and which events it reports for your version.' },
      { title: 'Connect the app', body: 'Link Loox to your Klaviyo account following the documented steps.' },
      { title: 'Leave a test review', body: 'Place a test order, review it and confirm the activity appears on the Klaviyo profile.' },
      { title: 'Settle request ownership', body: 'Choose one tool to send review requests and switch the other off.' },
      { title: 'Build reviewer segments', body: 'Separate reviewers from non reviewers to guide different messages.' },
      { title: 'Test the whole path', body: 'Follow one order through delivery, request, review and thank you to check each message sends once.' }
    ],
    pitfalls: [
      'Both Loox and Klaviyo asking for the same review.',
      'Using customer photos in marketing without confirming permission.',
      'Requests sent before the order has arrived.',
      'Offering incentives that conflict with platform or legal rules.',
      'Assuming reviewers have agreed to marketing emails.'
    ],
    terms: ['email-segmentation', 'abandoned-cart-flow', 'welcome-flow'],
    service: 'email-flows'
  },
  {
    slug: 'reviews-io',
    app: 'REVIEWS.io',
    category: 'reviews',
    metaTitle: 'Klaviyo and REVIEWS.io Integration Guide for Ecommerce',
    metaDescription: 'How REVIEWS.io data can reach Klaviyo: review and rating activity in your flows, the setup order and how to coordinate review request emails.',
    answer: 'REVIEWS.io collects product and company reviews and can connect to Klaviyo so review activity supports your flows and segments. What it sends depends on the version and configuration, so confirm the details in the REVIEWS.io documentation. Decide which tool sends review requests so customers are not asked twice.',
    events: [
      { name: 'Review invitation activity', meaning: 'Where reported, signals that a request has been sent, so you can avoid asking again.' },
      { name: 'Review submitted', meaning: 'A customer has left a review, which can end the request sequence and begin a thank you.' },
      { name: 'Rating content', meaning: 'Star ratings and review text that can appear in emails, depending on how the connection exposes them.' },
      { name: 'Reviewer attributes', meaning: 'Properties that identify people who have reviewed, useful for advocate segments.' },
      { name: 'Company and product review data', meaning: 'Both kinds of review may exist in the account, and which is shared can vary by setup.' }
    ],
    flows: [
      { title: 'Review invitation', body: 'A single request after likely delivery, with one reminder at most.' },
      { title: 'Reviewer thank you', body: 'Thanks people for their review and suggests a next step, such as a related product.' },
      { title: 'Ratings in recovery emails', body: 'Adds a rating or short quote to abandoned cart messages for products with good feedback.' },
      { title: 'Advocate campaigns', body: 'Targets happy reviewers for referrals or early access, with honest terms.' }
    ],
    setup: [
      { title: 'Check the documentation', body: 'Find out how REVIEWS.io connects to Klaviyo for your account and what it sends.' },
      { title: 'Connect the accounts', body: 'Authorise the link using the documented steps.' },
      { title: 'Submit a test review', body: 'Place a test order, leave a review and confirm the activity shows on the profile.' },
      { title: 'Decide who sends requests', body: 'Pick REVIEWS.io or Klaviyo for review invitations and disable the other.' },
      { title: 'Create segments', body: 'Build reviewer and non reviewer segments to tailor messages.' },
      { title: 'Test end to end', body: 'Check the timing from delivery to request, review and thank you.' }
    ],
    pitfalls: [
      'Two tools sending the same review request.',
      'Asking for a review on a returned order.',
      'Showing product ratings against the wrong product in an email block.',
      'Mixing company and product review messages so the ask is unclear.',
      'Treating a review as marketing consent.'
    ],
    terms: ['email-segmentation', 'abandoned-cart-flow', 'winback-flow'],
    service: 'email-flows'
  },
  {
    slug: 'swym-wishlist',
    app: 'Swym Wishlist',
    category: 'loyalty',
    metaTitle: 'Klaviyo and Swym Wishlist Integration Guide for Stores',
    metaDescription: 'How wishlist activity from Swym can feed Klaviyo: saved item signals, reminder flows and the setup checks that keep wishlist emails relevant.',
    answer: 'Swym Wishlist lets shoppers save products, and that activity can be shared with Klaviyo so you can send reminders about items they saved. Whether it uses a native connection or another route depends on your version, so confirm in the Swym and Klaviyo documentation. Wishlist signals show clear interest, which makes them a strong base for relevant, low pressure emails.',
    events: [
      { name: 'Item added to wishlist', meaning: 'A shopper saved a product, which shows interest even without a cart.' },
      { name: 'Wishlist shared', meaning: 'Where the feature is used, a list sent to someone else, useful as an advocacy signal.' },
      { name: 'Back in stock or price change signals', meaning: 'Where supported, signals that a saved item has changed, which vary by setup and version.' },
      { name: 'Wishlist reminder activity', meaning: 'Records of reminders sent, if reported, so you can avoid repeating yourself.' },
      { name: 'Customer identity', meaning: 'The email address that ties a wishlist to a profile, which is needed for any flow to work.' }
    ],
    flows: [
      { title: 'Saved item reminder', body: 'Reminds someone of a product they saved, shown with the actual item, after a sensible gap.' },
      { title: 'Back in stock', body: 'Tells people when something they saved is available again, if that data is supplied.' },
      { title: 'Wishlist to cart nudge', body: 'A gentle follow up when saved items are still unbought, without leaning on urgency.' },
      { title: 'Gift list share', body: 'Helps shoppers share a list and returns to the sharer when it is viewed or bought, where supported.' }
    ],
    setup: [
      { title: 'Confirm the connection method', body: 'Check the Swym and Klaviyo documentation for how wishlist data reaches Klaviyo for your setup.' },
      { title: 'Connect the app', body: 'Link the two accounts following the documented steps.' },
      { title: 'Add an item as a test', body: 'Save a product while signed in and check the event on the Klaviyo profile.' },
      { title: 'Confirm identification', body: 'Make sure shoppers are identified by email, or the activity cannot reach a profile.' },
      { title: 'Align with other flows', body: 'Decide how wishlist messages sit next to cart and browse flows.' },
      { title: 'Build and test the reminder', body: 'Create the reminder flow and test it with your own account.' }
    ],
    pitfalls: [
      'Reminding people about a wishlist item they have since bought.',
      'Sending a wishlist reminder at the same time as a cart email.',
      'Assuming anonymous wishlists reach Klaviyo profiles.',
      'Overusing urgency on items someone only saved for later.',
      'Not checking the event data before building the flow.'
    ],
    terms: ['abandoned-cart-flow', 'email-segmentation', 'welcome-flow'],
    service: 'retention-strategy'
  },
  {
    slug: 'attentive',
    app: 'Attentive',
    category: 'sms',
    metaTitle: 'Klaviyo and Attentive Integration Guide for SMS and Email',
    metaDescription: 'How Attentive SMS can sit alongside Klaviyo email: sharing consent and activity, coordinating flows and avoiding double messaging.',
    answer: 'Attentive is an SMS marketing platform, and many stores run it alongside Klaviyo email. Whether and how the two share data depends on your setup, so check the current documentation for both before you rely on a sync. The key work is coordinating consent and timing so a customer is not messaged by both channels about the same thing.',
    events: [
      { name: 'SMS consent', meaning: 'Where shared, whether a person has agreed to text messages, which must be treated as separate from email consent.' },
      { name: 'SMS sign up source', meaning: 'Where a person joined, such as a pop up or checkout, useful for reporting and welcome messages.' },
      { name: 'Message activity', meaning: 'Sends, clicks or replies, where the connection reports them, which varies by setup.' },
      { name: 'Phone number data', meaning: 'The number tied to a profile, which needs correct formatting and permission to use.' },
      { name: 'Purchase and cart activity', meaning: 'Commerce signals that either tool may use for triggers, so decide which channel owns each trigger.' }
    ],
    flows: [
      { title: 'Welcome across channels', body: 'Greets a new subscriber by email and, if they agreed, by text, without repeating the same offer.' },
      { title: 'Abandoned cart coordination', body: 'Decides which channel goes first and holds the second back, so a shopper gets one reminder not two.' },
      { title: 'Post purchase', body: 'Email carries the detail while text, if used, stays brief and useful, such as delivery updates.' },
      { title: 'Channel preference campaigns', body: 'Segments people by the channels they agreed to and sends each the right message.' }
    ],
    setup: [
      { title: 'Check the supported connection', body: 'Read the current Attentive and Klaviyo documentation to see what can be shared.' },
      { title: 'Map consent separately', body: 'Keep email and SMS consent distinct, and record the source and wording of each.' },
      { title: 'Decide trigger ownership', body: 'For each trigger such as cart or welcome, name the channel that leads.' },
      { title: 'Test the data', body: 'Sign up with a test number and email and confirm what each platform shows.' },
      { title: 'Build the cross channel logic', body: 'Use delays and conditions so the second channel does not fire straight after the first.' },
      { title: 'Review quiet hours and frequency', body: 'Set sensible send windows for text, which is more intrusive than email.' }
    ],
    pitfalls: [
      'Treating email consent as permission to send texts.',
      'Both tools firing a cart reminder at once.',
      'Sending text outside sensible hours.',
      'Poorly formatted phone numbers causing failed sends.',
      'Not recording when and how consent was given.'
    ],
    terms: ['abandoned-cart-flow', 'welcome-flow', 'email-segmentation'],
    service: 'retention-strategy'
  },
  {
    slug: 'privy',
    app: 'Privy',
    category: 'forms',
    metaTitle: 'Klaviyo and Privy Integration Guide for Pop Ups and Forms',
    metaDescription: 'How Privy pop ups and sign up forms can connect to Klaviyo: passing subscribers and consent, welcome flows and avoiding duplicate capture tools.',
    answer: 'Privy builds pop ups and sign up forms that can send new subscribers to Klaviyo, where they start a welcome flow. The connection and the fields it passes depend on your setup, so confirm the current steps in the Privy documentation. The main jobs are sending people to the right list with clear consent and avoiding a second form tool doing the same thing.',
    events: [
      { name: 'Form submission', meaning: 'Someone completed a Privy form, which adds or updates a profile in Klaviyo when connected.' },
      { name: 'Email and phone capture', meaning: 'The contact details collected, which need consent wording that matches how you will use them.' },
      { name: 'Custom fields', meaning: 'Extra answers such as preferences, passed through only where the connection maps them.' },
      { name: 'Form source', meaning: 'Which form or campaign the person came from, useful for tailoring the welcome message.' },
      { name: 'Discount code delivery', meaning: 'Where a code is offered, how it is issued, which varies by setup and should match what the email says.' }
    ],
    flows: [
      { title: 'Welcome series', body: 'Starts when a Privy form adds someone to a list. Deliver any promised offer first, then introduce the brand.' },
      { title: 'Preference based follow up', body: 'Uses an answer from a form to send relevant products rather than a generic message.' },
      { title: 'Back in stock or product interest', body: 'If a form captures interest in a product, a follow up when it becomes relevant.' },
      { title: 'Re engagement of new sign ups', body: 'Nudges people who joined but never opened the welcome email, with a single gentle reminder.' }
    ],
    setup: [
      { title: 'Check the documented connection', body: 'Read the current Privy documentation to see how it sends subscribers to Klaviyo.' },
      { title: 'Choose the target list', body: 'Create or pick the list the form should feed, and name it clearly.' },
      { title: 'Write clear consent wording', body: 'Make sure the form text matches how you will email the person.' },
      { title: 'Test a submission', body: 'Submit the form with a test address and confirm the profile, list and fields in Klaviyo.' },
      { title: 'Build the welcome flow', body: 'Trigger it from the list and check the offer, if any, arrives as promised.' },
      { title: 'Retire duplicate forms', body: 'Turn off other capture tools that add the same people so profiles stay clean.' }
    ],
    pitfalls: [
      'Two form tools adding the same subscriber with different consent.',
      'An offer in the form that the email does not honour.',
      'Missing fields because the connection does not map them.',
      'Pop ups showing to existing subscribers.',
      'Vague consent text on the form.'
    ],
    terms: ['welcome-flow', 'email-segmentation', 'email-deliverability'],
    service: 'klaviyo-email-marketing'
  },
  {
    slug: 'aftership',
    app: 'AfterShip',
    category: 'shipping',
    metaTitle: 'Klaviyo and AfterShip Integration Guide for Tracking Emails',
    metaDescription: 'How AfterShip tracking data can reach Klaviyo: shipment status events, delivery update flows and the setup checks that keep notices accurate.',
    answer: 'AfterShip tracks parcels across carriers and can pass shipment status updates to Klaviyo so you can send accurate shipping emails. Whether it connects directly or through another route depends on your setup, so confirm in the AfterShip and Klaviyo documentation. Reliable tracking data lets you replace guesswork with messages that match where the order actually is.',
    events: [
      { name: 'Shipment created', meaning: 'A tracking number has been attached to an order, the start of the delivery journey.' },
      { name: 'In transit and out for delivery', meaning: 'Status changes as the carrier reports them, which can vary by carrier and by what the connection sends.' },
      { name: 'Delivered', meaning: 'The carrier shows the parcel as delivered, a good trigger for a review request after a pause.' },
      { name: 'Delivery exception', meaning: 'A delay, failed attempt or problem, which is worth a helpful message.' },
      { name: 'Tracking details', meaning: 'The carrier, number and link, used in emails so customers can follow the parcel.' }
    ],
    flows: [
      { title: 'Shipping confirmation', body: 'Sent when tracking is created, with a clear link and an honest delivery expectation.' },
      { title: 'Delivery update', body: 'Tells people when the parcel is close or delivered, keeping the message short and useful.' },
      { title: 'Delay and exception message', body: 'Reaches customers when something goes wrong, with a way to get help before they have to ask.' },
      { title: 'Post delivery follow up', body: 'Starts from delivered status with care tips, then a review request after a sensible gap.' }
    ],
    setup: [
      { title: 'Check how the data reaches Klaviyo', body: 'Read the current AfterShip and Klaviyo documentation to see which events and properties are sent.' },
      { title: 'Connect the accounts', body: 'Follow the documented steps to link them.' },
      { title: 'Create a test shipment', body: 'Use a real or test tracking number and confirm the events appear on the profile.' },
      { title: 'Decide who sends shipping emails', body: 'Choose between AfterShip notifications, store notifications and Klaviyo, and use one.' },
      { title: 'Build the flows', body: 'Create the confirmation, delivery and exception flows with branded templates.' },
      { title: 'Test the timing', body: 'Check that messages follow the real status, not the order date.' }
    ],
    pitfalls: [
      'Customers receiving shipping emails from three systems.',
      'Marking delivered before the parcel has arrived.',
      'Promotional content in a delay message.',
      'Ignoring carriers that report patchy status.',
      'Not testing exception cases.'
    ],
    terms: ['email-deliverability', 'email-segmentation', 'winback-flow'],
    service: 'email-flows'
  },
  {
    slug: 'bold-subscriptions',
    app: 'Bold Subscriptions',
    category: 'subscriptions',
    metaTitle: 'Klaviyo and Bold Subscriptions Integration Guide',
    metaDescription: 'How Bold Subscriptions data can reach Klaviyo: subscription lifecycle signals, flows for renewals and cancellations, and setup checks to run first.',
    answer: 'Bold Subscriptions manages recurring orders, and its data can be sent to Klaviyo so you can message subscribers at key points in the subscription lifecycle. How the connection works and which events it sends depend on your setup, so confirm in the Bold and Klaviyo documentation. Useful flows cover upcoming renewals, failed payments, skips and cancellations.',
    events: [
      { name: 'Subscription started', meaning: 'A customer has begun a subscription, the start of an onboarding flow.' },
      { name: 'Upcoming order or renewal', meaning: 'A reminder point before the next charge, where the connection reports it.' },
      { name: 'Payment failure', meaning: 'A charge did not go through, which needs a clear and calm message.' },
      { name: 'Skip, pause or change', meaning: 'The customer altered the subscription, useful for tailoring what you say next.' },
      { name: 'Cancellation', meaning: 'The subscription has ended, which starts a winback path and a short feedback ask.' }
    ],
    flows: [
      { title: 'Subscriber onboarding', body: 'Explains how the subscription works, how to manage it and what to expect next.' },
      { title: 'Upcoming renewal', body: 'A short reminder with an easy way to change or skip, which reduces surprise charges.' },
      { title: 'Failed payment recovery', body: 'Helps the customer update their details without blame, with a clear next step.' },
      { title: 'Cancellation winback', body: 'Follows a cancellation with a useful, honest reason to return, such as a different cadence.' }
    ],
    setup: [
      { title: 'Confirm the connection route', body: 'Read the current Bold and Klaviyo documentation for what is sent and how it is connected.' },
      { title: 'Connect the accounts', body: 'Follow the documented steps and authorise access.' },
      { title: 'Create a test subscription', body: 'Start, change and cancel one, and confirm each action reaches Klaviyo.' },
      { title: 'Separate subscribers from one off buyers', body: 'Build segments so promotions suit each group.' },
      { title: 'Decide who sends account emails', body: 'Avoid duplicating notices the subscription app already sends.' },
      { title: 'Build and test the lifecycle flows', body: 'Start with failed payment and upcoming renewal, which matter most.' }
    ],
    pitfalls: [
      'Promoting a discount to subscribers who already get one.',
      'Duplicate renewal notices from the app and Klaviyo.',
      'Treating a skip as a cancellation.',
      'Failed payment emails that sound accusing.',
      'Not testing the cancellation path.'
    ],
    terms: ['winback-flow', 'email-segmentation', 'abandoned-cart-flow'],
    service: 'retention-strategy'
  },
  {
    slug: 'rebuy',
    app: 'Rebuy',
    category: 'platform',
    metaTitle: 'Klaviyo and Rebuy Integration Guide for Personalisation',
    metaDescription: 'How Rebuy product recommendations and upsells relate to Klaviyo: coordinating onsite offers with email flows and checking what data is shared.',
    answer: 'Rebuy is a personalisation and upsell app that recommends products on the store, in cart and after checkout. It can work alongside Klaviyo, but what data passes between them depends on your setup, so confirm in the Rebuy and Klaviyo documentation. The practical aim is to keep onsite recommendations and email offers consistent rather than competing.',
    events: [
      { name: 'Recommendation engagement', meaning: 'Where shared, signals that a shopper interacted with an onsite recommendation.' },
      { name: 'Cart additions from recommendations', meaning: 'Items added through an upsell, which show up as ordinary cart and order activity.' },
      { name: 'Order activity', meaning: 'Placed orders including upsell items, used for segmentation and post purchase flows.' },
      { name: 'Product interest', meaning: 'Which items a person looked at or added, which can improve email recommendations.' },
      { name: 'Customer data', meaning: 'Profiles and purchase history that either tool may use to personalise.' }
    ],
    flows: [
      { title: 'Post purchase cross sell', body: 'Recommends complementary items after an order, using what was actually bought.' },
      { title: 'Abandoned cart with relevance', body: 'Shows the left items and sensible companions rather than a long list of random products.' },
      { title: 'Replenishment reminder', body: 'Prompts a reorder for consumable products based on typical use, where the timing is known.' },
      { title: 'Browse follow up', body: 'Reaches visitors who showed interest in a category with a short, relevant selection.' }
    ],
    setup: [
      { title: 'Check the data shared', body: 'Read the current documentation for both tools to see what passes between them.' },
      { title: 'Connect where supported', body: 'Follow the documented route to link them, if one exists for your setup.' },
      { title: 'Test an upsell order', body: 'Add an upsell item and confirm it appears correctly in order data on the profile.' },
      { title: 'Align the offers', body: 'Make sure onsite and email offers do not contradict each other.' },
      { title: 'Review the recommendation logic', body: 'Check the products shown make sense for the person and are in stock.' },
      { title: 'Build and test the follow up flows', body: 'Start with post purchase cross sell and verify it avoids items already bought.' }
    ],
    pitfalls: [
      'Email and onsite offers showing conflicting discounts.',
      'Recommending items the customer just bought.',
      'Pushing out of stock products.',
      'Too many recommendations in one message.',
      'Assuming shared data without testing.'
    ],
    terms: ['abandoned-cart-flow', 'email-segmentation', 'winback-flow'],
    service: 'email-flows'
  }
];

export const getIntegration = (slug: string) => INTEGRATIONS.find((i) => i.slug === slug);

/** Four related guides: same category first, then the rest, never the page itself. */
export function integrationSiblings(slug: string) {
  const at = INTEGRATIONS.findIndex((i) => i.slug === slug);
  if (at < 0) return [];
  // The next four in the list, wrapping round, so every page gets four inbound links.
  return [1, 2, 3, 4].map((n) => INTEGRATIONS[(at + n) % INTEGRATIONS.length]);
}
