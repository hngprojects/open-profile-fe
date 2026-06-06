import { callApi } from "@/api/base";

export type UploadCategory = "profiles" | "projects" | "portfolio";

export function uploadImage(file: File, category: UploadCategory) {
  const form = new FormData();
  form.append("file", file);
  return callApi<{ url: string; path: string }>({
    url: `/uploads/${category}/image-url`,
    method: "POST",
    data: form,
  });
}
