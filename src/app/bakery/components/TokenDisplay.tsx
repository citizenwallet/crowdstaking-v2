import type { ReactNode } from "react";

export function PanelHeader({ children }: { children: ReactNode }) {
  return <div className="mb-6 sm:mb-8">{children}</div>;
}

export function PanelContent({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-start pb-2 justify-between">{children}</div>
  );
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

export function FromPanelContainer({ children }: { children: ReactNode }) {
  return (
    <div className="w-full p-4 md:px-6  text-gray-300 sm:px-8 sm:py-6 bg-breadgray-grey300 rounded">
      {children}
    </div>
  );
}

export function ToPanelContainer({ children }: { children: ReactNode }) {
  return (
    <div className="w-full p-4 md:px-6  text-gray-300 sm:px-8 sm:py-6 bg-breadgray-grey300 rounded">
      {children}
    </div>
  );
}

export function PanelLabel({ children }: { children: ReactNode }) {
  return (
    <span className="text-sm text-neutral-600 inline-block">{children}</span>
  );
}
