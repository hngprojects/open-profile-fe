import type { MetadataRoute } from "next";
import { env as serverEnv } from "@/env/server";
import { env as clientEnv } from "@/env/client";

export default function robots(): MetadataRoute.Robots {
  const isProd = serverEnv.NODE_ENV === "production";

  return {
    rules: isProd
      ? { userAgent: "*", allow: "/", disallow: ["/api/"] }
      : { userAgent: "*", disallow: "/" },
    sitemap: `${clientEnv.NEXT_PUBLIC_APP_URL}/sitemap.xml`,
    host: clientEnv.NEXT_PUBLIC_APP_URL,
  };
}
