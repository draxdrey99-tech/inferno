import Revenue from './Revenue';
import Image from 'next/image';
import { PROOF, SITE } from '@/lib/site';

const amounts = [477929.14, 98625.63, 9100.94];

/**
 * Receipts. Three dark hairline ledger panels; the Klaviyo screenshots are
 * the only light objects on the page, which is the point: the evidence is
 * the paper. `.proof-panel`, `.proof-amount` and the revenue reel structure
 * are load-bearing for the digit animation and the site checks.
 */
export default function ProofScenes() {
  return (
    <section id="proof" className="proof-section" aria-labelledby="proof-title">
      <div className="shell">
        <div className="ruler" aria-hidden="true" />
        <div className="proof-heading">
          <div>
            <p className="eyebrow">
              <span className="section-index" aria-hidden="true">.01. / </span>
              Receipts, not adjectives
            </p>
            <h2 id="proof-title" className="display-lg">
              Screenshots of real <span className="accent">Klaviyo accounts.</span>
            </h2>
          </div>
          <p className="lede">
            Client dashboards, exact reporting windows shown. On these three,
            email accounted for 44% to 48% of total store revenue.
          </p>
        </div>

        {PROOF.map((p, i) => (
          <article className="proof-scene" key={p.image} aria-label={p.headline}>
            <div className="proof-panel panel-grid panel-corners">
              <div className="proof-readout">
                <p className="proof-window">{p.window}</p>
                <p className="proof-amount">
                  <Revenue
                    amount={new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: i === 2 ? 'GBP' : 'USD',
                    }).format(amounts[i])}
                  />
                </p>
                <h3>{p.headline}</h3>
                <p className="proof-share">{p.metric}</p>
                <p className="proof-note">{p.note}</p>
              </div>
              <figure className="proof-picture">
                <a
                  href={p.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open original dashboard: ${p.window}`}
                >
                  <Image
                    src={p.image}
                    alt={p.alt}
                    width={p.width}
                    height={p.height}
                    sizes="(max-width:1024px) 90vw, 55vw"
                    loading="lazy"
                  />
                </a>
                <figcaption>
                  Klaviyo / Unattributed client account <span>Open original screenshot</span>
                </figcaption>
              </figure>
            </div>
          </article>
        ))}

        <p className="proof-disclaimer">
          Results vary by brand, list size, category and offer. These are
          individual client accounts over the periods stated, not an average or
          a guarantee of what your store will do.
        </p>
        <p className="proof-next">
          <span>Want to know what your account is doing?</span>
          <a href={SITE.calendly} target="_blank" rel="noopener noreferrer" className="btn btn-flame">
            Book your free audit
          </a>
          <a href="#start" className="proof-next-link">
            How it works
          </a>
        </p>
      </div>
    </section>
  );
}
