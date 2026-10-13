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
  },
  {
    "slug": "set-up-birthday-flow-klaviyo",
    "category": "flows",
    "task": "How to set up a birthday flow in Klaviyo",
    "metaDescription": "Set up a Klaviyo birthday flow for your online store: collect birthdays, trigger on a date property, write the message and test it before going live.",
    "answer": "A birthday flow sends a personal message on or near a customer's birthday. In Klaviyo you collect a birthday into a profile property, build a flow triggered by a date based property, add one or two emails with a small gift or a simple greeting, and test it with a dummy profile before setting it live.",
    "before": [
      "A way to collect birthdays, such as a signup form field or a preference page",
      "Consent from each person to receive marketing email",
      "A decision on the gift, such as a code, free shipping or just a greeting",
      "A short list of favourite products to feature"
    ],
    "steps": [
      {
        "title": "Collect the birthday properly",
        "body": "Add a birthday field to a signup form or a post-signup preference form. Make it optional and explain why you are asking, so people are happy to share it."
      },
      {
        "title": "Check the property format",
        "body": "Open a test profile and confirm the birthday is stored as a date property, not plain text. A flow cannot trigger on a date if the value is stored as a string."
      },
      {
        "title": "Create a date triggered flow",
        "body": "In Flows, choose a flow triggered by a date property and select the birthday field. Decide whether it fires on the day or a few days before."
      },
      {
        "title": "Add a flow filter",
        "body": "Limit the flow to people who can receive marketing email and exclude suppressed profiles. Consider excluding anyone who has not engaged in a long time."
      },
      {
        "title": "Write one warm email",
        "body": "Keep the first message short and personal, with a clear greeting, one gift and one button. A second email a few days later can remind people the gift expires."
      },
      {
        "title": "Set the gift rules",
        "body": "Create a code that is limited to one use per person and expires after a sensible window. Tell people the end date inside the email itself."
      },
      {
        "title": "Test with a dummy profile",
        "body": "Set a test profile birthday to a date that triggers the flow soon, confirm it enters, and read the email on a phone before you set it live."
      }
    ],
    "pitfalls": [
      "Asking for a birthday with no reason given, so people leave the field blank or enter false dates.",
      "Storing the value as text, so the trigger never fires.",
      "Using a gift code that anyone can share, with no use limit or end date.",
      "Sending to profiles that have since unsubscribed because the filter was missed."
    ],
    "checklist": [
      "Birthday property shows as a date on a test profile",
      "Test profile enters the flow on the right day",
      "Gift code works once and expires as stated",
      "Suppressed profiles are excluded",
      "Email status is live, not draft"
    ],
    "service": "email-flows",
    "terms": [
      "birthday-and-anniversary-flow",
      "flow-filter",
      "event-trigger"
    ]
  },
  {
    "slug": "set-up-replenishment-flow-klaviyo",
    "category": "flows",
    "task": "How to set up a replenishment flow in Klaviyo",
    "metaDescription": "Build a Klaviyo replenishment flow for products people run out of: pick the reorder window, trigger on purchase, add a reminder and exclude repeat buyers.",
    "answer": "A replenishment flow reminds customers to reorder a product around the time they are likely to run out. In Klaviyo you trigger on placed order, split by the product bought, wait roughly as long as the product lasts, then send a reminder with a direct reorder link.",
    "before": [
      "A list of products that are used up and bought again",
      "A rough idea of how long each product lasts",
      "Order events syncing from your store into Klaviyo",
      "Product pages that make reordering quick"
    ],
    "steps": [
      {
        "title": "Pick the right products",
        "body": "Choose items people genuinely reuse, such as skincare, coffee or supplements. A reminder for a one-off item feels odd and trains people to ignore you."
      },
      {
        "title": "Estimate the reorder window",
        "body": "Look at the gap between first and second orders in your own data, or use the pack size and normal usage. Aim to reach people a little before they run out."
      },
      {
        "title": "Trigger on placed order",
        "body": "Create a flow on the placed order metric. This is the event that starts the clock for every purchase of the product."
      },
      {
        "title": "Split by product",
        "body": "Add a conditional split on items in the order, so each product or collection gets its own wait time and message."
      },
      {
        "title": "Add the delay",
        "body": "Insert a time delay that matches the window for that branch. Longer lasting products get a longer wait than small ones."
      },
      {
        "title": "Send a reminder with a reorder link",
        "body": "Write a short email that names the product, links straight to it and makes reordering one click. A subscription mention suits products with steady usage."
      },
      {
        "title": "Stop the flow when they reorder",
        "body": "Add a flow filter or split so anyone who bought the product again during the delay is removed and does not get a pointless reminder."
      }
    ],
    "pitfalls": [
      "Using one delay for every product, so some reminders arrive far too early or late.",
      "Reminding people who have already reordered.",
      "Including items that are not repeat purchases.",
      "Linking to the homepage instead of the product."
    ],
    "checklist": [
      "Each product branch has its own delay",
      "Repeat buyers are filtered out",
      "Reminder links go to the exact product",
      "Test order enters the correct branch",
      "All emails are live"
    ],
    "service": "email-flows",
    "terms": [
      "replenishment-flow",
      "conditional-split",
      "flow-filter"
    ]
  },
  {
    "slug": "set-up-customer-thank-you-flow-klaviyo",
    "category": "flows",
    "task": "How to set up a customer thank-you flow in Klaviyo",
    "metaDescription": "Create a Klaviyo thank-you flow that follows up first-time buyers: trigger on first order, send a personal note, ask for feedback and avoid hard selling.",
    "answer": "A thank-you flow is a short, warm follow up sent after a customer places their first order. In Klaviyo you trigger on placed order, filter to first-time buyers, wait for the order to ship, and send a plain thank you that invites a reply or feedback instead of pushing another sale.",
    "before": [
      "Order events syncing into Klaviyo",
      "A real reply to address that someone reads",
      "A short note in your brand voice, ideally from a named person",
      "A decision on whether to include a question or survey link"
    ],
    "steps": [
      {
        "title": "Trigger on placed order",
        "body": "Create a flow on the placed order metric so every new order starts the sequence."
      },
      {
        "title": "Limit to first-time buyers",
        "body": "Add a flow filter for people with exactly one order. Returning customers can get a different, shorter note or be excluded."
      },
      {
        "title": "Add a short delay",
        "body": "Wait a day or two so the message does not collide with the order confirmation, which is a transactional email sent by your store."
      },
      {
        "title": "Write the note",
        "body": "Open with thanks, say what happens next in a sentence, and keep the tone personal. Use one person as the sender if you can."
      },
      {
        "title": "Invite a reply",
        "body": "Ask a single easy question, such as what made them choose you. Replies teach you why people buy and tell mail providers the sender is wanted."
      },
      {
        "title": "Keep selling light",
        "body": "Add at most one soft link, such as care tips or how to reach support. Save product recommendations for the post-purchase flow."
      },
      {
        "title": "Check against other flows",
        "body": "Review timing alongside post-purchase and review flows so a new buyer does not receive three messages in one day."
      }
    ],
    "pitfalls": [
      "Repeating the order confirmation instead of adding something new.",
      "Sending from a no-reply address, which blocks the replies you want.",
      "Heavy discounting that teaches customers to wait for offers.",
      "Overlapping with the post-purchase flow on the same day."
    ],
    "checklist": [
      "Only first-time buyers enter",
      "Reply address is monitored",
      "Timing does not clash with other flows",
      "Links and images load on mobile",
      "Email status is live"
    ],
    "service": "email-flows",
    "terms": [
      "post-purchase-flow",
      "flow-filter",
      "transactional-vs-marketing-email"
    ]
  },
  {
    "slug": "create-review-request-flow-klaviyo",
    "category": "flows",
    "task": "How to create a review request flow in Klaviyo",
    "metaDescription": "Create a Klaviyo review request flow: trigger on fulfilled orders, time the ask after delivery, link to your review app and avoid pestering buyers.",
    "answer": "A review request flow asks customers for a product review after they have had time to use what they bought. In Klaviyo you trigger on a fulfilled order or a review app event, wait until delivery plus usage time, send one clear request, and add a single reminder for people who have not responded.",
    "before": [
      "A review platform connected to your store, or a simple review page",
      "Fulfilment or delivery events available in Klaviyo",
      "An idea of how long customers need to try the product",
      "A plain, honest ask with no reward tied to a positive score"
    ],
    "steps": [
      {
        "title": "Choose the trigger",
        "body": "Use the fulfilled order metric if your store sends it, since it is closer to delivery than the placed order event."
      },
      {
        "title": "Time the ask",
        "body": "Add a delay long enough for the parcel to arrive and the product to be used. Fast use items need days, slower ones need weeks."
      },
      {
        "title": "Skip people who already reviewed",
        "body": "Add a flow filter on your review app event, so anyone who has left a review never receives the request."
      },
      {
        "title": "Write a simple request",
        "body": "Name the product, say why the review helps other shoppers, and give one large button to the review form."
      },
      {
        "title": "Make leaving a review easy",
        "body": "Link to a page that works well on a phone and does not need an account. Fewer steps means more responses."
      },
      {
        "title": "Add one reminder",
        "body": "Wait a week and send a shorter second message to people who have not reviewed. Stop there rather than chasing."
      },
      {
        "title": "Check support issues first",
        "body": "Exclude customers with an open complaint or a return, so the request does not land on someone unhappy."
      }
    ],
    "pitfalls": [
      "Asking before the product has arrived.",
      "Offering rewards only for positive reviews, which breaks most review platform rules.",
      "Sending requests for every item in a large order separately.",
      "Forgetting to exclude people who already reviewed."
    ],
    "checklist": [
      "Trigger fires from a test fulfilled order",
      "Delay matches delivery and usage time",
      "Reviewers are filtered out",
      "Review form works on a phone",
      "Both emails are live"
    ],
    "service": "email-flows",
    "terms": [
      "post-purchase-flow",
      "flow-filter",
      "event-trigger"
    ]
  },
  {
    "slug": "build-cross-sell-flow-klaviyo",
    "category": "flows",
    "task": "How to build a cross-sell flow in Klaviyo",
    "metaDescription": "Build a Klaviyo cross-sell flow that suggests complementary products after a purchase: trigger, product logic, timing and exits so it feels helpful.",
    "answer": "A cross-sell flow recommends products that go well with what a customer already bought. In Klaviyo you trigger on placed order, split by the item or collection purchased, wait a sensible time, and send products that complement it, not duplicate it.",
    "before": [
      "A clear map of which products pair with which",
      "Order and product data syncing into Klaviyo",
      "A catalog with working images and links",
      "A view of what other post-purchase messages already send"
    ],
    "steps": [
      {
        "title": "Map the pairings",
        "body": "List the main products or collections and the items that genuinely suit them, such as a case with a phone or a conditioner with a shampoo."
      },
      {
        "title": "Trigger on placed order",
        "body": "Build the flow on the placed order metric so each purchase starts a cross-sell path."
      },
      {
        "title": "Split by what was bought",
        "body": "Use a conditional split on the ordered item or collection, sending each group to its own message and product picks."
      },
      {
        "title": "Wait until it feels natural",
        "body": "Delay for several days so the customer has received the order and had a chance to try it before you suggest more."
      },
      {
        "title": "Build the product block",
        "body": "Use a dynamic product block set to your chosen items, or a manual block for fixed pairings. Show two to four products, not a whole catalog."
      },
      {
        "title": "Explain the link in a line",
        "body": "Say why the items go together. A one line reason does more than a grid of products with no context."
      },
      {
        "title": "Exit buyers of the suggested item",
        "body": "Add a filter so anyone who already bought the pairing is removed, and stop the flow if they place another order."
      }
    ],
    "pitfalls": [
      "Recommending the exact product they just bought.",
      "Showing too many items, which hides the best match.",
      "Using one generic message for every branch.",
      "Running at the same time as post-purchase and review flows."
    ],
    "checklist": [
      "Each branch shows items that pair with the purchase",
      "Already purchased items are excluded",
      "Timing is separated from other post-purchase emails",
      "Product images and links work",
      "Flow status is live"
    ],
    "service": "email-flows",
    "terms": [
      "cross-sell-email",
      "conditional-split",
      "dynamic-content"
    ]
  },
  {
    "slug": "set-up-smart-sending-klaviyo",
    "category": "campaigns",
    "task": "How to set up smart sending correctly in Klaviyo",
    "metaDescription": "Set up Klaviyo smart sending correctly: how the recent send window works, when to switch it on or off, and the checks that stop missed sends.",
    "answer": "Smart sending skips a recipient if they were sent a marketing message within a recent window, so people are not hit with several emails close together. In Klaviyo it is a setting on each campaign and flow email. Keep it on for most marketing, and switch it off only for messages that must always reach everyone.",
    "before": [
      "A clear view of how often you send campaigns and flows",
      "A list of messages that must not be skipped, such as an urgent notice",
      "Access to campaign and flow settings",
      "An understanding of the window length set on your account"
    ],
    "steps": [
      {
        "title": "Learn what the setting does",
        "body": "Smart sending checks whether a profile received a marketing message in the recent window and skips them if so. It does not delay the message, it skips it."
      },
      {
        "title": "Check the campaign default",
        "body": "Open a draft campaign and find the smart sending option in the settings or sending options. Note whether it is on by default."
      },
      {
        "title": "Check each flow email",
        "body": "Open the settings on flow emails and confirm the choice. Flow emails can be skipped too, which surprises people when flow counts look low."
      },
      {
        "title": "Decide per message type",
        "body": "Leave it on for promotions and regular campaigns. Consider turning it off for time critical messages, but only where the content really needs to reach everyone."
      },
      {
        "title": "Review skipped counts",
        "body": "After a send, read the report or message details for skipped recipients. A large number means your sending is too dense or flows overlap."
      },
      {
        "title": "Fix the cause of heavy skipping",
        "body": "Space out campaigns, remove flow overlap or trim the audience, instead of turning smart sending off to hide the problem."
      },
      {
        "title": "Document the rule",
        "body": "Write down which message types have it off and why, so the next person editing a flow does not change it by accident."
      }
    ],
    "pitfalls": [
      "Turning it off globally and doubling up sends to the same people.",
      "Expecting skipped people to get the message later.",
      "Ignoring skipped counts that point to overlapping flows.",
      "Leaving it off on a flow email by mistake."
    ],
    "checklist": [
      "Setting checked on campaigns and on each flow email",
      "Messages with it off are listed and justified",
      "Skipped counts read after each send",
      "Send spacing reviewed if skips are high",
      "Rule documented for the team"
    ],
    "service": "klaviyo-email-marketing",
    "terms": [
      "smart-sending",
      "email-flow-vs-campaign",
      "unsubscribe-rate"
    ]
  },
  {
    "slug": "create-utm-tagged-campaign-klaviyo",
    "category": "campaigns",
    "task": "How to create a UTM-tagged campaign in Klaviyo",
    "metaDescription": "Create a UTM-tagged Klaviyo campaign so sessions and sales show up cleanly in your analytics: naming rules, tracking settings and a test before you send.",
    "answer": "UTM tagging adds parameters to your email links so your web analytics can tell which campaign sent a visit. In Klaviyo you turn on link tracking in the campaign, set consistent source, medium and campaign values, send a test, and confirm the parameters appear on the landing page address.",
    "before": [
      "A naming convention for campaign names",
      "Access to your web analytics to check results",
      "A decision on which parameters are fixed and which change",
      "A test address that can click links"
    ],
    "steps": [
      {
        "title": "Agree the naming rules",
        "body": "Decide on lowercase, hyphens instead of spaces and a clear pattern for campaign names, so reports do not split one campaign across several spellings."
      },
      {
        "title": "Open the campaign tracking settings",
        "body": "In the campaign setup, find the tracking options and enable UTM parameters. Klaviyo can add them automatically to your links."
      },
      {
        "title": "Set source and medium",
        "body": "Use a fixed source such as the platform name and a fixed medium such as email, matching how your analytics already groups traffic."
      },
      {
        "title": "Set the campaign value",
        "body": "Use the campaign name or a short code so each send is distinguishable. Add content or term values only if you will actually report on them."
      },
      {
        "title": "Check custom links",
        "body": "If any links already contain parameters, or point to a different domain you do not own, review whether they should be tagged or left alone."
      },
      {
        "title": "Send a test and click through",
        "body": "Send a test, click each main link and read the address in the browser. Confirm every parameter is present and spelled as planned."
      },
      {
        "title": "Verify in analytics",
        "body": "After the real send, look for the campaign in your analytics acquisition view and compare visits with clicks in Klaviyo, expecting small differences."
      }
    ],
    "pitfalls": [
      "Mixing capital and lowercase names so one send appears as two campaigns.",
      "Changing the source value between sends.",
      "Tagging links to external sites you do not own.",
      "Expecting analytics sessions to match Klaviyo clicks exactly."
    ],
    "checklist": [
      "Naming convention written down",
      "UTM tracking enabled on the campaign",
      "Test link shows every parameter",
      "Campaign appears in analytics after send",
      "Source and medium match other channels"
    ],
    "service": "klaviyo-email-marketing",
    "terms": [
      "utm-tagging",
      "attributed-revenue",
      "klaviyo-metric"
    ]
  },
  {
    "slug": "build-seasonal-campaign-segment-klaviyo",
    "category": "campaigns",
    "task": "How to build a seasonal campaign segment in Klaviyo",
    "metaDescription": "Build a seasonal segment in Klaviyo for a back-to-school or holiday campaign: choose the signals, set time windows, exclude recent buyers and preview it.",
    "answer": "A seasonal segment targets people most likely to care about a time of year, such as back to school or a holiday. In Klaviyo you combine past purchase of relevant products, recent site interest and engagement, add a time window, exclude people who just bought, and preview the size before sending.",
    "before": [
      "The campaign theme and the products it features",
      "Purchase and browsing data syncing into Klaviyo",
      "A date for when the campaign will send",
      "A clear view of how many people you expect to reach"
    ],
    "steps": [
      {
        "title": "Define who the season is for",
        "body": "Write a one sentence description of the target, such as parents of school age children or past gift buyers. The segment should match it."
      },
      {
        "title": "Start with past purchase signals",
        "body": "Add a condition on people who bought from the relevant collections in earlier seasons. Last year buyers are often the best audience."
      },
      {
        "title": "Add current interest signals",
        "body": "Include people who viewed relevant products or collections recently, using the viewed product or site activity data you have."
      },
      {
        "title": "Combine with engagement",
        "body": "Add a condition such as opened or clicked in a recent period, so the segment contains people who actually read your email."
      },
      {
        "title": "Exclude recent buyers",
        "body": "Add a condition to exclude people who placed an order in the last few days or who already bought the featured product."
      },
      {
        "title": "Preview the audience",
        "body": "Check the member count and spot check a few profiles. If it is too small, widen the time windows. If it is huge, tighten the conditions."
      },
      {
        "title": "Name it for reuse",
        "body": "Give the segment a clear name with the season and year, so you can duplicate and adjust it for next time."
      }
    ],
    "pitfalls": [
      "Using one broad condition so the segment is just your whole list.",
      "Forgetting that segments update over time as people qualify or drop out.",
      "Not excluding people who just purchased the featured item.",
      "Vague names that nobody can reuse."
    ],
    "checklist": [
      "Segment matches the one sentence audience",
      "Time windows are explicit",
      "Recent buyers are excluded",
      "Member count previewed and sensible",
      "Name includes season and year"
    ],
    "service": "klaviyo-email-marketing",
    "terms": [
      "email-segmentation",
      "engagement-segment",
      "rfm-segmentation"
    ]
  },
  {
    "slug": "build-high-intent-browse-segment-klaviyo",
    "category": "lists",
    "task": "How to build a high-intent browse segment in Klaviyo",
    "metaDescription": "Build a high-intent browse segment in Klaviyo: combine repeat product views, cart activity and no recent purchase to find ready-to-buy shoppers.",
    "answer": "A high-intent browse segment holds people who have shown strong buying signals on your site but have not purchased. In Klaviyo you combine repeated viewed product events, added to cart or started checkout activity and a no recent order condition, then use the segment for campaigns or a tailored flow.",
    "before": [
      "Onsite tracking installed and active in Klaviyo",
      "Viewed product and cart events visible in the activity feed",
      "Profiles identified through forms or login",
      "A plan for how the segment will be used"
    ],
    "steps": [
      {
        "title": "Confirm tracking works",
        "body": "Visit your site as a test profile, view a few products and check the events appear on the profile timeline before building anything."
      },
      {
        "title": "Define what high intent means",
        "body": "Pick signals such as viewing the same product more than once or viewing several products in a collection within a few days."
      },
      {
        "title": "Add the viewed product condition",
        "body": "Create a segment with the viewed product metric, set to happened at least a chosen number of times in a short window."
      },
      {
        "title": "Add stronger signals as alternatives",
        "body": "Include people with an added to cart or started checkout event in the same window, since these show even stronger interest."
      },
      {
        "title": "Exclude recent purchasers",
        "body": "Add a condition for placed order zero times in the recent window, so you do not market to people who already bought."
      },
      {
        "title": "Exclude people already in a live flow",
        "body": "Where practical, exclude people in an active browse or cart flow, to avoid duplicate messaging."
      },
      {
        "title": "Preview and decide the use",
        "body": "Check the size and sample profiles, then use the segment for a targeted campaign or a flow that follows up on browsing."
      }
    ],
    "pitfalls": [
      "Setting the window so wide that casual browsers count as high intent.",
      "Forgetting that only identified profiles can be emailed.",
      "Not excluding buyers.",
      "Using the segment alongside overlapping flows with no spacing."
    ],
    "checklist": [
      "Test profile events appear in the feed",
      "Intent signals are written out in plain terms",
      "Recent buyers are excluded",
      "Size and sample checked",
      "Segment has a named purpose"
    ],
    "service": "klaviyo-email-marketing",
    "terms": [
      "browse-abandonment-flow",
      "email-segmentation",
      "klaviyo-metric"
    ]
  },
  {
    "slug": "set-up-purchase-count-conditional-split-klaviyo",
    "category": "flows",
    "task": "How to set up a conditional split by purchase count in Klaviyo",
    "metaDescription": "Set up a Klaviyo conditional split by purchase count to send first-time, repeat and loyal buyers different paths in the same flow, with tests to check it.",
    "answer": "A conditional split sends people down different paths based on a condition. To split by purchase count in Klaviyo, add a conditional split to a flow, use the profile property for number of orders, set one branch for first-time buyers and another for repeat buyers, and test each path with a dummy profile.",
    "before": [
      "A flow where the paths should differ, such as post-purchase or welcome",
      "Order data syncing so the order count is accurate",
      "A clear idea of what each group should see",
      "A test profile for each branch"
    ],
    "steps": [
      {
        "title": "Decide the groups",
        "body": "Choose the cutoffs, for example one order, two to three orders and four or more. Keep the number of branches small."
      },
      {
        "title": "Add the split at the right point",
        "body": "Place the conditional split after the trigger or after the first delay, so it checks the order count at a sensible moment."
      },
      {
        "title": "Set the first condition",
        "body": "Choose the order count property or placed order metric and set the first branch to people with exactly one order."
      },
      {
        "title": "Add the next condition",
        "body": "Use a second split on the no side to separate repeat buyers from loyal ones, or use a different rule for each."
      },
      {
        "title": "Write different content per branch",
        "body": "First-time buyers need reassurance and product help. Repeat buyers can see newer items or a loyalty mention. Do not copy one message three times."
      },
      {
        "title": "Handle the timing of the count",
        "body": "Remember the count may or may not include the order that triggered the flow. Test with real orders to see which side a new buyer lands on."
      },
      {
        "title": "Test every branch",
        "body": "Create or edit test profiles with different order counts, trigger the flow and confirm each lands in the intended path."
      }
    ],
    "pitfalls": [
      "Assuming the triggering order is or is not counted without testing.",
      "Creating many branches with near identical content.",
      "Leaving the else branch empty so some people get nothing.",
      "Changing cutoffs later without checking live profiles in the flow."
    ],
    "checklist": [
      "Each branch has distinct content",
      "Every possible profile lands somewhere",
      "Triggering order counting is understood",
      "Test profiles cover every branch",
      "Flow status is live"
    ],
    "service": "email-flows",
    "terms": [
      "conditional-split",
      "flow-filter",
      "rfm-segmentation"
    ]
  },
  {
    "slug": "fix-klaviyo-profiles-not-syncing-from-shopify",
    "category": "lists",
    "task": "How to fix Klaviyo profiles not syncing from Shopify",
    "metaDescription": "Fix Klaviyo profiles not syncing from your Shopify store: check the integration, consent settings, checkout events and sync history to find the break.",
    "answer": "When new Shopify customers do not appear in Klaviyo, the cause is usually a broken or partial integration, missing consent settings or a tracking gap at checkout. Check the integration status, confirm what data the sync is allowed to send, test a real order, and re-sync if needed.",
    "before": [
      "Admin access to both Klaviyo and Shopify",
      "A recent customer or order that should have synced",
      "The date when profiles stopped appearing",
      "Notes on any app or theme changes around that date"
    ],
    "steps": [
      {
        "title": "Define what is missing",
        "body": "Decide whether profiles, orders or consent are missing. Each points to a different cause, so be specific before you change anything."
      },
      {
        "title": "Check the integration status",
        "body": "Open the integrations page in Klaviyo and look at the Shopify connection. Reconnect it if it shows an error or needs reauthorising."
      },
      {
        "title": "Look at the activity feed",
        "body": "Search for a missing customer by email. If events exist but no profile does, the profile may be suppressed or merged elsewhere."
      },
      {
        "title": "Review consent settings",
        "body": "Check how the integration handles marketing consent at checkout. Profiles can exist but not be subscribed, which looks like missing signups."
      },
      {
        "title": "Test with a new order",
        "body": "Place a small test order with a new email and see whether the profile and placed order event arrive. Note how long it takes."
      },
      {
        "title": "Check for blocking changes",
        "body": "Review recent theme edits, checkout customisations, privacy tools or app installs that could stop the tracking script or customer data passing through."
      },
      {
        "title": "Re-sync and recheck",
        "body": "If the connection is healthy, use the integration options to resync, wait for it to run, then repeat the search for the missing profile."
      }
    ],
    "pitfalls": [
      "Assuming missing subscribers means missing profiles, when only consent differs.",
      "Reconnecting the integration without noting current settings first.",
      "Ignoring theme or privacy app changes.",
      "Testing with an email that already exists in Klaviyo."
    ],
    "checklist": [
      "Integration shows connected",
      "Test order creates a profile and order event",
      "Consent behaviour is understood",
      "Missing customers found or re-synced",
      "Cause of the break noted"
    ],
    "service": "klaviyo-email-marketing",
    "terms": [
      "klaviyo-metric",
      "event-trigger",
      "email-list-growth"
    ]
  },
  {
    "slug": "fix-abandoned-cart-flow-emailing-buyers-klaviyo",
    "category": "flows",
    "task": "How to fix an abandoned cart flow that emails people who already bought",
    "metaDescription": "Fix a Klaviyo abandoned cart flow that still emails people who already bought: check exit conditions, filters, timing and order event matching.",
    "answer": "If your abandoned cart flow emails people who have already bought, the flow is missing an exit condition or its filter is wrong. In Klaviyo, add a flow filter or trigger split for placed order since starting the flow, check that order events match the same profile, and test the timing.",
    "before": [
      "Examples of people who bought and still received a cart email",
      "Access to the flow settings and the activity feed",
      "The order time against the cart email time",
      "Knowledge of whether guest checkouts are involved"
    ],
    "steps": [
      {
        "title": "Collect real examples",
        "body": "Find two or three affected profiles. Note when the cart event, the order and the email each happened, in order."
      },
      {
        "title": "Check the flow filter",
        "body": "Open the flow and look at the filter. It should exclude anyone who has placed an order since starting the flow."
      },
      {
        "title": "Check the trigger filter",
        "body": "Confirm the trigger filter does not conflict with the flow filter and is not so loose that it lets in people it should not."
      },
      {
        "title": "Add conditional splits before each email",
        "body": "Place a split before later emails that checks placed order since the flow started. Filters only check on entry in some setups, so repeat checks help."
      },
      {
        "title": "Verify profile matching",
        "body": "Check that the order and the cart events belong to the same profile. A different email at checkout can create two profiles, which the filter cannot connect."
      },
      {
        "title": "Review delays",
        "body": "If the first email goes out very quickly, a quick buyer may order seconds later. Lengthen the delay slightly if this is common."
      },
      {
        "title": "Retest with a full path",
        "body": "Start a test cart, place an order inside the delay and confirm the following email does not send."
      }
    ],
    "pitfalls": [
      "Relying on one filter at entry and no check before later emails.",
      "Ignoring guest buyers using a different email.",
      "A very short delay that outruns the order event.",
      "Changing the flow and not testing the full path."
    ],
    "checklist": [
      "Flow filter excludes recent orders",
      "Splits check order before later emails",
      "Affected profiles examined",
      "Test order stops later emails",
      "Delay reviewed"
    ],
    "service": "email-flows",
    "terms": [
      "abandoned-cart-flow",
      "flow-filter",
      "conditional-split"
    ]
  },
  {
    "slug": "fix-klaviyo-signup-form-not-showing-on-site",
    "category": "lists",
    "task": "How to fix a Klaviyo signup form not showing on your site",
    "metaDescription": "Fix a Klaviyo signup form that is not showing on your site: check live status, targeting, onsite tracking, cached pages and a test in a clean browser.",
    "answer": "A Klaviyo form that does not appear is usually set to draft, blocked by its targeting or timing rules, hidden because the visitor already saw it, or not loading because the onsite script is missing. Check each in turn and test in a private browser window.",
    "before": [
      "Access to the form and its settings",
      "The page address where it should appear",
      "A private or incognito browser window",
      "Knowledge of any recent theme or app changes"
    ],
    "steps": [
      {
        "title": "Check the form status",
        "body": "Open the form and confirm it is live, not a draft. Edits may also need publishing before they show up on the site."
      },
      {
        "title": "Review the display rules",
        "body": "Read the targeting settings for pages, devices, timing and scroll. A rule that is too narrow can mean it never meets its conditions."
      },
      {
        "title": "Check the visitor rules",
        "body": "Forms often hide for people who already subscribed, or who closed the form recently. Test with a fresh private window to avoid this."
      },
      {
        "title": "Confirm onsite tracking loads",
        "body": "Make sure the Klaviyo script is on the page. If it is missing, forms cannot render, and it often vanishes after a theme change."
      },
      {
        "title": "Look for conflicts",
        "body": "Check for other popups, cookie banners or page builders that could cover or block the form, and try on a different device."
      },
      {
        "title": "Clear caches",
        "body": "Clear any site cache or CDN cache so visitors get the latest page, then reload and wait for the timing rule to trigger."
      },
      {
        "title": "Test submission end to end",
        "body": "Submit the form with a new test email and confirm the profile lands on the right list with the expected consent."
      }
    ],
    "pitfalls": [
      "Testing in a browser where you already dismissed or submitted the form.",
      "Assuming a saved form is a published form.",
      "Not noticing the script was removed during a theme update.",
      "Setting delay and scroll rules that conflict."
    ],
    "checklist": [
      "Form is live",
      "Display rules match the target page",
      "Onsite script loads on the page",
      "Private window test shows the form",
      "Submission creates a profile on the list"
    ],
    "service": "klaviyo-email-marketing",
    "terms": [
      "signup-popup",
      "email-list-growth",
      "double-opt-in"
    ]
  },
  {
    "slug": "merge-duplicate-profiles-in-klaviyo",
    "category": "lists",
    "task": "How to merge duplicate profiles in Klaviyo",
    "metaDescription": "Merge duplicate profiles in Klaviyo safely: find the duplicates, understand identifiers, choose the right profile to keep and avoid breaking history.",
    "answer": "Duplicate profiles appear when one person shows up under different identifiers, such as two emails or an email and a phone number. In Klaviyo you find the duplicates, decide which identifier is correct, and let Klaviyo merge them through consistent identifiers or the merge option where it is available.",
    "before": [
      "Examples of duplicate profiles and where they came from",
      "Knowledge of which identifier is the real one",
      "A note of consent status on each profile",
      "Awareness that merges may be hard to undo"
    ],
    "steps": [
      {
        "title": "Find the cause first",
        "body": "Look at how the duplicates were created, such as guest checkout, a form that used another email or an integration passing a different ID."
      },
      {
        "title": "Compare the profiles",
        "body": "Open each profile and compare identifiers, order history, consent and properties. Write down anything unique to each."
      },
      {
        "title": "Choose the profile to keep",
        "body": "Keep the one with the correct, deliverable email and the most complete history. Treat anything else as the one that merges in."
      },
      {
        "title": "Check consent before merging",
        "body": "Make sure you understand each profile's consent status, since merging should never turn an unsubscribed person into a subscribed one."
      },
      {
        "title": "Merge or align identifiers",
        "body": "Use the merge option if your account offers it, or correct the identifiers at the source so the profiles join. Do one pair first."
      },
      {
        "title": "Verify the result",
        "body": "Open the merged profile and confirm orders, events and properties look right and consent is unchanged."
      },
      {
        "title": "Prevent new duplicates",
        "body": "Fix the source, for example by passing a consistent identifier from forms and integrations, and review how guest checkouts are captured."
      }
    ],
    "pitfalls": [
      "Merging without checking consent, which risks emailing unsubscribed people.",
      "Treating the symptom and not the source of duplicates.",
      "Merging a whole batch before testing one pair.",
      "Assuming a merge can be reversed."
    ],
    "checklist": [
      "Cause of duplicates identified",
      "Kept profile has a valid email",
      "Consent status confirmed after merge",
      "History looks complete on one pair",
      "Source of duplicates fixed"
    ],
    "service": "klaviyo-email-marketing",
    "terms": [
      "suppression-list",
      "email-list-growth",
      "klaviyo-metric"
    ]
  },
  {
    "slug": "export-and-review-campaign-revenue-klaviyo",
    "category": "campaigns",
    "task": "How to export and review campaign revenue in Klaviyo",
    "metaDescription": "Export and review campaign revenue in Klaviyo: pick the date range, check the attribution window, read revenue per recipient and compare sends fairly.",
    "answer": "To review campaign revenue in Klaviyo, open the campaign reports, set the date range and attribution view, export the results, and compare sends using revenue per recipient rather than only total revenue. Always read the numbers alongside the attribution window used.",
    "before": [
      "A date range for the review",
      "A list of the campaigns you want to compare",
      "An understanding of the attribution window on your account",
      "A spreadsheet to hold the export"
    ],
    "steps": [
      {
        "title": "Choose the review period",
        "body": "Pick a period long enough to cover several sends, such as a month or quarter, and keep it the same when you compare to another period."
      },
      {
        "title": "Check the attribution settings",
        "body": "Note the window used for attributing orders to opens or clicks. Different windows give different totals, so record which one you used."
      },
      {
        "title": "Open the campaign report list",
        "body": "Go to the campaign reporting area and filter by date and by send type if needed, so one off sends and tests do not clutter the view."
      },
      {
        "title": "Export the data",
        "body": "Use the export option to download the campaign table with recipients, clicks, orders and revenue for the period."
      },
      {
        "title": "Add revenue per recipient",
        "body": "In your spreadsheet, divide revenue by recipients for each campaign. This puts a large send and a small segment on equal footing."
      },
      {
        "title": "Compare like with like",
        "body": "Group campaigns by type, such as launch, promotion or content, and compare within groups. Different types have different norms."
      },
      {
        "title": "Note what drove the result",
        "body": "Record audience, offer, subject line and send time next to each row, then pick one thing to test in the next send."
      }
    ],
    "pitfalls": [
      "Comparing total revenue between sends of very different audience sizes.",
      "Changing the attribution window between reviews.",
      "Counting revenue that flows would have produced anyway as campaign revenue.",
      "Drawing conclusions from a single send."
    ],
    "checklist": [
      "Date range and attribution window recorded",
      "Export saved with a clear name",
      "Revenue per recipient calculated",
      "Campaigns grouped by type",
      "One test chosen for next time"
    ],
    "service": "klaviyo-email-marketing",
    "terms": [
      "revenue-per-recipient",
      "attributed-revenue",
      "click-through-rate"
    ]
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
