/**
 * Email marketing glossary. One short page per term, because people search
 * for these one at a time and a page that answers exactly one question is
 * the most useful thing to land on. Definitions are general industry
 * knowledge, not claims about Inferno Emails. `service` links each term to
 * the commercial page it belongs to.
 */
export type Term = {
  slug: string;
  term: string;
  metaTitle: string;
  metaDescription: string;
  /** One-sentence definition, written to be quoted as it stands. */
  definition: string;
  body: string[];
  mistakes: string[];
  service: string;
  related: string[];
};

export const GLOSSARY: Term[] = [
  {
    slug: 'spf-dkim-dmarc',
    term: 'SPF, DKIM and DMARC',
    metaTitle: 'SPF, DKIM and DMARC Explained for Store Owners',
    metaDescription: 'What SPF, DKIM and DMARC are, why Gmail and Outlook check them, and what an ecommerce store needs to set up so email reaches the inbox.',
    definition: 'SPF, DKIM and DMARC are three DNS records that prove an email really came from your domain, which mailbox providers like Gmail and Outlook check before deciding where to deliver it.',
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
    term: 'Email deliverability',
    metaTitle: 'What Is Email Deliverability? A Plain Explanation',
    metaDescription: 'Email deliverability is whether your emails reach the inbox instead of spam. Learn what affects it and what an ecommerce store can do about it.',
    definition: 'Email deliverability is the likelihood that an email you send reaches the recipient’s inbox rather than the spam folder or being blocked.',
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
    term: 'Sender reputation',
    metaTitle: 'What Is Sender Reputation in Email Marketing?',
    metaDescription: 'Sender reputation is the score mailbox providers give your domain and sending IP. Learn how it is built, how it is lost and how to protect it.',
    definition: 'Sender reputation is the trust mailbox providers assign to your sending domain and IP address based on how recipients and receivers have treated your past email.',
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
    term: 'Welcome flow',
    metaTitle: 'What Is a Welcome Flow? Email Sequence Explained',
    metaDescription: 'A welcome flow is the automated email series sent when someone joins your list. Learn what it should include and how long it should be.',
    definition: 'A welcome flow is an automated series of emails sent to a new subscriber, introducing the brand and guiding them to a first purchase.',
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
    term: 'Abandoned cart flow',
    metaTitle: 'What Is an Abandoned Cart Email Flow?',
    metaDescription: 'An abandoned cart flow is the automated series sent to shoppers who left items in their cart. Learn how it works and common mistakes.',
    definition: 'An abandoned cart flow is an automated email sequence sent to a shopper who added items to their cart but did not complete checkout.',
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
    term: 'Winback flow',
    metaTitle: 'What Is a Winback Email Flow?',
    metaDescription: 'A winback flow re-engages customers who have stopped buying. Learn when to send it, what to say and when to stop mailing.',
    definition: 'A winback flow is an automated email sequence aimed at past customers who have not purchased for longer than their usual reorder window.',
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
    term: 'Email segmentation',
    metaTitle: 'What Is Email Segmentation? A Plain Guide',
    metaDescription: 'Email segmentation means sending different emails to different groups. Learn the segments that matter most for an ecommerce store.',
    definition: 'Email segmentation is dividing your list into groups based on behaviour, purchase history or engagement so each group gets a relevant message.',
    body: [
      'The most useful segments for ecommerce are engagement (active, lapsing, inactive), purchase history (new, repeat, high-value) and interest (what they browsed or bought).',
      'Segmenting lifts relevance and protects deliverability, because inactive contacts stop dragging your engagement down.',
    ],
    mistakes: ['Sending every campaign to the whole list', 'Building segments you never use', 'Treating a first-time and a ten-time buyer the same'],
    service: 'klaviyo-email-marketing',
    related: ['winback-flow', 'email-deliverability'],
  },
];

export const getTerm = (slug: string) => GLOSSARY.find((t) => t.slug === slug);
