/**
 * Buyer guides for brands deciding whether and how to hire an email or
 * Klaviyo agency. These are the commercial-intent pages: the reader is
 * choosing a supplier. General practice only; no prices, no statistics and
 * no client results (see scripts/quality-gate.mjs).
 */
export type HiringGuide = {
  slug: string;
  /** The H1. */
  title: string;
  metaTitle: string;
  /** 160 characters or fewer. */
  metaDescription: string;
  /** A direct answer, quotable as it stands. */
  answer: string;
  sections: { heading: string; body: string[] }[];
  checklist: string[];
  mistakes: string[];
  /** A short worked example that makes the advice concrete. */
  scenario: string;
  faqs: { q: string; a: string }[];
  /** Glossary term slugs. */
  terms: string[];
  /** Service page slug. */
  service: string;
};

export const HIRING_GUIDES: HiringGuide[] = [
  {
    slug: 'how-to-choose-a-klaviyo-agency',
    title: 'How to choose a Klaviyo agency',
    metaTitle: 'How to Choose a Klaviyo Agency for an Ecommerce Store',
    metaDescription: 'A practical way to choose a Klaviyo agency: what to look for in proof, process and people, the questions that matter and the signs of a poor fit.',
    answer: 'Choose a Klaviyo agency by looking for evidence of work like yours, a clear process you can describe back, and people who will actually run your account. Ask to see real flows and the reasoning behind them, and be wary of anyone who promises a revenue number before they have seen your data.',
    sections: [
      {
        heading: 'Start with proof that fits your store',
        body: [
          'Look for examples in a similar category, with a similar order value and repurchase pattern. A beauty brand with a thirty day reorder cycle needs different flows from a furniture store that sells once every few years, and an agency that has only done one of those will bring habits that do not transfer.',
          'Ask for the work itself, not a logo wall. A good agency can show you a flow, explain the trigger, the timing and why each email exists. If the explanation is vague, the work probably was too.',
        ],
      },
      {
        heading: 'Check the process, not the pitch',
        body: [
          'A reliable agency can describe what happens in the first two weeks, who you speak to, how approvals work and how changes are tested. You should be able to repeat that process back to a colleague after one call.',
          'Ask how they decide what to build first. The honest answer is usually an audit of what exists, ranked by likely impact, rather than a fixed package of twelve flows.',
        ],
      },
      {
        heading: 'Meet the people who will do the work',
        body: [
          'Many agencies sell with senior people and hand the account to someone junior. That is not always bad, but you should know who will build your emails, who will review them and who you can escalate to.',
          'Ask what happens if your account manager leaves. A good answer involves documentation and a second person who already knows your account.',
        ],
      },
      {
        heading: 'Look at how they talk about results',
        body: [
          'Results depend on your product, your list and your offer, so an agency that guarantees a number before an audit is guessing. Prefer an agency that explains what they will measure, how they will separate email revenue from sales that would have happened anyway, and when you will see the first read.',
        ],
      },
    ],
    checklist: [
      'They showed real work in a category close to yours',
      'They can describe the first two weeks in plain words',
      'You know who builds, who reviews and who you escalate to',
      'They explained how results are measured before promising any',
      'You own the Klaviyo account and every asset made in it',
    ],
    mistakes: [
      'Choosing on price alone and discovering the scope was thinner than it looked',
      'Hiring a generalist social and ads agency that treats email as a side service',
      'Skipping a conversation about account ownership and access',
    ],
    scenario: "Picture a skincare brand with a thirty day reorder cycle choosing between two agencies. One shows a polished deck and a revenue promise. The other opens a live flow, explains why the replenishment email goes out on day twenty five, and asks about margins on refills. The second agency has done the thinking that matters, even if the deck is plainer.",
    faqs: [
      { q: "How many agencies should I speak to?", a: "Two or three is enough. More than that tends to blur the differences, and the useful comparison is how each one reasons about your account." },
      { q: "Should I choose a Klaviyo specialist or a general agency?", a: "A specialist usually knows the platform and the ecommerce patterns better. A general agency can work if email is a real discipline in their team and not a side service." },
      { q: "Do I need to see results from other clients?", a: "Seeing real work and hearing the reasoning is more useful than a results table, because results depend on the store. Ask how they would adapt the approach to yours." },
    ],
    terms: ['email-flow-vs-campaign', 'attributed-revenue', 'klaviyo-metric'],
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'questions-to-ask-an-email-marketing-agency',
    title: 'Questions to ask an email marketing agency',
    metaTitle: 'Questions to Ask an Email Marketing Agency Before Hiring',
    metaDescription: 'The questions that reveal whether an email marketing agency suits your store, from how they measure results to who owns the account and how the contract ends.',
    answer: 'Ask an email marketing agency how they would audit your account, who will do the work, how they measure results, who owns the assets and how the contract ends. The quality of the answers tells you more than any case study, because it shows how they actually think.',
    sections: [
      {
        heading: 'Questions about the work',
        body: [
          'Ask what they would look at first in your account and why. A good agency starts with flows, deliverability and segmentation, and can explain what they would expect to find.',
          'Ask how they design emails for mobile and dark mode, how they test before sending, and what their review process looks like. You want a checklist, not an assurance.',
        ],
      },
      {
        heading: 'Questions about measurement',
        body: [
          'Ask how they separate revenue that email caused from sales that would have happened anyway. Holdout groups and attribution windows are the vocabulary of someone who has thought about it.',
          'Ask which numbers they report monthly and which they would worry about. Revenue per recipient, deliverability and list growth tell a more complete story than opens alone.',
        ],
      },
      {
        heading: 'Questions about ownership and exit',
        body: [
          'Ask who owns the Klaviyo account, the templates and the data. The answer should be you, always, with the agency working inside your account rather than theirs.',
          'Ask what the notice period is, what they hand over if you leave and how long that handover takes. A confident agency does not mind the question.',
        ],
      },
      {
        heading: 'Questions about fit',
        body: [
          'Ask what kind of store they are not a good fit for. An agency that can name its own limits is usually honest about everything else.',
          'Ask who you will talk to weekly and how decisions get made. Slow approvals on either side are the most common reason projects stall.',
        ],
      },
    ],
    checklist: [
      'How would you audit my account, and in what order?',
      'Who will build and review my emails?',
      'How do you measure what email caused?',
      'Who owns the account and the assets?',
      'What is the notice period and the handover?',
      'What kind of store is not a good fit for you?',
    ],
    mistakes: [
      'Asking only about price and turnaround',
      'Accepting a promise of results instead of a method for measuring them',
      'Not asking what happens at the end of the contract',
    ],
    scenario: "On a discovery call, ask the agency to talk through a flow they built for a client like you. Listen for three things: the trigger and why it was chosen, the timing and what they changed after testing, and what they would do differently now. An agency that can answer all three has real experience, and one that cannot is reading from a script.",
    faqs: [
      { q: "Which question is the most revealing?", a: "Ask what kind of store is not a good fit for them. It shows honesty and focus faster than any case study." },
      { q: "Should I ask for references?", a: "Yes, when the agency can offer them. Speak to someone with a similar store, and ask about communication and what went wrong as well as what went well." },
      { q: "What if they cannot answer a question?", a: "A clear admission that they would need to look at your account is fine. A confident answer that sounds invented is the one to worry about." },
    ],
    terms: ['holdout-group', 'attributed-revenue', 'revenue-per-recipient'],
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'klaviyo-agency-pricing-models',
    title: 'Klaviyo agency pricing models explained',
    metaTitle: 'Klaviyo Agency Pricing Models: Retainer, Project, Revenue Share',
    metaDescription: 'How Klaviyo agencies price their work: monthly retainers, fixed projects and revenue share. What each model suits, where it goes wrong and what to ask.',
    answer: 'Klaviyo agencies usually charge by monthly retainer, by fixed project or by a share of attributed revenue. A retainer suits ongoing work, a project suits a defined build such as a flow set, and revenue share can align interests but needs a clear definition of what counts. Always ask what is included before comparing fees.',
    sections: [
      {
        heading: 'Monthly retainer',
        body: [
          'A retainer pays for a set amount of capacity each month, often covering campaigns, flow upkeep and reporting. It suits stores that email regularly and want a steady team.',
          'The risk is vague scope. Ask what a month includes, how many campaigns, which flows and what happens when you want more than the agreed amount.',
        ],
      },
      {
        heading: 'Fixed project',
        body: [
          'A project has a defined deliverable, such as building a welcome and abandoned cart flow, a migration from another platform or a design refresh. It suits stores that want a clear start and finish.',
          'The risk is the gap afterwards. Flows need tuning after launch, so ask whether review time is included or sold separately.',
        ],
      },
      {
        heading: 'Revenue share',
        body: [
          'Some agencies take a percentage of revenue attributed to email. It can align incentives, but attribution is contestable, and a share of revenue that would have arrived anyway rewards the agency for very little.',
          'If you consider this model, define the attribution window, the baseline and what happens when sales fall for reasons that have nothing to do with email.',
        ],
      },
      {
        heading: 'Comparing quotes fairly',
        body: [
          'Two quotes that look similar can cover very different work. Compare the number of flows, the design hours, the testing, the reporting and the people involved, not the headline fee.',
          'We quote after the free audit rather than publish a price, because the right scope depends on what is already in your account.',
        ],
      },
    ],
    checklist: [
      'Is the scope written down in plain words?',
      'What is included each month, and what costs extra?',
      'How is attribution defined if revenue share is involved?',
      'Is review time after launch included?',
      'What does it cost to stop?',
    ],
    mistakes: [
      'Comparing fees without comparing what is included',
      'Agreeing to revenue share with no baseline',
      'Signing a long term with no review point',
    ],
    scenario: "Suppose a store wants a welcome flow, an abandoned cart flow and four campaigns a month. One quote is a fixed project for the flows plus a retainer for campaigns. Another is a single retainer covering everything. Neither is wrong, but they carry different risks: the first leaves a gap after launch, the second can blur what is included. Writing the scope down removes most of the difference.",
    faqs: [
      { q: "Why do many agencies not publish prices?", a: "Scope depends on what is already in the account, the number of flows and the volume of sends. Quoting after an audit is more accurate than a price list that fits nobody." },
      { q: "Is revenue share a good idea?", a: "It can be, if attribution and the baseline are defined clearly in advance. Without those, it can reward the agency for sales that would have happened anyway." },
      { q: "Should I pay for a trial month?", a: "A short initial term with a review point works well. It lets both sides test the relationship without a long commitment." },
    ],
    terms: ['attributed-revenue', 'holdout-group', 'email-flow-vs-campaign'],
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'email-marketing-agency-red-flags',
    title: 'Email marketing agency red flags',
    metaTitle: 'Email Marketing Agency Red Flags to Spot Before You Sign',
    metaDescription: 'The warning signs of a poor email marketing agency: guaranteed results, hidden accounts, vague scope and more, and what a better answer sounds like.',
    answer: 'The clearest red flags in an email marketing agency are guaranteed revenue, an account you do not own, vague scope and an unwillingness to show real work. Any one of these is a reason to pause, and two together is usually a reason to walk away.',
    sections: [
      {
        heading: 'Promises that cannot be kept',
        body: [
          'Nobody can promise a revenue figure before seeing your list, your product and your offer. Guarantees are a sales tactic, and the agency that makes them is either guessing or planning to redefine success later.',
          'A better answer describes what they will measure and when you will see the first read, without pretending to know the result.',
        ],
      },
      {
        heading: 'Control of your account',
        body: [
          'If the agency builds in their own Klaviyo account and plans to move you later, or holds the only login, you are locked in. You should be an admin on your own account from the first day.',
          'Ask where templates and flows live and whether you can export them. The answer should be quick and unambiguous.',
        ],
      },
      {
        heading: 'Vague scope and hidden work',
        body: [
          'Phrases like strategy and optimisation cover almost anything. You want named deliverables, such as four campaigns a month, three flows built and a monthly report with specific numbers.',
          'Watch for work that arrives as templates reused across clients. A shared template can be a fine starting point, but it should be adapted to your brand and tested.',
        ],
      },
      {
        heading: 'Reluctance to show or explain',
        body: [
          'An agency that will not show real work, or cannot explain why a flow is built the way it is, may not have built it. Ask for a walk through one example and listen for reasons, not adjectives.',
          'Also notice how they respond to disagreement. Good agencies push back politely with evidence.',
        ],
      },
    ],
    checklist: [
      'No guaranteed numbers before an audit',
      'You are an admin on your own Klaviyo account',
      'Scope is listed as named deliverables',
      'They can walk through one real example and explain it',
      'The exit terms are written down',
    ],
    mistakes: [
      'Ignoring a vague answer because the sales call was friendly',
      'Handing over the only admin login',
      'Signing a long contract on the strength of a template deck',
    ],
    scenario: "A founder is told an agency will build everything in their own Klaviyo account and move it across later. That single detail means the agency holds the only copy of the work and the founder has no leverage. Asking to be admin on a Klaviyo account the store owns from day one costs nothing, and the reaction to the request is useful information.",
    faqs: [
      { q: "Is one red flag enough to walk away?", a: "Not always. One flag is a reason to ask more questions, and two together, such as guaranteed results and no account ownership, is usually a reason to stop." },
      { q: "Are junior staff a red flag?", a: "Not by themselves. The concern is when nobody senior reviews the work and you are not told who is doing it." },
      { q: "How do I check an agency's claims?", a: "Ask for a walk through of real work and for references. Check that results are described with a method, not only a number." },
    ],
    terms: ['attributed-revenue', 'klaviyo-metric', 'email-segmentation'],
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'what-to-expect-first-90-days-with-an-email-agency',
    title: 'What to expect in your first 90 days with an email agency',
    metaTitle: 'First 90 Days With an Email Agency: What to Expect',
    metaDescription: 'A realistic view of the first 90 days with an email marketing agency: access, audit, quick fixes, flow builds, testing and when results usually show.',
    answer: 'In the first 90 days with an email agency you should expect access and an audit in the first two weeks, quick fixes next, then flow builds and tests, with a clearer read on results towards the end. Results rarely arrive overnight, so judge progress by what shipped and what was learned.',
    sections: [
      {
        heading: 'Weeks one and two: access and audit',
        body: [
          'The agency needs admin access to Klaviyo, your store platform and your sending domain records. They should audit flows, segments, deliverability and design, and give you a short ranked list of what to fix first.',
          'You should come out of this phase with a written plan and an agreed scope, not just a kickoff call.',
        ],
      },
      {
        heading: 'Weeks three to six: fixes and first builds',
        body: [
          'Early wins are usually repairs, such as authentication records, broken triggers, missing exclusions and a welcome flow that stops sending to buyers. Then come the first new flows, built in priority order.',
          'Expect questions from the agency about products, margins and your brand voice. Slow answers on your side slow everything down.',
        ],
      },
      {
        heading: 'Weeks seven to ten: testing',
        body: [
          'Once flows are live, testing starts, such as subject lines, send times and offers. Small lists need patience, because results take time to mean anything.',
          'A good agency will show you what they tested, what happened and what they will do next, including the tests that did not work.',
        ],
      },
      {
        heading: 'Weeks eleven to thirteen: review',
        body: [
          'By the end of the quarter you should have a reporting rhythm, a clear picture of revenue per recipient and list health, and a plan for the next quarter based on evidence.',
          'This is also a good moment to review the working relationship itself, including approvals, communication and scope.',
        ],
      },
    ],
    checklist: [
      'Access granted in the first week',
      'A written audit and ranked list of fixes',
      'First flows live within the first six weeks',
      'A test log with results, including failures',
      'A review meeting before the quarter ends',
    ],
    mistakes: [
      'Judging the agency on revenue alone in the first month',
      'Slow approvals that delay every send',
      'Skipping the audit and going straight to campaigns',
    ],
    scenario: "A store signs on in early September and wants to be ready for Black Friday. The sensible plan is access and audit in the first two weeks, authentication and flow repairs next, the welcome and cart flows live well before peak, and a sending warm up in October. Starting in late October with the same goals leaves no room for testing.",
    faqs: [
      { q: "Will I see results in the first month?", a: "You should see work shipped and problems fixed. Revenue effects usually take longer, because flows need time to collect data and lists need time to respond." },
      { q: "What do I need to provide?", a: "Access to the tools, brand guidelines, product and margin information and a named person who approves emails quickly." },
      { q: "What if progress feels slow?", a: "Ask for the plan and the test log. Slow approvals on the brand side are a common cause, and a good agency will tell you if that is happening." },
    ],
    terms: ['email-deliverability', 'ab-testing', 'revenue-per-recipient'],
    service: 'email-flows',
  },
  {
    slug: 'email-marketing-agency-vs-freelancer',
    title: 'Email marketing agency vs freelancer',
    metaTitle: 'Email Marketing Agency vs Freelancer: Which Is Right?',
    metaDescription: 'Should you hire an email marketing agency or a freelancer? Compare capacity, skills, risk and cost structure to choose what suits your store right now.',
    answer: 'A freelancer suits a store with a clear, limited need and a strong brief, while an agency suits a store that wants strategy, design, build and deliverability covered with cover for absence. The right choice depends on scope, how much management you can give, and how much risk you can accept.',
    sections: [
      {
        heading: 'Where a freelancer works well',
        body: [
          'A good freelancer can be excellent value for a defined task, such as building a welcome flow or designing a template set. You get direct access to the person doing the work and a simple relationship.',
          'It works best when you can write a clear brief and review the output yourself.',
        ],
      },
      {
        heading: 'Where an agency works well',
        body: [
          'An agency brings several skills at once, including strategy, design, development and deliverability, and a team that can cover holidays and illness. That matters in peak season, when a single person being unavailable can stall a launch.',
          'It suits stores that want the channel managed rather than just built.',
        ],
      },
      {
        heading: 'The risks on each side',
        body: [
          'A freelancer carries single person risk, and skills gaps often appear in design or deliverability. An agency can carry layers of communication and, in some cases, a junior team behind a senior sales lead.',
          'Either way, the protections are the same: you own the account, scope is written down and the contract can end cleanly.',
        ],
      },
      {
        heading: 'A hybrid is common',
        body: [
          'Many stores use a freelancer for design and an agency for strategy, or an agency for the build and an in-house person for day to day sends. Mixed setups work if responsibilities are clear.',
        ],
      },
    ],
    checklist: [
      'Is the need defined, or still being discovered?',
      'Who covers absence in peak season?',
      'Which skills are missing: design, build, deliverability, strategy?',
      'How much management time can you give?',
      'Can you end the relationship cleanly?',
    ],
    mistakes: [
      'Hiring a freelancer for work that needs several specialists',
      'Hiring an agency for a task that needs one afternoon',
      'Having no written scope on either route',
    ],
    scenario: "A founder with one clear need, a redesign of six templates, hires a freelancer and gets excellent work in a fortnight. A year later email is a major channel, the freelancer is overloaded and there is no deliverability expertise. The founder moves to an agency for ongoing management and keeps the freelancer for design. Neither choice was a mistake at the time it was made.",
    faqs: [
      { q: "Is a freelancer cheaper?", a: "Often the fee is lower, but the true cost depends on how much management and checking you need to do yourself." },
      { q: "Can I start with a freelancer and move to an agency later?", a: "Yes. Keep all assets in your own accounts so that a handover is simple, whichever way you go." },
      { q: "Who covers holidays and illness?", a: "An agency usually has a second person. With a freelancer, ask in advance and plan around peak season." },
    ],
    terms: ['email-deliverability', 'email-segmentation', 'welcome-flow'],
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'switching-to-klaviyo-agency-checklist',
    title: 'Switching to Klaviyo: an agency migration checklist',
    metaTitle: 'Switching to Klaviyo: Migration Checklist for Stores',
    metaDescription: 'A migration checklist for moving an ecommerce store to Klaviyo with an agency: lists, flows, tracking, domain setup, warming and what to check at launch.',
    answer: 'A clean move to Klaviyo means exporting and mapping your lists and consent, rebuilding flows in priority order, connecting store tracking, setting up authentication records, and warming sending gradually. Plan for the old platform to run alongside the new one for a short overlap, then switch flows off one at a time.',
    sections: [
      {
        heading: 'Before you move anything',
        body: [
          'Audit what exists on the old platform, including flows, segments, forms and integrations. Decide what to rebuild, what to improve and what to retire. Some old automations are not worth moving, so be willing to retire them.',
          'Confirm consent. Only subscribers who agreed to marketing should move, and you should keep the evidence of when and how they agreed.',
        ],
      },
      {
        heading: 'Move data and tracking',
        body: [
          'Export profiles with their consent status and any properties you use for segments. Connect your store so that orders, carts and product views flow into Klaviyo, then test that events arrive correctly.',
          'Suppression lists matter as much as subscribers. Bring unsubscribes, bounces and complaints across so that you do not email people who opted out.',
        ],
      },
      {
        heading: 'Authenticate and warm',
        body: [
          'Set up SPF, DKIM and DMARC for your sending domain, and consider a branded sending domain. A new platform with a changed sending identity can behave like a new sender, so start with your most engaged subscribers and build volume gradually.',
          'Watch bounce and complaint rates closely in the first weeks.',
        ],
      },
      {
        heading: 'Rebuild and switch over',
        body: [
          'Rebuild flows in the order of revenue importance, usually welcome, abandoned cart and post purchase first. Test each with real orders, then turn the old version off the moment the new one goes live, so customers never get both.',
        ],
      },
    ],
    checklist: [
      'Consent records exported with each profile',
      'Unsubscribes and suppressions brought across',
      'Store events verified with a test order',
      'SPF, DKIM and DMARC set up and checked',
      'A warm up plan agreed for the first sends',
      'Old flows switched off as new ones go live',
    ],
    mistakes: [
      'Moving the whole list, including people who never consented',
      'Leaving old and new flows running together',
      'Sending a large first campaign without warming up',
    ],
    scenario: "A store moving from another platform sends its first large campaign from Klaviyo to the whole imported list on day one. Inbox placement drops because the new setup has no sending history and some contacts are years old. A better plan sends to the most engaged people first, widens gradually over a few weeks and watches complaints at each step.",
    faqs: [
      { q: "How long does a migration take?", a: "It depends on how many flows and integrations you have. The data move can be quick, while rebuilding and testing flows is where most of the time goes." },
      { q: "Do I need to keep the old platform running?", a: "For a short overlap, yes, so that nothing is lost while flows are tested. Switch each old flow off as its replacement goes live." },
      { q: "Will my deliverability suffer?", a: "It can, if you move the whole list at once with no warm up. Authentication and gradual sending reduce the risk." },
    ],
    terms: ['ip-warming', 'spf-dkim-dmarc', 'suppression-list'],
    service: 'email-deliverability',
  },
  {
    slug: 'how-to-brief-an-email-marketing-agency',
    title: 'How to brief an email marketing agency',
    metaTitle: 'How to Brief an Email Marketing Agency: A Practical Guide',
    metaDescription: 'What to put in a brief for an email marketing agency: goals, audience, offer, constraints and access, so the first month goes faster and costs less.',
    answer: 'A good email agency brief states your goal, your customers, your offer and margins, your constraints and the access the agency needs. Keep it to two pages, put numbers you trust in it, and say plainly what you have tried before and what did not work.',
    sections: [
      {
        heading: 'Goals and measures',
        body: [
          'Say what you want email to do in the next six months, such as lift repeat orders, reduce reliance on paid traffic or rebuild after a deliverability problem. Pick one or two goals, not eight.',
          'Name the numbers you will use to judge progress, and where those numbers live.',
        ],
      },
      {
        heading: 'Customers and products',
        body: [
          'Describe who buys, what they buy first and what they buy next. Include the typical time between orders, your best sellers and the products you want to push or avoid.',
          'Share your margins by category. They decide how much discounting you can afford.',
        ],
      },
      {
        heading: 'Constraints and history',
        body: [
          'List brand rules, legal wording, shipping limits and anything the agency must not do. Tell them what you tried before, including what worked, what did not and what you suspect.',
          'Share previous audit notes or agency handover documents if you have them.',
        ],
      },
      {
        heading: 'Access and people',
        body: [
          'List who needs access to Klaviyo, your store, analytics and DNS, and who approves emails. Name one decision maker, because feedback from five people at once slows everything.',
        ],
      },
      {
        heading: "Share the brief early",
        body: ["Send the brief before the first call, not after. It lets the agency arrive with real questions, and it shows you quickly whether they have read it. Update it after the audit, because the first version always contains assumptions that the data will correct."],
      },
    ],
    checklist: [
      'One or two goals with the measures that prove them',
      'Customer description and typical reorder time',
      'Margins by category and the offer limits',
      'Brand and legal constraints written down',
      'Named approver and a turnaround time for feedback',
    ],
    mistakes: [
      'Briefing with a wish list of ten goals',
      'Hiding past failures from the agency',
      'Having no single person who can say yes',
    ],
    scenario: "A store owner writes a two page brief: one goal, which is to lift repeat orders; their reorder window; margins by category; the offers they will and will not run; and past tests that failed. The agency's audit comes back focused on the replenishment and winback gaps in days, because the brief removed a round of questions.",
    faqs: [
      { q: "How long should a brief be?", a: "Two pages is enough. A short brief that is specific beats a long one full of general statements." },
      { q: "What if I do not know my numbers?", a: "Say so, and give the agency access to Klaviyo and your store analytics. Part of the audit can be establishing a baseline." },
      { q: "Should I share past failures?", a: "Yes. Knowing what did not work saves the agency from repeating it and gives them useful clues about your customers." },
    ],
    terms: ['customer-lifetime-value', 'email-segmentation', 'klaviyo-metric'],
    service: 'retention-strategy',
  },
  {
    slug: 'when-to-hire-an-email-marketing-agency',
    title: 'When to hire an email marketing agency',
    metaTitle: 'When to Hire an Email Marketing Agency: 8 Signs It Is Time',
    metaDescription: 'The signs it is time to hire an email marketing agency: stalled revenue, missing flows, deliverability trouble, no time and more, plus when to wait.',
    answer: 'Hire an email marketing agency when email should be producing more than it is and you lack the time or skills to fix it. Common signs are missing flows, falling inbox placement, a platform move, a large list that is rarely used well, or a founder who is still sending every campaign.',
    sections: [
      {
        heading: 'Signs it is time',
        body: [
          'You only send campaigns and have few automated flows, or your flows were built years ago and never revisited. Email revenue is flat while the list grows, or your open and click numbers have been drifting down.',
          'Another sign is deliverability. If more mail is landing in spam, or complaints are rising, that is a specialist problem that gets worse the longer it sits.',
        ],
      },
      {
        heading: 'Moments that favour an agency',
        body: [
          'A platform migration, a rebrand, a big launch or entering a new market all create a burst of work that is easier to buy in than to hire for. So does the approach of peak season, when mistakes are expensive.',
          'It is also reasonable to hire when the person doing email is also doing three other jobs.',
        ],
      },
      {
        heading: 'When to wait',
        body: [
          'If you have a very small list, no steady traffic and no repeat purchase product, email will not fix those. Work on traffic and product first, and put the basics in place yourself, such as a welcome flow and an abandoned cart flow.',
          'Also wait if you cannot give the agency access, decisions and feedback. The relationship needs time from you.',
        ],
      },
      {
        heading: 'Test it with an audit',
        body: [
          'A free audit is a low risk way to see what is possible. It should tell you what is missing, what is broken and what the highest value fixes are, even if you decide to do the work yourself.',
        ],
      },
    ],
    checklist: [
      'Do you have fewer flows than the basics require?',
      'Is inbox placement or complaint rate getting worse?',
      'Is a migration, rebrand or peak season close?',
      'Does the person running email have too many other jobs?',
      'Can you give the agency access and timely feedback?',
    ],
    mistakes: [
      'Hiring before there is a steady list and repeat purchases',
      'Waiting until deliverability is badly damaged',
      'Expecting an agency to fix problems that sit in the product or the site',
    ],
    scenario: "A founder is still sending every campaign on Sunday night, has a welcome flow from three years ago and has not looked at spam complaints. None of these is a crisis, but together they say the channel is running on goodwill. That is a typical moment to ask for an audit and decide how much to outsource.",
    faqs: [
      { q: "Is there a minimum list size to hire an agency?", a: "There is no fixed rule. The more relevant question is whether you have steady traffic and products people buy again, because email multiplies those." },
      { q: "Can I fix this myself first?", a: "Often yes, for the basics. Build a welcome flow and an abandoned cart flow, check authentication and then see what is left." },
      { q: "What if I already have an in-house person?", a: "An agency can work alongside them for design, build capacity or specialist areas such as deliverability." },
    ],
    terms: ['sender-reputation', 'email-flow-vs-campaign', 'email-list-growth'],
    service: 'klaviyo-email-marketing',
  },
  {
    slug: 'how-to-measure-email-agency-performance',
    title: 'How to measure email agency performance',
    metaTitle: 'How to Measure Email Marketing Agency Performance',
    metaDescription: 'How to judge an email marketing agency fairly: the metrics that matter, how to avoid vanity numbers, what a good report contains and when to expect change.',
    answer: 'Measure an email agency on revenue per recipient, list health, deliverability and the quality of what they ship, not on opens or on total revenue alone. Agree the measures at the start, compare against a baseline or holdout, and review monthly with test results, not just charts.',
    sections: [
      {
        heading: 'Pick measures that cannot be gamed easily',
        body: [
          'Open rates are distorted by privacy features, and total email revenue rises with sales that would have happened anyway. Revenue per recipient, click to order rates and flow revenue per message are harder to flatter.',
          'Add health measures such as bounce rate, complaint rate and unsubscribe rate, because a programme can look strong while quietly damaging the list.',
        ],
      },
      {
        heading: 'Agree a baseline',
        body: [
          'Before work begins, record what each measure looked like over the previous quarter or year. Without that, every later number can be explained away.',
          'Where possible, hold back a small group from a flow or a campaign, so you can see what email caused rather than what it merely touched.',
        ],
      },
      {
        heading: 'What a good report contains',
        body: [
          'A useful monthly report shows what shipped, what was tested, what the result was and what happens next. It names the changes that did not work and the reason it still mattered.',
          'It should also flag risks, such as a falling placement rate or a segment growing stale.',
        ],
      },
      {
        heading: 'Be fair on timing',
        body: [
          'Flows and list quality take weeks to show effect, and seasonality moves everything. Compare like with like, such as the same period last year, and give tests enough volume to mean something.',
        ],
      },
    ],
    checklist: [
      'Baselines written down before work starts',
      'Revenue per recipient tracked alongside total revenue',
      'Bounce, complaint and unsubscribe rates reported',
      'A holdout or clear attribution method agreed',
      'A monthly report that includes failed tests',
    ],
    mistakes: [
      'Judging on open rate after privacy features changed what it means',
      'Crediting email for sales that happened anyway',
      'Comparing a peak month with a quiet one',
    ],
    scenario: "A store sees email revenue rise by a large amount in November and credits the agency. The same month last year also rose, and traffic was higher too. Comparing revenue per recipient against the previous year, and against a holdout group that did not receive a flow, gives a far more honest answer about what the agency changed.",
    faqs: [
      { q: "How soon can I judge performance?", a: "Judge the work shipped from week one, and judge revenue effects after a full cycle of flows and a few campaigns, often a quarter." },
      { q: "What if revenue is flat but health metrics improve?", a: "That can be a good sign. Better deliverability and list quality usually come before revenue gains." },
      { q: "Should I trust the agency's own reports?", a: "Cross check against your store analytics, and agree in advance how numbers are calculated so that both sides use the same definitions." },
    ],
    terms: ['revenue-per-recipient', 'holdout-group', 'apple-mail-privacy-protection'],
    service: 'retention-strategy',
  },
  {
    slug: 'what-a-good-klaviyo-audit-includes',
    title: 'What a good Klaviyo audit includes',
    metaTitle: 'What a Good Klaviyo Audit Includes (and What to Expect)',
    metaDescription: 'What a thorough Klaviyo audit should cover: flows, segments, deliverability, design, tracking and reporting, and what you should receive at the end.',
    answer: 'A good Klaviyo audit covers flows, segments, deliverability, design, tracking and reporting, and ends with a ranked list of fixes you can act on. It should leave you with specific findings about your account, not a generic checklist.',
    sections: [
      {
        heading: 'Flows and automation',
        body: [
          'The audit checks which flows exist, what triggers them, how they are timed and whether exclusions are in place. Missing flows are the most common finding, followed by flows that overlap or keep emailing people who already bought.',
        ],
      },
      {
        heading: 'Lists, segments and consent',
        body: [
          'It reviews how people join, how consent is recorded, how segments are defined and whether engagement is used to protect sender reputation. Stale segments and unused data are common.',
        ],
      },
      {
        heading: 'Deliverability and authentication',
        body: [
          'It checks SPF, DKIM and DMARC, the sending domain, bounce and complaint rates and how inactive subscribers are handled. Problems here quietly reduce the value of everything else.',
        ],
      },
      {
        heading: 'Design, tracking and reporting',
        body: [
          'It reviews templates on mobile and in dark mode, the accuracy of store tracking and how results are reported. It should end with a plain list of fixes, ordered by likely impact and effort.',
          'You should be able to take the list and do the work yourself, or ask us to do it.',
        ],
      },
      {
        heading: "What you should receive",
        body: ["You should receive the findings in writing, with each one stated plainly, a note of how serious it is and what fixing it involves. Screenshots or examples from your own account make the findings checkable, and a short call to talk them through helps you decide what to do first."],
      },
    ],
    checklist: [
      'Flow inventory with triggers, timing and exclusions',
      'Segment and consent review',
      'Authentication and domain check',
      'Design review on mobile and dark mode',
      'A ranked list of fixes you can act on',
    ],
    mistakes: [
      'Accepting a generic checklist as an audit',
      'An audit that ends in a sales pitch with no findings',
      'Not receiving the findings in writing',
    ],
    scenario: "A store runs a free audit and receives a four page document. It shows two missing flows, an abandoned cart flow that keeps emailing buyers, a DMARC record set to none for a year and templates that break in dark mode. Each finding has a priority and an estimate of effort, so the owner can fix the quick ones at once and decide about the rest.",
    faqs: [
      { q: "How long does an audit take?", a: "A thorough account review takes a few days of work. The turnaround you are given should be stated up front." },
      { q: "Do I have to hire the agency afterwards?", a: "No. A good audit is useful on its own, and you should be free to use the findings with anyone." },
      { q: "What access does an audit need?", a: "Usually read only access to Klaviyo and your sending domain records. Ask for the minimum needed and remove it after." },
    ],
    terms: ['spf-dkim-dmarc', 'sunset-policy', 'email-segmentation'],
    service: 'email-deliverability',
  },
  {
    slug: 'email-agency-contracts-and-reporting',
    title: 'Email agency contracts and reporting: what to agree',
    metaTitle: 'Email Agency Contracts and Reporting: What to Agree First',
    metaDescription: 'The terms to agree with an email marketing agency before you sign: scope, account ownership, reporting, notice, and what happens to your data when you leave.',
    answer: 'Before signing with an email agency, agree the scope in writing, confirm you own the Klaviyo account and every asset, set a reporting rhythm and fix the notice and handover terms. Short initial terms with a review point protect both sides while you learn how you work together.',
    sections: [
      {
        heading: 'Scope in plain words',
        body: [
          'List what is included each month, such as campaigns, flow upkeep, testing and reporting, and what is billed separately. Define what a campaign is, because it can mean a single email or a full design and segmentation job.',
          'Agree how scope changes are requested and approved.',
        ],
      },
      {
        heading: 'Ownership and access',
        body: [
          'You own the account, the templates, the data and the sending domain. The agency works inside your account with named logins that you can remove at any time.',
          'Ask that all assets, such as templates and images, are handed over on request in usable formats.',
        ],
      },
      {
        heading: 'Reporting and meetings',
        body: [
          'Agree the cadence and the contents. A monthly report with what shipped, what was tested and what is next, plus a short call, is enough for many stores.',
          'Agree turnaround times on both sides, including how long you have to approve emails before a send.',
        ],
      },
      {
        heading: 'Ending well',
        body: [
          'Set a notice period you are comfortable with and a clear handover list. A shorter initial term with a review point is easier to agree than a long fixed term, and it keeps both sides honest.',
        ],
      },
      {
        heading: "Review it together",
        body: ["Put a review date in the diary for the end of the first quarter. Use it to check that scope still fits, reports are useful and approvals are quick, then adjust the terms if they are not. Treating the contract as a living agreement keeps small frustrations from growing."],
      },
    ],
    checklist: [
      'Scope and exclusions written in plain words',
      'You are admin on your own account',
      'Asset handover terms agreed',
      'Reporting content and cadence defined',
      'Notice period and review point set',
    ],
    mistakes: [
      'A long fixed term with no review point',
      'Unclear definitions of what counts as a campaign',
      'No agreement about who approves emails and how fast',
    ],
    scenario: "Two months in, a store wants to move a campaign day and add a segment. Because the contract defines a campaign as one designed and segmented send, and sets out how extra requests are approved, the change takes a message instead of a negotiation. Clear definitions on day one prevent most arguments later.",
    faqs: [
      { q: "What notice period is reasonable?", a: "Many agencies ask for thirty days. Whatever is agreed, make sure it is written down and includes a handover of assets." },
      { q: "What should a monthly report show?", a: "What shipped, what was tested, results with context, risks and the plan for next month. Charts alone are not a report." },
      { q: "Who should sign off emails?", a: "Name one person on your side with the authority to approve, and agree a turnaround time so sends are not delayed." },
    ],
    terms: ['sending-domain', 'klaviyo-metric', 'email-flow-vs-campaign'],
    service: 'klaviyo-email-marketing',
  },
];

export const getHiringGuide = (slug: string) => HIRING_GUIDES.find((g) => g.slug === slug);

export function hiringSiblings(slug: string) {
  const i = HIRING_GUIDES.findIndex((g) => g.slug === slug);
  if (i < 0) return [];
  return [1, 2, 3, 4].map((n) => HIRING_GUIDES[(i + n) % HIRING_GUIDES.length]).filter((x, k, arr) => x.slug !== slug && arr.findIndex((y) => y.slug === x.slug) === k);
}
