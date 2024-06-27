import { DISBURSER_ABI } from "@/abi";
import config from "@/chainConfig";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { TConnectedUserState } from "../core/hooks/useConnectedUser";
import { formatUnits } from "viem";
import { CycleLengthState, useCycleLength } from "./useCycleLength";

type UserVotingPowerState =
  | {
      status: "ACTUAL";
      value: number;
    }
  | {
      status: "NOMINAL";
      value: number;
    };

export function useUserVotingPower(
  user: TConnectedUserState,
  cycleLength: CycleLengthState
) {
  const [userVotingPower, setUserVotingPower] = useState<number | null>(null);

  const {
    data: currentVotingPowerData,
    status: currentVotingPowerStatus,
    error: currentVotingPowerError,
  } = useContractRead({
    enabled: user.status === "CONNECTED",
    address: config[100].DISBURSER.address,
    abi: DISBURSER_ABI,
    functionName: "getCurrentVotingPower",
    args: [user.status === "CONNECTED" ? user.address : ""],
  });

  useEffect(() => {
    if (currentVotingPowerStatus === "error" && currentVotingPowerError) {
      console.log({ currentVotingPowerError });
    }
    if (
      currentVotingPowerStatus === "success" &&
      currentVotingPowerData !== null &&
      cycleLength.status === "SUCCESS"
    ) {
      console.log({
        vp: Number(formatUnits(currentVotingPowerData as bigint, 18)),
      });
      const vp = Number(formatUnits(currentVotingPowerData as bigint, 18));
      setUserVotingPower(vp / cycleLength.data);
    }
  }, [
    currentVotingPowerStatus,
    currentVotingPowerData,
    currentVotingPowerError,
    cycleLength,
  ]);

  return { userVotingPower };
}
