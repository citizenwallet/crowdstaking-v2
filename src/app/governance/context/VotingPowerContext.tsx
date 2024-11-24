import { multicall } from "@wagmi/core";

import {
  TUserConnected,
  useConnectedUser,
} from "@/app/core/hooks/useConnectedUser";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQuery } from "wagmi";
import { getConfig } from "@/chainConfig";
import { DISTRIBUTOR_ABI } from "@/abi";
import { useLastClaimedBlockNumber } from "../useLastClaimedBlockNumber";
import { usePreviousCycleStartingBlock } from "../usePreviousCycleStartingBlock";

type VpTokenLoading = {
  status: "loading";
};

type VpTokenError = {
  status: "error";
};

type VpTokenSuccess = {
  status: "success";
  value: bigint;
};

type TVotingPowerState = null | {
  bread: VpTokenLoading | VpTokenSuccess | VpTokenError;
  butteredBread: VpTokenLoading | VpTokenSuccess | VpTokenError;
};

const VotingPowerContext = createContext<TVotingPowerState>(null);

function VotingPowerProvider({ children }: { children: ReactNode }) {
  const { user } = useConnectedUser();

  const { lastClaimedBlocknumber } = useLastClaimedBlockNumber();
  const { data: previousCycleStartingBlockData } =
    usePreviousCycleStartingBlock();

  if (
    user.status === "CONNECTED" &&
    previousCycleStartingBlockData &&
    lastClaimedBlocknumber
  ) {
    return (
      <ProviderWithUser
        user={user}
        previousCycleStartingBlock={previousCycleStartingBlockData}
        lastClaimedBlocknumber={lastClaimedBlocknumber}
      >
        {children}
      </ProviderWithUser>
    );
  }

  return (
    <VotingPowerContext.Provider value={null}>
      {children}
    </VotingPowerContext.Provider>
  );
}

function useVotingPower() {
  const context = useContext(VotingPowerContext);
  if (context === undefined) {
    throw new Error("useVotingPower must be used within a VotingPowerProvider");
  }
  return context;
}

function ProviderWithUser({
  user,
  previousCycleStartingBlock,
  lastClaimedBlocknumber,

  children,
}: {
  user: TUserConnected;
  previousCycleStartingBlock: bigint;
  lastClaimedBlocknumber: bigint;

  children: ReactNode;
}) {
  const [votingPowerState, setVotingPowerState] = useState<TVotingPowerState>({
    bread: { status: "loading" },
    butteredBread: { status: "loading" },
  });

  const config = getConfig(user.chain.id);

  const { data, status, error } = useQuery(["vpMulticall"], async () => {
    return await multicall({
      contracts: [
        {
          address: config.DISBURSER.address,
          abi: DISTRIBUTOR_ABI,
          functionName: "getVotingPowerForPeriod",
          args: [
            config.BREAD.address,
            previousCycleStartingBlock,
            lastClaimedBlocknumber,
            user.address,
          ],
        },
        {
          address: config.DISBURSER.address,
          abi: DISTRIBUTOR_ABI,
          functionName: "getVotingPowerForPeriod",
          args: [
            config.BUTTERED_BREAD.address,
            previousCycleStartingBlock,
            lastClaimedBlocknumber,
            user.address,
          ],
        },
      ],
    });
  });

  useEffect(() => {
    if (status === "error") {
      setVotingPowerState(() => ({
        bread: { status: "error" },
        butteredBread: { status: "error" },
      }));
      return;
    }
    if (status === "success" && data && data[0].result && data[1].result) {
      const cycleLength = lastClaimedBlocknumber - previousCycleStartingBlock;
      const breadResult = data[0].result / cycleLength;
      const butteredBreadResult = data[1].result / cycleLength;

      setVotingPowerState(() => ({
        bread: { status: "success", value: breadResult },
        butteredBread: { status: "success", value: butteredBreadResult },
      }));
    }
  }, [data, status, error, lastClaimedBlocknumber, previousCycleStartingBlock]);

  return (
    <VotingPowerContext.Provider value={votingPowerState}>
      {children}
    </VotingPowerContext.Provider>
  );
}

export { VotingPowerProvider, useVotingPower };
