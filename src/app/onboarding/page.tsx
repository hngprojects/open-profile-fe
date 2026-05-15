import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  return (
    <>
      <section className="before:bottom:0 relative z-1 flex min-h-screen flex-col items-center justify-center gap-4 bg-[url(/coming-soon.webp)] bg-cover bg-position-[50%_20%] bg-no-repeat px-4 text-center before:absolute before:top-0 before:right-0 before:left-0 before:z-[-1] before:h-screen before:w-full before:bg-black/80 before:content-['']">
        <h1 className="text-5xl font-extrabold text-white md:text-7xl">
          Coming Soon
        </h1>

        <p className="text-base text-white sm:w-1/2 md:w-2/3 md:text-lg">
          We’re building a smoother onboarding experience to help you get
          started faster and make the most of the platform.
          <br />
          <br className="md:hidden" />
          It’s currently in development — coming soon.
        </p>

        <div className="flex flex-col gap-2 md:flex-row md:gap-6">
          <Link href="/" className="mt-2">
            <Button
              variant="secondary"
              size="lg"
              className="px-8 py-6 text-black uppercase"
            >
              Be Notified
            </Button>
          </Link>

          <Link href="/" className="mt-2">
            <Button size="lg" className="px-8 py-6 uppercase">
              Go To Homepage
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
