"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { CTA } from "@/components/home/CTA";
import Footer from "@/components/layout/Footer";
import { Mail, Phone, MapPin, ChevronDown } from "lucide-react";
import { contactAction } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";

const XIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const DribbbleIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 0C5.374 0 0 5.373 0 12c0 6.628 5.374 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12zm7.92 5.666a10.1 10.1 0 0 1 2.254 5.84c-.33-.066-3.63-.738-6.95-.32-.075-.18-.143-.367-.22-.553-.21-.527-.44-1.056-.676-1.57 3.665-1.494 5.33-3.647 5.592-3.397zM12 2.054a9.94 9.94 0 0 1 6.7 2.578c-.22.22-1.72 2.22-5.25 3.55A44.7 44.7 0 0 0 9.7 2.3 10.04 10.04 0 0 1 12 2.054zM7.44 3.07a43.3 43.3 0 0 1 3.72 5.73c-4.69 1.25-8.83 1.23-9.27 1.22A10.02 10.02 0 0 1 7.44 3.07zM2.04 12.01v-.26c.43.01 5.27.07 10.27-1.42.29.56.56 1.13.81 1.71-.13.04-.26.07-.39.11-5.17 1.67-7.92 6.23-8.15 6.63A9.96 9.96 0 0 1 2.04 12zm9.96 9.95a9.94 9.94 0 0 1-6.07-2.06c.19-.38 2.37-4.6 8.07-6.6l.07-.02a35.7 35.7 0 0 1 1.84 6.53 9.93 9.93 0 0 1-3.91.15zm5.76-1.37a37.5 37.5 0 0 0-1.71-6.1c2.8-.45 5.26.29 5.57.38a10.02 10.02 0 0 1-3.86 5.72z" />
  </svg>
);
const BehanceIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.28.55-.67 1-1.16 1.35-.48.348-1.05.6-1.69.75-.63.148-1.29.222-1.98.222H0V4.502h6.938zm-.34 5.65c.585 0 1.07-.14 1.44-.42.37-.28.55-.72.55-1.32 0-.33-.06-.61-.18-.83-.12-.22-.29-.4-.5-.53-.21-.13-.45-.22-.72-.27-.27-.05-.55-.08-.84-.08H3.5v3.45h3.1zm.16 5.87c.32 0 .62-.03.9-.09.28-.06.53-.16.74-.31.21-.15.38-.35.5-.6.12-.25.18-.57.18-.96 0-.76-.21-1.3-.64-1.62-.43-.32-.99-.48-1.69-.48H3.5v4.06h3.26zm10.35-5.87c-.37-.4-.9-.6-1.6-.6-.45 0-.83.08-1.13.23-.3.15-.54.34-.73.57-.19.23-.32.48-.4.75-.08.27-.13.53-.14.78h4.74c-.06-.77-.37-1.33-.74-1.73zm-3.01 5.1c.43.42 1.05.63 1.86.63.58 0 1.08-.15 1.5-.44.42-.29.68-.6.78-.93h2.56c-.41 1.27-1.04 2.18-1.9 2.73-.86.55-1.9.82-3.12.82-.85 0-1.61-.14-2.3-.42-.69-.28-1.27-.67-1.75-1.18-.48-.5-.85-1.1-1.1-1.8-.26-.7-.39-1.46-.39-2.28 0-.8.13-1.54.4-2.23.27-.69.65-1.29 1.14-1.8.49-.5 1.08-.9 1.77-1.18.69-.28 1.45-.42 2.28-.42.93 0 1.75.18 2.44.54.69.36 1.26.84 1.7 1.44.44.6.76 1.28.95 2.04.19.76.26 1.55.2 2.37h-7.3c.03.9.34 1.6.77 2.02zm3.47-9.1h-5.4V4.5h5.4v1.65z" />
  </svg>
);

const socials = [
  { label: "X", href: "#", icon: <XIcon /> },
  { label: "LinkedIn", href: "#", icon: <LinkedInIcon /> },
  { label: "Dribbble", href: "#", icon: <DribbbleIcon /> },
  { label: "Behance", href: "#", icon: <BehanceIcon /> },
];

const industries = [
  "Technology",
  "Design",
  "Marketing",
  "Finance",
  "Healthcare",
  "Education",
  "Other",
];

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [industry, setIndustry] = useState("");
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const [success, setSuccess] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isValid = name.trim() && email.trim() && message.trim();

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    try {
      const result = await contactAction(
        undefined,
        new FormData(e.currentTarget)
      );
      if (result?.error) {
        toast.error(result.error);
      } else if (result?.success) {
        setSuccess(true);
        setName("");
        setEmail("");
        setIndustry("");
        setMessage("");
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="selection:bg-brand min-h-screen overflow-hidden bg-white font-sans text-[#050505] selection:text-white">
      <Navbar />
      <div className="pt-[76px]">
        <main className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="mb-3 text-[32px] font-semibold tracking-tight md:text-[40px]">
              Get in Touch With Us
            </h1>
            <p className="text-[14px] text-[#6B7280] md:text-[15px]">
              No matter where you are, Open Profile brings solutions closer to
              you.
            </p>
          </div>

          {/* Two-column layout */}
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-16 md:grid-cols-2">
            {/* Left — Contact info */}
            <div className="space-y-10">
              <div>
                <h2 className="mb-6 text-[18px] font-semibold">Contact Us</h2>
                <ul className="space-y-5">
                  <li className="flex items-start gap-3">
                    <Mail
                      size={18}
                      className="text-link-hover-text mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="text-[13px] font-medium text-[#050505]">
                        Email Address
                      </p>
                      <p className="text-[13px] text-[#5C5E64]">
                        openprofile@email.com
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <Phone
                      size={18}
                      className="text-link-hover-text mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="text-[13px] font-medium text-[#050505]">
                        Phone number
                      </p>
                      <p className="text-[13px] text-[#5C5E64]">
                        +1 234 567 8900
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin
                      size={18}
                      className="text-link-hover-text mt-0.5 shrink-0"
                    />
                    <div>
                      <p className="text-[13px] font-medium text-[#050505]">
                        Our Office Address
                      </p>
                      <p className="text-[13px] text-[#5C5E64]">
                        New York, USA
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Socials */}
              <div>
                <p className="mb-4 text-[20px] font-medium text-[#050505]">
                  Follow us on our social media accounts
                </p>
                <div className="flex items-center gap-4">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="text-[#5C5E64] transition-colors hover:text-[#065E69]"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right — Form */}
            <div>
              <h2 className="mb-6 text-[18px] font-semibold">Send a Message</h2>

              {success ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#E6F4F5]">
                    <Mail size={24} style={{ color: "#065E69" }} />
                  </div>
                  <h3 className="text-[17px] font-semibold text-[#050505]">
                    Message Sent!
                  </h3>
                  <p className="max-w-xs text-[13px] text-[#5C5E64]">
                    Thanks for reaching out. We&apos;ll get back to you as soon
                    as possible.
                  </p>
                  <Button
                    onClick={() => setSuccess(false)}
                    className="mt-2 hover:underline"
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <input type="hidden" name="industry" value={industry} />

                  <div className="space-y-1.5">
                    <label
                      htmlFor="name"
                      className="text-[13px] font-medium text-[#050505]"
                    >
                      Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Shukuneh Itouer"
                      className="w-full rounded-[8px] border border-[#E5E7EB] px-4 py-3 text-[13px] transition placeholder:text-[#D1D5DB] focus:border-transparent focus:ring-2 focus:ring-[#065E69] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="email"
                      className="text-[13px] font-medium text-[#050505]"
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="shukuneh025@gmail.com"
                      className="w-full rounded-[8px] border border-[#E5E7EB] px-4 py-3 text-[13px] transition placeholder:text-[#D1D5DB] focus:border-transparent focus:ring-2 focus:ring-[#065E69] focus:outline-none"
                    />
                  </div>

                  {/* Custom industry dropdown */}
                  <div className="space-y-1.5">
                    <label className="text-[13px] font-medium text-[#050505]">
                      Industry
                    </label>
                    <div className="relative" ref={dropdownRef}>
                      <Button
                        type="button"
                        onClick={() => setOpen((o) => !o)}
                        className="flex w-full items-center justify-between rounded-[8px] border border-[#E5E7EB] bg-white px-4 py-3 text-[13px] transition focus:ring-2 focus:ring-[#065E69] focus:outline-none"
                      >
                        <span
                          className={
                            industry ? "text-[#050505]" : "text-[#9CA3AF]"
                          }
                        >
                          {industry || "Select..."}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-[#9CA3AF] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                        />
                      </Button>

                      <div
                        className={`absolute z-10 mt-1 w-full origin-top overflow-hidden rounded-[8px] border border-[#E5E7EB] bg-white shadow-lg transition-all duration-200 ${
                          open
                            ? "scale-y-100 opacity-100"
                            : "pointer-events-none scale-y-0 opacity-0"
                        }`}
                      >
                        {industries.map((i) => (
                          <Button
                            key={i}
                            variant="dropdownItem"
                            type="button"
                            onClick={() => {
                              setIndustry(i);
                              setOpen(false);
                            }}
                            className={`w-full px-4 py-2.5 text-left text-[13px] transition-colors hover:bg-[#F0FAFB] ${
                              industry === i
                                ? "font-medium text-[#065E69]"
                                : "text-[#050505]"
                            }`}
                          >
                            {i}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label
                      htmlFor="message"
                      className="text-[13px] font-medium text-[#050505]"
                    >
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your messages"
                      className="w-full resize-none rounded-[8px] border border-[#E5E7EB] px-4 py-3 text-[13px] transition placeholder:text-[#D1D5DB] focus:border-transparent focus:ring-2 focus:ring-[#065E69] focus:outline-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    disabled={!isValid || pending}
                    className="w-full rounded-[8px] bg-[#065E69] py-3.5 text-[14px] font-medium text-white transition-all hover:enabled:bg-[#054f59] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    {pending ? "Sending…" : "Continue"}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </main>

        <CTA />
        <Footer />
      </div>
    </div>
  );
}
