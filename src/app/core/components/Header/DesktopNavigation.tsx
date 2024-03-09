import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

export function DesktopNavigationLink(props: {
  children: ReactNode;
  href: string;
  isCurrentPage?: boolean;
  isExternal?: boolean;
}) {
  const { children, href, isCurrentPage, isExternal } = props;

  const classList = clsx(
    "font-redhat text-breadgray-grey100 hover:text-breadgray-grey100 dark:hover:text-breadgray-ultra-white active:text-breadgray-violet flex items-center p-2 text-xl font-bold leading-none tracking-wider min-[810px]:px-4",
    isCurrentPage
      ? "text-breadgray-grey100 dark:text-breadgray-ultra-white"
      : "text-breadgray-rye"
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={classList}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classList}>
      {children}
    </Link>
  );
}

function DesktopNavigation({ currentPath }: { currentPath: string }) {
  return (
    <nav
      aria-label="site navigation"
      className="hidden flex-grow items-center gap-2 pl-6 md:flex lg:gap-4 lg:pl-12"
    >
      <DesktopNavigationLink isCurrentPage={currentPath === "/"} href="/">
        Bake
      </DesktopNavigationLink>
      <DesktopNavigationLink href="https://breadchain.mirror.xyz/" isExternal>
        Blog
      </DesktopNavigationLink>
    </nav>
  );
}

export default DesktopNavigation;
