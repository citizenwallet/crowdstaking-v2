import { DISBURSER_ABI } from "@/abi";
import config from "@/chainConfig";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";

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

  const {
    data: cycleLengthData,
    status: cycleLengthStatus,
    error: cycleLengthError,
  } = useContractRead({
    address: config[100].DISBURSER.address,
    abi: DISBURSER_ABI,
    functionName: "cycleLength",
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
