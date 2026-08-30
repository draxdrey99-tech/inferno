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
      { source: '/audit', destination: '/free-email-audit', permanent: true },
      { source: '/contact-us', destination: '/contact', permanent: true },
      { source: '/our-work', destination: '/work', permanent: true },
      { source: '/portfolio', destination: '/work', permanent: true },
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
