/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://127.0.0.1:5500/api/:path*',
      },
      {
        source: '/assets/ai/:path*',
        destination: 'http://127.0.0.1:5500/assets/ai/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
