import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
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
/* Normal display face. Optional loading avoids a late text repaint on
   slow first visits; next/font supplies a metric-adjusted fallback. */
const archivo = localFont({
  src: '../public/fonts/archivo-latin-400-800.woff2',
  weight: '400 800',
  variable: '--font-archivo',
  display: 'optional',
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
  creator: SITE.name,
  publisher: SITE.name,
  alternates: { canonical: '/' },
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
      lang="en"
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
      </body>
    </html>
  );
}
