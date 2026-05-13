"use client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthPageHeader } from "@/components/auth/AuthPageHeader";
import { OtpInput } from "@/components/auth/OtpInput";
import { ResendTimer } from "@/components/auth/ResendTimer";
import { Button } from "@/components/ui/button";
import { verifyEmailOtp } from "@/app/actions/auth";

export default function VerifyEmailPage() {
  const router = useRouter();
  const [code, setCode] = useState<string[]>([]);
  const [pending, setPending] = useState(false);
  const params = useSearchParams();
  const email = params.get("email") ?? "";

  const isComplete = code.length === 6 && code.every(Boolean);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    try {
      const result = await verifyEmailOtp(
        undefined,
        new FormData(e.currentTarget)
      );
      if (result?.redirectTo) router.replace(result.redirectTo);
      else if (result?.error) toast.error(result.error);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthLayout>
      <AuthPageHeader
        title="Email Verification"
        subtitle={`We sent a temporary code to ${email}`}
      />

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input type="hidden" name="email" value={email} />
        <input type="hidden" name="otp" value={code.join("")} />
        <label className="text-sm font-medium text-[#454545]">Enter code</label>
        <OtpInput onChange={setCode} />
        <Button
          type="submit"
          disabled={!isComplete || pending}
          className="w-full h-11 font-semibold rounded-lg shadow-none transition-opacity bg-[#087583] hover:bg-[#065E69] text-white border-0 disabled:opacity-50"
        >
          {pending ? "Verifying…" : "Continue"}
        </Button>
      </form>

      <ResendTimer email={email} />
    </AuthLayout>
  );
}
