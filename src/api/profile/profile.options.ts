import { mutationOptions, queryOptions } from "@tanstack/react-query";
import type {
  UpsertDraftRequest,
  ProfileAppearanceRequest,
  TemplateType,
  ProfileAppearanceValues,
  ComponentAppearance,
} from "./profile.type";
import {
  createProfile,
  checkUsername,
  getDashboardProfile,
  getProfileContent,
  getDraftState,
  upsertDraft,
  publishProfile,
  updateProfileAppearance,
  getProfileAppearance,
} from "./profile.service";
import { isQueryEnabled } from "@/api/base/base.util";
import { QueryStaleTime } from "@/api/base/base.const";
import { QueryBaseKeys } from "@/constants/query-keys";
import { getAppearanceResponseGlobal } from "@/utils/profileAppearance";

export const createProfileOption = mutationOptions({
  mutationKey: [QueryBaseKeys.profile, "create"],
  mutationFn: createProfile,
});

export function dashboardProfileOption() {
  return queryOptions({
    queryKey: [QueryBaseKeys.profile, "dashboard"],
    queryFn: ({ signal }) => getDashboardProfile(signal),
    staleTime: QueryStaleTime.fiveMins,
  });
}

export function checkUsernameOption(username: string | undefined) {
  return queryOptions({
    queryKey: ["username-availability", username],
    enabled: isQueryEnabled(username),
    queryFn: ({ signal }) => checkUsername(username!, signal),
    staleTime: QueryStaleTime.fiveMins,
  });
}

export function profileContentOption() {
  return queryOptions({
    queryKey: [QueryBaseKeys.profile, "content"],
    queryFn: ({ signal }) => getProfileContent(signal),
    staleTime: 0,
  });
}

export function draftStateOption() {
  return queryOptions({
    queryKey: [QueryBaseKeys.profile, "draft-state"],
    queryFn: ({ signal }) => getDraftState(signal),
    staleTime: 0,
  });
}

export const upsertDraftOption = mutationOptions({
  mutationKey: [QueryBaseKeys.profile, "draft", "upsert"],
  mutationFn: (variables: {
    data: UpsertDraftRequest;
    draftVersion?: string | null;
  }) => upsertDraft(variables.data, variables.draftVersion),
});

export const publishProfileOption = mutationOptions({
  mutationKey: [QueryBaseKeys.profile, "publish"],
  mutationFn: publishProfile,
});

export function profileAppearanceOption() {
  return queryOptions({
    queryKey: [QueryBaseKeys.profile, "appearance"],
    queryFn: ({ signal }) => getProfileAppearance(signal),
    staleTime: QueryStaleTime.fiveMins,
  });
}

export const updateProfileAppearanceOption = mutationOptions({
  mutationKey: [QueryBaseKeys.profile, "appearance", "update"],
  mutationFn: (data: ProfileAppearanceRequest) => updateProfileAppearance(data),
});

export const saveTemplateOption = mutationOptions({
  mutationKey: [QueryBaseKeys.profile, "template", "save"],
  mutationFn: async (templateType: TemplateType) => {
    const template = templateType.toLowerCase();

    let currentGlobalAppearance: Partial<ProfileAppearanceValues> = {};
    let currentComponents: Record<string, ComponentAppearance> | undefined;
    try {
      const res = await getProfileAppearance();
      currentGlobalAppearance = getAppearanceResponseGlobal(res) ?? {};
      const appearanceEnvelope = res.appearance || res.data;
      if (
        appearanceEnvelope &&
        typeof appearanceEnvelope === "object" &&
        "components" in appearanceEnvelope
      ) {
        currentComponents = (
          appearanceEnvelope as {
            components?: Record<string, ComponentAppearance>;
          }
        ).components;
      }
    } catch (e) {
      console.warn(
        "Could not fetch current appearance, proceeding with minimal payload",
        e
      );
    }

    const appearanceRes = await updateProfileAppearance({
      global: {
        ...currentGlobalAppearance,
        template,
      },
      components: currentComponents as ProfileAppearanceRequest["components"],
    });

    try {
      // TODO: Remove fallback to flat currentAppearance once all profiles migrated to nested global structure
      const {
        cornerStyle: _cornerStyle,
        spacing: _spacing,
        theme: _theme,
        backgroundColour: _backgroundColour,
        textColour: _textColour,
        ...allowedThemeSettings
      } = currentGlobalAppearance as Record<string, unknown>;
      await upsertDraft({
        themeSettings: {
          ...allowedThemeSettings,
          template,
        },
      });
    } catch (error) {
      console.warn("Failed to sync template settings to draft state:", error);
    }

    return { appearanceRes, templateType };
  },
});
