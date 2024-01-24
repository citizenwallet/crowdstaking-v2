import type { ReactNode } from "react";
import { Close as DialogPrimitiveClose } from "@radix-ui/react-dialog";

import CloseIcon from "../Icons/CloseIcon";
import { TTransactionStatus } from "../../context/TransactionsContext/TransactionsReducer";
import { formatBalance } from "../../util/formatter";

const modalHeadingText: {
  [key in TTransactionStatus]: string;
} = {
  PREPARED: "Confirm Transaction",
  SUBMITTED: "Transaction Submitted",
  CONFIRMED: "Transaction Confirmed",
  REVERTED: "Transaction Reverted",
};

export function ModalContainer({
  txStatus,
  children,
}: {
  txStatus: TTransactionStatus;
  children: ReactNode;
}) {
  return (
    <div className="w-full max-w-90vw max-h-90vh fixed top-1/2 left-0 md:left-1/2 md:-translate-x-1/2 -translate-y-1/2 p-2 flex justify-center items-center">
      <section className="flex flex-col items-start rounded bg-opacity-100 p-4 md:p-8 bg-breadgray-charcoal relative">
        <DialogPrimitiveClose className="absolute top-0 right-0 w-8 h-8 p-2">
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
