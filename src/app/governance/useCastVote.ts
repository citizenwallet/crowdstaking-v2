import { DISBURSER_ABI } from "@/abi";
import config from "@/chainConfig";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { TConnectedUserState } from "../core/hooks/useConnectedUser";
import { formatUnits } from "viem";

export function useCastVote(user: TConnectedUserState) {
  const [castVote, setCastVote] = useState<null | Array<number>>(null);

  const userAddress = user.status === "CONNECTED" ? user.address : "";

  const { data: voteCastedData, status: voteCastedStatus } = useContractRead({
    address: config[100].DISBURSER.address,
    abi: DISBURSER_ABI,
    functionName: "currentVoteCast",
    args: [userAddress],
    enabled: !!userAddress,
    watch: true,
  });

  useEffect(() => {
    if (voteCastedStatus === "success" && voteCastedData) {
      const voteArray = voteCastedData as Array<bigint>;
      if (voteArray.length === 0) {
        setCastVote([]);
        return;
      }

      setCastVote(voteArray.map((value) => parseInt(formatUnits(value, 0))));
    }
  }, [voteCastedData, voteCastedStatus]);

  return { castVote };
}
