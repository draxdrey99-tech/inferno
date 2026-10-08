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
    metaTitle: 'Klaviyo and Smile.io Integration Guide for Loyalty Programmes',
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
    metaTitle: 'Klaviyo and Typeform Integration Guide for Quizzes and Forms',
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
    metaTitle: 'Klaviyo and ShipStation Integration Guide for Shipping Emails',
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
    metaTitle: 'Klaviyo and Stamped.io Integration Guide for Reviews and Loyalty',
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
    metaTitle: 'Klaviyo and Okendo Integration Guide for Reviews and Referrals',
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
