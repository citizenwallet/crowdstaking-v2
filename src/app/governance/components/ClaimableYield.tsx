"use client";
import { BREAD_GNOSIS_ABI } from "@/abi";
import { BreadIcon } from "@/app/core/components/Icons/TokenIcons";
import { formatBalance } from "@/app/core/util/formatter";
import config from "@/chainConfig";
import { formatUnits } from "viem";
import { useContractRead } from "wagmi";

export function ClaimableYield() {
  const { data: yieldAccruedData } = useContractRead({
    address: config[100].BREAD.address,
    abi: BREAD_GNOSIS_ABI,
    functionName: "yieldAccrued",
    watch: true,
  });

  return (
    <div className="grid grid-cols-1 gap-2 md:justify-items-end">
      {/* <div className="px-6 py-4 rounded-lg bg-breadgray-charcoal border-2 border-breadgray-burnt"> */}
      <h4 className="text-lg font-bold">Amount to Distribute</h4>
      <div className="flex gap-4 items-center md:justify-end">
        <BreadIcon />
        {yieldAccruedData ? (
          <span className="text-3xl font-medium">
            {formatBalance(
              parseFloat(formatUnits(yieldAccruedData as bigint, 18)),
              2
            )}
          </span>
        ) : (
          ""
        )}
        {/* </div> */}
      </div>
    </div>
  );
}
