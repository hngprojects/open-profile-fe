import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <section className="bg-secondary relative flex h-screen flex-col items-center justify-center px-3 text-center lg:px-0">
        <h1 className="text-brand font-heading text-8xl font-extrabold md:text-[150px] xl:text-[220px]">
          Oops!
        </h1>

        <h2 className="mt-5 text-lg font-bold uppercase lg:mt-7 lg:text-2xl">
          404 - Page not found
        </h2>

        <p className="mt-3 mb-5 md:w-1/2 lg:w-1/3">
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>

        <Link href="/" className="mt-2">
          <Button size="lg" className="px-8 py-6 text-lg uppercase">
            Go To Homepage
          </Button>
        </Link>
      </section>
    </main>
  );
}
