import { useEffect, useState } from "react";
import { TConnectedUserState } from "../core/hooks/useConnectedUser";
import { ParsedVote, useCurrentVotes } from "./useCurrentVotes";

export function useCastVote(
  user: TConnectedUserState,
  lastClaimedBlockNumber: bigint | null
) {
  const [castVote, setCastVote] = useState<null | Array<number>>(null);

  const userAddress = user.status === "CONNECTED" ? user.address : "";

  const { data: votesData } = useCurrentVotes(lastClaimedBlockNumber);

  useEffect(() => {
    if (votesData) {
      const mostRecentVote = votesData.reduce<null | ParsedVote>(
        (acc, vote) => {
          if (vote.account !== userAddress) return acc;
          if (!acc) return vote;
          if ((acc.blockTimestamp = vote.blockTimestamp)) return vote;
          return vote.blockTimestamp > acc.blockTimestamp ? vote : acc;
        },
        null
      );
      setCastVote(mostRecentVote ? mostRecentVote.points : null);
    }
  }, [votesData, userAddress]);

  return { castVote };
}
