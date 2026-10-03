# SEO audit: infernoemails.com

**Audited:** 16 September 2026
**Stack:** Next.js on Vercel
**Indexable URLs:** 11
**Business type:** B2B agency (ecommerce email marketing)

The build is better than almost every agency site you will audit this year. Canonicals, schema, robots rules, sitemap and metadata are all correct. That is also the problem: everything that was cheap to fix in code has been fixed, and nothing that actually wins rankings has been done. The site is 11 URLs, zero blog posts, zero case studies and zero named humans, competing in one of the most saturated agency niches there is.

---

## Score: 61 / 100 (weighted)

| Category | Weight | Score |
|---|---|---|
| Technical SEO | 22% | 82 |
| Content quality | 23% | 24 |
| On-page SEO | 20% | 66 |
| Schema | 10% | 74 |
| Core Web Vitals | 10% | 70 |
| AI search readiness | 10% | 68 |
| Images | 5% | 62 |

Technical execution carries the score. Content quality drags it down by roughly 18 points on its own.

**46 findings: 6 critical, 16 high, 14 medium, 10 low.**

---

## Critical: fix this week

These either stop the site being found at all, or carry business risk beyond rankings.

### C1. The blog is empty and the site is only 11 URLs
*Content*

**Problem.** `/blog` renders "First posts are on the way." There is not one published post. The entire informational layer of the site does not exist, so there is nothing to rank for any non-brand query, nothing to earn a link, nothing for an answer engine to cite, and nothing to link internally into the service pages.

**Evidence.** Live fetch of `/blog`, empty state rendered. The sitemap generates 7 static routes plus 5 service pages and no post routes. `/rss.xml` is live and empty.

**Fix.** Ten posts, minimum 1,400 words each, on the queries your buyers actually type: Klaviyo emails going to spam, welcome flow sequence and timing, SPF/DKIM/DMARC for store owners, abandoned cart benchmarks, Klaviyo vs Mailchimp for ecommerce, what an email agency costs, flow coverage checklist. Two a week for five weeks beats ten in one dump.

### C2. No confirmed Search Console or Bing property, and no IndexNow
*Technical*

**Problem.** Without a verified Domain property you have no index coverage data, no query data, no way to request indexing, and no warning when something breaks. Bing matters twice over: it feeds Copilot and ChatGPT search, so skipping it removes you from a large share of answer-engine surfaces.

**Evidence.** No verification meta tag in the rendered head of any page, and no DNS verification recorded in the repo. The repo's own roadmap lists this as outstanding.

**Fix.** GSC Domain property, DNS TXT verification, submit `https://infernoemails.com/sitemap.xml`, inspect and request indexing on the home page, the five service pages and `/work`. Import into Bing Webmaster Tools. Add an IndexNow key route and ping on publish: Next.js makes this a ten-line route handler.

### C3. Your highest-intent URLs are redirects into homepage anchors
*On-page*

**Problem.** `/about`, `/contact`, `/contact-us`, `/free-email-audit` and `/audit` all 301 to a fragment on the home page. A fragment cannot rank independently, cannot carry its own title, cannot hold its own schema, and cannot be measured. "Free email marketing audit" and "free Klaviyo audit" are the single highest-intent queries in your category and you have deliberately deleted the page that would win them.

**Evidence.** `next.config.ts` redirect table, lines for `/about`, `/contact`, `/free-email-audit`, `/audit`.

**Fix.** Build three real pages: `/free-email-audit` (Offer plus FAQPage schema, the whole audit scope, what you send back, sample findings), `/about` (AboutPage plus Person schema), `/contact` (ContactPage plus the form). Keep the anchors on the home page; they are a different job.

### C4. There is no named human anywhere on the site
*E-E-A-T*

**Problem.** No founder, no team, no author, no photo, no bio, no LinkedIn profile of a person. You are asking strangers to hand over read-only access to a revenue-generating Klaviyo account, and the site is anonymous. Google's experience and authoritativeness signals for commercial service sites lean heavily on identifiable people, and answer engines will not attribute expertise to a logo.

**Evidence.** Every live page fetched. The only Person node in the codebase is `authorNode()`, which falls back to the company name when a post has no author.

**Fix.** Founder name, role, photo, real history, and a Person node with `sameAs` to a LinkedIn profile, marked as author on every post and referenced from the Organization node as `founder`. This one change unlocks C3, H2, H3 and most of the AI search section.

### C5. The full site source is in a public GitHub repository
*Security*

**Problem.** `github.com/draxdrey99-tech/inferno` is public. It contains the entire codebase, the `/admin` CMS route, the auth approach (a single shared password in an httpOnly cookie, no user table), the environment variable names, the deployment steps, and internal strategy documents including client trust notes. Anyone can read how to find and attack the login. It is also how I read your stack in five minutes.

**Evidence.** Repo cloned anonymously. `README.md`, `lib/auth.ts`, `docs/SEO-GEO-ROADMAP.md`.

**Fix.** Make the repo private today. Rotate `BLOG_ADMIN_PASSWORD`. Add rate limiting and lockout on `/api/admin/login`. Keep `/admin` disallowed in robots, which it already is, and add `noindex` on the route as a second layer.

### C6. Cloudflare in front of Vercel, with a 522 outage on record
*Technical*

**Problem.** On 10 September 2026 every URL on the domain returned HTTP 522 (origin timeout), including for GPTBot, and `www` timed out entirely. It is serving now, but two caching and redirect layers fighting each other is exactly how that recurs. An outage during a crawl cycle drops pages out of the index and you will not know, because of C2.

**Evidence.** Outage recorded in `docs/SEO-GEO-ROADMAP.md` sections 0 and 1.1, plus an apex/www redirect loop caused by Vercel and `next.config.ts` disagreeing on the canonical host.

**Fix.** Pick one edge. Either grey-cloud the DNS records and let Vercel serve, or keep Cloudflare on Full (strict) with Rocket Loader, Auto Minify and Email Obfuscation off. Do not run redirect rules in both. Set up uptime monitoring with an alert.

---

## High: fix within a month

These are the difference between being eligible to rank and actually ranking.

### H1. No case study pages
*Content*

**Problem.** Nine client emails across `/work`, presented as a gallery, and not one dedicated URL. You cannot rank for "Klaviyo welcome flow example", "luxury fashion email marketing case study", or any client-name query. A gallery converts; a case study ranks and converts.

**Fix.** `/work/kilentar`, `/work/bondi-coffee` and so on. Brief, problem, what you built, screenshots, result, quote. Article or CaseStudy schema, ImageObject per email.

### H2. Testimonials are attributed to company names only
*E-E-A-T*

**Problem.** Three quotes, each credited to a brand and a country, no person, no role, no photo, no link. A reader cannot verify them and neither can a crawler. They also cannot legitimately be marked up as reviews in this state.

**Fix.** Get a name and role for each, plus written permission. Then mirror them onto a third-party surface you do not control (Clutch, G2, Trustpilot, Google Business Profile). Off-site reviews are the ones that carry weight.

### H3. No Review or AggregateRating schema, and no third-party review profile
*Schema*

**Problem.** Zero review markup anywhere in the codebase. For agency queries, review-rich competitors take the click even at a lower position, and answer engines lean on aggregator profiles when asked to recommend an agency.

**Fix.** Claim Clutch and Google Business Profile, gather three to five reviews, then reference them. Note that self-serving reviews on your own Organization node are not eligible for rich results, so the profiles are the real work, not the markup.

### H4. Blog posts will publish with the company as author
*Schema*

**Problem.** `authorNode()` defaults to `SITE.name`, producing `{"@type":"Person","name":"Inferno Emails"}`, which is a malformed entity: a Person that is actually an Organization. That is worse than no author node.

**Fix.** Real Person node with `url`, `sameAs`, `jobTitle` and `knowsAbout`, referenced by `@id` from every BlogPosting.

### H5. Service pages are thin against the competitive set
*On-page*

**Problem.** The Klaviyo page runs roughly 700 words of unique body copy. Agencies ranking top three for "Klaviyo email marketing agency" run 1,800 to 3,000 words with process detail, deliverables, timelines, pricing bands, FAQs and case links. You are entering with a brochure.

**Fix.** Triple each service page. Add: what the first 30 days look like, what you need from the client, sample deliverables, the flows you build and why, common mistakes, a pricing band, two case links, six to eight FAQs.

### H6. The services hub duplicates the home page services section
*On-page*

**Problem.** `/services` is roughly 450 words and repeats the home page's service blurbs almost verbatim, because both render from the same objects in `lib/site.ts`. Two URLs competing on "ecommerce email marketing services" with the same text.

**Fix.** Make the hub do a job the home page cannot: a genuine comparison, a decision tree ("start here if your opens fell off a cliff"), the engagement model, and what each service costs in rough terms.

### H7. Blocks of the home page are rendered twice in the DOM
*Technical*

**Problem.** The stats row (44 to 48%, 9, 2022, 3) and the client logo strip each appear twice in the served HTML, and the hero work cards appear twice. This looks like desktop and mobile variants both rendered and hidden with CSS. It doubles the payload for those sections, duplicates text in the extractable content that answer engines parse, and adds layout work at paint.

**Fix.** Render once and handle the layout difference in CSS, or gate on a container query. If a duplicate is decorative (the logo marquee clone), mark it `aria-hidden="true"` and confirm it is not doubling the extracted text.

### H8. No pricing page
*Content*

**Problem.** "How much does an email marketing agency cost" and "Klaviyo agency pricing" are high-volume, high-intent, and answered on your site in a single FAQ line that says you quote after the audit. Buyers who cannot find a number leave and find a competitor who publishes one.

**Fix.** A pricing page that explains the model and gives bands ("most engagements land between X and Y per month, depending on send volume and design load"). You keep the quote-after-audit policy, you just stop being invisible for the query.

### H9. An email marketing agency with no email capture
*Conversion*

**Problem.** There is no newsletter sign-up, no lead magnet, no pop-up, nothing. The only conversion path is booking a call or filling in a contact form, both of which demand a high-commitment decision on the first visit. For a business whose entire pitch is "the cheapest revenue is already on your list", it is also a credibility problem a prospect will notice.

**Fix.** Build your own list. A genuinely useful lead magnet (the flow coverage checklist, or a deliverability self-audit) behind an email capture, then run the nurture sequence you would build for a client. It is the best case study you will ever have.

### H10. Mobile LCP is 2.63s, over the Good threshold
*Core Web Vitals*

**Problem.** Your own recorded Lighthouse mobile run gives 96 performance with an LCP of 2.63s. The Good threshold is 2.5s. Three large hero images sit above the fold, plus a duplicated logo strip (H7).

**Fix.** One priority hero image with `priority` and an explicit `sizes`, the other two lazy. Preload the LCP image. Drop hero `quality` to 65. Re-measure with field data in Search Console once C2 is done, because lab scores are not what Google ranks on.

### H11. Multi-megabyte PNGs, linked as raw originals
*Images*

**Problem.** `work-nikos-welcome.png` is 2.2MB. `work-kilentar.png` is 1.05MB, `work-bondi.png` 900KB, `work-girafon.png` 612KB. Next.js optimises them for display, but the gallery links to the raw file (`/images/work-kilentar.png`), so a click serves the full uncompressed PNG. Those raw files can also get indexed in place of your pages.

**Fix.** Convert all portfolio artwork to WebP at a sane width (the hero versions are already WebP at 25 to 46KB, so the pipeline exists). Point the gallery links at case study pages instead of image files, which fixes H1 at the same time.

### H12. Every primary CTA leaves the site
*Conversion*

**Problem.** Roughly 15 CTAs across the site, all pointing to `calendly.com`. No on-site booking page means no page-level attribution, no conversion event by default, no remarketing audience, and a measurable drop-off at the domain change.

**Fix.** Embed Calendly on `/free-email-audit` (see C3) and send every CTA there instead. Fire a GA4 event on booking. Then you can finally answer which page produces a booking.

### H13. Keyword-stuffed eyebrow labels above headings
*On-page*

**Problem.** Labels like ".02.ecommerce email design agency" and ".04.ecommerce retention marketing agency" sit above the real headings on the home page and the services hub, in lowercase, reading as exact-match keyword insertion rather than as copy. It is the one part of the site that looks optimised rather than written.

**Fix.** Either write them as real labels a human would use, or work the keyword into the H2 and the opening sentence instead, where it does more and looks like less.

### H14. No local presence: no address, no phone, no Business Profile
*Local*

**Problem.** The Organization node carries `areaServed: "Worldwide"`, an email and nothing else. No `PostalAddress`, no `telephone`, no Google Business Profile. "Email marketing agency near me" and city-level agency queries carry real volume and real intent, and you are not eligible for any of them.

**Fix.** Claim the Business Profile with whatever address you legitimately have, even a registered office. Add address and phone to the schema and the footer. Consider one location page for your primary market.

### H15. Locale says en_US, the site is written in British English
*Technical*

**Problem.** `og:locale` is `en_US` and `SITE.locale` is `en_US`, while the copy uses "programmes", "optimised" and a GBP proof figure, and `<html lang>` is the generic `en`. Minor on its own, but it is a contradictory signal on a site serving three continents with one language version.

**Fix.** Pick one. If the primary market is the UK, set `en_GB` and `lang="en-GB"`. If it is the US, change the spelling. Do not leave them disagreeing.

### H16. No internal linking depth and no anchor text variety
*On-page*

**Problem.** With no blog and no case studies, every internal link comes from navigation, the footer, or a hand-written "related reading" row. Each service page receives roughly the same links with roughly the same anchor text from roughly the same places. There is no topical reinforcement because there is no topic content.

**Fix.** Falls out of C1 and H1. Each post should link to one service page with descriptive anchor text and to two sibling posts. Build the cluster map before writing, not after.

---

## Medium: fix this quarter

Optimisation opportunities, not blockers.

**M1. Duplicate FAQPage entities across four URLs** *(Schema)*
Home, the services hub and each service page all emit FAQPage, and several questions repeat across them ("how much does it cost", "do you only work in Klaviyo"). Keep FAQPage on the page where each question is genuinely primary, and vary the wording so Google is not choosing between four near-identical answers.

**M2. The "who this is for / not for" lists are identical on home and service pages** *(Content)*
Ten bullets, copied verbatim, rendering from the same constant. Write a service-specific fit list for each page.

**M3. No AboutPage, ContactPage or CollectionPage entities** *(Schema)*
The graph has Organization, ProfessionalService, WebSite, BreadcrumbList, Service, FAQPage and ItemList. Missing the page-type nodes, and the blog index has no `Blog` node. Add once C3 creates the pages to attach them to.

**M4. Proof screenshots carry no ImageObject markup** *(Schema)*
Three Klaviyo dashboard screenshots are the strongest asset on the site and the most citable thing you own, and they are plain images with alt text. Mark each as ImageObject with a caption, creator and date range. The portfolio already does this; the proof section does not.

**M5. No visible freshness signal** *(Content)*
No published or updated date on any marketing page, and `CONTENT_UPDATED` is a hand-maintained constant in `lib/site.ts` that feeds sitemap `lastModified`. It will go stale the first time someone edits copy without bumping it. Surface a "last reviewed" date on service pages and derive it from git rather than a constant.

**M6. The proof data is from 2022 and 2023** *(Content)*
Every result on the site covers windows between December 2022 and November 2023. In late 2026 that reads as an agency with nothing recent to show. Refresh with a current client window, or state plainly why these are the ones you can publish.

**M7. No comparison or alternatives content** *(Content)*
Nothing targeting "Klaviyo vs Mailchimp", "email agency vs in-house", "Klaviyo agency alternatives", or any competitor-brand comparison. These are the pages answer engines pull from when someone asks which agency or which platform to use.

**M8. LinkedIn sameAs was guessed at build time** *(Schema)*
`SITE.linkedin` is `linkedin.com/company/infernoemails/` and the repo's own notes flag the contact details as unverified guesses. A `sameAs` pointing at a page you do not own is worse than omitting it. Verify or remove, and note that LinkedIn is not linked in the site footer at all, only Instagram, on a B2B site.

**M9. llms.txt is well built and mostly empty** *(AI search)*
The file is correct, cached properly and follows the convention, but its Blog section falls back to a bare index link because there are no posts, and there is no `llms-full.txt`. Answer engines get your positioning and no substance. Fixed by C1; add the full variant once there are ten posts.

**M10. No extractable statistics of your own** *(AI search)*
Answer engines cite numbers with a named source. Every figure on your site is a client result behind a "results vary" disclaimer, which is the right disclaimer and the wrong citation target. Publish one original data asset a year: benchmark flow coverage or send frequency across the accounts you have audited, anonymised. This is also the only thing on this list likely to earn links passively.

**M11. No image sitemap and no video anywhere** *(Images)*
A portfolio site with 20-plus original design images and no image sitemap loses an easy discovery channel. No video means no VideoObject, no YouTube surface, and nothing to show in a results page that increasingly favours it.

**M12. No off-site presence to link from** *(Authority)*
One Instagram account. No Klaviyo partner directory listing, no Clutch, no agency directories, no guest posts, no podcast appearances. Zero referring domains earned by design. The Klaviyo partner directory alone is a relevant, high-authority link you are eligible for and have not claimed.

**M13. Legacy WordPress redirects cover five patterns and no more** *(Technical)*
`/infernomedia/*`, `/home`, `/our-work`, `/portfolio` and the contact aliases are handled. Nothing covers old post URLs, category or tag archives, or attachment pages, which is what a WordPress site usually leaves behind. Pull the old URL list from the Wayback Machine and map anything with links.

**M14. Analytics is conditional on an environment variable** *(Measurement)*
GA4 only loads when `NEXT_PUBLIC_GA_ID` is set in Vercel, and there is no way to confirm from outside that it is. Verify it fires in production, add Vercel Web Analytics alongside it, and define the conversion events before you start publishing, not after.

---

## Low: backlog

**L1. GoogleAnalytics renders outside the body element** *(Technical)*
In `app/layout.tsx` the component sits between `</body>` and `</html>`. It works, but it is invalid nesting and a hydration warning waiting to happen. Move it inside the body.

**L2. Sitemap priority and changeFrequency are ignored** *(Technical)*
Google has said for years it does not use either. Harmless, but the code comments treat them as meaningful. The `lastModified` handling is the part that matters and it is already right.

**L3. twitter:card is set with no account behind it** *(On-page)*
Cards are configured, `twitter:site` is absent, and there is no X account. Either claim the handle or accept that the markup does nothing.

**L4. No breadcrumb on the blog index** *(Schema)*
Service pages and posts have BreadcrumbList. `/blog` has a visible trail missing in both HTML and schema.

**L5. speakable cssSelector targets #answer and h1** *(Schema)*
SpeakableSpecification is officially limited to news publishers and does nothing here. Harmless, but it is noise in the graph.

**L6. Font loads with display: optional** *(Core Web Vitals)*
Good for CLS, but on a slow first visit the brand face may never paint. `swap` with a metric-adjusted fallback is usually the better trade for a brand-led site.

**L7. Content baseline check reports 15 stale failures** *(Tooling)*
`scripts/content-check.mjs` fails against `docs/baseline/content.json` because portfolio items changed and the baseline was not regenerated. A check nobody trusts is a check nobody runs.

**L8. No custom 404 recovery paths** *(On-page)*
A 404 page exists. Give it the three links a lost visitor actually wants: services, work, book an audit.

**L9. No security.txt or humans.txt** *(Technical)*
Not a ranking factor. Cheap trust signal for a site handling client account access.

**L10. No hreflang, one language version, three continents** *(Technical)*
Correct for now. Revisit only if you build market-specific pages, in which case do it properly with return tags.

---

## Ten quick wins, in order

| # | Fix | Ref | Effort |
|---|---|---|---|
| 1 | Make the GitHub repo private and rotate the admin password | C5 | 10 min |
| 2 | Verify Search Console and Bing, submit the sitemap, request indexing | C2 | 1 hour |
| 3 | Build `/free-email-audit` as a real page with the Calendly embed | C3, H12 | 1 day |
| 4 | Add the founder: name, photo, bio, Person schema, LinkedIn | C4 | 1 day |
| 5 | Compress the nine portfolio PNGs to WebP | H11 | 1 hour |
| 6 | De-duplicate the doubled home page DOM blocks | H7 | 2 hours |
| 7 | Claim the Klaviyo partner directory listing and Google Business Profile | M12, H14 | 2 hours |
| 8 | Get names and roles onto the three testimonials | H2 | 2 emails |
| 9 | Fix the locale contradiction (`en_GB` or US spelling) | H15 | 15 min |
| 10 | Rewrite the keyword-stuffed eyebrow labels | H13 | 30 min |

---

## Ninety-day plan

| When | Work | Owner | Effort |
|---|---|---|---|
| Week 1 | Quick wins 1, 2, 5, 9, 10. Settle the Cloudflare and Vercel edge, add uptime monitoring. | Dev | 1 day |
| Week 2 | `/free-email-audit`, `/about`, `/contact` as real pages with their schema. Move every CTA on-site. GA4 conversion events. | Dev, Content | 3 days |
| Weeks 3 to 4 | Expand five service pages to 1,800 words plus. Rewrite the services hub so it stops duplicating the home page. | Content | 1 week |
| Weeks 3 to 12 | Two blog posts a week, 1,400 words plus, clustered around the five services. Internal links planned before writing. | Content | Ongoing |
| Weeks 5 to 6 | Three case study pages from the strongest accounts. Point the gallery at them instead of raw PNGs. | Content, Dev | 1 week |
| Week 6 | Lead magnet plus email capture, then run your own nurture sequence. | Marketing | 3 days |
| Weeks 7 to 8 | Pricing page. Comparison pages: Klaviyo vs Mailchimp, agency vs in-house. | Content | 1 week |
| Weeks 9 to 12 | Directory listings, review profiles, the original benchmark data asset, outreach to the three Klaviyo publications worth pitching. | Marketing | Ongoing |

---

## What is already right, so nobody breaks it

- Self-referencing canonicals on every route, generated not hand-written.
- Unique, length-controlled titles and meta descriptions on all 11 URLs.
- A real entity graph: Organization plus ProfessionalService plus WebSite with stable `@id` values, BreadcrumbList, Service, FAQPage, ItemList for the portfolio.
- robots.txt naming 14 AI crawlers explicitly, all allowed, with `/admin` and `/api` excluded.
- llms.txt served correctly with sensible caching.
- Sitemap built from real routes with honest `lastModified` dates rather than request time.
- Security headers: HSTS with preload, nosniff, frame options, referrer policy, permissions policy. Immutable caching on images.
- Self-hosted fonts, no render-blocking third-party CSS, AVIF and WebP image formats enabled.
- Semantic HTML, one H1 per page, skip link, visible focus, descriptive alt text everywhere.
- The home page H1 now carries the commercial keyword.

---

## How this was audited, and what it could not see

- Live HTML fetched for the home page, `/services`, `/services/klaviyo-email-marketing` and `/blog` on 16 September 2026. Rendering, metadata, headings, internal links and copy read from the served output.
- The remaining findings come from the site's public source repository, which covers the parts a fetch cannot reach: redirect rules, robots and sitemap generation, schema construction, image weights, headers and analytics wiring.
- No Search Console, Bing, analytics, rank tracking or backlink data was available, so there are no impressions, positions, traffic figures or search volumes anywhere in this report, and no competitor gap analysis based on real SERP data. Priorities are judged on intent and category norms. Redo the prioritisation once Search Console has 30 days of data.
- Core Web Vitals figures are lab numbers from the project's own recorded Lighthouse run, not field data. Treat them as indicative only.
- `/robots.txt`, `/sitemap.xml` and `/llms.txt` were verified from source rather than fetched live. Confirm each returns 200 in production before relying on the technical scores.
