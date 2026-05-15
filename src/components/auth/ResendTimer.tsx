"use client";
import { resendOtp } from "@/app/actions/auth";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

type Props = {
  initialSeconds?: number;
  email?: string;
};

export function ResendTimer({ initialSeconds = 98, email: _email }: Props) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const mm = String(Math.floor(seconds / 60)).padStart(1, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  async function handleResend() {
    if (resending) return;
    setResending(true);
    const formData = new FormData();
    formData.append("email", _email ?? "");
    // TODO: call resend API with email
    try {
      const res = await resendOtp(undefined, formData);
      if (res?.success) {
        toast.success("OTP resent successfully.");
      }
    } catch (error) {
      console.error("Failed to resend OTP:", error);
    }

    setSeconds(initialSeconds);
    setResending(false);
  }

  return (
    <p className="text-center text-sm text-gray-500">
      Didn&apos;t get a code?{" "}
      <Button
        variant="links"
        onClick={handleResend}
        disabled={resending || seconds > 0}
        className="text-brand cursor-pointer font-medium hover:underline disabled:cursor-not-allowed disabled:opacity-50"
      >
        Resend Code
      </Button>
      {seconds > 0 && (
        <>
          {" "}
          in{" "}
          <span className="font-medium">
            {mm}:{ss}
          </span>
        </>
      )}
    </p>
  );
}
