import { useEffect, useState } from "react";
import Button from "@/app/core/components/Button";
import { TUserConnected } from "@/app/core/hooks/useConnectedUser";
import { LpVaultAllowance, LpVaultEvent } from "../lpVaultReducer";
import { useTransactions } from "@/app/core/context/TransactionsContext/TransactionsContext";
import { getConfig } from "@/chainConfig";
import { useContractWrite, usePrepareContractWrite } from "wagmi";
import { ERC20_ABI } from "@/abi";

export function IncreaseAllowance({
  user,
  lpVaultState,
  lpVaultDispatch,
}: {
  user: TUserConnected;
  lpVaultState: LpVaultAllowance;
  lpVaultDispatch: (value: LpVaultEvent) => void;
}) {
  const { transactionsDispatch, transactionsState } = useTransactions();
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const chainConfig = getConfig(user.chain.id);

  useEffect(() => {
    transactionsDispatch({
      type: "NEW",
      payload: {
        data: { type: "LP_VAULT", transactionType: "LOCK" },
      },
    });
  }, [transactionsDispatch]);

  const {
    status: prepareWriteStatus,
    error: prepareWriteError,
    config: prepareWriteConfig,
  } = usePrepareContractWrite({
    address: chainConfig.LP_TOKEN.address,
    abi: ERC20_ABI,
    functionName: "approve",
    args: [
      chainConfig.BUTTERED_BREAD.address,
      lpVaultState.depositAmount - lpVaultState.allowance,
    ],
  });

  useEffect(() => {
    if (prepareWriteStatus === "error") {
      console.log(prepareWriteError);
    }
  }, [prepareWriteStatus, prepareWriteError]);

  const {
    write: contractWriteWrite,
    status: contractWriteStatus,
    data: contractWriteData,
  } = useContractWrite(prepareWriteConfig);

  useEffect(() => {
    if (contractWriteStatus === "success" && contractWriteData) {
      transactionsDispatch({
        type: "SET_SUBMITTED",
        payload: { hash: contractWriteData.hash },
      });
      lpVaultDispatch({
        type: "TRANSACTION_SUBMITTED",
        payload: { hash: contractWriteData.hash },
      });
    }
    if (contractWriteStatus === "error") {
      setIsWalletOpen(false);
    }
  }, [
    transactionsDispatch,
    contractWriteStatus,
    contractWriteData,
    lpVaultDispatch,
  ]);

  // TODO get tx from hash / transactionsContext
  // watch and handle confirmed or rejected
  useEffect(() => {
    if (lpVaultState.status !== "allowance_transaction_submitted") return;
    const tx = transactionsState.submitted.find(
      (t) => t.hash === lpVaultState.txHash
    );
    if (tx?.status === "REVERTED") {
      lpVaultDispatch({ type: "TRANSACTION_REVERTED" });
    }
  }, [transactionsState, lpVaultState, lpVaultDispatch]);

  if (lpVaultState.status === "allowance_transaction_submitted") {
    return (
      <Button onClick={() => {}} fullWidth disabled>
        Confirming...
      </Button>
    );
  }

  if (lpVaultState.status === "allowance_transaction_reverted") {
    return <div>reverted!</div>;
  }

  return (
    <Button
      onClick={() => {
        if (!contractWriteWrite) return;
        contractWriteWrite();
        setIsWalletOpen(true);
      }}
      disabled={isWalletOpen}
      fullWidth
    >
      Confirm transaction
    </Button>
  );
}
