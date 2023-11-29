import clsx from "clsx";
import { type ReactNode, useState } from "react";

import MobileMenu from "../MobileMenu";
import DesktopNavigation from "./DesktopNavigation";
import Logo from "./Logo";
import MobileNavigationToggle from "./MobileNavigationToggle";
import { WRAPPER_CLASSES } from "@/app/core/util";
import { usePathname } from "next/navigation";
import ConnectWallet from "../ConnectWallet";

function Container({ children }: { children: ReactNode }) {
  return (
    <header>
      <div className={clsx(WRAPPER_CLASSES, "flex justify-between")}>
        {children}
      </div>
    </header>
  );
}

function Header() {
  const currentPath = usePathname();
  const [isMobNavOpen, setIsMobNavOpen] = useState(false);

  const handleNavToggle = () => {
    setIsMobNavOpen(!isMobNavOpen);
  };

  return (
    <Container>
      <Logo />
      <DesktopNavigation currentPath={currentPath} />
      <MobileMenu isOpen={isMobNavOpen} handleNavToggle={handleNavToggle} />
      <div className="hidden md:block">
        <ConnectWallet variant="regular" />
      </div>
      <MobileNavigationToggle handleClick={handleNavToggle} />
    </Container>
  );
}

export default Header;
