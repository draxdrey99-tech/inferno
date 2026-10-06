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
  },
  {
    "slug": "spam-trap",
    "category": "deliverability",
    "term": "Spam trap",
    "metaTitle": "What Is a Spam Trap in Email Marketing?",
    "metaDescription": "A spam trap is an address used to catch senders with poor list hygiene. Learn the types, how they get on a list and how to avoid them.",
    "definition": "A spam trap is an email address that belongs to no real subscriber and exists only to identify senders who mail people without permission or who never clean their lists.",
    "body": [
      "There are two common kinds. Pristine traps are addresses that were never used by a person, so the only way onto your list is scraping, buying or guessing. Recycled traps are old addresses that were abandoned and later repurposed by a mailbox provider or blocklist operator to catch senders who keep mailing dead contacts.",
      "Hitting a trap does not usually show up as an error. You may simply see delivery drop, blocklist listings or sudden spam folder placement. Prevention is the realistic approach: collect addresses with clear consent, use double opt-in where it fits, and stop mailing people who have not engaged for a long time.",
      "Typos at signup are another route in, such as a misspelled domain that happens to be a trap. Validating addresses at the point of capture helps."
    ],
    "example": "A hypothetical tea shop imports an old event attendee spreadsheet from several years ago. Within a week its emails start landing in spam and a blocklist check shows a listing. Tracing it back, the imported file is the only new source, and it likely contained recycled addresses. The shop removes the file and rebuilds with consented signups only.",
    "mistakes": [
      "Importing purchased or very old lists",
      "Never suppressing contacts who stopped engaging years ago",
      "Skipping address validation on signup forms"
    ],
    "service": "email-deliverability",
    "related": [
      "suppression-list",
      "sender-reputation",
      "hard-vs-soft-bounce"
    ]
  },
  {
    "slug": "feedback-loop",
    "category": "deliverability",
    "term": "Feedback loop",
    "metaTitle": "What Is an Email Feedback Loop (FBL)?",
    "metaDescription": "A feedback loop tells senders when a recipient marks their email as spam. Learn how it works and what to do with the reports.",
    "definition": "A feedback loop is a service offered by some mailbox providers that notifies a sender when a recipient reports one of their messages as spam, so that person can be removed from future sends.",
    "body": [
      "Each report identifies the message that was flagged, which lets the sender suppress that address. Continuing to mail someone who has complained is one of the fastest ways to damage reputation.",
      "Not every provider offers a feedback loop, and many require you to register your sending IP or domain. Where you use a major email platform, complaints are generally processed on your behalf and the contact is suppressed automatically, but it is worth confirming how yours handles them.",
      "Treat the volume of reports as a signal. A rising count after a particular campaign usually points to a list source, frequency or content problem rather than bad luck."
    ],
    "example": "Imagine a stationery shop sends a promotion to a freshly merged list. Complaints arrive through feedback loop reports within a day. The team confirms those contacts are suppressed, finds that most came from one older import, and stops sending to that import until it is re-permissioned.",
    "mistakes": [
      "Assuming complaints are handled without checking",
      "Ignoring which list source the complaints came from",
      "Re-adding complained contacts through a later import"
    ],
    "service": "email-deliverability",
    "related": [
      "spam-complaint-rate",
      "suppression-list",
      "spam-trap"
    ]
  },
  {
    "slug": "hard-vs-soft-bounce",
    "category": "deliverability",
    "term": "Hard bounce vs soft bounce",
    "metaTitle": "Hard Bounce vs Soft Bounce: What Is the Difference?",
    "metaDescription": "A hard bounce is a permanent delivery failure and a soft bounce is temporary. Learn how each is handled and why it matters for reputation.",
    "definition": "A hard bounce is a permanent delivery failure, such as an address that does not exist, while a soft bounce is a temporary failure, such as a full mailbox or a server that is briefly unavailable.",
    "body": [
      "Hard bounces should be suppressed immediately. Mailing nonexistent addresses signals poor list quality to mailbox providers. Most email platforms do this automatically.",
      "Soft bounces are retried for a period. If an address keeps soft bouncing across several sends, platforms generally treat it as undeliverable and stop mailing it.",
      "Watching both tells you something about list health. Hard bounces cluster around bad data sources and typos, while soft bounces can point to temporary receiver issues or a mailbox that nobody uses."
    ],
    "example": "A hypothetical jewelry store notices a small group of addresses bouncing after a trade show signup sheet was typed in by hand. The hard bounces are suppressed automatically, and the team adds address checks to the signup form so typos are caught before they reach the list.",
    "mistakes": [
      "Re-importing suppressed addresses",
      "Treating every bounce as a temporary glitch",
      "Not validating addresses captured offline"
    ],
    "service": "email-deliverability",
    "related": [
      "bounce-rate",
      "suppression-list",
      "spam-trap"
    ]
  },
  {
    "slug": "event-trigger",
    "category": "flows",
    "term": "Event trigger",
    "metaTitle": "What Is an Event Trigger in Email Automation?",
    "metaDescription": "An event trigger is the customer action that starts an automated email flow. Learn common triggers and how to choose the right one.",
    "definition": "An event trigger is a customer action or data change, such as placing an order or starting checkout, that starts an automated flow for that person.",
    "body": [
      "Flows in Klaviyo and similar platforms start from a trigger. It can be a tracked event like Started Checkout, a list or segment joining, or a date property such as a birthday.",
      "The trigger decides who enters and when. A trigger tied to a real action is usually more relevant than a calendar send, because the email arrives when the behaviour is fresh.",
      "Events must be tracked reliably for this to work. If the store integration does not send an event, the flow quietly never starts, so test each trigger with a real or test profile."
    ],
    "example": "A hypothetical bookshop sets a flow to trigger on a customer viewing a series page but not purchasing. When a visitor browses the second book of a series and leaves, the flow starts and sends an email about that series a few hours later.",
    "mistakes": [
      "Choosing a trigger without verifying the event fires",
      "Triggering several flows on the same event with no priority",
      "Using a list trigger when a behaviour trigger fits better"
    ],
    "service": "email-flows",
    "related": [
      "flow-filter",
      "abandoned-cart-flow"
    ]
  },
  {
    "slug": "flow-filter",
    "category": "flows",
    "term": "Flow filter",
    "metaTitle": "What Is a Flow Filter in Klaviyo?",
    "metaDescription": "A flow filter limits who can enter or stay in a flow. Learn how it differs from a trigger and common filters for ecommerce.",
    "definition": "A flow filter is a rule on a flow that decides which people are allowed to enter it or continue through it, such as excluding anyone who has already purchased.",
    "body": [
      "Trigger filters apply when a person qualifies to enter. Profile filters apply at each step when the message is about to send, so someone who stops meeting the condition is skipped.",
      "Typical ecommerce uses include excluding recent purchasers from a promotional flow, limiting a flow to a country or product line, and keeping people on the suppression list out entirely.",
      "Filters are a common reason a flow seems to send nothing. When troubleshooting, check whether the filters are removing the people you expected to reach."
    ],
    "example": "A hypothetical coffee roaster has a browse flow filtered to exclude anyone who bought in the last two weeks. A customer who buys the day after browsing is skipped at the next step, so they never get a reminder for something they already own.",
    "mistakes": [
      "Adding filters that exclude almost everyone",
      "Forgetting to exclude recent purchasers",
      "Never checking why a flow has low entry volume"
    ],
    "service": "email-flows",
    "related": [
      "event-trigger",
      "abandoned-cart-flow"
    ]
  },
  {
    "slug": "cross-sell-email",
    "category": "flows",
    "term": "Cross-sell email",
    "metaTitle": "What Is a Cross-Sell Email? Ecommerce Examples",
    "metaDescription": "A cross-sell email recommends products that complement what a customer just bought. Learn when to send it and how to keep it relevant.",
    "definition": "A cross-sell email recommends products that go well with something a customer has already bought, rather than repeating the same item.",
    "body": [
      "It usually sits inside a post-purchase flow after delivery, once the customer has had time to use the first item. Relevance is the point, so recommendations should match the product bought, not simply the best sellers.",
      "Product data matters. Clear categories, tags and a reliable catalog feed make it possible to pair items logically, such as a case with a device or a refill with a starter kit.",
      "Timing matters as much as the content. Sending before the order arrives feels pushy, while sending after the customer has tried the product reads as helpful."
    ],
    "example": "Imagine a hypothetical bike accessories store. A customer buys a helmet, and a few weeks after delivery receives an email about lights and a lock, with a short note on how riders usually kit out a commuter bike.",
    "mistakes": [
      "Recommending the item the customer just bought",
      "Sending while the order is still in transit",
      "Pairing products with no logical link"
    ],
    "service": "email-flows",
    "related": [
      "post-purchase-flow",
      "catalog-feed",
      "replenishment-flow"
    ]
  },
  {
    "slug": "klaviyo-metric",
    "category": "metrics",
    "term": "Klaviyo metric",
    "metaTitle": "What Is a Metric in Klaviyo? Events Explained",
    "metaDescription": "A Klaviyo metric is a type of tracked event, like Placed Order. Learn how metrics power flows, segments and reporting.",
    "definition": "A Klaviyo metric is a named type of event the platform records for a profile, such as Placed Order, Started Checkout or Opened Email.",
    "body": [
      "Each time a customer does something tracked, an event of that metric is stored on their profile with details such as the product or value. Metrics come from integrations like your store platform, from Klaviyo itself, or from custom events you send.",
      "Metrics are the building blocks of most automation. Flows trigger on them, segments are defined by them and reports count them over time.",
      "Because so much depends on them, check that the key ecommerce metrics are flowing in correctly before building anything. A missing event usually means a broken integration, not a customer who did nothing."
    ],
    "example": "A hypothetical outdoor gear store opens its metrics list and sees Placed Order, Started Checkout and Viewed Product are all recording. It then builds a segment of people who viewed a tent three times without purchasing, which can only be done because that metric is tracked.",
    "mistakes": [
      "Building flows before confirming events are recorded",
      "Mixing custom event names with inconsistent spelling",
      "Treating missing events as customer inactivity"
    ],
    "service": "klaviyo-email-marketing",
    "related": [
      "event-trigger",
      "attributed-revenue"
    ]
  },
  {
    "slug": "holdout-group",
    "category": "metrics",
    "term": "Holdout group",
    "metaTitle": "What Is a Holdout Group in Email Marketing?",
    "metaDescription": "A holdout group is a set of people deliberately not sent a message, used to measure its true effect. Learn how to run one.",
    "definition": "A holdout group is a randomly chosen set of contacts who are deliberately not sent an email so their behaviour can be compared with those who were.",
    "body": [
      "Attribution tells you what customers did after an email, but not what they would have done anyway. A holdout compares the two groups, so the gap shows the effect of the message itself.",
      "The groups must be chosen randomly and be large enough to compare. Hold them out for long enough for purchasing to show up, and keep everything else the same for both.",
      "Holdouts have a cost, because the held-out people miss the message. They are best used selectively, for example on a flow that you suspect mostly reaches people who would buy regardless."
    ],
    "example": "A hypothetical candle brand holds back a small random slice of new subscribers from a replenishment reminder for a month. If the reminded group reorders noticeably more than the held-out group, the flow is adding value, and if not, the brand reconsiders it.",
    "mistakes": [
      "Choosing the held-out group by hand",
      "Ending the test before purchases show up",
      "Changing the message partway through the test"
    ],
    "service": "retention-strategy",
    "related": [
      "attributed-revenue",
      "ab-testing"
    ]
  },
  {
    "slug": "predictive-analytics",
    "category": "metrics",
    "term": "Predictive analytics",
    "metaTitle": "What Is Predictive Analytics in Email Marketing?",
    "metaDescription": "Predictive analytics estimates things like next order date or churn risk from past behaviour. Learn how stores use it in Klaviyo.",
    "definition": "Predictive analytics uses a customer's past behaviour to estimate what they are likely to do next, such as when they will order again or whether they are likely to stop buying.",
    "body": [
      "In Klaviyo, predictive fields on a profile can include expected date of next order, predicted lifetime value and churn risk. They are estimates based on patterns in your own order history, not guarantees.",
      "They are most useful for segmentation. You might target people expected to reorder soon, or nudge customers whose risk of lapsing has risen.",
      "Predictions need enough order history to be meaningful. A new store with few orders will get thinner results, and any prediction should be checked against what you actually see before building a strategy on it."
    ],
    "example": "A hypothetical coffee shop builds a segment of customers whose expected next order date falls in the coming week and who have not ordered yet. They receive a reminder, while customers flagged as high churn risk get a different, gentler message.",
    "mistakes": [
      "Treating predictions as certain",
      "Using them with very little order history",
      "Never validating predictions against real outcomes"
    ],
    "service": "klaviyo-email-marketing",
    "related": [
      "customer-lifetime-value",
      "replenishment-flow"
    ]
  },
  {
    "slug": "email-list-growth",
    "category": "lists",
    "term": "Email list growth",
    "metaTitle": "How to Grow an Ecommerce Email List the Right Way",
    "metaDescription": "Email list growth is adding new, consented subscribers over time. Learn the main sources and why quality beats raw size.",
    "definition": "Email list growth is the steady addition of new subscribers who have agreed to hear from you, measured by how many are real, reachable and engaged rather than by total size.",
    "body": [
      "Common sources include signup forms and popups, checkout opt-ins, giveaways, content downloads and in-person capture. Each brings people with different intent, so track which sources lead to real engagement and orders.",
      "Quality matters more than headline numbers. A large list of people who never open hurts engagement metrics and deliverability, while a smaller engaged list performs better.",
      "Growth is also about retention of subscribers. If many people leave soon after joining, review what the signup promised and what the first emails delivered."
    ],
    "example": "Imagine a hypothetical stationery brand that compares its sources and finds checkout opt-ins produce buyers while a giveaway brings many people who never open. It keeps the giveaway but moves them into a separate segment with a slower welcome series.",
    "mistakes": [
      "Counting total list size as success",
      "Using giveaways that attract only prize hunters",
      "Never checking which source leads to purchases"
    ],
    "service": "klaviyo-email-marketing",
    "related": [
      "lead-magnet",
      "double-opt-in"
    ]
  },
  {
    "slug": "lead-magnet",
    "category": "lists",
    "term": "Lead magnet",
    "metaTitle": "What Is a Lead Magnet? Examples for Ecommerce",
    "metaDescription": "A lead magnet is something useful offered in exchange for an email address. Learn what works for stores and what to avoid.",
    "definition": "A lead magnet is something of value, such as a guide, quiz or early access, offered in exchange for a person's email address.",
    "body": [
      "For ecommerce, the best lead magnets relate directly to the product. A fit guide, a buying checklist, a quiz that recommends products or early access to a launch attracts people who are likely to be real customers.",
      "Generic prizes bring people who want the prize, not the product. The closer the offer is to what you sell, the better the quality of the list that results.",
      "Deliver what you promised quickly, and follow it with a welcome flow that continues the conversation rather than going silent."
    ],
    "example": "Imagine a hypothetical running shoe store offering a short fit quiz that recommends a shoe type based on gait and distance. Those who complete it join a flow that explains the recommendation and shows relevant models.",
    "mistakes": [
      "Offering something unrelated to the products",
      "Failing to deliver the promised item promptly",
      "Dropping new subscribers into a generic flow"
    ],
    "service": "klaviyo-email-marketing",
    "related": [
      "email-list-growth",
      "welcome-flow"
    ]
  },
  {
    "slug": "vip-segment",
    "category": "lists",
    "term": "VIP segment",
    "metaTitle": "What Is a VIP Segment for Ecommerce Email?",
    "metaDescription": "A VIP segment is a group of your best customers by spend or frequency. Learn how to define it and what to send.",
    "definition": "A VIP segment is a group of your most valuable customers, defined by measures such as total spend, order count or consistent recent purchasing.",
    "body": [
      "The definition should fit your business. A store with frequent low-value orders might use order count, while one with rare large purchases might use total spend. Review the thresholds periodically so the group stays meaningful.",
      "VIPs respond well to recognition rather than discounts: early access, previews, personal notes or exclusive products. Discounting your best customers can reduce margin on sales that would have happened anyway.",
      "Also watch for VIPs who go quiet. A message to a lapsing high-value customer is often worth more attention than one to a casual buyer."
    ],
    "example": "Imagine a hypothetical jewelry store defining VIPs as customers with several orders in the past year. Before each launch they get a preview link a day early, and one who has gone quiet is sent a short note from the founder.",
    "mistakes": [
      "Using a threshold that never updates",
      "Discounting VIPs by default",
      "Ignoring VIPs who stop buying"
    ],
    "service": "retention-strategy",
    "related": [
      "customer-lifetime-value",
      "email-segmentation"
    ]
  },
  {
    "slug": "dynamic-content",
    "category": "strategy",
    "term": "Dynamic content",
    "metaTitle": "What Is Dynamic Content in Email Marketing?",
    "metaDescription": "Dynamic content changes parts of an email for each recipient. Learn how stores use it and how to keep it manageable.",
    "definition": "Dynamic content is part of an email that changes depending on who receives it, such as different blocks for different segments or product recommendations based on browsing.",
    "body": [
      "The email has one template with rules that swap blocks. A subscriber who has bought before might see a loyalty note while a first-time visitor sees a brand introduction.",
      "It saves effort compared with building many versions of the same email, and makes each message feel more relevant.",
      "Complexity is the risk. Each variation is something to test, and fallbacks are needed for when data is missing, so keep the number of rules small and preview the email as several different profiles before sending."
    ],
    "example": "A hypothetical outdoor brand sends one newsletter with a header block that shows tents to people who browsed camping gear and jackets to those who browsed hiking apparel. People with no browsing data see a general feature block.",
    "mistakes": [
      "Creating many variations that nobody tests",
      "Leaving out a fallback when data is missing",
      "Not previewing as different profiles"
    ],
    "service": "email-design",
    "related": [
      "email-segmentation",
      "catalog-feed"
    ]
  },
  {
    "slug": "catalog-feed",
    "category": "strategy",
    "term": "Catalog feed",
    "metaTitle": "What Is a Catalog Feed in Email Marketing?",
    "metaDescription": "A catalog feed is the product data an email platform uses for recommendations and dynamic blocks. Learn what it needs to be accurate.",
    "definition": "A catalog feed is the set of product data, such as names, prices, images, links and availability, that an email platform syncs from your store to use in emails.",
    "body": [
      "It powers product blocks, recommendations and back-in-stock messages. When the store integration syncs correctly, an email can pull the current image and price for each item automatically.",
      "Accuracy matters because customers click what they see. Out-of-stock items, wrong prices and broken images all come from stale or incomplete data.",
      "Good product data also helps recommendations. Clear categories and consistent tags let the platform group related items sensibly."
    ],
    "example": "A hypothetical shoe store notices a recommendation block showing an item that sold out last week. The team finds that stock status was not syncing, fixes the integration, and adds a check of the catalog before each large campaign.",
    "mistakes": [
      "Not checking sync status before campaigns",
      "Leaving products without images or categories",
      "Showing out-of-stock items in blocks"
    ],
    "service": "klaviyo-email-marketing",
    "related": [
      "cross-sell-email",
      "dynamic-content",
      "back-in-stock-flow"
    ]
  },
  {
    "slug": "dkim-selector",
    "category": "deliverability",
    "term": "DKIM selector",
    "metaTitle": "What Is a DKIM Selector? Plain Explanation",
    "metaDescription": "A DKIM selector is the name that tells receivers which public key to look up for your signature. Learn how it works and why stores need it.",
    "definition": "A DKIM selector is a label placed in a DNS record name so a receiving server knows which public key to use when checking the DKIM signature on an email.",
    "body": [
      "When a sender signs a message with DKIM, the signature header names a selector and the signing domain. The receiver combines them into a DNS lookup, such as selector underscore domainkey dot your domain, and fetches the public key published there.",
      "Selectors let one domain use several keys at once. Your email platform, your helpdesk and your invoicing tool can each sign with a different selector, and you can rotate a key by publishing a new selector before retiring the old one.",
      "Many platforms give you the selector and the record value to paste into DNS. If the selector in the record does not match what the platform signs with, authentication fails even though a record exists."
    ],
    "example": "Picture a furniture store whose email platform asks it to publish two records named after two selectors. The owner adds only one. Test sends show DKIM failing in the message headers. After the second record is published and DNS has propagated, the next test shows DKIM passing and DMARC alignment holding.",
    "mistakes": [
      "Copying only some of the records the platform provides",
      "Adding extra characters or quotes when pasting the key into DNS",
      "Deleting an old selector before every sender stopped using it"
    ],
    "service": "email-deliverability",
    "related": [
      "spf-dkim-dmarc",
      "sending-domain",
      "feedback-loop"
    ]
  },
  {
    "slug": "google-postmaster-tools",
    "category": "deliverability",
    "term": "Google Postmaster Tools",
    "metaTitle": "What Is Google Postmaster Tools for Email Senders?",
    "metaDescription": "Google Postmaster Tools shows how Gmail sees your sending domain. Learn what it reports and how a store can use it.",
    "definition": "Google Postmaster Tools is a free dashboard from Google that shows how Gmail rates your sending domain, including reputation, spam rate and authentication results.",
    "body": [
      "You verify ownership of your sending domain with a DNS record, then the dashboard reports on traffic that reaches Gmail users. Typical panels cover domain reputation, spam rate, authentication success and delivery errors.",
      "It only shows data once you send enough volume to Gmail recipients, so small senders may see empty charts. The data is also specific to Gmail, so it is a useful signal rather than the whole picture.",
      "Used regularly, it works as an early warning. A drop in reputation or a rise in spam rate often appears here before open rates visibly change."
    ],
    "example": "Consider a pet supplies store that checks the dashboard after a large seasonal campaign. The spam rate panel has risen and domain reputation has slipped a level. The team trims the next sends to recent engagers only, and watches the panels recover over the following weeks.",
    "mistakes": [
      "Verifying the wrong domain or subdomain",
      "Checking it only after revenue has already dropped",
      "Reading it as a complete view of all inbox providers"
    ],
    "service": "email-deliverability",
    "related": [
      "sender-reputation",
      "spam-complaint-rate",
      "sending-domain"
    ]
  },
  {
    "slug": "shared-vs-dedicated-ip",
    "category": "deliverability",
    "term": "Shared vs dedicated IP",
    "metaTitle": "Shared vs Dedicated IP for Email: Which Do You Need?",
    "metaDescription": "Shared IPs pool reputation across senders while dedicated IPs are yours alone. Learn the trade-offs for an ecommerce store.",
    "definition": "A shared IP is sent from by many brands at once, so reputation is pooled, while a dedicated IP is used only by you, so reputation depends entirely on your own sending.",
    "body": [
      "Shared IPs suit smaller or irregular senders. The pool has steady volume, and the platform manages its health. The risk is that other senders on the pool can affect it.",
      "A dedicated IP gives control and a reputation that is yours alone, but it needs consistent volume and a proper warm-up. Without regular sending, a dedicated IP can build a weak reputation rather than a strong one.",
      "The choice is rarely the first fix to make. Authentication, list quality and content usually matter more than which kind of IP you use."
    ],
    "example": "Imagine a small apparel brand with a modest list and uneven campaign cadence. It stays on the platform shared pool and puts its effort into list cleaning. A much larger store with daily sends and steady volume moves to a dedicated IP and warms it up over several weeks.",
    "mistakes": [
      "Moving to a dedicated IP with low or irregular volume",
      "Skipping the warm-up period",
      "Expecting a new IP to fix a list quality problem"
    ],
    "service": "email-deliverability",
    "related": [
      "ip-warming",
      "sender-reputation",
      "sending-domain"
    ]
  },
  {
    "slug": "conditional-split",
    "category": "flows",
    "term": "Conditional split",
    "metaTitle": "What Is a Conditional Split in an Email Flow?",
    "metaDescription": "A conditional split sends flow recipients down different paths based on a condition. Learn how to use it without overbuilding.",
    "definition": "A conditional split is a branching step in a flow that sends each person down a yes or no path depending on a condition, such as whether they have placed an order.",
    "body": [
      "Conditions can use profile properties, past purchases, segment membership or how someone interacted with an earlier message. The path a contact takes is decided at that moment in the flow.",
      "A common use is in a welcome flow: new customers go one way and subscribers who have never bought go another. It lets one flow serve people in different situations without maintaining separate flows.",
      "Use splits where the message really should differ. Each branch needs its own email to maintain, so too many branches become hard to keep accurate."
    ],
    "example": "Imagine a skincare brand whose welcome flow has a split after the second email asking whether the person has purchased. Buyers receive a how-to-use guide, while non-buyers receive a product quiz and a gentle reminder about first-order shipping.",
    "mistakes": [
      "Splitting on something that cannot change over time",
      "Creating many branches with no one maintaining them",
      "Forgetting what happens when neither condition is met"
    ],
    "service": "email-flows",
    "related": [
      "flow-filter",
      "event-trigger",
      "welcome-flow"
    ]
  },
  {
    "slug": "smart-sending",
    "category": "flows",
    "term": "Smart sending",
    "metaTitle": "What Is Smart Sending in Klaviyo?",
    "metaDescription": "Smart sending skips a profile that already got a message recently. Learn what it does, when to turn it off and what it protects.",
    "definition": "Smart sending is a setting that skips sending a message to a person who has already received another message within a set recent window.",
    "body": [
      "It exists to prevent fatigue. If someone received a flow email an hour ago, a campaign scheduled for the same afternoon is skipped for them rather than stacking on top.",
      "It is useful by default, but some messages should bypass it, such as a time-sensitive transactional-style update where the customer expects the message regardless.",
      "Because skipped recipients are not an error, they can look like missing sends. When a campaign reaches fewer people than expected, smart sending is one of the first settings to check."
    ],
    "example": "Suppose a gift shop sends a flash campaign on the same day many customers start checkout. Some of them already received an abandoned cart email that morning, so smart sending skips the campaign for them, and the shop sees a smaller delivered count than the list size suggests.",
    "mistakes": [
      "Turning it off for every message without a reason",
      "Not realizing skipped recipients explain a lower send count",
      "Scheduling many campaigns in one day and expecting full reach"
    ],
    "service": "klaviyo-email-marketing",
    "related": [
      "email-flow-vs-campaign",
      "flow-filter",
      "unsubscribe-rate"
    ]
  },
  {
    "slug": "birthday-and-anniversary-flow",
    "category": "flows",
    "term": "Birthday and anniversary flow",
    "metaTitle": "What Is a Birthday Email Flow? Setup and Mistakes",
    "metaDescription": "A birthday flow sends a message on a date stored in the customer profile. Learn how to collect the date and keep it relevant.",
    "definition": "A birthday or anniversary flow is an automated email sent on a date stored in a customer profile, such as a birthday or the anniversary of a first purchase.",
    "body": [
      "It depends on a date property. You can ask for birthdays at signup or in a preference form, or use the date of a first order for an anniversary message.",
      "It works because the date is personal and the timing is predictable. The message can offer a small gift, thank loyal customers or simply recognise them, depending on the brand.",
      "Data quality is the main issue. Date formats must be stored consistently, and you should only ask for what you will use, since long signup forms reduce completion."
    ],
    "example": "A hypothetical tea company asks for month and day at signup in a short preference form. On each customer's birthday week a warm note arrives with a small gift on their next order, and on the anniversary of their first purchase another message thanks them.",
    "mistakes": [
      "Storing dates in inconsistent formats",
      "Asking for a birthday and never using it",
      "Making the same offer to every customer"
    ],
    "service": "email-flows",
    "related": [
      "welcome-flow",
      "merge-tags",
      "vip-segment"
    ]
  },
  {
    "slug": "utm-tagging",
    "category": "metrics",
    "term": "UTM tagging",
    "metaTitle": "What Is UTM Tagging for Email Campaigns?",
    "metaDescription": "UTM tags add labels to links so analytics can show which email drove a visit. Learn the parameters and how to keep them consistent.",
    "definition": "UTM tagging is adding standard parameters to the links in your emails so web analytics can attribute visits and sales to a specific campaign or flow.",
    "body": [
      "The common parameters are source, medium and campaign, with optional content and term. For email, the source might be the platform name and the medium might be email.",
      "Consistency matters more than detail. If the same campaign is labelled several ways, analytics splits it into separate rows and trends become hard to read. Agree naming rules and stick to them.",
      "Many email platforms add tags automatically, which is convenient, but check that they do not conflict with tags set elsewhere. Without clean tagging, email traffic can be lumped into direct or other channels."
    ],
    "example": "Imagine a hypothetical homeware store that names every spring campaign with the same pattern, including the month and theme. In analytics, it can filter all email visits and compare campaigns side by side without untangling mismatched labels.",
    "mistakes": [
      "Changing naming conventions mid-year",
      "Tagging links in some emails but not others",
      "Mixing upper and lower case in tag values"
    ],
    "service": "klaviyo-email-marketing",
    "related": [
      "attributed-revenue",
      "revenue-per-recipient",
      "holdout-group"
    ]
  },
  {
    "slug": "cohort-analysis",
    "category": "metrics",
    "term": "Cohort analysis",
    "metaTitle": "What Is Cohort Analysis for Ecommerce Email?",
    "metaDescription": "Cohort analysis groups customers by when they joined or first bought and tracks them over time. Learn what it reveals about retention.",
    "definition": "Cohort analysis is grouping customers by a shared starting point, such as the month of their first order, and tracking how each group behaves over time.",
    "body": [
      "It answers questions that blended averages hide. For example, whether customers acquired in one season reorder as often as those acquired in another, or whether a new welcome flow changed repeat purchasing for people who joined after it launched.",
      "Cohorts can be defined by signup month, first purchase month, first product bought or acquisition source. Each is then followed across later months for repeat orders or engagement.",
      "The main caution is sample size. A very small cohort will swing from month to month, so avoid drawing strong conclusions from it."
    ],
    "example": "Imagine a hypothetical skincare store comparing customers whose first purchase was a starter set with those whose first purchase was a single serum. Tracking both groups across later months shows which entry product leads to more reorders, guiding what the welcome flow promotes.",
    "mistakes": [
      "Drawing conclusions from very small cohorts",
      "Mixing different acquisition channels in one cohort",
      "Comparing cohorts of different ages as if equal"
    ],
    "service": "retention-strategy",
    "related": [
      "customer-lifetime-value",
      "holdout-group",
      "rfm-segmentation"
    ]
  },
  {
    "slug": "rfm-segmentation",
    "category": "lists",
    "term": "RFM segmentation",
    "metaTitle": "What Is RFM Segmentation? A Guide for Ecommerce",
    "metaDescription": "RFM segmentation groups customers by recency, frequency and monetary value. Learn how to build and use the segments.",
    "definition": "RFM segmentation groups customers by how recently they bought, how often they buy and how much they spend, so each group can receive a suitable message.",
    "body": [
      "Each customer gets a score on the three dimensions. Combining them creates groups such as champions who buy often and recently, customers at risk who used to buy but have gone quiet, and new customers with a single recent order.",
      "The groups suggest different treatment. Champions might see early access, at-risk customers a reminder of what they liked, and new customers helpful onboarding content.",
      "Keep it simple at first. A handful of well-defined segments that you actually email beats a complex grid you never use."
    ],
    "example": "A hypothetical pet store ranks customers on each of the three dimensions and finds a group that bought several times last year but not recently. That group gets a personal note about new arrivals, while recent first-time buyers receive care tips.",
    "mistakes": [
      "Building too many segments to use",
      "Setting thresholds that ignore the product reorder cycle",
      "Never revisiting scores as the business changes"
    ],
    "service": "retention-strategy",
    "related": [
      "email-segmentation",
      "vip-segment",
      "engagement-segment"
    ]
  },
  {
    "slug": "signup-popup",
    "category": "lists",
    "term": "Signup popup",
    "metaTitle": "What Is a Signup Popup? Best Practice for Stores",
    "metaDescription": "A signup popup is a form that appears on your site to collect email addresses. Learn timing, targeting and what to avoid.",
    "definition": "A signup popup is a form that appears over or beside a web page to invite visitors to join your email list, often in exchange for an offer or content.",
    "body": [
      "Popups work because they ask at a moment of interest. Triggers can be time on page, scroll depth or exit intent, and each should be tested against how it feels on mobile.",
      "Keep the form short. An email address alone is often enough, and further questions can be asked later in a preference flow.",
      "Respect the visitor. Show it once, remember dismissals, and avoid covering content on small screens. Google may treat intrusive overlays on mobile as a poor experience."
    ],
    "example": "A hypothetical tea shop shows a small slide-in after a visitor has scrolled through a product page, instead of a full-screen popup on arrival. The form asks only for an email and promises a short guide to brewing.",
    "mistakes": [
      "Showing a full-screen popup immediately on arrival",
      "Asking for many fields upfront",
      "Reappearing after the visitor has dismissed it"
    ],
    "service": "klaviyo-email-marketing",
    "related": [
      "email-list-growth",
      "lead-magnet",
      "double-opt-in"
    ]
  },
  {
    "slug": "engagement-segment",
    "category": "lists",
    "term": "Engagement segment",
    "metaTitle": "What Is an Engagement Segment in Email Marketing?",
    "metaDescription": "An engagement segment groups subscribers by recent opens and clicks. Learn how to define one and use it to protect deliverability.",
    "definition": "An engagement segment is a group of subscribers defined by how recently they opened, clicked or purchased, used to decide who receives which campaigns.",
    "body": [
      "A common setup is a core group active in a recent window, a wider group active over a longer period, and a lapsing group with no activity beyond that. Windows should reflect how often your customers buy.",
      "Mailing the most engaged people first and most often supports sender reputation, because positive signals outweigh the neutral or negative signals from inactive contacts.",
      "Open data can be unreliable because of privacy features, so combine opens with clicks and site activity when defining engagement."
    ],
    "example": "A hypothetical homeware store keeps a segment of people who clicked or bought in the past ninety days. Big promotions go there first, and a wider group of people active within a longer window receives a smaller number of campaigns.",
    "mistakes": [
      "Relying only on opens",
      "Using one fixed window regardless of the buying cycle",
      "Never reviewing who falls out of the segment"
    ],
    "service": "email-deliverability",
    "related": [
      "sunset-policy",
      "apple-mail-privacy-protection",
      "email-segmentation"
    ]
  },
  {
    "slug": "send-time-optimization",
    "category": "strategy",
    "term": "Send time optimization",
    "metaTitle": "What Is Send Time Optimization in Email?",
    "metaDescription": "Send time optimization picks a sending time per person based on past behaviour. Learn how it works and when it helps.",
    "definition": "Send time optimization is a feature that chooses when to deliver a campaign to each recipient, based on when that person has historically engaged.",
    "body": [
      "Instead of sending everyone at one time, the platform spreads delivery across a window and aims each message at a moment the person tends to open or click. It can help with large lists spanning time zones.",
      "It needs data. Contacts with little history fall back to a default, and results depend on how reliable the engagement data is, which privacy features can distort.",
      "Test it rather than assume it. Compare a campaign sent with the feature against one sent at a fixed time, and bear in mind that time-limited offers may need a single common send time."
    ],
    "example": "A hypothetical bookshop with customers in several time zones tests send time optimization on a newsletter against a standard morning send for a comparable audience. It reviews click behaviour for both and keeps whichever suits that kind of message.",
    "mistakes": [
      "Using it for time-limited offers that need one send time",
      "Assuming it works the same for new contacts",
      "Never testing against a fixed time"
    ],
    "service": "klaviyo-email-marketing",
    "related": [
      "ab-testing",
      "apple-mail-privacy-protection",
      "email-flow-vs-campaign"
    ]
  },
  {
    "slug": "merge-tags",
    "category": "strategy",
    "term": "Merge tags",
    "metaTitle": "What Are Merge Tags in Email? Personalization Basics",
    "metaDescription": "Merge tags insert data such as a first name into an email. Learn how to use them well and avoid awkward blanks.",
    "definition": "Merge tags, also called personalization tags, are placeholders in an email that are replaced with stored data for each recipient, such as a first name or last product viewed.",
    "body": [
      "The email platform replaces each tag when the message is sent. Common examples include first name, order details and a unique code.",
      "They only work as well as the data behind them. If a first name is missing or entered in capitals, the greeting can look awkward, so set a fallback value such as a neutral greeting.",
      "Personalization is more than a name. Referring to the product someone looked at or the order they placed usually matters more to the reader than a name in the subject line."
    ],
    "example": "Imagine a hypothetical skincare brand that uses the first name tag with a fallback word in its greeting. A test send to a profile with no name shows the neutral greeting rather than a blank space, and the team fixes a few profiles stored in capitals.",
    "mistakes": [
      "No fallback value for missing data",
      "Using a name tag in every subject line",
      "Never checking how the data is stored"
    ],
    "service": "email-design",
    "related": [
      "dynamic-content",
      "welcome-flow",
      "email-segmentation"
    ]
  },
  {
    "slug": "subscription-churn",
    "category": "strategy",
    "term": "Subscription churn",
    "metaTitle": "What Is Subscription Churn and How Can Email Help?",
    "metaDescription": "Subscription churn is when customers cancel a recurring order. Learn how email can reduce it with timely, useful messages.",
    "definition": "Subscription churn is the loss of customers who cancel or let a recurring order lapse, and it is the main limit on the value of a subscription business.",
    "body": [
      "Churn can be voluntary, such as someone deciding they no longer need the product, or involuntary, such as a failed card payment. They need different responses.",
      "Email supports both. Reminders before a renewal, shipment notices and tips for using the product keep the value visible, while payment failure messages give customers a clear way to update their details.",
      "Exit information is useful too. Asking why someone cancelled, and offering a pause or a change of frequency instead, can retain customers who simply have too much stock."
    ],
    "example": "Imagine a hypothetical coffee subscription where some customers cancel because they have too much stock. The brand adds a pause and a frequency change option to its cancellation emails, and sends a payment update reminder when a card fails.",
    "mistakes": [
      "Treating all churn as the same problem",
      "Sending payment failure messages late or not at all",
      "Offering only a discount at cancellation"
    ],
    "service": "retention-strategy",
    "related": [
      "replenishment-flow",
      "customer-lifetime-value",
      "winback-flow"
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
