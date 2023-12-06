import { TUserConnected } from "@/app/core/hooks/useConnectedUser";
import Button from "@/app/core/components/Button";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import config from "@/config";
import { BREAD_GNOSIS_ABI } from "@/abi";
import useDebounce from "../../hooks/useDebounce";
import { parseEther } from "viem";

export default function Bake({
  user,
  inputValue,
}: {
  user: TUserConnected;
  inputValue: string;
}) {
  const { BREAD } = config[user.chain.id];

  const debouncedValue = useDebounce(inputValue, 500);

  const parsedValue = parseEther(
    debouncedValue === "." ? "0" : debouncedValue || "0"
  );

  const {
    config: writeConfig,
    status,
    error,
  } = usePrepareContractWrite({
    address: BREAD.address,
    abi: BREAD_GNOSIS_ABI,
    functionName: "mint",
    args: [user.address],
    value: parsedValue,
    enabled: parseFloat(debouncedValue) > 0,
  });

  console.log({ writeConfig, status, error });

  const { write } = useContractWrite(writeConfig);

  return (
    <div className="p-2 w-full flex flex-col gap-2">
      <Button fullWidth={true} variant="large" onClick={() => write?.()}>
        Bake
      </Button>
    </div>
  );
}
