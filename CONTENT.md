# Content still needed from you

Everything on the site today is either carried over from your old site, read
off your own watermarked Klaviyo screenshots, or a description of process. No
revenue figure, client count or result was invented.

That discipline leaves some gaps. They are listed below, roughly in order of
how much they matter.

---

## 0. The domain is not serving

On 10 September 2026 `infernoemails.com` returned HTTP 522 from Cloudflare on every page. DNS points at Cloudflare, not Vercel, and no Vercel project is linked to this repo. Section 1 of `docs/SEO-GEO-ROADMAP.md` has the exact steps. Everything else in this file is secondary to that.

## 1. Things I had to guess — check these before launch

These are live on the site right now and may be wrong.

| Where | Current value | File |
|---|---|---|
| Contact email | `hello@infernoemails.com` | `lib/site.ts` → `SITE.email` |
| Instagram URL | `instagram.com/infernoemails` | `lib/site.ts` → `SITE.instagram` |
| LinkedIn URL | `linkedin.com/company/infernoemails` | `lib/site.ts` → `SITE.linkedin` |
| Founded year | `2022` (from the old site's copyright) | `lib/site.ts` → `SITE.founded` |
| Domain | `infernoemails.com` | `NEXT_PUBLIC_SITE_URL` |

**The email address is the one to check first** — it is in the footer, the
contact page, both form fallback messages and the privacy policy. If it does
not exist, every "contact us" on the site is broken.

The LinkedIn URL is also emitted in `Organization` schema as a `sameAs`. A
wrong one is worse than none — delete the line rather than leave it guessed.

## 2. Client details I inferred

I derived these from the brand names. Correct anything wrong — they appear
under each testimonial. In `lib/site.ts` → `TESTIMONIALS`.

- Girafon Bleu — "Apparel — France"
- Bondi Coffee — "Coffee — Australia"
- Kuchenkompane — "Bakery — Germany"

I also lightly copy-edited the three testimonials for grammar only (`maked` →
`made`, `costumer` → `customer`). Meaning and voice are unchanged. The
originals are in `_legacy/index.html` if you want to compare.

**Better versions of these**, if you can get them: a real person's name and
job title beats a company name ("Marie Dubois, Founder" rather than "Girafon
Bleu"). Named humans are more credible to readers and count for more under
Google's E-E-A-T guidance.

## 3. Permission for the proof screenshots

The site shows three of your Klaviyo dashboards on the home page and `/work`,
with exact reporting windows. They are watermarked and no client is named
against them, but revenue figures are commercially sensitive.

**Confirm you have client permission to display these.** If not, say so and I
will pull them — but they are the strongest thing on the site, so it is worth
asking the clients.

Same question for the portfolio: eight client emails are shown with brand
names attached.

## 4. A human byline

The About page deliberately contains no invented biography — no founder story,
no team size, no awards. That was the right call, but it leaves the page
thinner than it should be.

Send me any of:
- Founder name, role and a couple of paragraphs of real history
- A photo (a real one, not a stock headshot — people can tell)
- Years of experience, previous roles, notable brands worked with

This also fixes the blog author field. Posts currently default to "Inferno
Emails", which emits `Organization` schema. A named person emits `Person`
schema, which is materially better for ranking on advice content.

## 5. Case-study pages — the biggest missing SEO surface

Right now `/work` is a gallery. What would move the needle is one indexable
page per client: the problem, what you built, and what it earned.

Each one ranks for its own long-tail terms, doubles as sales proof, and is the
kind of page other people actually link to. This is the single highest-value
addition left.

For each client you can name, I need:
- Starting position — what their email programme looked like before
- What you actually built, in order
- Numbers with a date range, ideally screenshot-backed
- A quote from them
- Permission to name them

Give me two of these and I will build the template plus the routes.

## 6. Pricing

There is currently no pricing anywhere. The FAQ says "we quote after the
audit", which is honest and fine.

If you want to filter out unqualified enquiries, a starting-from figure or a
minimum engagement size does that better than anything else. Your call —
plenty of good agencies show none.

## 7. Legal details

`/privacy` and `/terms` are written and reasonable, but they are generic. If
you are a registered company, add:
- Registered company name and number
- Registered address
- Governing jurisdiction for the terms

Have someone qualified read them if you are handling EU or UK personal data at
any volume.

## 8. Lead notifications

Form submissions go into the `leads` table. Nothing emails you when one
arrives — that needs a provider decision.

Options, cheapest first:
- **Resend** — three lines in `app/api/lead/route.ts`, free tier covers this
- **Klaviyo** — push the lead straight into your own list via their API, which
  is arguably where an email agency's leads belong
- **Slack webhook** — if you live in Slack

Tell me which and I will wire it.

## 9. Nice to have

- **A short founder video** for the home page or audit page. Both reference
  sites use one. It converts.
- **More portfolio pieces** — eight is decent, twelve to fifteen is a proper
  portfolio. 600px-wide full-length screenshots, same as the existing ones.
- **Client logos in SVG** — the current PNGs are small and get rendered as
  white silhouettes to stay legible on the dark background. SVGs would look
  sharper.
- **A higher-resolution logo.** The flame accents in the wordmark are only
  ~27×35px in the source file, which is why the favicon had to be smoothed.
  An SVG or a 2000px+ PNG would fix it permanently.
