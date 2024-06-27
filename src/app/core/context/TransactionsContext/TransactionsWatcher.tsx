import { useEffect } from "react";
import {
  TTransactionSubmitted,
  TTransactionsDispatch,
} from "./TransactionsReducer";
import { useWaitForTransaction } from "wagmi";
import { useToast } from "../ToastContext/ToastContext";

export function TransactionWatcher({
  transaction,
  transactionsDispatch,
}: {
  transaction: TTransactionSubmitted;
  transactionsDispatch: TTransactionsDispatch;
}) {
  const { id, status, hash } = transaction;
  const { toastDispatch } = useToast();

  const { data: waitData } = useWaitForTransaction({ hash });

  useEffect(() => {
    toastDispatch({
      type: "NEW",
      payload: { toastType: "SUBMITTED", txHash: hash },
    });
  }, [hash, toastDispatch]);

  useEffect(() => {
    if (!waitData) return;
    if (waitData.status === "success" && status === "SUBMITTED") {
      transactionsDispatch({ type: "SET_SUCCESS", payload: { id } });
      toastDispatch({
        type: "NEW",
        payload: { toastType: "CONFIRMED", txHash: hash },
      });
    }
    if (waitData.status === "reverted") {
      transactionsDispatch({ type: "SET_REVERTED", payload: { id } });
      toastDispatch({
        type: "NEW",
        payload: { toastType: "REVERTED", txHash: hash },
      });
    }
  }, [id, status, hash, waitData, transactionsDispatch, toastDispatch]);

  return null;
}
