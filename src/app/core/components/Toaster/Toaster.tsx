import * as ToastPrimitive from "@radix-ui/react-toast";

import { useTransactions } from "@/app/core/context/TransactionsContext/TransactionsContext";
import {
  TTransaction,
  TTransactionsDispatch,
} from "../../context/TransactionsContext/TransactionsReducer";
import { useEffect } from "react";
import { useWaitForTransaction } from "wagmi";

export function Toaster() {
  const { state: transactionsState, dispatch: transactionsDispatch } =
    useTransactions();
  return transactionsState.map((transaction) => {
    return (
      <Toast
        key={`transaction_${transaction.hash}`}
        transaction={transaction}
        transactionsDispatch={transactionsDispatch}
      />
    );
  });
}

function Toast({
  transaction,
  transactionsDispatch,
}: {
  transaction: TTransaction;
  transactionsDispatch: TTransactionsDispatch;
}) {
  const { status, hash } = transaction;

  // TODO only need to wait if tx is pending!!!

  const { data: waitData } = useWaitForTransaction({ hash });

  useEffect(() => {
    if (!waitData) return;
    if (status === "PENDING" && waitData.status === "success") {
      transactionsDispatch({ type: "SUCCESS", payload: { hash } });
    }
    console.log({ txStatus: waitData.status });
  }, [status, hash, waitData, transactionsDispatch]);

  function handleOpenChange() {
    console.log("handling open change!!!");
  }

  return (
    <ToastPrimitive.Provider>
      <ToastPrimitive.Root
        // open={open}
        // onOpenChange={handleOpenChange}
        className="p-6 rounded bg-white text-black"
      >
        <ToastPrimitive.Title>{transaction.status}</ToastPrimitive.Title>
        <ToastPrimitive.Description>
          {transaction.hash}
        </ToastPrimitive.Description>

        <ToastPrimitive.Close />
      </ToastPrimitive.Root>

      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
}
