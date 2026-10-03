import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import RevealObserver from '@/components/RevealObserver';
import HideOnAdmin from '@/components/HideOnAdmin';
import PageEmbers from '@/components/PageEmbers';
import { orgGraph } from '@/lib/seo';
import { SITE, SITE_URL } from '@/lib/site';

/* Self-hosted at build time by next/font — no render-blocking request to
   Google, no layout shift, and the CSS variables feed Tailwind's theme. */
/* swap, not optional: on a slow first visit the brand face must still
   paint. next/font supplies a metric-adjusted fallback so the swap does not
   shift layout. */
const archivo = localFont({
  src: '../public/fonts/archivo-latin-400-800.woff2',
  weight: '400 800',
  variable: '--font-archivo',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Inferno Emails: Email Marketing Agency for Ecommerce Brands',
    template: '%s | Inferno Emails',
  },
  description: SITE.description,
  applicationName: SITE.name,
  authors: [{ name: SITE.name, url: SITE_URL }],
  verification: {
    // Set in Vercel to claim the site in Search Console / Bing without a
    // DNS record. Omitted from the page when unset.
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION || undefined,
    other: process.env.NEXT_PUBLIC_BING_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_VERIFICATION }
      : undefined,
  },
  creator: SITE.name,
  publisher: SITE.name,
  category: 'Marketing',
  alternates: {
    canonical: '/',
    types: { 'application/rss+xml': '/rss.xml' },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#171717',
  colorScheme: 'dark',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang={SITE.lang}
      className={archivo.variable}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <JsonLd data={orgGraph()} />
        <PageEmbers />
        <HideOnAdmin>
          <Nav />
        </HideOnAdmin>
        <main id="main">{children}</main>
        <HideOnAdmin>
          <Footer />
        </HideOnAdmin>
        <RevealObserver />
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
      </body>
    </html>
  );
}
