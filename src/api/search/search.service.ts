import { callApi } from "@/api/base";

export type SearchResult = {
  id?: string;
  name?: string;
  fullName?: string;
  username?: string;
  title?: string;
  role?: string;
  bio?: string;
  avatar?: string;
  profileImage?: string;
  profilePicture?: string;
  slug?: string;
};

export type SearchResponse = {
  results: SearchResult[];
  total: number;
};

export function searchProfiles({
  q,
  signal,
}: {
  q: string;
  signal?: AbortSignal;
}) {
  return callApi<SearchResponse>({
    url: "/search",
    method: "GET",
    params: { q },
    signal,
  });
}
