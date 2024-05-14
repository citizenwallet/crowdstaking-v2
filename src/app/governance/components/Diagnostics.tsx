"use client";
import { BREAD_GNOSIS_ABI, DISBURSER_ABI } from "@/abi";
import Button from "@/app/core/components/Button";
import config from "@/chainConfig";
import { useEffect, useState } from "react";
import { formatUnits } from "viem";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

export function Diagnostics() {
  const { data: yieldAccruedData } = useContractRead({
    address: config[100].BREAD.address,
    abi: BREAD_GNOSIS_ABI,
    functionName: "yieldAccrued",
    watch: true,
  });

  const [enableDistribution, setEnableDistribution] = useState(false);

  const {
    write,
    data: distributeYieldData,
    status: distributeYieldStatus,
  } = useContractWrite({
    address: config[100].DISBURSER.address,
    abi: DISBURSER_ABI,
    functionName: "distributeYield",
  });

  useEffect(() => {
    console.log({ distributeYieldStatus, distributeYieldData });
    if (distributeYieldData) {
      setEnableDistribution(false);
    }
  }, [distributeYieldData, distributeYieldStatus]);

  return (
    <div>
      <p>
        Claimable Yield:{" "}
        <span>
          {formatUnits(
            yieldAccruedData ? (yieldAccruedData as bigint) : BigInt(0),
            18
          )}
        </span>
      </p>

      <Button
        onClick={() => {
          write?.();
        }}
      >
        Distribute Yield
      </Button>
    </div>
  );
}

const breadHolders: Array<`0x${string}`> = [
  "0x458cd345b4c05e8df39d0a07220feb4ec19f5e6f",
  "0x918def5d593f46735f74f9e2b280fe51af3a99ad",
  "0xf3d8f3de71657d342db60dd714c8a2ae37eac6b4",
  "0x6a148b997e6651237f2fcfc9e30330a6480519f0",
  "0x2e33f5c128f85295219ea63624baf82e25d0ea51",
  "0xc2fb4b3ea53e10c88d193e709a81c4dc7aec902e",
  "0xba6e1c26be2f8b46d9e7ab7573b99921ee81acf5",
  "0xe885626097850ec1c5759d4bc8718c8762c68077",
  "0x037f29ce01d56a51829b78acb0702763d542bbec",
  "0x2fd39e6741b1446c51e8a120ab1d69f645e10e0e",
  "0x156a0d0caae8daee1c0b5bc6b8285fc168bef26f",
  "0x06b0380925f18c0c9f2cc5200217df9a81e805f2",
  "0x36c6361d625e83084a767d6a275500f6901bdeff",
];
