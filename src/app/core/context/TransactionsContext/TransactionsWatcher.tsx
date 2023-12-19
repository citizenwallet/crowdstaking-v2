import { useEffect, useState } from "react";
import {
  TTransactionPending,
  TTransactionsDispatch,
} from "./TransactionsReducer";
import { useWaitForTransaction } from "wagmi";

export function TransactionWatcher({
  transaction,
  transactionsDispatch,
}: {
  transaction: TTransactionPending;
  transactionsDispatch: TTransactionsDispatch;
}) {
  const { id, status, hash } = transaction;

  const [haveResult, setHaveResult] = useState(false);

  const { data: waitData } = useWaitForTransaction({ hash });

  useEffect(() => {
    if (!waitData || haveResult) return;
    console.log("we have waitdata: ", waitData);
    if (waitData.status === "success") {
      transactionsDispatch({ type: "SET_SUCCESS", payload: { id } });
    }
    if (waitData.status === "reverted") {
      transactionsDispatch({ type: "SET_REVERTED", payload: { id } });
    }
    setHaveResult(true);
  }, [
    id,
    status,
    hash,
    waitData,
    transactionsDispatch,
    haveResult,
    setHaveResult,
  ]);

  return null;
}
