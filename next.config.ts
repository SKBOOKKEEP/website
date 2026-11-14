import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/aida-public/**",
      },
    ],
  },
  // Legacy short slugs reported 404ing (2026-11-14). These were never this
  // site's own canonical paths, but external links/bookmarks may still hit
  // them, so redirect to the current pages rather than leave a dead link.
  async redirects() {
    return [
      {
        source: "/self-assessment",
        destination: "/self-assessment-tax-returns",
        permanent: true,
      },
      {
        source: "/privacy",
        destination: "/privacy-policy",
        permanent: true,
      },
      {
        source: "/pl/polityka-prywatnosci",
        destination: "/pl/privacy-policy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
