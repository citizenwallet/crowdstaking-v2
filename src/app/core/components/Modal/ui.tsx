import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Dialog as DialogContent } from "@radix-ui/react-dialog";

export function Container({
  children,
}: {
  children: ReactNode;
  handleClick: () => void;
}) {
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-full p-2 w-full">
      <section className="flex flex-col items-start rounded bg-breadgray-og-dark bg-opacity-100 px-6 py-14 sm:px-8 md:p-16 md:px-12 border-2 border-breadgray-burnt">
        {children}
      </section>
    </div>
  );
}

export function CloseModalButton({ handleClick }: { handleClick: () => void }) {
  return (
    <button
      type="button"
      className=" absolute right-0 top-0 p-4 text-sm  text-neutral-400 hover:text-neutral-200 md:text-base"
      onClick={handleClick}
    >
      X
    </button>
  );
}

export function Heading({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-2xl leading-normal text-neutral-300 md:text-center">
      {children}
    </h2>
  );
}

export function Message({ children }: { children: ReactNode }) {
  return (
    <p className="mt-12 text-sm leading-normal text-neutral-300 md:text-center">
      {children}
    </p>
  );
}
