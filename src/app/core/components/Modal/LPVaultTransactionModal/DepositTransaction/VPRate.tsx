import { formatUnits } from "viem";
import { FistIcon } from "../../../Icons/FistIcon";

export function VPRate({ value }: { value: bigint }) {
  const tokenAmount = formatUnits(value, 18);
  const vpAmount = tokenAmount;

  return (
    <div className="flex items-center gap-4">
      <div className="bg-breadgray-burnt rounded-full flex gap-2 items-center px-2 py-1">
        <img src="/wxdai_bread_lp_icon.png" alt="wxdai bread lp token icon" />
        <div className="text-xl font-semibold text-breadgray-ultra-white">
          {tokenAmount}
        </div>
      </div>

      <span className="text-2xl">=</span>
      <div className="bg-breadgray-burnt rounded-full flex gap-2 items-center px-2 py-1">
        <div className="size-6 rounded-full dark:bg-breadgray-toast">
          <FistIcon />
        </div>
        <div className="text-xl font-semibold text-breadgray-ultra-white">
          ~ {vpAmount}
        </div>
      </div>
    </div>
  );
}
