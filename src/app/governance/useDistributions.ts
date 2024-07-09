import { getPublicClient } from "@wagmi/core";

import { getConfig } from "@/chainConfig";
import { DISBURSER_ABI } from "@/abi";
import { useQuery } from "react-query";
import { useNetwork } from "wagmi";

export function useDistributions() {
  const { chain: activeChain } = useNetwork();
  const config = activeChain ? getConfig(activeChain.id) : getConfig("DEFAULT");
  const distributorAddress = config.DISBURSER.address;
  const publicClient = getPublicClient();

  return useQuery({
    queryKey: "getDistributions",
    refetchInterval: 1000,
    queryFn: async () => {
      const logs = await publicClient.getContractEvents({
        address: distributorAddress,
        abi: DISBURSER_ABI,
        // eventName: "YieldDistributed",
        fromBlock: BigInt(34695057),
        toBlock: "latest",
      });
      let arr: string[] = [];

      // logs.forEach((log) => {
      //   console.log({ log });
      //   if (!arr.includes((log as <{ eventName: string }).eventName)) {
      //     console.log("woo");
      //   }
      // });
      return logs;
    },
  });
}
