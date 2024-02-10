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
        isCurrentPage={pathname === "/dashboard"}
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
        "font-redhat hover:text-breadgray-light-grey text-breadgray-grey active:text-breadgray-violet flex items-center justify-end p-2 text-xl font-bold leading-none tracking-wider min-[810px]:px-4",
        isCurrentPage ? "text-breadgray-ultra-white" : "text-breadgray-grey"
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
}) {
  const { children, ...remainingProps } = props;
  return (
    <Link
      className={clsx(
        "font-redhat hover:text-breadgray-light-grey text-breadgray-grey active:text-breadgray-violet flex items-center justify-end p-2 text-xl font-bold leading-none tracking-wider min-[810px]:px-4"
      )}
      rel="noopener noreferrer"
      target="_blank"
      {...remainingProps}
    >
      {children}
    </Link>
  );
}
