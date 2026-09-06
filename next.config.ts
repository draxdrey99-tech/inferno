import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // Vercel Blob — cover images uploaded through /admin.
      { protocol: 'https', hostname: '*.public.blob.vercel-storage.com' },
    ],
  },

  async redirects() {
    return [
      // Canonical host: www -> apex. Keeps link equity on one hostname.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.infernoemails.com' }],
        destination: 'https://infernoemails.com/:path*',
        permanent: true,
      },
      // Legacy WordPress URLs -> new structure.
      { source: '/infernomedia/:path*', destination: '/', permanent: true },
      { source: '/home', destination: '/', permanent: true },

      // The marketing site collapsed to a single page. These routes were
      // real pages until then, so anything already linking to them (ads,
      // Google's index, the old site's backlinks) lands on the matching
      // section instead of a 404. Fragments survive a 308 because the
      // browser, not the server, resolves them.
      // Service URLs are indexable pages again. Unknown slugs retain the
      // previous /#services destination before rendering the service page.
      { source: '/services/:path((?!(?:klaviyo-email-marketing|email-design|email-deliverability|retention-strategy|email-flows|opengraph-image)(?:/|$)).*)', destination: '/#services', permanent: true },
      { source: '/work', destination: '/#work', permanent: true },
      { source: '/our-work', destination: '/#work', permanent: true },
      { source: '/portfolio', destination: '/#work', permanent: true },
      { source: '/about', destination: '/#about', permanent: true },
      { source: '/contact', destination: '/#contact', permanent: true },
      { source: '/contact-us', destination: '/#contact', permanent: true },
      { source: '/free-email-audit', destination: '/#contact', permanent: true },
      { source: '/audit', destination: '/#contact', permanent: true },
    ];
  },

  async headers() {
    const security = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      {
        key: 'Strict-Transport-Security',
        value: 'max-age=63072000; includeSubDomains; preload',
      },
      {
        key: 'Permissions-Policy',
        value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
      },
    ];
    return [
      { source: '/:path*', headers: security },
      {
        source: '/images/:path*',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
