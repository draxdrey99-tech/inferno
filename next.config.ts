import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [65, 75],
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
      // /work is an indexable portfolio page again (September 2026). The
      // older aliases follow it rather than the home-page anchor.
      { source: '/our-work', destination: '/work', permanent: true },
      { source: '/portfolio', destination: '/work', permanent: true },
      // /about, /contact and /free-email-audit are real pages. Only the
      // aliases redirect to them.
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/audit', destination: '/free-email-audit', permanent: true },
      { source: '/free-audit', destination: '/free-email-audit', permanent: true },
      // Portfolio artwork moved from multi-megabyte PNGs to WebP.
      { source: '/images/:name(work-[a-z-]+).png', destination: '/images/:name.webp', permanent: true },
      // Old WordPress archive, feed and attachment URLs. Nothing at these
      // paths is worth a 404 if anything still links to them.
      { source: '/category/:path*', destination: '/blog', permanent: true },
      { source: '/tag/:path*', destination: '/blog', permanent: true },
      { source: '/author/:path*', destination: '/about', permanent: true },
      { source: '/feed', destination: '/rss.xml', permanent: true },
      { source: '/feed/:path*', destination: '/rss.xml', permanent: true },
      { source: '/wp-content/:path*', destination: '/', permanent: true },
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
