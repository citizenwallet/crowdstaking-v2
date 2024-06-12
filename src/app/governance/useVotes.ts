import config from "@/chainConfig";
import { viemClient } from "../core/viemClient";
import { DISBURSER_ABI } from "@/abi";
import { useQuery } from "react-query";
import { formatUnits, fromHex } from "viem";

type VoteLogData = {
  blockTimestamp: `0x${string}`;
  args: {
    holder: `0x${string}`;
    percentages: Array<bigint>;
    projects: Array<`0x${string}`>;
  };
};

export function useVotes(fromBlock: bigint | null) {
  return useQuery({
    queryKey: "getVotesForCurrentRound",
    refetchInterval: 500,
    enabled: !!fromBlock,
    queryFn: async () => {
      const logs = await viemClient.getContractEvents({
        address: config[100].DISBURSER.address,
        abi: DISBURSER_ABI,
        eventName: "BreadHolderVoted",
        fromBlock: fromBlock || BigInt(0),
        toBlock: "latest",
      });

      const parsed = (logs as unknown as Array<VoteLogData>).map(parseVoteLog);
      return parsed;
    },
  });
}

export type ParsedVote = {
  account: `0x${string}`;
  blockTimestamp: number;
  permyriadDistribution: number[];
  projects: `0x${string}`[];
};

function parseVoteLog(log: VoteLogData): ParsedVote {
  return {
    account: log.args.holder,
    blockTimestamp: fromHex(log.blockTimestamp, "number") * 1000,
    permyriadDistribution: pointsToPermyraid(
      log.args.percentages.map((b) => parseInt(formatUnits(b, 0)))
    ),
    projects: log.args.projects,
  };
}

function pointsToPermyraid(points: Array<number>) {
  const total = points.reduce((acc, num) => acc + num, 0);
  return points.map((p) => Math.floor((p * 10000) / total));
}
