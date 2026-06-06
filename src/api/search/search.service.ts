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
  photoUrl?: string;
  slug?: string;
};

export type SearchResponse = {
  results: SearchResult[];
  total: number;
};

export function searchProfiles({
  q,
  page = 1,
  limit = 10,
  signal,
}: {
  q: string;
  page?: number;
  limit?: number;
  signal?: AbortSignal;
}) {
  return callApi<SearchResponse>({
    url: "/search",
    method: "GET",
    params: { q, page, limit },
    signal,
  });
}
