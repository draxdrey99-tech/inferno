/**
 * Email calendar guides for ecommerce. Each page covers one retail moment:
 * when it falls (computed from the rule, never typed by hand, so it cannot
 * drift), a send plan counted back from the day, segment ideas, original
 * subject line ideas and the usual mistakes. General practice only; no
 * statistics and no client results (see scripts/quality-gate.mjs).
 */
export const CALENDAR_REVIEWED = '12 October 2026';
export const CALENDAR_YEARS = [2026, 2027];

export type DateRule =
  | { k: 'fixed'; m: number; d: number }
  /** nth weekday of a month (wd 0 = Sunday). n of -1 means the last one. */
  | { k: 'nth'; m: number; wd: number; n: number }
  /** Days after US Thanksgiving (fourth Thursday of November). */
  | { k: 'thanksgiving'; off: number }
  /** Days after Easter Sunday (negative for before). */
  | { k: 'easter'; off: number }
  /** A window rather than a single day, described in words. */
  | { k: 'season'; text: string };

export type CalendarEvent = {
  slug: string;
  /** The H1, e.g. "Black Friday email calendar". */
  event: string;
  region: 'US' | 'UK' | 'Global';
  season: 'Winter' | 'Spring' | 'Summer' | 'Autumn' | 'Peak season';
  rule: DateRule;
  metaTitle: string;
  /** 160 characters or fewer. */
  metaDescription: string;
  /** A direct answer, quotable as it stands. */
  answer: string;
  why: string[];
  plan: { when: string; action: string }[];
  segments: string[];
  subjectIdeas: string[];
  mistakes: string[];
  /** Event specific checks to run before the send. */
  prep: string[];
  /** Glossary term slugs. */
  terms: string[];
  /** Subject line library slug. */
  library: string;
  /** Service page slug. */
  service: string;
};

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function nth(year: number, m: number, wd: number, n: number) {
  if (n > 0) {
    const first = new Date(Date.UTC(year, m - 1, 1)).getUTCDay();
    return new Date(Date.UTC(year, m - 1, 1 + ((wd - first + 7) % 7) + (n - 1) * 7));
  }
  const last = new Date(Date.UTC(year, m, 0));
  return new Date(Date.UTC(year, m - 1, last.getUTCDate() - ((last.getUTCDay() - wd + 7) % 7)));
}

/** Anonymous Gregorian algorithm for Easter Sunday. */
function easter(year: number) {
  const a = year % 19, b = Math.floor(year / 100), c = year % 100;
  const d = Math.floor(b / 4), e = b % 4, f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day));
}

export function eventDate(rule: DateRule, year: number): Date | null {
  switch (rule.k) {
    case 'fixed': return new Date(Date.UTC(year, rule.m - 1, rule.d));
    case 'nth': return nth(year, rule.m, rule.wd, rule.n);
    case 'thanksgiving': { const t = nth(year, 11, 4, 4); return new Date(t.getTime() + rule.off * 86400000); }
    case 'easter': return new Date(easter(year).getTime() + rule.off * 86400000);
    default: return null;
  }
}

export function formatDate(d: Date) {
  return `${DAYS[d.getUTCDay()]} ${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
}

/** Visible dates for each tracked year, or the written window for a season. */
export function eventDates(e: CalendarEvent): { year: number; label: string }[] {
  if (e.rule.k === 'season') return [{ year: 0, label: e.rule.text }];
  return CALENDAR_YEARS.map((year) => ({ year, label: formatDate(eventDate(e.rule, year)!) }));
}

export const getCalendarEvent = (slug: string) => EVENTS.find((e) => e.slug === slug);

export function calendarSiblings(slug: string) {
  const i = EVENTS.findIndex((e) => e.slug === slug);
  if (i < 0) return [];
  return [1, 2, 3, 4].map((n) => EVENTS[(i + n) % EVENTS.length]).filter((x, k, arr) => x.slug !== slug && arr.findIndex((y) => y.slug === x.slug) === k);
}

const RAW: Omit<CalendarEvent, 'prep'>[] = [
  {
    slug: 'new-year',
    event: 'New Year email calendar',
    region: 'Global',
    season: 'Winter',
    rule: { k: 'fixed', m: 1, d: 1 },
    metaTitle: 'New Year Email Calendar for Ecommerce Brands',
    metaDescription: 'When to send New Year emails for an online store: the send plan, segments to use, subject line ideas and the mistakes that waste the first week of January.',
    answer: 'New Year emails work best as a fresh start message sent on or just after 1 January, built around goals, routines and restocking rather than a heavy discount. Plan the send in December, keep it short, and give people a reason to come back in the first two weeks of the year.',
    why: [
      'Inboxes are full of year end sales by 1 January, so the brands that stand out are the ones that sound calm and useful. People are thinking about habits, tidying, learning and spending less, and your products either fit that story or they do not. Pick one honest angle and commit to it.',
      'It is also the natural moment to reset your own list. Anyone who ignored every December email is a candidate for the sunset flow, which protects your sender reputation going into the new year.',
    ],
    plan: [
      { when: '14 days before', action: 'Choose the one angle: goals, restock, new range or a thank you. Draft the email and a plain text version.' },
      { when: '7 days before', action: 'Build the segments and check that holiday suppressions from December have been lifted.' },
      { when: '1 January, late morning', action: 'Send the main message to engaged subscribers only, not the whole list.' },
      { when: '3 days after', action: 'Send a follow up to openers who did not click, with a single product recommendation.' },
      { when: '10 days after', action: 'Review replies and unsubscribes, then decide who enters the sunset flow.' },
    ],
    segments: [
      'Customers who bought in December, who get a thank you and care guidance instead of a sales push',
      'Subscribers who opened at least one email in the last 90 days, the safest group for a first send of the year',
      'Anyone with a gift card or loyalty balance still unused',
    ],
    subjectIdeas: ['A calmer start to the year', 'What we are doing differently in the new year', 'Your first order of the year, sorted', 'Small habits, better gear'],
    mistakes: [
      'Sending to the full list on 1 January, including people who have not opened since the autumn',
      'Copying a resolution theme that does not match what the products actually do',
      'Leaving December countdown banners or expired codes in the template',
    ],
    terms: ['sunset-policy', 'engagement-segment', 'email-deliverability'],
    library: 'newsletter',
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'january-sales',
    event: 'January sales email calendar',
    region: 'UK',
    season: 'Winter',
    rule: { k: 'season', text: 'From Boxing Day through January, with brands choosing their own start and end' },
    metaTitle: 'January Sales Email Calendar for Online Stores',
    metaDescription: 'How to plan January sale emails: timing against Boxing Day, a send plan, segments by purchase history, subject line ideas and the mistakes that cut margin.',
    answer: 'A January sale needs its own plan separate from Christmas, with a clear start, a clear end and a defined audience. Announce early to your best customers, open to the full list next, and close with a last chance email, so the sale feels like an event instead of a permanent discount.',
    why: [
      'Shoppers expect reductions after the holidays, so the question is how to take part without training your list to wait. A sale that has a reason, such as clearing a season or a stock reset, is easier to defend than one that simply exists.',
      'January is also when budgets are tight and attention is split, so shorter emails and a single clear offer usually serve readers better than a wall of products.',
    ],
    plan: [
      { when: '21 days before', action: 'Decide which products are in the sale and which are excluded, and agree the end date.' },
      { when: '5 days before', action: 'Send an early access email to VIPs and past buyers with the exact start time.' },
      { when: 'Launch day', action: 'Send to the full engaged list, with the best sellers at the top and the end date stated.' },
      { when: 'Mid sale', action: 'Send a reminder to people who clicked but did not buy, showing the items they viewed.' },
      { when: 'Final day', action: 'Send a last chance message in the morning, then switch the banner off the moment it ends.' },
    ],
    segments: [
      'VIP customers for early access',
      'Browse abandoners who looked at sale items in December',
      'Full price buyers from the last six weeks, handled carefully so they do not feel penalised',
    ],
    subjectIdeas: ['The sale starts at nine, you are in early', 'Last pieces from the season', 'Still thinking about it? Two days left', 'Ends tonight, no extensions'],
    mistakes: [
      'Running the sale with no end date and letting it quietly continue into February',
      'Emailing full price December buyers a discount straight after they paid more',
      'Showing sold out sizes in the main email because the catalogue feed was not refreshed',
    ],
    terms: ['vip-segment', 'catalog-feed', 'browse-abandonment-flow'],
    library: 'sale-and-promotion',
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'valentines-day',
    event: "Valentine's Day email calendar",
    region: 'Global',
    season: 'Winter',
    rule: { k: 'fixed', m: 2, d: 14 },
    metaTitle: "Valentine's Day Email Calendar for Ecommerce",
    metaDescription: "Plan Valentine's Day emails for an online store: when to start, the send plan, gift guide segments, subject line ideas and the delivery date mistake to avoid.",
    answer: "Start Valentine's Day emails about three weeks before 14 February, with the gift guide first and the delivery cutoff in every email. Most of the revenue risk is shipping, not copy, so state the last order date clearly and send a final reminder before it passes.",
    why: [
      "Valentine's Day buyers are often shopping for someone else, which means they need help choosing and certainty that the gift will arrive in time. A good gift guide and a visible cutoff do more than clever subject lines.",
      'It is also a day when some of your subscribers would rather not be reminded of it. A short opt out of the theme, linking to the preferences page, is kind and costs very little.',
    ],
    plan: [
      { when: '25 days before', action: 'Confirm stock, shipping cutoffs and the offer, then brief the gift guide and a self gift angle.' },
      { when: '18 days before', action: 'Send the gift guide to the full engaged list.' },
      { when: '10 days before', action: 'Send a second email by price band or recipient, to people who clicked the first.' },
      { when: 'Carrier cutoff day', action: 'Send a last order for delivery by the day email, with the cutoff in the subject line.' },
      { when: 'Day itself', action: 'Send digital gift cards or a last minute option to people who have not bought.' },
    ],
    segments: [
      'Past buyers of gifts or giftable products',
      'Customers who bought the same category last February',
      'Clickers on the gift guide who have not ordered',
    ],
    subjectIdeas: ['Gifts that arrive before the 14th', 'For them, not for the algorithm', 'The last day to order for delivery', 'Left it late? A gift card works too'],
    mistakes: [
      'Promising delivery by the day without checking carrier cutoffs',
      'Using the same heart themed template for everyone, including subscribers who opted out of the theme',
      'Forgetting a self gift angle, which is a real and growing audience',
    ],
    terms: ['email-segmentation', 'dynamic-content', 'cross-sell-email'],
    library: 'sale-and-promotion',
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'international-womens-day',
    event: "International Women's Day email calendar",
    region: 'Global',
    season: 'Spring',
    rule: { k: 'fixed', m: 3, d: 8 },
    metaTitle: "International Women's Day Email Calendar for Brands",
    metaDescription: "How an online store can approach International Women's Day by email: what to say, what to avoid, a send plan, segments and subject line ideas.",
    answer: "International Women's Day is a moment for a genuine message, not a discount. Send one considered email on 8 March if it connects to something your brand actually does, such as who makes the products or where profits go, and stay quiet if it does not.",
    why: [
      'Readers can tell quickly whether a brand has a real connection to the day or is borrowing it for a sale. A short email that tells a true story, features real people and links to something concrete is received better than a pink banner on a promotion.',
      'If your brand has no genuine link, a smaller gesture, such as a note on the site or a donation you have already committed to, may be better than an email at all. Not sending is a valid choice.',
    ],
    plan: [
      { when: '21 days before', action: 'Decide whether there is a real story to tell and who inside the business can speak to it.' },
      { when: '10 days before', action: 'Draft the email with named people and facts you can stand behind, then have it reviewed by someone outside the team.' },
      { when: '2 days before', action: 'Schedule one send for the morning of 8 March, to engaged subscribers only.' },
      { when: 'The day', action: 'Monitor replies and unsubscribes and respond to anyone who writes back personally.' },
      { when: '5 days after', action: 'Follow the story with a normal product email, not another round of the theme.' },
    ],
    segments: [
      'Engaged subscribers, who are most likely to read a longer story',
      'Customers who have previously clicked on founder or brand story content',
      'Wholesale or partner contacts, if the story involves suppliers',
    ],
    subjectIdeas: ['The people who make what you wear', 'A note for 8 March', 'Who we are backing this year', 'Meet the team behind the product'],
    mistakes: [
      'Tying the day to a discount code, which can read as opportunistic',
      'Using stock imagery and slogans that say nothing specific about the business',
      'Making claims about pay or impact that you cannot document',
    ],
    terms: ['engagement-segment', 'email-list-growth', 'spam-complaint-rate'],
    library: 'newsletter',
    service: 'retention-strategy',
  },
  {
    slug: 'easter',
    event: 'Easter email calendar',
    region: 'Global',
    season: 'Spring',
    rule: { k: 'easter', off: 0 },
    metaTitle: 'Easter Email Calendar for Ecommerce Stores',
    metaDescription: 'Plan Easter emails for an online store: how the date moves each year, the send plan, segments, subject line ideas and the bank holiday delivery mistakes.',
    answer: 'Easter moves every year, so build the plan backwards from the date rather than copying last year. Start with a gift or seasonal guide about two to three weeks before, state the bank holiday delivery cutoff clearly, and send one reminder close to the deadline.',
    why: [
      'Because the date changes, last year\'s send dates can be wrong by weeks, and a copied schedule is one of the quietest ways to miss the season. The dates shown above are calculated, so use them rather than a template from an old campaign.',
      'The long weekend also affects delivery, customer service hours and warehouse capacity. Your emails should only promise what the operations side can keep.',
    ],
    plan: [
      { when: '21 days before', action: 'Confirm dates for carrier closures and warehouse cutoffs, then plan the seasonal edit.' },
      { when: '14 days before', action: 'Send the seasonal edit or gift guide to the engaged list.' },
      { when: '7 days before', action: 'Send a reminder with the last order date for delivery before the weekend.' },
      { when: '2 days before', action: 'Send a final short email to people who clicked but did not buy, offering digital options if you have them.' },
      { when: 'The Tuesday after', action: 'Return to normal programming and thank buyers in a post purchase message.' },
    ],
    segments: [
      'Families and gifters, from past purchase categories',
      'Customers who bought in the same season last year',
      'People who have viewed seasonal products in the past 30 days',
    ],
    subjectIdeas: ['Order by Wednesday for the long weekend', 'The Easter edit, in one place', 'Small gifts, big smiles', 'Closing for the bank holiday, one last chance'],
    mistakes: [
      'Reusing last year\'s dates in the schedule',
      'Not mentioning customer service closures over the weekend',
      'Promising delivery windows that carriers have not confirmed',
    ],
    terms: ['email-segmentation', 'catalog-feed', 'post-purchase-flow'],
    library: 'sale-and-promotion',
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'mothers-day-uk',
    event: "Mother's Day (UK) email calendar",
    region: 'UK',
    season: 'Spring',
    rule: { k: 'easter', off: -21 },
    metaTitle: "UK Mother's Day Email Calendar for Online Stores",
    metaDescription: "UK Mother's Day falls three weeks before Easter. See the dates for this year and next, a send plan, segments, subject lines and the opt out courtesy to include.",
    answer: "UK Mother's Day, also called Mothering Sunday, falls on the fourth Sunday of Lent, three weeks before Easter, so it lands in March in most years. Start two to three weeks ahead and include a gentle opt out for readers who would rather skip the day.",
    why: [
      "A common mistake is applying the US date to a UK list. The two countries celebrate on different days, so if you sell to both you need two separate schedules and, ideally, two sends segmented by country.",
      'The day is emotionally mixed for some readers. Giving people an easy way to hear less about it respects them and protects you from complaints.',
    ],
    plan: [
      { when: '21 days before', action: 'Confirm UK delivery cutoffs and choose the gift edit.' },
      { when: '14 days before', action: 'Send the main gift guide to UK subscribers.' },
      { when: '7 days before', action: 'Send a second email focused on products that ship in time, with the cutoff stated.' },
      { when: '3 days before', action: 'Send a last chance email to clickers, with a digital gift card option if offered.' },
      { when: 'Day after', action: 'Stop the theme and send a thank you to buyers.' },
    ],
    segments: [
      'Subscribers with a UK shipping address or locale',
      'Customers who bought gifts in the past year',
      'Clickers on gift products who have not bought',
    ],
    subjectIdeas: ['Order by Thursday for Mothering Sunday', 'Gifts she will actually use', 'A few ideas, and a way to skip this', 'Last post before Sunday'],
    mistakes: [
      'Sending UK subscribers the US date',
      'No opt out for readers who prefer not to receive Mother\'s Day emails',
      'Ignoring Royal Mail and courier cutoffs in the messaging',
    ],
    terms: ['email-segmentation', 'merge-tags', 'spam-complaint-rate'],
    library: 'sale-and-promotion',
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'earth-day',
    event: 'Earth Day email calendar',
    region: 'Global',
    season: 'Spring',
    rule: { k: 'fixed', m: 4, d: 22 },
    metaTitle: 'Earth Day Email Calendar for Ecommerce Brands',
    metaDescription: 'How to send Earth Day emails without greenwashing: a send plan, segments, subject line ideas and the claims to avoid for stores with real sustainability work.',
    answer: 'Send an Earth Day email only if you can show specific, checkable things your business does, and say them plainly. Vague green claims create more risk than value, so lead with what changed, link to the detail and leave the discount out.',
    why: [
      'Readers and regulators are increasingly sceptical of broad environmental claims. An email that says exactly what you did, such as changed packaging or a repair service, is both safer and more persuasive than one that says you care about the planet.',
      'If your sustainability work is thin, do not stretch it. A smaller, honest message about one improvement is better than a campaign that invites criticism.',
    ],
    plan: [
      { when: '21 days before', action: 'List the specific actions you can document and remove anything you cannot back up.' },
      { when: '10 days before', action: 'Draft the email around one story, with a link to the full detail on the site.' },
      { when: '3 days before', action: 'Get the claims checked by whoever is accountable for them.' },
      { when: '22 April, morning', action: 'Send to engaged subscribers, with one clear link.' },
      { when: '7 days after', action: 'Share the results of any action, such as returns or repairs completed, in a short update.' },
    ],
    segments: [
      'Customers who bought products linked to the initiative',
      'Subscribers who have clicked on sustainability content',
      'Repeat customers who may value repair or refill options',
    ],
    subjectIdeas: ['What we changed in our packaging, and why', 'Repair it, do not replace it', 'The full story behind our materials', 'One thing we did this year, in detail'],
    mistakes: [
      'Using words like eco friendly or green with nothing specific behind them',
      'Attaching a sale to the day',
      'Making a claim about carbon or waste without evidence on a page you can link to',
    ],
    terms: ['email-segmentation', 'engagement-segment', 'spam-complaint-rate'],
    library: 'newsletter',
    service: 'retention-strategy',
  },
  {
    slug: 'memorial-day',
    event: 'Memorial Day email calendar',
    region: 'US',
    season: 'Summer',
    rule: { k: 'nth', m: 5, wd: 1, n: -1 },
    metaTitle: 'Memorial Day Email Calendar for US Ecommerce',
    metaDescription: 'Plan Memorial Day weekend emails for a US store: dates for this year and next, a send plan, segments, subject lines and the tone mistakes to avoid.',
    answer: 'Memorial Day falls on the last Monday of May and is a respectful remembrance first, a sales weekend second. Send a three email sequence across the weekend, keep the tone measured, and check that no subject line treats the day lightly.',
    why: [
      'The long weekend is the traditional start of summer, so seasonal products and outdoor categories do well. The danger is tone, because the day honours people who died in service, and celebratory language can land badly.',
      'It is also a good test of your sale discipline. Decide the offer and end date in advance so it does not slide into the next week.',
    ],
    plan: [
      { when: '14 days before', action: 'Choose the offer, the products and the end date, and write copy that keeps the tone respectful.' },
      { when: 'The Thursday before', action: 'Send an early access email to VIPs and past buyers.' },
      { when: 'Saturday morning', action: 'Send the main email to the engaged list.' },
      { when: 'Monday morning', action: 'Send a last day message to clickers who have not bought.' },
      { when: 'Tuesday', action: 'End the sale and switch banners and codes off.' },
    ],
    segments: [
      'VIP customers for early access',
      'Clickers and cart abandoners from the weekend',
      'Customers who bought summer products last year',
    ],
    subjectIdeas: ['Summer starts here, with a weekend offer', 'A long weekend of savings, ending Monday', 'Your cart is waiting, and so is the sun', 'Last day to take part'],
    mistakes: [
      'Using casual or party language about the remembrance itself',
      'Continuing the sale past Monday and teaching customers to wait',
      'Sending to every subscriber three times in three days',
    ],
    terms: ['smart-sending', 'vip-segment', 'abandoned-cart-flow'],
    library: 'sale-and-promotion',
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'mothers-day-us',
    event: "Mother's Day (US) email calendar",
    region: 'US',
    season: 'Spring',
    rule: { k: 'nth', m: 5, wd: 0, n: 2 },
    metaTitle: "US Mother's Day Email Calendar for Online Stores",
    metaDescription: "US Mother's Day is the second Sunday of May. See this year's and next year's dates, a send plan, segments, subject lines and the opt out courtesy to include.",
    answer: "US Mother's Day falls on the second Sunday of May. Start three weeks ahead with a gift guide, send a delivery cutoff reminder about a week before, and include an easy way for readers to hear less about the day.",
    why: [
      "It is one of the biggest gifting moments of the year for many stores, and one of the most carefully watched for shipping. Customers will forgive an average subject line but not a gift that arrives late.",
      "Because the UK celebrates on a different date, tag your list by country so that a UK subscriber does not receive a US schedule. That small piece of hygiene prevents a lot of confusion.",
    ],
    plan: [
      { when: '25 days before', action: 'Confirm stock, cutoffs and the offer, and brief the gift guide.' },
      { when: '18 days before', action: 'Send the main gift guide to US subscribers.' },
      { when: '10 days before', action: 'Send a second email by recipient or price band to people who clicked.' },
      { when: '5 days before', action: 'Send the final delivery cutoff reminder with the date in the subject line.' },
      { when: '2 days before', action: 'Offer digital gift cards or a last minute option to people who have not purchased.' },
    ],
    segments: [
      'Past gift buyers',
      'Customers who bought in the same window last year',
      'Subscribers who are parents and might buy for themselves',
    ],
    subjectIdeas: ['Order by Tuesday for Mother\'s Day delivery', 'Gifts she will keep', 'The last day to ship in time', 'Prefer not to hear about Mother\'s Day? Click here'],
    mistakes: [
      'Not offering an opt out from the theme',
      'Mixing the US and UK dates for international subscribers',
      'Under promising stock and selling out of the hero product halfway through',
    ],
    terms: ['email-segmentation', 'dynamic-content', 'merge-tags'],
    library: 'sale-and-promotion',
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'fathers-day',
    event: "Father's Day email calendar",
    region: 'Global',
    season: 'Summer',
    rule: { k: 'nth', m: 6, wd: 0, n: 3 },
    metaTitle: "Father's Day Email Calendar for Ecommerce Stores",
    metaDescription: "Father's Day is the third Sunday of June in the US and UK. Dates for this year and next, a send plan, segments, subject line ideas and mistakes to avoid.",
    answer: "Father's Day falls on the third Sunday of June in both the US and the UK. Run a two week gift campaign, aim it at the people who buy rather than only at the people who receive, and finish with a clear cutoff for delivery.",
    why: [
      'Gift buyers often start late and want fast, confident choices, so short guides organised by interest or budget tend to help more than a long catalogue. You are shopping on behalf of someone else, so lead with ease.',
      'Because the day touches families in different ways, include a light opt out and avoid assumptions about who your reader is buying for.',
    ],
    plan: [
      { when: '21 days before', action: 'Confirm stock and cutoffs and build the guide in two or three themed groups.' },
      { when: '14 days before', action: 'Send the main guide to the engaged list.' },
      { when: '7 days before', action: 'Send a reminder with delivery cutoffs and a bestsellers block.' },
      { when: '3 days before', action: 'Send a last call to clickers, offering gift cards where available.' },
      { when: 'The Monday after', action: 'Send a thank you or care message to buyers.' },
    ],
    segments: [
      'Past gift buyers',
      'Customers who bought men\'s or outdoor categories',
      'Cart and browse abandoners from the guide',
    ],
    subjectIdeas: ['Gifts for the dad who says he needs nothing', 'Order by Wednesday to get it in time', 'A guide by budget, for the last minute', 'Ship in time, or send a gift card'],
    mistakes: [
      'Assuming the reader is buying for a father, rather than being open to different families',
      'Missing a delivery cutoff because the date was copied from another country',
      'Forgetting a post purchase email after the gift arrives',
    ],
    terms: ['email-segmentation', 'browse-abandonment-flow', 'post-purchase-flow'],
    library: 'sale-and-promotion',
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'independence-day',
    event: 'Fourth of July email calendar',
    region: 'US',
    season: 'Summer',
    rule: { k: 'fixed', m: 7, d: 4 },
    metaTitle: 'Fourth of July Email Calendar for US Ecommerce',
    metaDescription: 'Plan Fourth of July emails for a US store: the send plan, segments, subject line ideas and the shipping cutoff and holiday timing mistakes to avoid.',
    answer: 'Fourth of July email works best as a short, well timed sale or seasonal edit that ends before the holiday itself. Send the main email about a week before, mention the shipping cutoff, and avoid sending on the day, when most people are away from their inbox.',
    why: [
      'The holiday sits in the middle of summer and falls on a different weekday each year, which changes how people shop. When it lands on a weekend or near one, the real sale window may be the days before rather than the day itself.',
      'It is also a common moment for brands to over send. A single email, a reminder and a last call is usually enough for most lists.',
    ],
    plan: [
      { when: '14 days before', action: 'Decide the offer, the end date and any shipping cutoff.' },
      { when: '8 days before', action: 'Send the main email to the engaged list.' },
      { when: '4 days before', action: 'Send a reminder to clickers with the cutoff clearly stated.' },
      { when: '2 days before', action: 'Send a last call, then switch to a quieter schedule.' },
      { when: 'The day after', action: 'End the offer and return to usual sends.' },
    ],
    segments: [
      'Customers who bought outdoor or summer products',
      'Clickers on the first email',
      'Past buyers from the same weekend last year',
    ],
    subjectIdeas: ['Summer weekend, early offer', 'Ships in time for the fourth', 'Two days left to order for the holiday', 'Your cart, before the fireworks'],
    mistakes: [
      'Sending on the holiday itself when open rates drop',
      'Stating a shipping date the carrier will not honour',
      'Letting the offer run for weeks past the date',
    ],
    terms: ['send-time-optimization', 'smart-sending', 'abandoned-cart-flow'],
    library: 'sale-and-promotion',
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'prime-day',
    event: 'Amazon Prime Day email calendar',
    region: 'Global',
    season: 'Summer',
    rule: { k: 'season', text: 'Set by Amazon each year and announced in advance, usually in the summer' },
    metaTitle: 'Prime Day Email Calendar: Counter Programming Guide',
    metaDescription: 'How a Shopify or DTC brand can plan emails around Amazon Prime Day: when to watch for dates, a send plan, segments, subject ideas and the mistakes to avoid.',
    answer: 'You do not need to run a Prime Day sale, but you do need a plan for it. Watch for the announced dates, decide whether to compete, counter programme or stay quiet, and brief your list early so your best customers hear from you before the marketplace does.',
    why: [
      'Amazon announces the dates itself and they change each year, so this page gives you a method instead of a fixed date. Check the announcement and then count back with the plan below.',
      'Shoppers are primed to hunt for deals in that window, which creates room for brands that offer something different, such as service, fit or a small exclusive, rather than matching a marketplace discount line for line.',
    ],
    plan: [
      { when: 'Date announced', action: 'Decide whether to compete, counter programme or hold. Write the decision down.' },
      { when: '10 days before', action: 'Send a heads up to VIPs with your own offer or a clear reason to buy direct.' },
      { when: '2 days before', action: 'Send the main email to the engaged list.' },
      { when: 'During the event', action: 'Send one message, at most, to people who have not opened the last two emails.' },
      { when: '3 days after', action: 'Send a recap and a thank you, and look at the effect on repeat orders.' },
    ],
    segments: [
      'VIP and repeat customers, who are most likely to prefer buying direct',
      'Customers who have previously bought on a marketplace',
      'Subscribers who have clicked on deals but not bought',
    ],
    subjectIdeas: ['Why buying direct is worth it this week', 'Your early look, before the crowds', 'A small offer you will not see elsewhere', 'Thanks for staying with us'],
    mistakes: [
      'Trying to match marketplace prices and eroding margin',
      'Sending too many emails during the event and driving unsubscribes',
      'Not telling VIPs in advance',
    ],
    terms: ['vip-segment', 'smart-sending', 'unsubscribe-rate'],
    library: 'sale-and-promotion',
    service: 'retention-strategy',
  },
  {
    slug: 'back-to-school',
    event: 'Back to school email calendar',
    region: 'Global',
    season: 'Summer',
    rule: { k: 'season', text: 'Late July through early September, with timing that varies by country and school calendar' },
    metaTitle: 'Back to School Email Calendar for Ecommerce Stores',
    metaDescription: 'Plan back to school emails for an online store: timing by region, a send plan, segments for parents and students, subject line ideas and the mistakes to avoid.',
    answer: 'Back to school is a window, not a date, and it starts earlier than many stores expect. Begin with a checklist email in late July, follow with category edits, and finish with a last minute list, timing each send to the school calendar of the region you sell to.',
    why: [
      'School start dates differ by country and often by region, so a single national date can leave half your list behind. Where you have location data, use it. Where you do not, ask in a preference centre.',
      'Parents and students buy differently, and so do teachers. A single email rarely suits all three, so segmenting by who is shopping is worth the extra effort.',
    ],
    plan: [
      { when: '6 weeks before term', action: 'Send a checklist email listing what to buy and when.' },
      { when: '4 weeks before', action: 'Send category edits by age group or product type.' },
      { when: '2 weeks before', action: 'Send reminders with delivery cutoffs by region.' },
      { when: '1 week before', action: 'Send a last minute guide with quick delivery options.' },
      { when: 'After term starts', action: 'Send a post purchase message and a restock reminder for items that run out.' },
    ],
    segments: [
      'Parents who bought for children last year',
      'Students and teachers who buy for themselves',
      'Customers in regions with different term dates',
    ],
    subjectIdeas: ['The back to school checklist', 'Everything for the first week, sorted', 'Ready for term? A last look', 'Running low already? Reorder here'],
    mistakes: [
      'Using one date for every region',
      'Starting too late and missing the planning phase when parents compare options',
      'Ignoring teachers and students as separate audiences',
    ],
    terms: ['email-segmentation', 'merge-tags', 'replenishment-flow'],
    library: 'sale-and-promotion',
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'labor-day',
    event: 'Labor Day email calendar',
    region: 'US',
    season: 'Summer',
    rule: { k: 'nth', m: 9, wd: 1, n: 1 },
    metaTitle: 'Labor Day Email Calendar for US Ecommerce Stores',
    metaDescription: 'Plan Labor Day weekend emails for a US store: the date for this year and next, a send plan, segments, subject lines and the end of summer timing mistakes.',
    answer: 'Labor Day falls on the first Monday of September and marks the end of the summer season for many US shoppers. Use it for an end of season edit, send across the weekend with a firm Monday end, and plan the autumn launch email for the week after.',
    why: [
      'The weekend works well for clearing summer stock and for introducing early autumn lines, but the shared sale environment means plain discounts blur together. A clear reason, such as season end or limited stock, tends to hold attention.',
      'It also sits just before the autumn rush, so use the data from it to size your list for Black Friday and to find who is engaged before the loud period begins.',
    ],
    plan: [
      { when: '12 days before', action: 'Decide what is on offer, what is staying full price and the exact end time.' },
      { when: 'Thursday before', action: 'Send early access to VIPs.' },
      { when: 'Saturday', action: 'Send the main email to the engaged list.' },
      { when: 'Monday morning', action: 'Send a last day reminder to clickers who have not purchased.' },
      { when: 'The Tuesday after', action: 'End the offer and send the first autumn edit.' },
    ],
    segments: [
      'VIPs for early access',
      'Customers who bought summer products',
      'Clickers and abandoners from the weekend',
    ],
    subjectIdeas: ['The last of summer, at its best price', 'Weekend only, ends Monday', 'Your cart is still here', 'Autumn arrives tomorrow'],
    mistakes: [
      'Ending the offer without actually switching the code off',
      'Sending the same email three times in three days',
      'Missing the chance to identify engaged subscribers before Black Friday',
    ],
    terms: ['vip-segment', 'engagement-segment', 'abandoned-cart-flow'],
    library: 'sale-and-promotion',
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'halloween',
    event: 'Halloween email calendar',
    region: 'Global',
    season: 'Autumn',
    rule: { k: 'fixed', m: 10, d: 31 },
    metaTitle: 'Halloween Email Calendar for Ecommerce Stores',
    metaDescription: 'Plan Halloween emails for an online store: the send plan, segments, subject line ideas and the spam trigger and delivery timing mistakes that cost sales.',
    answer: 'Halloween suits playful email, but the offer window is short and shipping is tight. Send the first email about three weeks ahead, state a clear delivery cutoff in every message, and avoid spam trigger words in the subject line that look like tricks.',
    why: [
      'Halloween shoppers often decide late, so costume and decor categories see a sharp final week, while other brands can join in lightly with a themed edit. Choose how far into the theme your products really fit.',
      'Playful subject lines are fine, but heavy punctuation and shouting can harm deliverability, so keep the fun in the words rather than the formatting.',
    ],
    plan: [
      { when: '21 days before', action: 'Confirm stock and plan the theme, whether a gift guide, a costume edit or a quieter seasonal note.' },
      { when: '14 days before', action: 'Send the main email to the engaged list.' },
      { when: '7 days before', action: 'Send a reminder with the delivery cutoff.' },
      { when: '2 days before', action: 'Send a last chance email to clickers.' },
      { when: '1 November', action: 'End the theme and switch to autumn and early holiday planning.' },
    ],
    segments: [
      'Past buyers of seasonal or novelty products',
      'Customers with children, if you capture that data',
      'Engaged subscribers who open playful subject lines',
    ],
    subjectIdeas: ['Treats, no tricks, and it ships in time', 'The last day to order for the 31st', 'Something spooky, something useful', 'Too late for a costume? Not quite'],
    mistakes: [
      'Packing the subject line with symbols and capital letters',
      'Promising delivery past the carrier cutoff',
      'Continuing the theme into November',
    ],
    terms: ['email-deliverability', 'spam-complaint-rate', 'preheader-text'],
    library: 'sale-and-promotion',
    service: 'email-design',
  },
  {
    slug: 'singles-day',
    event: "Singles' Day email calendar",
    region: 'Global',
    season: 'Autumn',
    rule: { k: 'fixed', m: 11, d: 11 },
    metaTitle: "Singles' Day (11.11) Email Calendar for Ecommerce",
    metaDescription: "Plan emails for Singles' Day on 11 November: whether to take part, a send plan, segments, subject line ideas and how it fits before Black Friday.",
    answer: "Singles' Day on 11 November is optional for most Western stores, but it sits two weeks before Black Friday and can work as a warm up. Take part only with a real offer and a clear end, and treat it as a test of your sales machinery before the peak.",
    why: [
      'If you sell to Asian markets or the diaspora, the day is already a major shopping date and your list expects to hear from you. If you do not, it is more of a rehearsal for your peak season.',
      'Either way, it is a chance to check your deliverability, your site speed and your fulfilment before the main weeks, with lower stakes.',
    ],
    plan: [
      { when: '14 days before', action: 'Decide whether to take part and with what offer.' },
      { when: '5 days before', action: 'Send a short teaser to the engaged list.' },
      { when: '11 November, morning', action: 'Send the main email, with the end time stated.' },
      { when: '11 November, evening', action: 'Send a last chance reminder to clickers who have not bought.' },
      { when: 'The day after', action: 'Review results and note changes to make before Black Friday.' },
    ],
    segments: [
      'Customers in markets where the day is established',
      'VIPs who would value early access',
      'Subscribers who responded to earlier sale emails',
    ],
    subjectIdeas: ['11.11: one day, one offer', 'A warm up before the big weekend', 'Ends at midnight, local time', 'Everything we learned from today'],
    mistakes: [
      'Joining in without a reason and confusing the list ahead of Black Friday',
      'Using the day to discount the same lines you plan for Black Friday',
      'Skipping the post event review',
    ],
    terms: ['email-deliverability', 'ip-warming', 'vip-segment'],
    library: 'sale-and-promotion',
    service: 'email-deliverability',
  },
  {
    slug: 'thanksgiving',
    event: 'Thanksgiving email calendar',
    region: 'US',
    season: 'Peak season',
    rule: { k: 'nth', m: 11, wd: 4, n: 4 },
    metaTitle: 'Thanksgiving Email Calendar for US Ecommerce Stores',
    metaDescription: 'Plan Thanksgiving emails for a US store: the fourth Thursday of November, a send plan, segments, subject line ideas and how to avoid burying the peak sale.',
    answer: 'Thanksgiving falls on the fourth Thursday of November and is best used for a thank you rather than a hard sell. Send one warm message that tells customers what is coming, then save the heavy promotion for Black Friday and Cyber Monday.',
    why: [
      'The day itself has low attention for shopping, but the build up is crucial, because it tells subscribers what to expect and when. A good teaser raises open rates on the days that matter.',
      'A gratitude message also stands out among the flood of sale emails and helps you keep trust with people you will email heavily over the next week.',
    ],
    plan: [
      { when: '10 days before', action: 'Send a preview of the sale schedule to VIPs, with a sign up for early access.' },
      { when: '3 days before', action: 'Send a short email to the full list describing what happens on which day.' },
      { when: 'Thanksgiving morning', action: 'Send a simple thank you with no offer, or nothing at all.' },
      { when: 'That evening', action: 'Check that sale pages, codes and inventory are live for Friday.' },
      { when: 'Friday, early', action: 'Start the main Black Friday send.' },
    ],
    segments: [
      'VIPs and repeat customers for the early preview',
      'Customers who joined in the last month and have not purchased',
      'Anyone who signed up for early access',
    ],
    subjectIdeas: ['Thank you, and what happens tomorrow', 'Our schedule for the next four days', 'A quiet note before the busy weekend', 'You asked for early access, it opens at midnight'],
    mistakes: [
      'Sending the hardest sale on the day itself',
      'Failing to confirm that sale pages and codes work before the weekend',
      'Leaving subscribers unsure which email will have the real offer',
    ],
    terms: ['vip-segment', 'smart-sending', 'ip-warming'],
    library: 'sale-and-promotion',
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'black-friday',
    event: 'Black Friday email calendar',
    region: 'Global',
    season: 'Peak season',
    rule: { k: 'thanksgiving', off: 1 },
    metaTitle: 'Black Friday Email Calendar for Ecommerce: Send Plan',
    metaDescription: 'A Black Friday email plan for online stores: dates for this year and next, what to send each day, segments, subject line ideas and the deliverability mistakes.',
    answer: 'Black Friday is the day after US Thanksgiving, and the winning email plan starts weeks earlier. Warm your list in October, give VIPs early access, send the main offer on the day, and manage frequency so the rest of the season does not suffer for it.',
    why: [
      'Volume is the main risk. Sending far more than usual to a list that is used to a weekly cadence can hurt inbox placement, so warm up gradually and send most heavily to your most engaged subscribers first.',
      'The brands that do well tend to have decided their offer, their stock and their schedule in September, leaving the final weeks for execution rather than debate.',
    ],
    plan: [
      { when: '8 weeks before', action: 'Fix the offer, the stock plan and the schedule. Start warming volume with engaged segments.' },
      { when: '3 weeks before', action: 'Build a waitlist for early access and tell people when it opens.' },
      { when: '5 days before', action: 'Send the preview to VIPs and waitlist members.' },
      { when: 'Black Friday, early', action: 'Send the main offer to the engaged list and a second, later message to openers who did not click.' },
      { when: 'Black Friday, evening', action: 'Send a last chance to carts and clickers, then pause the less engaged groups.' },
    ],
    segments: [
      'The waitlist and VIPs, for early access',
      'Cart and browse abandoners from the last 30 days',
      'Highly engaged subscribers first, then the wider list in stages',
    ],
    subjectIdeas: ['It starts now, your early access link', 'The offer is live, and so is your size', 'Last few hours, ends at midnight', 'Everything we have left, in one place'],
    mistakes: [
      'Sending the full list at maximum volume with no warm up',
      'Discounting everything and leaving nothing for Cyber Monday',
      'Not checking that codes and inventory sync before the first send',
    ],
    terms: ['ip-warming', 'engagement-segment', 'sender-reputation'],
    library: 'sale-and-promotion',
    service: 'email-deliverability',
  },
  {
    slug: 'small-business-saturday',
    event: 'Small Business Saturday email calendar',
    region: 'US',
    season: 'Peak season',
    rule: { k: 'thanksgiving', off: 2 },
    metaTitle: 'Small Business Saturday Email Calendar for Stores',
    metaDescription: 'Plan Small Business Saturday emails: the date this year and next, who it suits, a send plan, segments, subject line ideas and the mistakes to avoid.',
    answer: 'Small Business Saturday falls on the Saturday after US Thanksgiving and suits independent brands with a real story. Send one personal email in the morning that tells customers who you are, what you make and why buying direct helps, and keep the offer modest.',
    why: [
      'The day exists to point shoppers at independent businesses, so the message that works is a human one. Show the people, the place or the process, and let the story do the work.',
      'If you are a large brand it is better to skip the day than to claim a status that does not fit.',
    ],
    plan: [
      { when: '10 days before', action: 'Choose the story and gather real photos from your team and workplace.' },
      { when: '3 days before', action: 'Draft and review the email so it reads like a person wrote it.' },
      { when: 'Saturday morning', action: 'Send to the engaged list, with a modest offer or a gift with purchase.' },
      { when: 'Saturday afternoon', action: 'Reply personally to messages that come in.' },
      { when: 'Sunday', action: 'Thank buyers and switch to the Cyber Monday plan.' },
    ],
    segments: [
      'Loyal customers who have bought more than once',
      'Subscribers who have clicked on brand story content',
      'Local customers, if you have a physical presence',
    ],
    subjectIdeas: ['Made by a small team, for you', 'A thank you from the people behind the brand', 'Why buying direct matters to us', 'Saturday at the studio'],
    mistakes: [
      'Claiming small business status when the business is large',
      'Using a heavy discount that undercuts the story',
      'Sending a templated email with no personal voice',
    ],
    terms: ['vip-segment', 'engagement-segment', 'customer-lifetime-value'],
    library: 'newsletter',
    service: 'retention-strategy',
  },
  {
    slug: 'cyber-monday',
    event: 'Cyber Monday email calendar',
    region: 'Global',
    season: 'Peak season',
    rule: { k: 'thanksgiving', off: 4 },
    metaTitle: 'Cyber Monday Email Calendar for Ecommerce Stores',
    metaDescription: 'A Cyber Monday email plan for online stores: dates for this year and next, what to send, segments to use, subject line ideas and the fatigue mistakes to avoid.',
    answer: 'Cyber Monday is the Monday after US Thanksgiving and works best as a distinct second act to Black Friday. Offer something different, such as bundles, tech or late arrivals, and use it to reach people who watched but did not buy over the weekend.',
    why: [
      'By Monday, subscribers have seen a stack of offers, so repeating the Friday email wastes an opportunity. The segment that matters most is the one that clicked, browsed or carted but has not purchased.',
      'It is also the moment when list fatigue shows. Send less to people who ignored the weekend, and give your engaged subscribers a reason to open one more time.',
    ],
    plan: [
      { when: 'The Sunday before', action: 'Send a short preview to clickers, saying what makes Monday different.' },
      { when: 'Monday morning', action: 'Send the main email to those who engaged over the weekend.' },
      { when: 'Monday midday', action: 'Send a reminder to carts and viewers with the items they looked at.' },
      { when: 'Monday evening', action: 'Send a last call to openers who did not click.' },
      { when: 'Tuesday', action: 'Suppress sale emails to everyone who bought and let post purchase flows take over.' },
    ],
    segments: [
      'Weekend clickers who did not buy',
      'Cart abandoners from the last four days',
      'Customers who bought in the last week, who should be excluded from sale reminders',
    ],
    subjectIdeas: ['One more day, a different offer', 'Still deciding? Here is what is left', 'The items you looked at, still here', 'Ends tonight, this is the last email'],
    mistakes: [
      'Repeating Friday\'s email unchanged',
      'Emailing recent buyers a sale reminder for what they just bought',
      'Ignoring non openers and driving up complaints',
    ],
    terms: ['abandoned-cart-flow', 'browse-abandonment-flow', 'smart-sending'],
    library: 'sale-and-promotion',
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'giving-tuesday',
    event: 'Giving Tuesday email calendar',
    region: 'Global',
    season: 'Peak season',
    rule: { k: 'thanksgiving', off: 5 },
    metaTitle: 'Giving Tuesday Email Calendar for Ecommerce Brands',
    metaDescription: 'How an online store can approach Giving Tuesday by email: whether to take part, a send plan, segments, subject lines and the claims and consent pitfalls.',
    answer: 'Giving Tuesday is the Tuesday after US Thanksgiving, and it only works for brands that give something real. If you donate, say exactly how much and to whom, make the commitment before you email, and keep the message about the cause rather than the sale.',
    why: [
      'After several days of sales, a message about giving can be a welcome change, but only if it is credible. Vague promises to give back are less convincing than a specific partner, amount or action.',
      'It also carries legal considerations in some regions, so claims about donations should be accurate, documented and honoured.',
    ],
    plan: [
      { when: '3 weeks before', action: 'Agree the commitment, the partner and the wording of the claim.' },
      { when: '1 week before', action: 'Confirm the arrangement in writing and prepare the email.' },
      { when: 'Tuesday morning', action: 'Send to engaged subscribers with a single, clear call.' },
      { when: 'Tuesday afternoon', action: 'Share a live progress update on the site or social channels.' },
      { when: 'Within 2 weeks', action: 'Send the result and confirm the donation was made.' },
    ],
    segments: [
      'Customers who have engaged with cause related content',
      'Loyal customers who might prefer to give rather than shop',
      'Past donors if you have run a campaign before',
    ],
    subjectIdeas: ['What we are giving, and to whom', 'Today is not a sale', 'Join us in supporting one cause', 'The results of last year, and what is next'],
    mistakes: [
      'Making a donation claim before the arrangement is in place',
      'Mixing a giving message with a discount code',
      'Failing to report the result',
    ],
    terms: ['engagement-segment', 'email-segmentation', 'spam-complaint-rate'],
    library: 'newsletter',
    service: 'retention-strategy',
  },
  {
    slug: 'green-monday',
    event: 'Green Monday email calendar',
    region: 'US',
    season: 'Peak season',
    rule: { k: 'nth', m: 12, wd: 1, n: 2 },
    metaTitle: 'Green Monday Email Calendar for Ecommerce Stores',
    metaDescription: 'Plan Green Monday emails for an online store: the date this year and next, a send plan, segments for late shoppers, subject lines and the cutoff mistakes.',
    answer: 'Green Monday is the second Monday of December and is aimed at shoppers who are still buying for the holidays. Send a focused offer with a clear delivery cutoff, aimed at people who did not buy during Black Friday and Cyber Monday.',
    why: [
      'By this point, subscribers are tired of deals and focused on delivery dates. A useful email is one that tells them what will still arrive before the holiday and makes the choice easy.',
      'It is also your first read on how the peak went, so use the data to choose who receives the remaining emails of the season.',
    ],
    plan: [
      { when: '10 days before', action: 'Confirm cutoffs and inventory, and choose a focused offer or edit.' },
      { when: '2 days before', action: 'Send a short preview to non buyers from Black Friday.' },
      { when: 'Monday morning', action: 'Send the main email with the cutoff in the subject line.' },
      { when: 'Monday evening', action: 'Send a last call to those who clicked.' },
      { when: 'The following week', action: 'Move into the shipping cutoff sequence for the final weeks.' },
    ],
    segments: [
      'Non buyers from Black Friday and Cyber Monday',
      'Customers who are buying gifts',
      'Cart abandoners from the last two weeks',
    ],
    subjectIdeas: ['Order today, it will be there in time', 'Still shopping? Start here', 'The gifts that ship fast', 'The cutoff is closer than you think'],
    mistakes: [
      'Skipping the delivery cutoff in the subject line',
      'Sending to people who just bought',
      'Offering a discount deeper than Black Friday, which punishes earlier buyers',
    ],
    terms: ['abandoned-cart-flow', 'email-segmentation', 'smart-sending'],
    library: 'sale-and-promotion',
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'christmas-shipping-cutoffs',
    event: 'Christmas shipping cutoff email calendar',
    region: 'Global',
    season: 'Peak season',
    rule: { k: 'season', text: 'Early to mid December, set by your carrier and shipping method' },
    metaTitle: 'Christmas Shipping Cutoff Emails: Calendar and Plan',
    metaDescription: 'How to email Christmas shipping cutoffs: when to send, a plan by carrier deadline, segments, subject line ideas and the date mistakes to avoid.',
    answer: 'Shipping cutoff emails should go out in a series that counts down from your carrier deadlines, not on one date. Send one per deadline, name the exact day and time, and update the message the moment a carrier changes its guidance.',
    why: [
      'Customers rarely remember to check delivery dates, so a clear reminder reduces both lost sales and support tickets. The email is useful, not salesy, which is why it often performs well.',
      'Deadlines differ by method and by country, so segment by region and shipping option rather than sending one global message.',
    ],
    plan: [
      { when: 'Late November', action: 'Collect the cutoff dates from each carrier and shipping method.' },
      { when: '10 days before first cutoff', action: 'Send an early notice with the full set of dates.' },
      { when: '3 days before each cutoff', action: 'Send a reminder to the relevant region.' },
      { when: 'The day of each cutoff', action: 'Send a final message in the morning, with the exact time.' },
      { when: 'After the last cutoff', action: 'Switch to digital gift cards and pickup options if you offer them.' },
    ],
    segments: [
      'Subscribers by country or shipping zone',
      'Cart abandoners holding gift items',
      'Customers who bought gifts last December',
    ],
    subjectIdeas: ['Order by Friday to get it before Christmas', 'The last day for standard delivery', 'Express still works until Monday', 'Too late to ship? Send a gift card'],
    mistakes: [
      'Using one global cutoff for different carriers',
      'Not updating the email when a carrier changes dates',
      'Stating a day without a time',
    ],
    terms: ['email-segmentation', 'dynamic-content', 'abandoned-cart-flow'],
    library: 'sale-and-promotion',
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'christmas',
    event: 'Christmas email calendar',
    region: 'Global',
    season: 'Peak season',
    rule: { k: 'fixed', m: 12, d: 25 },
    metaTitle: 'Christmas Email Calendar for Ecommerce Stores',
    metaDescription: 'A Christmas email plan for online stores: the key dates, a send plan from November, segments, subject line ideas and the volume mistakes that hurt January.',
    answer: 'Christmas email is a sequence, not a single send. Plan the gift guide in November, send cutoff reminders in December, and end with a short thank you on or just before the day, then give your list a rest so January starts with a healthy sender reputation.',
    why: [
      'The long run of sales from Black Friday leaves many lists tired. Christmas email works best when it is useful, such as gift ideas, delivery dates and sizing help, rather than another discount.',
      'It is also a good moment to thank customers. A short note on the 24th or 25th, with no sell, tends to be remembered.',
    ],
    plan: [
      { when: 'Mid November', action: 'Send the gift guide to the engaged list.' },
      { when: 'Early December', action: 'Send gifts by budget or recipient, and begin the cutoff series.' },
      { when: 'Mid December', action: 'Send the final order dates and highlight digital gifts.' },
      { when: '23 and 24 December', action: 'Send a last minute email only to those who have shown intent.' },
      { when: '25 December', action: 'Send a thank you with no offer, then pause promotions until after Boxing Day.' },
    ],
    segments: [
      'Past gift buyers',
      'Cart and browse abandoners',
      'Customers who bought in the last quarter and can be thanked',
    ],
    subjectIdeas: ['Thank you for this year', 'Last orders, and last ideas', 'A small gift in a box, still possible', 'Wishing you a quiet few days'],
    mistakes: [
      'Overloading the list through December and damaging January engagement',
      'Using the same email for different delivery regions',
      'Leaving promotional banners live on the day',
    ],
    terms: ['sender-reputation', 'engagement-segment', 'sunset-policy'],
    library: 'sale-and-promotion',
    service: 'retention-strategy',
  },
  {
    slug: 'boxing-day',
    event: 'Boxing Day email calendar',
    region: 'UK',
    season: 'Winter',
    rule: { k: 'fixed', m: 12, d: 26 },
    metaTitle: 'Boxing Day Email Calendar for Ecommerce Stores',
    metaDescription: 'Plan Boxing Day sale emails for an online store: the date, a send plan, segments, subject line ideas and the mistakes that cost margin in the new year.',
    answer: 'Boxing Day, 26 December, is the traditional start of the post Christmas sales in the UK and parts of the Commonwealth. Send an early access email on Christmas evening, the main email on the morning, and a last chance before the sale rolls into January.',
    why: [
      'Shoppers expect reductions, so the decision is how far to go and for how long. A defined sale with a firm end protects margin and keeps the January plan separate.',
      'Because the day follows a busy period, shorter emails with a single clear offer are easier to read on a phone, which is where most opens happen.',
    ],
    plan: [
      { when: '7 days before', action: 'Decide the offer, the product list and the end date.' },
      { when: 'Christmas evening', action: 'Send an early access email to VIPs and recent gift buyers.' },
      { when: '26 December, morning', action: 'Send the main email to the engaged list.' },
      { when: '28 December', action: 'Send a reminder to clickers who have not bought.' },
      { when: 'Final day', action: 'Send a last chance email and end the sale on time.' },
    ],
    segments: [
      'VIPs for early access',
      'Customers who browsed but did not buy before Christmas',
      'People who received gift cards, if you can identify them',
    ],
    subjectIdeas: ['Early access, before the sale opens', 'The sale starts now, here is the best of it', 'Still here, but not for long', 'Last day, this really is the end'],
    mistakes: [
      'Letting the sale drift into January with no plan',
      'Emailing recent full price buyers a discount straight after Christmas',
      'Not refreshing the catalogue feed after stock changes',
    ],
    terms: ['vip-segment', 'catalog-feed', 'browse-abandonment-flow'],
    library: 'sale-and-promotion',
    service: 'klaviyo-email-marketing',
  },
];

const PREP: Record<string, string[]> = {
  'new-year': [
    'Lift any December sending suppressions and holiday banners from the templates.',
    'Check that expired December codes now show a clear message instead of an error.',
    'Confirm the unsubscribe link and sender address are correct after the break.',
    'Send yourself a test on mobile and in dark mode before scheduling.',
    'Note which subscribers have not opened since September for the sunset flow.',
  ],
  'january-sales': [
    'Confirm the end date is in the email, the banner and the discount rule itself.',
    'List excluded products in plain words so support is not surprised by questions.',
    'Check that sale prices appear in the catalogue feed before dynamic blocks go live.',
    'Set up a reminder to switch banners off on the last day.',
    'Review returns terms for sale items and mention them if they differ.',
  ],
  'valentines-day': [
    'Pull the real last order dates from each carrier and write them into every email.',
    'Check that gift wrap, notes and gift card options work at checkout.',
    'Tag subscribers who opted out of themed emails and exclude them.',
    'Test the gift guide links on a phone, since many gift shoppers browse there.',
    'Make sure stock for the hero products can cover a spike.',
  ],
  'international-womens-day': [
    'Have someone outside the marketing team read the draft for tone and accuracy.',
    'Collect written permission from anyone named or pictured.',
    'Check every claim about pay, sourcing or donations against a document you hold.',
    'Decide who will answer replies, and brief them before the send.',
    'Leave the discount code out and check that no automated banner adds one.',
  ],
  'easter': [
    'Confirm carrier and warehouse closure days over the long weekend.',
    'Recalculate every date for this year instead of copying last year\'s schedule.',
    'Tell customer service which days they are covered and which they are not.',
    'Check that seasonal products are tagged so the catalogue block picks them up.',
    'Plan a plain return to normal content for the Tuesday after.',
  ],
  'mothers-day-uk': [
    'Confirm the date for this year, since it moves with Easter.',
    'Filter the send to UK addresses, and keep US subscribers on their own schedule.',
    'Check Royal Mail and courier cutoffs and print them in the email.',
    'Add a link to the preferences page for readers who prefer not to receive the theme.',
    'Test the gift guide on mobile before scheduling.',
  ],
  'earth-day': [
    'List each claim and the document that proves it, and remove any you cannot support.',
    'Check the page you link to loads quickly and contains the full detail.',
    'Avoid broad terms such as green or eco friendly unless they are defined on that page.',
    'Confirm no automated promotion fires on the same day.',
    'Ask the person responsible for sustainability to approve the final copy.',
  ],
  'memorial-day': [
    'Read every subject line aloud and remove anything that treats the day lightly.',
    'Set the discount to end on Monday night and test that it does.',
    'Confirm carrier closures for the long weekend and mention them.',
    'Cap sends so no subscriber receives more than the planned three.',
    'Prepare an end of season message for the Tuesday after.',
  ],
  'mothers-day-us': [
    'Confirm the date for this year, since it is the second Sunday of May.',
    'Keep UK subscribers off this schedule, because their date is different.',
    'Print the last order date for each shipping method in every email.',
    'Add a link for readers who would rather skip the theme.',
    'Check that the hero product has enough stock for the final week.',
  ],
  'fathers-day': [
    'Confirm that your list is split by country if you sell outside the US and UK.',
    'Build the guide in two or three clear groups so choices are quick.',
    'Print carrier cutoffs and test them against a real order.',
    'Keep the language open about who the reader is buying for.',
    'Plan a care or review email for people who buy a gift.',
  ],
  'independence-day': [
    'Check which weekday the holiday lands on and plan the last order date from that.',
    'Confirm carrier closures on the day and the Friday or Monday around it.',
    'Schedule sends before the holiday rather than on it.',
    'Set the offer to end on a fixed date and confirm the code expires.',
    'Cap frequency so no one receives more than three emails in the run.',
  ],
  'prime-day': [
    'Check Amazon\'s announcement for the dates, and note when they were published.',
    'Decide in writing whether you will compete, counter programme or hold.',
    'Prepare a direct buying reason, such as service, fit or exclusivity.',
    'Check that your site can handle a spike if you plan a sale.',
    'Prepare a thank you email for repeat customers whatever you decide.',
  ],
  'back-to-school': [
    'Find the term start dates for your top regions and write them down.',
    'Add a country or region field so you can time sends by area.',
    'Plan separate messages for parents, students and teachers.',
    'Check that school related products are tagged for the catalogue block.',
    'Prepare a replenishment reminder for items that run out in term.',
  ],
  'labor-day': [
    'Confirm that the holiday falls on the first Monday of September for this year.',
    'Set a hard end time and test that the discount expires.',
    'Tag clickers during the weekend so you can see who is warming up for Black Friday.',
    'Check carrier closures on the Monday and mention them.',
    'Plan the first autumn email for the following week.',
  ],
  'halloween': [
    'Check subject lines for symbols and capital letters that can look like spam.',
    'Print a delivery cutoff that matches your slowest shipping method.',
    'Confirm that seasonal products show in the right order in the catalogue feed.',
    'Test the email in dark mode, since themed designs often break there.',
    'Plan to stop the theme on 1 November.',
  ],
  'singles-day': [
    'Decide whether the day is a real event for your customers or a rehearsal.',
    'Check site speed and checkout with a test order before the send.',
    'Confirm that deliverability metrics are healthy before increasing volume.',
    'Write down what you want to learn, so the review has a purpose.',
    'Make sure the offer does not clash with the Black Friday plan.',
  ],
  'thanksgiving': [
    'Confirm that sale pages, codes and inventory are live for the next morning.',
    'Segment early access members and double check their link works.',
    'Write the schedule in plain words so readers know what comes when.',
    'Cap the day\'s sends so the real offer is not buried.',
    'Prepare the Friday morning send and queue it ahead of time.',
  ],
  'black-friday': [
    'Warm volume gradually in the weeks before, starting with engaged subscribers.',
    'Run a test order with the real code through checkout on mobile.',
    'Check authentication records and that your sending domain is healthy.',
    'Prepare second send variants for openers who did not click.',
    'Agree who monitors inbox placement and replies on the day.',
  ],
  'small-business-saturday': [
    'Collect real photos and a short story from the team before drafting.',
    'Confirm the business genuinely fits the independent label.',
    'Decide a modest offer or gift that suits the story.',
    'Have a named person ready to reply to messages that come in.',
    'Plan the Cyber Monday message for the day after.',
  ],
  'cyber-monday': [
    'Build a segment of weekend clickers who have not bought.',
    'Exclude anyone who bought in the last 48 hours from sale reminders.',
    'Prepare a different offer or angle from Friday\'s email.',
    'Check that stock levels in the feed match your actual inventory.',
    'Schedule the evening last call with the end time in the subject line.',
  ],
  'giving-tuesday': [
    'Put the donation agreement in writing before the email is drafted.',
    'Decide how and when you will report the result.',
    'Check that the cause or partner agrees to be named.',
    'Keep any discount codes out of the email and off the landing page.',
    'Prepare the follow up email in advance so it is not forgotten.',
  ],
  'green-monday': [
    'Confirm the cutoff for each shipping method and the exact times.',
    'Build a segment of Black Friday non buyers and exclude recent buyers.',
    'Check that the offer does not undercut what earlier buyers paid.',
    'Prepare the cutoff sequence that follows this send.',
    'Review the peak data to decide who stays on the list for the final weeks.',
  ],
  'christmas-shipping-cutoffs': [
    'Collect every cutoff from each carrier and write the date and time for each method.',
    'Create a region field or segment so each country gets its own deadline.',
    'Set a reminder to review carrier updates each morning in December.',
    'Build one template with dynamic dates so each send is a quick edit.',
    'Prepare a digital gift card option for after the last cutoff.',
  ],
  'christmas': [
    'Plan a send calendar for the whole of December and cap the total per person.',
    'Check that gift receipts and returns terms are described clearly.',
    'Remove any urgent banners from templates on the 24th and 25th.',
    'Confirm customer service hours and put them in the footer.',
    'Prepare a quiet thank you message that carries no offer.',
  ],
  'boxing-day': [
    'Set the sale end date and test that the code expires.',
    'Refresh the catalogue feed after Christmas Eve stock changes.',
    'Identify full price December buyers and keep them out of the sale send.',
    'Prepare a mobile first design, since many opens happen on phones.',
    'Confirm customer service coverage during the sale.',
  ],
};

export const EVENTS: CalendarEvent[] = RAW.map((e) => ({ ...e, prep: PREP[e.slug] }));
