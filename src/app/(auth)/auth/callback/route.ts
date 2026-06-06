import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/env/server";

/**
 * GET /auth/callback?accessToken=<jwt>&refreshToken=<jwt>
 *
 * Requires the backend FRONTEND_URL to point here so it redirects with
 * accessToken and refreshToken as query params after Google OAuth.
 * The backend sets httpOnly auth cookies in its redirect response.
 * We just need to set the frontend auth=1 flag and redirect.
 */
export async function GET(request: NextRequest) {
  const response = NextResponse.redirect(new URL("/dashboard", request.url));

  response.cookies.set("auth", "1", {
    path: "/",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60,
    ...(env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {}),
  });

  return response;
}
