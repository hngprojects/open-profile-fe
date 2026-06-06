import { queryOptions } from "@tanstack/react-query";
import { searchProfiles } from "./search.service";

export const searchProfilesOption = (
  q: string,
  page: number = 1,
  limit: number = 4
) =>
  queryOptions({
    queryKey: ["search", q, page, limit],
    queryFn: ({ signal }) => searchProfiles({ q, page, limit, signal }),
    enabled: q.trim().length >= 3,
  });
