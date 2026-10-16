import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // ── Gzip / Brotli compression for all responses ──────────────────────────
  compress: true,

  // ── Strip "X-Powered-By: Next.js" response header ────────────────────────
  poweredByHeader: false,

  // ── Image optimisation ────────────────────────────────────────────────────
  images: {
    // Prefer AVIF, fall back to WebP — smaller files, less bandwidth
    formats: ['image/avif', 'image/webp'],
    // Minimum 24 h cache for optimised images
    minimumCacheTTL: 86400,
    // Only allow known Cloudinary domain instead of wildcard '**'
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },

  // ── Experimental tree-shaking for heavy packages ─────────────────────────
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'recharts',
      'framer-motion',
      'react-hot-toast',
      'clsx',
      'tailwind-merge',
    ],
    serverActions: {
      // Reduced from 50 mb – uploads go through /api/upload not server actions
      bodySizeLimit: '10mb',
    },
  },

  // ── HTTP security & cache headers ────────────────────────────────────────
  async headers() {
    return [
      // Security headers for every CMS admin page
      {
        source: '/((?!api).*)',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          // Prevent caching of admin HTML pages
          { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
        ],
      },
      // Static assets (_next/static, public/) can be cached for 1 year
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
