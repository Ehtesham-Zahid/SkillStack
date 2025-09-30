import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      "localhost",
      "skillstack-production.up.railway.app",
      "res.cloudinary.com",
      "lh3.googleusercontent.com",
    ],
  },
};

export default nextConfig;
