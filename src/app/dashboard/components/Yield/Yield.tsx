import { useMemo } from "react";
import { formatUnits } from "viem";
import { useContractRead } from "wagmi";
import ClaimedYield from "./ClaimedYield";

import { BREAD_ADDRESS } from "../../../../constants";
import useClaimedYield from "../../hooks/useClaimedYield";
import ClaimYield from "./ClaimYield";
import ClaimableYield from "./ClaimableYield";
import { BREAD_GNOSIS_ABI } from "@/abi";
import useClaimableYield from "@/app/dashboard/hooks/useClaimableYield";

export const yieldFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 4,
  minimumIntegerDigits: 1,
  useGrouping: true,
});

export default function Yield() {
  const { data: claimedYieldData, isLoading } = useClaimedYield();

  return (
    <section className="grid grid-rows-3 pt-12">
      <ClaimedYield data={claimedYieldData} isLoading={isLoading} />
      <ClaimableYield />
      <ClaimYield />
    </section>
  );
}
