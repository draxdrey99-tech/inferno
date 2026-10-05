/**
 * One-question FAQ pages. Each answers a single question people actually
 * type, directly in the first sentence, then adds detail and links to the
 * glossary terms and service behind it. Answers are general industry
 * knowledge; nothing here claims a client result. `detail` is the unique
 * content per page and may never be empty (see scripts/quality-gate.mjs).
 */
export type Faq = {
  slug: string;
  category: 'strategy' | 'flows' | 'metrics' | 'lists' | 'deliverability';
  q: string;
  /** The direct answer, quotable as it stands. */
  a: string;
  detail: string[];
  /** A concrete worked illustration, clearly hypothetical. Unique to the page and required. */
  example: string;
  /** Glossary term slugs. */
  terms: string[];
  /** Service page slug. */
  service: string;
};

export const FAQ_PAGES: Faq[] = [
  {
    "slug": "how-often-should-ecommerce-send-emails",
    "category": "strategy",
    "q": "How often should an ecommerce store send marketing emails?",
    "a": "There is no single right number. Most stores do well starting with about one campaign a week and raising frequency only while engagement and complaints stay healthy.",
    "detail": [
      "Frequency is limited by what you have to say and how your audience reacts, not by a rule. Watch clicks, revenue per recipient, unsubscribes and complaints as you change it.",
      "Segment before you send more. Engaged customers can take more emails than people who have not clicked in months, so a higher frequency for some and a lower one for others usually beats one rate for everyone."
    ],
    "example": "A store sends one campaign a week and sees steady clicks. It tests a second weekly send to the most engaged third of the list only. Complaints stay flat and revenue per recipient rises for that group, so it keeps the split.",
    "terms": [
      "email-segmentation",
      "unsubscribe-rate"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "what-is-a-good-open-rate",
    "category": "metrics",
    "q": "What is a good open rate for ecommerce email?",
    "a": "Open rate is no longer a reliable benchmark, because Apple Mail Privacy Protection registers opens automatically. Compare against your own past results and judge by clicks and revenue.",
    "detail": [
      "Industry open-rate figures vary widely by source, list quality and how opens are counted, so quoting a single \"good\" number would be misleading.",
      "A better habit is tracking your own trend over time, then focusing on click rate and revenue per recipient, which reflect real behaviour."
    ],
    "example": "A store compares this quarter's opens to its own last quarter rather than to a published average. Opens are flat, but clicks and revenue per recipient have risen, so the programme is improving even though the headline number has not moved.",
    "terms": [
      "open-rate",
      "apple-mail-privacy-protection",
      "revenue-per-recipient"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "how-long-should-a-welcome-flow-be",
    "category": "flows",
    "q": "How long should a welcome flow be?",
    "a": "A welcome flow is commonly three to five emails over one to two weeks. The right length depends on your product and should be set by testing.",
    "detail": [
      "A simple product with a clear offer may need fewer emails. A considered, higher-ticket product often needs more room to educate and build trust.",
      "Add an exit so anyone who buys leaves the flow, and review each email by revenue to see where people drop off."
    ],
    "example": "A single-product wellness brand runs three emails over five days. A kitchenware brand with a higher-priced product runs five emails over two weeks, because its buyers need more time and education before deciding.",
    "terms": [
      "welcome-flow",
      "post-purchase-flow"
    ],
    "service": "email-flows"
  },
  {
    "slug": "when-to-send-first-abandoned-cart-email",
    "category": "flows",
    "q": "When should the first abandoned cart email be sent?",
    "a": "Send it within a few hours of abandonment, while the shopper still remembers what they were buying. Most stores test somewhere between one and a few hours.",
    "detail": [
      "Waiting a day loses much of the intent that made the cart worth recovering. Later emails in the flow can be spaced further apart.",
      "Always exclude people who have already bought, so nobody is reminded of a cart they completed."
    ],
    "example": "A store tests sending the first cart email after one hour against after four hours. The earlier email recovers more carts, so it makes one hour the default and tests the later emails separately.",
    "terms": [
      "abandoned-cart-flow",
      "browse-abandonment-flow"
    ],
    "service": "email-flows"
  },
  {
    "slug": "should-abandoned-cart-emails-include-a-discount",
    "category": "flows",
    "q": "Should abandoned cart emails include a discount?",
    "a": "Not necessarily. Use reminders and reassurance first, and keep any incentive for the last email or for specific shoppers, so people do not learn to abandon on purpose.",
    "detail": [
      "Premium brands often protect price and lead with proof, shipping and returns information instead. Price-sensitive categories may respond to an offer.",
      "Test it. Compare a flow with a discount in the final email against one without, and judge by margin, not just conversion."
    ],
    "example": "A store keeps the first two cart emails discount-free and offers free shipping in the third. It compares margin as well as orders, and finds the third email recovers a useful number of carts without teaching everyone to wait for a code.",
    "terms": [
      "abandoned-cart-flow",
      "email-segmentation"
    ],
    "service": "email-flows"
  },
  {
    "slug": "how-to-stop-marketing-emails-going-to-spam",
    "category": "deliverability",
    "q": "How do I stop my marketing emails going to spam?",
    "a": "Authenticate your domain with SPF, DKIM and DMARC, stop mailing people who never engage, keep sending volume steady and make unsubscribing easy.",
    "detail": [
      "Most spam problems come from authentication gaps or a tired list, not from a particular word in the subject line. Check those first.",
      "If placement is still poor, test where emails land in Gmail and Outlook, and review complaint and bounce rates."
    ],
    "example": "A store follows a checklist: verify SPF, DKIM and DMARC, suppress contacts with no clicks for six months, hold volume steady and add one-click unsubscribe. After two weeks, test emails to Gmail reach the inbox.",
    "terms": [
      "spf-dkim-dmarc",
      "sunset-policy",
      "spam-complaint-rate"
    ],
    "service": "email-deliverability"
  },
  {
    "slug": "do-i-need-dmarc",
    "category": "deliverability",
    "q": "Do I need DMARC for ecommerce email?",
    "a": "Yes. Gmail and Yahoo expect bulk senders to authenticate with SPF, DKIM and DMARC, and a missing DMARC record makes it more likely your mail is filtered.",
    "detail": [
      "Start with a monitoring policy so nothing breaks, read the reports, then move toward enforcement once every legitimate sender passes.",
      "DMARC also protects your brand from being spoofed in phishing emails."
    ],
    "example": "A store publishes DMARC in monitoring mode and reads the reports for a month. They show a forgotten invoicing tool sending as the domain. Once it is authenticated, the store moves the policy toward enforcement.",
    "terms": [
      "spf-dkim-dmarc",
      "bimi"
    ],
    "service": "email-deliverability"
  },
  {
    "slug": "flow-vs-campaign-difference",
    "category": "flows",
    "q": "What is the difference between an email flow and a campaign?",
    "a": "A flow is an automated sequence triggered by customer behaviour, such as signing up or abandoning a cart. A campaign is a one-off email sent to a chosen group on a chosen date.",
    "detail": [
      "Flows keep earning between campaigns, so they are usually built first. Campaigns handle launches, sales and content.",
      "Use both, and use segmentation so the same person is not hit by a flow and a campaign at once."
    ],
    "example": "A new customer signs up and receives the welcome flow automatically. A week later the store sends a campaign about a new range, but the customer is held out until the flow finishes, so they do not get both at once.",
    "terms": [
      "email-flow-vs-campaign",
      "welcome-flow"
    ],
    "service": "email-flows"
  },
  {
    "slug": "how-big-does-an-email-list-need-to-be",
    "category": "lists",
    "q": "How big does my email list need to be for email marketing to work?",
    "a": "There is no minimum. Flows trigger on behaviour, so they work on a small list, and a small engaged list can earn more than a large tired one.",
    "detail": [
      "With a small list, put effort into capture, such as a clear sign-up offer, and into core flows like welcome and abandoned cart.",
      "List size matters less than engagement. Revenue per recipient is a better way to judge it."
    ],
    "example": "A new store with a few hundred subscribers builds a welcome flow and an abandoned cart flow first. Even small volumes trigger them daily, and the store grows the list with a clear sign-up offer on the site.",
    "terms": [
      "revenue-per-recipient",
      "email-segmentation"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "how-often-should-i-clean-my-email-list",
    "category": "lists",
    "q": "How often should I clean my email list?",
    "a": "Review it at least quarterly, and run a sunset flow continuously so inactive contacts are suppressed on a rolling basis.",
    "detail": [
      "Remove hard bounces straight away. Suppress contacts who have not clicked or bought within a window that suits your buying cycle.",
      "Cleaning improves engagement and protects sender reputation, even though the list gets smaller.",
      "Keep a simple log of each clean-up, with the date, how many contacts were suppressed and what happened to engagement afterwards, so you learn how aggressive your rules can safely be."
    ],
    "example": "A store runs a sunset flow all year and reviews hard bounces and complaints every quarter. Each review takes under an hour and keeps its engagement steady.",
    "terms": [
      "sunset-policy",
      "suppression-list",
      "bounce-rate"
    ],
    "service": "email-deliverability"
  },
  {
    "slug": "best-day-and-time-to-send-marketing-email",
    "category": "strategy",
    "q": "What is the best day and time to send marketing emails?",
    "a": "There is no universal best time. Test send times against your own audience and judge by clicks and revenue, not opens.",
    "detail": [
      "Time zones, audience habits and product type all change the answer. A repeatable approach is to run controlled tests over several weeks.",
      "Consistency also helps deliverability, so avoid wild swings in when and how much you send."
    ],
    "example": "A store sends the same campaign on a Tuesday morning to one half and a Thursday evening to the other. It repeats the test across several weeks before changing its schedule, since one test can be noise.",
    "terms": [
      "ab-testing",
      "click-through-rate"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "is-email-marketing-still-worth-it",
    "category": "strategy",
    "q": "Is email marketing still worth it for ecommerce?",
    "a": "Yes. Email is an owned channel with a low cost per send, and it lets you earn repeat purchases from customers you have already paid to acquire.",
    "detail": [
      "Unlike paid ads, you are not renting attention on each message. A well-built set of flows keeps working without extra ad spend.",
      "The key is treating it as a system with flows, segmentation and testing, rather than occasional newsletters."
    ],
    "example": "A store compares what it spends to win a first order with what it spends to earn a second order by email. The email cost is a few sends, while the first order cost included paid traffic, so repeat purchases are the cheaper revenue.",
    "terms": [
      "customer-lifetime-value",
      "email-flow-vs-campaign"
    ],
    "service": "retention-strategy"
  },
  {
    "slug": "should-i-use-sms-as-well-as-email",
    "category": "strategy",
    "q": "Should I use SMS as well as email?",
    "a": "SMS can work alongside email for time-sensitive messages, but it needs explicit consent and should be used sparingly. Email remains the base for most stores.",
    "detail": [
      "Treat SMS as a complement for things like back-in-stock alerts and delivery updates, not a replacement.",
      "Check consent and local rules before collecting numbers, and keep messages short and relevant.",
      "Start with one small, clearly useful SMS use case and a separate consent step, then review opt-out rates before adding more message types."
    ],
    "example": "A store uses SMS only for back-in-stock alerts and delivery updates to people who opted in. Everything else stays in email, so it avoids over-messaging and stays within consent rules.",
    "terms": [
      "back-in-stock-flow",
      "double-opt-in"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "how-much-does-an-email-marketing-agency-cost",
    "category": "strategy",
    "q": "How much does an email marketing agency cost?",
    "a": "It depends on scope, such as flow build only, full management or design support. Reputable agencies quote after reviewing your account rather than guessing up front.",
    "detail": [
      "Pricing models vary: fixed project fees for builds, monthly retainers for management, or a mix. Compare what is included, not just the price.",
      "Inferno Emails starts with a free audit and quotes only after seeing the account."
    ],
    "example": "A store asks two agencies for quotes. One quotes before seeing the account, the other quotes after an audit that names which flows are missing. The second quote is easier to compare because it describes the actual work.",
    "terms": [
      "customer-lifetime-value"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "what-to-look-for-in-a-klaviyo-agency",
    "category": "strategy",
    "q": "What should I look for in a Klaviyo agency?",
    "a": "Look for evidence of results in accounts like yours, clear reporting on attributed revenue, named people you can speak to, and honesty about when they are not the right fit.",
    "detail": [
      "Ask to see example emails and flows, how they report, and who will actually work on your account.",
      "Be wary of promises of fixed numbers by fixed dates, and of agencies that cannot explain their process."
    ],
    "example": "A founder asks each agency for an example flow, how they report attributed revenue and who would work on the account. The agency that answers all three clearly and names the people involved goes to the shortlist.",
    "terms": [
      "attributed-revenue",
      "email-flow-vs-campaign"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "how-long-until-email-marketing-shows-results",
    "category": "strategy",
    "q": "How long until email marketing shows results?",
    "a": "Campaigns can start earning within weeks, while flows compound over months. Deliverability repairs, where needed, often take several weeks.",
    "detail": [
      "The first gains usually come from fixing gaps in core flows and sending well-targeted campaigns. Retention effects grow as more customers pass through the lifecycle.",
      "Be sceptical of anyone promising a fixed uplift by a fixed date without seeing your account."
    ],
    "example": "A store fixes its welcome and cart flows in the first month, then sends better-targeted campaigns. Flow revenue builds gradually over the next quarters as more customers pass through them.",
    "terms": [
      "welcome-flow",
      "email-deliverability"
    ],
    "service": "retention-strategy"
  },
  {
    "slug": "what-is-revenue-per-recipient-faq",
    "category": "metrics",
    "q": "What is revenue per recipient and why does it matter?",
    "a": "Revenue per recipient is attributed revenue divided by recipients. It lets you compare emails and flows fairly regardless of how many people received them.",
    "detail": [
      "It combines list size, engagement and conversion in one number. Use it to decide which flows to scale and which campaigns to cut.",
      "Pair it with attributed revenue and repeat purchase rate for the full picture."
    ],
    "example": "A flow sent to two hundred people earns less in total than a campaign sent to ten thousand, but earns more per recipient. The store builds more flows of that kind.",
    "terms": [
      "revenue-per-recipient",
      "attributed-revenue"
    ],
    "service": "retention-strategy"
  },
  {
    "slug": "why-is-my-email-open-rate-dropping",
    "category": "metrics",
    "q": "Why is my email open rate dropping?",
    "a": "Possible causes are lower inbox placement, a tired list, changes to how opens are counted, or less relevant content. Check clicks and revenue to see if it is real.",
    "detail": [
      "Apple Mail Privacy Protection inflated opens and made them noisy, so a change in open rate may not reflect behaviour.",
      "If clicks and revenue fall too, look at authentication, list health and sending volume."
    ],
    "example": "A store sees opens fall but clicks and revenue stay level. It concludes the drop is mostly measurement noise, and leaves its programme alone while it keeps watching click rate.",
    "terms": [
      "open-rate",
      "apple-mail-privacy-protection",
      "email-deliverability"
    ],
    "service": "email-deliverability"
  },
  {
    "slug": "how-to-warm-up-a-new-sending-domain",
    "category": "deliverability",
    "q": "How do I warm up a new sending domain?",
    "a": "Start with your most engaged contacts in small batches, authenticate the domain fully, and raise volume gradually over days or weeks while watching bounces and complaints.",
    "detail": [
      "Mailbox providers distrust sudden volume from an unknown sender. Slow and steady builds reputation.",
      "Do not warm with unengaged contacts, and avoid pausing and then resuming at full volume.",
      "Keep notes on each stage of the ramp-up, and pause the increase if bounces or complaints rise, returning to the last volume that stayed healthy."
    ],
    "example": "A store starts with its most engaged few hundred contacts, doubles volume every few days while bounces and complaints stay low, and reaches the whole list after about three weeks.",
    "terms": [
      "ip-warming",
      "sending-domain",
      "sender-reputation"
    ],
    "service": "email-deliverability"
  },
  {
    "slug": "can-i-send-marketing-email-from-gmail-address",
    "category": "deliverability",
    "q": "Can I send marketing emails from a Gmail address?",
    "a": "No. Send from your own authenticated domain. Gmail and Yahoo expect bulk senders to use their own domain with SPF, DKIM and DMARC.",
    "detail": [
      "A free mailbox address cannot be authenticated for you, so your mail is more likely to be filtered or rejected.",
      "Set up a branded sending domain in your email platform and use a real, monitored reply address."
    ],
    "example": "A founder starts by emailing a list from a personal Gmail account. Messages are filtered and some are rejected. After moving to an authenticated branded domain in an email platform, delivery becomes reliable.",
    "terms": [
      "sending-domain",
      "spf-dkim-dmarc"
    ],
    "service": "email-deliverability"
  },
  {
    "slug": "what-is-a-sunset-flow",
    "category": "flows",
    "q": "What is a sunset flow?",
    "a": "A sunset flow is a short series sent to contacts who have stopped engaging, giving them a last chance before they are suppressed.",
    "detail": [
      "It protects deliverability by removing people who never open or click, and it can win back some who simply forgot you.",
      "Set the window by your buying cycle, and judge engagement by clicks and purchases rather than opens.",
      "Keep a record of how many contacts re-engage from each email in the series, so you can shorten the flow or change the reasons to click if one message does most of the work."
    ],
    "example": "A store emails inactive contacts three times, with a different reason to click each time. Those who click return to the main list, and the rest are suppressed.",
    "terms": [
      "sunset-policy",
      "suppression-list",
      "winback-flow"
    ],
    "service": "email-deliverability"
  },
  {
    "slug": "do-i-need-double-opt-in",
    "category": "lists",
    "q": "Do I need double opt-in for my ecommerce email list?",
    "a": "Not always. Double opt-in gives cleaner data but fewer sign-ups. Many stores use single opt-in with address validation, depending on market and risk.",
    "detail": [
      "Check local consent rules, since some regions expect stricter proof of consent.",
      "If spam traps or fake sign-ups are a problem, double opt-in is a strong fix.",
      "Whichever route you choose, store the date, time and source of each sign-up, because that record is what you rely on if consent is ever questioned."
    ],
    "example": "A store in a market with strict consent rules uses double opt-in and keeps the confirmation record. Another store with low-risk traffic uses single opt-in with address validation and monitors bounces.",
    "terms": [
      "double-opt-in",
      "bounce-rate"
    ],
    "service": "email-deliverability"
  },
  {
    "slug": "how-many-emails-in-an-abandoned-cart-flow",
    "category": "flows",
    "q": "How many emails should an abandoned cart flow have?",
    "a": "Three is a common starting point over about three days: a reminder, an answer to doubts and a last nudge. Test whether a fourth earns more than it costs in goodwill.",
    "detail": [
      "Sending the first email within hours matters more than how many follow.",
      "Always exclude buyers, and judge each email by its own revenue.",
      "Review each email's revenue separately, and remove or rewrite the weakest one before adding any more, since extra sends have a cost in goodwill."
    ],
    "example": "A store runs three cart emails and tests adding a fourth. The fourth earns little and increases unsubscribes, so it removes it and keeps the three.",
    "terms": [
      "abandoned-cart-flow",
      "browse-abandonment-flow"
    ],
    "service": "email-flows"
  },
  {
    "slug": "transactional-emails-vs-marketing-emails-faq",
    "category": "strategy",
    "q": "What is the difference between transactional and marketing emails?",
    "a": "Transactional emails confirm or complete an action the customer took, like an order confirmation. Marketing emails promote products or content and need marketing consent.",
    "detail": [
      "Do not use receipts to sneak in promotions without thought, and consider separating the two streams so a marketing issue cannot delay confirmations.",
      "Both need authentication and good list hygiene.",
      "Review both streams separately each month, looking at bounces and complaints, so you can see which one is affecting your sender reputation."
    ],
    "example": "A store sends order confirmations from a dedicated stream with only order details. Its newsletters go from a separate stream with marketing consent, so a problem with one does not affect the other.",
    "terms": [
      "transactional-vs-marketing-email",
      "email-deliverability"
    ],
    "service": "email-deliverability"
  },
  {
    "slug": "how-to-set-up-a-klaviyo-welcome-flow",
    "category": "flows",
    "q": "How do I set up a welcome flow in Klaviyo?",
    "a": "Create a flow triggered by joining your list, add a first email that sends right away, then two to four follow-ups spaced a day or more apart. Set a flow filter so existing customers are excluded, then turn it live.",
    "detail": [
      "In Klaviyo, open Flows, choose Create Flow and pick the welcome series recipe, which uses the list or form submission as its trigger. Choose the list you want it tied to, so every new signup enters automatically.",
      "Write the first email to deliver whatever the signup form promised, then use later emails to introduce the brand, show best sellers and answer common objections. Add a conditional split so people who buy leave the series instead of receiving more introductory messages.",
      "Preview on mobile, send yourself a test, and check smart sending and quiet hours before switching the flow from draft to live."
    ],
    "example": "A candle shop sets its welcome flow to trigger when someone joins the main list. The first email goes out immediately with the code the popup promised, the second tells the founding story, and the third shows three best sellers. Buyers are filtered out after the first order.",
    "terms": [
      "welcome-flow",
      "email-segmentation"
    ],
    "service": "email-flows"
  },
  {
    "slug": "how-to-segment-email-list-by-purchase-history",
    "category": "lists",
    "q": "How do I segment my email list by purchase history?",
    "a": "Build segments from placed-order events: group people by number of orders, time since last order, total spend or product bought. Start with first-time buyers, repeat buyers and lapsed customers, then refine only when each group needs different messaging.",
    "detail": [
      "Most email platforms record each order as an event. You can then define segments such as people who ordered once, people who ordered more than once, and people whose last order was a long time ago.",
      "Pick segments that change what you would actually send. A repeat buyer can see loyalty or new-arrival content, while a first-time buyer benefits from education and a nudge toward a second order.",
      "Keep definitions simple at first and review them each quarter, since segments that nobody uses add maintenance without adding revenue."
    ],
    "example": "A coffee roaster creates three segments: customers with one order, customers with several orders, and customers whose last order was long ago. The campaign for the first group highlights a subscription, the second gets a limited release, and the third receives a gentle reminder.",
    "terms": [
      "email-segmentation",
      "customer-lifetime-value"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "what-is-a-good-unsubscribe-rate",
    "category": "metrics",
    "q": "What is a good unsubscribe rate for marketing emails?",
    "a": "A good unsubscribe rate is low and stable compared with your own history, usually a small fraction of recipients per send. A sudden rise matters more than the absolute number, so watch trend by campaign type.",
    "detail": [
      "Published benchmarks vary by industry, list source and how often you send, so a single universal target is not reliable. Compare each send with your own recent average instead.",
      "Some unsubscribes are healthy, since they remove people who would never buy and protect your sender reputation. Worry when a particular campaign, segment or acquisition source produces a clear spike.",
      "Always compare unsubscribes with spam complaints, because complaints are the more damaging signal for deliverability."
    ],
    "example": "A brand sends a weekly campaign and sees unsubscribes stay steady for months. After it doubles frequency for everyone, the rate jumps on the first send. It rolls the change back for less engaged segments and the rate settles again.",
    "terms": [
      "unsubscribe-rate",
      "spam-complaint-rate"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "how-to-grow-an-email-list-on-shopify",
    "category": "lists",
    "q": "How do I grow an email list on Shopify?",
    "a": "Collect consented signups at every touchpoint: a popup or embedded form, a checkout opt-in, a footer signup and a clear reason to subscribe. Connect the forms to your email platform so new subscribers sync automatically.",
    "detail": [
      "Start with the integration between Shopify and your email platform, then add forms that match your site design. A well-timed popup with a clear benefit usually collects more than a footer link alone.",
      "Offer something worth the address: early access, a guide, a gift with purchase or a discount if your margins allow. Be honest about what they will receive and how often.",
      "Capture permission at checkout as well, because customers who just bought are the warmest audience you have."
    ],
    "example": "A jewelry store adds an embedded form to its homepage, a checkout opt-in and a quiet exit popup offering early access to new releases. Each form feeds one list in its email platform, and the welcome flow starts automatically.",
    "terms": [
      "double-opt-in",
      "welcome-flow"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "plain-text-vs-html-email-for-ecommerce",
    "category": "strategy",
    "q": "Should ecommerce emails be plain text or HTML?",
    "a": "Use designed HTML for product-focused campaigns and flows, and plain text style for personal, founder or service messages. Test both, because the better format depends on your audience and purpose.",
    "detail": [
      "HTML email lets you show products, use buttons and keep branding consistent, which suits most promotional sends. Plain text style emails feel personal and can work well for apology notes, feedback requests or founder letters.",
      "Whichever you choose, include a clear call to action, working alt text for images and a readable layout on mobile. Many readers see images blocked at first.",
      "Run an A/B test on a comparable send and judge by clicks and revenue per recipient rather than opens alone."
    ],
    "example": "A bag brand sends designed HTML campaigns for launches but tests a short plain text note from its founder as a post-purchase check-in. It keeps the HTML for sales and uses the plain note for relationship building.",
    "terms": [
      "ab-testing",
      "dark-mode-email"
    ],
    "service": "email-design"
  },
  {
    "slug": "how-to-reactivate-inactive-email-subscribers",
    "category": "lists",
    "q": "How do I reactivate inactive email subscribers?",
    "a": "Send a short, targeted re-engagement sequence to people who have not opened or clicked in a long time, then remove those who still do not respond. Reactivating a few engaged readers is worth more than keeping a large silent list.",
    "detail": [
      "Define inactive using your own buying cycle, for example no clicks or purchases for several months. Then send two or three messages with a clear value, such as a preference update or a best-of roundup.",
      "Be willing to let people go. Continued sending to unengaged addresses lowers engagement rates and can push your mail toward spam folders.",
      "Move those who do not respond into a suppression list, but keep them in your ad audiences if that suits your plan."
    ],
    "example": "A tea brand identifies subscribers with no clicks for half a year. It sends three emails asking whether they still want to hear from it and offering a choice of topics. Those who click return to the main list and the rest are suppressed.",
    "terms": [
      "sunset-policy",
      "suppression-list"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "klaviyo-vs-mailchimp-for-ecommerce",
    "category": "strategy",
    "q": "Is Klaviyo or Mailchimp better for ecommerce?",
    "a": "Klaviyo is usually the stronger fit for ecommerce stores because of its deep store integrations, event-based segmentation and built-in revenue reporting. Mailchimp can suit very small or content-led senders with simple needs.",
    "detail": [
      "Klaviyo records store behavior such as viewed product, added to cart and placed order, which makes behavioral flows and precise segments straightforward. Its reports tie email activity to store revenue.",
      "Mailchimp offers a gentler start and a broad marketing toolset, and may be enough for a small list with occasional newsletters. Costs and features change, so check current plans for both.",
      "The best choice depends on your store platform, list size, team skills and plans for automation. Migration is possible later but takes planning."
    ],
    "example": "A new store with a few hundred subscribers and a monthly newsletter picks a simple tool. A year later it wants cart and browse automations and segments by purchase behavior, so it plans a migration to a platform built for ecommerce.",
    "terms": [
      "email-flow-vs-campaign",
      "email-segmentation"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "how-to-set-up-a-post-purchase-flow",
    "category": "flows",
    "q": "How do I set up a post-purchase email flow?",
    "a": "Trigger a flow from the placed-order event, then send a thank-you, shipping and usage guidance, a review request and a relevant cross-sell. Space them around delivery time so each message arrives when it is useful.",
    "detail": [
      "Keep order confirmations in your transactional system and use the marketing flow to build the relationship afterwards. Start with usefulness: how to use or care for the product, and what to expect.",
      "Request a review once the customer has had time to use the item, not just when it ships. Later, suggest complementary products based on what they bought.",
      "Exclude recent buyers from promotions that compete with the flow, and tailor the path for first-time versus repeat customers."
    ],
    "example": "A skincare shop sends a thank-you after the order, a usage guide as the parcel arrives, a review request after a few weeks and a refill suggestion near when the bottle should run low. Each message has one clear job.",
    "terms": [
      "post-purchase-flow",
      "transactional-vs-marketing-email"
    ],
    "service": "email-flows"
  },
  {
    "slug": "how-to-set-up-a-back-in-stock-flow",
    "category": "flows",
    "q": "How do I set up back in stock emails?",
    "a": "Add a notify-me form on out-of-stock product pages, collect the subscriber against that product, and send an alert when stock returns. Most email platforms offer this as a built-in feature or flow.",
    "detail": [
      "Shoppers who ask to be told are showing high intent, so send the alert quickly once inventory is available. Keep the email short, with the product image and a direct link.",
      "Make sure the stock status is updated reliably, otherwise people may be alerted for items that sell out again within minutes. Consider sending only when quantity passes a sensible threshold.",
      "Be clear about consent: the shopper is requesting one alert, so respect that and invite them to subscribe separately."
    ],
    "example": "A sneaker store shows a notify-me button on sold-out sizes. When a restock arrives, it emails each person who asked, with the exact size and a direct link to buy. The page also invites them to join its main list.",
    "terms": [
      "back-in-stock-flow",
      "double-opt-in"
    ],
    "service": "email-flows"
  },
  {
    "slug": "what-is-a-good-click-rate-for-email",
    "category": "metrics",
    "q": "What is a good click rate for ecommerce email?",
    "a": "A good click rate is one that sits above your own recent average for a similar type of email. Benchmarks vary widely, so use them only as rough context and track revenue per recipient alongside.",
    "detail": [
      "Click rate is a more dependable engagement signal than opens, because Apple Mail Privacy Protection inflates opens. Still, rates differ between flows and campaigns, so compare like with like.",
      "Flows aimed at warm intent, such as cart reminders, usually perform better than broad newsletters. Judge each against its own category history.",
      "Clicks matter only if they lead to purchases, so pair click rate with conversion and revenue per recipient."
    ],
    "example": "A brand reviews its last quarter and sees newsletters get fewer clicks than its post-purchase flow, which is expected. It sets a goal to beat its own newsletter average by improving subject lines and a clearer button.",
    "terms": [
      "click-through-rate",
      "revenue-per-recipient"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "how-to-tell-if-an-email-is-working-without-open-rates",
    "category": "metrics",
    "q": "How can I judge email performance without open rates?",
    "a": "Look at click rate, conversion rate, revenue per recipient and unsubscribes instead. These reflect real behavior and are not distorted by automatic image loading from privacy features.",
    "detail": [
      "Apple Mail Privacy Protection loads images for many recipients, so open rate overstates real attention. Treat opens as directional at best.",
      "Revenue per recipient shows how much each send contributes, while click rate and unsubscribes show interest and fatigue. Compare trends over several sends rather than single results.",
      "Use A/B tests with clicks or revenue as the winning metric, not opens."
    ],
    "example": "A team used to pick subject-line winners by opens. It switches to choosing winners by clicks and revenue per recipient, and finds that the subject line with fewer opens actually drove more orders.",
    "terms": [
      "apple-mail-privacy-protection",
      "revenue-per-recipient"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "what-are-spam-traps-and-how-to-avoid-them",
    "category": "deliverability",
    "q": "What are spam traps and how do I avoid them?",
    "a": "Spam traps are addresses used by mailbox providers and blocklist operators to catch senders with poor list practices. Avoid them by only mailing people who opted in, removing bounces and sunsetting long-inactive contacts.",
    "detail": [
      "Some traps are old abandoned addresses that were repurposed, and others were never real users at all. Hitting one suggests you are mailing old or acquired lists.",
      "You cannot identify a trap by looking at it, so prevention is the strategy. Use confirmed signups, validate addresses and stop sending to people who have not engaged in a long time.",
      "If you suspect a trap hit, pause, clean the list and review your sources."
    ],
    "example": "A store inherits a decade-old customer file and starts mailing it. Delivery drops. It stops, removes everyone who has not interacted recently, re-asks consent from the rest and rebuilds sending slowly.",
    "terms": [
      "sender-reputation",
      "suppression-list"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "why-is-my-email-landing-in-spam-after-a-long-break",
    "category": "deliverability",
    "q": "Why do my emails go to spam after I stopped sending for a while?",
    "a": "Mailbox providers lose context for senders who go quiet, and a sudden large send to an old list looks suspicious. Resume gradually with your most engaged subscribers first, then widen the audience.",
    "detail": [
      "Reputation is tied to recent behavior. After a long gap, many addresses have changed or gone inactive, and engagement with your mail will be lower.",
      "Start with people who engaged most recently, send consistently at moderate volume and watch bounces and complaints. Expand to wider segments only if the results stay healthy.",
      "Consider a sunset process for those who remain unresponsive."
    ],
    "example": "A shop pauses emails for several months, then sends to everyone at once and lands in spam. It restarts with recent buyers only, adds more groups every week and delivery recovers steadily.",
    "terms": [
      "ip-warming",
      "sender-reputation"
    ],
    "service": "klaviyo-email-marketing"
  }
];

export const getFaq = (slug: string) => FAQ_PAGES.find((f) => f.slug === slug);

/** The next three questions in the same category, wrapping round. Every FAQ page therefore gets at least three inbound links from siblings. */
export function faqSiblings(slug: string) {
  const f = getFaq(slug);
  if (!f) return [];
  const pool = FAQ_PAGES.filter((x) => x.category === f.category);
  const i = pool.findIndex((x) => x.slug === slug);
  return [1, 2, 3].map((n) => pool[(i + n) % pool.length]).filter((x, k, arr) => x.slug !== slug && arr.findIndex((y) => y.slug === x.slug) === k);
}
