"use server";

import { joinWaitlistApi } from "@/api/waitlist/waitlist.service";
import { isApiError } from "@/api/base";

function extractError(err: unknown, fallback: string): string {
  if (isApiError(err)) {
    return err.message;
  }
  return fallback;
}

export type WaitlistActionState =
  | { error?: string; success?: boolean }
  | undefined;

export async function joinWaitlistAction(
  _prev: WaitlistActionState,
  formData: FormData
): Promise<WaitlistActionState> {
  const email = formData.get("email") as string;

  if (!email) return { error: "Email is required." };

  try {
    await joinWaitlistApi({ email });
    return { success: true };
  } catch (err) {
    return { error: extractError(err, "Failed to join waitlist.") };
  }
}
