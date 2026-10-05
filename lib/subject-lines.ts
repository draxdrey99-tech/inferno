/**
 * Subject line libraries, one page per email type. Every line is original
 * and carries a one-sentence reason it works, which is the unique content
 * of the page (see scripts/quality-gate.mjs). No performance claims are
 * made about any line.
 */
export type SubjectLibrary = {
  slug: string;
  type: string;
  metaTitle: string;
  metaDescription: string;
  /** Quotable one-sentence answer. */
  answer: string;
  intro: string[];
  examples: { line: string; why: string }[];
  preheaderTips: string[];
  mistakes: string[];
  /** Glossary term slugs. */
  terms: string[];
  /** Service page slug. */
  service: string;
};

export const SUBJECT_LIBRARIES: SubjectLibrary[] = [
  {
    "slug": "abandoned-cart",
    "type": "Abandoned cart",
    "metaTitle": "Abandoned Cart Email Subject Lines That Work",
    "metaDescription": "Thirty original abandoned cart email subject lines across curiosity, urgency, benefit and plain angles, with preheader tips and mistakes to avoid.",
    "answer": "Abandoned cart subject lines work when they feel like a helpful nudge rather than a sales push: name the thing left behind, keep the tone calm, and make coming back feel like the easy next step.",
    "intro": [
      "Someone who added an item to their basket already told you what they want. The subject line only has to remind them, so the best ones feel like a quiet tap on the shoulder rather than a pitch. Familiarity does most of the work.",
      "The email usually sends within an hour or so of the visit going cold, with a follow-up a day or two later. Each message can take a different angle: the first is a reminder, the second answers doubts, the last adds gentle urgency."
    ],
    "examples": [
      {
        "line": "You left something behind",
        "why": "Plain and familiar, it reads like a friendly note rather than an advert."
      },
      {
        "line": "Still thinking it over?",
        "why": "A soft question invites reconsideration without any pressure at all."
      },
      {
        "line": "Your basket is waiting",
        "why": "Personifying the basket feels light and gives a clear reason to click."
      },
      {
        "line": "Forgot something?",
        "why": "Short and conversational, it mimics what a person would actually say."
      },
      {
        "line": "{{ first_name }}, your picks are saved",
        "why": "Using the name and the word saved signals nothing is lost yet."
      },
      {
        "line": "We kept your items aside",
        "why": "Implies care and a small reservation, which nudges people to return."
      },
      {
        "line": "Before it sells out",
        "why": "Scarcity framing gives a gentle reason to act sooner than later."
      },
      {
        "line": "Quick question about your order",
        "why": "Curiosity about a question makes the email feel personal and worth opening."
      },
      {
        "line": "Your cart misses you",
        "why": "Light humour breaks the pattern of dull reminder subject lines."
      },
      {
        "line": "Need a hand deciding?",
        "why": "Offers help instead of pushing, which suits hesitant shoppers, which suits a busy reader scanning the inbox."
      },
      {
        "line": "Good taste, by the way",
        "why": "A small compliment on their choice builds warmth before the reminder."
      },
      {
        "line": "Here is what you picked",
        "why": "Plainly states the content so the reader knows exactly what is inside."
      },
      {
        "line": "Free returns, in case you wondered",
        "why": "Addresses a common hesitation directly and lowers perceived risk, so the reader instantly understands the value."
      },
      {
        "line": "Almost yours",
        "why": "Short phrase creates a sense of closeness to completing the purchase."
      },
      {
        "line": "Two clicks from done",
        "why": "Frames checkout as nearly finished, which makes it feel effortless."
      },
      {
        "line": "Did something go wrong at checkout?",
        "why": "Gives a helpful excuse for leaving and invites them to try again."
      },
      {
        "line": "Other shoppers loved this too",
        "why": "Social proof without numbers reassures anyone who was unsure, and that keeps the tone human and natural."
      },
      {
        "line": "Your favourites will not wait forever",
        "why": "Mild urgency with a friendly tone avoids sounding like a hard sell."
      },
      {
        "line": "Saved your spot, just in case",
        "why": "Casual wording suggests convenience rather than a countdown, making the next step feel easy and low risk."
      },
      {
        "line": "A little reminder from us",
        "why": "Honest and low pressure, it lets the product do the persuading."
      },
      {
        "line": "Pick up where you left off",
        "why": "Focuses on convenience and continuity instead of pushing a sale."
      },
      {
        "line": "Ready when you are",
        "why": "Puts the shopper in control, which removes any pushy feeling."
      },
      {
        "line": "Still want these?",
        "why": "Brief direct question that is easy to answer and easy to act on."
      },
      {
        "line": "Questions about sizing or shipping?",
        "why": "Anticipates practical blockers and promises useful answers inside, which gives a clear and honest reason to open."
      },
      {
        "line": "That one is going fast",
        "why": "Hints at demand and makes the item feel worth securing now."
      },
      {
        "line": "Your cart, one last look",
        "why": "Signals a final message, giving a quiet reason to open it."
      },
      {
        "line": "We held on to your cart",
        "why": "Warm phrasing that makes returning feel like picking up a favour."
      },
      {
        "line": "Made up your mind yet?",
        "why": "Playful tone invites a response and feels less like automation."
      },
      {
        "line": "Treat yourself, you deserve it",
        "why": "Appeals to emotion and permission rather than logic or price."
      },
      {
        "line": "Your order is one step away",
        "why": "Clear benefit statement keeps the focus on finishing, not browsing."
      }
    ],
    "preheaderTips": [
      "Mention the product by name so the preview confirms what was left behind.",
      "Use the preheader to answer one doubt, such as delivery or returns.",
      "Avoid repeating the subject line; add a new detail the reader has not seen."
    ],
    "mistakes": [
      "Opening with a discount in every message teaches shoppers to abandon on purpose.",
      "Sounding accusatory or guilt-driven, which makes the brand feel desperate.",
      "Sending the same subject line in every step of the flow."
    ],
    "terms": [
      "abandoned-cart-flow",
      "email-segmentation"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "welcome",
    "type": "Welcome",
    "metaTitle": "Welcome Email Subject Lines That Get Opened",
    "metaDescription": "Thirty original welcome email subject lines across plain, curious, benefit-led and personal angles, plus preheader tips and common mistakes.",
    "answer": "Welcome subject lines work when they confirm the sign-up, set a friendly tone and promise something useful inside, because the new subscriber is at peak attention and expects to hear from you right away.",
    "intro": [
      "A welcome email lands while the subscriber is still thinking about your brand. Expectations are high and the relationship is brand new, so the subject line should feel warm, clear and recognisably human rather than promotional.",
      "It sends immediately after sign-up and often leads a short series. The first message confirms what they signed up for, the next tells your story, and later ones guide them to a first purchase."
    ],
    "examples": [
      {
        "line": "Welcome, glad you are here",
        "why": "Warm and direct, it sets a friendly tone for the whole relationship."
      },
      {
        "line": "You are in",
        "why": "Short, confident confirmation that feels like joining something worth joining."
      },
      {
        "line": "Here is what happens next",
        "why": "Promises clarity, which helps a new subscriber know what to expect."
      },
      {
        "line": "Thanks for signing up",
        "why": "Plain gratitude is familiar and reads as a clear confirmation."
      },
      {
        "line": "{{ first_name }}, welcome to the family",
        "why": "A personal greeting makes the message feel written for one person."
      },
      {
        "line": "A quick hello from our team",
        "why": "Humanises the brand and suggests a real person is behind the message."
      },
      {
        "line": "Your welcome gift is inside",
        "why": "Clear benefit that rewards the sign-up and invites an immediate open."
      },
      {
        "line": "Start here",
        "why": "Minimal and directive, it is perfect for a first message with guidance."
      },
      {
        "line": "Meet the people behind the brand",
        "why": "Curiosity about the founders builds connection before any selling begins."
      },
      {
        "line": "Let us show you around",
        "why": "Friendly host language that frames the email as a helpful tour."
      },
      {
        "line": "Our best sellers, picked for you",
        "why": "Gives new subscribers a useful shortcut to the strongest products."
      },
      {
        "line": "What to expect from us",
        "why": "Sets honest expectations, which builds trust and reduces later unsubscribes."
      },
      {
        "line": "Hello and thank you",
        "why": "Simple courtesy stands out in an inbox full of loud offers."
      },
      {
        "line": "Your first look inside",
        "why": "Exclusive framing makes the new subscriber feel like an insider."
      },
      {
        "line": "Not sure where to begin?",
        "why": "Question speaks to newcomers who may feel overwhelmed by choice."
      },
      {
        "line": "The story behind what we make",
        "why": "Invites curiosity about origin and craft, which supports brand loyalty."
      },
      {
        "line": "Thanks for choosing us",
        "why": "Appreciation is memorable and makes the subscriber feel valued, so it feels relevant rather than generic."
      },
      {
        "line": "Welcome aboard, here is your guide",
        "why": "Combines greeting with a tangible resource worth opening, which suits a busy reader scanning the inbox."
      },
      {
        "line": "One small thing before you shop",
        "why": "Curiosity gap creates a reason to open without sounding salesy."
      },
      {
        "line": "Good to meet you",
        "why": "Casual and human, it reads like a real introduction, so the reader instantly understands the value."
      },
      {
        "line": "A little something to get started",
        "why": "Hints at a gift without revealing it, sparking mild curiosity."
      },
      {
        "line": "Everything you need to know",
        "why": "Promises a useful summary for people who want quick orientation."
      },
      {
        "line": "Take a look around",
        "why": "Low pressure invitation suits a subscriber who is still exploring."
      },
      {
        "line": "We are so glad you found us",
        "why": "Emotional warmth that feels sincere and not scripted, and that keeps the tone human and natural."
      },
      {
        "line": "Your people just got bigger",
        "why": "Community framing shows the subscriber is joining something shared, making the next step feel easy and low risk."
      },
      {
        "line": "How our customers use it",
        "why": "Social proof without numbers gives context for first-time buyers, which gives a clear and honest reason to open."
      },
      {
        "line": "Tell us what you love",
        "why": "Invites interaction and sets up better personalisation later, so it feels relevant rather than generic."
      },
      {
        "line": "Welcome, and a quick favour",
        "why": "Light ask creates curiosity and starts a two-way conversation, which suits a busy reader scanning the inbox."
      },
      {
        "line": "Tips to get more from us",
        "why": "Positions the brand as helpful from the very first message."
      },
      {
        "line": "The first email is the best one",
        "why": "Playful confidence makes the message feel like a treat to open."
      }
    ],
    "preheaderTips": [
      "Confirm the sign-up in the preheader so the reader knows why you are writing.",
      "Hint at the first useful thing inside, such as a guide or a gift.",
      "Keep the tone as warm as the subject line; avoid generic filler text."
    ],
    "mistakes": [
      "Making the first message purely a discount ask with no welcome.",
      "Using a vague line that does not mention the sign-up at all.",
      "Delaying the send so the subscriber has forgotten signing up."
    ],
    "terms": [
      "welcome-flow",
      "sender-reputation"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "winback",
    "type": "Winback",
    "metaTitle": "Winback Email Subject Lines That Re-Engage",
    "metaDescription": "Thirty original winback email subject lines for lapsed customers, using curiosity, honesty, nostalgia and gentle offers, with tips and mistakes.",
    "answer": "Winback subject lines work when they acknowledge the gap honestly, feel personal rather than automated, and give a lapsed customer one clear reason to look again, without guilt or heavy pressure.",
    "intro": [
      "A lapsed customer has already bought once, which is a strong signal. Their attention has simply drifted. A good winback subject line cuts through the silence with honesty, a touch of warmth, or something genuinely new to see.",
      "The email usually triggers after a set period without a purchase or visit, tuned to how often your customers normally reorder. A short series works best, starting with a warm check-in and ending with a final, clear offer."
    ],
    "examples": [
      {
        "line": "It has been a while",
        "why": "Honest and familiar, it acknowledges the gap without blame, so the reader instantly understands the value."
      },
      {
        "line": "We miss you, {{ first_name }}",
        "why": "Personal and emotional, this speaks to people who liked the brand."
      },
      {
        "line": "Still interested?",
        "why": "A short question that is easy to answer and low on pressure."
      },
      {
        "line": "A lot has changed since you were here",
        "why": "Curiosity about what is new gives a reason to return."
      },
      {
        "line": "Come take another look",
        "why": "Gentle invitation that respects the customer's pace, and that keeps the tone human and natural."
      },
      {
        "line": "Should we stay in touch?",
        "why": "Honest question that feels respectful and often draws attention, making the next step feel easy and low risk."
      },
      {
        "line": "Here is what you missed",
        "why": "Mild fear of missing out, tied to real news instead of a deadline."
      },
      {
        "line": "Back by popular demand",
        "why": "Social proof without numbers suggests the product earned its return."
      },
      {
        "line": "Your favourites just got better",
        "why": "Benefit-led line that speaks to past purchase experience, which gives a clear and honest reason to open."
      },
      {
        "line": "A little something to welcome you back",
        "why": "Frames any incentive as a gift rather than a bribe."
      },
      {
        "line": "Is this goodbye?",
        "why": "Dramatic yet playful, it breaks through in a crowded inbox."
      },
      {
        "line": "We saved your spot",
        "why": "Suggests the relationship is still warm and waiting, so it feels relevant rather than generic."
      },
      {
        "line": "Let us make it right",
        "why": "Invites feedback and suggests care for unhappy customers, which suits a busy reader scanning the inbox."
      },
      {
        "line": "New arrivals you might like",
        "why": "Practical and plain, it points to something fresh to browse."
      },
      {
        "line": "Remember this one?",
        "why": "Nostalgia hook tied to a previous purchase feels personal, so the reader instantly understands the value."
      },
      {
        "line": "Time for a restock?",
        "why": "Useful reminder for consumable products with a natural reorder cycle."
      },
      {
        "line": "Tell us what went wrong",
        "why": "Honest request that opens a dialogue and shows humility, and that keeps the tone human and natural."
      },
      {
        "line": "One last note from us",
        "why": "Signals a final message, creating quiet curiosity to open, making the next step feel easy and low risk."
      },
      {
        "line": "We have something new for you",
        "why": "Simple promise of novelty gives a clear reason to click."
      },
      {
        "line": "Your next favourite is here",
        "why": "Positive, forward-looking tone that suits returning shoppers, which gives a clear and honest reason to open."
      },
      {
        "line": "Long time, no see",
        "why": "Casual friendly phrase that feels human and non-corporate, so it feels relevant rather than generic."
      },
      {
        "line": "Do you still want to hear from us?",
        "why": "Respectful, direct, and often more effective than a hard sell."
      },
      {
        "line": "What we have been working on",
        "why": "Curiosity about behind-the-scenes progress rekindles interest, which suits a busy reader scanning the inbox."
      },
      {
        "line": "Welcome back, whenever you are ready",
        "why": "Warm, patient tone removes any sense of pressure, so the reader instantly understands the value."
      },
      {
        "line": "Your account misses you",
        "why": "Light personification that stays friendly and unobtrusive, and that keeps the tone human and natural."
      },
      {
        "line": "See what everyone is talking about",
        "why": "Social proof without numbers gives a reason to check in again."
      },
      {
        "line": "A fresh start for you",
        "why": "Positive framing offers a clean slate rather than a reproach."
      },
      {
        "line": "Your favourites are still here",
        "why": "Convenience-led line that reduces effort to come back, making the next step feel easy and low risk."
      },
      {
        "line": "We would love your thoughts",
        "why": "Asks for opinion, which can re-engage people who ignore sales."
      },
      {
        "line": "Your loyalty deserves a thank you",
        "why": "Appreciation-led angle makes any offer feel earned, which gives a clear and honest reason to open."
      }
    ],
    "preheaderTips": [
      "Use the preheader to name one specific new thing worth a look.",
      "Keep the tone human; avoid sounding like an automated reminder.",
      "If you include an offer, hint at it softly rather than shouting it."
    ],
    "mistakes": [
      "Guilt-tripping the customer, which damages the brand feeling.",
      "Sending to everyone lapsed the same way instead of segmenting by past value.",
      "Never sunsetting people who do not respond, which hurts sender health."
    ],
    "terms": [
      "winback-flow",
      "email-segmentation"
    ],
    "service": "retention-strategy"
  },
  {
    "slug": "product-launch",
    "type": "Product launch",
    "metaTitle": "Product Launch Email Subject Lines That Work",
    "metaDescription": "Thirty original product launch email subject lines using curiosity, exclusivity, benefit and plain announcements, with preheader tips and mistakes.",
    "answer": "Product launch subject lines work when they create anticipation, name the new thing clearly and give subscribers a reason to feel they are first, balancing curiosity with enough detail to know what is arriving.",
    "intro": [
      "A launch is a moment of genuine news, and your list is the audience most likely to care. The subject line should signal that something new exists while leaving a little mystery that makes the reader want to see it.",
      "Launches often run as a short sequence: a teaser before release, an announcement on launch day, and a reminder as it settles. Each stage suits a different tone, from intrigue to excitement to practical detail."
    ],
    "examples": [
      {
        "line": "Something new is coming",
        "why": "Pure teaser that sparks curiosity without giving anything away, so it feels relevant rather than generic."
      },
      {
        "line": "It is finally here",
        "why": "Payoff language rewards subscribers who have been waiting, which suits a busy reader scanning the inbox."
      },
      {
        "line": "Meet our newest arrival",
        "why": "Simple, friendly introduction that treats the product like a person."
      },
      {
        "line": "You saw it here first",
        "why": "Exclusivity makes subscribers feel like valued insiders, so the reader instantly understands the value."
      },
      {
        "line": "The wait is over",
        "why": "Short, dramatic and ideal for a product people have asked about."
      },
      {
        "line": "Introducing something we are proud of",
        "why": "Honest enthusiasm feels sincere and invites a closer look, and that keeps the tone human and natural."
      },
      {
        "line": "{{ first_name }}, early access is open",
        "why": "Personal greeting combined with a clear insider benefit, making the next step feel easy and low risk."
      },
      {
        "line": "A first look, just for you",
        "why": "Private framing suggests a special preview worth opening, which gives a clear and honest reason to open."
      },
      {
        "line": "Take a peek behind the curtain",
        "why": "Curiosity line that promises a glimpse of the making process."
      },
      {
        "line": "Now available",
        "why": "Plain and clear, it works well for a straightforward announcement."
      },
      {
        "line": "We built this with you in mind",
        "why": "Customer-focused framing makes the launch feel relevant and personal, so it feels relevant rather than generic."
      },
      {
        "line": "The newest addition to the range",
        "why": "Descriptive and calm, it suits an established, steady brand, which suits a busy reader scanning the inbox."
      },
      {
        "line": "Ready to unwrap?",
        "why": "Playful question that carries the excitement of opening a gift."
      },
      {
        "line": "Say hello to your new favourite",
        "why": "Positive prediction that is friendly and confident, so the reader instantly understands the value."
      },
      {
        "line": "Launching today",
        "why": "Time-based clarity gives a natural reason to open right now."
      },
      {
        "line": "Tomorrow changes things",
        "why": "Teaser with big promise, perfect for the day before release."
      },
      {
        "line": "The one you have been asking for",
        "why": "Social proof without numbers shows the brand listened, and that keeps the tone human and natural."
      },
      {
        "line": "Why we made this",
        "why": "Curiosity about the story behind the product builds emotional interest."
      },
      {
        "line": "New season, new arrivals",
        "why": "Seasonal framing that fits fashion and lifestyle launches naturally, making the next step feel easy and low risk."
      },
      {
        "line": "A small change, a big difference",
        "why": "Benefit tease that makes people wonder what has improved, which gives a clear and honest reason to open."
      },
      {
        "line": "Be the first to try it",
        "why": "Direct invitation that rewards eager subscribers, so it feels relevant rather than generic."
      },
      {
        "line": "It took us a long time to get this right",
        "why": "Honest craft narrative that earns attention through effort, which suits a busy reader scanning the inbox."
      },
      {
        "line": "Just landed",
        "why": "Casual, quick and perfectly suited to fresh stock arriving, so the reader instantly understands the value."
      },
      {
        "line": "Here is the big announcement",
        "why": "Signals importance and promises genuine news inside, and that keeps the tone human and natural."
      },
      {
        "line": "Your first chance to shop the drop",
        "why": "Exclusive access wording suits limited or timed releases, making the next step feel easy and low risk."
      },
      {
        "line": "Designed for the way you live",
        "why": "Benefit-led line that connects the product to everyday life, which gives a clear and honest reason to open."
      },
      {
        "line": "What is new this week",
        "why": "Plain, useful and ideal for a regular cadence of releases."
      },
      {
        "line": "The reveal",
        "why": "Two words that create curiosity and a sense of theatre."
      },
      {
        "line": "A new chapter starts now",
        "why": "Story language gives gravity to a major launch or rebrand."
      },
      {
        "line": "Come see what we have been making",
        "why": "Warm invitation that shares enthusiasm with the audience, so it feels relevant rather than generic."
      }
    ],
    "preheaderTips": [
      "Reveal one concrete detail in the preheader to balance the teaser subject.",
      "State the launch timing so readers know when to act.",
      "Match the preheader mood to the subject: playful with playful, calm with calm."
    ],
    "mistakes": [
      "Teasing so vaguely that readers cannot tell what the email is about.",
      "Using the same hype words for every launch until they lose meaning.",
      "Sending to the full list without giving engaged subscribers early access."
    ],
    "terms": [
      "email-segmentation",
      "email-deliverability"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "back-in-stock",
    "type": "Back in stock",
    "metaTitle": "Back in Stock Email Subject Lines That Work",
    "metaDescription": "Thirty original back in stock email subject lines using urgency, relief, plain facts and personal touches, with preheader tips and mistakes.",
    "answer": "Back in stock subject lines work when they deliver the answer the subscriber asked for immediately: the item is available again, said plainly, with a light hint that stock may not last long.",
    "intro": [
      "Someone who signed up for a restock alert has already shown strong intent. They do not need persuading, they need a quick, clear signal that the thing they wanted is available. Clarity beats cleverness here.",
      "The email sends the moment stock returns, so timing matters as much as wording. Because popular items can sell through again, a touch of honest urgency is appropriate, as long as it reflects reality."
    ],
    "examples": [
      {
        "line": "It is back",
        "why": "Two plain words deliver exactly the news the subscriber wanted."
      },
      {
        "line": "Good news, it is back in stock",
        "why": "Positive opener with clear information, ideal for an alert email."
      },
      {
        "line": "You asked, we restocked",
        "why": "Shows the brand listened, which feels personal and rewarding, which suits a busy reader scanning the inbox."
      },
      {
        "line": "It landed back on the shelf",
        "why": "Relief-led phrasing that matches the feeling of a long wait."
      },
      {
        "line": "Back and ready to ship",
        "why": "Adds practical reassurance that the order can move quickly, so the reader instantly understands the value."
      },
      {
        "line": "{{ first_name }}, your size is available",
        "why": "Personal and specific, it answers the exact question asked, and that keeps the tone human and natural."
      },
      {
        "line": "Back in stock, but not for long",
        "why": "Honest scarcity that is natural for popular items, making the next step feel easy and low risk."
      },
      {
        "line": "Restocked just for you",
        "why": "Warm framing that makes the subscriber feel considered, which gives a clear and honest reason to open."
      },
      {
        "line": "Your waitlist item has landed",
        "why": "Direct reference to the alert signup confirms why they got this email."
      },
      {
        "line": "We found it again",
        "why": "Light storytelling that suits one-off or hard-to-get products, so it feels relevant rather than generic."
      },
      {
        "line": "Grab it while you can",
        "why": "Casual urgency that is friendly rather than pushy, which suits a busy reader scanning the inbox."
      },
      {
        "line": "Look who is back",
        "why": "Playful greeting that treats the product as a returning friend."
      },
      {
        "line": "It sold out once, it can again",
        "why": "Gentle nudge using the product history as the reason to act."
      },
      {
        "line": "Available again, finally",
        "why": "Honest relief that acknowledges the earlier frustration, so the reader instantly understands the value."
      },
      {
        "line": "Your alert just came through",
        "why": "Utility language that matches how the subscriber thinks, and that keeps the tone human and natural."
      },
      {
        "line": "Restock alert",
        "why": "Clean functional label that people actively opted in to see."
      },
      {
        "line": "We saved one for you",
        "why": "Intimate wording that hints at a personal reserve, making the next step feel easy and low risk."
      },
      {
        "line": "Now back on the shelves",
        "why": "Simple physical image that is familiar and reassuring, which gives a clear and honest reason to open."
      },
      {
        "line": "Restocked, and not for long",
        "why": "Social proof without numbers shows the item mattered to many."
      },
      {
        "line": "The one you wanted is here",
        "why": "Matches the subscriber's own wish in plain language, so it feels relevant rather than generic."
      },
      {
        "line": "Do not miss it this time",
        "why": "Light reference to last time makes the nudge feel empathetic."
      },
      {
        "line": "Limited restock, open now",
        "why": "Clear and honest about quantity and availability, which suits a busy reader scanning the inbox."
      },
      {
        "line": "Good things come back",
        "why": "Soft proverb that feels warm and slightly playful, so the reader instantly understands the value."
      },
      {
        "line": "Stock is up, shop soon",
        "why": "Brief practical instruction without drama or hype, and that keeps the tone human and natural."
      },
      {
        "line": "Ready when you are, again",
        "why": "Cheerful tone that treats the return as a happy reunion."
      },
      {
        "line": "First in line for the restock",
        "why": "Early access wording rewards waitlist members, making the next step feel easy and low risk."
      },
      {
        "line": "Welcome back, favourite",
        "why": "Affectionate and short, it suits beloved best sellers, which gives a clear and honest reason to open."
      },
      {
        "line": "You are on the list, and it is live",
        "why": "Confirms the signup and the availability in one breath, so it feels relevant rather than generic."
      },
      {
        "line": "Here again, for now",
        "why": "Subtle scarcity that is honest and understated, which suits a busy reader scanning the inbox."
      },
      {
        "line": "We know you were waiting",
        "why": "Empathy-led line that feels human and appreciated, so the reader instantly understands the value."
      }
    ],
    "preheaderTips": [
      "Name the exact product and size or colour so the reader sees it at once.",
      "State how limited the stock is, only if that is true.",
      "Add shipping speed or delivery detail as the second piece of reassurance."
    ],
    "mistakes": [
      "Alerting too late, after the item has already sold out again.",
      "Claiming scarcity that is not real, which erodes trust.",
      "Burying the product name so the reader cannot tell what came back."
    ],
    "terms": [
      "email-segmentation",
      "email-deliverability"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "post-purchase",
    "type": "Post-purchase",
    "metaTitle": "Post-Purchase Email Subject Lines That Work",
    "metaDescription": "Thirty original post-purchase email subject lines for thank-yous, shipping, reviews and cross-sells, with preheader tips and common mistakes.",
    "answer": "Post-purchase subject lines work when they reassure first and sell second: confirm the order, set delivery expectations, and offer help or advice that makes the customer glad they bought, which keeps the message useful and builds trust for later emails.",
    "intro": [
      "After checkout, a customer is watching their inbox closely. They want reassurance, not a pitch. Subject lines that acknowledge the purchase, share useful information and keep a human tone build trust that pays off in the next order.",
      "These emails send in stages: a thank you and confirmation, shipping updates, a how-to-use message once the item has arrived, then a review request and a gentle cross-sell. Each stage needs its own purpose and its own wording."
    ],
    "examples": [
      {
        "line": "Thank you for your order",
        "why": "Warm and expected, it confirms the purchase with grace, and that keeps the tone human and natural."
      },
      {
        "line": "We are getting your order ready",
        "why": "Reassuring progress update that eases early buyer's nerves, making the next step feel easy and low risk."
      },
      {
        "line": "Your order is on its way",
        "why": "Plain shipping news that people open every single time, which gives a clear and honest reason to open."
      },
      {
        "line": "A note from our team",
        "why": "Humanises the brand and feels more personal than a receipt."
      },
      {
        "line": "{{ first_name }}, it is packed",
        "why": "Casual and personal update that makes fulfilment feel real, so it feels relevant rather than generic."
      },
      {
        "line": "How to get the most from it",
        "why": "Helpful and benefit-led, it improves the customer's first experience, which suits a busy reader scanning the inbox."
      },
      {
        "line": "A few tips before it arrives",
        "why": "Prepares the buyer and builds excitement while they wait, so the reader instantly understands the value."
      },
      {
        "line": "Has it arrived yet?",
        "why": "Light check-in question that shows care after the delivery window."
      },
      {
        "line": "Tell us how it went",
        "why": "Invites honest feedback in a friendly, low-pressure way, and that keeps the tone human and natural."
      },
      {
        "line": "Would you share your thoughts?",
        "why": "Polite review request that respects the customer's time, making the next step feel easy and low risk."
      },
      {
        "line": "Quick favour, if you have a moment",
        "why": "Small ask framing makes a review feel easy to give."
      },
      {
        "line": "Settling in nicely?",
        "why": "Warm check-in that fits the first days of ownership, which gives a clear and honest reason to open."
      },
      {
        "line": "Here is how to care for it",
        "why": "Practical value that extends product life and customer goodwill, so it feels relevant rather than generic."
      },
      {
        "line": "Need a hand setting up?",
        "why": "Offers support before problems appear, which builds confidence, which suits a busy reader scanning the inbox."
      },
      {
        "line": "Pairs well with your new find",
        "why": "Cross-sell wording that feels like advice instead of selling, so the reader instantly understands the value."
      },
      {
        "line": "What other customers added next",
        "why": "Social proof without numbers that suggests helpful companions, and that keeps the tone human and natural."
      },
      {
        "line": "We hope you love it",
        "why": "Simple warm wish that feels sincere and uncomplicated, making the next step feel easy and low risk."
      },
      {
        "line": "Something to go with your order",
        "why": "Soft cross-sell that connects directly to a recent purchase, which gives a clear and honest reason to open."
      },
      {
        "line": "Your delivery details inside",
        "why": "Clear and functional, it answers the question people care about."
      },
      {
        "line": "Questions? We are right here",
        "why": "Reassurance that real people are available to help, so it feels relevant rather than generic."
      },
      {
        "line": "Let us know it landed safely",
        "why": "Friendly request that doubles as a delivery confirmation, which suits a busy reader scanning the inbox."
      },
      {
        "line": "Your next order, made easier",
        "why": "Convenience angle encourages repeat buying with little effort, so the reader instantly understands the value."
      },
      {
        "line": "Time to restock?",
        "why": "Useful nudge for products that run out after a known period."
      },
      {
        "line": "Welcome to the community",
        "why": "Belonging language turns a one-off buyer into a member, and that keeps the tone human and natural."
      },
      {
        "line": "Our small thank you",
        "why": "Understated appreciation that can lead into a loyalty message, making the next step feel easy and low risk."
      },
      {
        "line": "See how others are using it",
        "why": "Inspires ideas and reinforces the purchase choice, which gives a clear and honest reason to open."
      },
      {
        "line": "A little more about what you bought",
        "why": "Curiosity and education that deepen product appreciation, so it feels relevant rather than generic."
      },
      {
        "line": "Was everything as expected?",
        "why": "Simple question that signals care and invites any concerns, which suits a busy reader scanning the inbox."
      },
      {
        "line": "One more thing before you go",
        "why": "Light curiosity hook that suits a follow-up recommendation, so the reader instantly understands the value."
      },
      {
        "line": "Thanks again, from all of us",
        "why": "Warm closing line that rounds off the order experience, and that keeps the tone human and natural."
      }
    ],
    "preheaderTips": [
      "Repeat the order detail or delivery status so the email is useful at a glance.",
      "Keep selling out of the preheader in early messages; reassurance comes first.",
      "Include the product name in review requests to jog the memory."
    ],
    "mistakes": [
      "Pushing a cross-sell before the first item has even arrived.",
      "Using a cold, system-style subject that feels like a receipt only.",
      "Asking for a review before the customer has had time to use the product."
    ],
    "terms": [
      "email-segmentation",
      "sender-reputation"
    ],
    "service": "retention-strategy"
  },
  {
    "slug": "sale-and-promotion",
    "type": "Sale and promotion",
    "metaTitle": "Sale and Promotion Email Subject Lines",
    "metaDescription": "Thirty original sale and promotion email subject lines using urgency, benefit, exclusivity and plain wording, with preheader tips and mistakes to avoid.",
    "answer": "Sale and promotion subject lines work when they state the occasion clearly, create honest urgency from a real deadline, and respect the reader enough to avoid shouting, so promotions stay effective instead of becoming background noise.",
    "intro": [
      "Promotional emails compete with every other sale in the inbox. The strongest subject lines are clear about what is on offer, honest about timing, and distinct in voice, because loud and generic wording is the first thing readers learn to ignore.",
      "Sales send as campaigns around seasonal moments, clearance windows and member-only events, usually with a launch email, a reminder and a last-chance message. Real deadlines and good segmentation matter far more than extra exclamation marks."
    ],
    "examples": [
      {
        "line": "The sale starts now",
        "why": "Plain and clear, it announces the event with no wasted words."
      },
      {
        "line": "Our sale is live",
        "why": "Direct news that readers who like deals will open at once."
      },
      {
        "line": "Last chance before it ends",
        "why": "Genuine deadline urgency that works best as a final reminder."
      },
      {
        "line": "Final hours, nothing fancy",
        "why": "Honest and slightly witty, it respects the reader's intelligence, making the next step feel easy and low risk."
      },
      {
        "line": "Members get in first",
        "why": "Exclusivity rewards loyal subscribers and drives sign-up value, which gives a clear and honest reason to open."
      },
      {
        "line": "{{ first_name }}, your early access starts",
        "why": "Personal VIP framing makes the promotion feel earned, so it feels relevant rather than generic."
      },
      {
        "line": "Something special for the weekend",
        "why": "Time-anchored line that feels relaxed and inviting, which suits a busy reader scanning the inbox."
      },
      {
        "line": "Prices just dropped",
        "why": "Short factual statement that gets straight to the benefit, so the reader instantly understands the value."
      },
      {
        "line": "Treat yourself, it is on offer",
        "why": "Emotional permission paired with a clear reason to buy, and that keeps the tone human and natural."
      },
      {
        "line": "Our favourite things, for less",
        "why": "Benefit-led and friendly, it connects curation with savings, making the next step feel easy and low risk."
      },
      {
        "line": "The seasonal sale is here",
        "why": "Occasion-based wording that matches how people shop, which gives a clear and honest reason to open."
      },
      {
        "line": "A thank you, with a little extra",
        "why": "Frames the promotion as appreciation rather than a push, so it feels relevant rather than generic."
      },
      {
        "line": "Open before it is gone",
        "why": "Mild scarcity that nudges without screaming, which suits a busy reader scanning the inbox."
      },
      {
        "line": "Ends tonight",
        "why": "Two words of honest urgency suited to a real deadline."
      },
      {
        "line": "Do not miss this one",
        "why": "Direct, conversational and effective as a reminder message, so the reader instantly understands the value."
      },
      {
        "line": "Your invitation to the sale",
        "why": "Hosting language that makes the event feel special, and that keeps the tone human and natural."
      },
      {
        "line": "Save on the things you love",
        "why": "Benefit statement tied to products the reader already likes, making the next step feel easy and low risk."
      },
      {
        "line": "A quiet little sale",
        "why": "Understated tone stands out from louder competitors, which gives a clear and honest reason to open."
      },
      {
        "line": "Everything you wanted, a bit kinder on the wallet",
        "why": "Playful and human, with value hinted rather than shouted, so it feels relevant rather than generic."
      },
      {
        "line": "Come back for the best of it",
        "why": "Invites lapsed readers to revisit while stock is good, which suits a busy reader scanning the inbox."
      },
      {
        "line": "Hurry, but not too much",
        "why": "Humorous take on urgency that still prompts action, so the reader instantly understands the value."
      },
      {
        "line": "Best sellers on offer",
        "why": "Plain label that points to products that already have appeal, and that keeps the tone human and natural."
      },
      {
        "line": "Early bird access is open",
        "why": "Time-linked exclusivity rewards prompt readers, making the next step feel easy and low risk."
      },
      {
        "line": "A reason to treat someone",
        "why": "Gifting angle suits holidays and seasonal promotions, which gives a clear and honest reason to open."
      },
      {
        "line": "The offer you were waiting for",
        "why": "Anticipation language works for a repeat or well-known event, so it feels relevant rather than generic."
      },
      {
        "line": "Sale ends soon, shop the edit",
        "why": "Combines mild urgency with curated guidance, which suits a busy reader scanning the inbox."
      },
      {
        "line": "Winter favourites, reduced",
        "why": "Seasonal, concrete and easy to picture, so the reader instantly understands the value."
      },
      {
        "line": "New markdowns just arrived",
        "why": "Fresh news hook for shoppers who check back often, and that keeps the tone human and natural."
      },
      {
        "line": "Quick, the doors close soon",
        "why": "Playful urgency framing that feels theatrical, not threatening, making the next step feel easy and low risk."
      },
      {
        "line": "Take a look, no pressure",
        "why": "Relaxed invitation that disarms deal fatigue, which gives a clear and honest reason to open."
      }
    ],
    "preheaderTips": [
      "State the deadline in the preheader so the urgency is clear and honest.",
      "Name the category on offer so readers can self-select quickly.",
      "Avoid repeating the subject; add what to expect inside the email."
    ],
    "mistakes": [
      "Using capital letters and exclamation marks until every email looks the same.",
      "Running promotions so often that readers only buy on offer.",
      "Sending sale emails to the whole list instead of interested segments."
    ],
    "terms": [
      "email-segmentation",
      "email-deliverability"
    ],
    "service": "klaviyo-email-marketing"
  },
  {
    "slug": "newsletter",
    "type": "Newsletter",
    "metaTitle": "Newsletter Email Subject Lines That Get Opened",
    "metaDescription": "Thirty original newsletter subject lines using curiosity, benefit, plain and personal angles, with preheader tips and common mistakes for ecommerce brands.",
    "answer": "Newsletter subject lines work when they promise one specific, interesting thing inside and sound like a person, because readers open emails from brands they trust to be useful, not from titles that merely say newsletter.",
    "intro": [
      "A newsletter is a relationship email. Readers open it when the subject line suggests value: a story, a tip, an idea or a useful pick. The best lines name one concrete thing and sound like a friend writing, not an issue number.",
      "Newsletters go out on a regular rhythm, often weekly or fortnightly, so consistency of voice matters. Over time the subject line trains the reader to expect something worth their time, which protects engagement and keeps the sender in good standing."
    ],
    "examples": [
      {
        "line": "This week, in short",
        "why": "Promises a quick, digestible read that respects the reader's time."
      },
      {
        "line": "One idea worth your attention",
        "why": "Single focus creates clarity and a sense of editorial care."
      },
      {
        "line": "What we are loving right now",
        "why": "Personal and warm, it shares taste rather than selling, so it feels relevant rather than generic."
      },
      {
        "line": "A better way to do it",
        "why": "Benefit tease that makes the reader curious about a method."
      },
      {
        "line": "Things we learned this month",
        "why": "Honest reflection that feels human and shareable, which suits a busy reader scanning the inbox."
      },
      {
        "line": "{{ first_name }}, your weekly edit",
        "why": "Personal and recognisable, it suits a familiar format, so the reader instantly understands the value."
      },
      {
        "line": "Inside: a story, a tip, a pick",
        "why": "Lists contents plainly so the reader knows the value, and that keeps the tone human and natural."
      },
      {
        "line": "The one thing you should read today",
        "why": "Direct and confident curation that rewards a quick open, making the next step feel easy and low risk."
      },
      {
        "line": "Behind the scenes this week",
        "why": "Curiosity about process builds closeness with the brand, which gives a clear and honest reason to open."
      },
      {
        "line": "A small thing that made a big difference",
        "why": "Story hook that promises a useful lesson, so it feels relevant rather than generic."
      },
      {
        "line": "Our team's quiet favourites",
        "why": "Understated and trustworthy, with a human recommendation feel, which suits a busy reader scanning the inbox."
      },
      {
        "line": "Q and A with someone interesting",
        "why": "Names a format readers enjoy and invites curiosity about the guest."
      },
      {
        "line": "How to make it last",
        "why": "Practical benefit that suits product care and sustainability content, so the reader instantly understands the value."
      },
      {
        "line": "Ideas for the week ahead",
        "why": "Forward-looking and useful, it gives a reason to open on Monday."
      },
      {
        "line": "Not what you would expect",
        "why": "Curiosity gap that tempts without making a promise, and that keeps the tone human and natural."
      },
      {
        "line": "The short version",
        "why": "Appeals to busy readers who value brevity, making the next step feel easy and low risk."
      },
      {
        "line": "Hello from our corner",
        "why": "Warm and personal tone that feels like a note from a friend."
      },
      {
        "line": "What other customers have been doing",
        "why": "Social proof without numbers makes the content feel communal, which gives a clear and honest reason to open."
      },
      {
        "line": "A recipe, a tip, and a surprise",
        "why": "Specific mix creates variety and a little intrigue, so it feels relevant rather than generic."
      },
      {
        "line": "Something to think about",
        "why": "Gentle prompt that invites reflection rather than purchase, which suits a busy reader scanning the inbox."
      },
      {
        "line": "Your slow-read of the week",
        "why": "Relaxed framing sets the tone for unhurried reading, so the reader instantly understands the value."
      },
      {
        "line": "Why we do it this way",
        "why": "Explains values and process, which strengthens brand trust, and that keeps the tone human and natural."
      },
      {
        "line": "The thing everyone asks us",
        "why": "Answer-led curiosity that reveals a common question, making the next step feel easy and low risk."
      },
      {
        "line": "Fresh from the studio",
        "why": "Craft-led wording that suits makers and small brands, which gives a clear and honest reason to open."
      },
      {
        "line": "Stories worth sharing",
        "why": "Invites forwarding and positions the brand as a curator, so it feels relevant rather than generic."
      },
      {
        "line": "Seasonal notes and new finds",
        "why": "Plain label for a roundup that mixes content and products."
      },
      {
        "line": "Ever wondered how it is made?",
        "why": "Question that triggers curiosity about a behind-the-scenes feature, which suits a busy reader scanning the inbox."
      },
      {
        "line": "A letter from the founder",
        "why": "Personal authority framing that invites a closer read, so the reader instantly understands the value."
      },
      {
        "line": "The good stuff, no fluff",
        "why": "Promises quality and brevity in a friendly, direct tone, and that keeps the tone human and natural."
      },
      {
        "line": "Try this before the weekend",
        "why": "Actionable suggestion that feels timely and useful, making the next step feel easy and low risk."
      }
    ],
    "preheaderTips": [
      "Use the preheader to add a second reason to open, not repeat the subject.",
      "Tease one specific item from the content to reward curious readers.",
      "Keep it conversational so it reads like the start of a message."
    ],
    "mistakes": [
      "Using the same generic title every issue, which blends into the inbox.",
      "Cramming several topics into the subject line and losing focus.",
      "Sending without a clear rhythm, so readers never learn to expect it."
    ],
    "terms": [
      "email-segmentation",
      "sender-reputation"
    ],
    "service": "klaviyo-email-marketing"
  }
];

export const getSubjectLibrary = (slug: string) => SUBJECT_LIBRARIES.find((s) => s.slug === slug);

/** The next three libraries, wrapping round, so every library gets inbound links from siblings. */
export function subjectSiblings(slug: string) {
  const i = SUBJECT_LIBRARIES.findIndex((x) => x.slug === slug);
  if (i < 0) return [];
  return [1, 2, 3].map((n) => SUBJECT_LIBRARIES[(i + n) % SUBJECT_LIBRARIES.length]).filter((x, k, a) => x.slug !== slug && a.findIndex((y) => y.slug === x.slug) === k);
}
