import { CTA } from "@/components/home/CTA";
import PrivacyContent from "@/components/home/PrivacyContent";
import PrivacyHero from "@/components/home/PrivacyHero";
import PrivacyTable from "@/components/home/PrivacyTable";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="text-primary selection:bg-brand min-h-screen overflow-x-clip bg-white font-sans selection:text-white">
      <PrivacyHero />
      <div className="mx-auto flex flex-col gap-10 px-4 py-16 lg:max-w-6xl lg:flex-row">
        <div className="flex-1">
          <PrivacyTable />
        </div>
        <div className="flex-2">
          <PrivacyContent />
        </div>
      </div>
      <CTA />
    </div>
  );
};

export default PrivacyPolicy;
