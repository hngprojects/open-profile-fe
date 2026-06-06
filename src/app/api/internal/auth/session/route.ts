import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action } = body;

    const response = NextResponse.json({ success: true });
    const store = await cookies();

    if (action === "logout") {
      store.delete("accessToken");
      store.delete("refreshToken");
      store.delete("_at");
      store.delete("_rt");
      store.delete("auth");
      return response;
    }

    return response;
  } catch (_err) {
    return NextResponse.json(
      { success: false, message: "Invalid request" },
      { status: 400 }
    );
  }
}
