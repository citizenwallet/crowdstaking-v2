import clsx from "clsx";
import { type ReactNode, useState } from "react";

import MobileMenu from "../MobileMenu";
import DesktopNavigation from "./DesktopNavigation";
import Logo from "./Logo";
import MobileNavigationToggle from "./MobileNavigationToggle";
import WalletDisplay from "./WalletDisplay";
import { WRAPPER_CLASSES } from "@/app/core/util";
import { usePathname, useRouter } from "next/navigation";
import { ColorToggle } from "./ColorToggle";

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
        <ColorToggle />
      </div>
      <WalletDisplay />
      <MobileNavigationToggle handleClick={handleNavToggle} />
    </Container>
  );
}

export default Header;
