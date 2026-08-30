import type { MetadataRoute } from 'next';
import { listPublished } from '@/lib/blog';
import { dbConfigured } from '@/lib/db';
import { SERVICES, SITE_URL } from '@/lib/site';

export const revalidate = 3600;

/**
 * Priorities are relative hints within our own site, not a ranking lever.
 * The value here is completeness and accurate lastModified dates.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: 'weekly', priority: 1.0, lastModified: now },
    { url: `${SITE_URL}/services`, changeFrequency: 'monthly', priority: 0.9, lastModified: now },
    { url: `${SITE_URL}/work`, changeFrequency: 'monthly', priority: 0.8, lastModified: now },
    { url: `${SITE_URL}/about`, changeFrequency: 'yearly', priority: 0.6, lastModified: now },
    { url: `${SITE_URL}/free-email-audit`, changeFrequency: 'monthly', priority: 0.9, lastModified: now },
    { url: `${SITE_URL}/contact`, changeFrequency: 'yearly', priority: 0.7, lastModified: now },
    { url: `${SITE_URL}/blog`, changeFrequency: 'daily', priority: 0.8, lastModified: now },
    { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.2, lastModified: now },
    { url: `${SITE_URL}/terms`, changeFrequency: 'yearly', priority: 0.2, lastModified: now },
  ];

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    changeFrequency: 'monthly',
    priority: 0.85,
    lastModified: now,
  }));

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

  return [...staticRoutes, ...serviceRoutes, ...postRoutes];
}
