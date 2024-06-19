import { DISBURSER_ABI } from "@/abi";
import config from "@/chainConfig";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";

export function useCurrentVotingDistribution() {
  const [currentVotingDistribution, setCurrentVotingDistribution] = useState<
    null | [`0x${string}`[], number[]]
  >(null);

  const {
    data: currentVotingDistributionData,
    status: currentVotingDistributionStatus,
  } = useContractRead({
    address: config[100].DISBURSER.address,
    abi: DISBURSER_ABI,
    functionName: "getCurrentVotingDistribution",
    watch: true,
  });

  useEffect(() => {
    if (
      currentVotingDistributionStatus === "success" &&
      currentVotingDistributionData
    ) {
      const [accounts, points] = currentVotingDistributionData as [
        `0x${string}`[],
        bigint[]
      ];

      const parsedPoints = points.map((bigPoints) => Number(bigPoints));

      setCurrentVotingDistribution([accounts, parsedPoints]);
    }
  }, [currentVotingDistributionStatus, currentVotingDistributionData]);

  return { currentVotingDistribution };
}
