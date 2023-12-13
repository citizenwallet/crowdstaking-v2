import { useContractWrite, usePrepareContractWrite } from "wagmi";
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
import Button from "@/app/core/components/Button";
import config from "@/config";
import { BREAD_GNOSIS_ABI } from "@/abi";
import useDebounce from "@/app/bakery/hooks/useDebounce";
import {
  CloseModalButton,
  ModalContainer,
  ModalHeading,
  ModalMessage,
} from "@/app/core/components/Modal/ui";
import CloseIcon from "@/app/core/components/Icons/CloseIcon";
import Elipsis from "@/app/core/components/Elipsis";
import AddTokens from "@/app/core/components/Modal/AddTokens";
import { useEffect } from "react";
import { useTransactions } from "@/app/core/context/TransactionsContext/TransactionsContext";

export default function Bake({
  user,
  inputValue,
}: {
  user: TUserConnected;
  inputValue: string;
}) {
  const { dispatch: transactionsDispatch } = useTransactions();

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
    if (!writeData?.hash) return;
    transactionsDispatch({ type: "WATCH", payload: { hash: writeData.hash } });
  }, [writeData, transactionsDispatch]);

  useEffect(() => {
    if (!writeIsError && !writeError) return;
    // handle tx hash!
    console.log({ error: writeError });
  }, [writeIsError, writeError]);

  return (
    <div className="p-2 w-full flex flex-col gap-2">
      <DialogPrimitiveRoot>
        <DialogPrimitiveTrigger asChild>
          <Button fullWidth={true} variant="large" onClick={() => write?.()}>
            Bake
          </Button>
        </DialogPrimitiveTrigger>
        <DialogPrimitivePortal>
          <DialogPrimitiveOverlay className="fixed top-0 bg-neutral-900 transition-opacity opacity-70 h-screen w-screen" />

          <DialogPrimitiveContent>
            <ModalContainer>
              <div className="absolute top-0 right-0 pt-5 pr-3 md:p-8">
                <DialogPrimitiveClose className=" w-6 h-6">
                  <CloseIcon />
                </DialogPrimitiveClose>
              </div>
              <ModalHeading>Baking Bread</ModalHeading>
              {writeIsLoading && (
                <ModalMessage>
                  Awaiting user response
                  <Elipsis />
                </ModalMessage>
              )}
              {writeIsSuccess && (
                <>
                  <ModalMessage>
                    Transaction in progress <Elipsis />
                    <Elipsis />
                  </ModalMessage>
                  <AddTokens handleAddToken={() => {}} />
                </>
              )}

              {/* {modalState.status === "UNLOCKED" && (
            <>
              {txState?.status === "PENDING" && (
                <ModalMessage>
                  Transaction in progress <Elipsis />
                </ModalMessage>
              )}
              {txState?.status === "COMPLETE" && (
                <ModalMessage>Transaction complete!</ModalMessage>
              )}
              <AddTokens handleAddToken={handleAddToken} />
            </>
          )} */}
            </ModalContainer>
          </DialogPrimitiveContent>
        </DialogPrimitivePortal>
      </DialogPrimitiveRoot>
    </div>
  );
}
