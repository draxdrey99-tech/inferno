import type { MetadataRoute } from 'next';
import { listPublished } from '@/lib/blog';
import { dbConfigured } from '@/lib/db';
import { CONTENT_UPDATED, SITE_URL } from '@/lib/site';
import { SERVICE_PAGES } from '@/lib/service-pages';

export const revalidate = 3600;

/**
 * Priorities are relative hints within our own site, not a ranking lever.
 * The value here is completeness and accurate lastModified dates.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static marketing routes carry the date of the last copy edit rather
  // than the request time: a sitemap that says everything changed today,
  // every day, teaches crawlers to ignore the field.
  const edited = new Date(CONTENT_UPDATED);
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1.0, lastModified: edited },
    { url: `${SITE_URL}/services`, changeFrequency: 'monthly', priority: 0.9, lastModified: edited },
    ...SERVICE_PAGES.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      lastModified: edited,
    })),
    { url: `${SITE_URL}/work`, changeFrequency: 'monthly', priority: 0.8, lastModified: edited },
    { url: `${SITE_URL}/blog`, changeFrequency: 'weekly', priority: 0.8, lastModified: now },
    { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.2, lastModified: new Date('2026-08-30') },
    { url: `${SITE_URL}/terms`, changeFrequency: 'yearly', priority: 0.2, lastModified: new Date('2026-08-30') },
  ];

  let postRoutes: MetadataRoute.Sitemap = [];
  if (dbConfigured()) {
    try {
      const posts = await listPublished(500);
      postRoutes = posts.map((p) => ({
        url: `${SITE_URL}/blog/${p.slug}`,
        changeFrequency: 'monthly',
        priority: 0.7,
        lastModified: new Date(p.updated_at || p.published_at || now),
      }));
    } catch (err) {
      console.error('[sitemap] post query failed', err);
    }
  }

  return [...staticRoutes, ...postRoutes];
}
