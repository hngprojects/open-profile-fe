// Left decorative card: "Create Your Profile"
export function LeftAuthCard() {
  return (
    <div
      className="w-64 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col gap-3"
      style={{ transform: "rotate(-8deg)" }}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-[#087583] flex items-center justify-center self-center">
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
        <p className="font-semibold text-sm text-[#050505]">
          Create Your Profile
        </p>
        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
          Sign up in seconds with email, Google, or LinkedIn. Craft your bio,
          and link your work.
        </p>
      </div>

      <div className="h-px bg-gray-100 my-1" />

      {/* Mock profile preview */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-[#087583]/20 flex items-center justify-center">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#087583"
              strokeWidth="2"
            >
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="h-2 w-20 bg-gray-200 rounded-full" />
            <div className="h-1.5 w-28 bg-gray-100 rounded-full" />
          </div>
        </div>
        <div className="h-1.5 w-full bg-gray-100 rounded-full" />
        <div className="h-1.5 w-4/5 bg-gray-100 rounded-full" />
        <div className="mt-1 flex gap-2">
          <div className="h-6 w-16 bg-[#087583]/10 rounded-md border border-[#087583]/20 flex items-center justify-center">
            <span className="text-[10px] text-[#087583] font-medium">
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
      className="w-64 bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col gap-3"
      style={{ transform: "rotate(8deg)" }}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl border-2 border-[#087583] flex items-center justify-center self-center">
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#087583"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
      </div>

      <div className="text-center">
        <p className="font-semibold text-sm text-[#050505]">
          Verify Your Identity
        </p>
        <p className="text-xs text-gray-400 mt-1 leading-relaxed">
          Verify your email and connect social accounts. Build credibility with
          verification badges.
        </p>
      </div>

      <div className="h-px bg-gray-100 my-1" />

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
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg border border-gray-100 bg-gray-50"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#087583"
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
