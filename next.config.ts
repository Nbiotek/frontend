import type { NextConfig } from 'next';
import { env } from '@/env';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
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
        hostname: env.S3_PUB_LAB_ACCESS_URL,
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
