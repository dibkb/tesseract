import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "unsplash.com",
      },
      {
        hostname: "images.unsplash.com",
      },
      {
        hostname: "dibkb-tesseract-images.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
  serverExternalPackages: ["@mastra/*"],
};

export default nextConfig;
