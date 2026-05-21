import Link from "next/link";
import {
  ArrowRight,
  Bug,
  ChevronDown,
  ChevronRight,
  FileText,
  Lock,
  Mail,
  Palette,
  Rocket,
  Search,
  Send,
  Share2,
  ShieldCheck,
} from "lucide-react";

const categories = [
  {
    title: "Getting Started",
    description: "Essential steps to launch your first profile.",
    icon: Rocket,
    slug: "getting-started",
  },
  {
    title: "Profile Management",
    description: "Update, edit, and curate your public data.",
    icon: FileText,
    slug: "profile-management",
  },
  {
    title: "Templates",
    description: "Customizing layouts and visual themes.",
    icon: Palette,
    slug: "templates",
  },
  {
    title: "Verification System",
    description: "Learn how to get your identity verified.",
    icon: ShieldCheck,
    slug: "verification-system",
  },
  {
    title: "Invites & Sharing",
    description: "Managing permissions and network growth.",
    icon: Share2,
    slug: "invites-sharing",
  },
  {
    title: "Account & Security",
    description: "Privacy settings and account protection.",
    icon: Lock,
    slug: "account-security",
  },
];

const guides = [
  {
    title: "How Open.Profile works",
    description:
      "A comprehensive overview of the modular architecture and data-driven profiles.",
    icon: FileText,
    href: "/dashboard/help/how-open-profile-works",
    action: "Read the guide",
  },
  {
    title: "Setting up your profile",
    description:
      "Step-by-step instructions for beginners to create a high-impact digital presence.",
    icon: Palette,
    href: "/dashboard/help/setting-up-your-profile",
    action: "Start setup",
  },
  {
    title: "Making your profile discoverable",
    description:
      "Advanced SEO and networking tips to ensure your profile reaches the right audience.",
    icon: Search,
    href: "/dashboard/help/profile-discoverability",
    action: "Learn more",
  },
];

const quickActions = [
  {
    title: "Contact Support",
    href: "mailto:support@openprofile.com",
    icon: Mail,
  },
  {
    title: "Report a Bug",
    href: "mailto:support@openprofile.com?subject=Bug%20Report",
    icon: Bug,
  },
  {
    title: "Send Feedback",
    href: "mailto:support@openprofile.com?subject=Feedback",
    icon: Send,
  },
];

const faqs = [
  {
    question: "Can I use a custom domain with my profile?",
    answer:
      "Yes, custom domain support is planned for supported profile plans.",
  },
  {
    question: "How do I export my profile data?",
    answer:
      "You will be able to export your profile data from your account settings when export tools are available.",
  },
  {
    question: "What templates are available for free?",
    answer:
      "Free templates include the default profile layouts available in the profile builder.",
  },
  {
    question: "How does the verification system work?",
    answer:
      "Verification helps confirm profile identity and credibility using supported account or document checks.",
  },
];

export default function HelpSupportContent() {
  return (
    <div className="w-full max-w-[980px]">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_260px] lg:gap-x-14">
        <div>
          <section className="rounded-[10px] border border-[#EDEDED] bg-white px-6 py-5">
            <h1 className="font-bold text-[#050505]">Help & Support</h1>
            <p className="mt-2 max-w-[520px] text-sm text-[#454545]">
              Find answers, learn how to optimize your profile, and get
              technical assistance from our team.
            </p>
          </section>

          <section className="mt-6">
            <h2 className="font-bold text-[#050505]">Browse by Category</h2>

            <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
              {categories.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.slug}
                    href={`/dashboard/help#${item.slug}`}
                    className="min-h-[150px] rounded-[8px] border border-[#EDEDED] bg-white p-6 text-[#050505]"
                  >
                    <Icon size={18} />
                    <h3 className="mt-5 font-bold">{item.title}</h3>
                    <p className="mt-2 text-sm text-[#454545]">
                      {item.description}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

        <aside className="self-start rounded-[10px] border border-[#EDEDED] bg-white p-4">
          <h2 className="font-bold text-[#050505]">Quick Actions</h2>

          <div className="mt-4 flex flex-col gap-3">
            {quickActions.map((item) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.title}
                  href={item.href}
                  className="flex items-center justify-between gap-3 rounded-[8px] border border-[#EDEDED] px-3 py-3 text-sm font-medium whitespace-nowrap text-[#050505]"
                >
                  <span className="flex items-center gap-2">
                    <Icon size={16} />
                    {item.title}
                  </span>
                  <ChevronRight size={16} />
                </a>
              );
            })}
          </div>
        </aside>
      </div>

      <section className="mt-8">
        <h2 className="font-bold text-[#050505]">Learning & Guides</h2>

        <div className="mt-4 flex flex-col gap-4">
          {guides.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.title}
                href={item.href}
                className="grid grid-cols-1 overflow-hidden rounded-[8px] border border-[#EDEDED] bg-white text-[#050505] md:grid-cols-[210px_1fr]"
              >
                <div className="flex min-h-[110px] items-center justify-center bg-[#DFF3F6] text-[#087583]">
                  <Icon size={34} />
                </div>

                <div className="p-5">
                  <h3 className="font-bold">{item.title}</h3>
                  <p className="mt-2 text-sm text-[#454545]">
                    {item.description}
                  </p>

                  <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-[#050505]">
                    {item.action}
                    <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-bold text-[#050505]">Frequently Asked Questions</h2>

        <div className="mt-4 flex flex-col gap-3">
          {faqs.map((item) => (
            <details
              key={item.question}
              className="rounded-[8px] border border-[#EDEDED] bg-white px-5 py-4"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-bold text-[#050505]">
                {item.question}
                <ChevronDown size={16} />
              </summary>

              <p className="mt-3 text-sm text-[#454545]">{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
