import type { NextConfig } from "next";

const apiUrl = process.env.API_BASE_URL;
const apiHostname = apiUrl ? new URL(apiUrl).hostname : undefined;

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
  async rewrites() {
    if (process.env.NODE_ENV !== "development") return [];
    return [
      {
        source: "/api/v1/:path*",
        destination: `${process.env.API_BASE_URL}/api/v1/:path*`,
      },
    ];
  },
  images: {
    remotePatterns: [
      ...(apiHostname
        ? [{ protocol: "https" as const, hostname: apiHostname }]
        : []),
      {
        protocol: "https" as const,
        hostname: "api.staging.open-profile.hng14.com",
      },
      ...(process.env.NODE_ENV === "development"
        ? [
            {
              protocol: "http" as const,
              hostname: "localhost",
            },
          ]
        : []),
    ],
  },
};

export default nextConfig;
