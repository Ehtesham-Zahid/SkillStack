import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "localhost",
      "skillstack-production.up.railway.app",
      "res.cloudinary.com",
    ],
  },
};

export default nextConfig;
