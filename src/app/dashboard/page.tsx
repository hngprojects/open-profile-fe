"use client";

import { logout } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-4xl font-bold">Coming Soon</h1>
      <p className="text-muted-foreground">
        Your dashboard is on its way. Stay tuned!
      </p>
      <form action={logout}>
        <Button variant="outline" type="submit">
          Log out
        </Button>
      </form>
    </div>
  );
}
