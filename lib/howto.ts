/**
 * Klaviyo how-to and fix-it pages. Each is a short, practical walkthrough of
 * one task for an ecommerce store: a direct answer, what to have ready,
 * numbered steps, pitfalls and a checklist to confirm it works. General
 * practice only; nothing here claims a client result. `steps` is the unique
 * content per page and may never be empty (see scripts/quality-gate.mjs).
 */
export type HowTo = {
  slug: string;
  category: 'flows' | 'lists' | 'deliverability' | 'campaigns' | 'reporting';
  /** The task as the H1 and page title. */
  task: string;
  metaDescription: string;
  /** The direct answer, quotable as it stands. */
  answer: string;
  before: string[];
  steps: { title: string; body: string }[];
  pitfalls: string[];
  checklist: string[];
  /** Glossary term slugs. */
  terms: string[];
  /** Service page slug. */
  service: string;
};

export const HOWTOS: HowTo[] = [
  {
    "slug": "set-up-welcome-flow-klaviyo",
    "category": "flows",
    "task": "How to set up a welcome flow in Klaviyo",
    "metaDescription": "Build a Klaviyo welcome flow for new ecommerce subscribers: trigger, message order, timing, filters and the checks to run before you turn it live.",
    "answer": "A welcome flow is an automated series that starts when someone joins a list or segment and introduces your store, your best products and your first purchase offer. In Klaviyo you open Flows, create a flow triggered by list or segment membership, add a short sequence of emails with time delays, and set it live.",
    "before": [
      "A signup list with a form already feeding it",
      "Brand assets such as logo, fonts and colours",
      "A clear first purchase incentive, or a decision not to offer one",
      "Three or four hero products or collections to feature"
    ],
    "steps": [
      {
        "title": "Choose the trigger",
        "body": "Open Flows, create a new flow and pick the list or segment trigger. Select the list your signup form feeds, so every new subscriber enters the flow once."
      },
      {
        "title": "Plan the sequence on paper",
        "body": "Decide the job of each email before you build. A common order is brand story and incentive first, best sellers second, social proof or a reminder third."
      },
      {
        "title": "Add the first email straight away",
        "body": "Place an email action right after the trigger with no delay, or a very short one. People are most interested in the minutes after they subscribe."
      },
      {
        "title": "Add delays and further emails",
        "body": "Insert time delay actions between messages, spacing them by a day or two. Keep the sequence short so it feels like an introduction rather than a barrage."
      },
      {
        "title": "Add a filter for existing customers",
        "body": "Use a flow filter or conditional split so people who have already bought see a different path, such as a thank you and a cross-sell, instead of a first order offer."
      },
      {
        "title": "Build each message with real content",
        "body": "Use your template, add product blocks, write a clear subject line and preheader, and make one primary button per email."
      },
      {
        "title": "Preview, test and set live",
        "body": "Send test emails to yourself, check links on a phone, confirm the discount code works, then move each email out of draft and set the flow live."
      }
    ],
    "pitfalls": [
      "Sending the same welcome series to existing customers and offering them a first order incentive they cannot use.",
      "Making the first email heavy with images so it loads slowly and gets clipped or lands in a promotions view.",
      "Forgetting to set emails from draft to live, so the flow looks active but sends nothing.",
      "Stacking a welcome flow on top of a campaign the same day, so new subscribers get several messages at once."
    ],
    "checklist": [
      "A test signup enters the flow and receives the first email promptly",
      "Discount code works and is limited to the right use",
      "Existing customers follow the correct path",
      "All links, images and unsubscribe link work on mobile",
      "Every email status is live, not draft"
    ],
    "service": "email-flows",
    "terms": [
      "welcome-flow",
      "email-flow-vs-campaign",
      "flow-filter"
    ]
  },
  {
    "slug": "set-up-abandoned-cart-flow-klaviyo",
    "category": "flows",
    "task": "How to set up an abandoned cart flow in Klaviyo",
    "metaDescription": "Set up a Klaviyo abandoned cart flow for your online store: trigger, timing, cart contents, exit conditions and the tests that catch common mistakes.",
    "answer": "An abandoned cart flow emails shoppers who started checkout but did not finish. In Klaviyo, connect your store integration, create a flow on the started checkout trigger, add a short series of reminder emails showing the cart contents, and make sure the flow stops once an order is placed.",
    "before": [
      "Your ecommerce platform connected to Klaviyo and syncing events",
      "Confirmation that checkout events are appearing in the activity feed",
      "A stance on incentives, such as free shipping messaging or none at all",
      "Product images and descriptions that look right in an email"
    ],
    "steps": [
      {
        "title": "Confirm the events are arriving",
        "body": "Check the metrics list for the started checkout event and look at a recent test. If events are missing, fix the integration before building anything."
      },
      {
        "title": "Create the flow on the checkout trigger",
        "body": "Open Flows, create a flow and choose the started checkout metric as the trigger. This starts the flow when a known shopper begins checkout."
      },
      {
        "title": "Set the flow filters",
        "body": "Add filters so the flow only enters people who have not placed an order since starting checkout. This is the main protection against reminding someone who already bought."
      },
      {
        "title": "Add a first delay and email",
        "body": "Wait a few hours, then send a plain reminder that shows the items left behind with a single button back to the cart. Keep the tone helpful."
      },
      {
        "title": "Add follow-ups",
        "body": "Add one or two later emails. Use them for objection handling such as delivery and returns information, reviews, or an optional incentive for the final message."
      },
      {
        "title": "Use the dynamic cart block",
        "body": "Insert the dynamic product block fed by the checkout event so each email shows the exact items. Check the layout with one item and with several."
      },
      {
        "title": "Test and go live",
        "body": "Run a real test checkout in your store using a test profile, confirm the email arrives with correct items, then set every email live."
      }
    ],
    "pitfalls": [
      "Missing the exit condition, so people who have just paid still receive reminders.",
      "Offering a discount in the first email, which trains shoppers to abandon on purpose.",
      "Showing broken or empty product blocks when the cart has only one item.",
      "Not excluding recent buyers or people already in a similar flow, which doubles up messages."
    ],
    "checklist": [
      "A test checkout triggers the flow",
      "Cart items, images and prices display correctly",
      "Completing the order stops further emails",
      "Links return to the correct cart or checkout",
      "All emails are live and not in draft"
    ],
    "service": "email-flows",
    "terms": [
      "abandoned-cart-flow",
      "event-trigger",
      "flow-filter"
    ]
  },
  {
    "slug": "set-up-browse-abandonment-flow-klaviyo",
    "category": "flows",
    "task": "How to set up a browse abandonment flow in Klaviyo",
    "metaDescription": "Create a Klaviyo browse abandonment flow that follows up on viewed products with a light touch: trigger, delays, filters, content and testing steps.",
    "answer": "A browse abandonment flow emails identified visitors who viewed a product but did not add it to a cart. In Klaviyo, enable onsite tracking, build a flow on the viewed product trigger, filter out people already in a cart flow or who bought, and send one or two light reminders.",
    "before": [
      "Klaviyo onsite tracking installed and working on your store",
      "Visitors being identified, for example through a signup form or logged in accounts",
      "A decision on how often a person may receive this flow",
      "Product pages with clear images and titles for use in email"
    ],
    "steps": [
      {
        "title": "Check tracking and identification",
        "body": "Confirm viewed product events are showing on test profiles. Browse abandonment only works for visitors Klaviyo can tie to an email address."
      },
      {
        "title": "Create the flow",
        "body": "Open Flows, create a flow and choose the viewed product trigger. Add a trigger filter if you only want to include certain collections."
      },
      {
        "title": "Exclude people who should not enter",
        "body": "Add filters for anyone who has added to cart, started checkout or placed an order since the view. This keeps the flow separate from your cart flow."
      },
      {
        "title": "Add a delay",
        "body": "Wait long enough that the visitor has clearly left, often a few hours. Replying too quickly feels intrusive."
      },
      {
        "title": "Build the email around the product",
        "body": "Show the viewed item using the dynamic product block, add a few related products, and keep the message soft. Ask a question or highlight a key benefit rather than pushing hard."
      },
      {
        "title": "Limit frequency",
        "body": "Use the flow setting for how often a person can re-enter, so one curious shopper does not receive a message for every browsing session."
      },
      {
        "title": "Test, then set live",
        "body": "View a product while logged in as a test profile, wait for the delay, confirm the email and then set it live."
      }
    ],
    "pitfalls": [
      "Sending browse emails to people who also get a cart reminder, creating overlap.",
      "Allowing unlimited re-entry so frequent visitors get a constant stream.",
      "Using a hard sell tone for someone who only glanced at a page.",
      "Assuming it works for anonymous traffic when the visitor was never identified."
    ],
    "checklist": [
      "Viewed product events appear on a test profile",
      "Cart and order exclusions are in place",
      "Re-entry limit is set deliberately",
      "Email shows the viewed product correctly",
      "The flow and its emails are live"
    ],
    "service": "email-flows",
    "terms": [
      "browse-abandonment-flow",
      "event-trigger",
      "smart-sending"
    ]
  },
  {
    "slug": "set-up-post-purchase-flow-klaviyo",
    "category": "flows",
    "task": "How to set up a post-purchase flow in Klaviyo",
    "metaDescription": "Build a Klaviyo post-purchase flow that thanks customers, sets delivery expectations, asks for reviews and prompts a second order. Steps and checks.",
    "answer": "A post-purchase flow runs after an order and covers thanks, usage guidance, a review request and a prompt toward the next purchase. In Klaviyo, trigger it from the placed order or fulfilled order event, split by product where it matters, and space the messages around real delivery times.",
    "before": [
      "Order and fulfilment events syncing from your store",
      "A review tool or a simple review request page",
      "Product usage tips or care guides for your main items",
      "Knowledge of typical delivery time for your shipping options"
    ],
    "steps": [
      {
        "title": "Pick the trigger",
        "body": "Open Flows and choose the placed order or fulfilled order metric. Fulfilled order is better for timing review requests, because it lines up with shipping."
      },
      {
        "title": "Map the moments",
        "body": "List what the customer needs after buying: reassurance, how to use the product, a review request once it arrives, and a suggestion for what to buy next."
      },
      {
        "title": "Add the first message",
        "body": "Send a short thank you with helpful information, separate from the transactional order confirmation. Do not duplicate what your store already sends."
      },
      {
        "title": "Space the follow-ups",
        "body": "Add delays based on delivery and use time. Place the review request after the item has likely arrived and been tried."
      },
      {
        "title": "Split by product or customer type",
        "body": "Use conditional splits so first time buyers, repeat buyers and buyers of different categories each get relevant content and recommendations."
      },
      {
        "title": "Add the next-purchase message",
        "body": "Include a cross-sell or replenishment prompt with a dynamic product block that suggests items that complement what they bought."
      },
      {
        "title": "Test and set live",
        "body": "Place a test order, step through each branch, and check that links, review requests and product blocks behave. Then set the emails live."
      }
    ],
    "pitfalls": [
      "Sending a review request before the parcel has arrived.",
      "Pushing promotions so hard that the flow feels like another sales email rather than service.",
      "Ignoring returns and refunds, so unhappy customers still get upbeat upsell emails.",
      "Duplicating the order confirmation content and annoying customers."
    ],
    "checklist": [
      "Test order enters the flow and follows the expected branch",
      "Delays match realistic delivery timing",
      "Review links work and go to the right place",
      "Recommendation blocks show relevant products",
      "All emails are live"
    ],
    "service": "email-flows",
    "terms": [
      "post-purchase-flow",
      "replenishment-flow",
      "cross-sell-email"
    ]
  },
  {
    "slug": "set-up-back-in-stock-flow-klaviyo",
    "category": "flows",
    "task": "How to set up a back in stock flow in Klaviyo",
    "metaDescription": "Set up Klaviyo back in stock alerts for your ecommerce store: the subscribe prompt, the trigger, the email content and how to test the whole path.",
    "answer": "A back in stock flow notifies shoppers when an item they wanted becomes available again. In Klaviyo, add a notify me prompt on out of stock product pages, build a flow on the back in stock trigger, and send a fast, product-focused email with a direct link to buy.",
    "before": [
      "A store that syncs stock status to Klaviyo",
      "A notify me form or button on out of stock product pages",
      "Product images and links that stay valid after restocking",
      "A plan for how many alerts one person can receive per item"
    ],
    "steps": [
      {
        "title": "Enable the feature in your store integration",
        "body": "Check the integration settings and Klaviyo documentation to confirm back in stock is switched on and that your store sends inventory updates."
      },
      {
        "title": "Add the subscribe prompt",
        "body": "Place the notify me button or form on out of stock product pages so shoppers can ask for an alert. Make it clear that they will get an email about that product."
      },
      {
        "title": "Create the flow",
        "body": "Open Flows and choose the back in stock trigger. This starts when a product someone subscribed to is available again."
      },
      {
        "title": "Write a direct email",
        "body": "Lead with the product image, name and a single button to buy. The shopper already asked for this, so skip long introductions."
      },
      {
        "title": "Add urgency honestly",
        "body": "Mention that stock can sell out quickly only if it is true. A short follow-up can be added for people who did not click."
      },
      {
        "title": "Handle consent properly",
        "body": "Be clear about whether the alert signup also joins marketing lists. Keep the notification separate from general marketing consent."
      },
      {
        "title": "Test the whole path",
        "body": "Subscribe to alerts on a test product, change its stock status, and check that the email arrives and links to the right product. Then set live."
      }
    ],
    "pitfalls": [
      "Sending the alert when only one size or variant returned, linking to a still unavailable option.",
      "Making the notify me form the only signup, then silently adding people to marketing lists.",
      "Not testing stock sync, so the trigger never fires.",
      "Sending the alert days after restocking, when the item has sold out again."
    ],
    "checklist": [
      "Notify me prompt appears on out of stock pages",
      "Restocking a test product fires the flow",
      "Email shows the correct variant and link",
      "Consent wording is accurate",
      "Flow and emails are live"
    ],
    "service": "email-flows",
    "terms": [
      "back-in-stock-flow",
      "event-trigger",
      "catalog-feed"
    ]
  },
  {
    "slug": "set-up-winback-flow-klaviyo",
    "category": "flows",
    "task": "How to set up a win-back flow in Klaviyo",
    "metaDescription": "Build a Klaviyo win-back flow to re-engage lapsed customers: define lapsed, choose the trigger, write the series and set exit rules. Steps and checks.",
    "answer": "A win-back flow re-engages customers who have not purchased for longer than their normal buying cycle. In Klaviyo, define a lapsed customer, trigger the flow when someone meets that definition, send a short series with a reason to return, and move anyone who stays silent toward suppression.",
    "before": [
      "Your typical time between first and second orders",
      "A decision on whether you will offer an incentive",
      "Product updates, new arrivals or content worth returning for",
      "A plan for what happens to people who never respond"
    ],
    "steps": [
      {
        "title": "Define lapsed",
        "body": "Look at order history and choose a gap that is longer than your normal repurchase interval. Use a segment or a trigger based on time since last order."
      },
      {
        "title": "Create the flow",
        "body": "Open Flows and build one triggered by entry to the lapsed segment, or by a date based property. Exclude people who have ordered recently."
      },
      {
        "title": "Lead with a reason to return",
        "body": "Start with something useful, such as what is new, a best seller they have not tried, or an update on products they bought before."
      },
      {
        "title": "Add a second touch",
        "body": "Follow after a delay with a more direct message. If you use an incentive, hold it for this stage so earlier emails do not reduce full price sales."
      },
      {
        "title": "Add a final message",
        "body": "Send a simple last note that asks if they still want to hear from you and makes preferences easy to change."
      },
      {
        "title": "Set the exit and next step",
        "body": "Remove people from the flow when they place an order. Use a split to separate those who engaged from those who did not."
      },
      {
        "title": "Test and set live",
        "body": "Add a test profile to the segment, check the path and timing, then set the flow live and review results after a full cycle."
      }
    ],
    "pitfalls": [
      "Setting the lapsed window so short that active customers get win-back messages.",
      "Offering a discount first, which can teach customers to wait for one.",
      "Continuing to email people who never open, which harms sender reputation.",
      "Forgetting to exit buyers, who then receive a win-back message after reordering."
    ],
    "checklist": [
      "Lapsed definition is written down and matches the segment",
      "Recent buyers cannot enter",
      "A test profile receives the correct emails",
      "Purchasers leave the flow",
      "Unresponsive profiles have a clear next step"
    ],
    "service": "email-flows",
    "terms": [
      "winback-flow",
      "sunset-policy",
      "email-segmentation"
    ]
  },
  {
    "slug": "sunset-unengaged-profiles-klaviyo",
    "category": "lists",
    "task": "How to sunset unengaged profiles in Klaviyo",
    "metaDescription": "Stop mailing unengaged Klaviyo profiles safely: define inactivity, build the segment, run a last chance message and suppress the rest. Steps and checks.",
    "answer": "Sunsetting means you stop emailing profiles that have not engaged for a defined period, to protect deliverability. In Klaviyo, build a segment of unengaged but marketable profiles, send a final re-permission message, and suppress or exclude those who still do not respond.",
    "before": [
      "A written definition of unengaged for your store",
      "A view of recent opens, clicks and orders to build conditions",
      "Awareness that open data is affected by Apple Mail Privacy Protection",
      "Agreement from the team on what happens to suppressed profiles"
    ],
    "steps": [
      {
        "title": "Write the policy first",
        "body": "Decide the period without activity and what counts as activity. Include clicks, site visits and purchases, not just opens, because opens can be inflated."
      },
      {
        "title": "Build the segment",
        "body": "Create a segment with conditions for no recent clicks, no recent placed orders and no recent active on site, while still being able to receive marketing."
      },
      {
        "title": "Check the size and sample",
        "body": "Review who falls in the segment. Make sure new subscribers and recent customers are not caught by a poorly set condition."
      },
      {
        "title": "Send a last chance message",
        "body": "Email the segment with a simple prompt to stay, such as a click to confirm interest. Keep it short and honest about what will happen otherwise."
      },
      {
        "title": "Create the engaged-again exit",
        "body": "Anyone who clicks or buys leaves the sunset path. Build a flow or segment so they return to normal sending."
      },
      {
        "title": "Suppress or exclude the rest",
        "body": "After the window, suppress those who stayed silent or exclude them from regular campaigns using a segment condition."
      },
      {
        "title": "Review on a schedule",
        "body": "Repeat the process regularly and watch bounce rate, complaints and placement over time to see the effect."
      }
    ],
    "pitfalls": [
      "Relying only on opens, which Apple privacy features can distort.",
      "Sunsetting new subscribers before they have had a fair chance to engage.",
      "Deleting profiles instead of suppressing, which loses history and consent records.",
      "Never revisiting the rule, so lists silently grow stale again."
    ],
    "checklist": [
      "Policy is written and agreed",
      "Segment excludes new subscribers and recent buyers",
      "Last chance email is sent and tracked",
      "Engaged-again profiles return to normal sending",
      "Remaining profiles are suppressed or excluded"
    ],
    "service": "klaviyo-email-marketing",
    "terms": [
      "sunset-policy",
      "suppression-list",
      "apple-mail-privacy-protection"
    ]
  },
  {
    "slug": "create-signup-form-klaviyo",
    "category": "lists",
    "task": "How to create a sign-up form in Klaviyo",
    "metaDescription": "Create a Klaviyo sign-up form for your online store: pick the type, set the offer and consent, target pages, connect a list and test on mobile.",
    "answer": "To create a sign-up form in Klaviyo, open the sign-up forms area, choose a form type such as a popup or embedded form, design it, connect it to a list, set when and where it shows, and publish. Test it on desktop and mobile before you rely on it.",
    "before": [
      "A destination list for new subscribers",
      "A clear reason to subscribe, such as an offer or early access",
      "Consent wording that fits your legal requirements",
      "A welcome flow ready to catch new signups"
    ],
    "steps": [
      {
        "title": "Open forms and pick a type",
        "body": "Go to the sign-up forms area and create a new form. Choose a popup, a flyout or an embedded form depending on where it should appear."
      },
      {
        "title": "Connect the list",
        "body": "Select the list that subscribers join. If you use double opt-in on that list, confirm the setting so the form behaves as you expect."
      },
      {
        "title": "Design the first step",
        "body": "Keep the first view simple: a short headline, one field for email and a clear button. Ask for more details only after the email is captured."
      },
      {
        "title": "Add consent and a success view",
        "body": "Include the required consent text and add a success message. If you give a code, show it here and also send it in the welcome email."
      },
      {
        "title": "Set the targeting",
        "body": "Choose pages, devices and timing. Avoid showing the form instantly on every page, and consider hiding it for existing subscribers."
      },
      {
        "title": "Check mobile",
        "body": "Preview on a phone size. Make sure the close button is easy to tap and the form does not block the whole screen."
      },
      {
        "title": "Publish and test",
        "body": "Make the form live, subscribe with a test address, and verify that the profile lands on the list and enters your welcome flow."
      }
    ],
    "pitfalls": [
      "Showing a full screen popup immediately, which hurts the shopping experience.",
      "Asking for many fields up front and losing signups.",
      "Leaving out consent wording or using text that does not match what you send.",
      "Not suppressing the form for people who have already subscribed."
    ],
    "checklist": [
      "Form is connected to the right list",
      "Consent text is present and accurate",
      "Mobile display is usable",
      "Test signup creates a profile and triggers the welcome flow",
      "Targeting excludes existing subscribers"
    ],
    "service": "klaviyo-email-marketing",
    "terms": [
      "signup-popup",
      "email-list-growth",
      "lead-magnet"
    ]
  },
  {
    "slug": "set-up-double-opt-in-klaviyo",
    "category": "lists",
    "task": "How to set up double opt-in in Klaviyo",
    "metaDescription": "Turn on double opt-in for a Klaviyo list: what it does, how to enable it, how to edit the confirmation email and how to test the full signup path.",
    "answer": "Double opt-in asks new subscribers to confirm their address by clicking a link before they join your list. In Klaviyo you enable the setting on the list, customise the confirmation email, and make sure forms and flows only treat confirmed people as subscribed.",
    "before": [
      "A decision on whether confirmation suits your list and compliance needs",
      "The list that will use double opt-in",
      "Brand-matching wording for the confirmation email",
      "Understanding of how your forms and welcome flow respond to confirmation"
    ],
    "steps": [
      {
        "title": "Decide where it applies",
        "body": "Choose which lists need confirmation. Some stores use it on every list, others only where list quality has been a problem or local rules favour it."
      },
      {
        "title": "Open the list settings",
        "body": "Go to the list, open its settings and switch the opt-in process to double opt-in. Save the change."
      },
      {
        "title": "Edit the confirmation email",
        "body": "Customise the message so it looks like your brand, explains why they are being asked, and has one obvious confirm button."
      },
      {
        "title": "Set the confirmed page",
        "body": "Make sure people land on a useful page after confirming, such as a thank you or a prompt to shop, not a blank screen."
      },
      {
        "title": "Align the welcome flow",
        "body": "Trigger the welcome flow from the list so it starts after confirmation. Check that the incentive is delivered once, not twice."
      },
      {
        "title": "Tell forms what to say",
        "body": "Update form success messages so they tell people to check their inbox and confirm. Mention the sender name they should look for."
      },
      {
        "title": "Test the full path",
        "body": "Sign up with a fresh address, find the confirmation email, click it, and verify the profile status and welcome email."
      }
    ],
    "pitfalls": [
      "Promising a discount on the form that only arrives after a confirmation people never complete.",
      "Leaving the default confirmation email unbranded and easy to ignore.",
      "Expecting confirmed status before the click, so flows fire too early.",
      "Putting the confirmation email in spam because the sending domain is not authenticated."
    ],
    "checklist": [
      "List setting shows double opt-in",
      "Confirmation email arrives promptly and looks right",
      "Clicking confirm marks the profile as subscribed",
      "Welcome flow starts after confirmation",
      "Form success message tells people to confirm"
    ],
    "service": "klaviyo-email-marketing",
    "terms": [
      "double-opt-in",
      "email-list-growth",
      "welcome-flow"
    ]
  },
  {
    "slug": "segment-engaged-subscribers-klaviyo",
    "category": "lists",
    "task": "How to segment engaged subscribers in Klaviyo",
    "metaDescription": "Build a Klaviyo segment of engaged subscribers using clicks, site activity and purchases, not just opens. Steps, caveats and a verification checklist.",
    "answer": "To segment engaged subscribers in Klaviyo, create a segment that includes people who can receive marketing and have recently clicked, been active on your site or placed an order. Combine several signals rather than opens alone, because open data is unreliable.",
    "before": [
      "A working definition of engaged for your store",
      "Tracking that records clicks and site activity",
      "Awareness that Apple Mail Privacy Protection inflates opens",
      "A use for the segment, such as core campaign sends or testing"
    ],
    "steps": [
      {
        "title": "Decide the time window",
        "body": "Choose how recent activity must be. A shorter window gives a tighter group; a longer one reaches more people. Match it to how often customers normally buy."
      },
      {
        "title": "Create a new segment",
        "body": "Open the segments area and start a new segment. Name it clearly, such as engaged recent, so teammates know its purpose."
      },
      {
        "title": "Require marketability",
        "body": "Add a condition that people can receive marketing, so unsubscribed or suppressed profiles never appear regardless of their activity."
      },
      {
        "title": "Add activity conditions",
        "body": "Use an OR group with clicked email, active on site and placed order inside your window. Joining these keeps buyers who do not click."
      },
      {
        "title": "Handle new subscribers",
        "body": "Add a rule that includes recently created profiles, so people are not left out before they have had a chance to engage."
      },
      {
        "title": "Check the preview",
        "body": "Review sample profiles and the size. If it is far smaller or larger than expected, adjust conditions or the time window."
      },
      {
        "title": "Use it deliberately",
        "body": "Apply the segment to campaigns that need strong placement, or use it as the base for testing. Keep a wider campaign for the rest."
      }
    ],
    "pitfalls": [
      "Using opens alone, which can count machine activity as engagement.",
      "Forgetting the marketable condition and emailing people who have opted out.",
      "Making the window so tight that real customers fall out.",
      "Treating the segment as permanent when it updates continuously as behaviour changes."
    ],
    "checklist": [
      "Segment name and definition are documented",
      "Marketable condition is present",
      "Activity conditions are grouped with OR logic",
      "New subscribers are accounted for",
      "Sample profiles match your expectations"
    ],
    "service": "klaviyo-email-marketing",
    "terms": [
      "engagement-segment",
      "email-segmentation",
      "apple-mail-privacy-protection"
    ]
  },
  {
    "slug": "set-up-spf-dkim-dmarc-klaviyo-sending-domain",
    "category": "deliverability",
    "task": "How to set up SPF, DKIM and DMARC for your Klaviyo sending domain",
    "metaDescription": "Authenticate your Klaviyo sending domain with SPF, DKIM and DMARC: what to gather, which DNS records to add, how to verify and what to avoid.",
    "answer": "To authenticate a Klaviyo sending domain, add the DNS records Klaviyo gives you for DKIM and SPF alignment, publish a DMARC policy, and verify them. Do this in your domain host, starting with a monitoring DMARC policy before moving to stricter settings.",
    "before": [
      "Access to your domain DNS settings or a person who has it",
      "A list of every service that sends email as your domain",
      "A real sender address on your own domain, not a free mailbox",
      "A mailbox to receive DMARC reports"
    ],
    "steps": [
      {
        "title": "List all your senders",
        "body": "Note every tool that sends mail from your domain, such as your mailbox provider, store platform and Klaviyo. Each one must be authenticated."
      },
      {
        "title": "Open the sending domain settings",
        "body": "In Klaviyo, go to the account settings for sending domains and start the dedicated sending domain setup. It shows the records you must add."
      },
      {
        "title": "Add the records in DNS",
        "body": "Copy each record exactly into your domain host, matching type, name and value. Do not retype by hand, and avoid creating duplicates of existing records."
      },
      {
        "title": "Handle SPF carefully",
        "body": "A domain should have only one SPF record. If you already have one, merge the new sender into it instead of adding a second."
      },
      {
        "title": "Publish a DMARC record",
        "body": "Add a DMARC record starting with a monitoring policy and a reporting address. Review the reports before tightening to quarantine or reject."
      },
      {
        "title": "Verify in Klaviyo",
        "body": "Return to the settings and run the verification check. DNS changes can take time to spread, so retry later if it does not pass at once."
      },
      {
        "title": "Send a test and read headers",
        "body": "Send to a mailbox you control and view the message details to confirm SPF, DKIM and DMARC all show a pass."
      }
    ],
    "pitfalls": [
      "Publishing two SPF records, which breaks SPF for the whole domain.",
      "Jumping straight to a strict DMARC policy before every sender is authenticated.",
      "Using a free mailbox address as the from address.",
      "Leaving DMARC reports unread so problems with other senders go unnoticed."
    ],
    "checklist": [
      "All sending services are listed and authenticated",
      "Only one SPF record exists",
      "Klaviyo shows the domain as verified",
      "DMARC record exists with a reporting address",
      "Test email headers show passes"
    ],
    "service": "klaviyo-email-marketing",
    "terms": [
      "spf-dkim-dmarc",
      "sending-domain",
      "dkim-selector"
    ]
  },
  {
    "slug": "ab-test-subject-line-klaviyo",
    "category": "campaigns",
    "task": "How to A/B test a subject line in Klaviyo",
    "metaDescription": "Run a clean subject line A/B test in a Klaviyo campaign: pick one variable, set the split and winner rule, then read results without fooling yourself.",
    "answer": "To A/B test a subject line in Klaviyo, create a campaign, turn on the A/B test option, write two subject lines that differ in one clear way, choose a test share and a winning metric, then send. Pick the winning metric before you launch, and prefer clicks or revenue over opens.",
    "before": [
      "A hypothesis, such as a benefit led line versus a curiosity led line",
      "An audience large enough to give a meaningful difference",
      "A winning metric chosen in advance",
      "A place to record the learning so it informs later sends"
    ],
    "steps": [
      {
        "title": "Write the hypothesis",
        "body": "State what you expect and why, such as a specific benefit performing better than a vague teaser. A test without a hypothesis rarely teaches anything."
      },
      {
        "title": "Create the campaign",
        "body": "Open Campaigns, create the email as normal, then switch on the A/B testing option for the subject line."
      },
      {
        "title": "Write two distinct variants",
        "body": "Change only one thing between them, such as length, tone or including the product name. Keep the preheader and content identical."
      },
      {
        "title": "Choose the test share and winner rule",
        "body": "Set what portion of the audience receives the test, how long to wait, and which metric decides the winner. Clicks or placed orders are more dependable than opens."
      },
      {
        "title": "Check the audience",
        "body": "Make sure the segment is large enough and healthy. Very small groups produce noise rather than answers."
      },
      {
        "title": "Schedule and let it run",
        "body": "Send or schedule, then leave the test alone until the wait time ends. Changing things midway invalidates the comparison."
      },
      {
        "title": "Record and reuse the learning",
        "body": "Note the result and the lesson in a shared log. Apply it to later subject lines and retest occasionally, as audiences change."
      }
    ],
    "pitfalls": [
      "Testing several changes at once, so you cannot say what caused the difference.",
      "Choosing a winner on opens when privacy features inflate that number.",
      "Declaring a winner from a very small audience.",
      "Never writing results down, so the team repeats the same test."
    ],
    "checklist": [
      "One variable differs between versions",
      "Winning metric was chosen before sending",
      "Audience size is reasonable for the test",
      "Content and send time are identical for both",
      "Result and takeaway are recorded"
    ],
    "service": "klaviyo-email-marketing",
    "terms": [
      "ab-testing",
      "click-through-rate",
      "apple-mail-privacy-protection"
    ]
  },
  {
    "slug": "add-dynamic-product-blocks-klaviyo",
    "category": "campaigns",
    "task": "How to add dynamic product blocks to Klaviyo emails",
    "metaDescription": "Add dynamic product blocks to Klaviyo emails for carts, browsing and recommendations. Learn how the data source works and how to test layouts.",
    "answer": "Dynamic product blocks pull product details into an email automatically instead of you pasting them by hand. In Klaviyo, drag a product block into the template, choose a source such as the abandoned cart items, viewed items or recommendations, and test the layout with different data.",
    "before": [
      "Your product catalog syncing correctly into Klaviyo",
      "Clean product titles, images and links in the store",
      "An email or flow whose trigger carries product data",
      "A design for how many items the layout should show"
    ],
    "steps": [
      {
        "title": "Confirm the catalog is synced",
        "body": "Check that products in Klaviyo show correct names, images, prices and links. Dynamic blocks can only be as good as the data feeding them."
      },
      {
        "title": "Open the email in the editor",
        "body": "Edit the email in a flow or campaign and drag the dynamic product block into the layout where you want products to appear."
      },
      {
        "title": "Choose the data source",
        "body": "Pick what the block displays: items from the triggering event such as a cart, recently viewed items, or recommendations. Match the source to the email purpose."
      },
      {
        "title": "Set the item count and layout",
        "body": "Choose how many products to show and in what arrangement. Fewer, larger items usually read better on a phone than a crowded grid."
      },
      {
        "title": "Style the elements",
        "body": "Adjust the title, image, price and button styling to match your brand. Make the button label specific, such as view item."
      },
      {
        "title": "Add a fallback",
        "body": "Decide what shows if the data is missing, such as best sellers. This stops recipients seeing an empty gap."
      },
      {
        "title": "Preview with real profiles",
        "body": "Use the preview option with different test profiles, including one with a single item and one with many, then send yourself a test."
      }
    ],
    "pitfalls": [
      "Leaving a placeholder in place and sending without checking real data.",
      "Syncing poor product images, which appear small or cropped in email.",
      "Showing too many items so the message loses focus.",
      "Skipping a fallback, leaving a blank block when the event has no products."
    ],
    "checklist": [
      "Product data in Klaviyo matches the store",
      "Block uses the correct data source for the email",
      "Layout works with one item and many items",
      "Fallback content is set",
      "Links go to the right product pages"
    ],
    "service": "email-flows",
    "terms": [
      "dynamic-content",
      "catalog-feed",
      "cross-sell-email"
    ]
  },
  {
    "slug": "fix-klaviyo-emails-going-to-spam",
    "category": "deliverability",
    "task": "Why your Klaviyo emails go to spam and how to fix it",
    "metaDescription": "Find out why ecommerce emails land in spam folders and how to fix authentication, list quality and content problems in Klaviyo step by step.",
    "answer": "Klaviyo emails land in spam when mailbox providers distrust the sender, usually because of weak domain authentication, complaints from unengaged contacts, or risky content. Fix authentication first, then tighten who you send to, then review the message itself.",
    "before": [
      "Admin access to Klaviyo and to your domain DNS settings",
      "A recent campaign that you know reached spam, plus a seed inbox at each major mailbox provider",
      "Access to your postmaster or complaint data if the provider offers it",
      "A clear idea of when the problem started"
    ],
    "terms": [
      "spam-complaint-rate",
      "sending-domain",
      "google-postmaster-tools"
    ],
    "steps": [
      {
        "title": "Confirm it is really spam",
        "body": "Send the same email to your own inboxes at several providers and note where it lands. If only one provider is a problem, the cause is likely reputation with that provider, not your template."
      },
      {
        "title": "Check domain authentication",
        "body": "Open your account settings and look at the sending domain setup. Make sure the domain is verified and that your DNS records are published and passing, then fix anything marked as missing."
      },
      {
        "title": "Send from your own domain",
        "body": "If you still send from a free mailbox address or a shared default, move to a branded address on a domain you control. Mailbox providers trust a consistent, authenticated brand sender more."
      },
      {
        "title": "Look at who you are mailing",
        "body": "Build a segment of contacts who never open or click and pause sending to them. Mailing people who ignore you is the fastest way to raise complaints and lose inbox placement."
      },
      {
        "title": "Review recent complaints and bounces",
        "body": "Check campaign reports for complaints, bounces and unsubscribes. A sudden jump after one send tells you which audience or message caused the damage."
      },
      {
        "title": "Clean up the content",
        "body": "Remove image-only layouts, broken links, misleading subject lines and shouting punctuation. Keep a sensible balance of text and images and include a visible unsubscribe link."
      },
      {
        "title": "Rebuild trust gradually",
        "body": "Send to your most engaged contacts first for a while, then widen the audience in steps as placement improves. Do not jump straight back to full volume."
      }
    ],
    "pitfalls": [
      "Changing several things at once, so you never learn which fix worked.",
      "Buying or importing a cold list while trying to repair reputation.",
      "Hiding the unsubscribe link, which pushes people to hit the spam button instead.",
      "Trusting open counts alone when privacy features inflate them."
    ],
    "checklist": [
      "Sending domain shows as verified and authenticated",
      "Test emails reach the inbox at each major provider",
      "Unengaged contacts are excluded from regular sends",
      "Complaint and bounce counts are falling send over send",
      "Every email has a working unsubscribe link"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "fix-klaviyo-flow-not-sending",
    "category": "flows",
    "task": "Why a Klaviyo flow is not sending and how to fix it",
    "metaDescription": "Troubleshoot a Klaviyo flow that is not sending: check status, trigger events, filters, smart sending and suppression, with a clear fix order.",
    "answer": "A Klaviyo flow usually fails to send because the flow is not live, the trigger event never arrives, or a filter or suppression rule removes the person. Work from the trigger outward and test with a real profile.",
    "before": [
      "Access to the flow and to a test customer profile",
      "Knowledge of which store action should trigger the flow",
      "Access to your ecommerce integration settings",
      "An example customer who should have received the email but did not"
    ],
    "terms": [
      "event-trigger",
      "flow-filter",
      "smart-sending"
    ],
    "steps": [
      {
        "title": "Check the flow status",
        "body": "Open Flows and confirm the flow is live and not in draft or manual mode. Also check that each email step is live, because a draft email inside a live flow will skip people."
      },
      {
        "title": "Confirm the trigger fires",
        "body": "Look at the profile of someone who should have entered and read their activity feed. If the trigger event is missing, the problem is the integration, not the flow."
      },
      {
        "title": "Check the integration",
        "body": "Open your integrations and verify the store connection is healthy. Reconnect if needed, then place a test order or action and see if the event appears."
      },
      {
        "title": "Review flow filters",
        "body": "Read the trigger filters and flow filters carefully. A filter that is too strict, such as requiring a property that is often empty, will quietly block most people."
      },
      {
        "title": "Look at the profile's status",
        "body": "Check whether the person is suppressed, unsubscribed or missing consent for email. These contacts are skipped even when everything else is correct."
      },
      {
        "title": "Check sending limits",
        "body": "Review smart sending and any other frequency settings. A recent message may have caused the system to skip this one, which is normal behaviour but surprising."
      },
      {
        "title": "Test end to end",
        "body": "Trigger the flow with a fresh test profile that meets every condition and watch it move through. Fix the first step where it stops, then retest."
      }
    ],
    "pitfalls": [
      "Editing a live flow so that people already inside it behave unexpectedly.",
      "Assuming a missing email means a bug when a filter did its job.",
      "Testing with an internal address that is suppressed from earlier sends.",
      "Forgetting that time delays mean the email may simply not be due yet."
    ],
    "checklist": [
      "Flow and every email step show as live",
      "Trigger event appears on the test profile",
      "Test profile passes all filters",
      "Test profile is subscribed and not suppressed",
      "Test email arrives after the expected delay"
    ],
    "service": "email-flows"
  },
  {
    "slug": "fix-duplicate-emails-from-overlapping-flows",
    "category": "flows",
    "task": "How to stop customers getting duplicate emails from overlapping flows in Klaviyo",
    "metaDescription": "Stop customers receiving similar emails from several Klaviyo flows at once by mapping triggers, adding filters and setting clear flow priority.",
    "answer": "Overlapping flows send duplicates when two or more share a similar audience or trigger. Map every live flow, decide which one owns each moment, and add filters so a person qualifies for only one at a time.",
    "before": [
      "A list of every live flow and campaign schedule",
      "Examples of customers who received duplicates",
      "Understanding of your customer journey from first visit to repeat purchase",
      "Edit access to the flows involved"
    ],
    "terms": [
      "flow-filter",
      "email-flow-vs-campaign",
      "smart-sending"
    ],
    "steps": [
      {
        "title": "List every live flow",
        "body": "Open Flows and write down each live flow with its trigger, audience and purpose. Include old flows that someone forgot to turn off."
      },
      {
        "title": "Find the overlaps",
        "body": "Compare triggers side by side. Browse, cart and checkout flows often overlap, and a welcome flow can collide with a post-purchase flow for new buyers."
      },
      {
        "title": "Decide who owns each moment",
        "body": "For every overlap choose the single flow that should message that person. The closer someone is to buying, the higher priority that flow should have."
      },
      {
        "title": "Add exit conditions",
        "body": "Use filters and conditions so people who have already purchased or entered a higher priority flow stop receiving earlier stage messages."
      },
      {
        "title": "Add exclusions between flows",
        "body": "Add a filter that excludes anyone currently in or recently through a competing flow, based on their message activity."
      },
      {
        "title": "Account for campaigns",
        "body": "Check your campaign calendar too. A promotional send landing on the same day as a flow email feels like duplication to the customer."
      },
      {
        "title": "Review frequency rules",
        "body": "Set sensible smart sending behaviour so a person is not messaged repeatedly in a short window, then monitor for skipped sends that you did not intend."
      }
    ],
    "pitfalls": [
      "Fixing one flow and leaving the other two that collide with it.",
      "Adding exclusions so tight that nobody enters the flow any more.",
      "Ignoring campaigns when auditing for overlap.",
      "Changing live flows without noting what was edited and why."
    ],
    "checklist": [
      "Each customer moment has one owning flow",
      "Purchasers exit pre-purchase flows",
      "Competing flows exclude each other",
      "Campaign calendar checked against flow timing",
      "Test profile receives only one email per moment"
    ],
    "service": "email-flows"
  },
  {
    "slug": "fix-missing-product-images-in-klaviyo-emails",
    "category": "flows",
    "task": "How to fix missing product images and broken feeds in Klaviyo emails",
    "metaDescription": "Fix broken product images and empty product blocks in Klaviyo emails by checking the catalog sync, image sizes, hosting and fallback content.",
    "answer": "Missing product images in Klaviyo emails come from a stalled catalog sync, product records without images, blocked image hosting or a block that has no fallback. Check the sync, then the product data, then the template.",
    "before": [
      "Access to Klaviyo and to your store admin",
      "One email where images are missing, plus a product that should appear",
      "Knowledge of where your product images are hosted",
      "A preview tool or test inboxes at several providers"
    ],
    "terms": [
      "catalog-feed",
      "dynamic-content",
      "dark-mode-email"
    ],
    "steps": [
      {
        "title": "Identify the pattern",
        "body": "Work out whether every image is missing, only products in a block, or only certain products. This tells you whether the cause is the template, the feed or the product itself."
      },
      {
        "title": "Check the catalog sync",
        "body": "Open your integration and check that the product catalog is syncing. If it is stalled or disconnected, reconnect it and wait for products to refresh."
      },
      {
        "title": "Inspect the product record",
        "body": "Open the missing product in your store admin and confirm it has a main image, is published and is active. Products without images will show blank."
      },
      {
        "title": "Check the image itself",
        "body": "Make sure the image address opens in a browser and is a standard web format. Very large files or images behind a login will fail to load in inboxes."
      },
      {
        "title": "Review the dynamic block",
        "body": "Open the email and check the product block settings, such as which items it pulls and how many. A rule that matches nothing will leave a gap."
      },
      {
        "title": "Add fallback content",
        "body": "Set fallback content or a static backup block so the email still looks complete if the dynamic part cannot load."
      },
      {
        "title": "Preview and test send",
        "body": "Send tests to real inboxes and view them in light and dark mode. Some clients block images by default, so add clear alt text."
      }
    ],
    "pitfalls": [
      "Relying on images alone to carry key information without alt text.",
      "Hosting images on a server that blocks outside requests.",
      "Sending a flow email without ever previewing a real product rendering.",
      "Forgetting that sold out or unpublished items may drop out of feeds."
    ],
    "checklist": [
      "Catalog sync is active and recent",
      "Products have a main image and are published",
      "Image addresses open in a browser",
      "Dynamic blocks have fallback content",
      "Test emails render correctly in light and dark mode"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "fix-low-click-rate-in-klaviyo-campaigns",
    "category": "campaigns",
    "task": "Why your Klaviyo campaign click rate is low and how to fix it",
    "metaDescription": "Raise a weak Klaviyo click rate with practical fixes to audience, offer, layout, button copy and testing for ecommerce campaigns.",
    "answer": "A low click rate usually means the email reaches the wrong people, offers nothing worth clicking, or hides the call to action. Fix targeting first, then simplify the message and make one clear action obvious. Expect gradual gains from several small improvements rather than one dramatic change.",
    "before": [
      "Reports for your last several campaigns",
      "The goal of each campaign, such as a product launch or sale",
      "Your most important product or collection pages",
      "Ability to run a split test"
    ],
    "terms": [
      "click-through-rate",
      "ab-testing",
      "preheader-text"
    ],
    "steps": [
      {
        "title": "Check you are measuring clicks properly",
        "body": "Compare clicks across several campaigns and note where the rate drops. Judge the trend, since one weak send may be an unusual offer."
      },
      {
        "title": "Tighten the audience",
        "body": "Send to engaged contacts or to people with interest in the product category. A smaller, relevant audience clicks more than a broad one."
      },
      {
        "title": "Sharpen the subject and preview",
        "body": "Make the subject and preheader promise the same thing the email delivers. Mismatched promises get opens but no clicks."
      },
      {
        "title": "Pick one main action",
        "body": "Choose a single goal for the email and make one button stand out. Too many links split attention and lower action."
      },
      {
        "title": "Put the action above the fold",
        "body": "Place the primary button and a strong product image near the top. Many readers on mobile never scroll to the bottom."
      },
      {
        "title": "Rewrite the button copy",
        "body": "Use specific wording that says what happens next, such as shop the collection, instead of vague words like click here."
      },
      {
        "title": "Test one change at a time",
        "body": "Run a split test on a single element, such as the hero image or button text, and apply what you learn to later sends."
      }
    ],
    "pitfalls": [
      "Judging results only on opens, which privacy features distort.",
      "Stuffing the email with many products and many calls to action.",
      "Linking to a generic home page instead of the exact product or collection.",
      "Testing several changes at once and learning nothing."
    ],
    "checklist": [
      "Audience matches the offer",
      "Subject and preheader match the content",
      "One primary call to action above the fold",
      "Links go to the exact destination page",
      "Test results recorded for future sends"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "reduce-unsubscribes-in-klaviyo",
    "category": "campaigns",
    "task": "How to reduce unsubscribes in Klaviyo without shrinking your list",
    "metaDescription": "Cut unsubscribes by sending fewer, more relevant emails: segment by engagement, manage frequency and offer a preference option in Klaviyo.",
    "answer": "Unsubscribes fall when people receive fewer, more relevant emails with clear expectations set at signup. Segment by engagement and interest, control frequency and give a gentler option than leaving. Treat the fix as ongoing list care rather than a one time project, and review the numbers after each major campaign.",
    "before": [
      "Unsubscribe figures by campaign and by flow",
      "A picture of how often you currently email",
      "Your signup forms and welcome email",
      "Basic interest or purchase data on your contacts"
    ],
    "terms": [
      "unsubscribe-rate",
      "engagement-segment",
      "one-click-unsubscribe"
    ],
    "steps": [
      {
        "title": "Find where unsubscribes cluster",
        "body": "Open your reports and look for the campaigns and flows with the most unsubscribes. The pattern points to the audience or message that is the problem."
      },
      {
        "title": "Set expectations at signup",
        "body": "Say clearly in the form and welcome email what people will receive and how often. People unsubscribe when reality differs from what they expected."
      },
      {
        "title": "Segment by engagement",
        "body": "Create groups for recent engagers, occasional engagers and the unresponsive. Send the full schedule only to the first group."
      },
      {
        "title": "Segment by interest",
        "body": "Use browsing and purchase data to send category content only to people who care about it, rather than every message to everyone."
      },
      {
        "title": "Control frequency",
        "body": "Review your campaign calendar and cap how often a person hears from you. Drop the weakest sends rather than the strongest."
      },
      {
        "title": "Offer a softer exit",
        "body": "Add a preference or pause option beside the unsubscribe link, such as fewer emails or only sale alerts."
      },
      {
        "title": "Respect the exit",
        "body": "Keep the unsubscribe link easy to find and honour requests straight away. A hard to find link drives spam complaints, which harm you more."
      }
    ],
    "pitfalls": [
      "Hiding the unsubscribe link to keep numbers down.",
      "Sending every promotion to the whole list.",
      "Treating all unsubscribes as bad when some are healthy list pruning.",
      "Raising frequency during sale periods with no plan to ease off after."
    ],
    "checklist": [
      "Signup form states what and how often",
      "Engagement segments exist and are used",
      "Weak campaigns are cut or targeted",
      "Preference option sits near the unsubscribe link",
      "Unsubscribe trend reviewed monthly"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "clean-klaviyo-list-of-bounces",
    "category": "lists",
    "task": "How to clean a Klaviyo list of bounces and bad addresses",
    "metaDescription": "Remove hard bounces, spam traps risk and dead addresses from your Klaviyo list to protect deliverability, with a safe step by step process.",
    "answer": "To clean a Klaviyo list of bounces, find contacts that hard bounced or never engage, suppress them and fix the signup sources that let bad addresses in. Do this regularly so reputation stays healthy. A smaller, healthier list almost always performs better than a large list full of dead addresses, so do not fear the shrink.",
    "before": [
      "Access to profiles, segments and campaign reports",
      "A list of your signup sources such as forms, checkout and imports",
      "An understanding of what counts as inactive for your business",
      "A backup export of the list before big changes"
    ],
    "terms": [
      "hard-vs-soft-bounce",
      "bounce-rate",
      "suppression-list"
    ],
    "steps": [
      {
        "title": "Export a backup",
        "body": "Before changing anything, export the list so you can restore data if a segment turns out to be wrong."
      },
      {
        "title": "Review your bounce data",
        "body": "Open campaign reports and note bounces. Separate hard bounces, which are permanent, from soft bounces, which are temporary."
      },
      {
        "title": "Confirm hard bounces are suppressed",
        "body": "Check that addresses that hard bounced are suppressed and no longer mailed. Suppress any that remain active."
      },
      {
        "title": "Segment repeated soft bounces",
        "body": "Build a segment of contacts who soft bounced across several sends. Treat repeat offenders as likely dead mailboxes."
      },
      {
        "title": "Segment long term inactive contacts",
        "body": "Create a group that has not opened or clicked for a long period and has not bought. Run a final win back, then suppress those who stay silent."
      },
      {
        "title": "Look for suspicious addresses",
        "body": "Scan for obvious typos and role addresses, which signal poor capture. Remove them rather than risk hitting spam traps."
      },
      {
        "title": "Fix the source",
        "body": "Add double opt in or address checks at the signup form and checkout where bad addresses entered. Cleaning without fixing the source means doing it again."
      }
    ],
    "pitfalls": [
      "Deleting contacts instead of suppressing them, which can let them return by import.",
      "Importing old lists from other tools without any checks.",
      "Cleaning once and never again.",
      "Removing customers who buy but rarely open because of privacy features."
    ],
    "checklist": [
      "Backup export saved",
      "Hard bounces are suppressed",
      "Repeat soft bounces are segmented and handled",
      "Inactive contacts had a final win back",
      "Signup sources have safeguards against bad addresses"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "warm-up-new-sending-domain-in-klaviyo",
    "category": "deliverability",
    "task": "How to warm up a new sending domain in Klaviyo",
    "metaDescription": "Build sender reputation on a new Klaviyo sending domain by authenticating it, starting with engaged contacts and increasing volume gradually.",
    "answer": "Warming up a new sending domain means building trust with mailbox providers by sending small volumes to your most engaged contacts first, then growing volume steadily. Authenticate the domain before the first send. Patience matters here, because rushing the process is the most common reason new domains struggle with inbox placement.",
    "before": [
      "Access to your domain DNS settings",
      "A segment of your most engaged contacts",
      "A planned schedule of useful emails",
      "A way to watch bounces, complaints and inbox placement"
    ],
    "terms": [
      "ip-warming",
      "sending-domain",
      "engagement-segment"
    ],
    "steps": [
      {
        "title": "Set up the domain properly",
        "body": "Add the new domain in your account settings and publish the DNS records Klaviyo asks for. Wait until the domain shows as verified before sending."
      },
      {
        "title": "Pick a warm-up audience",
        "body": "Build a segment of recent buyers and frequent openers or clickers. These people are most likely to engage, which tells providers you are a good sender."
      },
      {
        "title": "Start with small sends",
        "body": "Send to a small slice of that audience first. Use useful content such as order related messages or a strong best seller email."
      },
      {
        "title": "Increase volume in steps",
        "body": "Grow the audience gradually over several weeks, widening to less engaged groups only when results stay healthy."
      },
      {
        "title": "Keep a steady rhythm",
        "body": "Send on a regular pattern rather than long gaps followed by a spike. Consistency helps providers learn your normal behaviour."
      },
      {
        "title": "Watch the signals",
        "body": "Check bounces, complaints and unsubscribes after each send. If they rise, pause the increase and go back to your best contacts."
      },
      {
        "title": "Move flows over carefully",
        "body": "Switch automated flows to the new domain once campaign sends are stable, so transactional style messages build reputation too."
      }
    ],
    "pitfalls": [
      "Sending a full list blast on day one.",
      "Warming only with discount heavy emails that trigger complaints.",
      "Skipping authentication because the sends are small.",
      "Switching domains repeatedly, which resets any progress."
    ],
    "checklist": [
      "New domain is verified and authenticated",
      "Warm-up segment contains only engaged contacts",
      "Volume increases in small steps",
      "Complaint and bounce counts stay low",
      "Flows moved only after campaigns look stable"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "set-up-custom-tracking-domain-in-klaviyo",
    "category": "deliverability",
    "task": "How to set up a custom tracking domain in Klaviyo",
    "metaDescription": "Set up a branded tracking domain in Klaviyo so links and images use your own domain, improving trust and deliverability for ecommerce email.",
    "answer": "A custom tracking domain makes the links and images in your emails use your own brand domain instead of a shared one. You create a subdomain, add the DNS records Klaviyo provides and wait for verification. This is a one time setup that is worth doing early, and it should be tested once it is verified.",
    "before": [
      "Admin access to Klaviyo",
      "Access to your domain DNS provider",
      "A subdomain name in mind that matches your brand",
      "A note of existing DNS records so nothing is overwritten"
    ],
    "terms": [
      "sending-domain",
      "dkim-selector",
      "utm-tagging"
    ],
    "steps": [
      {
        "title": "Choose the subdomain",
        "body": "Pick a short subdomain of your main site that you will use only for email tracking. Keep it simple and brand related."
      },
      {
        "title": "Open the domain settings",
        "body": "In your account settings, find the area for sending and tracking domains and start the custom tracking domain setup."
      },
      {
        "title": "Copy the DNS record",
        "body": "Klaviyo will show the record you need to add. Copy it exactly, including the record type and value."
      },
      {
        "title": "Add it at your DNS provider",
        "body": "Log in to your DNS provider and create the record for your chosen subdomain. Avoid changing any existing records."
      },
      {
        "title": "Wait and verify",
        "body": "DNS changes can take time to spread. Return to Klaviyo and run the verification check, then retry later if it has not passed yet."
      },
      {
        "title": "Confirm links use the new domain",
        "body": "Send a test email and hover over a link. It should now show your branded subdomain rather than a shared address."
      },
      {
        "title": "Check your own tracking",
        "body": "Make sure UTM tagging and your analytics still record email traffic correctly after the change."
      }
    ],
    "pitfalls": [
      "Overwriting an existing DNS record by accident.",
      "Entering the record with a typo or extra characters.",
      "Deciding the setup failed after a short wait, then making changes mid-propagation.",
      "Forgetting to test links and images after the switch."
    ],
    "checklist": [
      "DNS record published at the provider",
      "Klaviyo shows the domain as verified",
      "Test email links use the branded subdomain",
      "Images load correctly in the test",
      "Analytics still tracks email visits"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "exclude-recent-buyers-from-klaviyo-campaigns",
    "category": "campaigns",
    "task": "How to exclude recent buyers from a Klaviyo campaign",
    "metaDescription": "Stop sending sale and promo campaigns to people who just bought by excluding recent purchasers in Klaviyo with a simple reusable segment.",
    "answer": "To exclude recent buyers from a Klaviyo campaign, build a segment of people who placed an order in a chosen recent window and add it to the campaign exclusions. Reuse the same segment for every promotion. This protects customer trust and margin, and it keeps promotional emails relevant to people who are still in the market.",
    "before": [
      "A connected store that sends order events to Klaviyo",
      "A decision on how long counts as recent for your products",
      "The campaign you plan to send",
      "A list or segment of your target audience"
    ],
    "terms": [
      "klaviyo-metric",
      "smart-sending",
      "post-purchase-flow"
    ],
    "steps": [
      {
        "title": "Decide the window",
        "body": "Choose how many days after purchase a customer should be left out of promotions. A fast moving product needs a shorter window than a considered purchase."
      },
      {
        "title": "Create a recent buyers segment",
        "body": "Open Lists and Segments and build a segment based on the placed order event within your chosen window."
      },
      {
        "title": "Check the segment members",
        "body": "Look through a few profiles and confirm the people shown really did buy recently. Fix the definition if anything looks off."
      },
      {
        "title": "Open the campaign",
        "body": "Start or open your campaign and choose the audience you want to send to as normal."
      },
      {
        "title": "Add the exclusion",
        "body": "In the audience settings, add the recent buyers segment as an exclusion so those people are removed from the send."
      },
      {
        "title": "Review the count",
        "body": "Compare the audience size before and after the exclusion. A sensible drop confirms it is working."
      },
      {
        "title": "Give buyers their own messages",
        "body": "Let your post purchase flow handle recent buyers instead, with care content, reviews and cross sells rather than a discount that feels unfair."
      }
    ],
    "pitfalls": [
      "Sending a sale to someone who paid full price yesterday and damaging trust.",
      "Setting the window so wide that you silence loyal buyers for too long.",
      "Forgetting the exclusion on one campaign out of many.",
      "Using a metric that does not match how your store records orders."
    ],
    "checklist": [
      "Recent buyers segment exists and is tested",
      "Segment is added as a campaign exclusion",
      "Audience count drops as expected",
      "Post purchase flow covers excluded customers",
      "Same exclusion reused for future promotions"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "build-vip-segment-in-klaviyo",
    "category": "lists",
    "task": "How to build a VIP customer segment in Klaviyo",
    "metaDescription": "Create a VIP segment in Klaviyo from order count, spend and recency so your best ecommerce customers get early access and better treatment.",
    "answer": "A VIP segment groups your best customers using order history, total spend and recent activity. Define the rules, build the segment in Klaviyo and use it for early access, thank yous and exclusions from discounts. Keep the group small enough that the treatment feels special, and make sure someone actually owns the programme afterwards.",
    "before": [
      "Order data syncing into Klaviyo from your store",
      "A view of what your best customers look like",
      "A decision on how many VIPs you want to treat well",
      "Ideas for rewards that are not just discounts"
    ],
    "terms": [
      "vip-segment",
      "rfm-segmentation",
      "customer-lifetime-value"
    ],
    "steps": [
      {
        "title": "Define a VIP",
        "body": "Decide the traits that matter, such as number of orders, total spend or both. Include recency so lapsed customers do not stay VIP forever."
      },
      {
        "title": "Look at the data first",
        "body": "Review your customers and see where natural breaks appear. Set rules that capture a small, valuable group instead of a large one."
      },
      {
        "title": "Create the segment",
        "body": "Open Lists and Segments and create a segment with conditions for orders, spend and recent purchase. Combine them with the right logic."
      },
      {
        "title": "Check the profiles",
        "body": "Open several profiles and confirm they match your idea of a VIP. Adjust thresholds until the group feels right."
      },
      {
        "title": "Plan the experience",
        "body": "Decide what VIPs get, such as early access to launches, personal thank you notes or free shipping, rather than steeper discounts."
      },
      {
        "title": "Use the segment in campaigns",
        "body": "Send early access emails to this segment first, and exclude it from broad discount campaigns where it makes sense."
      },
      {
        "title": "Review regularly",
        "body": "Revisit the rules each season. Because segments update on their own, check that the group stays the right size and quality."
      }
    ],
    "pitfalls": [
      "Making the rules so loose that VIP means nothing.",
      "Rewarding only with discounts and eroding margin.",
      "Never checking recency, so inactive buyers keep getting VIP treatment.",
      "Building the segment and then never actually using it."
    ],
    "checklist": [
      "Rules cover orders, spend and recency",
      "Sample profiles match your VIP idea",
      "Segment size is small but meaningful",
      "At least one VIP only campaign is planned",
      "Rules are reviewed every season"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "read-klaviyo-flow-performance-report",
    "category": "flows",
    "task": "How to read a Klaviyo flow performance report",
    "metaDescription": "Learn to read a Klaviyo flow report: compare steps, judge revenue per recipient, spot weak emails and decide what to test next.",
    "answer": "To read a Klaviyo flow performance report, look at each email step on its own, focus on revenue per recipient and clicks rather than opens, and compare steps to find the weakest link. Then decide one test to run.",
    "before": [
      "A live flow that has sent for a reasonable time",
      "Access to Klaviyo analytics",
      "Knowledge of the flow's goal, such as recovering carts",
      "A way to note changes and their dates"
    ],
    "terms": [
      "revenue-per-recipient",
      "attributed-revenue",
      "holdout-group"
    ],
    "steps": [
      {
        "title": "Open the flow analytics",
        "body": "Go to Flows, pick the flow and open its performance view. Choose a time range long enough to include a fair amount of sends."
      },
      {
        "title": "Read the flow as a whole",
        "body": "Look at total attributed revenue and the number of recipients. This tells you how much the flow matters before you dig into detail."
      },
      {
        "title": "Compare each email step",
        "body": "Look at clicks, orders and revenue per recipient for every email. Identify which step carries the most value and which does the least."
      },
      {
        "title": "Treat opens carefully",
        "body": "Privacy features inflate opens, so lean on clicks and revenue to judge the real effect of each message."
      },
      {
        "title": "Check timing and drop off",
        "body": "See how many people reach each later step. If a delay is too long, many will have bought or lost interest before the email arrives."
      },
      {
        "title": "Understand attribution",
        "body": "Remember that attributed revenue counts orders that followed a message, not necessarily orders caused by it. A holdout group gives a fairer view."
      },
      {
        "title": "Pick one thing to test",
        "body": "Choose the weakest step and change one element, such as the subject, offer or delay. Record the date so you can compare afterwards."
      }
    ],
    "pitfalls": [
      "Judging a flow after only a handful of sends.",
      "Celebrating attributed revenue that would have happened anyway.",
      "Changing many steps at once and losing track of what worked.",
      "Comparing flows with very different audiences as if they were equal."
    ],
    "checklist": [
      "Time range includes enough sends",
      "Each step reviewed on clicks and revenue",
      "Opens treated as a rough signal only",
      "Delays and drop off checked",
      "One test chosen and dated"
    ],
    "service": "email-flows"
  }
];

export const getHowTo = (slug: string) => HOWTOS.find((h) => h.slug === slug);

/** The next three tasks in the same category, wrapping round, so every page gets at least three inbound links from siblings. */
export function howToSiblings(slug: string) {
  const h = getHowTo(slug);
  if (!h) return [];
  const pool = HOWTOS.filter((x) => x.category === h.category);
  const i = pool.findIndex((x) => x.slug === slug);
  return [1, 2, 3].map((n) => pool[(i + n) % pool.length]).filter((x, k, arr) => x.slug !== slug && arr.findIndex((y) => y.slug === x.slug) === k);
}
