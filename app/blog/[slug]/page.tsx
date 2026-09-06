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

  return (
    <>
      {articleJsonLd({ ...post, content_html: html }).map((node, i) => (
        <JsonLd key={i} data={node} />
      ))}

      <article>
        {/* ------------------------------------------------------ header */}
        <header className="border-b border-white/8 pt-24">
          <div className="shell pb-14 md:pb-16">
            <nav aria-label="Breadcrumb" className="mb-9">
              <ol className="flex flex-wrap items-center gap-2 text-[0.75rem] uppercase tracking-[0.14em] text-mute">
                <li><Link href="/" className="hover:text-bone">Home</Link></li>
                <li aria-hidden="true">/</li>
                <li><Link href="/blog" className="hover:text-bone">Blog</Link></li>
              </ol>
            </nav>

            {post.tags?.[0] && (
              <p className="text-[0.875rem] text-flame">{post.tags[0]}</p>
            )}

            <h1 className="display-lg mt-6 max-w-4xl">{post.title}</h1>

            {post.excerpt && (
              <p className="lede mt-7 max-w-2xl">{post.excerpt}</p>
            )}

            <div className="mt-9 flex flex-wrap items-center gap-x-5 gap-y-2 text-[0.8125rem] uppercase tracking-[0.14em] text-mute">
              <span>{post.author || SITE.name}</span>
              <span aria-hidden="true" className="text-flame">·</span>
              <time dateTime={post.published_at ?? undefined}>
                {formatDate(post.published_at)}
              </time>
              <span aria-hidden="true" className="text-flame">·</span>
              <span>{post.reading_minutes} min read</span>
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
              className="w-full rounded-xl border border-white/10 object-cover"
            />
          </div>
        )}

        {/* -------------------------------------------------------- body */}
        <div className="shell grid gap-14 py-12 md:py-16 lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-16">
          {toc.length > 2 ? (
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="eyebrow">On this page</p>
              <nav aria-label="Table of contents" className="mt-5">
                <ul className="space-y-3 border-l border-white/10 pl-4">
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

            {post.tags?.length > 0 && (
              <ul className="mt-14 flex max-w-[68ch] flex-wrap gap-2 border-t border-white/9 pt-8">
                {post.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-white/12 px-3.5 py-1.5 text-[0.75rem] uppercase tracking-[0.12em] text-mute"
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
        <section className="border-t border-white/8 bg-ink-raised">
          <div className="shell py-20 md:py-24">
            <p className="eyebrow">Keep reading</p>
            <div className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-3">
              {related.map((p) => (
                <article key={p.slug} className="reveal group">
                  <Link href={`/blog/${p.slug}`}>
                    {p.cover_image_url && (
                      <div className="mb-5 overflow-hidden rounded-lg border border-white/10">
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
