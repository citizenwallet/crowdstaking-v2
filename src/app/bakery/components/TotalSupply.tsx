"use client";
import { ERC20_ABI } from "@/abi";
import Elipsis from "@/app/core/components/Elipsis";
import { formatSupply } from "@/app/core/util/formatter";
import { ReactNode } from "react";
import { formatUnits } from "viem";
import { useContractRead } from "wagmi";

export function TotalSupply() {
  const { data, status } = useContractRead({
    address: "0xa555d5344f6FB6c65da19e403Cb4c1eC4a1a5Ee3",
    abi: ERC20_ABI,
    functionName: "totalSupply",
    args: [],
    watch: true,
  });

  console.log({ data });

  return (
    <div className="flex justify-center">
      <div className="flex gap-2 p-2 bg-breadgray-charcoal rounded">
        <span className="text-xl font-semibold">
          {data ? (
            formatSupply(parseInt(formatUnits(BigInt(data as string), 18)))
          ) : (
            <Elipsis />
          )}
        </span>
        <GradientText>$BREAD</GradientText>
        <span className="font-bold text-xl">strong</span>
      </div>
    </div>
  );
}

function GradientText({ children }: { children: ReactNode }) {
  return (
    <div className="font-bold text-xl supply-text-gradient">{children}</div>
  );
}
