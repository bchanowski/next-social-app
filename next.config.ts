import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "s.gravatar.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.auth0.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
