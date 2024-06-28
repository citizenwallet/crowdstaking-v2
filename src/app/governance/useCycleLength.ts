import { DISBURSER_ABI } from "@/abi";
import config from "@/chainConfig";
import { useEffect, useState } from "react";
import { useContractRead, useNetwork } from "wagmi";

export type CycleLengthState =
  | CycleLengthLoading
  | CycleLengthSuccess
  | CycleLengthError;

export type CycleLengthLoading = {
  status: "LOADING";
};
export type CycleLengthSuccess = {
  status: "SUCCESS";
  data: number;
};
export type CycleLengthError = {
  status: "ERROR";
};

export function useCycleLength() {
  const [cycleLength, setCycleLength] = useState<CycleLengthState>({
    status: "LOADING",
  });

  const { chain: activeChain } = useNetwork();
  const distriubutorAddress = activeChain
    ? config[activeChain.id].DISBURSER.address
    : config["DEFAULT"].DISBURSER.address;

  const {
    data: cycleLengthData,
    status: cycleLengthStatus,
    error: cycleLengthError,
  } = useContractRead({
    address: distriubutorAddress,
    abi: DISBURSER_ABI,
    functionName: "cycleLength",
    enabled: distriubutorAddress !== "0x",
  });

  useEffect(() => {
    if (cycleLengthStatus === "success" && cycleLengthData !== null) {
      setCycleLength({
        status: "SUCCESS",
        data: Number(cycleLengthData),
      });
    }
    if (cycleLengthStatus === "error" && cycleLengthError) {
      console.log({ cycleLengthError });
      setCycleLength({
        status: "ERROR",
      });
    }
  }, [cycleLengthStatus, cycleLengthData, cycleLengthError]);

  return { cycleLength };
}
