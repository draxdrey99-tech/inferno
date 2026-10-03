# Volume plan: rank everywhere for ecommerce email marketing

Goal: own the ecommerce email and Klaviyo niche in Google and in AI answers (ChatGPT, Perplexity, Google AI Overviews, Gemini, Copilot) through sheer coverage, then convert it with the audit page.

Trigger: when the owner says "start", run the next wave in section 7. No further briefing needed.

## 1. What the research says (Oct 2026)

- **Google scaled content abuse policy.** Many pages made mainly to rank, not to help, are spam. Named patterns: mass AI generation with no editorial review, pure template-plus-variable substitution, and aggregators adding no context. Allowed: programmatic pages where each page has real, different value. Google does not penalise AI content for being AI, it penalises unhelpful, undifferentiated content at scale. A site-wide demotion would take the money pages down too, so this plan scales volume behind a uniqueness gate (section 4). [digitalapplied, layer3labs, rankbuilderseo]
- **Safe-volume thresholds found:** keep at least 30 to 40 percent of each page unique versus boilerplate; every page type needs a unique-data field that can never be empty; add a short human-reviewed paragraph (100 to 150 words) on borderline pages; real timestamps; pause new waves if indexing slips.
- **AI engines pick sources differently.** ChatGPT search leans on Bing's index and on reference and institutional sources. Perplexity favours fresh content (most citations come from pages under 30 days old) and community presence. Google AI Overviews cite pages that already rank in Google and expose a direct answer at the top of each section, with sourced figures and consistent schema. The three share only a small fraction of cited domains, so each needs its own work. Pages updated within the past year are about twice as likely to be cited. [aeohunt, wellows, gptmelo, leapd]
- **The niche's competition.** Top agencies (Flowium, InboxArmy, Retention Commerce, Chronos and others) rank through weekly blog output on ESP comparisons, benchmarks, flow optimisation and Klaviyo tips, plus "best Klaviyo agencies" listicles on their own and on third-party sites. AI engines recommend agencies from those listicles, so being listed in them is part of ranking. [flowium.com blog, inboxarmy listicles]
- **Verdict.** Head terms ("Klaviyo agency", "email marketing agency") are held by older, linked domains. The route to the top is: win thousands of specific long-tail queries, build topical authority, funnel it with internal links to the service pages, and add third-party mentions. Nobody can promise #1 or a date. Expect first movement in 6 to 10 weeks and real traction in 3 to 6 months.

## 2. The page families (the volume engine)

Every family has a unique-data field that must be filled. Target about 800 to 1,000 pages in 12 weeks.

| # | Family | Count | URL | Unique data per page |
|---|---|---|---|---|
| 1 | Glossary terms | 150 | `/glossary/{term}` | definition, example, common mistake, linked service |
| 2 | Klaviyo how-to and fix-it | 150 | `/klaviyo/{task}` | exact steps, screenshot-free checklist, pitfalls |
| 3 | Industry pages | 50 | `/email-marketing-for/{vertical}` | typical repurchase window, peak seasons, flows that matter, objections, compliance notes |
| 4 | Integration guides (Klaviyo + app) | 40 | `/klaviyo/integrations/{app}` | events the app sends, flows it enables, setup steps |
| 5 | Comparisons and alternatives | 20 | `/compare/{a}-vs-{b}` | feature-by-feature table, who each suits |
| 6 | Subject line and copy libraries | 25 | `/email-subject-lines/{type}` | 30 to 50 original examples per type with the reason each works |
| 7 | Calendar and event guides | 50 | `/email-calendar/{event}` | real dates, send plan, segment ideas, refreshed every year |
| 8 | Flow teardowns and templates | 40 | `/klaviyo-flows/{flow}` | trigger, timing, branch logic, copy outline |
| 9 | One-question FAQ pages | 200 | `/faq/{question}` | direct answer, short example, related links |
| 10 | Tools and calculators | 8 | `/tools/{tool}` | working tool (DMARC record generator, SPF checker, list decay and revenue calculators) |
| 11 | Blog (long-form) | 60 | `/blog/{slug}` | 1,400+ words, original angle, internal links |
| 12 | Case studies | 9 now, grow | `/work/{slug}` | real client, real screenshots |

Excluded on purpose: "Klaviyo agency in {city}" pages. We have no local presence, so they would be doorway pages, the clearest scaled-content violation. Revisit only if an office or real local clients exist.

## 3. Internal linking (this is how pages get crawled and ranked)

- Hub and spoke. Each family has a hub that links to every child. Hubs are in the footer and the services hub.
- Every page links to: its parent hub, 3 sibling pages, the relevant service page with descriptive anchor text, and `/free-email-audit`.
- Every page has at least 3 inbound links from other pages. The quality gate checks this.
- Ranking pages pass authority: once Search Console shows which pages get clicks, add links from those to new and weak pages.
- Money pages (service pages and the audit) receive links from every family so authority flows into them.

## 4. Quality gate (non-negotiable, automated)

`scripts/quality-gate.mjs` runs before every build and fails it if any page:
- has an empty unique-data field;
- has under 35 percent unique text against its family template;
- is under the family minimum words (glossary 150, how-to 300, industry 400, long-form 1,400);
- duplicates another page's title, description, H1 or first paragraph;
- has fewer than 3 inbound internal links or no link to a service page and the audit;
- contains an unsourced statistic, a client result not already on the site, or an em dash.

Each page also gets a short human-written context paragraph, a visible "last reviewed" date, and an accurate sitemap `lastmod`.

## 5. Rollout pacing

- Waves of 25 to 50 pages a week, not all at once. Check Search Console after each wave.
- If "Crawled, currently not indexed" or "Discovered, not indexed" rises above 30 percent of a wave, stop adding to that family, strengthen internal links and content, then resume.
- Ping IndexNow and request indexing in Bing on every wave.
- Do not delete or renumber URLs. Prefer more specific new slugs over rewrites.

## 6. AI search programme (runs alongside)

1. **Answer-first pages.** Direct answer in the first 60 words of every page and under every H2, in plain statements an engine can quote.
2. **Schema, consistent.** Organization, WebSite, BreadcrumbList on all pages; FAQPage only where the FAQs are visible; DefinedTerm on glossary; HowTo-style structure for how-tos; Dataset or Article for original data.
3. **Bing first.** Verify Bing Webmaster Tools, import from Search Console, keep IndexNow on. ChatGPT search leans on Bing.
4. **Freshness.** Quarterly refresh of the top 50 pages with real changes and visible dates; yearly refresh of the calendar family. Put the year in titles only where the content is year-specific.
5. **Third-party mentions.** Get listed where AI engines look: Clutch, GoodFirms, DesignRush, Sortlist, Google Business Profile, the Klaviyo partner directory, and the "best Klaviyo agencies" listicles (pitch the publishers with real reasons to include us).
6. **Community footprint.** Helpful, non-spam answers on Reddit (r/shopify, r/ecommerce, r/KlaviyoUsers), LinkedIn posts that repurpose each wave, YouTube explainers for the top how-tos. Links are a bonus; mentions are the point.
7. **`llms.txt` and `llms-full.txt`** generated from the content, updated every wave.
8. **Original data asset.** After 20 audits, publish an anonymised benchmark (flow coverage, DMARC adoption). Original numbers are what answer engines quote.
9. **Entity consistency.** Same name, description and links everywhere; named founder with `sameAs`; reviews on third-party profiles.
10. **Measurement.** A fixed list of 30 buyer prompts ("best Klaviyo agency for fashion brands", "how to fix Klaviyo emails going to spam") tested weekly in ChatGPT, Perplexity, Gemini and Copilot. Log whether we are cited and who is.

## 7. The waves

| Wave | Weeks | Build |
|---|---|---|
| 0 | done | Core pages, schema, audit page, GA events, glossary seed (7), industries (5), vs-in-house, 9 case pages, 5 blog drafts |
| 1 | 1 | Quality gate script, family templates, `content/` data format, hubs, llms-full; publish the 5 blog drafts after review |
| 2 | 2 | Glossary to 60, FAQ pages 50, subject-line libraries 8 |
| 3 | 3 | How-to and fix-it 50, integrations 15 |
| 4 | 4 | Industry pages to 25, flow teardowns 20, comparisons 8 |
| 5 | 5 | Calendar and event guides 25, tools (DMARC generator, SPF checker) |
| 6 | 6 | Glossary to 110, FAQ to 120, how-to to 100, integrations to 30 |
| 7 | 7 | Industry to 40, comparisons to 15, subject lines to 20, calendar to 40 |
| 8 | 8 | Remaining glossary, FAQ, how-to to targets; long-form blog 4 a week throughout |
| 9 to 12 | 9 to 12 | Fill to targets, refresh pass on pages with impressions, add links from winners, benchmark data post, listicle and directory outreach |

Each wave ends with: gate passes, build passes, `seo-check` passes, sitemap and llms files regenerated, commit, push, IndexNow ping, and a short report.

## 8. What the owner supplies (not blockers, but they compound results)

Search Console and Bing verification; named founder and photo; real testimonials with names; address and phone; a private repo; price bands (to add a pricing page); a newer client result.

## 9. What "start" does

1. Read this file and `docs/CHANGELOG.md` for the current wave.
2. Draft the wave's pages into `content/` with unique data, then run the quality gate.
3. Build, run `seo-check`, review a sample, commit, push, ping IndexNow.
4. Report: pages added, gate results, what is next, and anything needing the owner.
