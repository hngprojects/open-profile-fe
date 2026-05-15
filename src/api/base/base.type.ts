export type ApiResponse<TData> = {
  success: boolean;
  data: TData;
};

export type PaginatedApiResponse<TData> = {
  success: boolean;
  data: TData;
  meta: Record<string, unknown>;
};

export type ApiErrorDetail = { field: string; error: string };

export type ApiErrorType = {
  success: false;
  message: string;
  details: ApiErrorDetail[];
};

export type ApiOptions = {
  signal?: AbortSignal;
  token?: string;
};
