import type { MetadataRoute } from 'next';
import { listPublished } from '@/lib/blog';
import { dbConfigured } from '@/lib/db';
import { CONTENT_UPDATED, SITE_URL, WORK } from '@/lib/site';
import { SERVICE_PAGES } from '@/lib/service-pages';
import { USE_CASES } from '@/lib/use-cases';
import { GLOSSARY } from '@/lib/glossary';
import { FAQ_PAGES } from '@/lib/faq';
import { SUBJECT_LIBRARIES } from '@/lib/subject-lines';

export const revalidate = 3600;

/**
 * Google ignores priority and changeFrequency; they are omitted. What
 * matters is completeness, accurate lastModified dates and the image
 * entries on /work.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  // Static marketing routes carry the date of the last copy edit rather
  // than the request time: a sitemap that says everything changed today,
  // every day, teaches crawlers to ignore the field.
  const edited = new Date(CONTENT_UPDATED);
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: edited },
    { url: `${SITE_URL}/services`, lastModified: edited },
    ...SERVICE_PAGES.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: edited,
    })),
    {
      url: `${SITE_URL}/work`,
      lastModified: edited,
      images: WORK.map((w) => `${SITE_URL}${w.image}`),
    },
    ...WORK.map((w) => ({ url: `${SITE_URL}/work/${w.slug}`, lastModified: edited })),
    { url: `${SITE_URL}/free-email-audit`, lastModified: edited },
    { url: `${SITE_URL}/flow-coverage-checklist`, lastModified: edited },
    { url: `${SITE_URL}/about`, lastModified: edited },
    { url: `${SITE_URL}/contact`, lastModified: edited },
    ...USE_CASES.map((u) => ({ url: `${SITE_URL}/email-marketing-for/${u.slug}`, lastModified: edited })),
    { url: `${SITE_URL}/email-agency-vs-in-house`, lastModified: edited },
    { url: `${SITE_URL}/faq`, lastModified: edited },
    ...FAQ_PAGES.map((f) => ({ url: `${SITE_URL}/faq/${f.slug}`, lastModified: edited })),
    { url: `${SITE_URL}/glossary`, lastModified: edited },
    ...GLOSSARY.map((t) => ({ url: `${SITE_URL}/glossary/${t.slug}`, lastModified: edited })),
    { url: `${SITE_URL}/email-subject-lines`, lastModified: edited },
    ...SUBJECT_LIBRARIES.map((s) => ({ url: `${SITE_URL}/email-subject-lines/${s.slug}`, lastModified: edited })),
    { url: `${SITE_URL}/blog`, lastModified: edited },
    { url: `${SITE_URL}/privacy`, lastModified: new Date('2026-08-30') },
    { url: `${SITE_URL}/terms`, lastModified: new Date('2026-08-30') },
  ];

  let postRoutes: MetadataRoute.Sitemap = [];
  if (dbConfigured()) {
    try {
      const posts = await listPublished(500);
      postRoutes = posts.map((p) => ({
        url: `${SITE_URL}/blog/${p.slug}`,
       
        lastModified: new Date(p.updated_at || p.published_at || now),
      }));
    } catch (err) {
      console.error('[sitemap] post query failed', err);
    }
  }

  return [...staticRoutes, ...postRoutes];
}
