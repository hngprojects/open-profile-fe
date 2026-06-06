import Link from "next/link";
import { Button } from "@/components/ui/button";

interface ComingSoonProps {
  title?: string;
  description?: string;
}

export default function ComingSoon({
  title = "Coming Soon",
  description = "We’re building a smoother onboarding experience to help you get started faster and make the most of the platform. It’s currently in development — coming soon.",
}: ComingSoonProps) {
  return (
    <section className="relative z-1 flex min-h-screen flex-col items-center justify-center gap-4 bg-[url(/coming-soon.webp)] bg-cover bg-position-[50%_20%] bg-no-repeat px-4 text-center before:absolute before:top-0 before:right-0 before:bottom-0 before:left-0 before:z-[-1] before:h-screen before:w-full before:bg-black/80 before:content-['']">
      <h1 className="text-5xl font-extrabold text-white md:text-7xl">
        {title}
      </h1>

      <p className="text-base text-white sm:w-1/2 md:w-2/3 md:text-lg">
        {description}
      </p>

      <div className="flex flex-col gap-2 md:flex-row md:gap-6">
        {/* <Link href="/" className="mt-2">
          <Button
            variant="secondary"
            size="lg"
            className="px-8 py-6 text-black uppercase"
          >
            Be Notified
          </Button>
        </Link> */}

        <Button asChild size="lg" className="mt-2 px-8 py-6 uppercase">
          <Link href="/">Go To Homepage</Link>
        </Button>
      </div>
    </section>
  );
}
