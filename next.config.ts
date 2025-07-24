import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com', 'pub-e55e56449ffc4dd19126603054d607a9.r2.dev/'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nbiotek.onrender.com',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'pub-e55e56449ffc4dd19126603054d607a9.r2.dev',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
