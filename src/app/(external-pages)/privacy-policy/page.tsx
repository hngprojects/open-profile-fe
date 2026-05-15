import { CTA } from "@/components/home/CTA";
import PrivacyContent from "@/components/home/PrivacyContent";
import PrivacyHero from "@/components/home/PrivacyHero";
import PrivacyTable from "@/components/home/PrivacyTable";
import Footer from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="text-primary min-h-screen overflow-hidden bg-white font-sans selection:bg-[#065E69] selection:text-white">
      <Navbar />
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
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
