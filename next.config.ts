import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "uploads.sitepoint.com",
      },
    ],
  },
  swcMinify: true,
  experimental: {
    serverActions: {
      allowedOrigins: [
        "localhost:3000",
        "algorithmicdev.in",
      ],
    },
  },
};

export default nextConfig;
