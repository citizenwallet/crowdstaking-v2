import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { parseEther } from "viem";
import {
  Root as DialogPrimitiveRoot,
  Portal as DialogPrimitivePortal,
  Overlay as DialogPrimitiveOverlay,
  Trigger as DialogPrimitiveTrigger,
  Content as DialogPrimitiveContent,
  Close as DialogPrimitiveClose,
} from "@radix-ui/react-dialog";

import { TUserConnected } from "@/app/core/hooks/useConnectedUser";
import { BREAD_GNOSIS_ABI } from "@/abi";
import Button from "@/app/core/components/Button";
import config from "@/config";
import useDebounce from "@/app/bakery/hooks/useDebounce";

export default function Burn({
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
    config: prepareConfig,
    status: prepareStatus,
    error: prepareError,
  } = usePrepareContractWrite({
    address: BREAD.address,
    abi: BREAD_GNOSIS_ABI,
    functionName: "burn",
    args: [parsedValue, user.address],
    enabled: parseFloat(debouncedValue) > 0,
  });

  console.log({ prepareError });

  const {
    write,
    isLoading: writeIsLoading,
    isError: writeIsError,
    error: writeError,
    isSuccess: writeIsSuccess,
    data: writeData,
  } = useContractWrite(prepareConfig);

  const { data } = useContractRead({
    address: BREAD.address,
    abi: BREAD_GNOSIS_ABI,
    functionName: "maxWithdraw",
  });

  console.log({ maxWithdraw: data });

  return (
    <div className="p-2 w-full flex flex-col gap-2">
      <Button
        fullWidth={true}
        variant="large"
        onClick={() => {
          write?.();
        }}
      >
        Burn
      </Button>
    </div>
  );
}
