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
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'd112y698adiu2z.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'd8it4huxumps7.cloudfront.net',
      },
      {
        protocol: 'https',
        hostname: 'media.hackerearth.com',
      },
      // Google user images
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      // GitHub user images
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
    ],
  },
};

export default nextConfig;
