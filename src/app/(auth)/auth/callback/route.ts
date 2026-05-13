import { type NextRequest, NextResponse } from "next/server";

/**
 * GET /auth/callback?accessToken=<jwt>&refreshToken=<jwt>
 *
 * Requires the backend FRONTEND_URL to point here so it redirects with
 * accessToken and refreshToken as query params after Google OAuth.
 */
export async function GET(request: NextRequest) {
  // If the backend handles it, it should have set cookies before this redirect.
  // We can just redirect to dashboard.
  return NextResponse.redirect(new URL("/dashboard", request.url));
}
