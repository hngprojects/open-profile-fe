import { BadgeCheck } from "lucide-react";
import Link from "next/link";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";

export default function VerifySuccessPage() {
  return (
    <AuthLayout>
      <div className="flex flex-col items-center gap-5 py-4">
        <BadgeCheck size={80} className="text-[#087583]" />

        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#050505]">
            Email Verified Successfully
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Your account has been successfully created, you can now sign in
          </p>
        </div>

        <Button
          asChild
          className="h-11 w-full rounded-lg border-0 bg-[#087583] font-semibold text-white shadow-none hover:bg-[#065E69]"
        >
          <Link href="/login">Continue</Link>
        </Button>
      </div>
    </AuthLayout>
  );
}
