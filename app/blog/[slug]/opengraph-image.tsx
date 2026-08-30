import { ImageResponse } from 'next/og';
import { OG_CONTENT_TYPE, OG_SIZE, OgCard, ogFonts } from '@/lib/og';
import { getPublished } from '@/lib/blog';
import { dbConfigured } from '@/lib/db';

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = 'Inferno Emails blog post';

/** Per-post social card, so shared links never fall back to a generic image. */
export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  let title = 'Inferno Emails';
  let eyebrow = 'Blog';

  if (dbConfigured()) {
    try {
      const post = await getPublished(params.slug);
      if (post) {
        title = post.title;
        eyebrow = post.tags?.[0] || 'Blog';
      }
    } catch {
      /* fall through to the default card */
    }
  }

  return new ImageResponse(<OgCard eyebrow={eyebrow} title={title} />, {
    ...size,
    fonts: await ogFonts(),
  });
}
