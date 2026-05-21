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
import { maskEmail } from "@/lib/utils";
import { verifyResetOtpOption } from "@/api/auth/auth.options";
import { isApiError } from "@/api/base";

export default function ForgotPasswordVerifyPage() {
  const [code, setCode] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const isComplete = code.length === 6 && code.every(Boolean);

  const verifyMutation = useMutation({
    ...verifyResetOtpOption,
    onSuccess: (data) => {
      sessionStorage.setItem("resetToken", data.resetToken);
      router.push(`/forgot-password/reset?email=${encodeURIComponent(email)}`);
    },
    onError: (err) =>
      toast.error(isApiError(err) ? err.message : "Verification failed."),
  });

  return (
    <AuthLayout>
      <AuthPageHeader
        title="Forgot Password"
        subtitle={`We sent a temporary code to ${maskEmail(email)}`}
      />

      <div className="flex flex-col gap-3">
        <label className="text-label-text text-sm font-medium">
          Enter code
        </label>
        <OtpInput onChange={setCode} />
        <Button
          onClick={() => verifyMutation.mutate({ email, otp: code.join("") })}
          disabled={!isComplete || verifyMutation.isPending}
          className="bg-brand h-11 w-full rounded-lg border-0 font-semibold text-white shadow-none transition-opacity hover:bg-[#065E69] disabled:opacity-50"
        >
          {verifyMutation.isPending ? "Verifying…" : "Continue"}
        </Button>
      </div>

      <ResendTimer email={email} />
    </AuthLayout>
  );
}
