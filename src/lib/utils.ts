import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function maskEmail(email: string) {
  const [name, domain] = email.split("@");

  return `${name.slice(0, 2)}******@${domain}`;
}
