"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthPageHeader } from "@/components/auth/AuthPageHeader";
import { OtpInput } from "@/components/auth/OtpInput";
import { ResendTimer } from "@/components/auth/ResendTimer";
import { Button } from "@/components/ui/button";
import { verifyEmailOtpOption } from "@/api/auth/auth.options";
import { isApiError } from "@/api/base";

export default function VerifyEmailPage() {
  const router = useRouter();
  const params = useSearchParams();
  const email = params.get("email") ?? "";
  const [code, setCode] = useState<string[]>([]);

  const isComplete = Boolean(email) && code.length === 6 && code.every(Boolean);

  const verifyMutation = useMutation({
    ...verifyEmailOtpOption,
    onSuccess: () => {
      router.replace("/verify-email/success");
    },
    onError: (err) =>
      toast.error(isApiError(err) ? err.message : "Verification failed."),
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email) {
      toast.error("Invalid or missing email address.");
      return;
    }
    verifyMutation.mutate({ email, otp: code.join("") });
  }

  return (
    <AuthLayout>
      <AuthPageHeader
        title="Email Verification"
        subtitle={`We sent a temporary code to ${email}`}
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="text-label-text text-sm font-medium">
          Enter code
        </label>
        <OtpInput onChange={setCode} />
        <Button
          type="submit"
          disabled={!isComplete || verifyMutation.isPending}
          className="bg-brand-hover-bg h-11 w-full rounded-lg border-0 font-semibold text-white shadow-none transition-opacity hover:bg-[#065E69] disabled:opacity-50"
        >
          {verifyMutation.isPending ? "Verifying…" : "Continue"}
        </Button>
      </form>

      <ResendTimer email={email} />
    </AuthLayout>
  );
}
