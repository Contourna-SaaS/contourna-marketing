import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // AVIF first: it lands ~25% under WebP on these flat UI screenshots, and
    // browsers that cannot take it fall through to WebP.
    formats: ["image/avif", "image/webp"],
    // Product screenshots carry small UI text, so they need more than the
    // default 75. Next 16 requires every quality used to be allowlisted here.
    qualities: [75, 82],
  },
};

export default nextConfig;
