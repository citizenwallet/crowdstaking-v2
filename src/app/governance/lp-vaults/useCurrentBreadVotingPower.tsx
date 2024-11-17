import { DISTRIBUTOR_ABI } from "@/abi";
import { getConfig } from "@/chainConfig";
import { useContractRead, useNetwork } from "wagmi";
import { useLastClaimedBlockNumber } from "../useLastClaimedBlockNumber";
import { usePreviousCycleStartingBlock } from "../usePreviousCycleStartingBlock";
import { Hex } from "viem";

export function useCurrentBreadVotingPower(account: Hex) {
  const { chain: activeChain } = useNetwork();
  const config = activeChain ? getConfig(activeChain.id) : getConfig("DEFAULT");

  const { lastClaimedBlocknumber } = useLastClaimedBlockNumber();
  const { data: previousCycleStartingBlockData } =
    usePreviousCycleStartingBlock();

  return useContractRead({
    address: config.DISBURSER.address,
    abi: DISTRIBUTOR_ABI,
    functionName: "getVotingPowerForPeriod",
    args: [
      config.BREAD.address,
      previousCycleStartingBlockData,
      lastClaimedBlocknumber,
      account,
    ],
    enabled:
      config.BREAD.address !== "0x" &&
      lastClaimedBlocknumber !== null &&
      previousCycleStartingBlockData !== null,
  });
}
