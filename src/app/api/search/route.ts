import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("q") || "";

  if (query.trim().length < 3) {
    return NextResponse.json(
      { message: "Please enter at least 3 characters to search", data: [] },
      { status: 400 }
    );
  }

  const res = await fetch(
    `${env.API_BASE_URL}/api/v1/search?q=${encodeURIComponent(query)}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    }
  );

  const data = await res.json();

  return NextResponse.json(data, { status: res.status });
}
