import { formatUnits, Hex } from "viem";
import Button from "../../Button";
import { ModalContent, ModalHeading } from "../ModalUI";
import { useEffect, useMemo, useReducer, useState } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { BUTTERED_BREAD_ABI } from "@/abi";
import { TUserConnected } from "@/app/core/hooks/useConnectedUser";
import { LPVaultTransactionModalState } from "@/app/core/context/ModalContext";
import { getConfig } from "@/chainConfig";
import { TTransaction } from "@/app/core/context/TransactionsContext/TransactionsReducer";
import { useTransactions } from "@/app/core/context/TransactionsContext/TransactionsContext";
import { withdrawReducer } from "./withdrawReducer";

export function WithdrawTransaction({
  user,
  modalState,
}: {
  user: TUserConnected;
  modalState: LPVaultTransactionModalState;
}) {
  const { transactionsState, transactionsDispatch } = useTransactions();
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const chainConfig = getConfig(user.chain.id);
  const [withdrawState, withdrawDispatch] = useReducer(withdrawReducer, {
    status: "idle",
  });

  useEffect(() => {
    transactionsDispatch({
      type: "NEW",
      payload: {
        data: { type: "LP_VAULT", transactionType: "DEPOSIT" },
      },
    });
  }, [transactionsDispatch]);

  const lockedBalance = useContractRead({
    address: chainConfig.BUTTERED_BREAD.address,
    abi: BUTTERED_BREAD_ABI,
    functionName: "accountToLPBalance",
    args: [user.address, chainConfig.LP_TOKEN.address],
    watch: true,
  });

  const prepareWrite = usePrepareContractWrite({
    address: chainConfig.BUTTERED_BREAD.address,
    abi: BUTTERED_BREAD_ABI,
    functionName: "withdraw",
    args: [chainConfig.LP_TOKEN.address, modalState.parsedValue],
    enabled:
      lockedBalance.status === "success" &&
      modalState.parsedValue <= (lockedBalance.data as bigint),
  });

  useEffect(() => {
    if (prepareWrite.status === "error") {
      console.log(prepareWrite.error);
    }
  }, [prepareWrite]);

  const {
    write: contractWriteWrite,
    status: contractWriteStatus,
    data: contractWriteData,
  } = useContractWrite(prepareWrite.config);

  useEffect(() => {
    if (contractWriteStatus === "success" && contractWriteData) {
      transactionsDispatch({
        type: "SET_SUBMITTED",
        payload: { hash: contractWriteData.hash },
      });
      withdrawDispatch({
        type: "TRANSACTION_SUBMITTED",
        payload: { hash: contractWriteData.hash },
      });
    }
    if (contractWriteStatus === "error") {
      setIsWalletOpen(false);
    }
  }, [contractWriteStatus, contractWriteData, transactionsDispatch]);

  const tx = useMemo(() => {
    if (withdrawState.status === "idle") return;
    const tx = transactionsState.submitted.find((t) => {
      return t.hash === withdrawState.hash;
    });
    return tx;
  }, [transactionsState, withdrawState]);

  return (
    <>
      <ModalHeading>Unlocking LP Tokens</ModalHeading>
      <div>{formatUnits(modalState.parsedValue, 18)}</div>
      <ModalContent>
        {tx ? (
          <div>{tx.status}</div>
        ) : (
          <Button
            onClick={() => {
              if (!contractWriteWrite) return;
              setIsWalletOpen(true);
              contractWriteWrite();
            }}
            disabled={isWalletOpen}
          >
            Unlock
          </Button>
        )}
      </ModalContent>
    </>
  );
}
