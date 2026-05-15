import { getCurrentUser, login, signup } from "@/api/auth/auth.service";
import { QueryStaleTime } from "@/api/base/base.const";
import { mutationOptions, queryOptions } from "@tanstack/react-query";

export const loginOption = mutationOptions({
  mutationKey: ["auth", "login"],
  mutationFn: login,
});

export const signupOption = mutationOptions({
  mutationKey: ["auth", "signup"],
  mutationFn: signup,
});

export const getCurrentUserOption = () =>
  queryOptions({
    queryKey: ["auth", "me"],
    queryFn: ({ signal }) => getCurrentUser({ signal }),
    staleTime: QueryStaleTime.fiveMins,
  });
