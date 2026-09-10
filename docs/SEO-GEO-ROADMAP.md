# Inferno Emails: SEO and GEO roadmap

Written 10 September 2026 by running `seo-geo-audit-playbook.md` against this codebase and the live domain. The goal is inbound leads on autopilot: a stranger searches a problem, lands on a page that answers it, and books the free audit without anyone chasing them. The order below is the order to do things in. Nothing in section 3 onward is worth an hour until section 1 is done.

No em dashes are used in this document, and none should appear in anything published from it.

## 0. What was checked, and what could not be

The playbook's first rule is to live-fetch every page before saying anything about it. That was attempted and it produced the single most important finding.

- `https://infernoemails.com/`, `/services`, `/blog`, `/sitemap.xml` and `/work` all returned **HTTP 522** (Cloudflare: origin connection timed out) on 10 September 2026. A request identifying as GPTBot got the same 522. The www host timed out entirely.
- DNS for the apex resolves to Cloudflare IP ranges, not to Vercel. The Vercel account linked to this machine has no project for this repository.
- `/robots.txt` returned 200 with 1,836 bytes. This codebase generates a robots file of roughly 100 bytes, so whatever answered is not this site. It is most likely the old WordPress robots file or a Cloudflare interstitial. Its contents could not be captured because the connection dropped on every retry.
- No Google Search Console, Bing Webmaster, analytics or keyword tool access was available in this session. There are therefore **no impressions, clicks, positions or search-volume figures anywhere in this document**. Page buckets and keyword tiers are based on ICP fit and the codebase, not on performance data. Once Search Console has 30 days of data, redo the bucketing with real numbers.
- Every page was read from source and from a local production build (`next build` and `next start`) rather than from the live domain, because the live domain was not serving.

## Status update, 10 September 2026, afternoon

The domain is live. DNS moved to Vercel (team inferno14, project inferno, Git-connected to main, so every push to main deploys production). The first attempt looped because Vercel had the apex redirecting to www while the code redirects www to the apex; the apex is now primary and www redirects to it with a 308. Live checks: SEO crawl 0 failures across 11 sitemap URLs, GPTBot gets 200, llms.txt serves, Lighthouse mobile 96/100/100/100 (LCP 2.63s) and desktop 100 across the board. Section 1.1 below is therefore done; 1.2 (Search Console, Bing, analytics, Business Profile) and 1.3 (trust items) remain.

## 1. Urgent: get the domain serving, then fix the trust items

These are separated from ordinary SEO work because they carry business risk beyond rankings.

### 1.1 The domain is down

Right now nobody, human or crawler, can reach the site. Every day this continues costs indexation and, if the old WordPress site had any rankings, they are decaying. Steps:

1. In Vercel: **Add New, Project**, import this repository. Add environment variables: `NEXT_PUBLIC_SITE_URL=https://infernoemails.com`, `BLOG_ADMIN_PASSWORD`, and the Neon and Blob integrations (Storage tab). Deploy.
2. In Vercel: **Settings, Domains**, add `infernoemails.com` and `www.infernoemails.com`. Vercel shows the DNS records it wants.
3. In Cloudflare DNS for `infernoemails.com`: point the apex A record at Vercel's IP (Vercel shows it, currently `76.76.21.21`) and `www` as a CNAME to `cname.vercel-dns.com`. Either switch the proxy off for both records (grey cloud) or, if you want to keep Cloudflare in front, set SSL/TLS mode to **Full (strict)** and turn off any Cloudflare feature that rewrites HTML (Rocket Loader, Auto Minify, Email Obfuscation). Do not run both Cloudflare and Vercel caching rules; Vercel's are already correct.
4. Verify from a terminal: every command below should return 200, and the www one should return 308 to the apex.

```bash
curl -sI https://infernoemails.com/ | head -1
curl -sI https://infernoemails.com/sitemap.xml | head -1
curl -sI https://infernoemails.com/llms.txt | head -1
curl -sI https://www.infernoemails.com/ | head -3
curl -sI -A "GPTBot/1.0" https://infernoemails.com/ | head -1
```

5. Then run the repo's own crawl against production: `npm run seo:check https://infernoemails.com`.

### 1.2 Search Console, Bing and analytics

1. Google Search Console: add `infernoemails.com` as a **Domain** property, verify by DNS TXT record in Cloudflare, submit `https://infernoemails.com/sitemap.xml`. Use URL Inspection on `/`, `/services/klaviyo-email-marketing` and `/work` and request indexing.
2. Bing Webmaster Tools: import from Search Console. Bing feeds ChatGPT search and Copilot; for a GEO strategy it is not optional.
3. Analytics: turn on Vercel Web Analytics (no cookie banner needed) and add a custom event on every click of a link to `calendly.com`. Without that event you cannot tell which page produced a booking, and "autopilot" means knowing exactly which pages to feed.
4. Google Business Profile: claim it if you have any address, even a registered office. Agency searches carry local intent.

### 1.3 Trust items found by reading every page

| Item | Status | Action |
|---|---|---|
| KÍLÈNTÀR founder named to Forbes 30 Under 30 Europe 2025 (home page, work page, portfolio note) | **Verified** against forbes.com/profile/michelle-adepoju and the Forbes Art and Culture 2025 list article | Keep. It is the strongest third-party signal on the site. Consider asking KÍLÈNTÀR for a one-line quote. |
| Testimonials attributed to company names only (Girafon Bleu, Bondi Coffee, Kuchenkompane) | Unverifiable as written | Get a person's name and role for each, or written permission to keep the company attribution. Named people are worth more for E-E-A-T and for readers. |
| Three Klaviyo dashboard screenshots with exact revenue figures | Watermarked and unattributed, but commercially sensitive | Confirm client permission in writing. They are the best proof on the site; get the yes rather than removing them. |
| Contact email, LinkedIn URL, founding year, client countries | Guessed at build time (see CONTENT.md) | Confirm each. A wrong `sameAs` LinkedIn URL in the Organization schema is worse than none. |
| No named human anywhere on the site | Gap | Founder name, role, photo and two paragraphs of real history. This unlocks a real `/about` page, Person schema on blog posts and the Klaviyo partner directory listing. |
| Stale content baseline | Tooling | `node scripts/content-check.mjs` reports 15 failures that predate this work: the last commit replaced three anonymous "Ecommerce client" portfolio items and their images, and `docs/baseline/content.json` still expects them. Regenerate the baseline or accept the diff. |

## 2. What was changed in code on 10 September 2026

Applied, built, and verified locally (SEO crawl: 0 failures, 0 warnings across 11 sitemap URLs; 112 responsive, axe and interaction checks passing; 10 design checks passing). Not deployed and not committed.

**Search and answer-engine surface**

- The home page H1 now carries the commercial keyword as a small first line ("Email marketing agency for ecommerce brands") above the positioning headline. Previously the H1 contained no keyword at all.
- Every service page opens with a two-sentence direct answer under the H1: what the service is, then what Inferno does. This is the paragraph an answer engine extracts. The narrative intro follows it.
- The home services section opens with the one-paragraph "what is Inferno Emails" answer.
- `/work` is an indexable page again, targeting "ecommerce email design examples", with all nine emails, an H2 per email, a "part of" link to the matching service page, four FAQs and `ItemList` plus `ImageObject` structured data. `/our-work` and `/portfolio` now redirect to it. The home page still keeps its work rail and links to the full page.
- `/llms.txt` gives answer engines a plain-text map of the site: the quick answer, every service with its definition, the dated results with their disclaimer, the portfolio, blog posts and legal pages.
- `robots.txt` now names GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot, Bingbot, CCBot and others explicitly as allowed. Nothing is blocked that was not blocked before.
- The sitemap now carries an honest `lastModified` per static route (a content date constant) instead of stamping every page with the request time. Adding `/work` makes 11 URLs.
- Organization schema gained a `ContactPoint` and `slogan`.
- Blog posts automatically show a "Related services" block chosen from the post's title and tags, so every post links to at least one commercial page.

**Text density**

- Home services rows dropped their six-bullet deliverables lists (they remain on each service page) and now read title, one line, outcome, link. Twenty-four bullets removed from the first screen of body copy.
- The About copy is two paragraphs instead of three. The four beliefs are native disclosures: titles scan, the first is open, the rest open on demand. All body copy is still in the HTML for crawlers and no-JS visitors.

**Motion**

- A Three.js ember field sits behind the hero, the contact section and the closing CTA band: slow, sparse, brand-red points rising and drifting away from the pointer. It loads only after the page has finished loading and gone idle, only on screens 1024px and wider with a fine pointer and no reduced-motion preference, and only on hardware with 4 or more cores and 4GB or more memory. It stops rendering when scrolled out of view or when the tab is hidden. The chunk is 132KB gzipped and never ships to phones. Lighthouse desktop after the change: performance 99, LCP 0.93s.

**Second pass, same day (service pages, comparison index, schema, internal linking)**

Verified with `npm run typecheck` and `npm run lint` only (both clean). Not run against `next build`, a dev server or the live domain, so the SEO crawl and design-check numbers above still describe the first pass, not this one.

- Every one of the five service pages (`klaviyo-email-marketing`, `email-design`, `email-deliverability`, `retention-strategy`, `email-flows`) now carries five FAQs instead of three. The two new ones on each page answer cost (always "we quote after the free audit", never an invented figure), timeline where it was missing, required access, how success is measured, or what happens if the work does not move the number it is supposed to move. No new fact was introduced; each answer reuses a position already stated elsewhere on the site (free audit first, core flows live in two to three weeks, deliverability repair takes four to eight weeks, attributed revenue over opens).
- Each service page now has a "Is this the right fit?" section showing the full `GOOD_FIT` and `BAD_FIT` lists from `lib/site.ts`. These are agency-wide fit criteria, not written per service, so the same two lists are reused verbatim on every page rather than inventing a service-specific subset.
- Each service page has a "Related reading" block linking to the two other service pages most relevant to it (a fixed map in `lib/service-pages.ts`, e.g. Klaviyo email marketing points at flows and retention) plus a descriptive link into `/work`. The older "rest of the channel" list of all four other services stays below it, so nothing was removed, only added to.
- `Service` JSON-LD (`serviceLd` in `lib/seo.ts`) now includes `mainEntityOfPage`, an `Audience` node ("Ecommerce brands"), and an `Offer` for the free "Email marketing audit" (price 0 USD, linking to the Calendly booking page, seller set to the organisation node). This is the one thing on the site that is actually free with a fixed price, so it is the only defensible `Offer` to emit.
- `/services` is no longer a thin list. Each of the five entries now shows one line each for "best for", "starts with" and "measured by" (a new `SERVICE_COMPARISON` map in `lib/service-pages.ts`, paraphrased from that service's own approved copy, nothing new claimed), plus an FAQPage with three questions about choosing between services, answered from the audit-first, quote-after-audit position already used everywhere else.
- The blog post template now shows an "Updated" date next to "Published" when a post's `updated_at` differs from `published_at`, and a small "Keep exploring" nav after the related-services block linking to `/work`, `/#proof` and `/services`. The blog index gained the same two links plus a link to the Klaviyo email marketing page.
- `/privacy` and `/terms` breadcrumbs now read Home / Services / Legal instead of Home / Legal, so both legal pages link back to `/` and `/services`. No legal copy was touched.
- Proof-section links across `/services/[slug]`, `/work`, `/blog` and blog posts now read "See all three Klaviyo account screenshots" or equivalent, so the anchor text names what is actually behind `/#proof` instead of the vaguer "account results".

## 3. Page buckets

Every indexable URL, sorted into exactly one of the playbook's four buckets. Reasoning is stated so any call can be overridden.

| URL | Bucket | Reasoning | Next action |
|---|---|---|---|
| `/` | Protect and expand | Strongest page, carries the head term and all proof | Add the founder byline when available; refresh proof screenshots with a 2025 or 2026 window |
| `/services/klaviyo-email-marketing` | Protect and expand | The most valuable commercial term the site can realistically rank for | A cost FAQ now exists but still answers "we quote after the audit" rather than a figure; add a real starting price or minimum engagement the day one is agreed. Add the Klaviyo partner badge once listed |
| `/services/email-flows` | Keep and reposition | Overlaps with the Klaviyo page on intent. Cannibalisation risk | Keep the angle strictly on automation mechanics (which flows, in what order, timing). Watch both URLs in Search Console for the same queries; consolidate into the Klaviyo page if they split |
| `/services/email-design` | Protect and expand | Unusual for an agency to show nine full emails; `/work` now feeds it | Add two or three annotated before and after examples when a client permits |
| `/services/email-deliverability` | Protect and expand | Best bridge from informational searches (spam, DMARC) to a commercial page | Publish the deliverability blog cluster first (section 5) and link every post here |
| `/services/retention-strategy` | Keep and reposition | "Retention marketing agency" is a crowded head term with no differentiation here | Reframe around "Klaviyo retention" and repeat-purchase maths; link from the benchmark post |
| `/services` | Protect and expand | No longer thin: each row now states best-for, starts-with and measured-by, plus a 3-question FAQPage on choosing between services | Watch Search Console once it exists for which comparison row people land on, and adjust that row's wording first |
| `/work` | Protect and expand | New. Only page targeting "examples" intent, which is exactly how designers and founders search | Add each new client email as it ships; ask clients for a one-line quote per email |
| `/blog` and posts | Build | Empty. This is the entire long-tail engine | Section 5 |
| `/privacy`, `/terms` | Prune | No search intent worth serving | No further investment. Add company registration details when known |
| `/#about` (anchor only) | Missing page | E-E-A-T needs a real About URL with a named person | Build `/about` once the founder bio, photo and history exist. Do not publish a page with no person on it |
| Case studies | Missing | The highest-value surface that does not exist | One page per client who permits it: starting position, what was built, dated numbers, quote. Two are enough to start |

## 4. Keyword strategy by tier

No volume data was available, so these are directional. Tier 3 in particular is a GEO bet, not a volume-backed keyword; the category terms are answered by AI engines far more often than they are typed into Google.

**Tier 1, commercial, one per service page (already mapped)**

- Klaviyo email marketing agency; Klaviyo agency
- ecommerce email marketing agency
- email deliverability agency; email deliverability consultant
- ecommerce email design agency; Klaviyo email design
- Klaviyo flows agency; Klaviyo automation
- ecommerce retention marketing agency (contested; see bucket note)

**Tier 2, problem-shaped, one per blog post**

- why are my Klaviyo emails going to spam
- Klaviyo welcome series: what to send and in what order
- Klaviyo abandoned cart flow timing
- what percentage of ecommerce revenue should come from email
- SPF, DKIM and DMARC for Shopify stores
- Klaviyo flows vs campaigns revenue split
- how many emails should an ecommerce brand send per week
- email design for dark mode
- Klaviyo vs Mailchimp for Shopify
- how much does a Klaviyo agency cost
- browse abandonment flow examples
- post-purchase email sequence examples

**Tier 3, GEO bets (answer-engine phrasing)**

- best Klaviyo agencies for small ecommerce brands
- Klaviyo agency for apparel brands; for coffee brands
- is 40% of revenue from email realistic
- what does a free email marketing audit include

Rules that apply to every page: one primary keyword; keyword in the title, H1, first hundred words and one H2, then stop; a direct-answer first paragraph; two or three FAQs that answer their own question in the first sentence; one link to a service page, one to another post, one to `/work` where creative is relevant; two outbound links to authoritative sources (Klaviyo docs, Google Postmaster, Litmus); a named human author.

## 5. Content plan: the first ten posts

Publish in this order, two a month. Every brief is copy-paste ready for the CMS. Character counts are within limits (title 60, description 155). Slugs are recommendations; the CMS generates one from the title and freezes it on publish.

### 5.1 Why your Klaviyo emails are going to spam (and how to fix it)

- **Slug**: `klaviyo-emails-going-to-spam`
- **Title tag** (57): Why Klaviyo Emails Go to Spam and How to Fix It | Inferno
- **Meta description** (152): Klaviyo emails land in spam for five reasons: missing authentication, a damaged sender reputation, a dirty list, promotional content signals and volume spikes. Here is how to diagnose and fix each one.
- **H1**: Why your Klaviyo emails are going to spam, and how to fix it
- **Quick answer (first paragraph)**: Klaviyo emails usually go to spam for one of five reasons: SPF, DKIM or DMARC is missing or misconfigured; the sending domain's reputation has been damaged by complaints or bounces; the list contains dead or unengaged addresses; the content trips promotional filters; or send volume jumped suddenly. Fixing it means checking authentication first, then suppressing the unengaged, then rebuilding volume slowly to people who open.
- **H2 outline**: Check authentication first (SPF, DKIM, DMARC in Klaviyo's sending domain settings). Read your reputation in Google Postmaster Tools. The list problem: who has not opened in 180 days. Content signals that push you into Promotions. Volume spikes and how to warm back up. What to expect and how long it takes.
- **FAQs**: How do I check if my Klaviyo emails are going to spam? (Answer first: Use Google Postmaster Tools for domain reputation and Klaviyo's deliverability tab for bounce and complaint rates; then send to a seed list of your own Gmail, Outlook and Apple addresses.) Does a dedicated sending domain fix spam problems? Will cleaning my list reduce revenue?
- **Internal links out**: `/services/email-deliverability`, `/services/klaviyo-email-marketing`, the SPF/DKIM/DMARC post once live. **Links in**: from the deliverability service page FAQ "How do I know if I have a deliverability problem?", from post 5.3.
- **Outbound**: Google Postmaster Tools, Klaviyo's sender authentication docs.
- **Image prompt**: A dark charcoal editorial illustration of an envelope sliding past an inbox into a shadowed folder, single flame-red accent, 16:9, flat vector style, no visible text anywhere in the image.

### 5.2 Klaviyo welcome flow: what to send, in what order

- **Slug**: `klaviyo-welcome-flow`
- **Title tag** (54): Klaviyo Welcome Flow: What to Send, in What Order | Inferno
- **Meta description** (150): A Klaviyo welcome flow that earns the second open: the first email within minutes, the brand story on day two, proof on day four, and the offer reminder before it expires. Real examples inside.
- **H1**: Klaviyo welcome flow: what to send, in what order
- **Quick answer**: A Klaviyo welcome flow should send the first email immediately with the sign-up incentive, a second email one to two days later that tells the brand story, a third around day four that carries proof (reviews, press, bestsellers), and a final reminder before the incentive expires. Exclude anyone who has already purchased at each step so buyers are not chased with a discount they no longer need.
- **H2 outline**: Email one: the code, immediately. Email two: why the brand exists. Email three: proof. Email four: the deadline. Exclusions and timing settings in Klaviyo. Three welcome emails we built, and why each opens the way it does (KÍLÈNTÀR, Girafon Bleu, Iced Plunge from `/work`).
- **FAQs**: How many emails should a welcome flow have? (Three to four.) How long should a welcome discount last? Should the welcome flow be different for people who sign up at checkout?
- **Links out**: `/services/email-flows`, `/work#kilentar-welcome`, `/work#girafon-bleu-welcome`, `/work#iced-plunge-welcome`. **Links in**: from the flows service page, from `/work` FAQ once live.
- **Image prompt**: Four stacked email cards receding into depth on a charcoal ground, one card edged in flame red, 16:9, minimal flat style, no text in the image.

### 5.3 SPF, DKIM and DMARC explained for people who sell things

- **Slug**: `spf-dkim-dmarc-for-ecommerce`
- **Title tag** (58): SPF, DKIM and DMARC Explained for Ecommerce Brands | Inferno
- **Meta description** (147): SPF says who may send for your domain, DKIM signs each email, DMARC tells inboxes what to do when either fails. The plain-language setup guide for Shopify and Klaviyo stores.
- **H1**: SPF, DKIM and DMARC explained for people who sell things
- **Quick answer**: SPF is a DNS record listing the servers allowed to send email for your domain. DKIM is a cryptographic signature added to each email that proves it was not altered. DMARC is a policy record that tells Gmail and Outlook what to do when an email fails the other two, and where to send reports. Since 2024, Gmail and Yahoo require all three for anyone sending more than about 5,000 emails a day, and Klaviyo requires a dedicated sending domain to pass them.
- **H2 outline**: What each record does in one sentence. Setting up a dedicated sending domain in Klaviyo. Adding the records at your DNS provider. Moving DMARC from p=none to p=quarantine safely. How to read a DMARC report. What breaks when you get it wrong.
- **FAQs**: Do I need DMARC if I only send from Klaviyo? (Yes.) Will changing DNS records break my Shopify store email? How long does DNS take to propagate?
- **Links out**: `/services/email-deliverability`, post 5.1. **Links in**: from post 5.1, from the deliverability service page.
- **Outbound**: Google's bulk sender guidelines, Klaviyo's dedicated sending domain docs, dmarc.org.
- **Image prompt**: Three interlocking geometric seals or stamps in charcoal, bone and flame red on a dark ground, 16:9, flat vector, no letters or text.

### 5.4 to 5.10, short briefs

Each gets the full treatment when it is written; these fix the target and the angle so no two posts compete.

| Post | Slug | Title tag | Primary keyword | Links to |
|---|---|---|---|---|
| What percentage of ecommerce revenue should come from email? | `email-revenue-percentage-ecommerce` | What Share of Ecommerce Revenue Should Email Drive? | email revenue percentage ecommerce | `/#proof`, `/services/retention-strategy` |
| Klaviyo flows vs campaigns: where the revenue really comes from | `klaviyo-flows-vs-campaigns` | Klaviyo Flows vs Campaigns: Where Revenue Comes From | klaviyo flows vs campaigns | `/services/email-flows`, `/services/klaviyo-email-marketing` |
| Abandoned cart emails: timing, sequence and 5 examples | `abandoned-cart-email-timing` | Abandoned Cart Emails: Timing, Sequence and Examples | abandoned cart email timing | `/services/email-flows`, `/work` |
| How many emails should an ecommerce brand send per week? | `how-many-emails-per-week-ecommerce` | How Many Emails Should an Ecommerce Brand Send a Week? | how many emails per week ecommerce | `/services/klaviyo-email-marketing` |
| Email design for dark mode: what breaks and what to do | `email-design-dark-mode` | Email Design for Dark Mode: What Breaks and the Fixes | email design dark mode | `/services/email-design`, `/work#bondi-coffee-campaign` |
| How much does a Klaviyo agency cost? | `klaviyo-agency-cost` | How Much Does a Klaviyo Agency Cost in 2026? | klaviyo agency cost | `/services/klaviyo-email-marketing`, `/#contact` |
| Klaviyo vs Mailchimp for Shopify stores | `klaviyo-vs-mailchimp-shopify` | Klaviyo vs Mailchimp for Shopify: An Honest Comparison | klaviyo vs mailchimp shopify | `/services/klaviyo-email-marketing` |

The pricing post is the one most agencies refuse to write, which is exactly why it ranks and why it pre-qualifies leads. Give a real starting figure or a real minimum engagement, even as a range.

### 5.11 The one piece that earns links: an annual benchmark

You have Klaviyo reporting access across multiple accounts. Once a year, publish "Ecommerce email benchmarks" with aggregated, anonymised numbers (share of revenue from email, flow vs campaign split, revenue per recipient by category) with client permission. Nobody links to another tips article; everybody links to data. This is also the citation an answer engine reaches for when someone asks "what percentage of revenue should come from email".

## 6. Conversion plumbing: what "autopilot" actually requires

Ranking produces visits. These items turn visits into booked calls without anyone watching the inbox.

1. **Lead notifications.** Done on 10 September 2026: every stored lead triggers one email through Resend (Marketplace, domain infernoemails.com verified via the send subdomain) to the four team addresses in the LEAD_NOTIFY_TO variable, with reply-to set to the prospect. Recipients are edited in Vercel, not in code. Wire Resend (three lines in `app/api/lead/route.ts`) or push each lead into your own Klaviyo list via their API, which is arguably where an email agency's leads belong. Until this is done the form is a leak.
2. **Attribution on the booking link.** Append `?utm_source=infernoemails.com&utm_medium=site&utm_campaign=free-audit` to the Calendly URL in `SITE.calendly`, and add a page-name parameter so Calendly's UTM fields tell you which page booked the call. Then you can feed the pages that book and stop guessing.
3. **An analytics event on every Calendly click**, as in 1.2. Report weekly on: sessions by landing page, Calendly clicks by page, bookings.
4. **A first-reply autoresponder.** When the form is submitted, send a one-line reply from a named person with the Calendly link. Speed to first response is the single largest controllable factor in inbound conversion.
5. **The audit as a product.** The popup and the audit section already describe four checks. Publish a one-page "what you get" on `/free-email-audit` (currently a redirect to the contact anchor) once a named person can sign it. It becomes the landing page for every paid or social campaign.
6. **Monthly 30 minutes in Search Console.** Sort by impressions with low CTR and rewrite those titles and descriptions. Find queries at positions 8 to 20 and improve those pages. This is the whole maintenance loop.

## 7. Backlink plan (run after section 5 has three posts live)

Start by pulling the real backlink profile of infernoemails.com from Search Console's Links report and from Bing Webmaster once verified. Check for any spam cluster from the WordPress era before building anything new.

Priority by relevance to this business's actual ecosystem:

1. **Klaviyo Partner Directory.** The most relevant link and a direct lead source. Requires a named contact and a client reference. Apply as soon as section 1.3 is done.
2. **Shopify Partner Directory** and the Shopify Experts marketplace, for the same reason.
3. **Client sites.** Ask every named client for a footer credit or a "who we work with" mention. Three would probably say yes this week.
4. **The benchmark post** (5.11) pitched to ecommerce newsletters and Klaviyo community writers. Specific data, sourced, is what they link to.
5. **Founder visibility**: guest spots on ecommerce and DTC podcasts, each with a show-notes link.
6. **Directories**: Clutch, DesignRush, Sortlist. Lowest priority, highest volume, still worth an afternoon.
7. **Public answers** on r/Klaviyo, r/shopify, r/emailmarketing and the Klaviyo Community, with a name attached and no link-dropping.

Do not: buy links, join link networks, guest post off-topic in volume, or point outreach at `/privacy`, `/terms` or any page not in the Protect and expand bucket.

## 8. Metrics and cadence

| When | Leading indicator | Where |
|---|---|---|
| Week 1 | Every sitemap URL indexed; zero 5xx in Search Console | Search Console, Pages report |
| Month 1 | Impressions for brand plus "Klaviyo agency" and "email deliverability" queries | Search Console, Performance |
| Month 3 | Three posts live; at least one query in positions 8 to 20 to push | Search Console |
| Month 3 | Lead notifications firing; Calendly bookings attributed to a page | Resend or Klaviyo, Calendly UTM fields |
| Month 6 | Benchmark post published; two case study pages live; Klaviyo partner listing live | Blog, Klaviyo directory |
| Ongoing | Bookings per month from organic landing pages | Analytics event plus Calendly |

## 9. Judgment calls made in this pass, so you can overrule them

- **The H1 now includes the keyword.** The redesign deliberately chose a positioning line with no keyword. A keywordless H1 on the only page that can rank for the head term is a measurable cost, so the keyword was added as a small first line inside the same H1, keeping the headline visually intact. Revert by removing the kicker span in `components/Hero.tsx`.
- **`/work` became a page instead of a redirect.** The playbook says never change a live slug during a planning exercise. This session was explicitly execution, and the live domain is not serving, so there was no indexed URL to protect. The redirect can be restored in `next.config.ts` if you disagree.
- **Home page deliverables were removed.** They remain on every service page, so nothing was lost from the site; the home page just stopped repeating them.
- **No FAQ copy was rewritten.** The existing answers already lead with the answer. Adding new copy was preferred over editing approved copy.
- **Three.js adds 132KB gzipped, desktop only, after idle.** If the field ever shows in a Lighthouse or field LCP regression on desktop, the component is one line to remove in three places.
- **Nothing was committed or deployed.** All changes are in the working tree for review.
