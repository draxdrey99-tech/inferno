import type { Metadata } from 'next';
import { SITE, SITE_URL } from './site';

/* ------------------------------------------------------------------ *
 * Metadata helper
 * ------------------------------------------------------------------ */

type PageMetaInput = {
  title: string;
  description: string;
  /** Path only, e.g. '/services/email-design'. '' for the home page. */
  path?: string;
  /** Absolute or root-relative image. Falls back to the site OG image. */
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
  noindex?: boolean;
};

export function pageMeta({
  title,
  description,
  path = '',
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  authors,
  tags,
  noindex,
}: PageMetaInput): Metadata {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes(SITE.name) ? title : `${title} | ${SITE.name}`;
  const displayTitle = fullTitle.length < 60 ? fullTitle : fullTitle.slice(0, 56).replace(/\s+\S*$/, '') + '…';
  const displayDescription = description.length < 155 ? description : description.slice(0, 151).replace(/\s+\S*$/, '') + '…';
  const ogImage = image
    ? image.startsWith('http')
      ? image
      : `${SITE_URL}${image}`
    : `${SITE_URL}${path === '/' ? '' : path}/opengraph-image`;

  return {
    title: { absolute: displayTitle },
    description: displayDescription,
    // Self-referencing canonical on every page — the single most common
    // technical SEO miss, and the cheapest one to get right.
    alternates: { canonical: url },
    ...(noindex
      ? { robots: { index: false, follow: false } }
      : {
          robots: {
            index: true,
            follow: true,
            googleBot: {
              index: true,
              follow: true,
              'max-video-preview': -1,
              'max-image-preview': 'large',
              'max-snippet': -1,
            },
          },
        }),
    openGraph: {
      type,
      url,
      title: displayTitle,
      description: displayDescription,
      siteName: SITE.name,
      locale: SITE.locale,
      images: [{ url: ogImage, width: 1200, height: 630, alt: title }],
      ...(type === 'article'
        ? { publishedTime, modifiedTime, authors, tags }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: displayTitle,
      description: displayDescription,
      images: [ogImage],
    },
  };
}

/* ------------------------------------------------------------------ *
 * JSON-LD
 * ------------------------------------------------------------------ */

/**
 * Site-wide entity graph. Emitted once in the root layout so every page
 * inherits it. @id values are stable URIs so nodes can reference each
 * other instead of being duplicated per page.
 */
export function orgGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['Organization', 'ProfessionalService'],
        '@id': `${SITE_URL}/#organization`,
        name: SITE.name,
        legalName: SITE.legalName,
        url: SITE_URL,
        description: SITE.description,
        foundingDate: SITE.founded,
        email: SITE.email,
        logo: {
          '@type': 'ImageObject',
          '@id': `${SITE_URL}/#logo`,
          url: `${SITE_URL}/images/inferno-logo.png`,
          width: 1046,
          height: 928,
          caption: SITE.name,
        },
        image: { '@id': `${SITE_URL}/#logo` },
        sameAs: [SITE.instagram, SITE.linkedin],
        areaServed: 'Worldwide',
        knowsAbout: [
          'Email marketing',
          'Klaviyo',
          'Ecommerce retention marketing',
          'Email deliverability',
          'Email design',
          'Lifecycle marketing',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE.name,
        description: SITE.description,
        publisher: { '@id': `${SITE_URL}/#organization` },
        inLanguage: 'en',
      },
    ],
  };
}

export function breadcrumbLd(
  trail: { name: string; path: string }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function faqLd(faqs: readonly { q: string; a: string }[], id?: string) {
  if (!faqs.length) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    ...(id ? { '@id': id } : {}),
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function serviceLd(input: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${SITE_URL}${input.path}#service`,
    name: input.name,
    description: input.description,
    serviceType: input.name,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: 'Worldwide',
    url: `${SITE_URL}${input.path}`,
  };
}

/**
 * Renders JSON-LD. Uses a script tag with the schema.org type so crawlers
 * pick it up; content is serialised with `<` escaped to close off the
 * script-injection route.
 */
export function jsonLdScript(data: unknown) {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
