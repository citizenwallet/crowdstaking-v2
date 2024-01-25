import type { ReactNode } from "react";
import { Close as DialogPrimitiveClose } from "@radix-ui/react-dialog";

import CloseIcon from "../Icons/CloseIcon";
import { formatBalance } from "../../util/formatter";

export function ModalContainer({ children }: { children: ReactNode }) {
  return (
    <div className="max-h-90vh fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 flex justify-center items-center">
      <section className="sm:w-[26rem] flex flex-col items-center rounded bg-opacity-100 p-4 bg-breadgray-charcoal relative">
        <DialogPrimitiveClose className="absolute top-0 right-0 w-10 h-10 p-3">
          <CloseIcon />
        </DialogPrimitiveClose>
        {children}
      </section>
    </div>
  );
}

export function ModalHeading({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex flex-row items-center justify-center border-b-[0.075rem] border-b-breadpink-shaded">
      <h2 className="text-2xl px-2 pb-3 leading-normal text-breadgray-light-grey font-medium">
        {children}
      </h2>
    </div>
  );
}

export function ModalContent({ children }: { children: ReactNode }) {
  return (
    <div className="px-2 pt-4 flex flex-col gap-2 items-center">{children}</div>
  );
}

export function ModalAdviceText({ children }: { children: ReactNode }) {
  return (
    <p className="max-w-xs text-lg leading-normal text-breadgray-light-grey text-center pt-4 pb-2">
      {children}
    </p>
  );
}

export function TransactionValue({ value }: { value: string }) {
  return (
    <div
      className="w-full text-center text-3xl font-medium"
      title={parseFloat(value).toString()}
    >
      {formatBalance(parseFloat(value), 2)}
    </div>
  );
}

export function ModalOverlay() {
  return (
    <div className="fixed top-0 bg-neutral-900 transition-opacity opacity-70 h-screen w-screen" />
  );
}

export function TransactionStatusSpinner() {
  return (
    <div className="py-5">
      <svg
        width="32"
        height="32"
        className="stroke-current text-breadpink-shaded"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="spinner_QPB9">
          <circle cx="12" cy="12" r="9.5" fill="none" strokeWidth="2"></circle>
        </g>
      </svg>
    </div>
  );
}

export function TransactionStatusCheck() {
  return (
    <div className="pt-3 pb-4">
      <svg
        width="44"
        height="33"
        viewBox="0 0 44 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M38 0.5H43.3334V5.83333H38V0.5ZM32.6667 11.1667V5.83333H38L38 11.1667H32.6667ZM27.3334 16.5V11.1667H32.6667V16.5H27.3334ZM22 21.8333H27.3334V16.5L22 16.5V21.8333ZM16.6667 27.1667H22V21.8333H16.6667L16.6667 27.1667ZM11.3334 27.1667V32.5H16.6667V27.1667H11.3334ZM6.00002 21.8333H11.3334V27.1667H6.00002V21.8333ZM6.00002 21.8333H0.666687V16.5H6.00002V21.8333Z"
          fill="#9EC958"
        />
      </svg>
    </div>
  );
}

export function TransactionStatusCross() {
  return (
    <div className="pt-3 pb-4">
      <svg
        width="32"
        height="33"
        viewBox="0 0 32 33"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0.5H4.57143V5.07014H9.14285V9.64145H4.57142V5.07131H0V0.5ZM4.57143 27.9285H0V32.4998H4.57143V27.9285ZM27.4286 27.9285H32V32.4998H27.4286V27.9285ZM13.7143 9.64306H9.14286V14.2144H13.7143L13.7143 18.7838H18.2857V14.2125H13.7143L13.7143 9.64306ZM22.8571 18.7861H18.2857V23.3574H22.8571L22.8571 27.9269H27.4286V23.3556H22.8571L22.8571 18.7861ZM22.8571 5.07014H27.4286L27.4286 0.5H32V5.07131H27.4286L27.4286 9.64145H22.8571V5.07014ZM18.2857 9.64306H22.8571V14.2144H18.2857V9.64306ZM13.7143 18.7861H9.14286L9.14286 23.3556H4.57143V27.9269H9.14286L9.14286 23.3574H13.7143V18.7861Z"
          fill="#D8745C"
        />
      </svg>
    </div>
  );
}
