import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { parseEther } from "viem";
import {
  Root as DialogPrimitiveRoot,
  Portal as DialogPrimitivePortal,
  Trigger as DialogPrimitiveTrigger,
} from "@radix-ui/react-dialog";

import { TUserConnected } from "@/app/core/hooks/useConnectedUser";
import Button from "@/app/core/components/Button";
import config from "@/config";
import { BREAD_GNOSIS_ABI } from "@/abi";
import useDebounce from "@/app/bakery/hooks/useDebounce";

import { useEffect, useState } from "react";
import { useTransactions } from "@/app/core/context/TransactionsContext/TransactionsContext";
import { nanoid } from "nanoid";
import { BakeModal } from "@/app/core/components/Modal/BakeModal/BakeModal";

export default function Bake({
  user,
  inputValue,
}: {
  user: TUserConnected;
  inputValue: string;
}) {
  const { transactionsState, transactionsDispatch } = useTransactions();
  const [txId, setTxId] = useState<string | null>(null);

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
    functionName: "mint",
    args: [user.address],
    value: parsedValue,
    enabled: parseFloat(debouncedValue) > 0,
  });

  const {
    write,
    isLoading: writeIsLoading,
    isError: writeIsError,
    error: writeError,
    isSuccess: writeIsSuccess,
    data: writeData,
  } = useContractWrite(prepareConfig);

  useEffect(() => {
    if (!writeData?.hash || !txId) return;
    transactionsDispatch({
      type: "SET_PENDING",
      payload: { id: txId, hash: writeData.hash },
    });
  }, [txId, writeData, transactionsDispatch]);

  useEffect(() => {
    if (!writeIsError && !writeError) return;
    // TODO tx not submitted, dispatch FAILED tx
    // !!! unless rejected by user:
    // -> error.cause.code === 4001

    console.log({ error: writeError });
  }, [writeIsError, writeError]);

  const transaction = transactionsState.find(
    (transaction) => transaction.id === txId
  );

  return (
    <div className="p-2 w-full flex flex-col gap-2">
      <DialogPrimitiveRoot>
        <DialogPrimitiveTrigger asChild>
          <Button
            fullWidth={true}
            variant="large"
            onClick={() => {
              if (!write) return;
              const newId = nanoid();
              setTxId(newId);
              transactionsDispatch({
                type: "NEW",
                payload: { id: newId, value: debouncedValue },
              });
              write();
            }}
          >
            Bake
          </Button>
        </DialogPrimitiveTrigger>
        <DialogPrimitivePortal>
          {transaction && <BakeModal transaction={transaction} />}
        </DialogPrimitivePortal>
      </DialogPrimitiveRoot>
    </div>
  );
}
