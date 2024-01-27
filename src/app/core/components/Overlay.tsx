import clsx from "clsx";
import type { MouseEvent, ReactNode } from "react";

function Overlay({
  isOpen,
  children,
  closeMenu,
}: {
  isOpen: boolean;
  children?: ReactNode;
  closeMenu: () => void;
}) {
  function handleClick(event: MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    closeMenu();
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
    <div
      className={clsx(
        "fixed top-0 bottom-0 left-0 right-0 z-20 h-screen w-screen bg-neutral-900 bg-opacity-80 backdrop-blur-md transition-all md:hidden",
        isOpen ? "block" : "hidden"
      )}
      onClick={handleClick}
    >
      {children !== null && children}
    </div>
  );
}

export default Overlay;
