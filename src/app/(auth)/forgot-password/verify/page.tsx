"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthPageHeader } from "@/components/auth/AuthPageHeader";
import { OtpInput } from "@/components/auth/OtpInput";
import { ResendTimer } from "@/components/auth/ResendTimer";
import { Button } from "@/components/ui/button";
import { maskEmail } from "@/lib/utils";
import { verifyResetOtp } from "@/app/actions/auth";
import { toast } from "sonner";

export default function ForgotPasswordVerifyPage() {
  const [code, setCode] = useState<string[]>([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "";

  const isComplete = code.length === 6 && code.every(Boolean);
  const token = code.join("");

  const handleVerify = async () => {
    const formData = new FormData();
    formData.append("email", email);
    formData.append("otp", token);

    try {
      const res = await verifyResetOtp(undefined, formData);
      if (res?.redirectTo) router.push(res.redirectTo);
      else if (res?.error) toast.error(res.error);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

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
          onClick={handleVerify}
          disabled={!isComplete}
          className="bg-brand h-11 w-full rounded-lg border-0 font-semibold text-white shadow-none transition-opacity hover:bg-[#065E69] disabled:opacity-50"
        >
          Continue
        </Button>
      </div>

      <ResendTimer email={email} />
    </AuthLayout>
  );
}
