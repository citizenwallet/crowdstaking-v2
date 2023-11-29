import clsx from "clsx";
import Link from "next/link";
import type { ReactNode } from "react";

function DesktopNavigationLink(props: {
  children: ReactNode;
  href: string;
  rel?: string;
  target?: string;
  isCurrentPage?: boolean;
}) {
  const { children, isCurrentPage, ...remainingProps } = props;
  return (
    <Link
      className={clsx(
        "font-redhat dark:hover:text-breadgray-light-grey text-breadgray-burnt hover:text-breadgray-charcoal active:text-breadgray-violet flex items-center p-2 text-xl font-bold leading-none tracking-wider min-[810px]:px-4",
        isCurrentPage
          ? "dark:text-breadgray-light-grey"
          : "dark:text-breadgray-grey"
      )}
      {...remainingProps}
    >
      {children}
    </Link>
  );
}

function DesktopNavigation({ currentPath }: { currentPath: string }) {
  return (
    <nav className="hidden flex-grow items-center gap-2 pl-6 md:flex lg:gap-4 lg:pl-12">
      <DesktopNavigationLink isCurrentPage={currentPath === "/"} href="/">
        Bake
      </DesktopNavigationLink>
      {/* <DesktopNavigationLink
        isCurrentPage={currentPath === "/dashboard/"}
        href="/dashboard/"
        rel="prefetch"
      >
        Dashboard
      </DesktopNavigationLink> */}
    </nav>
  );
}

export default DesktopNavigation;
