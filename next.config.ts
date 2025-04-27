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
};

export default nextConfig;
