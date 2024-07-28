import { BREAD_GNOSIS_ABI } from "@/abi";
import { BREAD_ADDRESS } from "@/constants";
import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import { useContractRead } from "wagmi";

export default function useClaimableYield() {
  const { data: yieldData, status } = useContractRead({
    address: BREAD_ADDRESS,
    abi: BREAD_GNOSIS_ABI,
    functionName: "yieldAccrued",
    watch: true,
    cacheTime: 1_000,
  });

  const [claimable, setClaimable] = useState<null | string>(null);

  useEffect(() => {
    setClaimable(
      yieldData ? formatUnits(yieldData as bigint, 18).toString() : null
    );
  }, [yieldData]);

  return { claimable, status };
}
