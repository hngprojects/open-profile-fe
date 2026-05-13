import { env } from "@/env/server";

export const dynamic = "force-dynamic";

export function GET() {
  return Response.json({
    status: "ok",
    uptime: process.uptime(),
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
}
