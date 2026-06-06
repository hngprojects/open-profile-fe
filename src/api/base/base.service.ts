import { ApiError } from "@/api/base/base.error";
import { ApiResponse } from "@/api/base/base.type";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";

import { env } from "@/env/client";

declare module "axios" {
  interface InternalAxiosRequestConfig {
    silent?: boolean;
  }
}

export const api = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "/api/v1"
      : `${env.NEXT_PUBLIC_API_URL}/api/v1`,
  timeout: 60 * 1000,
  withCredentials: true,
});

// ─── Silent token refresh ─────────────────────────────────────────────────────

let isRefreshing = false;
type QueueEntry = { resolve: () => void; reject: (err: unknown) => void };
let failedQueue: QueueEntry[] = [];

function processQueue(error: unknown) {
  failedQueue.forEach((entry) => {
    if (error) entry.reject(error);
    else entry.resolve();
  });
  failedQueue = [];
}

api.interceptors.response.use(
  (response) => response,
  async (error: unknown) => {
    if (!(error instanceof AxiosError)) return Promise.reject(error);

    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    const isAuthEndpoint =
      originalRequest.url?.includes("/auth/") &&
      !originalRequest.url?.match(/\/auth\/me(?:$|\?|\/)/);

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      isAuthEndpoint
    ) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      originalRequest._retry = true;
      return new Promise<void>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then(() => api(originalRequest));
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      // Call the internal refresh endpoint which will set the new cookies
      await axios.post(
        "/api/internal/auth/refresh",
        {},
        { withCredentials: true }
      );

      // Retry the original request
      const result = await api(originalRequest);
      processQueue(null);
      return result;
    } catch (refreshError) {
      processQueue(refreshError);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);

function getApiErrorMessage(message?: unknown): string {
  if (typeof message === "string") return message;
  if (Array.isArray(message) && message.length > 0) {
    const first = message[0];
    if (typeof first === "string") return first;
    if (first && typeof first === "object" && "message" in first)
      return String(first.message);
  }
  if (message && typeof message === "object" && "message" in message) {
    return String((message as Record<string, unknown>).message);
  }
  return "An error occurred. Please check your input and try again.";
}

export async function callApi<TResData>({
  url,
  method = "GET",
  data,
  params,
  headers,
  signal,
  silent,
}: {
  url: `/${string}`;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  data?: unknown;
  params?: Record<string, unknown>;
  headers?: AxiosRequestConfig["headers"];
  signal?: AbortSignal;
  silent?: boolean;
}) {
  try {
    const response = await api.request<ApiResponse<TResData>>({
      url,
      method,
      data,
      params,
      headers: {
        ...(!(data instanceof FormData) && {
          "Content-Type": "application/json",
        }),
        ...headers,
      },
      signal,
      silent,
    } as InternalAxiosRequestConfig);

    return (response.data.data ?? response.data) as TResData;
  } catch (e) {
    if (e instanceof AxiosError) {
      if (e.code === "ERR_CANCELED") throw e; // silently propagate aborts

      if (!silent) {
        if (process.env.NODE_ENV === "development") {
          console.error(
            "[callApi] error",
            e.response?.status,
            e.response?.data,
            "code:",
            e.code,
            "msg:",
            e.message
          );
        } else {
          console.error(
            "[callApi] error",
            e.response?.status,
            "code:",
            e.code,
            "msg:",
            e.message
          );
        }
      }
      throw new ApiError(
        e.response ? getApiErrorMessage(e.response.data?.message) : e.message,
        e.response?.data?.message,
        e.response?.status
      );
    }

    throw new ApiError(
      "Something went wrong while processing your request, please try again later!"
    );
  }
}
