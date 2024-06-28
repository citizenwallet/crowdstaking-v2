import { useEffect, useState } from "react";
import { useContractRead, useNetwork } from "wagmi";

import { DISBURSER_ABI } from "@/abi";
import config from "@/chainConfig";

export function useLastClaimedBlockNumber() {
  const [lastClaimedBlocknumber, setLastClaimedBlockNumber] = useState<
    bigint | null
  >(null);

  const { chain: activeChain } = useNetwork();
  const distributorAddress = activeChain
    ? config[activeChain.id].DISBURSER.address
    : config["DEFAULT"].BREAD.address;

  const {
    data: lastClaimedBlockNumberData,
    status: lastClaimedBlockNumberStatus,
  } = useContractRead({
    address: distributorAddress,
    abi: DISBURSER_ABI,
    functionName: "lastClaimedBlockNumber",
    watch: true,
    enabled: distributorAddress !== "0x",
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
