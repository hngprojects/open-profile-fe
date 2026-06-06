"use client";

import { useState, useRef, useEffect } from "react";
import { CTA } from "@/components/home/CTA";
// import { Search } from "lucide-react";

type SectionProp = {
  id: string;
  title: string;
  icon?: string;
}[];

type SectionContentProp = {
  [id: string]: {
    title: string;
    content: string;
    details: string[];
    extraDetails?: string;
  };
};

const sections: SectionProp = [
  { id: "1", title: "Introduction" },
  { id: "2", title: "User Accounts and Eligibility" },
  { id: "3", title: "Use of the Platform" },
  { id: "4", title: "Public Profile and User Content" },
  { id: "5", title: "Intellectual Property" },
  { id: "6", title: "Account Suspension and Termination" },
  { id: "7", title: "Disclaimers and Limitation of Liability" },
  { id: "8", title: "Changes to These Terms" },
  { id: "9", title: "Contact Information" },
];

const sectionContent: SectionContentProp = {
  "1": {
    title: "Introduction",
    content: `Welcome to Open Profile ("Open Profile," "we," "our," or "us"). These Terms of Service ("Terms") govern your use of the Open Profile website, applications, and related services (collectively, the "Service").`,
    details: [
      "By accessing or using Open Profile, you agree to comply with these Terms. If you do not agree, you should discontinue use of the Service",
    ],
  },
  "2": {
    title: "User Accounts and Eligibility",
    content:
      "To access certain features, users may be required to create an account. By creating an account, you agree that:",
    details: [
      "Information provided is accurate and current",
      "You are responsible for maintaining account security",
      "You are responsible for activities under your account",
      "You will not impersonate others or create misleading accounts",
    ],
    extraDetails:
      "We reserve the right to suspend or terminate accounts that violate these Terms.",
  },
  "3": {
    title: "Use of the Platform",
    content: "Users agree to use Open Profile lawfully and responsibly. ",
    details: [
      "Engage in fraud or illegal activities",
      "Harass, abuse, or threaten others",
      "Upload harmful or malicious content",
      "Attempt unauthorized access to systems",
      "Scrape or misuse platform data",
      "Violate applicable laws or regulations",
    ],
    extraDetails:
      "Open Profile may remove content or restrict access where necessary",
  },
  "4": {
    title: "Public Profile and User Content",
    content:
      "Open Profile is designed for public profile discovery. By publishing content on the platform, you understand that:",
    details: [
      "Your profile may be publicly visible",
      "Search engines may index your content",
      "Other users may share your profile",
    ],
    extraDetails:
      "You retain ownership of your content, but you grant Open Profile a non-exclusive license to host, display, and distribute content necessary to operate the Service. You are solely responsible for the content you publish",
  },
  "5": {
    title: "Intellectual Property",
    content:
      "All platform branding, software, designs, logos, and materials are owned by Open Profile or its licensors. Users may not:",
    details: [
      "Copy or reproduce platform materials",
      "Reverse engineer platform systems",
      "Use Open Profile branding without permission",
    ],
  },
  "6": {
    title: "Account Suspension and Termination",
    content: "We reserve the right to suspend or terminate accounts for:",
    details: [
      "Violating these Terms",
      "Fraudulent or harmful activity",
      "Security concerns",
      "Legal compliance requirements",
    ],
    extraDetails: "Termination may occur without prior notice where necessary.",
  },
  "7": {
    title: "Disclaimers and Limitation of Liability",
    content:
      'Open Profile is provided "AS IS" and "AS AVAILABLE". We do not guarantee:',
    details: [
      "Continuous availability",
      "Error-free operation",
      "Complete security",
      "Uninterrupted access",
    ],
    extraDetails:
      "To the fullest extent permitted by law, Open Profile shall not be liable for indirect, incidental, or consequential damages arising from use of the Service.",
  },
  "8": {
    title: "Changes to These Terms",
    content:
      "We may update these Terms periodically. Continued use of Open Profile after changes become effective constitutes acceptance of the revised Terms.",
    details: [],
  },
  "9": {
    title: "Contact Information",
    content:
      "For questions or legal inquiries regarding these Terms, contact: Open Profile Legal Team",
    details: [
      "Email: privacy@openprofile.com",
      "Support: support@openprofile.com",
    ],
  },
};

export default function TermsOfService() {
  const [activeId, setActiveId] = useState<string>("1");
  const isClickingRef = useRef(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (isClickingRef.current) return;

      const headingElements = sections
        .map((item) => {
          const id = `section-${item.id}`;
          const el = document.getElementById(id);
          return { id: item.id, el };
        })
        .filter((item) => item.el !== null);

      let currentActiveId = headingElements[0]?.id || "";
      for (const { id, el } of headingElements) {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 250) {
            currentActiveId = id;
          }
        }
      }

      setActiveId(currentActiveId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    const timer = setTimeout(() => handleScroll(), 100);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const elementId = `section-${id}`;
    const element = document.getElementById(elementId);
    if (element) {
      isClickingRef.current = true;
      setActiveId(id);
      element.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `#${elementId}`);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        isClickingRef.current = false;
      }, 1000);
    }
  };

  return (
    <div className="text-primary selection:bg-brand min-h-screen overflow-x-clip bg-white font-sans selection:text-white">
      <div className="bg-brand-subtle-bg h-80 w-screen pt-20 lg:pt-36">
        <div className="mx-auto flex max-w-[70%] flex-col gap-3 p-3">
          <div>
            <h3 className="text-primary-text text-4xl font-bold">
              Terms of Service
            </h3>
            <p className="text-secondary-text mt-3 font-semibold">
              Last updated on the 10th of May 2026
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto flex flex-col gap-10 px-4 py-16 lg:max-w-6xl lg:flex-row">
        <div className="flex-1">
          <div className="bg-primary-bg sticky top-28 rounded-[20px] p-6 md:p-8">
            <h4 className="text-primary-text font-inter mb-6 text-xl font-bold tracking-tight">
              Table Of Contents
            </h4>
            <ul className="text-secondary-text space-y-1 text-sm font-medium md:text-base">
              {sections.map((section) => {
                const isActive = activeId === section.id;

                return (
                  <li key={section.id}>
                    <a
                      href={`#section-${section.id}`}
                      onClick={(e) => handleClick(e, section.id)}
                      className={`block rounded-lg px-4 py-3 transition-colors ${
                        isActive
                          ? "bg-brand-subtle-bg text-brand-text font-semibold"
                          : "hover:bg-hover-bg hover:text-primary-text"
                      }`}
                    >
                      {section.id}. {section.title}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="flex-2">
          <div className="space-y-12">
            {sections.map((section) => (
              <article
                key={section.id}
                className="group animate-fadeIn scroll-mt-32"
                id={`section-${section.id}`}
              >
                <div className="mb-6 space-y-4">
                  <h2 className="text-primary-text text-3xl font-bold">
                    {section.id}. {sectionContent[section.id].title}
                  </h2>

                  <p className="text-secondary-text leading-relaxed">
                    {sectionContent[section.id].content}
                  </p>

                  {sectionContent[section.id].details.length > 0 && (
                    <ul
                      className={`text-secondary-text space-y-2 ${section.id != "9" ? "list-disc pl-5" : "pl-0"}`}
                    >
                      {sectionContent[section.id].details.map((item, idx) => (
                        <li key={idx} className="leading-relaxed">
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}

                  {sectionContent[section.id].extraDetails && (
                    <p className="text-secondary-text mt-3 mb-4 leading-relaxed">
                      {sectionContent[section.id].extraDetails}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>

      <CTA />
    </div>
  );
}
