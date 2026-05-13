import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <section className="relative h-screen flex flex-col items-center justify-center text-center bg-secondary px-3 lg:px-0">
        <h1 className="text-8xl md:text-[150px] xl:text-[220px] font-extrabold text-brand font-heading">
          Oops!
        </h1>

        <h2 className="font-bold uppercase text-lg lg:text-2xl mt-5 lg:mt-7">
          404 - Page not found
        </h2>

        <p className="mb-5 md:w-1/2 lg:w-1/3 mt-3">
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>

        <Link href="/" className="mt-2">
          <Button size="lg" className="text-lg uppercase px-8 py-6">
            Go To Homepage
          </Button>
        </Link>
      </section>
    </main>
  );
}
