import Image from 'next/image';
import Link from 'next/link';
import Marquee from './Marquee';
import { SITE, WORK, PROOF } from '@/lib/site';

/**
 * The H1 carries two lines. The kicker is the commercial keyword, set as a
 * mono micro-label so the headline still reads as the headline, but inside
 * the h1 so the page's single most important heading says what the business
 * is. The second line is the positioning statement: light weight, tight,
 * with one phrase rendered as an LED dot grid and two groups framed in
 * hairline HUD boxes.
 */
const kicker = 'Email marketing agency for ecommerce brands';
const headline = 'The cheapest revenue is already on your list.';

/* Word groups: which words share a hairline box, and which carry the LED
   accent. Joined, the words spell `headline` exactly. */
const GROUPS: { words: string[]; box?: boolean; led?: boolean }[] = [
  { words: ['The'] },
  { words: ['cheapest', 'revenue'], box: true, led: true },
  { words: ['is', 'already', 'on', 'your'] },
  { words: ['list.'], box: true },
];
if (GROUPS.flatMap((g) => g.words).join(' ') !== headline) {
  throw new Error('Hero word groups must spell the headline exactly.');
}
/* Running word index per group, so every .hero-mask keeps a stable key. */
const GROUP_OFFSETS = GROUPS.map((_, i) =>
  GROUPS.slice(0, i).reduce((n, g) => n + g.words.length, 0)
);

/* Capability ticker under the hero: the services and their deliverables,
   read as a strip of mono labels. Decorative, so the duplicate row that
   makes the loop seamless is hidden from assistive tech. */
const CAPABILITIES = [
  'Klaviyo flows',
  'Campaign design',
  'Deliverability',
  'Retention strategy',
  'Segmentation',
  'A/B testing',
  'Welcome flows',
  'Abandoned cart',
  'Post-purchase',
  'Winback',
  'List health',
  'SPF / DKIM / DMARC',
];

function TickerRow({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined}>
      {CAPABILITIES.map((c) => (
        <li key={c}>
          {c}
          <span aria-hidden="true">+</span>
        </li>
      ))}
    </ul>
  );
}

export default function Hero() {
  const words = (group: (typeof GROUPS)[number], base: number) =>
    group.words.map((word, i) => (
      <span className="hero-mask" key={base + i}>
        <span className="hero-word">
          {group.led ? <span className="accent">{word}</span> : word}
        </span>{' '}
      </span>
    ));
  return (
    <section id="hero" aria-labelledby="hero-title" className="hero">
      <div className="shell">
        <div className="hero-frame panel-grid panel-corners">
          <div className="hero-grid">
            <div className="hero-copy">
              <h1 id="hero-title" className="display-xl">
                <span className="hero-kicker mono-label mono-label-dot">{kicker}</span>
                <span className="hero-headline">
                  {GROUPS.map((group, g) =>
                    group.box ? (
                      <span className="hud-box" key={g}>
                        {words(group, GROUP_OFFSETS[g])}
                      </span>
                    ) : (
                      words(group, GROUP_OFFSETS[g])
                    )
                  )}
                </span>
              </h1>
              <p className="lede hero-subhead hero-desktop-only">
                Klaviyo flows, campaigns designed in your brand, and the
                deliverability work underneath so it actually reaches the inbox.
              </p>
              <p className="lede hero-subhead hero-mobile-only">
                Turn subscribers into repeat customers with better email marketing.
              </p>
              <div className="hero-actions">
                <a
                  href={SITE.calendly}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-flame"
                  data-magnetic
                >
                  Book your free audit
                </a>
                <Link href="#work" className="hero-secondary">
                  See the work
                </Link>
              </div>
              <p className="hero-risk">
                30 minutes, no obligation, and the findings are yours to keep.
              </p>
              <div className="hero-evidence">
                <a href="#proof">
                  <strong>47.96%</strong>
                  <span>
                    of revenue from email
                    <small>4 Sep - 4 Nov 2023 · View the account</small>
                  </span>
                </a>
                <p>
                  Creative for <b>KÍLÈNTÀR</b>, <b>Girafon Bleu</b> &amp;{' '}
                  <b>Bondi Coffee</b>
                </p>
              </div>
            </div>
            <div
              className="hero-art hero-desktop-only"
              aria-label="Client email creative and a separate, unattributed account result"
            >
              <div className="hero-art-label">
                <span className="mono-label mono-label-dot">Made for their inbox.</span>
              </div>
              <div className="hero-desk" data-tilt>
                {[WORK[1], WORK[2], WORK[0]].map((item, i) => (
                  <figure className={`hero-sheet sheet-${i}`} key={item.slug}>
                    <div className="sheet-window">
                      <Image
                        src={`/images/hero-${item.slug}.webp`}
                        alt={item.alt}
                        width={480}
                        height={620}
                        sizes="(max-width: 768px) 160px, 270px"
                        priority={i === 2}
                        loading={i === 2 ? undefined : 'eager'}
                      />
                    </div>
                    <figcaption>
                      {item.client} / {item.type}
                    </figcaption>
                  </figure>
                ))}
              </div>
              <figure className="hero-receipt panel-corners">
                <div>
                  <span>From the accounts</span>
                  <strong>$477,929.14</strong>
                  <small>Attributed to email · 4 Sep - 4 Nov 2023</small>
                </div>
                <Image
                  src={PROOF[0].image}
                  alt={PROOF[0].alt}
                  width={PROOF[0].width}
                  height={PROOF[0].height}
                  sizes="130px"
                  loading="lazy"
                />
                <figcaption>
                  Unattributed account. Client creative shown separately above.
                </figcaption>
              </figure>
            </div>
          </div>
        </div>
      </div>

      <details className="shell hero-mobile-work hero-mobile-only">
        <summary>
          See client work <span aria-hidden="true">+</span>
        </summary>
        <div className="hero-mobile-work-content">
          <p className="eyebrow">Email marketing for DTC &amp; ecommerce brands</p>
          <p className="lede">
            Klaviyo flows, campaigns designed in your brand, and the
            deliverability work underneath so it actually reaches the inbox.
          </p>
          <p className="hero-mobile-clients">
            Creative for <b>KÍLÈNTÀR</b>, <b>Girafon Bleu</b> &amp;{' '}
            <b>Bondi Coffee</b>
          </p>
          <p className="eyebrow">Made for their inbox.</p>
          <div className="hero-mobile-previews">
            {[WORK[0], WORK[1], WORK[2]].map((item) => (
              <a
                key={item.slug}
                href={item.image}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={`/images/hero-${item.slug}.webp`}
                  alt={item.alt}
                  width={480}
                  height={620}
                  sizes="30vw"
                  loading="lazy"
                />
                <span>{item.client}</span>
              </a>
            ))}
          </div>
          <Link href="/work" className="hero-secondary">
            See the work
          </Link>
          <p className="hero-mobile-clients">
            Separate account result: $477,929.14 attributed to email · 4 Sep -
            4 Nov 2023. Unattributed account; client creative shown separately
            above.
          </p>
          <div className="hero-mobile-stats">
            {[
              ['44-48%', 'of revenue from email, across the client accounts below'],
              [String(WORK.length), 'campaigns and flows designed from scratch, shown below'],
              [SITE.founded, 'building ecommerce email programmes since'],
              ['3', 'continents: Europe, Australia, United States'],
            ].map(([value, label]) => (
              <p key={label}>
                <strong>{value}</strong> {label}
              </p>
            ))}
          </div>
          <Marquee />
        </div>
      </details>

      <div className="shell hero-desktop-only">
        <div className="hero-stats panel-set">
          {[
            { value: '44-48%', label: 'of revenue from email, across the client accounts below' },
            { value: String(WORK.length), label: 'campaigns and flows designed from scratch, shown below' },
            { value: SITE.founded, label: 'building ecommerce email programmes since' },
            { value: '3', label: 'continents: Europe, Australia, United States' },
          ].map((s, i) => (
            <div key={s.label} className="panel">
              <span className="section-index" aria-hidden="true">.0{i + 1}.</span>
              <strong className="mt-3">{s.value}</strong>
              <p>{s.label}</p>
            </div>
          ))}
        </div>
        <div className="hero-logos">
          <Marquee />
        </div>
      </div>

      <div className="ticker mt-8" role="region" aria-label="Capabilities" tabIndex={0}>
        <div className="ticker-track">
          <TickerRow />
          <TickerRow hidden />
        </div>
      </div>
    </section>
  );
}
