import { BREAD_GNOSIS_ABI } from "@/abi";
import config from "@/chainConfig";
import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import { useContractRead } from "wagmi";

export function useClaimableYield() {
  const [claimableYield, setClaimableYield] = useState<number | null>(null);

  const { data, status, error } = useContractRead({
    address: config[100].BREAD.address,
    abi: BREAD_GNOSIS_ABI,
    functionName: "yieldAccrued",
    watch: true,
  });

  useEffect(() => {
    if (status === "success" && data) {
      setClaimableYield(parseFloat(formatUnits(data as bigint, 18)));
    }
    if (status === "error") {
      console.log(error);
    }
  }, [data, status, error, setClaimableYield]);

  return { claimableYield };
}
