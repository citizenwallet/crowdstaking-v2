import { DISTRIBUTOR_ABI } from "@/abi";
import { getConfig } from "@/chainConfig";
import { useContractRead, useNetwork } from "wagmi";
import { useLastClaimedBlockNumber } from "../useLastClaimedBlockNumber";
import { usePreviousCycleStartingBlock } from "../usePreviousCycleStartingBlock";
import { Hex } from "viem";

export function useCurrentVotingPower(account: Hex, tokenAddress: Hex) {
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
      tokenAddress,
      previousCycleStartingBlockData,
      lastClaimedBlocknumber,
      account,
    ],
    enabled:
      lastClaimedBlocknumber !== null &&
      previousCycleStartingBlockData !== null,
  });
}
