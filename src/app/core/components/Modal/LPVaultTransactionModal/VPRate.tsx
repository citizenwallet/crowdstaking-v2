import { formatUnits } from "viem";
import { FistIcon } from "../../Icons/FistIcon";
import clsx from "clsx";
import { ReactNode } from "react";
import { formatBalance } from "@/app/core/util/formatter";

export function LockVPRate({
  value,
  status,
}: {
  value: bigint;
  status: string;
}) {
  const tokenAmount = formatBalance(Number(formatUnits(value, 18)), 0);
  const vpAmount = tokenAmount;

  return (
    <VPRateGrid>
      {status !== "success" && (
        <>
          <LpLabel />
          {/* empty div for column spacing */}
          <div className="w-12"></div>
          <VpLabel />
        </>
      )}
      <ValueDisplay>
        <PillContainer>
          <WXDaiBreadIcon />
          <ValueText>{tokenAmount}</ValueText>
        </PillContainer>
      </ValueDisplay>
      <EqualityIcon />
      <ValueDisplay>
        <PillContainer>
          <FistIcon />
          <ValueText>{vpAmount}</ValueText>
        </PillContainer>
      </ValueDisplay>
    </VPRateGrid>
  );
}

export function UnlockVPRate({ value }: { value: bigint }) {
  const tokenAmount = formatBalance(Number(formatUnits(value, 18)), 0);
  const vpAmount = tokenAmount;

  return (
    <VPRateGrid>
      <VpLabel />
      {/* empty div for column spacing */}
      <div className="w-12"></div>
      <LpLabel />
      <ValueDisplay>
        <PillContainer>
          <FistIcon />
          <ValueText>{vpAmount}</ValueText>
        </PillContainer>
      </ValueDisplay>
      <EqualityIcon />
      <ValueDisplay>
        <PillContainer>
          <WXDaiBreadIcon />
          <ValueText>{tokenAmount}</ValueText>
        </PillContainer>
      </ValueDisplay>
    </VPRateGrid>
  );
}

function VPRateGrid({ children }: { children: ReactNode }) {
  return (
    <div className="grid grid-cols-3 gap-2 items-center justify-center">
      {children}
    </div>
  );
}
function TextLabel({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-medium dark:text-breadgray-grey text-breadgray-natural text-breadgray-grey">
      {children}
    </p>
  );
}

function LpLabel() {
  return (
    <div className="col-span-1 row-span-1 row-start-1 justify-center flex">
      <TextLabel>Locked LP tokens</TextLabel>
    </div>
  );
}

function VpLabel() {
  return (
    <div className="col-span-1 row-span-1 col-start-3 row-start-1 justify-center flex">
      <TextLabel>Voting Power</TextLabel>
    </div>
  );
}

function EqualityIcon() {
  return (
    <div className="m-auto">
      <div className="mx-auto text-breadgray-grey text-3xl">=</div>
    </div>
  );
}

function ValueDisplay({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex w-full  gap-2 items-center">{children}</div>
  );
}

export function WXDaiBreadIcon() {
  return (
    <div>
      <img
        src="/wxdai_bread_lp_icon.png"
        alt="wxdai bread lp token icon"
        className="block dark:hidden"
      />
      <img
        src="/wxdai_bread_lp_icon_dark.png"
        alt="wxdai bread lp token icon"
        className="hidden dark:block"
      />
    </div>
  );
}

export function PillContainer({ children }: { children: ReactNode }) {
  return (
    <div className="dark:bg-breadgray-burnt rounded-full w-full flex gap-2 items-center px-2 py-1">
      {children}
    </div>
  );
}

export function ValueText({ children }: { children: ReactNode }) {
  return (
    <div className="text-xl m-auto font-semibold dark:text-breadgray-ultra-white">
      {children}
    </div>
  );
}
