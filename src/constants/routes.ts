export const ROUTES = {
  dashboard: {
    home: "/dashboard",
    profileBuilder: "/dashboard/profile-builder",
    canvas: "/dashboard/canvas",
    help: {
      home: "/dashboard/help",
      howOpenProfileWorks: "/dashboard/help/how-open-profile-works",
      settingUpYourProfile: "/dashboard/help/setting-up-your-profile",
      profileDiscoverability: "/dashboard/help/profile-discoverability",
    },
    settings: {
      home: "/dashboard/settings",
      email: "/dashboard/settings/email",
      security: "/dashboard/settings/security",
      billing: "/dashboard/settings/billing",
    },
  },
  auth: {
    login: "/login",
    signup: "/signup",
  },
  public: {
    faq: "/faq",
    privacy: "/privacy",
    terms: "/terms",
  },
  comingSoon: "/coming-soon",
  home: "/",
} as const;

export const Navlinks = [
  { label: "How it works", href: "/how-it-works" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/faq" },
] as const;
