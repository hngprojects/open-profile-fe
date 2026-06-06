import { callApi } from "@/api/base";
import {
  CreateProfileRequest,
  CreateProfileResponse,
  UsernameCheckResponse,
  ProfileResponse,
  DashboardProfileResponse,
  ProfileContentResponse,
  UpsertDraftRequest,
  UpsertDraftResponse,
  DraftStateResponse,
  PublishProfileResponse,
  ProfileAppearanceRequest,
  ProfileAppearanceResponse,
  GetProfileAppearanceResponse,
} from "./profile.type";

export function createProfile(data: CreateProfileRequest) {
  return callApi<CreateProfileResponse>({
    url: "/profiles",
    method: "POST",
    data,
  });
}

export function getDashboardProfile(signal?: AbortSignal) {
  return callApi<DashboardProfileResponse>({
    url: "/profiles/dashboard",
    method: "GET",
    signal,
  });
}

export async function checkUsername(username: string, signal?: AbortSignal) {
  const data = await callApi<
    UsernameCheckResponse & { statusCode?: number; error?: string }
  >({
    url: "/usernames/check",
    method: "GET",
    params: { username },
    signal,
  });

  if (data.error === "USERNAME_TAKEN" || data.statusCode === 409) {
    return { available: false, username };
  }

  return data;
}

export function getProfileByUsername(username: string) {
  return callApi<ProfileResponse>({
    url: `/profiles/${username}`,
    method: "GET",
  });
}

export function searchProfiles(q: string, signal?: AbortSignal) {
  return callApi<ProfileResponse[]>({
    url: "/search",
    method: "GET",
    params: { q },
    signal,
  });
}

export function getProfileContent(signal?: AbortSignal) {
  return callApi<ProfileContentResponse>({
    url: "/profiles/content",
    method: "GET",
    signal,
  });
}


export function getDraftState(signal?: AbortSignal) {
  return callApi<DraftStateResponse>({
    url: "/profiles/content/state",
    method: "GET",
    signal,
  });
}

/**
 * Saves or updates a draft of the profile content.
 *
 * @note The `_draftVersion` parameter represents the optimistic concurrency version (`updatedAt`).
 * We temporarily exclude forwarding this version inside the custom `X-Draft-Version` header
 * because the remote staging server CORS preflight configuration rejects custom headers.
 * Forwarding will be re-enabled once the CORS configuration is updated on the backend.
 */
export function upsertDraft(
  data: UpsertDraftRequest,
  _draftVersion?: string | null
) {
  const headers: Record<string, string> = {};
  // Temporarily commented out due to staging server CORS preflight blocking x-draft-version header
  /*
  if (_draftVersion) {
    headers["X-Draft-Version"] = _draftVersion;
  }
  */
  return callApi<UpsertDraftResponse>({
    url: "/profiles/content",
    method: "PUT",
    data,
    headers: Object.keys(headers).length > 0 ? headers : undefined,
  });
}

export function updateProfile(
  username: string,
  data: { fullName?: string; bio?: string | null; photoUrl?: string | null }
) {
  return callApi<DashboardProfileResponse>({
    url: `/profiles/${username}`,
    method: "PATCH",
    data,
  });
}

export function publishProfile() {
  return callApi<PublishProfileResponse>({
    url: "/profiles/publish",
    method: "POST",
  });
}

export function updateProfileAppearance(data: ProfileAppearanceRequest) {
  return callApi<ProfileAppearanceResponse>({
    url: "/profiles/appearance",
    method: "PATCH",
    data,
  });
}

export function getProfileAppearance(signal?: AbortSignal) {
  return callApi<GetProfileAppearanceResponse>({
    url: "/profiles/appearance",
    method: "GET",
    signal,
  });
}
