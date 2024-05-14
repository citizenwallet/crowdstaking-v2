import { DISBURSER_ABI } from "@/abi";
import { TUserConnected } from "@/app/core/hooks/useConnectedUser";
import config from "@/chainConfig";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

export function SubmitVote({
  user,
  vote,
}: {
  user: TUserConnected;
  vote: Array<number>;
}) {
  const { config: prepareConfig } = usePrepareContractWrite({
    address: config[100].DISBURSER.address,
    abi: DISBURSER_ABI,
    functionName: "castVote",
    args: [vote],
  });

  const {
    write,
    isLoading: writeIsLoading,
    isError: writeIsError,
    error: writeError,
    isSuccess: writeIsSuccess,
    data: writeData,
  } = useContractWrite(prepareConfig);

  return (
    <button
      onClick={() => {
        if (!write) return;
        write();
      }}
      className="w-full bg-pink-500 text-white px-3 py-2 border-2 border-neutral-400 rounded text-center font-bold"
    >
      Submit Vote
    </button>
  );
}
