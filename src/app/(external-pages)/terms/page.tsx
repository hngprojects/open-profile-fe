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

      <section className="max-w-360 mx-auto mt-20">
        <div className="px-5 md:px-28 py-12 bg-[#DBEFF2]">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-2xl">
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                Terms of Service
              </h1>

              <p className="text-slate-600 text-lg mb-3">
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
                  className="py-3 px-12 w-full lg:w-1/2 bg-[#FAFAFA] border border-[#C9C9C9] rounded-[5.57px] text-[16px] leading-6 text-[#A3A3A3] placeholder:text-[#A3A3A3] outline-none focus:ring-2 focus:ring-brand/40 transition"
                />

                <Button className="rounded-[5.57px] py-6 lg:ml-1 mt-2 lg:mt-0 w-full lg:w-auto">
                  Search
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="mx-auto px-5 md:px-28 py-12 mt-17.5">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="flex-1">
              <h2 className="font-semibold text-slate-900 mb-2 text-3xl tracking-wider">
                Table Of Contents
              </h2>

              <div className="sticky top-24 rounded-xl flex-2">
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full text-left lg:mt-3 rounded-lg transition-all duration-200 text-xl p-4 px-5 cursor-pointer ${
                        activeSection === section.id
                          ? "bg-teal-100 text-teal-900 font-medium"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{section.id}</span>
                        <span>{section.title}</span>
                      </span>
                    </button>
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
                      <div className="flex items-start gap-3 mb-4">
                        <span className="text-4xl">{section.icon}</span>
                        <h2 className="text-3xl font-bold text-slate-900 mb-1">
                          {section.id}. {sectionContent[section.id].title}
                        </h2>
                      </div>

                      <p className="text-primary leading-relaxed mb-4">
                        {sectionContent[section.id].content}
                      </p>

                      {Array.isArray(sectionContent[section.id].details) &&
                      Array.from(sectionContent[section.id].details).length >
                        1 ? (
                        <ul
                          className={`space-y-2  ${section.id != "9" ? "list-disc" : "ml-4"}`}
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
                        <p className="text-primary leading-relaxed mb-4 mt-3">
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
