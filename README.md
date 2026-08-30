# Inferno Emails

Marketing site and blog CMS for Inferno Emails, built on Next.js 16 (App
Router) and deployed on Vercel.

The previous site was a WordPress/Elementor export — a single 106 KB
`index.html` plus 16 stylesheets and 18 scripts. It is preserved untouched in
`_legacy/` and is not part of the build.

---

## Stack

| Concern | Choice | Why |
|---|---|---|
| Framework | Next.js 16, App Router | Server-rendered metadata, ISR for blog posts, native sitemap/robots/OG generation |
| Styling | Tailwind CSS v4 | Design tokens live in `@theme` in `app/globals.css` |
| Type | Archivo (display) + Geist (body) via `next/font` | Self-hosted at build; no render-blocking font request, no layout shift |
| Database | Neon Postgres (`@neondatabase/serverless`) | HTTP driver, no pooling to manage inside serverless functions |
| Images | Vercel Blob | CMS uploads |
| Editor | TipTap v3 | Rich text in `/admin` |
| Auth | `jose` JWT in an httpOnly cookie | Single admin, no user table |
| Icons | `@phosphor-icons/react` | One family, one weight, no hand-rolled SVG |

---

## Getting started

```bash
npm install
cp .env.example .env.local     # fill in the values
npm run db:migrate             # creates the posts + leads tables
npm run dev                    # http://localhost:3000
```

The site runs without a database — the blog shows an empty state and the
contact form returns a clear error rather than silently dropping submissions.
Everything else works.

---

## Project layout

```
app/
  layout.tsx              Root shell, fonts, global metadata, Organization JSON-LD
  page.tsx                Home
  services/               Services index + 4 keyword-targeted sub-pages
  work/                   Portfolio + Klaviyo proof screenshots
  about/  contact/        Company pages
  free-email-audit/       Lead-magnet landing page (main conversion target)
  blog/                   Blog index + [slug] post pages (ISR, 5 min)
  admin/                  Password-gated CMS (noindex)
  api/                    Lead capture, admin auth, posts CRUD, image upload
  sitemap.ts robots.ts    Generated, includes every published post
  opengraph-image.tsx     Dynamic social card
  icon.png apple-icon.png Favicons, generated from the brand flame

components/               Nav, Footer, EmailCard, Faq, AuditForm, admin/…
lib/
  site.ts                 ALL marketing copy, services, clients, proof data
  seo.ts                  Metadata helper + JSON-LD builders
  blog.ts                 Slugs, sanitisation, schema, queries
  db.ts  auth.ts  og.tsx
scripts/migrate.mjs       Database schema
public/images/            Brand assets, portfolio, client logos, proof
_legacy/                  The old WordPress export (excluded from the build)
```

**Editing marketing copy:** almost all of it lives in `lib/site.ts`. Services,
client list, testimonials, portfolio items, process steps and the home FAQ are
data, not markup — change them there and every page that uses them updates.

---

## Deploying to Vercel

1. Push this directory to a Git repository.
2. In Vercel: **Add New → Project**, import the repo. The framework is
   detected automatically; no build settings to change.
3. **Storage → Create Database → Neon.** Connect it to the project. This sets
   `DATABASE_URL` for you.
4. **Storage → Create → Blob.** This sets `BLOB_READ_WRITE_TOKEN`.
5. **Settings → Environment Variables** — add:
   - `NEXT_PUBLIC_SITE_URL` = `https://infernoemails.com`
   - `BLOG_ADMIN_PASSWORD` = a long random string
6. Deploy, then run the migration once against production:
   ```bash
   vercel env pull .env.local
   npm run db:migrate
   ```
7. **Settings → Domains** — add `infernoemails.com` and `www.infernoemails.com`.
   The `www → apex` 301 is already configured in `next.config.ts`.

---

## Using the CMS

Go to `/admin` and sign in with `BLOG_ADMIN_PASSWORD`.

Every field that affects search is on the editor screen:

- **Title / slug / excerpt** — the slug auto-generates from the title until the
  post is first published, then it freezes so live URLs don't break.
- **Content** — rich text, or switch to **Source** and paste Markdown or HTML
  (Markdown is converted, HTML is sanitised on save). Use **H2** for sections;
  they become the in-page table of contents and the heading anchors.
- **Meta title / description** — with live character counters that turn amber
  when too short and red when Google would truncate them.
- **Canonical URL** — only if the piece was published somewhere else first.
- **Tags** — drive the "keep reading" related-posts block.
- **Author** — a real person's name emits `Person` schema instead of the
  company byline. Better for E-E-A-T. Use one.
- **FAQs** — rendered as an accordion *and* emitted as `FAQPage` schema. This
  is what wins the expandable answers in Google. Add two or three to every post.
- **Custom structured data** — optional extra JSON-LD (e.g. `HowTo`), merged
  with the automatic `BlogPosting` + `BreadcrumbList` + `FAQPage`.

Publishing revalidates `/blog`, the post URL and the sitemap immediately — you
do not wait for the ISR window.

Images are uploaded to Vercel Blob. **Alt text is mandatory** — the editor
refuses to insert an image without it.

---

## Where the leads go

Both forms (`/free-email-audit` and `/contact`) POST to `/api/lead`, which
validates, rejects bots via a honeypot field, and inserts into the `leads`
table. Read them with:

```sql
SELECT created_at, name, email, company, website, source, message
FROM leads ORDER BY created_at DESC;
```

There is deliberately **no email notification wired up yet** — that needs an
email provider decision (Resend, Postmark, or a Klaviyo webhook). Until then,
check the table or add a notification in `app/api/lead/route.ts`.

---

## Scripts

| Command | Does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Production build |
| `npm run db:migrate` | Create/update the `posts` and `leads` tables |
| `npm run seo:check` | Crawl a running site and assert the SEO basics |
| `npm run taste:check` | Crawl a running site and assert the design rules |

---

## Brand assets

`public/images/` holds the generated brand files:

| File | What |
|---|---|
| `wordmark-light.png` / `wordmark-dark.png` | The logo with the white plate keyed out, recoloured for dark and light backgrounds |
| `flame.png` / `flame-smooth.png` | The flame accent isolated from the wordmark |
| `app/icon.png`, `app/apple-icon.png` | Favicons, built from the flame |
| `proof-klaviyo-*.png` | The client Klaviyo dashboards |
| `work-*.png` | Portfolio email screenshots |
| `client-*.png` | Client logos, padding trimmed |

These are committed, so nothing needs regenerating at build time. Note that
the flame accents are only ~27x35px in the original logo file, which is why
the favicon had to be upscaled and smoothed — a vector or high-res logo would
fix that permanently (see `CONTENT.md`).

## The old site

`_legacy/` holds the original WordPress/Elementor export exactly as it was.
It is kept in git as the only copy, and excluded from deployments via
`.vercelignore` — nothing serves it and nothing imports from it.

## See also

- **[DESIGN.md](./DESIGN.md)** the design system and the rules that keep it
  consistent. Read it before adding a section or touching `globals.css`.
- **[SEO.md](./SEO.md)** — what is already handled in code, and the work that
  has to come from you.
- **[CONTENT.md](./CONTENT.md)** — the content and assets still needed.
