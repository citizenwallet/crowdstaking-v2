import { useEffect, useState } from "react";
import { useContractRead, useNetwork } from "wagmi";

import { DISBURSER_ABI } from "@/abi";
import { getConfig } from "@/chainConfig";

export function useMinRequiredVotingPower() {
  const [minRequiredVotingPower, setMinRequiredVotingPower] = useState<
    bigint | null
  >(null);

  const { chain: activeChain } = useNetwork();
  const config = activeChain ? getConfig(activeChain.id) : getConfig("DEFAULT");
  const distributorAddress = config.DISBURSER.address;

  const {
    data: minRequiredVotingPowerData,
    status: minRequiredVotingPowerStatus,
  } = useContractRead({
    address: distributorAddress,
    abi: DISBURSER_ABI,
    functionName: "minRequiredVotingPower",
    watch: true,
  });

  useEffect(() => {
    if (
      minRequiredVotingPowerStatus === "success" &&
      minRequiredVotingPowerData
    ) {
      setMinRequiredVotingPower(minRequiredVotingPowerData as bigint);
    }
  }, [minRequiredVotingPowerStatus, minRequiredVotingPowerData]);

  return { minRequiredVotingPower };
}
