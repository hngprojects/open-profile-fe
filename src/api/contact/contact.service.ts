import { callApi } from "@/api/base";

export type ContactRequest = {
  name: string;
  email: string;
  industry?: string;
  message: string;
};

export async function contactApi(data: ContactRequest) {
  return callApi({
    url: "/contact",
    method: "POST",
    data,
  });
}
