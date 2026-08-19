import type { NextConfig } from "next";

const comingSoonMode = process.env.COMING_SOON_MODE === "true";

const nextConfig: NextConfig = {
  experimental: {
    viewTransition: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  async redirects() {
    if (!comingSoonMode) {
      return [];
    }

    return [
      {
        source:
          "/:path((?!binnenkort(?:/|$)|studio(?:/|$)|_next(?:/|$)|favicon\\.ico$).*)",
        destination: "/binnenkort",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
