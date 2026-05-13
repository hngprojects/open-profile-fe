import React from "react";

interface TableOfContentItem {
  heading: string;
  content:
    | string
    | {
        text: string;
        list?: string[];
        footer?: string;
      };
}

const tableOfContent: TableOfContentItem[] = [
  {
    heading: "1. Introduction",
    content:
      " At Open Profile, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect information when you use our platform, website, and related services (“Open Profile” or the “Services”).Open Profile is designed to help freelancers, creators, and indie builders create a structured, searchable, and shareable public identity online. By using our Services, you agree to the collection and use of information in accordance with this Privacy Policy.",
  },
  {
    heading: "2. About Open Profile",
    content: {
      text: "Open Profile is a public profile and link-sharing platform that allows users to:",
      list: [
        "Create public digital identity pages",
        "Share links and social profiles",
        "Discover other public profiles",
        "Search for users without requiring authentication",
        "Interact with publicly available creator and personal content",
      ],
      footer:
        "Because Open Profile is designed around discoverability, certain profile information may be publicly accessible and indexed by search engines.",
    },
  },
  {
    heading: "3. Information We Collect",
    content: {
      text: "We collect information to provide and improve our Services. This includes:",
      list: [
        "Name",
        "Username",
        "Email address",
        "Profile photo",
        "Biography and public profile details",
        "Social media links",
        "Messages or support requests ",
        "Automatically Collected Information ",
        "IP address ",
        "Device and browser information ",
        "Usage activity ",
        "Cookies and analytics data ",
        "Approximate location information ",
      ],
      footer:
        " Public Profile Information Information you publish on your profile may be publicly visible and searchable.",
    },
  },
  {
    heading: "4. How We Use Your Information",
    content: {
      text: "We use your information to:",
      list: [
        "Create and manage accounts",
        "Display public profiles",
        "Improve platform performance",
        "Personalize user experience",
        "To prevent fraud and ensure security",
        "Communicate updates and support messages",
        "Prevent fraud, abuse, and unauthorized access",
        "Comply with legal obligations",
        "",
      ],
      footer:
        "We process personal information in accordance with applicable privacy and data protection laws",
    },
  },
  {
    heading: "5. Public Profiles And Search Visibility",
    content: {
      text: "Open Profile is designed as a public-facing platform By creating a public profile, you understand that:",
      list: [
        "Your profile may appear in search results",
        "Search engines may index your content",
        "Other users may view and share your profile",
        "Public content may remain temporarily cached after deletion",
      ],
      footer:
        "Users should avoid publishing confidential or sensitive personal information publicly.",
    },
  },
  {
    heading: "6. Cookies And Tracking Technologies",
    content: {
      text: "We use cookies and similar technologies to:",
      list: [
        "Keep users signed in",
        "Remember preferences",
        "Analyze traffic and engagement",
        "Improve security and performance",
      ],
      footer:
        "Users may manage or disable cookies through their browser settings, though some features may not function properly.",
    },
  },
  {
    heading: "7. Sharing And Disclosure of Information",
    content: {
      text: "We may share information with:",
      list: [
        "Service providers and hosting partners",
        "Analytics and payment providers",
        "Legal authorities where required by law",
        "Business partners during mergers or acquisitions",
        "We do not sell personal information in the traditional sense.",
        "Public profile information may be visible to anyone using the internet.",
      ],
    },
  },
  {
    heading: "8. Data Protection And User Rights",
    content: {
      text: "We implement reasonable technical and organizational safeguards to protect personal information. Depending on your location, you may have rights to:",
      list: [
        "Access your data",
        "Correct inaccurate information",
        "Request deletion of your data",
        "Restrict or object to certain processing activities",
        "Withdraw consent where applicable",
        "Open Profile aims to comply with applicable laws including:",
        "Nigeria Data Protection Act (NDPA)",
        "General Data Protection Regulation (GDPR)",
        "California Consumer Privacy Act (CCPA/CPRA)",
      ],
    },
  },

  {
    heading: "9. Children’s Privacy",
    content: {
      text: "Open Profile is not intended for children under the age required by applicable law.We do not knowingly collect personal information from children without proper authorization or consent where required. If we discover that a child has provided personal data unlawfully, we may remove such information.",
    },
  },
  {
    heading: "10. Changes To This Privacy Policy And Contact Information",
    content: {
      text: "We may update this Privacy Policy periodically to reflect changes in our practices, technologies, or legal obligations.Continued use of the Service after updates constitutes acceptance of the revised Privacy Policy.For questions, requests, or privacy-related concerns, contact:Open Profile Privacy Team  Email: privacy@openprofile.com  Support: support@openprofile.com",
    },
  },
];
const PrivacyContent = () => {
  return (
    <div>
      {tableOfContent.map((item, index) => (
        <div className="mt-6 space-y-4" key={index}>
          <h4 className="font-bold text-3xl">{item.heading}</h4>

          {typeof item.content === "string" ? (
            <p>{item.content}</p>
          ) : (
            <>
              {item.content.text && <p>{item.content.text}</p>}

              {item.content.list && (
                <ul className="list-disc pl-5 space-y-2">
                  {item.content.list.map((listItem, i) => (
                    <li key={i}>{listItem}</li>
                  ))}
                </ul>
              )}

              {item.content.footer && <p>{item.content.footer}</p>}
            </>
          )}
        </div>
      ))}
    </div>
  );
};

export default PrivacyContent;
