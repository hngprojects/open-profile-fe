import { ApiErrorDetail } from "@/api/base/base.type";

export class ApiError extends Error {
  public details: ApiErrorDetail[];
  public status?: number;
  constructor(message: string, details?: ApiErrorDetail[], status?: number) {
    super(message);
    this.details = Array.isArray(details) ? details : [];
    this.status = status;
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError;
}
