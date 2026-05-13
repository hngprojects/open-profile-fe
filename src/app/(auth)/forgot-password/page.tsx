"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { forgotPassword } from "@/app/actions/auth";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const isValid = EMAIL_RE.test(email);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    try {
      const result = await forgotPassword(
        undefined,
        new FormData(e.currentTarget)
      );
      toast.success(
        "If an account with that email exists, a reset code has been sent."
      );
      if (result?.redirectTo) router.push(result.redirectTo);
      else if (result?.error) toast.error(result.error);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setPending(false);
    }
  }

  return (
    <AuthLayout>
      <div className="text-center mb-2">
        <h1 className="text-2xl font-bold text-primary">Forgot Password</h1>
        <p className="text-sm text-gray-500 mt-1">
          Enter your email address and we&apos;ll send you a reset code
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-[#454545]">
            Email Address
          </label>
          <Input
            name="email"
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() =>
              setEmailError(
                email && !EMAIL_RE.test(email) ? "Incorrect email" : ""
              )
            }
            className={`h-11 bg-[#FAFAFA] border border-[#EDEDED] shadow-none placeholder:text-[#747474] ${emailError ? "border-red-400" : ""}`}
          />
          {emailError && <p className="text-xs text-red-500">{emailError}</p>}
        </div>

        <Button
          type="submit"
          disabled={!isValid || pending}
          className="w-full h-11 font-semibold rounded-lg shadow-none transition-opacity bg-brand hover:bg-[#065E69] text-white border-0 disabled:opacity-50"
        >
          {pending ? "Sending…" : "Continue"}
        </Button>
      </form>
    </AuthLayout>
  );
}
