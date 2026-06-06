export const ChatBubbleDotIcon = ({
  className = "h-12 w-12 text-brand-hover",
}: {
  className?: string;
}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect width="20" height="16" x="2" y="3" rx="4" />
    <path d="M8 11h.01M12 11h.01M16 11h.01" />
    <path d="M12 19v3l-4-3" />
  </svg>
);
