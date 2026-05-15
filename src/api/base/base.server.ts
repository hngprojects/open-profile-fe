import "server-only";
import { ApiError } from "@/api/base/base.error";
import { ApiResponse } from "@/api/base/base.type";
import { env } from "@/env/server";
import { cookies } from "next/headers";

function getApiErrorMessage(message?: unknown): string {
  if (typeof message === "string") return message;
  return "An error occurred. Please check your input and try again.";
}

export async function callApiServer<TResData>({
  url,
  method = "GET",
  data,
  params,
}: {
  url: `/${string}`;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: unknown;
  params?: Record<string, unknown>;
}): Promise<TResData> {
  const fullUrl = new URL(`${env.API_BASE_URL}/api/v1${url}`);
  if (params) {
    Object.entries(params).forEach(([k, v]) => {
      if (v !== undefined) fullUrl.searchParams.set(k, String(v));
    });
  }

  const store = await cookies();
  const cookieHeader = store
    .getAll()
    .map((c) => `${c.name}=${c.value}`)
    .join("; ");

  const res = await fetch(fullUrl, {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(cookieHeader ? { cookie: cookieHeader } : {}),
    },
    body: data ? JSON.stringify(data) : undefined,
  });

  const json = (await res.json()) as ApiResponse<TResData> & {
    message?: unknown;
  };

  if (!res.ok) {
    throw new ApiError(
      getApiErrorMessage(json.message),
      Array.isArray(json.message) ? json.message : undefined
    );
  }

  return (json.data ?? json) as TResData;
}
