import "server-only";
import { callApiServer } from "@/api/base/base.server";
import { SearchResponse } from "./search.service";

export function searchProfilesServer({
  q,
  page = 1,
  limit = 10,
}: {
  q: string;
  page?: number;
  limit?: number;
}) {
  return callApiServer<SearchResponse>({
    url: "/search",
    method: "GET",
    params: { q, page, limit },
  });
}
