import type { NextConfig } from "next";

const apiUrl = process.env.API_BASE_URL;
const apiHostname = apiUrl ? new URL(apiUrl).hostname : undefined;

const nextConfig: NextConfig = {
  experimental: {
    authInterrupts: true,
  },
  images: {
    remotePatterns: apiHostname
      ? [{ protocol: "https", hostname: apiHostname }]
      : [],
  },
};

export default nextConfig;
