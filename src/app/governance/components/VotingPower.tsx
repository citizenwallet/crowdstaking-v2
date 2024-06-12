import { BREAD_GNOSIS_ABI, DISBURSER_ABI } from "@/abi";
import config from "@/chainConfig";
import { formatUnits } from "viem";
import { useContractRead } from "wagmi";

export function VotingPower({ address }: { address: `0x${string}` }) {
  const { data: votingPowerData, status: votingPowerStatus } = useContractRead({
    address: config[100].DISBURSER.address,
    abi: DISBURSER_ABI,
    functionName: "getUserVotingPower",
    args: [address],
    watch: true,
  });
  // console.log({ votingPowerData, votingPowerStatus });

  const { data: numCheckpointsData, status: numCheckpointsStatus } =
    useContractRead({
      address: config[100].BREAD.address,
      abi: BREAD_GNOSIS_ABI,
      functionName: "numCheckpoints",
      args: [address],
      watch: true,
    });

  // console.log({ numCheckpointsData, numCheckpointsStatus });

  return (
    <div className="flex justify-between">
      <pre></pre>
      {/* <p>
        numCheckpoints:
        <span className="pl-4">
          {numCheckpointsStatus === "success"
            ? (numCheckpointsData as number)
            : null}
        </span>
      </p>
      <p>
        <span className="ol-4">
          {votingPowerData ? formatUnits(votingPowerData as bigint, 1) : "0"}
        </span>
      </p> */}
    </div>
  );
}
