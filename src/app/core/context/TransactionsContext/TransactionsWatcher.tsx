import { useEffect, useState } from "react";
import {
  TTransactionPending,
  TTransactionsDispatch,
} from "./TransactionsReducer";
import { useWaitForTransaction } from "wagmi";
import { useToast } from "../ToastContext/ToastContext";

export function TransactionWatcher({
  transaction,
  transactionsDispatch,
}: {
  transaction: TTransactionPending;
  transactionsDispatch: TTransactionsDispatch;
}) {
  const { id, status, hash } = transaction;
  const { toastDispatch } = useToast();

  const [haveResult, setHaveResult] = useState(false);

  const { data: waitData } = useWaitForTransaction({ hash });

  useEffect(() => {
    toastDispatch({
      type: "NEW",
      payload: { toastType: "SUBMITTED", txHash: hash },
    });
  }, [hash, toastDispatch]);

  useEffect(() => {
    if (!waitData || haveResult) return;
    console.log("\n\n");
    console.log("waitData", waitData);
    console.log("\n\n");
    if (waitData.status === "success") {
      transactionsDispatch({ type: "SET_SUCCESS", payload: { id } });
      toastDispatch({
        type: "NEW",
        payload: { toastType: "CONFIRMED", txHash: hash },
      });
      setHaveResult(true);
    }
    if (waitData.status === "reverted") {
      transactionsDispatch({ type: "SET_REVERTED", payload: { id } });
      toastDispatch({
        type: "NEW",
        payload: { toastType: "REVERTED", txHash: hash },
      });
      setHaveResult(true);
    }
  }, [
    id,
    status,
    hash,
    waitData,
    transactionsDispatch,
    toastDispatch,
    haveResult,
    setHaveResult,
  ]);

  return null;
}
