import { DISBURSER_ABI } from "@/abi";
import { getConfig } from "@/chainConfig";
import { useEffect, useState } from "react";
import { useBlockNumber, useContractRead, useNetwork } from "wagmi";
import { add } from "date-fns";
import { CycleLengthState } from "./useCycleLength";

export type CycleEndDateState =
  | {
      status: "LOADING";
    }
  | {
      status: "SUCCESS";
      data: Date;
    }
  | {
      status: "ERROR";
    };

export function useCycleEndDate(cycleLength: CycleLengthState) {
  const [cycleEndDate, setCycleEndDate] = useState<CycleEndDateState>({
    status: "LOADING",
  });

  const { chain: activeChain } = useNetwork();
  const config = activeChain ? getConfig(activeChain.id) : getConfig("DEFAULT");
  const distributorAddress = config.DISBURSER.address;

  const {
    data: lastClaimedBlockNumberData,
    status: lastClaimedBlockNumberStatus,
  } = useContractRead({
    address: distributorAddress,
    abi: DISBURSER_ABI,
    functionName: "lastClaimedBlockNumber",
    watch: true,
  });

  const { data: currentBlockNumberData, status: currentBlockNumberStatus } =
    useBlockNumber();

  useEffect(() => {
    if (
      lastClaimedBlockNumberStatus === "error" ||
      currentBlockNumberStatus === "error" ||
      lastClaimedBlockNumberData ||
      cycleLength !== null
    ) {
    }
    if (
      lastClaimedBlockNumberStatus === "success" &&
      lastClaimedBlockNumberData &&
      cycleLength.status === "SUCCESS" &&
      currentBlockNumberStatus === "success" &&
      currentBlockNumberData
    ) {
      const cycleBlocksRemaining =
        Number(lastClaimedBlockNumberData) +
        cycleLength.data -
        Number(currentBlockNumberData);
      const cycleSecondsRemaining = cycleBlocksRemaining * 5;
      const date = add(new Date(), {
        seconds: cycleSecondsRemaining,
      });
      console.log(
        "cycle end date: ",
        date.toLocaleTimeString(),
        date.toLocaleDateString()
      );
      setCycleEndDate({
        status: "SUCCESS",
        data: date,
      });
    }
  }, [
    lastClaimedBlockNumberData,
    lastClaimedBlockNumberStatus,
    cycleLength,
    currentBlockNumberData,
    currentBlockNumberStatus,
  ]);

  return { cycleEndDate };
}
