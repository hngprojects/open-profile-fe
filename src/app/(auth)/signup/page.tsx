import { AuthForm } from "@/components/auth/AuthForm";
import { env } from "@/env/client";

export default function SignupPage() {
  return (
    <AuthForm
      mode="signup"
      googleAuthUrl={`${env.NEXT_PUBLIC_API_URL ?? ""}/api/v1/auth/google`}
    />
  );
}
