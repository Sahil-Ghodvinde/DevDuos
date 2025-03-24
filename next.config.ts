import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ingenioushackathon.devfolio.co',
      },
      {
        protocol: 'https',
        hostname: 'assets.devfolio.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'frosthack-2025.devfolio.co',
      },
      {
        protocol: 'https',
        hostname: '*.devfolio.co',
      }
    ],
  },
};

export default nextConfig;
