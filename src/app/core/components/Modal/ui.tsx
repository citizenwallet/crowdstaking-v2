import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Dialog as DialogContent } from "@radix-ui/react-dialog";
import CloseIcon from "../Icons/CloseIcon";

export function Container({
  children,
  closeModal,
}: {
  children: ReactNode;
  closeModal: () => void;
}) {
  return (
    <div
      onClick={closeModal}
      className="fixed top-0 left-0 h-screen w-screen p-4 flex justify-center items-center"
    >
      <section className="flex flex-col items-start rounded bg-opacity-100 p-4 md:p-8 bg-breadgray-charcoal relative">
        <div className="absolute top-0 right-0 pt-5 pr-3 md:p-8">
          <button className="fill-breadgray-light-grey w-6 h-6">
            <CloseIcon />
          </button>
        </div>
        {children}
      </section>
    </div>
  );
}

export function CloseModalButton({ closeModal }: { closeModal: () => void }) {
  return (
    <button
      type="button"
      className=" absolute right-0 top-0 p-4 text-sm  text-neutral-400 hover:text-neutral-200 md:text-base"
      onClick={closeModal}
    >
      X
    </button>
  );
}

export function Heading({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-row border-b-[0.075rem] border-b-breadpink-shaded">
      <h2 className="text-2xl px-2 pb-4 leading-normal text-breadgray-light-grey md:text-center font-medium">
        {children}
      </h2>
      <div className="w-16 h-full"> </div>
    </div>
  );
}

export function Message({ children }: { children: ReactNode }) {
  return (
    <p className="p-2 pt-12 leading-normal text-breadgray-light-grey md:text-center">
      {children}
    </p>
  );
}
