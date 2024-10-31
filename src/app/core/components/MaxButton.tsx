import { ReactNode } from "react";

export function MaxButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className="px-2 font-bold text-breadviolet-violet dark:text-breadpink-pink text-sm"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
