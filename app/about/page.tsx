import Image from 'next/image';
import Link from 'next/link';

import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { breadcrumbLd, founderLd, pageLd, pageMeta } from '@/lib/seo';
import { BELIEFS, CLIENTS, FOUNDER, SITE } from '@/lib/site';

export const metadata = pageMeta({
  title: 'About Inferno Emails: Ecommerce Email Agency',
  description:
    'Inferno Emails has run email and retention programmes for ecommerce brands since 2022, across Europe, Australia and the United States.',
  path: '/about',
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ])}
      />
      <JsonLd
        data={pageLd({
          type: 'AboutPage',
          path: '/about',
          name: 'About Inferno Emails',
          description: 'Who Inferno Emails is, how we work and who we work with.',
        })}
      />
      <JsonLd data={founderLd()} />

      <section className="shell inner-page" aria-labelledby="about-title">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <span>About</span>
        </nav>

        <p className="section-meta" aria-hidden="true">
          <span className="section-index">.01.</span>
          <span className="mono-label">About</span>
        </p>
        <h1 id="about-title" className="display-xl mt-5 max-w-4xl">
          Every agency wants your money.{' '}
          <span className="hud-box">We want the account.</span>
        </h1>
        <div className="mt-8 max-w-3xl space-y-6 text-[1.0625rem] leading-relaxed text-bone/85">
          <p id="answer">
            {SITE.name} is an email marketing agency for ecommerce brands. We
            have built and run email and retention programmes since{' '}
            {SITE.founded}, across apparel, coffee, bakery, wellness and kitchen
            goods in Europe, Australia and the United States.
          </p>
          <p>
            Most brands treat email as an afterthought: a sale newsletter
            bolted onto three half-built flows, while the customers who already
            trust them barely hear from them. We take that channel over and run
            it properly: Klaviyo flows, campaigns designed in your brand, and
            the deliverability work underneath so it all reaches the inbox.
          </p>
          <p className="accent display-md">
            You grow, we grow. That is the entire business model.
          </p>
        </div>
      </section>

      {FOUNDER && (
        <section className="shell section-space border-t" aria-labelledby="about-founder">
          <p className="section-meta" aria-hidden="true">
            <span className="section-index">.02.</span>
            <span className="mono-label">Founder</span>
          </p>
          <div className="mt-6 grid gap-10 md:grid-cols-[220px_1fr] md:items-start">
            {FOUNDER.photo && (
              <Image
                src={FOUNDER.photo}
                alt={`${FOUNDER.name}, ${FOUNDER.role} of ${SITE.name}`}
                width={440}
                height={440}
                sizes="220px"
                className="h-auto w-full max-w-[220px]"
              />
            )}
            <div>
              <h2 id="about-founder" className="display-md">{FOUNDER.name}</h2>
              <p className="mono-label mt-2">{FOUNDER.role}</p>
              <p className="mt-5 max-w-2xl text-[1rem] leading-relaxed text-bone/85">{FOUNDER.bio}</p>
              {FOUNDER.sameAs[0] && (
                <a
                  href={FOUNDER.sameAs[0]}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="text-link mt-5 inline-block"
                >
                  {FOUNDER.name} on LinkedIn
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="shell section-space border-t" aria-labelledby="about-beliefs">
        <p className="section-meta" aria-hidden="true">
          <span className="section-index">.0{FOUNDER ? 3 : 2}.</span>
          <span className="mono-label">How we work</span>
        </p>
        <h2 id="about-beliefs" className="display-lg mt-5">What we believe.</h2>
        <div className="beliefs mt-8 max-w-3xl">
          {BELIEFS.map((b, i) => (
            <details key={b.index} className="belief" open={i === 0}>
              <summary>
                <h3 className="font-display text-lg tracking-tight md:text-xl">{b.title}</h3>
              </summary>
              <p className="text-[0.9375rem] leading-relaxed text-mute">{b.body}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="shell section-space border-t" aria-labelledby="about-clients">
        <p className="section-meta" aria-hidden="true">
          <span className="section-index">.0{FOUNDER ? 4 : 3}.</span>
          <span className="mono-label">Clients</span>
        </p>
        <h2 id="about-clients" className="display-lg mt-5">Brands we have worked with.</h2>
        <ul className="mt-8 flex flex-wrap gap-x-10 gap-y-4 text-[0.9375rem] text-bone/85">
          {CLIENTS.map((c) => (
            <li key={c.name}>{c.name}</li>
          ))}
        </ul>
        <p className="lede mt-10">
          See the emails in the{' '}
          <Link className="text-link" href="/work">portfolio</Link>, the{' '}
          <Link className="text-link" href="/#proof">Klaviyo account screenshots</Link>, or what we{' '}
          <Link className="text-link" href="/services">do for ecommerce brands</Link>.
        </p>
      </section>
      <CtaBand />
    </>
  );
}
