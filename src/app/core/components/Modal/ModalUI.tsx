import type { ReactNode } from "react";
import CloseIcon from "../Icons/CloseIcon";
import { TTransactionHash } from "../../context/TransactionsContext/TransactionsReducer";
import { balanceFormatter, formatAddress } from "../../util/formatter";

export function ModalContainer({ children }: { children: ReactNode }) {
  return (
    <div className="max-w-90vw max-h-90vh fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 flex justify-center items-center">
      <section className="flex flex-col items-start rounded bg-opacity-100 p-4 md:p-8 bg-breadgray-charcoal relative">
        {children}
      </section>
    </div>
  );
}

export function CloseModalButton() {
  return (
    <button
      type="button"
      className=" absolute right-0 top-0 p-4 text-sm  text-neutral-400 hover:text-neutral-200 md:text-base"
    >
      <CloseIcon />
    </button>
  );
}

export function ModalHeading({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex flex-row border-b-[0.075rem] border-b-breadpink-shaded">
      <h2 className="text-2xl px-2 pb-4 leading-normal text-breadgray-light-grey md:text-center font-medium">
        {children}
      </h2>
      <div className="w-16 h-full"> </div>
    </div>
  );
}

export function ModalMessage({ children }: { children: ReactNode }) {
  return (
    <p className="py-6 leading-normal text-breadgray-light-grey md:text-center">
      {children}
    </p>
  );
}

export function TransactionLink({ hash }: { hash: TTransactionHash }) {
  return (
    <a
      href={`https://gnosisscan.io/tx/${hash}`}
      target="_blank"
      rel="noopener noreferer"
    >
      view on explorer {"->"}
    </a>
  );
}

export function TransactionValue({ value }: { value: string }) {
  return (
    <div
      className="w-full text-center text-3xl font-medium pt-6"
      title={parseFloat(value).toString()}
    >
      {balanceFormatter.format(parseFloat(value))}
    </div>
  );
}
