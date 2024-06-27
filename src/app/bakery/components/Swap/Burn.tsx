import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { parseEther } from "viem";
import {
  Root as DialogPrimitiveRoot,
  Portal as DialogPrimitivePortal,
  Trigger as DialogPrimitiveTrigger,
} from "@radix-ui/react-dialog";

import { TUserConnected } from "@/app/core/hooks/useConnectedUser";
import { BREAD_GNOSIS_ABI } from "@/abi";
import Button from "@/app/core/components/Button";
import config from "@/chainConfig";
import useDebounce from "@/app/bakery/hooks/useDebounce";
import { useTransactions } from "@/app/core/context/TransactionsContext/TransactionsContext";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { BakeryTransactionModal } from "@/app/core/components/Modal/TransactionModal/BakeryTransactionModal";
import { AnimatePresence } from "framer-motion";
import SafeAppsSDK from "@safe-global/safe-apps-sdk/dist/src/sdk";
import { TransactionStatus } from "@safe-global/safe-apps-sdk";

export default function Burn({
  user,
  inputValue,
  clearInputValue,
  isSafe,
}: {
  user: TUserConnected;
  inputValue: string;
  clearInputValue: () => void;
  isSafe: boolean;
}) {
  const { transactionsState, transactionsDispatch } = useTransactions();
  const [txId, setTxId] = useState<string | null>(null);
  const [buttonIsEnabled, setButtonIsEnabled] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

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

  useEffect(() => {
    setButtonIsEnabled(false);
  }, [inputValue, setButtonIsEnabled]);

  useEffect(() => {
    if (prepareStatus === "success") setButtonIsEnabled(true);
  }, [debouncedValue, prepareStatus, setButtonIsEnabled]);

  const {
    write,
    isLoading: writeIsLoading,
    isError: writeIsError,
    error: writeError,
    isSuccess: writeIsSuccess,
    data: writeData,
  } = useContractWrite(prepareConfig);

  useEffect(() => {
    (async () => {
      if (!writeData?.hash || !txId) return;
      if (isSafe) {
        const safeSdk = new SafeAppsSDK();
        const tx = await safeSdk.txs.getBySafeTxHash(writeData.hash);
        if (tx.txStatus === TransactionStatus.AWAITING_CONFIRMATIONS) {
          transactionsDispatch({
            type: "SET_SAFE_SUBMITTED",
            payload: { id: txId, hash: writeData.hash },
          });
          return;
        }
      }
      // not safe
      transactionsDispatch({
        type: "SET_SUBMITTED",
        payload: { id: txId, hash: writeData.hash },
      });
      clearInputValue();
    })();
  }, [txId, writeData, transactionsDispatch, clearInputValue, isSafe]);

  useEffect(() => {
    if (!writeIsError && !writeError) return;
    if (!txId) return;
    transactionsDispatch({ type: "CLEAR", payload: { id: txId } });
    setTxId(null);
  }, [writeIsError, writeError, txId, transactionsDispatch]);

  const transaction = transactionsState.find(
    (transaction) => transaction.id === txId
  );

  useEffect(() => {
    if (transaction?.status === "PREPARED") setModalOpen(true);
  }, [transaction, setModalOpen]);

  return (
    <div className="relative">
      <DialogPrimitiveRoot open={modalOpen} onOpenChange={setModalOpen}>
        <DialogPrimitiveTrigger asChild>
          <Button
            fullWidth={true}
            variant="xl"
            disabled={!buttonIsEnabled}
            onClick={() => {
              if (!write) return;
              const newId = nanoid();
              setTxId(newId);
              transactionsDispatch({
                type: "NEW",
                payload: {
                  id: newId,
                  data: {
                    type: "BAKERY",
                    value: debouncedValue,
                  },
                },
              });
              write();
            }}
          >
            Burn
          </Button>
        </DialogPrimitiveTrigger>
        <DialogPrimitivePortal forceMount>
          <AnimatePresence>
            {transaction && (
              <BakeryTransactionModal
                transactionType="BURN"
                transaction={transaction}
              />
            )}
          </AnimatePresence>
        </DialogPrimitivePortal>
      </DialogPrimitiveRoot>
      {prepareStatus === "loading" && (
        <span className="absolute bottom-0 left-0 right-0 transform translate-y-full pt-4">
          Preparing transaction...
        </span>
      )}
    </div>
  );
}
