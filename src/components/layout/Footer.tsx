import Image from "next/image";
import Link from "next/link";

const FOOTER_LINK_CLASS =
  "relative inline-block text-sm font-normal text-slate-200 transition-colors after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 after:bg-white after:transition-transform after:duration-300 hover:text-white hover:after:origin-bottom-left hover:after:scale-x-100";

export default function Footer() {
  return (
    <footer className="bg-inverse-bg relative w-full overflow-hidden rounded-t-3xl px-6 pt-14 pb-8 md:px-8 md:py-16">
      <div className="pointer-events-none absolute -bottom-16 -left-16 z-0 h-72 w-72 opacity-80 select-none md:-bottom-24 md:-left-20 md:h-[400px] md:w-[400px]">
        <Image
          src="/footer/footer.svg"
          className="object-contain"
          alt=""
          fill
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex flex-col justify-between gap-10 pb-12 md:flex-row md:gap-8 md:pb-16">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <Image
                src="/footer/logo.svg"
                width={26}
                height={28}
                className="h-[26px] w-auto object-contain"
                alt="OpenProfile mark"
              />
            </div>

            <p className="text-inverse-text mt-5 leading-[1.6] font-normal">
              Your verified identity, <br />
              discoverable everywhere.
            </p>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-3 md:gap-16">
            <div className="space-y-5 md:space-y-6">
              <h4 className="text-sm font-semibold text-white">Products</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/coming-soon" className={FOOTER_LINK_CLASS}>
                    How it works
                  </Link>
                </li>
                <li>
                  <Link href="/coming-soon" className={FOOTER_LINK_CLASS}>
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className={FOOTER_LINK_CLASS}>
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className={FOOTER_LINK_CLASS}>
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-5 md:space-y-6">
              <h4 className="text-sm font-semibold text-white">Company</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/coming-soon" className={FOOTER_LINK_CLASS}>
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/coming-soon" className={FOOTER_LINK_CLASS}>
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/coming-soon" className={FOOTER_LINK_CLASS}>
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className={FOOTER_LINK_CLASS}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-5 md:space-y-6">
              <h4 className="text-sm font-semibold text-white">Legal</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/privacy-policy" className={FOOTER_LINK_CLASS}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className={FOOTER_LINK_CLASS}>
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-start border-t border-white/10 pt-8 pb-2 md:justify-center md:pb-0">
          <p className="text-left text-[12px] font-light text-slate-400 md:text-center md:text-sm md:text-white">
            © {new Date().getFullYear()} Open Profile. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
