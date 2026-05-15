import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden rounded-t-[24px] bg-[#25272B] px-4 pt-16 pb-10 md:px-8">
      <div className="pointer-events-none absolute -bottom-25 -left-10 z-0 hidden h-75 w-70 select-none md:block md:h-112.5 md:w-85">
        <Image
          src="/footer/footer.svg"
          className="object-contain pt-20"
          alt=""
          fill
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-12 pb-16 md:flex-row md:gap-8">
          <div className="flex-1 md:pt-7">
            <div className="flex items-center">
              <div className="relative h-10 w-50 md:h-12.5 md:w-62.5">
                <Image
                  src="/footer/logo.svg"
                  className="h-full w-full object-contain object-bottom-left"
                  alt="OpenProfile logo"
                  fill
                />
              </div>
            </div>

            <p className="mt-3 max-w-62.5 text-[15px] leading-relaxed font-semibold text-[#E2E4E9] md:text-[16px]">
              Your verified identity, discoverable everywhere.
            </p>
          </div>

          <div className="grid flex-[1.5] grid-cols-2 gap-8 md:grid-cols-3 md:gap-16">
            <div className="space-y-6">
              <h4 className="text-[14px] font-semibold text-white">Products</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-[13px] font-normal text-[#E2E4E9] transition-colors hover:text-white"
                  >
                    How it works
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[13px] font-normal text-[#E2E4E9] transition-colors hover:text-white"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[13px] font-normal text-[#E2E4E9] transition-colors hover:text-white"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-[13px] font-normal text-[#E2E4E9] transition-colors hover:text-white"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[14px] font-semibold text-white">Company</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-[13px] font-normal text-[#E2E4E9] transition-colors hover:text-white"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[13px] font-normal text-[#E2E4E9] transition-colors hover:text-white"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[13px] font-normal text-[#E2E4E9] transition-colors hover:text-white"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-[13px] font-normal text-[#E2E4E9] transition-colors hover:text-white"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[14px] font-semibold text-white">Legal</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-[13px] font-normal text-[#E2E4E9] transition-colors hover:text-white"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-[13px] font-normal text-[#E2E4E9] transition-colors hover:text-white"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center border-t border-[#5C5E64] pt-8">
          <p className="text-center text-[13px] font-light text-[#FEFEFE]">
            © {new Date().getFullYear()} Open Profile. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
