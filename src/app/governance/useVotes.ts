import config from "@/chainConfig";
import { viemClient } from "../core/viemClient";
import { DISBURSER_ABI } from "@/abi";
import { useQuery } from "react-query";
import { fromHex } from "viem";

type VoteLogData = {
  blockTimestamp: `0x${string}`;
  args: {
    holder: `0x${string}`;
    percentages: Array<bigint>;
    projects: Array<`0x${string}`>;
  };
};

export function useVotes(fromBlock: bigint | null) {
  const { data } = useQuery({
    queryKey: "getLastClaimedBlockNumber",
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

      // console.log(logs[0]);
      console.log({ logs });

      const parsed = (logs as unknown as Array<VoteLogData>).map((log) => {
        console.log(log.args.percentages.map((p) => p.toString()));
      });

      console.log({ parsed });

      // const timestamp = fromHex((logs[0] as any).blockTimestamp, "number");

      // console.log("raw timestamp: ", timestamp);
      // console.log(
      //   "converted timestamp: ",
      //   timestamp,
      //   new Date(timestamp * 1000).toISOString()
      // );

      // const vote = {
      //   account: "",
      //   timestamp: 123,
      // };

      return null;
    },
  });

  return { data };
}

function parseVoteLog() {
  // const vote = {
  //   account: "",
  //   timestamp: 123,
  // };
}
