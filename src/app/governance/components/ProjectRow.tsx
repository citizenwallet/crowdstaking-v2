import { ReactNode } from "react";
import { DecrementIcon, IncrementIcon } from "./Icons";
import { formatVotePercentage } from "@/app/core/util/formatter";
import { projectsMeta } from "@/app/projectsMeta";
import { useContractRead } from "wagmi";
import config from "@/chainConfig";
import { BREAD_GNOSIS_ABI } from "@/abi";
import { formatUnits } from "viem";

export function ProjectRow({
  address,
  children,
}: {
  address: `0x${string}`;
  children: ReactNode;
}) {
  const { data: breadBalanceData, status: breadBalanceStatus } =
    useContractRead({
      address: config[100].BREAD.address,
      abi: BREAD_GNOSIS_ABI,
      functionName: "balanceOf",
      args: [address],
      watch: true,
    });

  return (
    <div>
      <div className="flex flex-row rounded-lg p-4 justify-start gap-4 bg-breadgray-charcoal border border-breadgray-toast">
        <span className="rounded-full bg-neutral-700 w-8 h-8"></span>
        <span className="text-xl grow">{projectsMeta[address].name}</span>
        <div className="flex items-center gap-2 pr-2 border-2 border-breadgray-rye rounded-lg dark:bg-breadgray-burnt">
          {children}
        </div>
      </div>

      <div className="text-sm text-neutral-500">
        {breadBalanceData ? formatUnits(breadBalanceData as bigint, 18) : ""}{" "}
        BREAD
      </div>
    </div>
  );
}

export function VoteForm({
  address,
  value,
  updateValue,
  totalPoints,
}: {
  address: `0x${string}`;
  value: number;
  updateValue: (value: number, address: `0x${string}`) => void;
  totalPoints: number;
}) {
  function increment() {
    updateValue((value || 0) + 1, address);
  }

  function decrement() {
    updateValue(value - 1 >= 0 ? (value || 0) - 1 : value, address);
  }
  return (
    <>
      <InputButton onClick={decrement}>
        <div className="w-5 h-5">
          <DecrementIcon />
        </div>
      </InputButton>
      <input
        className={`min-w-14 max-w-0 p-1 dark:bg-breadgray-burnt border-neutral-300 text-2xl font-medium`}
        type="text"
        placeholder="00"
        inputMode="decimal"
        autoComplete="off"
        autoCorrect="off"
        pattern="^[0-9]*[.,]?[0-9]*$"
        minLength={1}
        maxLength={79}
        spellCheck="false"
        onChange={(event) => {
          updateValue(
            event.target.value ? parseInt(event.target.value) : 0,
            address
          );
        }}
        value={value === null ? "" : value}
      />
      <InputButton onClick={increment}>
        <div className="w-5 h-5">
          <IncrementIcon />
        </div>
      </InputButton>
      <div>
        {formatVotePercentage(value ? (value / totalPoints) * 100 : 0)}%
      </div>
    </>
  );
}

function InputButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button className="p-2" onClick={onClick}>
      {children}
    </button>
  );
}

export function VoteDisplay({
  points,
  percentage,
}: {
  points: number;
  percentage: number;
}) {
  return (
    <div>
      <div className="text-2xl font-medium">{points}</div>
      <div className="text-sm font-medium">{percentage}%</div>
    </div>
  );
}
