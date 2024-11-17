import { DISTRIBUTOR_ABI } from "@/abi";
import { getConfig } from "@/chainConfig";
import { useContractRead, useNetwork } from "wagmi";

export function usePreviousCycleStartingBlock() {
  const { chain: activeChain } = useNetwork();
  const config = activeChain ? getConfig(activeChain.id) : getConfig("DEFAULT");

  console.log("distributor address: ", config.DISBURSER.address);

  return useContractRead({
    address: config.DISBURSER.address,
    abi: DISTRIBUTOR_ABI,
    functionName: "previousCycleStartingBlock",
    enabled: true,
  });
}
