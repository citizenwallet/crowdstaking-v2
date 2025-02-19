export function CopyIcon({ size = 3 }: { size?: 1 | 2 | 3 | 4 }) {
  return (
    <svg
      className={`fill-current w-${size} h-${size}`}
      viewBox="0 0 16 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 0H11V2H2V15H0V0ZM4 4H16V20H4V4ZM6 6V18H14V6H6Z"
      />
    </svg>
  );
}
