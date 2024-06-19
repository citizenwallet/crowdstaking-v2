import { DISBURSER_ABI } from "@/abi";
import config from "@/chainConfig";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { TConnectedUserState } from "../core/hooks/useConnectedUser";
import { formatUnits } from "viem";

export function useUserVotingPower(user: TConnectedUserState) {
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
      currentVotingPowerData !== null
    ) {
      setUserVotingPower(
        Number(formatUnits(currentVotingPowerData as bigint, 18))
      );
    }
  }, [
    currentVotingPowerStatus,
    currentVotingPowerData,
    currentVotingPowerError,
  ]);

  return { userVotingPower };
}
