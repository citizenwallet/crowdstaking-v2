"use client";
import { BREAD_GNOSIS_ABI, DISBURSER_ABI } from "@/abi";
import Button from "@/app/core/components/Button";
import { projectsMeta } from "@/app/projectsMeta";
import { getConfig } from "@/chainConfig";
import { useEffect } from "react";
import { formatUnits } from "viem";
import {
  useContractRead,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";

export function Diagnostics() {
  const { chain: activeChain } = useNetwork();
  const config = activeChain ? getConfig(activeChain.id) : getConfig("DEFAULT");
  const distributorAddress = config.DISBURSER.address;

  const {
    config: prepareConfig,
    status: prepareStatus,
    error: prepareError,
  } = usePrepareContractWrite({
    address: distributorAddress,
    abi: DISBURSER_ABI,
    functionName: "distributeYield",
  });

  const {
    write,
    data: distributeYieldData,
    status: distributeYieldStatus,
  } = useContractWrite(prepareConfig);

  useEffect(() => {
    if (prepareError) {
      console.log({ prepareError });
    }
  }, [prepareError]);

  return (
    <div className="m-4 p-4 rounded border border-neutral-500 grid grid-cols-1 gap-4">
      <div>
        <Button
          onClick={() => {
            console.log("distributing yield...");
            write?.();
          }}
        >
          Distribute Yield
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-2">
        {Object.keys(projectsMeta).map((account) => (
          <ProjectDisplay key={account} account={account} />
        ))}
      </div>
    </div>
  );
}

function ProjectDisplay({ account }: { account: string }) {
  const { chain: activeChain } = useNetwork();
  const config = activeChain ? getConfig(activeChain.id) : getConfig("DEFAULT");
  const breadAddress = config.BREAD.address;

  const { data: breadBalanceData, status: breadBalanceStatus } =
    useContractRead({
      address: breadAddress,
      abi: BREAD_GNOSIS_ABI,
      functionName: "balanceOf",
      args: [account],
      watch: true,
    });

  return (
    <div>
      <h3>{projectsMeta[account].name}</h3>
      <div className="text-sm text-neutral-500">
        BREAD:{" "}
        {formatUnits(
          breadBalanceData ? (breadBalanceData as bigint) : BigInt(0),
          18
        )}
      </div>
    </div>
  );
}
