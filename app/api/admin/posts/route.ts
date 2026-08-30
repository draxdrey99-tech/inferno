import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { db } from '@/lib/db';
import { listAll, normalizePostInput } from '@/lib/blog';

export const runtime = 'nodejs';

function fail(err: unknown) {
  const e = err as Error & { status?: number };
  const status = e.status ?? 500;
  if (status >= 500) console.error('[admin/posts]', e);
  return NextResponse.json({ error: e.message || 'Server error' }, { status });
}

/** GET — every post, drafts included. */
export async function GET() {
  try {
    await requireAdmin();
    return NextResponse.json({ posts: await listAll() });
  } catch (err) {
    return fail(err);
  }
}

/** POST — create or update by slug (upsert), so saving twice is safe. */
export async function POST(req: Request) {
  try {
    await requireAdmin();
    const body = await req.json();
    const p = normalizePostInput(body);
    const sql = db();

    // published_at is set once, on first publish, and preserved after that
    // so re-editing a live post does not reshuffle the blog order.
    const rows = (await sql`
      INSERT INTO posts (
        slug, title, excerpt, content_html, content_md, source_format,
        cover_image_url, cover_image_alt, meta_title, meta_description,
        og_image_url, canonical_url, custom_jsonld, faqs, tags, author,
        status, reading_minutes, published_at
      ) VALUES (
        ${p.slug}, ${p.title}, ${p.excerpt}, ${p.content_html}, ${p.content_md},
        ${p.source_format}, ${p.cover_image_url}, ${p.cover_image_alt},
        ${p.meta_title}, ${p.meta_description}, ${p.og_image_url},
        ${p.canonical_url}, ${p.custom_jsonld}, ${JSON.stringify(p.faqs)}::jsonb,
        ${p.tags}, ${p.author}, ${p.status}, ${p.reading_minutes},
        ${p.status === 'published' ? new Date().toISOString() : null}
      )
      ON CONFLICT (slug) DO UPDATE SET
        title = EXCLUDED.title,
        excerpt = EXCLUDED.excerpt,
        content_html = EXCLUDED.content_html,
        content_md = EXCLUDED.content_md,
        source_format = EXCLUDED.source_format,
        cover_image_url = EXCLUDED.cover_image_url,
        cover_image_alt = EXCLUDED.cover_image_alt,
        meta_title = EXCLUDED.meta_title,
        meta_description = EXCLUDED.meta_description,
        og_image_url = EXCLUDED.og_image_url,
        canonical_url = EXCLUDED.canonical_url,
        custom_jsonld = EXCLUDED.custom_jsonld,
        faqs = EXCLUDED.faqs,
        tags = EXCLUDED.tags,
        author = EXCLUDED.author,
        status = EXCLUDED.status,
        reading_minutes = EXCLUDED.reading_minutes,
        published_at = CASE
          WHEN EXCLUDED.status = 'published'
            THEN COALESCE(posts.published_at, EXCLUDED.published_at, now())
          ELSE NULL
        END,
        updated_at = now()
      RETURNING slug, status
    `) as unknown as { slug: string; status: string }[];

    // Push the change live without waiting for the ISR window.
    revalidatePath('/blog');
    revalidatePath(`/blog/${p.slug}`);
    revalidatePath('/sitemap.xml');

    return NextResponse.json({ ok: true, post: rows[0] });
  } catch (err) {
    return fail(err);
  }
}
