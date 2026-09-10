import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Check,
  ChartLineUp,
  ListChecks,
  MagnifyingGlass,
  Rocket,
  ShieldCheck,
  UsersThree,
  X,
} from '@phosphor-icons/react/dist/ssr';

import Hero from '@/components/Hero';
import AuditPopup from '@/components/AuditPopup';
import ProofScenes from '@/components/ProofScenes';
import GalleryControls from '@/components/GalleryControls';
import EmailCard from '@/components/EmailCard';
import Faq from '@/components/Faq';
import AuditForm from '@/components/AuditForm';
import JsonLd from '@/components/JsonLd';
import { SERVICE_PAGES } from '@/lib/service-pages';
import { faqLd, pageMeta, serviceLd } from '@/lib/seo';
import {
  AUDIT_CHECKS,
  AUDIT_FAQS,
  BAD_FIT,
  BELIEFS,
  GOOD_FIT,
  HOME_FAQS,
  PROCESS,
  QUICK_ANSWER,
  SERVICES,
  SITE,
  SITE_URL,
  TESTIMONIALS,
  WORK,
} from '@/lib/site';

export const metadata: Metadata = pageMeta({
  title: 'Ecommerce Email Marketing Agency | Inferno Emails',
  description:
    'Email marketing agency for ecommerce brands. We build Klaviyo flows, design campaigns in your brand and fix deliverability. Free audit, no obligation.',
  path: '/',
});

/* The marketing site is one page. Everything that used to live on /services,
   /work, /about, /contact and /free-email-audit is a section here, and the
   nav scrolls between them. /blog is the only route with a page of its own.

   Every section opens with a decorative mono index (".02. / Services"),
   aria-hidden, then the headline. Sentence-case eyebrows are kept on the
   proof, work and audit sections. */

const ALL_FAQS = [...HOME_FAQS, ...AUDIT_FAQS];

const PROCESS_ICON = [MagnifyingGlass, Rocket, ChartLineUp];

const AUDIT_ICON = [ListChecks, UsersThree, ShieldCheck, ChartLineUp];

/** Decorative section index in the reference's ".01." style. */
function Index({ n, label }: { n: string; label: string }) {
  return (
    <p className="section-meta" aria-hidden="true">
      <span className="section-index">.{n}.</span>
      <span className="mono-label">{label}</span>
    </p>
  );
}

/**
 * Wireframe service marks: thin dotted geometry in grey with one dashed red
 * inner shape, drawn inline so nothing is downloaded. Decorative only.
 */
function WireIcon({ kind }: { kind: string }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1,
    strokeDasharray: '2 3',
    vectorEffect: 'non-scaling-stroke' as const,
  };
  const red = { fill: 'none', stroke: '#f51717', strokeWidth: 1, strokeDasharray: '3 3' };
  return (
    <svg className="wire" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
      {kind === 'klaviyo-email-marketing' && (
        <>
          <path d="M48 6 90 48 48 90 6 48Z" {...common} />
          <path d="M48 24 72 48 48 72 24 48Z" {...common} />
          <rect x="38" y="38" width="20" height="20" {...red} />
          <rect x="46" y="46" width="4" height="4" fill="#f51717" />
        </>
      )}
      {kind === 'email-design' && (
        <>
          <rect x="14" y="8" width="68" height="80" {...common} />
          <path d="M14 24h68" {...common} />
          <rect x="24" y="34" width="48" height="22" {...red} />
          <path d="M24 66h48M24 74h30" {...common} />
          <rect x="46" y="14" width="4" height="4" fill="#f51717" />
        </>
      )}
      {kind === 'email-deliverability' && (
        <>
          <path d="M48 6 86 27v42L48 90 10 69V27Z" {...common} />
          <path d="M48 22 72 36v28L48 78 24 64V36Z" {...common} />
          <path d="M48 34 62 60H34Z" {...red} />
          <rect x="46" y="46" width="4" height="4" fill="#f51717" />
        </>
      )}
      {kind === 'retention-strategy' && (
        <>
          <circle cx="48" cy="48" r="42" {...common} />
          <circle cx="48" cy="48" r="26" {...common} />
          <path d="M48 22a26 26 0 0 1 26 26" {...red} />
          <path d="M48 74a26 26 0 0 1-26-26" {...red} />
          <rect x="44" y="44" width="8" height="8" {...red} />
          <rect x="46" y="46" width="4" height="4" fill="#f51717" />
        </>
      )}
    </svg>
  );
}

export default function HomePage() {
  return (
    <>
      <JsonLd data={faqLd(ALL_FAQS)} />
      {SERVICE_PAGES.map((s) => (
        <JsonLd
          key={s.slug}
          data={serviceLd({
            name: s.title,
            description: s.summary,
            path: `/services/${s.slug}`,
          })}
        />
      ))}
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Offer',
          '@id': `${SITE_URL}/#audit-offer`,
          name: 'Free email marketing audit',
          description:
            'A manual review of your ecommerce email programme: flow coverage, list health, deliverability and last-90-day performance.',
          price: '0',
          priceCurrency: 'USD',
          availability: 'https://schema.org/InStock',
          url: SITE.calendly,
          seller: { '@id': `${SITE_URL}/#organization` },
        }}
      />

      <Hero />
      <ProofScenes />

      {/* --------------------------------------------------- SERVICES ---- *
       * Four hairline panels in a 2x2 set, each with a wireframe mark. The
       * opening paragraph is the extractable answer to "what is Inferno
       * Emails". Deliverables live on the service pages. */}
      <section aria-label="Services" id="services" className="scroll-mt-20 section-rule">
        <div className="shell py-20 md:py-28">
          <div className="reveal section-head max-w-3xl">
            <Index n="02" label="Services" />
            <h2 className="display-lg">
              Four jobs, run as <span className="accent">one system.</span>
            </h2>
            <p className="lede" id="answer">{QUICK_ANSWER}</p>
          </div>

          <div className="ruler mt-14" aria-hidden="true" />
          <div className="service-rows panel-set">
            {SERVICES.map((s, i) => (
              <article
                key={s.slug}
                className="panel panel-grid service-panel reveal"
                data-reveal-delay={i * 70}
              >
                <div className="service-panel-top" aria-hidden="true">
                  <span className="section-index">.0{i + 1}.</span>
                  <span className="mono-label">{s.keyword}</span>
                </div>
                <WireIcon kind={s.slug} />
                <h3 className="display-md">
                  <Link href={`/services/${s.slug}`} className="service-title-link">
                    {s.title}
                  </Link>
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-mute">{s.summary}</p>
                <Link href={`/services/${s.slug}`} className="btn-line">
                  What is included in {s.navTitle.toLowerCase()}
                </Link>
              </article>
            ))}
          </div>
          <p className="reveal mt-10 text-[0.9375rem] text-mute">
            Flows are their own job too.{' '}
            <Link href="/services/email-flows" className="text-flame underline underline-offset-4 hover:text-bone">
              Email flows and automation
            </Link>
            , or see{' '}
            <Link href="/services" className="text-flame underline underline-offset-4 hover:text-bone">
              all five services
            </Link>
            .
          </p>
        </div>
      </section>

      {/* ------------------------------------------------- HOW TO START ---- *
       * The commercial hinge of the page: what happens if you click. Three
       * steps as hairline panels, then the offer on a red-to-charcoal
       * gradient panel behind one centred button, with the pricing rule
       * stated plainly so nobody has to guess. */}
      <section aria-label="How to start" id="start" className="scroll-mt-20 section-rule">
        <div className="shell py-20 md:py-28">
          <div className="reveal grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-end lg:gap-20">
            <div className="section-head">
              <Index n="03" label="How to start" />
              <h2 className="display-lg">
                Audit. Build. <span className="accent">Compound.</span>
              </h2>
            </div>
            <div>
              <p className="lede">
                No ninety-day discovery phase. We are in your account in week
                one and sending by week two.
              </p>
              <a href="#proof" className="btn-line mt-5">
                See the account screenshots
              </a>
            </div>
          </div>

          <ol className="start-steps panel-set mt-14" aria-label="Our process">
            {PROCESS.map((step, i) => {
              const Icon = PROCESS_ICON[i];
              return (
                <li key={step.title} className="panel panel-grid start-step reveal" data-reveal-delay={i * 100}>
                  <div className="start-step-head">
                    <span className="section-index" aria-hidden="true">.{step.index}.</span>
                    <div className="start-step-icon">
                      <Icon size={18} weight="light" aria-hidden />
                    </div>
                  </div>
                  <h3 className="display-md">{step.title}</h3>
                  <p className="text-[0.9375rem] leading-relaxed text-mute">{step.body}</p>
                </li>
              );
            })}
          </ol>

          <div className="start-box cta-gradient panel-corners reveal mt-6">
            <div className="rule-dots w-full max-w-xs" aria-hidden="true" />
            <h3 className="start-box-title">Step one is free, and it is the whole first call</h3>
            <ul className="start-chips" aria-label="What the free audit covers">
              {AUDIT_CHECKS.map((c) => (
                <li key={c.index}>
                  <a href="#audit">
                    <Check size={13} weight="bold" aria-hidden />
                    {c.title}
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-flame mt-2"
            >
              Book your free audit
            </a>
            <p className="start-note">
              30 minutes. Written findings you keep either way. We quote
              after the audit, and only if we think we can help.
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- WORK ---- *
       * Gallery rail. The only place a repeated card grid earns its keep. */}
      <section
        aria-label="Client email designs"
        id="work"
        className="scroll-mt-20 section-rule bg-ink-raised"
      >
        <div className="shell py-20 md:py-28">
          <div className="reveal section-head max-w-2xl">
            <Index n="04" label="Work" />
            <p className="eyebrow">Creative</p>
            <h2 className="display-lg">
              Emails that look like <span className="accent">your brand.</span>
            </h2>
            <p className="lede">
              Every piece is drawn from scratch for the brand it belongs to.
              Hover to read one, or tap to open it full-size.
            </p>
            <p className="text-[0.9375rem] leading-relaxed text-mute">
              First up: KÍLÈNTÀR, the London luxury womenswear house whose
              founder, Michelle Adepoju, made the Forbes 30 Under 30 Europe list
              in 2025.
            </p>
          </div>

          <GalleryControls />
          <div
            id="work-rail"
            className="work-rail mt-6"
            role="region"
            aria-label="Email design portfolio"
            tabIndex={0}
          >
            {WORK.map((item, i) => (
              <div key={item.slug} className="reveal" data-reveal-delay={(i % 3) * 90}>
                <EmailCard item={item} />
              </div>
            ))}
          </div>
          <div className="reveal mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <div>
              <p className="mono-label">Want emails like these?</p>
              <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt-3">
                Book your free audit
              </a>
              <p className="mt-3 text-[0.8125rem] text-mute">30 minutes, no obligation, and the findings are yours to keep.</p>
            </div>
            <Link href="/work" className="btn-line">
              See all {WORK.length} emails on one page
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------ ABOUT ---- */}
      <section
        aria-label="About Inferno Emails"
        id="about"
        className="scroll-mt-20 section-rule"
      >
        <div className="shell py-20 md:py-28">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <div className="reveal section-head">
              <Index n="05" label="About" />
              <h2 className="display-lg">
                Every agency wants your money.{' '}
                <span className="accent">We want the account.</span>
              </h2>
              <div className="mt-2 space-y-6 text-[1.0625rem] leading-relaxed text-bone/85 md:text-[1.125rem]">
                <p>
                  Building email and retention programmes for ecommerce brands
                  since 2022, across apparel, coffee, bakery, wellness and
                  kitchen goods in Europe, Australia and the US.
                </p>
                <p>
                  Most brands treat email as an afterthought: a sale newsletter
                  bolted onto three half-built flows, while the customers who
                  already trust them barely hear from them. We take that
                  channel over and run it properly.
                </p>
                <p className="accent display-md">
                  You grow, we grow. That is the entire business model.
                </p>
              </div>
            </div>

            <div className="reveal" data-reveal-delay="110">
              <p className="lede mb-8">Our aim: Turn your email list into your most profitable channel.</p>
              <h3 className="eyebrow">What we believe</h3>
              <div className="beliefs mt-5">
                {BELIEFS.map((b, i) => (
                  <details key={b.index} className="belief" open={i === 0}>
                    <summary>
                      <h4 className="font-display text-lg tracking-tight md:text-xl">
                        {b.title}
                      </h4>
                    </summary>
                    <p className="text-[0.9375rem] leading-relaxed text-mute">
                      {b.body}
                    </p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* ------------------------------------------------ who / who not */}
          <div className="mt-20 md:mt-28">
            <h3 className="reveal display-lg max-w-4xl">
              We are a very good fit for some brands and{' '}
              <span className="accent">a waste of money</span> for others.
            </h3>

            <div className="panel-set cols-2 mt-14">
              <div className="panel panel-grid fit-panel reveal">
                <h4 className="text-flame">
                  <span className="section-index" aria-hidden="true">.01.</span>
                  Good fit
                </h4>
                <ul className="mt-7 space-y-4">
                  {GOOD_FIT.map((t) => (
                    <li
                      key={t}
                      className="flex gap-3.5 text-[0.9375rem] leading-relaxed text-bone/85"
                    >
                      <Check
                        size={16}
                        weight="bold"
                        aria-hidden
                        className="mt-1 shrink-0 text-flame"
                      />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="panel panel-grid fit-panel reveal" data-reveal-delay="110">
                <h4 className="text-mute">
                  <span className="section-index" aria-hidden="true">.02.</span>
                  Bad fit
                </h4>
                <ul className="mt-7 space-y-4">
                  {BAD_FIT.map((t) => (
                    <li
                      key={t}
                      className="flex gap-3.5 text-[0.9375rem] leading-relaxed text-mute"
                    >
                      <X
                        size={16}
                        weight="bold"
                        aria-hidden
                        className="mt-1 shrink-0 text-mute"
                      />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="reveal mt-10 text-[0.9375rem] text-mute">
              Not sure which you are?{' '}
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="text-flame underline underline-offset-4 hover:text-bone"
              >
                Book your free audit
              </a>
              . We will tell you straight, and you can walk away with the
              findings.
            </p>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------- TESTIMONIALS ---- */}
      <section aria-label="Client testimonials" className="section-rule bg-ink-raised">
        <div className="shell py-20 md:py-28">
          <div className="reveal section-head max-w-3xl">
            <Index n="06" label="Clients" />
            <h2 className="display-lg">
              Don’t just take <span className="accent">our word</span> for it.
            </h2>
          </div>

          <div className="panel-set cols-3 mt-14">
            {TESTIMONIALS.map((t, i) => (
              <figure
                key={t.author}
                className="panel panel-grid testimonial reveal"
                data-reveal-delay={i * 100}
              >
                <span className="section-index" aria-hidden="true">.0{i + 1}.</span>
                <blockquote>“{t.quote}”</blockquote>
                <figcaption>
                  <span>{t.author}</span>
                  <span>{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="reveal mt-10 text-[0.9375rem] text-mute">
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="text-flame underline underline-offset-4 hover:text-bone"
            >
              Book your free audit
            </a>{' '}
            and see what we would find in yours.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------ AUDIT CHECKS ---- */}
      <section aria-label="Free audit scope" id="audit" className="scroll-mt-20 section-rule">
        <div className="shell py-20 md:py-28">
          <div className="reveal section-head max-w-3xl">
            <Index n="07" label="Scope" />
            <p className="eyebrow">The free audit</p>
            <h2 className="display-lg">
              Four things that decide{' '}
              <span className="accent">almost everything.</span>
            </h2>
            <p className="lede">
              Before the call we review your account properly. By a person, not
              an automated PDF generator.
            </p>
          </div>

          <div className="ruler mt-14" aria-hidden="true" />
          <div className="panel-set cols-2">
            {AUDIT_CHECKS.map((c, i) => {
              const Icon = AUDIT_ICON[i];
              return (
                <div
                  key={c.index}
                  className="panel panel-grid audit-panel reveal"
                  data-reveal-delay={(i % 2) * 90}
                >
                  <div className="audit-panel-top">
                    <span className="section-index" aria-hidden="true">.{c.index}.</span>
                    <Icon size={22} weight="light" aria-hidden />
                  </div>
                  <h3 className="display-md mt-8">{c.title}</h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed text-mute">{c.body}</p>
                </div>
              );
            })}
          </div>

          <div className="reveal mt-10">
            <a
              href={SITE.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-flame"
            >
              Book your free audit
            </a>
            <p className="mt-3 text-[0.8125rem] text-mute">
              30 minutes. No obligation. We quote after, and only if we can
              help.
            </p>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------------- FAQ ---- */}
      <section aria-label="Frequently asked questions" id="faq" className="scroll-mt-20 section-rule">
        <div className="shell py-20 md:py-28">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
            <div className="reveal section-head lg:sticky lg:top-28 lg:self-start">
              <Index n="08" label="FAQ" />
              <h2 className="display-lg max-w-2xl">
                The things people <span className="accent">actually ask.</span>
              </h2>
              <p className="text-[0.9375rem] text-mute">
                Still deciding?{' '}
                <a
                  href={SITE.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-flame underline underline-offset-4 hover:text-bone"
                >
                  Book your free audit
                </a>{' '}
                and ask us directly.
              </p>
            </div>
            <div className="reveal max-w-3xl">
              <Faq items={ALL_FAQS} />
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- CONTACT ---- *
       * Two ways in: book the call, or send the details and let us come    *
       * back to you. Same destination, different appetite for a calendar.  */}
      <section
        aria-label="Book or request your audit"
        id="contact"
        className="scroll-mt-20 relative isolate overflow-hidden bg-ink-raised"
      >
        <div className="shell relative grid gap-14 py-20 lg:grid-cols-[1fr_1.05fr] lg:gap-20 lg:py-28">
          <div className="reveal section-head content-start">
            <Index n="09" label="Contact" />
            <h2 className="display-lg">
              Find out what your list is{' '}
              <span className="accent">actually worth.</span>
            </h2>
            <p className="lede">
              Pick a time and we will walk your account with you: what is
              missing, what is leaking, and what we would do about it. No fee,
              no obligation, and the findings are yours to keep.
            </p>

            <div className="mt-2">
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-flame"
              >
                Book your free audit
              </a>

              <AuditPopup bookingUrl={SITE.calendly} checks={AUDIT_CHECKS.map((check) => check.title)} />
            </div>

            <ul className="mt-6 space-y-3 border-t border-[#3d3d3d] pt-8">
              {[
                'Reviewed by a person, not an automated PDF generator',
                'One business day turnaround if you send it in writing',
                'Written findings you can hand to any agency, including not us',
              ].map((t) => (
                <li key={t} className="flex gap-3.5 text-[0.9375rem] text-bone/80">
                  <Check
                    size={16}
                    weight="bold"
                    aria-hidden
                    className="mt-0.5 shrink-0 text-flame"
                  />
                  {t}
                </li>
              ))}
            </ul>

            <dl className="contact-meta mt-6 grid gap-6 border-t border-[#3d3d3d] pt-8 sm:grid-cols-2">
              <div>
                <dt>Email</dt>
                <dd className="mt-2">
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </dd>
              </div>
              <div>
                <dt>Instagram</dt>
                <dd className="mt-2">
                  <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">
                    @infernoemails
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="card panel-grid panel-corners reveal p-7 md:p-10" data-reveal-delay="110">
            <p className="eyebrow">Written request</p>
            <h3 className="display-md mt-5">Rather not book a call?</h3>
            <p className="mt-2 text-[0.875rem] text-mute">
              Send the details and we will come back within one business day.
            </p>
            <div className="mt-8">
              <AuditForm source="home-contact" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
