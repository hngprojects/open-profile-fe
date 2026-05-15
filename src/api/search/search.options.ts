import { queryOptions } from "@tanstack/react-query";
import { searchProfiles } from "./search.service";

export const searchProfilesOption = (q: string) =>
  queryOptions({
    queryKey: ["search", q],
    queryFn: ({ signal }) => searchProfiles({ q, signal }),
    enabled: q.trim().length >= 2,
  });
