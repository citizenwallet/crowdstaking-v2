import { formatUnits, Hex } from "viem";
import Button from "../../Button";
import { ModalContent, ModalHeading } from "../ModalUI";
import { useEffect, useState } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { BUTTERED_BREAD_ABI, ERC20_ABI } from "@/abi";
import { TUserConnected } from "@/app/core/hooks/useConnectedUser";
import {
  LPVaultTransactionModalState,
  useModal,
} from "@/app/core/context/ModalContext";
import { getConfig } from "@/chainConfig";
import clsx from "clsx";
import { useTransactions } from "@/app/core/context/TransactionsContext/TransactionsContext";
import { TransactionData } from "./LPVaultTransactionModal";
import { TTransaction } from "@/app/core/context/TransactionsContext/TransactionsReducer";

export type ModalTransactionStatus =
  | "NOT_CONFIRMED"
  | "WALLET_OPEN"
  | "SUBMITTED"
  | "CONFIRMED";

export type DepositTransactionState =
  | { type: "INIT" }
  | {
      type: "ALLOWANCE";
      status: ModalTransactionStatus;
    }
  | {
      type: "DEPOSIT";
      status: ModalTransactionStatus;
      hash: Hex;
    };

export function DepositTransaction({
  user,
  modalState,
  txHash,
  setTxHash,
  submittedTransaction,
}: {
  user: TUserConnected;
  modalState: LPVaultTransactionModalState;
  setTxHash: (hash: Hex) => void;
  submittedTransaction: TTransaction | null;
  txHash: Hex | null;
}) {
  const [txState, setTxState] = useState<DepositTransactionState>({
    type: "INIT",
  });

  const chainConfig = getConfig(user.chain.id);

  const userAllowance = useContractRead({
    address: chainConfig.LP_TOKEN.address,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: [user.address, chainConfig.BUTTERED_BREAD.address],
    watch: true,
  });

  const approvalNeeded =
    userAllowance.status === "success" &&
    Number(userAllowance.data) < modalState.parsedValue;

  const depositIsConfirmed = 

  // useEffect(() => {
  //   if (userAllowance.status === "success" && userAllowance.data) {
  //     const isApproved = Number(userAllowance.data) > modalState.parsedValue;

  //     setTxState(
  //       isApproved
  //         ? {
  //             type: "DEPOSIT",
  //             status: "NOT_CONFIRMED",
  //           }
  //         : {
  //             type: "ALLOWANCE",
  //             status: "NOT_CONFIRMED",
  //           }
  //     );
  //   }
  // }, [userAllowance]);

  return (
    <>
      <ModalHeading>Locking LP Tokens</ModalHeading>
      <div>{formatUnits(modalState.parsedValue, 18)}</div>
      <ModalContent>
        <div className="flex flex-col gap-2">
          <div className="p-2 flex gap-2">
            <span
              className={clsx(
                "rounded-full size-4 bg-breadgray-grey",
                !approvalNeeded && "bg-status-success"
              )}
            />
            <div className="grow">1. Token allowance</div>
          </div>
          <div className="p-2 flex gap-2">
            <span
              className={clsx(
                "rounded-full size-4 bg-breadgray-grey",
                isConfirmed && "bg-status-success"
              )}
            />
            <div className="grow">2. Token locking</div>
          </div>
        </div>
        {(() => {
          if (
            isConfirmed ||
            (submittedTransaction && txData?.type === "DEPOSIT") ||
            (submittedTransaction &&
              submittedTransaction.status === "SUBMITTED")
          )
            return null;
          return approvalNeeded ? (
            <IncreaseAllowance
              user={user}
              parsedValue={modalState.parsedValue}
              setTxData={setTxData}
            />
          ) : (
            <Deposit
              user={user}
              parsedValue={modalState.parsedValue}
              setTxData={setTxData}
            />
          );
        })()}
      </ModalContent>
    </>
  );
}

function IncreaseAllowance({
  user,
  parsedValue,
  setTxData,
}: {
  user: TUserConnected;
  parsedValue: bigint;
  setTxData: (data: TransactionData) => void;
}) {
  const chainConfig = getConfig(
    user.status === "CONNECTED" ? user.chain.id : "DEFAULT"
  );
  const { transactionsDispatch } = useTransactions();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const prepareWrite = usePrepareContractWrite({
    address: chainConfig.LP_TOKEN.address,
    abi: ERC20_ABI,
    functionName: "approve",
    args: [chainConfig.BUTTERED_BREAD.address, parsedValue],
  });

  useEffect(() => {
    transactionsDispatch({
      type: "NEW",
      payload: {
        data: { type: "LP_VAULT", transactionType: "DEPOSIT" },
      },
    });
  }, [transactionsDispatch]);

  useEffect(() => {
    if (prepareWrite.status === "error") {
      console.log(prepareWrite.error);
    }
  }, [prepareWrite]);

  const contractWrite = useContractWrite(prepareWrite.config);

  useEffect(() => {
    if (
      contractWrite.status === "success" &&
      contractWrite.data &&
      !isSubmitted
    ) {
      setIsSubmitted(true);
      setTxData({ type: "ALLOWANCE", hash: contractWrite.data.hash });
      transactionsDispatch({
        type: "SET_SUBMITTED",
        payload: { hash: contractWrite.data.hash },
      });
    }
  }, [
    isSubmitted,
    setIsSubmitted,
    setTxData,
    transactionsDispatch,
    contractWrite,
  ]);

  return (
    <Button
      onClick={() => {
        if (!contractWrite.write) return;
        contractWrite.write();
      }}
    >
      Increase Allowance
    </Button>
  );
}

function Deposit({
  user,
  parsedValue,
  setTxData,
}: {
  user: TUserConnected;
  parsedValue: bigint;
  setTxData: (data: TransactionData) => void;
}) {
  const { transactionsDispatch } = useTransactions();
  const chainConfig = getConfig(user.chain.id);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    transactionsDispatch({
      type: "NEW",
      payload: {
        data: { type: "LP_VAULT", transactionType: "DEPOSIT" },
      },
    });
  }, [transactionsDispatch]);

  const prepareWrite = usePrepareContractWrite({
    address: chainConfig.BUTTERED_BREAD.address,
    abi: BUTTERED_BREAD_ABI,
    functionName: "deposit",
    args: [chainConfig.LP_TOKEN.address, parsedValue],
    enabled: Number(parsedValue) > 0,
  });

  useEffect(() => {
    if (prepareWrite.status === "error") {
      console.log({ prepareWrite });
    }
  });
  const contractWrite = useContractWrite(prepareWrite.config);

  useEffect(() => {
    if (
      contractWrite.status === "success" &&
      contractWrite.data &&
      !isSubmitted
    ) {
      setIsSubmitted(true);
      setTxData({ type: "DEPOSIT", hash: contractWrite.data.hash });
      transactionsDispatch({
        type: "SET_SUBMITTED",
        payload: { hash: contractWrite.data.hash },
      });
    }
  }, [contractWrite, transactionsDispatch, setTxData, isSubmitted]);

  return (
    <Button
      onClick={() => {
        if (!contractWrite.write) return;
        contractWrite.write();
      }}
    >
      Deposit
    </Button>
  );
}
