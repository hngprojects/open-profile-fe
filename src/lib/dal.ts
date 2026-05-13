import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";

export const getCurrentSession = cache(async () => {
  const store = await cookies();
  return store.get("accessToken") || store.get("session");
});

export const verifySession = cache(async () => {
  const session = await getCurrentSession();
  return session;
});
