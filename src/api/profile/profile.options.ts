import { mutationOptions, queryOptions } from "@tanstack/react-query";
import { createProfile, checkUsername } from "./profile.service";
import { isQueryEnabled } from "@/api/base/base.util";
import { QueryStaleTime } from "@/api/base/base.const";

export const createProfileOption = mutationOptions({
  mutationKey: ["profile", "create"],
  mutationFn: createProfile,
});

export function checkUsernameOption(username: string | undefined) {
  return queryOptions({
    queryKey: ["username-availability", username],
    enabled: isQueryEnabled(username),
    queryFn: ({ signal }) => checkUsername(username!, signal),
    staleTime: QueryStaleTime.fiveMins,
  });
}
