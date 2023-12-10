/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.gregrickaby.com'
      }
    ],
    formats: ['image/avif', 'image/webp']
  },
  async redirects() {
    return [
      {
        source: '/:path(feed|rss.xml|blog/feed/|feed/atom)',
        destination: '/feed.xml',
        permanent: true
      },
      {
        source: '/:year(\\d{4})/:month(\\d{2})/:slug*',
        destination: '/blog/:slug*',
        permanent: true
      },
      {
        source: '/blog/:year(\\d{4})/:month(\\d{2})/:slug*',
        destination: '/blog/:slug*',
        permanent: true
      }
    ]
  },
  experimental: {
    optimizePackageImports: ['react-icons']
  },
  logging: {
    fetches: {
      fullUrl: true
    }
  }
}

module.exports = nextConfig
