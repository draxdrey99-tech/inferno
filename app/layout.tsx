import type { Metadata, Viewport } from 'next';
import { Archivo, Geist } from 'next/font/google';
import './globals.css';

import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import RevealObserver from '@/components/RevealObserver';
import HideOnAdmin from '@/components/HideOnAdmin';
import { orgGraph } from '@/lib/seo';
import { SITE, SITE_URL } from '@/lib/site';

/* Self-hosted at build time by next/font — no render-blocking request to
   Google, no layout shift, and the CSS variables feed Tailwind's theme. */
/* Display face. Italic is loaded because headline emphasis stays inside
   this family rather than swapping in a second font for decoration. */
const archivo = Archivo({
  subsets: ['latin'],
  weight: ['600', '700', '800'],
  style: ['normal'],
  variable: '--font-archivo',
  display: 'swap',
});

/* Body face. Geist over Inter: Inter is the default every generated site
   reaches for, and Geist sits better beside a geometric grotesk. */
const geist = Geist({
  subsets: ['latin'],
  variable: '--font-geist',
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
  themeColor: '#171916',
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
      className={`${archivo.variable} ${geist.variable}`}
    >
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <JsonLd data={orgGraph()} />
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
