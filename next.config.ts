import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Product screenshots carry small UI text, so they need more than the
    // default 75. Next 16 requires every quality used to be allowlisted here.
    qualities: [75, 90],
  },
};

export default nextConfig;
