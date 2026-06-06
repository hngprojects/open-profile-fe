import { type NextRequest, NextResponse } from "next/server";
import { env } from "@/env/server";
import { parseSetCookie } from "@/lib/cookie-utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();

    const upstreamUrl = `${env.API_BASE_URL}/api/v1/auth/login`;

    const upstream = await fetch(upstreamUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    const textData = await upstream.text();
    let data;
    try {
      data = JSON.parse(textData);
    } catch {
      data = {
        message: "The backend returned an invalid response.",
        details: textData,
      };
    }

    const response = NextResponse.json(data, { status: upstream.status });

    // Forward Set-Cookie headers properly using getSetCookie() to prevent comma-merging
    const setCookies = upstream.headers.getSetCookie?.() || [];
    let loginSuccess = false;
    for (const cookieStr of setCookies) {
      const { name, value, cookieOptions } = parseSetCookie(cookieStr);
      if (env.COOKIE_DOMAIN) {
        cookieOptions.domain = env.COOKIE_DOMAIN;
      } else {
        delete cookieOptions.domain;
      }
      response.cookies.set(name, value, cookieOptions);
      if (name === "accessToken") loginSuccess = true;
    }

    if (loginSuccess) {
      response.cookies.set("auth", "1", {
        path: "/",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        ...(env.COOKIE_DOMAIN ? { domain: env.COOKIE_DOMAIN } : {}),
      });
    }

    const excludedHeaders = [
      "set-cookie",
      "content-encoding",
      "content-length",
      "transfer-encoding",
      "content-type",
    ];
    upstream.headers.forEach((value, key) => {
      if (!excludedHeaders.includes(key.toLowerCase())) {
        response.headers.append(key, value);
      }
    });

    return response;
  } catch (error) {
    const err = error as Error;
    console.error("[Login Proxy] Network/Fetch Error:", err.message);
    return NextResponse.json(
      {
        message:
          "The proxy failed to connect to the backend server. The backend might be offline.",
        ...(process.env.NODE_ENV !== "production"
          ? { error: err.message }
          : {}),
      },
      { status: 502 }
    );
  }
}
