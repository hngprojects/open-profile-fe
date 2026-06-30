"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, ChevronDown } from "lucide-react";
import { contactAction } from "@/app/actions/contact";
import { Button } from "@/components/ui/button";
import { validateFullName } from "@/utils/nameValidation";

const industries = [
  "Technology",
  "Design",
  "Marketing",
  "Finance",
  "Healthcare",
  "Education",
  "Other",
];

const MESSAGE_MAX_LENGTH = 450;

const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .superRefine((val, ctx) => {
      const err = validateFullName(val);
      if (err) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: err,
        });
      }
    }),
  email: z
    .string()
    .trim()
    .min(1, "Email is required.")
    .email("Incorrect email format."),
  industry: z.string().optional(),
  message: z
    .string()
    .trim()
    .min(1, "Message is required.")
    .max(
      MESSAGE_MAX_LENGTH,
      `Message cannot exceed ${MESSAGE_MAX_LENGTH} characters.`
    ),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactForm() {
  const [success, setSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isValid },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      industry: "",
      message: "",
    },
    mode: "onTouched",
  });

  const industry = watch("industry");
  const messageVal = watch("message") || "";
  const characterCount = messageVal.length;

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

  async function onSubmit(data: ContactFormValues) {
    setPending(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      if (data.industry) {
        formData.append("industry", data.industry);
      }
      formData.append("message", data.message);

      const result = await contactAction(undefined, formData);
      if (result?.error) {
        toast.error(result.error);
      } else if (result?.success) {
        setSuccess(true);
        reset();
      }
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <h2 className="mb-6 text-[18px] font-semibold">Send a Message</h2>

      {success ? (
        <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
          <div className="bg-brand-subtle-bg flex h-14 w-14 items-center justify-center rounded-full">
            <Mail size={24} className="text-brand" />
          </div>
          <h3 className="text-primary-text text-[17px] font-semibold">
            Message Sent!
          </h3>
          <p className="text-secondary-text max-w-xs text-[13px]">
            Thanks for reaching out. We&apos;ll get back to you as soon as
            possible.
          </p>
          <Button
            onClick={() => setSuccess(false)}
            className="mt-2 hover:underline"
          >
            Send another message
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          <input type="hidden" {...register("industry")} />

          <div className="space-y-1.5">
            <label
              htmlFor="name"
              className="text-primary-text text-[13px] font-medium"
            >
              Name <span className="text-negative-text">*</span>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Shukuneh Itouer"
              {...register("name")}
              className={`placeholder:text-disabled-text w-full rounded-[8px] border px-4 py-3 text-[13px] transition focus:ring-2 focus:outline-none ${
                errors.name
                  ? "border-negative-text focus:ring-negative-text"
                  : "border-input-b focus:ring-brand focus:border-transparent"
              }`}
            />
            {errors.name?.message && (
              <p className="text-negative-text mt-1 text-xs">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="email"
              className="text-primary-text text-[13px] font-medium"
            >
              Email <span className="text-negative-text">*</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="shukuneh025@gmail.com"
              {...register("email")}
              className={`placeholder:text-disabled-text w-full rounded-[8px] border px-4 py-3 text-[13px] transition focus:ring-2 focus:outline-none ${
                errors.email
                  ? "border-negative-text focus:ring-negative-text"
                  : "border-input-b focus:ring-brand focus:border-transparent"
              }`}
            />
            {errors.email?.message && (
              <p className="text-negative-text mt-1 text-xs">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Custom industry dropdown */}
          <div className="space-y-1.5">
            <label className="text-primary-text text-[13px] font-medium">
              Industry
            </label>
            <div className="relative" ref={dropdownRef}>
              <Button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="border-input-b focus:ring-brand flex w-full items-center justify-between rounded-[8px] border bg-white px-4 py-3 text-[13px] transition focus:ring-2 focus:outline-none"
              >
                <span
                  className={
                    industry ? "text-primary-text" : "text-disabled-text"
                  }
                >
                  {industry || "Select..."}
                </span>
                <ChevronDown
                  size={16}
                  className={`text-disabled-text transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                />
              </Button>

              {open && (
                <div className="border-input-b absolute z-10 mt-1 w-full origin-top overflow-hidden rounded-[8px] border bg-white shadow-lg">
                  {industries.map((i) => (
                    <Button
                      key={i}
                      variant="dropdownItem"
                      type="button"
                      onClick={() => {
                        setValue("industry", i, { shouldValidate: true });
                        setOpen(false);
                      }}
                      className={`hover:bg-brand-light-subtle-bg w-full px-4 py-2.5 text-left text-[13px] transition-colors ${
                        industry === i
                          ? "text-brand font-medium"
                          : "text-primary-text"
                      }`}
                    >
                      {i}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor="message"
              className="text-primary-text text-[13px] font-medium"
            >
              Message <span className="text-negative-text">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Type your messages"
              {...register("message")}
              className={`placeholder:text-disabled-text w-full resize-none rounded-[8px] border px-4 py-3 text-[13px] transition focus:ring-2 focus:outline-none ${
                errors.message || characterCount > MESSAGE_MAX_LENGTH
                  ? "border-negative-text focus:ring-negative-text"
                  : "border-input-b focus:ring-brand focus:border-transparent"
              }`}
            />
            <div className="mt-1 flex items-center justify-between">
              <div>
                {(errors.message?.message ||
                  characterCount > MESSAGE_MAX_LENGTH) && (
                  <p className="text-negative-text text-xs">
                    {errors.message?.message ||
                      `Message cannot exceed ${MESSAGE_MAX_LENGTH} characters.`}
                  </p>
                )}
              </div>
              <span
                className={`text-xs ${
                  characterCount > MESSAGE_MAX_LENGTH
                    ? "text-negative-text font-medium"
                    : "text-disabled-text"
                }`}
              >
                {characterCount} / {MESSAGE_MAX_LENGTH}
              </span>
            </div>
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={!isValid || pending}
            className="bg-brand hover:enabled:bg-brand-hover-bg w-full rounded-[8px] py-3.5 text-[14px] font-medium text-white transition-all disabled:cursor-not-allowed disabled:opacity-40"
          >
            {pending ? "Sending…" : "Continue"}
          </Button>
        </form>
      )}
    </div>
  );
}
