"use server";

import { contactApi } from "@/api/contact/contact.service";
import { isApiError } from "@/api/base";

function extractError(err: unknown, fallback: string): string {
  if (isApiError(err)) {
    return err.message;
  }
  return fallback;
}

export type ContactActionState =
  | { error?: string; success?: boolean }
  | undefined;

export async function contactAction(
  _prev: ContactActionState,
  formData: FormData
): Promise<ContactActionState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const industry = formData.get("industry") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message)
    return { error: "Please fill in all required fields." };

  try {
    await contactApi({ name, email, industry: industry || undefined, message });
    return { success: true };
  } catch (err) {
    return {
      error: extractError(err, "Failed to send message. Please try again."),
    };
  }
}
