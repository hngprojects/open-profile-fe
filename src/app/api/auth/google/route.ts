import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/env/server";

export async function GET(request: NextRequest) {
  const googleAuthUrl = new URL(`${env.API_BASE_URL}/api/auth/google`);
  googleAuthUrl.searchParams.set(
    "redirect_url",
    new URL("/api/auth/google/callback", request.url).toString()
  );
  return NextResponse.redirect(googleAuthUrl);
}
