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

  const [submittedToastDispatched, setSubmittedToastDispatched] =
    useState(false);
  const [haveResult, setHaveResult] = useState(false);

  const { data: waitData } = useWaitForTransaction({ hash });

  useEffect(() => {
    console.log("Submitted toast effect....");
    console.log("toast dispatched? ", submittedToastDispatched);
    if (submittedToastDispatched) return;
    toastDispatch({
      type: "NEW",
      payload: { toastType: "SUBMITTED", txHash: hash },
    });
    setSubmittedToastDispatched(true);
  }, [
    submittedToastDispatched,
    setSubmittedToastDispatched,
    status,
    hash,
    toastDispatch,
  ]);

  useEffect(() => {
    if (!waitData || haveResult) return;
    console.log("we have waitdata: ", waitData);
    if (waitData.status === "success") {
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
    setHaveResult(true);
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
