import { DISBURSER_ABI } from "@/abi";
import config from "@/chainConfig";
import { useEffect, useState } from "react";
import { Hex } from "viem";
import { useContractRead, useNetwork } from "wagmi";

export type CurrentVotingDistributionState =
  | CurrentVotingDistributionLoading
  | CurrentVotingDistributionSuccess
  | CurrentVotingDistributionError;

export type CurrentVotingDistributionLoading = {
  status: "LOADING";
};
export type CurrentVotingDistributionSuccess = {
  status: "SUCCESS";
  data: [Hex[], number[]];
};
export type CurrentVotingDistributionError = {
  status: "ERROR";
};

export function useCurrentVotingDistribution() {
  const [currentVotingDistribution, setCurrentVotingDistribution] =
    useState<CurrentVotingDistributionState>({
      status: "LOADING",
    });

  const { chain: activeChain } = useNetwork();
  const distriubutorAddress = activeChain
    ? config[activeChain.id].DISBURSER.address
    : config["DEFAULT"].DISBURSER.address;

  const {
    data: currentVotingDistributionData,
    status: currentVotingDistributionStatus,
    error: currentVotingDistributionError,
  } = useContractRead({
    address: distriubutorAddress,
    abi: DISBURSER_ABI,
    functionName: "getCurrentVotingDistribution",
    watch: true,
    enabled: distriubutorAddress !== "0x",
  });

  useEffect(() => {
    if (
      currentVotingDistributionStatus === "success" &&
      currentVotingDistributionData
    ) {
      const [accounts, points] = currentVotingDistributionData as [
        Hex[],
        bigint[]
      ];

      const parsedPoints = points.map((bigPoints) => Number(bigPoints));

      setCurrentVotingDistribution({
        status: "SUCCESS",
        data: [accounts, parsedPoints],
      });
      return;
    }
    if (
      currentVotingDistributionStatus === "error" &&
      currentVotingDistributionError
    ) {
      console.log({ error: currentVotingDistributionError });
      setCurrentVotingDistribution({
        status: "ERROR",
      });
    }
  }, [
    currentVotingDistributionStatus,
    currentVotingDistributionData,
    currentVotingDistributionError,
  ]);

  return { currentVotingDistribution };
}
