import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/env/server";
import { parseSetCookie } from "@/lib/cookie-utils";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const accessToken = searchParams.get("accessToken");
  const refreshToken = searchParams.get("refreshToken");

  if (accessToken && refreshToken) {
    const response = NextResponse.redirect(new URL("/dashboard", request.url));
    response.cookies.set("auth", "1", {
      path: "/",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      ...(env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {}),
    });
    return response;
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

  // Forward backend Set-Cookie headers scoped to COOKIE_DOMAIN
  // so cookies are accessible from both frontend and API subdomains
  const setCookies = res.headers.getSetCookie?.() || [];
  for (const cookieStr of setCookies) {
    const { name, value, cookieOptions } = parseSetCookie(cookieStr);
    if (env.COOKIE_DOMAIN) {
      cookieOptions.domain = env.COOKIE_DOMAIN;
    } else {
      delete cookieOptions.domain;
    }
    if (process.env.NODE_ENV !== "production") {
      cookieOptions.secure = false;
    }
    response.cookies.set(name, value, cookieOptions);
  }

  const hasAccessToken = setCookies.some((s) => {
    const trimmed = s.trim();
    const separatorIndex = trimmed.indexOf("=");
    return (
      separatorIndex !== -1 &&
      trimmed.slice(0, separatorIndex) === "accessToken"
    );
  });
  if (hasAccessToken) {
    response.cookies.set("auth", "1", {
      path: "/",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      ...(env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {}),
    });
  }

  return response;
}
