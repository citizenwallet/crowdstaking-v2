import { type ReactNode } from "react";
import clsx from "clsx";
import { LinkIcon } from "@/app/core/components/Icons/LinkIcon";
import { ExternalLink } from "@/app/core/components/ExternalLink";

const sharedClasses =
  "px-1 pe-2 py-1 text-sm flex gap-2 rounded-full items-center bg-transparent border border-gray-400 text-gray-700 dark:text-gray-300 font-bold";

export function Badge({
  children,
  icon,
}: {
  children: ReactNode;
  icon: ReactNode;
}) {
  return (
    <div className={sharedClasses}>
      {icon}
      {children}
    </div>
  );
}

export function LinkBadge({
  children,
  icon,
  href,
}: {
  children: ReactNode;
  icon: ReactNode;
  href: string;
}) {
  return (
    <ExternalLink href={href}>
      <div
        className={clsx(
          sharedClasses,
          "hover:text-breadpink-500 hover:border-breadpink-500 dark:hover:text-breadpink-shaded dark:hover:border-breadpink-shaded cursor-pointer transition-all"
        )}
      >
        {icon}
        <span className="dark:text-white text-gray-700">{children}</span>
        <span id="linkIcon" className="flex ms-auto md:ms-2">
          <LinkIcon />
        </span>
      </div>
    </ExternalLink>
  );
}
