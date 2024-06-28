import { useEffect, useState } from "react";
import { TConnectedUserState } from "../core/hooks/useConnectedUser";
import { useCurrentVotes } from "./useCurrentVotes";

export function useCastVote(
  user: TConnectedUserState,
  lastClaimedBlockNumber: bigint | null
) {
  const [castVote, setCastVote] = useState<null | Array<number>>(null);

  const userAddress = user.status === "CONNECTED" ? user.address : "";

  const { data: votesData } = useCurrentVotes(lastClaimedBlockNumber);

  useEffect(() => {
    if (votesData) {
      const userVote = votesData.find((vote) => vote.account === userAddress);
      setCastVote(userVote?.points || null);
    }
  }, [votesData, userAddress]);

  return { castVote };
}
