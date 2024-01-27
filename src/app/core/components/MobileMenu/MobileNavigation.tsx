import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

interface IProps {
  handleNavToggle: () => void;
}

export function MobileNavigation({ handleNavToggle }: IProps) {
  const pathname = usePathname();
  return (
    <nav className="flex flex-col gap-4 justify-end">
      <MobileNavigationLink
        isCurrentPage={pathname === "/"}
        href="/"
        onClick={() => handleNavToggle()}
      >
        Bake
      </MobileNavigationLink>
      <MobileNavigationLink
        isCurrentPage={location.pathname === "/dashboard"}
        href="/dashboard"
        onClick={() => handleNavToggle()}
      >
        Dashboard
      </MobileNavigationLink>
      <MobileExternalNavigationLink
        href="https://breadchain.mirror.xyz/"
        onClick={handleNavToggle}
      >
        Blog
      </MobileExternalNavigationLink>
    </nav>
  );
}
export function MobileNavigationLink(props: {
  children: ReactNode;
  href: string;
  onClick: () => void;
  rel?: string;
  target?: string;
  isCurrentPage?: boolean;
}) {
  const { children, isCurrentPage, ...remainingProps } = props;
  return (
    <Link
      className={clsx(
        "font-redhat dark:hover:text-breadgray-light-grey text-breadgray-burnt hover:text-breadgray-charcoal active:text-breadgray-violet flex items-center justify-end p-2 text-xl font-bold leading-none tracking-wider min-[810px]:px-4",
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

export function MobileExternalNavigationLink(props: {
  children: ReactNode;
  href: string;
  onClick: () => void;
  isCurrentPage?: boolean;
}) {
  const { children, isCurrentPage, ...remainingProps } = props;
  return (
    <Link
      className={clsx(
        "font-redhat dark:hover:text-breadgray-light-grey text-breadgray-burnt hover:text-breadgray-charcoal active:text-breadgray-violet flex items-center justify-end p-2 text-xl font-bold leading-none tracking-wider min-[810px]:px-4",
        isCurrentPage
          ? "dark:text-breadgray-light-grey"
          : "dark:text-breadgray-grey"
      )}
      rel="noopener noreferrer"
      target="_blank"
      {...remainingProps}
    >
      {children}
    </Link>
  );
}
