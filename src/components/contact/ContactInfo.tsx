import { Mail, Phone, MapPin } from "lucide-react";

const XIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="opacity-70 transition-opacity hover:opacity-100"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="opacity-70 transition-opacity hover:opacity-100"
  >
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
);

const socials = [
  { label: "X", href: "https://x.com/OpenProfilehq", icon: <XIcon /> },
  {
    label: "Instagram",
    href: "https://instagram.com/openprofilehq",
    icon: <InstagramIcon />,
  },
];

export function ContactInfo() {
  return (
    <div className="space-y-10">
      <div>
        <h2 className="mb-6 text-[18px] font-semibold">Contact Us</h2>
        <ul className="space-y-5">
          <li className="flex items-start gap-3">
            <Mail size={18} className="text-link-hover-text mt-0.5 shrink-0" />
            <div>
              <p className="text-primary-text text-[13px] font-medium">
                Email Address
              </p>
              <p className="text-secondary-text text-[13px]">
                openprofile@gmail.com
              </p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <Phone size={18} className="text-link-hover-text mt-0.5 shrink-0" />
            <div>
              <p className="text-primary-text text-[13px] font-medium">
                Phone number
              </p>
              <p className="text-secondary-text text-[13px]">+1 234 567 8900</p>
            </div>
          </li>
          <li className="flex items-start gap-3">
            <MapPin
              size={18}
              className="text-link-hover-text mt-0.5 shrink-0"
            />
            <div>
              <p className="text-primary-text text-[13px] font-medium">
                Our Office Address
              </p>
              <p className="text-secondary-text text-[13px]">New York, USA</p>
            </div>
          </li>
        </ul>
      </div>

      {/* Socials */}
      <div>
        <p className="text-primary-text mb-2 text-[20px] font-medium">
          Follow us on our social media accounts
        </p>
        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary-text hover:text-brand block transition-colors"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
