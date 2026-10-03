/**
 * Email marketing glossary. One short page per term, because people search
 * for these one at a time and a page that answers exactly one question is
 * the most useful thing to land on. Definitions are general industry
 * knowledge, not claims about Inferno Emails. `service` links each term to
 * the commercial page it belongs to.
 */
export type Term = {
  slug: string;
  category: 'deliverability' | 'flows' | 'metrics' | 'lists' | 'strategy';
  term: string;
  metaTitle: string;
  metaDescription: string;
  /** One-sentence definition, written to be quoted as it stands. */
  definition: string;
  body: string[];
  /** A concrete worked illustration, clearly hypothetical. Unique to the page and required. */
  example: string;
  mistakes: string[];
  service: string;
  related: string[];
};

export const GLOSSARY: Term[] = [
  {
    slug: 'spf-dkim-dmarc',
    category: 'deliverability',
    term: 'SPF, DKIM and DMARC',
    metaTitle: 'SPF, DKIM and DMARC Explained for Store Owners',
    metaDescription: 'What SPF, DKIM and DMARC are, why Gmail and Outlook check them, and what an ecommerce store needs to set up so email reaches the inbox.',
    definition: 'SPF, DKIM and DMARC are three DNS records that prove an email really came from your domain, which mailbox providers like Gmail and Outlook check before deciding where to deliver it.',
    example: "Imagine a candle store sending from news.example.com. SPF lists its email platform, DKIM signs each message, and DMARC is set to monitor. A week of DMARC reports shows the helpdesk tool also sends as the domain but fails DKIM. The owner fixes that one sender, then moves DMARC to a stricter policy.",
    body: [
      'SPF lists the servers allowed to send mail for your domain. DKIM adds a cryptographic signature to each message so the receiver can confirm it was not altered. DMARC tells the receiver what to do when SPF or DKIM fails and sends you reports.',
      'Gmail and Yahoo require authentication for bulk senders. If your records are missing or wrong, your emails are more likely to land in spam or be rejected.',
      'For an ecommerce store the usual setup is a dedicated sending domain or subdomain connected to your email platform, with all three records published and checked.',
    ],
    mistakes: ['Sending from a free mailbox address instead of your own domain', 'Publishing DMARC at p=none and never moving beyond monitoring', 'Adding a second SPF record instead of editing the existing one'],
    service: 'email-deliverability',
    related: ['email-deliverability', 'sender-reputation'],
  },
  {
    slug: 'email-deliverability',
    category: 'deliverability',
    term: 'Email deliverability',
    metaTitle: 'What Is Email Deliverability? A Plain Explanation',
    metaDescription: 'Email deliverability is whether your emails reach the inbox instead of spam. Learn what affects it and what an ecommerce store can do about it.',
    definition: 'Email deliverability is the likelihood that an email you send reaches the recipient’s inbox rather than the spam folder or being blocked.',
    example: "A skincare store sees clicks fall for two months while sends stay the same. Test emails to Gmail land in Promotions, and the list has not been cleaned in a year. After authentication is checked and the oldest inactive contacts are suppressed, clicks recover on the next campaigns.",
    body: [
      'It depends on authentication (SPF, DKIM, DMARC), your sender reputation, list quality, and how recipients react: opens, clicks, complaints and unsubscribes.',
      'Deliverability is different from delivery. An email can be delivered to the mail server and still land in spam, which is why open rates can drift down without any error being reported.',
      'The fixes are usually unglamorous: authenticate the domain, stop mailing people who never engage, and send content people want.',
    ],
    mistakes: ['Mailing the entire list at full volume after a long gap', 'Never removing contacts who stopped opening', 'Judging health by open rate alone'],
    service: 'email-deliverability',
    related: ['spf-dkim-dmarc', 'sender-reputation'],
  },
  {
    slug: 'sender-reputation',
    category: 'deliverability',
    term: 'Sender reputation',
    metaTitle: 'What Is Sender Reputation in Email Marketing?',
    metaDescription: 'Sender reputation is the score mailbox providers give your domain and sending IP. Learn how it is built, how it is lost and how to protect it.',
    definition: 'Sender reputation is the trust mailbox providers assign to your sending domain and IP address based on how recipients and receivers have treated your past email.',
    example: "A coffee brand mails its whole list after a quiet summer and gets a spike in complaints. Its next sends start landing in spam. It rebuilds by mailing only recent openers for two weeks, then widening the audience step by step.",
    body: [
      'Good reputation comes from consistent sending, low complaint and bounce rates, and recipients who open and click. Poor reputation comes from spam complaints, sending to invalid addresses and sudden volume spikes.',
      'Reputation is earned slowly and lost quickly, so protect it by sending to engaged contacts first and warming up volume gradually after a pause.',
    ],
    mistakes: ['Buying or scraping lists', 'Sending a big blast after months of silence', 'Ignoring rising complaint rates'],
    service: 'email-deliverability',
    related: ['email-deliverability', 'spf-dkim-dmarc'],
  },
  {
    slug: 'welcome-flow',
    category: 'flows',
    term: 'Welcome flow',
    metaTitle: 'What Is a Welcome Flow? Email Sequence Explained',
    metaDescription: 'A welcome flow is the automated email series sent when someone joins your list. Learn what it should include and how long it should be.',
    definition: 'A welcome flow is an automated series of emails sent to a new subscriber, introducing the brand and guiding them to a first purchase.',
    example: "A fashion label's new subscriber gets the welcome email at once, the brand story the next day, best sellers on day three and a reminder of the first-order code on day seven. Someone who buys on day two leaves the flow and enters post-purchase instead.",
    body: [
      'It is usually the highest-engagement email a new subscriber will ever get, because they just asked to hear from you.',
      'A good welcome flow says who you are, shows your best products or story, answers common doubts, and makes a first-order offer where it fits the brand. Three to five emails over a week or two is a common range, tuned by testing.',
    ],
    mistakes: ['Opening with a discount before the brand has said anything', 'One email only', 'No exit once the person has bought'],
    service: 'email-flows',
    related: ['abandoned-cart-flow', 'winback-flow'],
  },
  {
    slug: 'abandoned-cart-flow',
    category: 'flows',
    term: 'Abandoned cart flow',
    metaTitle: 'What Is an Abandoned Cart Email Flow?',
    metaDescription: 'An abandoned cart flow is the automated series sent to shoppers who left items in their cart. Learn how it works and common mistakes.',
    definition: 'An abandoned cart flow is an automated email sequence sent to a shopper who added items to their cart but did not complete checkout.',
    example: "A shopper adds two items and leaves. A reminder arrives within a few hours, an email answering shipping and returns questions follows the next day, and a final nudge two days later. She buys after the second email and stops receiving the rest.",
    body: [
      'It reminds the shopper what they left, answers likely objections such as shipping or returns, and sometimes adds an incentive. It is one of the most reliable revenue flows because the shopper already showed buying intent.',
      'It needs a purchase exclusion so people who bought stop receiving it, and sensible timing, with the first email usually sent within hours.',
    ],
    mistakes: ['Continuing to email after the customer has purchased', 'Leading with a discount every time', 'Sending too late for the intent to still be warm'],
    service: 'email-flows',
    related: ['welcome-flow', 'winback-flow'],
  },
  {
    slug: 'winback-flow',
    category: 'flows',
    term: 'Winback flow',
    metaTitle: 'What Is a Winback Email Flow?',
    metaDescription: 'A winback flow re-engages customers who have stopped buying. Learn when to send it, what to say and when to stop mailing.',
    definition: 'A winback flow is an automated email sequence aimed at past customers who have not purchased for longer than their usual reorder window.',
    example: "A pet food store knows most customers reorder every six weeks. At ten weeks without an order, a winback email reminds a customer of their usual bag and asks one question. If they ignore it and a follow-up, they move to the sunset segment.",
    body: [
      'It triggers when someone passes the point where you would normally expect another order. The best winback emails remind the customer why they bought, show what is new, and make a single clear ask.',
      'If they still do not respond, the flow should end and the contact should move to a suppression or sunset segment, which protects deliverability.',
    ],
    mistakes: ['Using one fixed delay for every product', 'Offering a deep discount to customers who would have bought anyway', 'Never suppressing people who never respond'],
    service: 'retention-strategy',
    related: ['welcome-flow', 'email-segmentation'],
  },
  {
    slug: 'email-segmentation',
    category: 'lists',
    term: 'Email segmentation',
    metaTitle: 'What Is Email Segmentation? A Plain Guide',
    metaDescription: 'Email segmentation means sending different emails to different groups. Learn the segments that matter most for an ecommerce store.',
    definition: 'Email segmentation is dividing your list into groups based on behaviour, purchase history or engagement so each group gets a relevant message.',
    example: "A bakery splits its list into people who clicked in the last sixty days, people who bought once, and people who have not engaged for six months. The Mother's Day campaign goes to the first two groups, and the third gets a short re-engagement email instead.",
    body: [
      'The most useful segments for ecommerce are engagement (active, lapsing, inactive), purchase history (new, repeat, high-value) and interest (what they browsed or bought).',
      'Segmenting lifts relevance and protects deliverability, because inactive contacts stop dragging your engagement down.',
    ],
    mistakes: ['Sending every campaign to the whole list', 'Building segments you never use', 'Treating a first-time and a ten-time buyer the same'],
    service: 'klaviyo-email-marketing',
    related: ['winback-flow', 'email-deliverability'],
  },
{
    "slug": "bimi",
    "category": "deliverability",
    "term": "BIMI",
    "metaTitle": "What Is BIMI? Brand Logos in the Inbox Explained",
    "metaDescription": "BIMI lets your brand logo appear next to your emails in supporting inboxes. Learn what it needs and whether an ecommerce store should bother.",
    "definition": "BIMI (Brand Indicators for Message Identification) is a standard that lets your brand logo appear beside your emails in mailbox providers that support it.",
    example: "A footwear brand reaches DMARC enforcement, prepares its logo in the required format and obtains the certificate some providers ask for. In supporting inboxes its logo then appears next to its messages, which helps shoppers spot real emails among lookalikes.",
    "body": [
      "It builds on authentication. To qualify, your domain needs SPF, DKIM and a DMARC policy set to enforcement (quarantine or reject), and some providers also require a verified logo certificate.",
      "The benefit is recognition and a small trust signal in a crowded inbox. It does not fix deliverability by itself, so get authentication and list health right first."
    ],
    "mistakes": [
      "Chasing BIMI before DMARC is properly enforced",
      "Using a logo file that does not meet the format requirements",
      "Expecting it to improve inbox placement on its own"
    ],
    "service": "email-deliverability",
    "related": [
      "spf-dkim-dmarc",
      "email-deliverability"
    ]
  },
  {
    "slug": "open-rate",
    "category": "metrics",
    "term": "Open rate",
    "metaTitle": "What Is Open Rate in Email Marketing? (And Why It Misleads)",
    "metaDescription": "Open rate is the share of delivered emails that were opened. Since Apple Mail Privacy Protection it is inflated. What to measure instead.",
    "definition": "Open rate is the percentage of delivered emails that registered an open, usually measured by a tiny tracking image loading.",
    example: "Two subject lines are tested on equal halves of an audience. One shows a higher open rate, but clicks and revenue are the same. The team keeps both and learns the open difference came partly from automatic Apple opens, not real interest.",
    "body": [
      "Since Apple introduced Mail Privacy Protection in 2021, many Apple Mail opens are registered automatically whether or not a person looked at the email. That inflates open rates and makes them noisy.",
      "Use open rate only as a rough diagnostic, for example to compare two subject lines sent to similar audiences. Judge real performance by clicks, revenue per recipient and attributed revenue."
    ],
    "mistakes": [
      "Reporting open rate as the headline result",
      "Comparing open rate before and after 2021 as if it meant the same thing",
      "Optimising subject lines on opens alone"
    ],
    "service": "klaviyo-email-marketing",
    "related": [
      "click-through-rate",
      "revenue-per-recipient",
      "apple-mail-privacy-protection"
    ]
  },
  {
    "slug": "click-through-rate",
    "category": "metrics",
    "term": "Click-through rate",
    "metaTitle": "What Is Click-Through Rate (CTR) in Email Marketing?",
    "metaDescription": "Click-through rate is the share of recipients who click a link in your email. How it is calculated and how to read it for an ecommerce store.",
    "definition": "Click-through rate is the percentage of email recipients who click at least one link, usually calculated against delivered emails.",
    example: "A campaign has a high click rate but little revenue. The team checks the landing page and finds it loads slowly on mobile and hides the add-to-cart button. After fixing the page, the same email earns more from the same clicks.",
    "body": [
      "It is a better signal of interest than opens because a click needs a deliberate action. Click-to-open rate divides clicks by opens instead, which is less reliable now that opens are inflated.",
      "Read CTR alongside revenue. A high CTR on an email that does not sell may mean the offer or landing page is the problem, not the email."
    ],
    "mistakes": [
      "Chasing clicks that do not lead to sales",
      "Comparing CTR across very different audiences",
      "Ignoring mobile layout when clicks are low"
    ],
    "service": "klaviyo-email-marketing",
    "related": [
      "open-rate",
      "revenue-per-recipient"
    ]
  },
  {
    "slug": "bounce-rate",
    "category": "deliverability",
    "term": "Bounce rate",
    "metaTitle": "What Is Email Bounce Rate? Hard vs Soft Bounces",
    "metaDescription": "Bounce rate is the share of emails that could not be delivered. The difference between hard and soft bounces and what to do about each.",
    "definition": "Bounce rate is the percentage of sent emails that were rejected by the receiving server and not delivered.",
    example: "After importing an old customer list, a store sees many bounces on the first send. It removes the hard bounces, suppresses repeat soft bounces and sets a rule to remove new hard bounces automatically.",
    "body": [
      "A hard bounce is a permanent failure, such as an address that does not exist. A soft bounce is temporary, such as a full mailbox or a server problem.",
      "Remove hard bounces immediately. Repeated soft bounces should also be suppressed. A high bounce rate damages sender reputation, so it often points to old, purchased or badly collected addresses."
    ],
    "mistakes": [
      "Continuing to mail hard bounces",
      "Importing old lists without cleaning them",
      "Ignoring a sudden rise in bounces"
    ],
    "service": "email-deliverability",
    "related": [
      "sender-reputation",
      "suppression-list"
    ]
  },
  {
    "slug": "spam-complaint-rate",
    "category": "deliverability",
    "term": "Spam complaint rate",
    "metaTitle": "What Is Spam Complaint Rate? Limits for Email Senders",
    "metaDescription": "Spam complaint rate is the share of recipients who mark your email as spam. Why it matters and the thresholds big mailbox providers expect.",
    "definition": "Spam complaint rate is the percentage of delivered emails that recipients report as spam.",
    example: "A brand moves from weekly to daily sends and complaints climb in a few days. It returns to a lower frequency for most of the list, keeps daily sends for the most engaged group, and puts the unsubscribe link back where people can see it.",
    "body": [
      "Gmail and Yahoo guidance for bulk senders treats complaints as a key signal, with a commonly cited ceiling of 0.3 percent and a target well below 0.1 percent.",
      "Complaints rise when people cannot find the unsubscribe link, when you mail people who did not ask, or when you send too often. Make unsubscribing easy and mail engaged contacts first."
    ],
    "mistakes": [
      "Hiding the unsubscribe link",
      "Mailing contacts who never consented",
      "Ignoring complaint trends until a send is blocked"
    ],
    "service": "email-deliverability",
    "related": [
      "sender-reputation",
      "one-click-unsubscribe"
    ]
  },
  {
    "slug": "unsubscribe-rate",
    "category": "metrics",
    "term": "Unsubscribe rate",
    "metaTitle": "What Is Unsubscribe Rate and What Is Normal?",
    "metaDescription": "Unsubscribe rate is the share of recipients who opt out after an email. How to read it without panicking.",
    "definition": "Unsubscribe rate is the percentage of recipients who opt out of your list after receiving an email.",
    example: "One Friday campaign draws far more opt-outs than usual. The team finds it went to everyone, including recent buyers of the featured product. A suppression rule for recent buyers solves it for the next sale.",
    "body": [
      "Some unsubscribing is healthy, because it removes people who would never buy and who might otherwise mark you as spam. A sudden spike after one campaign is the thing to investigate.",
      "Look at which segment and which email caused it. Often the fix is better targeting or lower frequency, not a different design."
    ],
    "mistakes": [
      "Treating every unsubscribe as a failure",
      "Hiding the link so people complain instead",
      "Mailing the same offer to everyone regardless of interest"
    ],
    "service": "klaviyo-email-marketing",
    "related": [
      "email-segmentation",
      "spam-complaint-rate"
    ]
  },
  {
    "slug": "apple-mail-privacy-protection",
    "category": "metrics",
    "term": "Apple Mail Privacy Protection",
    "metaTitle": "What Is Apple Mail Privacy Protection (MPP)?",
    "metaDescription": "Apple Mail Privacy Protection loads email images in advance, inflating open rates. What it changes for ecommerce email reporting.",
    "definition": "Apple Mail Privacy Protection is an Apple feature, introduced in 2021, that pre-loads the images in emails so senders cannot tell whether a person actually opened them.",
    example: "A store defines engaged contacts as anyone who opened in the last ninety days. After Apple's change, people who never read the emails count as engaged. It redefines engagement by clicks and purchases, and the segment gets smaller but more accurate.",
    "body": [
      "Because the tracking image loads automatically, opens from Apple Mail users are registered whether or not the email was read. Open rates rose and became less meaningful.",
      "Shift reporting to clicks, conversions and revenue. Time-based and open-based triggers need checking, since automatic opens can fire them early."
    ],
    "mistakes": [
      "Using opens to define engaged segments",
      "Triggering flows on opens alone",
      "Reading a jump in open rate as better performance"
    ],
    "service": "klaviyo-email-marketing",
    "related": [
      "open-rate",
      "email-segmentation"
    ]
  },
  {
    "slug": "double-opt-in",
    "category": "lists",
    "term": "Double opt-in",
    "metaTitle": "What Is Double Opt-In? Pros and Cons for Ecommerce",
    "metaDescription": "Double opt-in asks new subscribers to confirm their email address. What it protects, what it costs and when to use it.",
    "definition": "Double opt-in is a sign-up process where a new subscriber must click a confirmation link in an email before being added to your list.",
    example: "A jewellery store sees many fake sign-ups from a pop-up giveaway. It adds a confirmation email, and the list grows more slowly but bounces and complaints fall because every address is confirmed.",
    "body": [
      "It confirms the address is real and belongs to the person, which keeps typos, fake sign-ups and spam traps off your list and protects deliverability.",
      "The trade-off is fewer subscribers, because some people never confirm. Many ecommerce stores use single opt-in with good validation; some markets and risk profiles favour double opt-in."
    ],
    "mistakes": [
      "Confirmation emails that look suspicious or arrive late",
      "Not checking local consent rules",
      "Using single opt-in with no address validation"
    ],
    "service": "email-deliverability",
    "related": [
      "email-deliverability",
      "sender-reputation"
    ]
  },
  {
    "slug": "browse-abandonment-flow",
    "category": "flows",
    "term": "Browse abandonment flow",
    "metaTitle": "What Is a Browse Abandonment Flow?",
    "metaDescription": "A browse abandonment flow emails people who viewed products but did not add to cart. How it works and how it differs from cart recovery.",
    "definition": "A browse abandonment flow is an automated email sent to an identified visitor who viewed products but left without adding anything to their cart.",
    example: "A visitor looks at three jackets and leaves without adding any to the cart. A day later she gets an email showing the jackets and a size guide. Because she has not started checkout, the cart flow does not fire.",
    "body": [
      "Intent is lower than for an abandoned cart, so the tone should be helpful, not pushy: remind them what they looked at, show similar items and answer common questions.",
      "It needs an identified contact, usually someone already on your list, and rules so it does not fire at the same time as the cart flow."
    ],
    "mistakes": [
      "Treating it like a cart email with a discount",
      "Firing it alongside the cart flow",
      "Emailing people who just bought"
    ],
    "service": "email-flows",
    "related": [
      "abandoned-cart-flow",
      "welcome-flow"
    ]
  },
  {
    "slug": "post-purchase-flow",
    "category": "flows",
    "term": "Post-purchase flow",
    "metaTitle": "What Is a Post-Purchase Email Flow?",
    "metaDescription": "A post-purchase flow follows up after an order with care, education and a reason to come back. What to include and when.",
    "definition": "A post-purchase flow is an automated series of emails sent after a customer buys, to help them use the product and set up the next order.",
    example: "After a customer buys a knife, he gets care instructions when it ships, a review request two weeks after delivery and a sharpening accessory suggestion after a month. None of the emails offer a discount on what he just bought.",
    "body": [
      "Useful emails here are care or usage guidance, a review request once the product has arrived and a relevant cross-sell. Order confirmation emails are separate and transactional.",
      "This flow is where repeat revenue starts. It should end the conversation only when the customer has what they need, not when the receipt is sent."
    ],
    "mistakes": [
      "Sending only a receipt",
      "Asking for a review before the product arrives",
      "Offering a discount on the item they just bought"
    ],
    "service": "email-flows",
    "related": [
      "replenishment-flow",
      "winback-flow"
    ]
  },
  {
    "slug": "replenishment-flow",
    "category": "flows",
    "term": "Replenishment flow",
    "metaTitle": "What Is a Replenishment Email Flow?",
    "metaDescription": "A replenishment flow reminds customers to reorder products that run out. How to time it using real repurchase intervals.",
    "definition": "A replenishment flow is an automated email sent shortly before a customer is likely to run out of a consumable product, prompting them to reorder.",
    example: "A supplement store finds most customers reorder a thirty-day bottle after about thirty-five days. It sends the reminder at day twenty-eight, so the email lands before the bottle runs out.",
    "body": [
      "Timing is the whole job. Use the real gap between first and second orders for each product, not a guess, and test sending slightly before that point.",
      "It works best for products people use up, such as coffee, skincare, supplements and pet food."
    ],
    "mistakes": [
      "Using one delay for every product",
      "Sending after the customer has already reordered",
      "Ignoring pack size"
    ],
    "service": "retention-strategy",
    "related": [
      "post-purchase-flow",
      "winback-flow"
    ]
  },
  {
    "slug": "back-in-stock-flow",
    "category": "flows",
    "term": "Back in stock flow",
    "metaTitle": "What Is a Back in Stock Email Flow?",
    "metaDescription": "A back in stock flow tells shoppers when a sold-out item returns. How it works and why it converts.",
    "definition": "A back in stock flow is an automated message sent to people who asked to be notified when a sold-out product is available again.",
    example: "A shopper taps notify me on a sold-out hoodie. When the size returns, an email goes to her within minutes with a link straight to that size. The same email goes only to people who asked for it.",
    "body": [
      "It reaches people who already wanted the product, so intent is high. It needs inventory events connected to your email platform and a clear sign-up on the product page.",
      "Send it promptly, because popular items can sell out again quickly."
    ],
    "mistakes": [
      "No notify-me option on sold-out pages",
      "Sending hours after stock returns",
      "Emailing people who did not ask"
    ],
    "service": "email-flows",
    "related": [
      "browse-abandonment-flow",
      "abandoned-cart-flow"
    ]
  },
  {
    "slug": "sunset-policy",
    "category": "lists",
    "term": "Sunset policy",
    "metaTitle": "What Is an Email Sunset Policy?",
    "metaDescription": "A sunset policy stops mailing people who never engage. Why it protects deliverability and how to set one up.",
    "definition": "A sunset policy is a rule for removing or suppressing contacts who have not engaged with your emails for a set period.",
    example: "A tea shop sets a rule: after one hundred and eighty days with no click or purchase, a contact gets a three-email last-chance series. Those who do not respond are suppressed, and the shop's click rate improves on the next sends.",
    "body": [
      "Mailing people who never open or click drags down engagement and sender reputation. A sunset flow gives them a last chance to re-engage, then stops mailing them.",
      "Choose the window based on your sending frequency and purchase cycle, and measure engagement by clicks and purchases rather than opens."
    ],
    "mistakes": [
      "Never suppressing inactive contacts",
      "Setting the window too short for slow-buying products",
      "Using opens as the only engagement signal"
    ],
    "service": "email-deliverability",
    "related": [
      "winback-flow",
      "suppression-list"
    ]
  },
  {
    "slug": "suppression-list",
    "category": "lists",
    "term": "Suppression list",
    "metaTitle": "What Is an Email Suppression List?",
    "metaDescription": "A suppression list holds addresses you must not email: unsubscribes, hard bounces and complaints. Why it matters.",
    "definition": "A suppression list is the set of email addresses you must not send to, such as unsubscribes, hard bounces and spam complainers.",
    example: "A store moves from one email platform to another. Before sending, it exports unsubscribes, hard bounces and complaints from the old platform and uploads them as suppressed in the new one, so nobody who opted out is mailed again.",
    "body": [
      "Mailing suppressed addresses breaks the law in many places and damages reputation. Your email platform maintains one automatically, but you must carry it over when you migrate.",
      "You can also add your own rules, for example long-inactive contacts removed under a sunset policy."
    ],
    "mistakes": [
      "Losing the list during a platform migration",
      "Re-importing unsubscribed contacts",
      "Not suppressing hard bounces"
    ],
    "service": "email-deliverability",
    "related": [
      "sunset-policy",
      "bounce-rate"
    ]
  },
  {
    "slug": "revenue-per-recipient",
    "category": "metrics",
    "term": "Revenue per recipient",
    "metaTitle": "What Is Revenue Per Recipient (RPR)?",
    "metaDescription": "Revenue per recipient divides attributed revenue by the number of recipients. Why it is a better email metric than opens or clicks.",
    "definition": "Revenue per recipient is the attributed revenue from an email or flow divided by the number of people who received it.",
    example: "A flow sent to two hundred people earns a modest sum, while a campaign sent to ten thousand earns more in total but less per person. Revenue per recipient shows the flow is the better performer, so the team builds more like it.",
    "body": [
      "It folds list size, engagement and conversion into one number, so you can compare a flow with a campaign, or this month with last, without being misled by volume.",
      "Use it to decide what to scale, fix or cut, alongside attributed revenue and repeat purchase rate."
    ],
    "mistakes": [
      "Comparing campaigns by total revenue when audience sizes differ",
      "Ignoring the attribution window",
      "Reporting opens instead"
    ],
    "service": "retention-strategy",
    "related": [
      "attributed-revenue",
      "click-through-rate"
    ]
  },
  {
    "slug": "attributed-revenue",
    "category": "metrics",
    "term": "Attributed revenue",
    "metaTitle": "What Is Attributed Revenue in Email Marketing?",
    "metaDescription": "Attributed revenue is the sales credited to email within an attribution window. How it works and its limits.",
    "definition": "Attributed revenue is the revenue your email platform credits to an email because the customer opened or clicked it before buying within a set time window.",
    example: "A store reports email as the source of a share of monthly revenue. It notes the platform's attribution window, which may credit an email for a sale made days after a click, and tracks the figure the same way every month to see the trend.",
    "body": [
      "It is the number that decides whether email is paying for itself, so it should be the headline in reports. The window and the rules matter, so know how your platform counts.",
      "It is not perfect: some sales would have happened anyway, and some influence is missed. Treat it as a consistent yardstick, not an exact truth."
    ],
    "mistakes": [
      "Comparing numbers from platforms that use different windows",
      "Taking credit for sales that would have happened anyway",
      "Ignoring flows versus campaigns split"
    ],
    "service": "klaviyo-email-marketing",
    "related": [
      "revenue-per-recipient",
      "customer-lifetime-value"
    ]
  },
  {
    "slug": "customer-lifetime-value",
    "category": "strategy",
    "term": "Customer lifetime value (CLV)",
    "metaTitle": "What Is Customer Lifetime Value (CLV)?",
    "metaDescription": "Customer lifetime value is the revenue a customer brings over their relationship with you. Why email retention raises it.",
    "definition": "Customer lifetime value is the total revenue, or profit, a customer is expected to generate over the whole time they buy from you.",
    example: "A tea brand discovers that customers who place a second order within sixty days go on to buy far more over time than those who do not. It builds a post-purchase flow aimed at securing that second order.",
    "body": [
      "It shows how much you can afford to spend to win a customer, and why repeat purchases matter. Raising the number of orders per customer lifts CLV without extra acquisition cost.",
      "Email is one of the cheapest ways to do that, through post-purchase, replenishment and winback flows."
    ],
    "mistakes": [
      "Optimising only for the first order",
      "Treating all customers as equally valuable",
      "Calculating CLV from too little data"
    ],
    "service": "retention-strategy",
    "related": [
      "post-purchase-flow",
      "winback-flow"
    ]
  },
  {
    "slug": "ab-testing",
    "category": "strategy",
    "term": "A/B testing in email",
    "metaTitle": "What Is A/B Testing in Email Marketing?",
    "metaDescription": "A/B testing sends two versions of an email to see which performs better. How to run tests that mean something.",
    "definition": "A/B testing is sending two versions of an email, differing in one element, to similar audiences to see which performs better.",
    example: "A store tests a short subject line against a long one on equal audiences, with everything else the same. It repeats the test on three campaigns before concluding that short lines earn more clicks for its audience.",
    "body": [
      "Test one thing at a time, such as subject line, offer or send time, and judge by clicks or revenue rather than opens. Make sure each group is large enough that the difference is not just noise.",
      "Keep a log of results, because the value comes from learning what your audience responds to over many tests."
    ],
    "mistakes": [
      "Changing several things at once",
      "Declaring a winner from a tiny sample",
      "Deciding on open rate"
    ],
    "service": "klaviyo-email-marketing",
    "related": [
      "open-rate",
      "click-through-rate"
    ]
  },
  {
    "slug": "transactional-vs-marketing-email",
    "category": "strategy",
    "term": "Transactional vs marketing email",
    "metaTitle": "Transactional vs Marketing Email: What Is the Difference?",
    "metaDescription": "Transactional emails confirm an action; marketing emails promote. Why the difference matters for consent and deliverability.",
    "definition": "A transactional email is triggered by a customer action and is needed to complete it, such as an order confirmation; a marketing email promotes products or content.",
    example: "A shop's order confirmation includes shipping details and a tracking link only. A separate campaign announces a sale. The two are sent from different streams, so a marketing slowdown never delays a confirmation.",
    "body": [
      "Transactional emails can be sent without marketing consent in most places, but they should not be used to sneak in promotions. Marketing email needs the right consent and an easy way to unsubscribe.",
      "Many stores send each from different streams so a marketing problem does not delay order confirmations."
    ],
    "mistakes": [
      "Adding promotions to receipts without thought",
      "Sending marketing to people who only agreed to order updates",
      "Sharing one reputation across both"
    ],
    "service": "email-deliverability",
    "related": [
      "email-deliverability",
      "sender-reputation"
    ]
  },
  {
    "slug": "ip-warming",
    "category": "deliverability",
    "term": "IP warming",
    "metaTitle": "What Is IP Warming (and Do You Need It)?",
    "metaDescription": "IP warming gradually increases sending volume on a new IP address or domain. Who needs it and how to do it.",
    "definition": "IP warming is gradually increasing the volume you send from a new IP address or domain so mailbox providers learn to trust it.",
    example: "A brand switches to a new sending domain. In week one it mails its most engaged few hundred contacts, doubles the audience each few days while watching bounces and complaints, and reaches the full list after about three weeks.",
    "body": [
      "Providers distrust sudden volume from an unknown sender. Start with your most engaged contacts in small batches and increase over days or weeks as engagement holds.",
      "Most small and mid-sized stores on a shared IP do not need to warm an IP, but they should still ramp up gradually after a long pause or a new sending domain."
    ],
    "mistakes": [
      "Sending a full-list blast from a new domain",
      "Warming with unengaged contacts",
      "Pausing and restarting at full volume"
    ],
    "service": "email-deliverability",
    "related": [
      "sender-reputation",
      "email-segmentation"
    ]
  },
  {
    "slug": "sending-domain",
    "category": "deliverability",
    "term": "Sending domain",
    "metaTitle": "What Is a Sending Domain (and Why Use a Subdomain)?",
    "metaDescription": "A sending domain is the domain your emails come from. Why many stores use a dedicated subdomain for marketing email.",
    "definition": "A sending domain is the domain name used in the technical authentication of your emails, often a subdomain of your main site.",
    example: "A bicycle store sends marketing from a subdomain such as mail.example.com, authenticated with SPF, DKIM and DMARC. If a campaign hurts that subdomain's reputation, staff mailboxes on the main domain are unaffected.",
    "body": [
      "Using a subdomain for marketing email, such as a mail or news prefix, keeps its reputation separate from your main domain and the mailboxes your team uses.",
      "It must be authenticated with SPF, DKIM and DMARC and used consistently."
    ],
    "mistakes": [
      "Sending marketing from a free mailbox address",
      "Switching sending domains often",
      "Not authenticating the subdomain"
    ],
    "service": "email-deliverability",
    "related": [
      "spf-dkim-dmarc",
      "ip-warming"
    ]
  },
  {
    "slug": "preheader-text",
    "category": "strategy",
    "term": "Preheader text",
    "metaTitle": "What Is Preheader Text in Email?",
    "metaDescription": "Preheader text is the preview line after the subject in the inbox. How to write it so it adds to the subject.",
    "definition": "Preheader text is the short preview line shown after the subject line in most inboxes, taken from the start of the email unless you set it.",
    example: "A subject line reads 'The last day of our sale'. Instead of repeating it, the preheader adds 'Free shipping ends at midnight' so the two lines together give more reason to open.",
    "body": [
      "It is a second line of subject, so use it to add something rather than repeat the subject or show a raw link. Keep it short enough to avoid being cut off.",
      "Set it deliberately, because otherwise the inbox shows whatever text comes first, often \"view in browser\"."
    ],
    "mistakes": [
      "Leaving it as \"view in browser\"",
      "Repeating the subject word for word",
      "Making it too long to display"
    ],
    "service": "email-design",
    "related": [
      "ab-testing",
      "dark-mode-email"
    ]
  },
  {
    "slug": "dark-mode-email",
    "category": "strategy",
    "term": "Dark mode email",
    "metaTitle": "What Is Dark Mode in Email and How Do You Design for It?",
    "metaDescription": "Dark mode changes how emails are displayed. How to design emails that still work when colours are inverted.",
    "definition": "Dark mode is a display setting that shows light content on dark backgrounds, and email clients may change an email's colours to match.",
    example: "A brand's black logo on a transparent background disappears when an email client inverts colours. It replaces the logo with a version that has a thin light outline, and tests every new email in dark mode before sending.",
    "body": [
      "Logos with white boxes, dark text on transparent images and low-contrast buttons can become unreadable. Test every email in dark mode before sending.",
      "Use transparent PNG logos with a light outline, avoid text baked into images, and choose colours that keep their contrast when inverted."
    ],
    "mistakes": [
      "Dark logos on transparent backgrounds",
      "Text stored inside images",
      "Never testing dark mode"
    ],
    "service": "email-design",
    "related": [
      "preheader-text",
      "click-through-rate"
    ]
  },
  {
    "slug": "one-click-unsubscribe",
    "category": "deliverability",
    "term": "One-click unsubscribe",
    "metaTitle": "What Is One-Click Unsubscribe in Email?",
    "metaDescription": "One-click unsubscribe lets recipients opt out from the mail client without visiting a page. Why bulk senders need it.",
    "definition": "One-click unsubscribe is a technical header that lets a mail client show an unsubscribe button that works instantly, without opening a web page.",
    example: "A recipient taps unsubscribe in the mail app and is removed immediately, without logging in or finding a link. The brand sees fewer spam reports because leaving is easy.",
    "body": [
      "Gmail and Yahoo require it for bulk senders. It makes unsubscribing easy, which lowers spam complaints, since people who cannot leave tend to hit the spam button.",
      "Most email platforms add it automatically, but you should confirm it is working on your sending domain."
    ],
    "mistakes": [
      "Assuming it is on without checking",
      "Hiding the visible unsubscribe link",
      "Making people log in to unsubscribe"
    ],
    "service": "email-deliverability",
    "related": [
      "spam-complaint-rate",
      "spf-dkim-dmarc"
    ]
  },
  {
    "slug": "email-flow-vs-campaign",
    "category": "strategy",
    "term": "Flow vs campaign",
    "metaTitle": "Email Flow vs Campaign: What Is the Difference?",
    "metaDescription": "A flow is automated and triggered by behaviour; a campaign is a one-off send. How the two work together.",
    "definition": "A flow is an automated email sequence triggered by something a customer does, while a campaign is a one-off email sent to a chosen segment on a chosen date.",
    example: "A store's welcome flow runs automatically for every new subscriber, while its Black Friday email is a campaign sent to a chosen segment on one date. Customers in the welcome flow are held back from the campaign for a few days.",
    "body": [
      "Flows run all the time and earn between campaigns, so they are usually the first thing to build. Campaigns announce launches, sales and content on a calendar.",
      "A healthy programme has both, with segmentation deciding who gets what."
    ],
    "mistakes": [
      "Relying only on campaigns",
      "Building flows and never revisiting them",
      "Not coordinating the two so customers get both at once"
    ],
    "service": "email-flows",
    "related": [
      "welcome-flow",
      "email-segmentation"
    ]
  }
];

export const getTerm = (slug: string) => GLOSSARY.find((t) => t.slug === slug);

/** The next three terms in the same category, wrapping round, so every term gets inbound links from siblings. */
export function termSiblings(slug: string) {
  const t = getTerm(slug);
  if (!t) return [];
  const pool = GLOSSARY.filter((x) => x.category === t.category);
  const i = pool.findIndex((x) => x.slug === slug);
  return [1, 2, 3].map((n) => pool[(i + n) % pool.length]).filter((x, k, arr) => x.slug !== slug && arr.findIndex((y) => y.slug === x.slug) === k);
}
