import clsx from "clsx";

import MobileWalletDisplay from "./MobileWalletDisplay";

import Overlay from "../Overlay";
import { MobileNavigation } from "./MobileNavigation";
import { ColorToggle } from "../Header/ColorToggle";

interface IProps {
  isOpen: boolean;
  handleNavToggle: () => void;
}

export function MobileMenu({ isOpen, handleNavToggle }: IProps) {
  return (
    <>
      <Overlay closeMenu={() => handleNavToggle()} isOpen={isOpen} />
      <section
        className={clsx(
          "fixed right-0 top-0 z-50 flex h-screen w-auto transform flex-col gap-4 px-4 pl-12 pt-16 transition-transform md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <MobileNavigation handleNavToggle={handleNavToggle} />
        <div className="flex justify-end">
          <ColorToggle />
        </div>
        <MobileWalletDisplay handleNavToggle={handleNavToggle} />
      </section>
    </>
  );
}
export default MobileMenu;
