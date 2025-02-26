import clsx from "clsx";
import { ColorToggle } from "@/app/core/components/Header/ColorToggle";
import CloseIcon from "@/app/core/components/Icons/CloseIcon";
import Overlay from "@/app/core/components/Overlay";
import MobileWalletDisplay from "./MobileWalletDisplay";
import { MobileNavigation } from "./MobileNavigation";

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
          "fixed overflow-y-scroll items-end right-0 top-0 z-50 flex h-screen w-auto transform flex-col gap-4 px-4 pl-12 pt-4 pb-16 transition-transform md:hidden",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <button
          onClick={() => handleNavToggle()}
          className="z-[60] h-8 w-8 text-neutral-600 md:hidden"
        >
          <CloseIcon />
        </button>
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
