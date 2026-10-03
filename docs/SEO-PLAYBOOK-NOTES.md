# Notes from "SEO playbook.md" (podcast transcript)

What we applied, what we left, and why. The speaker is one practitioner's opinion, so each point was checked against what suits a 15-page agency site.

## Applied
- **Many small, specific pages with contextual internal links.** New: `/email-marketing-for/*` (five kinds of store), `/glossary/*` (seven terms) and `/email-agency-vs-in-house`. Each links to the service page it belongs to, to related terms and to the audit, and is linked from the services hub, service pages and footer. The transcript's point: Google finds and indexes pages through links with context, not through a sitemap alone.
- **Page-per-question instead of one long FAQ.** The glossary pages are one answer each. Existing FAQ blocks and their schema stay.
- **Answer above the fold.** Every new page opens with a one-paragraph direct answer.
- **Brand name out of page titles.** `pageMeta` no longer appends " | Inferno Emails" unless `brand: true` is passed (kept for privacy and terms). More of the 60 characters goes to the keyword.
- **Backlinks.** Partner link swaps and Bing Webmaster Tools are added to `docs/BACKLINK-PLAYBOOK.md`. No bought links, no disavow.

## Operating rules to follow from here (no code change)
- **Publish, then read the data.** Do not polish before a page ranks. After 30 days of Search Console data, use the queries a page sits on page two for as its H2 headings.
- **A page stuck at "Crawled, currently not indexed"** needs a link from a page that already gets organic traffic. Republishing on a more specific URL only helps when the original URL was too broad for the site's authority. Do not do this to pages that are working.
- **Link from the ranking pages to new pages** with descriptive anchor text, rather than waiting for a crawl.
- **Specific URL slugs** matter: describe the page, in the words a buyer types.

## Not applied, and why
- **Buying exact-match domains and building satellite sites.** A real tactic in the transcript, but it spreads the brand, costs money and needs a decision from the owner. Not done.
- **Dropping schema.** The speaker downplays it. It is harmless here and used by answer engines, so it stays.
- **"Google ignores content quality" and "thin content is fine".** Not safe to rely on. Pages here are kept short but each is written to be useful on its own, and the count is kept modest.
- **Click-through manipulation.** Mentioned only as something to detect. Not used.
- **Claims about sitemaps.** The sitemap stays; it costs nothing.
