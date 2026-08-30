import { NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import { requireAdmin } from '@/lib/auth';
import { slugify } from '@/lib/blog';

export const runtime = 'nodejs';

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB
const ALLOWED = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
  'image/svg+xml',
]);

/** POST — multipart upload of one image to Vercel Blob. */
export async function POST(req: Request) {
  try {
    await requireAdmin();

    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      return NextResponse.json(
        { error: 'Blob storage is not configured. Add a Blob store in Vercel → Storage.' },
        { status: 503 }
      );
    }

    const form = await req.formData();
    const file = form.get('file');
    if (!(file instanceof File)) {
      return NextResponse.json({ error: 'No file supplied.' }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: 'Image must be under 8 MB.' }, { status: 413 });
    }
    if (!ALLOWED.has(file.type)) {
      return NextResponse.json(
        { error: `Unsupported type: ${file.type || 'unknown'}` },
        { status: 415 }
      );
    }

    // Keep a readable, descriptive filename — image URLs are a small but
    // real SEO signal, and "hero-image.webp" beats "IMG_4821.webp".
    const dot = file.name.lastIndexOf('.');
    const base = slugify(dot > 0 ? file.name.slice(0, dot) : file.name) || 'image';
    const ext = dot > 0 ? file.name.slice(dot).toLowerCase() : '';

    const blob = await put(`blog/${base}${ext}`, file, {
      access: 'public',
      addRandomSuffix: true,
      contentType: file.type,
      cacheControlMaxAge: 31536000,
    });

    return NextResponse.json({ url: blob.url });
  } catch (err) {
    const e = err as Error & { status?: number };
    const status = e.status ?? 500;
    if (status >= 500) console.error('[admin/upload]', e);
    return NextResponse.json({ error: e.message || 'Upload failed' }, { status });
  }
}
