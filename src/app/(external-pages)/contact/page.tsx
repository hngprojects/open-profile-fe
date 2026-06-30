import { CTA } from "@/components/home/CTA";
import { ContactInfo } from "@/components/contact/ContactInfo";
import { ContactForm } from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="selection:bg-brand text-primary-text min-h-screen overflow-hidden bg-white font-sans selection:text-white">
      <div className="pt-[76px]">
        <main className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="mb-3 text-[32px] font-semibold tracking-tight md:text-[40px]">
              Get in Touch With Us
            </h1>
            <p className="text-secondary-text text-[14px] md:text-[15px]">
              No matter where you are, Open Profile brings solutions closer to
              you.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2">
            <ContactInfo />
            <ContactForm />
          </div>
        </main>

        <CTA />
      </div>
    </div>
  );
}
