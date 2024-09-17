import clsx from "clsx";
import { ReactNode } from "react";

export function PageGrid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "grid w-full grid-cols-12 governance-rows p-4 md:py-8 md:px-2 gap-y-8 sm:gap-8 lg:gap-5 lg:gap-y-3",
        className
      )}
    >
      {children}
    </div>
  );
}
