import clsx from "clsx";
import type { MouseEvent, ReactNode } from "react";

function Overlay({
  isOpen,
  closeMenu,
}: {
  isOpen: boolean;
  closeMenu: () => void;
}) {
  function handleClick(event: MouseEvent<HTMLDivElement>) {
    event.stopPropagation();
    closeMenu();
  }

  return (
    <div
      className={clsx(
        "fixed top-0 bottom-0 left-0 right-0 z-20 h-screen w-screen bg-neutral-900 backdrop-blur-md transition-all md:hidden",
        isOpen ? "block bg-opacity-80" : "bg-opacity-0 hidden"
      )}
      onClick={handleClick}
    >
      {/* <div
        className={clsx(
          "w-full h-full bg-neutral-900 bg-opacity-0 transition-all",
          isOpen ? "bg-opacity-80" : "bg-opacity-0"
        )}
      ></div> */}
    </div>
  );
}

export default Overlay;
