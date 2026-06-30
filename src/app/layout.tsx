import { Providers } from "@/components/shared/providers";
import type { Metadata } from "next";
import {
  Afacad,
  Dancing_Script,
  Geologica,
  Inter,
  Playfair_Display,
} from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { env } from "@/env/client";
import { Toaster } from "sonner";

const afacad = Afacad({ subsets: ["latin"], variable: "--font-afacad" });
const dancing = Dancing_Script({
  subsets: ["latin"],
  variable: "--font-dancing",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const geologica = Geologica({
  subsets: ["latin"],
  variable: "--font-geologica",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: {
    default: env.NEXT_PUBLIC_APP_NAME,
    template: `%s · ${env.NEXT_PUBLIC_APP_NAME}`,
  },
  description:
    "OpenProfile — build a verified profile that tells the world exactly who you are.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("font-afacad h-full antialiased", afacad.variable)}
    >
      <body
        className={`flex min-h-full flex-col ${afacad.variable} ${dancing.variable} ${inter.variable} ${geologica.variable} ${playfair.variable}`}
      >
        <Providers>
          {children}
          <Toaster richColors position="top-right" duration={2500} />
        </Providers>
      </body>
    </html>
  );
}
