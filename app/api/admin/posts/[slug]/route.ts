import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { requireAdmin } from '@/lib/auth';
import { db } from '@/lib/db';
import { getAny } from '@/lib/blog';

export const runtime = 'nodejs';

type Ctx = { params: Promise<{ slug: string }> };

function fail(err: unknown) {
  const e = err as Error & { status?: number };
  const status = e.status ?? 500;
  if (status >= 500) console.error('[admin/posts/:slug]', e);
  return NextResponse.json({ error: e.message || 'Server error' }, { status });
}

/** GET — a single post, draft or published, for the editor. */
export async function GET(_req: Request, { params }: Ctx) {
  try {
    await requireAdmin();
    const { slug } = await params;
    const post = await getAny(slug);
    if (!post) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ post });
  } catch (err) {
    return fail(err);
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  try {
    await requireAdmin();
    const { slug } = await params;
    const sql = db();
    await sql`DELETE FROM posts WHERE slug = ${slug}`;
    revalidatePath('/blog');
    revalidatePath(`/blog/${slug}`);
    revalidatePath('/sitemap.xml');
    return NextResponse.json({ ok: true });
  } catch (err) {
    return fail(err);
  }
}
