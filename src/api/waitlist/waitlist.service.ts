import { callApi } from "@/api/base";

export type WaitlistRequest = {
  email: string;
};

export async function joinWaitlistApi(data: WaitlistRequest) {
  return callApi({
    url: "/waitlist",
    method: "POST",
    data,
  });
}
