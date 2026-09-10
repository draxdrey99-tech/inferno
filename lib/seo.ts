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
        slogan: SITE.tagline,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'sales',
          email: SITE.email,
          url: `${SITE_URL}/#contact`,
          availableLanguage: 'en',
        },
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
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['#answer', 'h1'],
        },
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
  const url = `${SITE_URL}${input.path}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: input.name,
    description: input.description,
    serviceType: input.name,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: 'Worldwide',
    url,
    mainEntityOfPage: url,
    audience: {
      '@type': 'Audience',
      audienceType: 'Ecommerce brands',
    },
    // The free audit is the only "offer" honestly stated anywhere on the
    // site: no price list exists, because scoped work is quoted after it.
    offers: {
      '@type': 'Offer',
      name: 'Email marketing audit',
      description: 'A free, no-obligation review of Klaviyo flow coverage, list health, authentication records and the last ninety days of performance.',
      price: '0',
      priceCurrency: 'USD',
      url: SITE.calendly,
      seller: { '@id': `${SITE_URL}/#organization` },
    },
  };
}

/**
 * Portfolio as an ItemList of ImageObjects. Gives image search and answer
 * engines a name, description and creator for every email design instead
 * of an anonymous grid of PNGs.
 */
export function workGalleryLd(
  items: readonly {
    slug: string;
    client: string;
    title: string;
    type: string;
    image: string;
    alt: string;
    note: string;
  }[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    '@id': `${SITE_URL}/work#gallery`,
    name: 'Ecommerce email design examples by Inferno Emails',
    url: `${SITE_URL}/work`,
    numberOfItems: items.length,
    itemListElement: items.map((w, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'ImageObject',
        '@id': `${SITE_URL}/work#${w.slug}`,
        name: `${w.client}: ${w.title}`,
        description: w.note,
        caption: w.alt,
        contentUrl: `${SITE_URL}${w.image}`,
        genre: w.type,
        creator: { '@id': `${SITE_URL}/#organization` },
        copyrightHolder: { '@type': 'Organization', name: w.client },
      },
    })),
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
