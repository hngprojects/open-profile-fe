import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/env/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  if (accessToken && refreshToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const code = searchParams.get("code");
  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=missing_code", request.url)
    );
  }

  const callbackUrl = new URL(
    `${env.API_BASE_URL}/api/v1/auth/google/callback`
  );
  callbackUrl.searchParams.set("code", code);

  const res = await fetch(callbackUrl, { redirect: "manual" });

  const response = NextResponse.redirect(new URL("/dashboard", request.url));

  const setCookie = res.headers.get("set-cookie");
  if (setCookie) {
    response.headers.set("set-cookie", setCookie);
  }

  return response;
}
