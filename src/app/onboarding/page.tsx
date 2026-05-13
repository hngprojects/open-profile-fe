import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function OnboardingPage() {
  return (
    <>
      <section className="relative z-1 min-h-screen flex flex-col items-center justify-center gap-4 text-center before:content-[''] before:absolute before:bg-black/80 before:top-0 before:right-0 before:bottom:0 before:left-0 before:w-full before:h-screen before:z-[-1] px-4 bg-[url(/coming-soon.webp)] bg-position-[50%_20%] bg-no-repeat bg-cover">
        <h1 className="text-white text-5xl md:text-7xl font-extrabold">
          Coming Soon
        </h1>

        <p className="text-white text-base md:text-lg sm:w-1/2 md:w-2/3">
          We’re building a smoother onboarding experience to help you get
          started faster and make the most of the platform.
          <br />
          <br className="md:hidden" />
          It’s currently in development — coming soon.
        </p>

        <div className="flex flex-col md:flex-row gap-2 md:gap-6">
          <Link href="/" className="mt-2">
            <Button
              variant="secondary"
              size="lg"
              className="uppercase px-8 py-6 text-black"
            >
              Be Notified
            </Button>
          </Link>

          <Link href="/" className="mt-2">
            <Button size="lg" className="uppercase px-8 py-6">
              Go To Homepage
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}
