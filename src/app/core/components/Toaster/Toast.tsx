import clsx from "clsx";
import { LinkIcon } from "../Icons/LinkIcon";
import { ReactNode } from "react";

type TToastType = "SUBMITTED" | "CONFIRMED" | "REVERTED";

const toastMessages: {
  [K in TToastType]: string;
} = {
  SUBMITTED: "Transaction Submitted",
  CONFIRMED: "Transaction Confirmed",
  REVERTED: "Transaction Reverted",
};

export function Toast({
  toastType,
  explorerUrl,
}: {
  toastType: TToastType;
  explorerUrl: string;
}) {
  return (
    <li
      className={clsx(
        "rounded-xl border-2 p-6 flex flex-col gap-4 align-self bg-breadgray-burnt",
        toastType === "SUBMITTED" && "border-breadgray-rye",
        toastType === "CONFIRMED" && "border-status-success",
        toastType === "REVERTED" && "border-status-danger"
      )}
    >
      <div className="text-xl font-medium">{toastMessages[toastType]}</div>
      <a
        href={explorerUrl}
        target="_blank"
        className="flex flex-row gap-2 items-center text-breadpink-300 font-medium"
      >
        View on explorer
        <LinkIcon />
      </a>
    </li>
  );
}

export function ToastContainer({ children }: { children: ReactNode }) {
  return <ol className="max-w-64 flex flex-col items-end gap-2">{children}</ol>;
}
