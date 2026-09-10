import { marked } from 'marked';
import sanitizeHtml from 'sanitize-html';
import { db } from './db';
import { SITE, SITE_URL } from './site';

marked.setOptions({ gfm: true, breaks: false });

/* ------------------------------------------------------------------ *
 * Types
 * ------------------------------------------------------------------ */

export type Post = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content_html: string;
  content_md: string;
  source_format: string;
  cover_image_url: string;
  cover_image_alt: string;
  meta_title: string;
  meta_description: string;
  og_image_url: string;
  canonical_url: string;
  custom_jsonld: string;
  faqs: { q: string; a: string }[];
  tags: string[];
  author: string;
  status: 'draft' | 'published';
  reading_minutes: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

/* ------------------------------------------------------------------ *
 * Text helpers
 * ------------------------------------------------------------------ */

export function slugify(input: unknown) {
  return String(input || '')
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

const SANITIZE_OPTS: sanitizeHtml.IOptions = {
  allowedTags: [
    'h2', 'h3', 'h4', 'p', 'a', 'strong', 'em', 'b', 'i', 'u', 's',
    'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'img', 'figure',
    'figcaption', 'hr', 'br', 'span', 'div', 'table', 'thead', 'tbody',
    'tr', 'td', 'th', 'iframe',
  ],
  allowedAttributes: {
    a: ['href', 'title', 'target', 'rel'],
    img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'decoding'],
    iframe: ['src', 'title', 'width', 'height', 'allow', 'allowfullscreen', 'loading'],
    span: ['class'],
    div: ['class'],
    code: ['class'],
    pre: ['class'],
    th: ['colspan', 'rowspan', 'scope'],
    td: ['colspan', 'rowspan'],
  },
  allowedSchemes: ['http', 'https', 'mailto'],
  allowedIframeHostnames: ['www.youtube.com', 'youtube.com', 'player.vimeo.com'],
  transformTags: {
    // H1 is the page title — demote any H1 in body copy so each post has
    // exactly one, which is what crawlers expect.
    h1: 'h2',
    a: (_tag, attribs) => {
      const href = attribs.href || '';
      const external =
        /^https?:\/\//i.test(href) && !href.includes('infernoemails.com');
      return {
        tagName: 'a',
        attribs: {
          ...attribs,
          ...(external
            ? { target: '_blank', rel: 'noopener noreferrer' }
            : {}),
        },
      };
    },
    img: (_tag, attribs) => ({
      tagName: 'img',
      attribs: { loading: 'lazy', decoding: 'async', ...attribs },
    }),
  },
};

export const cleanHtml = (html: unknown) =>
  sanitizeHtml(String(html || ''), SANITIZE_OPTS);

export const mdToHtml = (md: unknown) =>
  cleanHtml(marked.parse(String(md || '')) as string);

export const stripTags = (html: unknown) =>
  String(html || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

export function readingMinutes(html: unknown) {
  const words = stripTags(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function autoExcerpt(html: unknown, max = 158) {
  const text = stripTags(html);
  if (text.length <= max) return text;
  return `${text.slice(0, max).replace(/\s+\S*$/, '')}…`;
}

export const postUrl = (slug: string) => `${SITE_URL}/blog/${slug}`;

/* ------------------------------------------------------------------ *
 * Table of contents — extracted from H2s so long posts get in-page
 * navigation and jump-to links in search results.
 * ------------------------------------------------------------------ */

export function withHeadingIds(html: string) {
  const seen = new Map<string, number>();
  return html.replace(
    /<h([23])>([\s\S]*?)<\/h\1>/g,
    (_m, level: string, inner: string) => {
      const base = slugify(stripTags(inner)) || 'section';
      const n = seen.get(base) ?? 0;
      seen.set(base, n + 1);
      const id = n === 0 ? base : `${base}-${n + 1}`;
      return `<h${level} id="${id}">${inner}</h${level}>`;
    }
  );
}

export function extractToc(html: string) {
  const out: { id: string; text: string }[] = [];
  const re = /<h2 id="([^"]+)">([\s\S]*?)<\/h2>/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(html))) {
    out.push({ id: m[1], text: stripTags(m[2]) });
  }
  return out;
}

/* ------------------------------------------------------------------ *
 * Validation / normalisation for admin input
 * ------------------------------------------------------------------ */

export function validateCustomJsonLd(raw: unknown) {
  const str = String(raw ?? '').trim();
  if (!str) return '';
  let parsed: unknown;
  try {
    parsed = JSON.parse(str);
  } catch {
    const e = new Error('Custom JSON-LD is not valid JSON.') as Error & { status?: number };
    e.status = 400;
    throw e;
  }
  const nodes = Array.isArray(parsed) ? parsed : [parsed];
  const ok = nodes.every((n) => n && typeof n === 'object' && !Array.isArray(n));
  if (!ok) {
    const e = new Error(
      'Custom JSON-LD must be an object or an array of objects.'
    ) as Error & { status?: number };
    e.status = 400;
    throw e;
  }
  return str;
}

export function parseCustomJsonLd(raw: unknown) {
  const str = String(raw ?? '').trim();
  if (!str) return [];
  try {
    const parsed = JSON.parse(str);
    const nodes = Array.isArray(parsed) ? parsed : [parsed];
    return nodes.filter((n) => n && typeof n === 'object' && !Array.isArray(n));
  } catch {
    return [];
  }
}

export function normalizeFaqs(input: unknown): { q: string; a: string }[] {
  let val = input;
  if (typeof val === 'string') {
    try {
      val = JSON.parse(val);
    } catch {
      val = [];
    }
  }
  const arr = Array.isArray(val) ? val : [];
  return arr
    .map((item): { q: string; a: string } => {
      if (Array.isArray(item)) {
        return { q: String(item[0] || '').trim(), a: String(item[1] || '').trim() };
      }
      if (item && typeof item === 'object') {
        const o = item as Record<string, unknown>;
        return {
          q: String(o.q ?? o.question ?? '').trim(),
          a: String(o.a ?? o.answer ?? '').trim(),
        };
      }
      return { q: '', a: '' };
    })
    .filter((f) => f.q && f.a)
    .slice(0, 30);
}

export function normalizePostInput(body: Record<string, unknown> = {}) {
  const fmt = String(body.source_format || 'html').toLowerCase();
  const md = String(body.content_md || '');
  const rawHtml = String(body.content_html || '');
  const content_html = fmt === 'markdown' ? mdToHtml(md) : cleanHtml(rawHtml);

  const title = String(body.title || '').trim();
  if (!title) {
    const e = new Error('Title is required.') as Error & { status?: number };
    e.status = 400;
    throw e;
  }

  const slug = slugify(body.slug || title);
  const excerpt = String(body.excerpt || '').trim() || autoExcerpt(content_html);

  return {
    slug,
    title,
    excerpt,
    content_html,
    content_md: fmt === 'markdown' ? md : '',
    source_format: fmt,
    cover_image_url: String(body.cover_image_url || '').trim(),
    cover_image_alt: String(body.cover_image_alt || '').trim(),
    meta_title: String(body.meta_title || '').trim() || title,
    meta_description: String(body.meta_description || '').trim() || excerpt,
    og_image_url: String(body.og_image_url || '').trim(),
    canonical_url: String(body.canonical_url || '').trim(),
    tags: Array.isArray(body.tags)
      ? body.tags.map((t) => String(t).trim()).filter(Boolean).slice(0, 12)
      : [],
    author: String(body.author || SITE.name).trim(),
    status: body.status === 'published' ? 'published' : 'draft',
    reading_minutes: readingMinutes(content_html),
    custom_jsonld: validateCustomJsonLd(body.custom_jsonld),
    faqs: normalizeFaqs(body.faqs),
  };
}

/* ------------------------------------------------------------------ *
 * Structured data
 * ------------------------------------------------------------------ */

export function authorNode(name?: string) {
  const n = (name || '').trim();
  if (!n || n === SITE.name) {
    return { '@type': 'Organization', name: SITE.name, url: `${SITE_URL}/#about` };
  }
  return { '@type': 'Person', name: n };
}

export function articleJsonLd(post: Post) {
  const url = postUrl(post.slug);
  const image =
    post.og_image_url ||
    post.cover_image_url ||
    `${SITE_URL}/images/inferno-logo.png`;

  const nodes: Record<string, unknown>[] = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: post.meta_title || post.title,
      description: post.meta_description || post.excerpt,
      image,
      datePublished: post.published_at,
      dateModified: post.updated_at || post.published_at,
      wordCount: stripTags(post.content_html).split(/\s+/).filter(Boolean).length,
      keywords: post.tags?.join(', ') || undefined,
      articleSection: post.tags?.[0] || undefined,
      author: authorNode(post.author),
      publisher: { '@id': `${SITE_URL}/#organization` },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      inLanguage: 'en',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url },
      ],
    },
  ];

  const faqs = normalizeFaqs(post.faqs);
  if (faqs.length) {
    nodes.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${url}#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  return [...nodes, ...parseCustomJsonLd(post.custom_jsonld)];
}

/* ------------------------------------------------------------------ *
 * Queries
 * ------------------------------------------------------------------ */

/** Neon's tagged-template return type is a union; narrow it once here. */
const rows = <T,>(r: unknown) => r as T[];

export async function listPublished(limit = 100, offset = 0) {
  const sql = db();
  return rows<Post>(await sql`
    SELECT id, slug, title, excerpt, cover_image_url, cover_image_alt,
           tags, author, reading_minutes, published_at, updated_at, status
    FROM posts
    WHERE status = 'published' AND published_at IS NOT NULL
    ORDER BY published_at DESC
    LIMIT ${limit} OFFSET ${offset}
  `);
}

export async function getPublished(slug: string) {
  const sql = db();
  const found = rows<Post>(await sql`
    SELECT * FROM posts
    WHERE slug = ${slug} AND status = 'published' AND published_at IS NOT NULL
    LIMIT 1
  `);
  return found[0] || null;
}

export async function listAll() {
  const sql = db();
  return rows<Post>(await sql`
    SELECT id, slug, title, excerpt, status, tags, author,
           reading_minutes, published_at, created_at, updated_at
    FROM posts ORDER BY COALESCE(published_at, created_at) DESC
  `);
}

export async function getAny(slug: string) {
  const sql = db();
  const found = rows<Post>(await sql`SELECT * FROM posts WHERE slug = ${slug} LIMIT 1`);
  return found[0] || null;
}

export async function relatedPosts(post: Post, limit = 3) {
  const sql = db();
  const tags = post.tags?.length ? post.tags : [];
  if (tags.length) {
    const tagged = rows<Post>(await sql`
      SELECT id, slug, title, excerpt, cover_image_url, cover_image_alt,
             tags, reading_minutes, published_at
      FROM posts
      WHERE status = 'published' AND published_at IS NOT NULL
        AND slug <> ${post.slug} AND tags && ${tags}
      ORDER BY published_at DESC LIMIT ${limit}
    `);
    if (tagged.length) return tagged;
  }
  return rows<Post>(await sql`
    SELECT id, slug, title, excerpt, cover_image_url, cover_image_alt,
           tags, reading_minutes, published_at
    FROM posts
    WHERE status = 'published' AND published_at IS NOT NULL AND slug <> ${post.slug}
    ORDER BY published_at DESC LIMIT ${limit}
  `);
}

