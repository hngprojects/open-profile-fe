"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { CTA } from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

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

export default function PrivacyPolicy() {
  const [activeSection, setActiveSection] = useState("1");
  const [search, setSearch] = useState("");
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
        "You retain ownership of your content, but you grant Open Profile a non-exclusive license to host, display, and distribute content necessary to operate the Service.You are solely responsible for the content you publish",
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
        "Keep users logged inFraudulent or harmful activity",
        "Security concerns",
        "Legal compliance requirements",
      ],
      extraDetails:
        "Termination may occur without prior notice where necessary.",
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

  return (
    <>
      <Navbar />

      <section className="mx-auto mt-20 max-w-360">
        <div className="bg-[#DBEFF2] px-5 py-12 md:px-28">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-2xl">
              <h1 className="mb-4 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                Terms of Service
              </h1>

              <p className="mb-3 text-lg text-slate-600">
                Last updated on the 10th of May 2026
              </p>

              <form className="relative">
                <Search
                  className="absolute top-4 left-4"
                  size={20}
                  color="#A3A3A3"
                />

                <input
                  type="text"
                  value={search}
                  placeholder="Search..."
                  onChange={(e) => setSearch(e.target.value)}
                  className="focus:ring-brand/40 w-full rounded-[5.57px] border border-[#C9C9C9] bg-[#FAFAFA] px-12 py-3 text-[16px] leading-6 text-[#A3A3A3] transition outline-none placeholder:text-[#A3A3A3] focus:ring-2 lg:w-1/2"
                />

                <Button className="mt-2 w-full rounded-[5.57px] py-6 lg:mt-0 lg:ml-1 lg:w-auto">
                  Search
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-17.5 px-5 py-12 md:px-28">
          <div className="flex flex-col gap-12 md:flex-row">
            <div className="flex-1">
              <h2 className="mb-2 text-3xl font-semibold tracking-wider text-slate-900">
                Table Of Contents
              </h2>

              <div className="sticky top-24 flex-2 rounded-xl">
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <Button
                      variant="dropdownItem"
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full cursor-pointer rounded-lg p-4 px-5 text-left text-xl transition-all duration-200 lg:mt-3 ${
                        activeSection === section.id
                          ? "bg-teal-100 font-medium text-teal-900"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{section.id}</span>
                        <span>{section.title}</span>
                      </span>
                    </Button>
                  ))}
                </nav>
              </div>
            </div>

            <div className="flex-1">
              <div className="space-y-12">
                {sections.map((section) => (
                  <article
                    key={section.id}
                    className="group animate-fadeIn scroll-mt-24"
                    id={`section-${section.id}`}
                  >
                    <div className="mb-6">
                      <div className="mb-4 flex items-start gap-3">
                        <span className="text-4xl">{section.icon}</span>
                        <h2 className="mb-1 text-3xl font-bold text-slate-900">
                          {section.id}. {sectionContent[section.id].title}
                        </h2>
                      </div>

                      <p className="text-primary mb-4 leading-relaxed">
                        {sectionContent[section.id].content}
                      </p>

                      {Array.isArray(sectionContent[section.id].details) &&
                      Array.from(sectionContent[section.id].details).length >
                        1 ? (
                        <ul
                          className={`space-y-2 ${section.id != "9" ? "list-disc" : "ml-4"}`}
                        >
                          {sectionContent[section.id].details.map(
                            (item, idx) => (
                              <li key={idx} className="text-primary">
                                <span>{item}</span>
                              </li>
                            )
                          )}
                        </ul>
                      ) : (
                        <p className="text-primary leading-relaxed">
                          {sectionContent[section.id].details}
                        </p>
                      )}

                      {sectionContent[section.id].extraDetails && (
                        <p className="text-primary mt-3 mb-4 leading-relaxed">
                          {sectionContent[section.id].extraDetails}
                        </p>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTA />

      <Footer />
    </>
  );
}
