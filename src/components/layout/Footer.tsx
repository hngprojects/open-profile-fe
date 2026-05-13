import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#25272B] rounded-t-[24px] pt-16 pb-10 px-4 md:px-8 relative overflow-hidden">
      <div className="absolute -left-10 -bottom-25 w-70 md:w-85 h-75 md:h-112.5 pointer-events-none select-none hidden md:block z-0">
        <Image
          src="/footer/footer.svg"
          className="object-contain pt-20"
          alt=""
          fill
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-8 pb-16">
          <div className="flex-1 md:pt-7">
            <div className="flex items-center">
              <div className="relative w-50 h-10 md:w-62.5 md:h-12.5">
                <Image
                  src="/footer/logo.svg"
                  className="object-contain object-bottom-left w-full h-full"
                  alt="OpenProfile logo"
                  fill
                />
              </div>
            </div>

            <p className="text-[#E2E4E9] text-[15px] md:text-[16px] mt-3 font-semibold max-w-62.5 leading-relaxed">
              Your verified identity, discoverable everywhere.
            </p>
          </div>

          <div className="flex-[1.5] grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16">
            <div className="space-y-6">
              <h4 className="text-white font-semibold text-[14px]">Products</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-[#E2E4E9] hover:text-white transition-colors text-[13px] font-normal"
                  >
                    How it works
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[#E2E4E9] hover:text-white transition-colors text-[13px] font-normal"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[#E2E4E9] hover:text-white transition-colors text-[13px] font-normal"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-[#E2E4E9] hover:text-white transition-colors text-[13px] font-normal"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-white font-semibold text-[14px]">Company</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="#"
                    className="text-[#E2E4E9] hover:text-white transition-colors text-[13px] font-normal"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[#E2E4E9] hover:text-white transition-colors text-[13px] font-normal"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-[#E2E4E9] hover:text-white transition-colors text-[13px] font-normal"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-[#E2E4E9] hover:text-white transition-colors text-[13px] font-normal"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-white font-semibold text-[14px]">Legal</h4>
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/privacy-policy"
                    className="text-[#E2E4E9] hover:text-white transition-colors text-[13px] font-normal"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="text-[#E2E4E9] hover:text-white transition-colors text-[13px] font-normal"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#5C5E64] flex items-center justify-center">
          <p className="text-[#FEFEFE] text-[13px] text-center font-light">
            © {new Date().getFullYear()} Open Profile. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
