import { callApi } from "@/api/base";

export type SendInviteRequest = {
  recipientEmail: string;
};

export type SendInviteResponse = {
  id: string;
  recipientEmail: string;
  expiresAt: string;
};

export function sendInviteApi(data: SendInviteRequest) {
  return callApi<SendInviteResponse>({
    url: "/invites",
    method: "POST",
    data,
  });
}
