import { DISBURSER_ABI } from "@/abi";
import config from "@/chainConfig";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";

export function useLastClaimedBlockNumber() {
  const [lastClaimedBlocknumber, setLastClaimedBlockNumber] = useState<
    bigint | null
  >(null);

  const {
    data: lastClaimedBlockNumberData,
    status: lastClaimedBlockNumberStatus,
  } = useContractRead({
    address: config[100].DISBURSER.address,
    abi: DISBURSER_ABI,
    functionName: "lastClaimedBlockNumber",
    watch: true,
  });

  useEffect(() => {
    if (
      lastClaimedBlockNumberStatus === "success" &&
      lastClaimedBlockNumberData
    ) {
      setLastClaimedBlockNumber(lastClaimedBlockNumberData as bigint);
    }
  }, [lastClaimedBlockNumberStatus, lastClaimedBlockNumberData]);

  return { lastClaimedBlocknumber };
}
