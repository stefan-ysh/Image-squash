import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable static export for standalone deployment
  output: "export",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
