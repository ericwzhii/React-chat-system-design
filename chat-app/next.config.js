/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'http://18.143.79.95/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig 