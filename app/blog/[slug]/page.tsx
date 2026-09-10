import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cache } from 'react';
import type { Metadata } from 'next';

import JsonLd from '@/components/JsonLd';
import Faq from '@/components/Faq';
import CtaBand from '@/components/CtaBand';
import { pageMeta } from '@/lib/seo';
import {
  articleJsonLd,
  extractToc,
  getPublished,
  listPublished,
  normalizeFaqs,
  relatedPosts,
  withHeadingIds,
} from '@/lib/blog';
import { dbConfigured } from '@/lib/db';
import { relatedServicesFor } from '@/lib/service-pages';
import { SITE } from '@/lib/site';

export const revalidate = 300;
export const dynamicParams = true;

/** Cached so metadata and the page body share one query. */
const loadPost = cache(async (slug: string) => {
  if (!dbConfigured()) return null;
  try {
    return await getPublished(slug);
  } catch (err) {
    console.error('[blog/:slug] load failed', err);
    return null;
  }
});

export async function generateStaticParams() {
  if (!dbConfigured()) return [];
  try {
    const posts = await listPublished(200);
    return posts.map((p) => ({ slug: p.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) {
    return pageMeta({
      title: 'Post not found',
      description: 'This post is no longer available.',
      path: `/blog/${slug}`,
      noindex: true,
    });
  }

  const meta = pageMeta({
    title: post.meta_title || post.title,
    description: post.meta_description || post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.og_image_url || post.cover_image_url || undefined,
    type: 'article',
    publishedTime: post.published_at ?? undefined,
    modifiedTime: post.updated_at ?? undefined,
    authors: [post.author || SITE.name],
    tags: post.tags,
  });

  // An author-supplied canonical wins — that is the whole point of the field.
  if (post.canonical_url) {
    meta.alternates = { canonical: post.canonical_url };
  }
  return meta;
}

function formatDate(value: string | null) {
  if (!value) return '';
  return new Date(value).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Splits the post title so the last word can sit in a `.hud-box`, the
 * same treatment the home page gives one boxed phrase per headline, without
 * touching the title text itself (the words still concatenate identically). */
function splitTitle(title: string) {
  const words = title.trim().split(' ');
  const last = words.pop() ?? title;
  return { lead: words.join(' '), last };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await loadPost(slug);
  if (!post) notFound();

  const html = withHeadingIds(post.content_html);
  const toc = extractToc(html);
  const faqs = normalizeFaqs(post.faqs);
  const related = await relatedPosts(post, 3).catch(() => []);
  // Every post links back to the commercial page(s) its topic belongs to.
  const services = relatedServicesFor([post.title, ...(post.tags || [])].join(' '));
  const { lead: titleLead, last: titleLast } = splitTitle(post.title);

  return (
    <>
      {articleJsonLd({ ...post, content_html: html }).map((node, i) => (
        <JsonLd key={i} data={node} />
      ))}

      <article>
        {/* ------------------------------------------------------ header */}
        <header className="section-rule panel-grid pt-24">
          <div className="shell pb-14 md:pb-16">
            <nav aria-label="Breadcrumb" className="breadcrumb">
              <Link href="/">Home</Link>
              <span>/</span>
              <Link href="/blog">Blog</Link>
            </nav>

            {post.tags?.[0] && (
              <p className="mono-label mono-label-red mt-9">{post.tags[0]}</p>
            )}

            <h1 className="display-lg mt-6 max-w-4xl">
              {titleLead && `${titleLead} `}
              <span className="hud-box">{titleLast}</span>
            </h1>

            {post.excerpt && (
              <p className="lede mt-7 max-w-2xl">{post.excerpt}</p>
            )}

            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="mono-label">By {post.author || SITE.name}</span>
              <span aria-hidden="true" className="text-flame">·</span>
              <time className="mono-label" dateTime={post.published_at ?? undefined}>
                Published {formatDate(post.published_at)}
              </time>
              {post.updated_at && post.published_at && formatDate(post.updated_at) !== formatDate(post.published_at) && (
                <>
                  <span aria-hidden="true" className="text-flame">·</span>
                  <time className="mono-label" dateTime={post.updated_at}>
                    Updated {formatDate(post.updated_at)}
                  </time>
                </>
              )}
              <span aria-hidden="true" className="text-flame">·</span>
              <span className="mono-label">{post.reading_minutes} min read</span>
            </div>
          </div>
        </header>

        {post.cover_image_url && (
          <div className="shell -mt-px py-10 md:py-14">
            <Image
              src={post.cover_image_url}
              alt={post.cover_image_alt || post.title}
              width={1600}
              height={900}
              priority
              sizes="(max-width: 1200px) 92vw, 1200px"
              className="w-full border border-[#2a2a2a] object-cover"
            />
          </div>
        )}

        {/* -------------------------------------------------------- body */}
        <div className="shell grid gap-14 py-12 md:py-16 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          {toc.length > 2 ? (
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="mono-label mono-label-dot">On this page</p>
              <nav aria-label="Table of contents" className="mt-5">
                <ul className="space-y-3 border-l border-[#2a2a2a] pl-4">
                  {toc.map((h) => (
                    <li key={h.id}>
                      <a
                        href={`#${h.id}`}
                        className="text-[0.875rem] leading-snug text-mute transition-colors hover:text-flame"
                      >
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          ) : (
            <div aria-hidden="true" className="hidden lg:block" />
          )}

          <div className="min-w-0">
            <div
              className="prose-inferno max-w-[68ch]"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {faqs.length > 0 && (
              <section className="mt-20 max-w-[68ch]">
                <h2 className="display-md mb-8">Frequently asked</h2>
                <Faq items={faqs} />
              </section>
            )}

            <aside className="post-services mt-14 max-w-[68ch]" aria-labelledby="post-services-title">
              <p id="post-services-title" className="mono-label mono-label-dot">Related services</p>
              <ul>
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link href={`/services/${s.slug}`}>{s.title}</Link>
                    <span>{s.summary}</span>
                  </li>
                ))}
              </ul>
            </aside>

            <nav aria-label="Keep exploring" className="related-links mt-10 max-w-[68ch]">
              <Link href="/work">See real client emails in the portfolio</Link>
              <Link href="/#proof">See the Klaviyo account screenshots</Link>
              <Link href="/services">All email marketing services</Link>
            </nav>

            {post.tags?.length > 0 && (
              <ul className="mt-14 flex max-w-[68ch] flex-wrap gap-2 border-t border-[#2a2a2a] pt-8">
                {post.tags.map((t) => (
                  <li
                    key={t}
                    className="mono-label border border-[#3d3d3d] px-3.5 py-1.5"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </article>

      {/* ----------------------------------------------------- related */}
      {related.length > 0 && (
        <section className="section-rule bg-ink-raised">
          <div className="shell py-20 md:py-24">
            <p className="mono-label mono-label-dot">Keep reading</p>
            <div className="panel-set cols-3 mt-10">
              {related.map((p) => (
                <article key={p.slug} className="reveal group panel panel-grid p-6">
                  <Link href={`/blog/${p.slug}`}>
                    {p.cover_image_url && (
                      <div className="mb-5 overflow-hidden border border-[#2a2a2a]">
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
                    <h3 className="font-display text-lg leading-tight tracking-tight transition-colors group-hover:text-flame">
                      {p.title}
                    </h3>
                    <p className="mt-2.5 text-[0.875rem] leading-relaxed text-mute">
                      {p.excerpt}
                    </p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <CtaBand
        title={
          <>
            Reading about it is fine. <span className="accent">Fixing it</span> is
            better.
          </>
        }
      />
    </>
  );
}
