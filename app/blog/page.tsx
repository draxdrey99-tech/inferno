import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight } from '@phosphor-icons/react/dist/ssr';

import SectionHead from '@/components/Section';
import CtaBand from '@/components/CtaBand';
import JsonLd from '@/components/JsonLd';
import { breadcrumbLd, pageMeta } from '@/lib/seo';
import { listPublished, type Post } from '@/lib/blog';
import { dbConfigured } from '@/lib/db';
import { SITE, SITE_URL } from '@/lib/site';

// Rebuilt at most every 5 minutes; publishing from /admin revalidates
// immediately, so this is only a safety net.
export const revalidate = 300;

export const metadata: Metadata = pageMeta({
  title: 'Ecommerce Email Marketing Blog',
  description:
    'Practical writing on ecommerce email marketing: Klaviyo flows, campaign strategy, email design, deliverability and retention. No fluff, no recycled listicles.',
  path: '/blog',
});

function formatDate(value: string | null) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

async function getPosts(): Promise<Post[]> {
  if (!dbConfigured()) return [];
  try {
    return await listPublished(60);
  } catch (err) {
    console.error('[blog] list failed', err);
    return [];
  }
}

export default async function BlogIndex() {
  const posts = await getPosts();
  const [lead, ...rest] = posts;

  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ])}
      />
      {posts.length > 0 && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'Blog',
            '@id': `${SITE_URL}/blog#blog`,
            name: 'Inferno Emails Blog',
            url: `${SITE_URL}/blog`,
            publisher: { '@id': `${SITE_URL}/#organization` },
            blogPost: posts.slice(0, 20).map((p) => ({
              '@type': 'BlogPosting',
              headline: p.title,
              url: `${SITE_URL}/blog/${p.slug}`,
              datePublished: p.published_at,
            })),
          }}
        />
      )}

      <section className="border-b border-white/8 pt-24">
        <div className="shell pb-16 md:pb-20">
          <SectionHead
            eyebrow="Writing"
            as="h1"
            title={
              <>
                Notes on making email{' '}
                <span className="accent">actually earn.</span>
              </>
            }
            lede="What we have learned running Klaviyo accounts for ecommerce brands: flows, deliverability, design and the retention maths behind all of it."
          />
        </div>
      </section>

      <section className="">
        <div className="shell py-16 md:py-20">
          <nav aria-label="Blog resources" className="related-links mb-10"><Link href="/services">Email marketing services</Link><Link href="/#work">Client email designs</Link><a href="/rss.xml">Subscribe via RSS</a></nav>
          {posts.length === 0 ? (
            <div className="reveal max-w-xl rounded-xl border border-white/10 bg-ink-raised p-10">
              <h2 className="display-md">First posts are on the way.</h2>
              <p className="lede mt-4">
                In the meantime, the fastest way to get something useful out of us
                is the free audit. We will tell you what is wrong with your
                account whether or not you hire us.
              </p>
              <a
                href={SITE.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-flame mt-8"
              >
                Book your free audit
                <ArrowRight size={16} weight="bold" className="arr" aria-hidden />
              </a>
            </div>
          ) : (
            <>
              {/* Lead story */}
              <article className="reveal group border-b border-white/9 pb-14">
                <Link
                  href={`/blog/${lead.slug}`}
                  className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-center"
                >
                  {lead.cover_image_url && (
                    <div className="order-2 overflow-hidden rounded-xl border border-white/10 md:order-1">
                      <Image
                        src={lead.cover_image_url}
                        alt={lead.cover_image_alt || lead.title}
                        width={1200}
                        height={675}
                        priority
                        sizes="(max-width: 768px) 92vw, 55vw"
                        className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                      />
                    </div>
                  )}
                  <div className={lead.cover_image_url ? 'order-1 md:order-2' : ''}>
                    <p className="eyebrow">Latest</p>
                    <h2 className="display-md mt-5 transition-colors group-hover:text-flame">
                      {lead.title}
                    </h2>
                    <p className="lede mt-4 text-[1rem]">{lead.excerpt}</p>
                    <p className="mt-6 text-[0.8125rem] uppercase tracking-[0.14em] text-mute">
                      {formatDate(lead.published_at)} · {lead.reading_minutes} min read
                    </p>
                  </div>
                </Link>
              </article>

              {/* The rest */}
              <div className="grid gap-x-8 gap-y-12 pt-14 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((p, i) => (
                  <article
                    key={p.slug}
                    className="reveal group"
                    data-reveal-delay={(i % 3) * 90}
                  >
                    <Link href={`/blog/${p.slug}`} className="block">
                      {p.cover_image_url && (
                        <div className="mb-6 overflow-hidden rounded-lg border border-white/10">
                          <Image
                            src={p.cover_image_url}
                            alt={p.cover_image_alt || p.title}
                            width={800}
                            height={450}
                            sizes="(max-width: 768px) 92vw, 33vw"
                            className="aspect-[16/9] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                          />
                        </div>
                      )}
                      {p.tags?.[0] && (
                        <p className="text-[0.8125rem] text-flame">{p.tags[0]}</p>
                      )}
                      <h2 className="mt-4 font-display text-xl leading-tight tracking-tight transition-colors group-hover:text-flame">
                        {p.title}
                      </h2>
                      <p className="mt-3 text-[0.9375rem] leading-relaxed text-mute">
                        {p.excerpt}
                      </p>
                      <p className="mt-5 text-[0.75rem] uppercase tracking-[0.14em] text-mute/70">
                        {formatDate(p.published_at)} · {p.reading_minutes} min
                      </p>
                    </Link>
                  </article>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <CtaBand />
    </>
  );
}
