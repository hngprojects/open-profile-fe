import { AuthForm } from "@/components/auth/AuthForm";
import { env } from "@/env/client";

export default function LoginPage() {
  return (
    <AuthForm
      mode="login"
      googleAuthUrl={`${env.NEXT_PUBLIC_API_URL ?? ""}/api/auth/google`}
    />
  );
}
