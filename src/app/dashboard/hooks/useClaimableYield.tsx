import { BREAD_POLYGON_ABI } from "@/abi";
import { BREAD_ADDRESS } from "@/constants";
import { useEffect, useMemo, useState } from "react";
import { formatUnits } from "viem";
import { useContractRead } from "wagmi";

export default function useClaimableYield() {
  const { data: yieldData, status } = useContractRead({
    address: BREAD_ADDRESS,
    abi: BREAD_POLYGON_ABI.abi,
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

  // const claimable = useMemo(() => {
  //   console.log({ yieldData });
  //   return ;
  // }, [yieldData]);

  return { claimable, status };
}
