import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'uploads.sitepoint.com',
      },
      {
        hostname: 'lh3.googleusercontent.com',
      },
      {
        hostname: 'avatars.githubusercontent.com',
      },
      {
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'algorithmicdev.in'],
    },
  },
  transpilePackages: ['@repo/db', '@repo/ui', '@repo/shared'],
  output: 'standalone',
};

export default nextConfig;
