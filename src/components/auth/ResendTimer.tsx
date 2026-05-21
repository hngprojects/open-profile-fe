"use client";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { resendOtpOption } from "@/api/auth/auth.options";
import { isApiError } from "@/api/base";

type Props = {
  initialSeconds?: number;
  email?: string;
};

export function ResendTimer({ initialSeconds = 98, email = "" }: Props) {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const mm = String(Math.floor(seconds / 60)).padStart(1, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  const resendMutation = useMutation({
    ...resendOtpOption,
    onSuccess: () => {
      toast.success("OTP resent successfully.");
      setSeconds(initialSeconds);
    },
    onError: (err) =>
      toast.error(isApiError(err) ? err.message : "Failed to resend OTP."),
  });

  return (
    <p className="text-center text-sm text-gray-500">
      Didn&apos;t get a code?{" "}
      <Button
        variant="links"
        onClick={() => {
          if (email) resendMutation.mutate({ email });
        }}
        disabled={resendMutation.isPending || seconds > 0 || !email}
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
