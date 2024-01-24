import { ReactNode } from "react";

export function PanelHeader({ children }: { children: ReactNode }) {
  return <div className="mb-6 sm:mb-8">{children}</div>;
}

export function PanelContent({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-start pb-2 justify-between">
      {children}
    </div>
  );
}

export function PanelTokenRow({ children }: { children: ReactNode }) {
  return (
    <div className="flex w-full items-center gap-2 sm:gap-4">{children}</div>
  );
}

export function PanelBalanceRow({ children }: { children: ReactNode }) {
  return <div className="w-full flex justify-end">{children}</div>;
}

type TBalanceProps = {
  children: ReactNode;
  onClick: () => void;
};

export function PanelBalanceButton({ onClick, children }: TBalanceProps) {
  return (
    <button
      type="button"
      className="pb-3 text-xs hover:text-white hover:underline sm:text-sm"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export function PanelBalance({ children }: { children: ReactNode }) {
  return <span className="inline-block pb-3 text-sm">{children}</span>;
}

export function PanelContainer({ children }: { children: ReactNode }) {
  return (
    <div className="w-full p-2 sm:px-8 sm:py-6 md:px-6  text-gray-300 bg-breadgray-grey300 rounded ">
      {children}
    </div>
  );
}

export function PanelLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-sm text-neutral-400 inline-block">{children}</span>
  );
}

export function TokenLabelContainer({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-full bg-[#343434] px-1.5 py-0.5 pr-3 flex items-center sm:text-xl w-auto">
      {children}
    </div>
  );
}

export function TokenLabelText({ children }: { children: ReactNode }) {
  return <span className="ml-4 font-medium text-xl">{children}</span>;
}

export function TokenBalanceContainer({ children }: { children: ReactNode }) {
  return <div className="h-8 flex items-center justify-end">{children}</div>;
}

export function TokenBalanceText({ children }: { children: ReactNode }) {
  return (
    <div className="p-2 font-medium text-neutral-400 text-xs sm:text-[0.85rem] text-right">
      {children}
    </div>
  );
}
