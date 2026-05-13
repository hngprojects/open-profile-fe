// Left decorative card: "Create Your Profile"
export function LeftAuthCard() {
  return (
    <div
      className="flex w-64 flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg"
      style={{ transform: "rotate(-8deg)" }}
    >
      {/* Icon */}
      <div className="bg-brand-hover-bg flex h-12 w-12 items-center justify-center self-center rounded-xl">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <line x1="19" y1="8" x2="19" y2="14" />
          <line x1="22" y1="11" x2="16" y2="11" />
        </svg>
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-[#050505]">
          Create Your Profile
        </p>
        <p className="mt-1 text-xs leading-relaxed text-gray-400">
          Sign up in seconds with email, Google, or LinkedIn. Craft your bio,
          and link your work.
        </p>
      </div>

      <div className="my-1 h-px bg-gray-100" />

      {/* Mock profile preview */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="bg-brand-hover-bg/20 flex h-7 w-7 items-center justify-center rounded-full">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--link-hover-text)"
              strokeWidth="2"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="h-2 w-20 rounded-full bg-gray-200" />
            <div className="h-1.5 w-28 rounded-full bg-gray-100" />
          </div>
        </div>
        <div className="h-1.5 w-full rounded-full bg-gray-100" />
        <div className="h-1.5 w-4/5 rounded-full bg-gray-100" />
        <div className="mt-1 flex gap-2">
          <div className="bg-brand-hover-bg/10 border-brand-hover-bg/20 flex h-6 w-16 items-center justify-center rounded-md border">
            <span className="text-link-hover-text text-[10px] font-medium">
              Contact
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Right decorative card: "Verify Your Identity"
export function RightAuthCard() {
  return (
    <div
      className="flex w-64 flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-6 shadow-lg"
      style={{ transform: "rotate(8deg)" }}
    >
      {/* Icon */}
      <div className="border-brand-hover-bg flex h-12 w-12 items-center justify-center self-center rounded-xl border-2">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--link-hover-text)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>

      <div className="text-center">
        <p className="text-sm font-semibold text-[#050505]">
          Verify Your Identity
        </p>
        <p className="mt-1 text-xs leading-relaxed text-gray-400">
          Verify your email and connect social accounts. Build credibility with
          verification badges.
        </p>
      </div>

      <div className="my-1 h-px bg-gray-100" />

      {/* Mock social links */}
      <div className="flex flex-col gap-2">
        {[
          {
            label: "Email",
            icon: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z M22 6l-10 7L2 6",
          },
          {
            label: "LinkedIn",
            icon: "M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z",
          },
          { label: "X", icon: "M4 4l16 16 M20 4L4 20" },
        ].map(({ label, icon }) => (
          <div
            key={label}
            className="flex items-center gap-2 rounded-lg border border-gray-100 bg-gray-50 px-2 py-1.5"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--link-hover-text)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {icon.split(" M").map((d, i) => (
                <path key={i} d={i === 0 ? d : "M" + d} />
              ))}
            </svg>
            <span className="text-xs text-gray-500">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
