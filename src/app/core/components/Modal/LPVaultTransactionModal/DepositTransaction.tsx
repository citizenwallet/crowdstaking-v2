import { formatUnits, Hex, parseUnits } from "viem";
import Button from "../../Button";
import { ModalContent, ModalHeading } from "../ModalUI";
import { useEffect, useReducer, useState } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { BUTTERED_BREAD_ABI, ERC20_ABI } from "@/abi";
import { TUserConnected } from "@/app/core/hooks/useConnectedUser";
import { LPVaultTransactionModalState } from "@/app/core/context/ModalContext";
import { getConfig } from "@/chainConfig";
import clsx from "clsx";
import { useTransactions } from "@/app/core/context/TransactionsContext/TransactionsContext";

import {
  LpVaultAllowance,
  LpVaultDeposit,
  LpVaultEvent,
  lpVaultReducer,
} from "./lpVaultReducer";

export function DepositTransaction({
  user,
  modalState,
}: {
  user: TUserConnected;
  modalState: LPVaultTransactionModalState;
}) {
  const chainConfig = getConfig(user.chain.id);
  const [lpVaultState, lpVaultDispatch] = useReducer(lpVaultReducer, {
    depositAmount: modalState.parsedValue,
    status: "loading",
  });

  const { status: userAllowanceStatus, data: userAllowanceData } =
    useContractRead({
      address: chainConfig.LP_TOKEN.address,
      abi: ERC20_ABI,
      functionName: "allowance",
      args: [user.address, chainConfig.BUTTERED_BREAD.address],
      watch: true,
    });

  useEffect(() => {
    if (userAllowanceStatus === "success") {
      lpVaultDispatch({
        type: "ALLOWANCE_UPDATE",
        payload: { allowance: userAllowanceData as bigint },
      });
    }
  }, [userAllowanceStatus, userAllowanceData]);

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
                !lpVaultState.status.includes("allowance_transaction") &&
                  "bg-status-success"
              )}
            />
            <div className="grow">1. Token allowance</div>
          </div>
          <div className="p-2 flex gap-2">
            <span
              className={clsx(
                "rounded-full size-4 bg-breadgray-grey",
                lpVaultState.status === "deposit_transaction_confirmed" &&
                  "bg-status-success"
              )}
            />
            <div className="grow">2. Token locking</div>
          </div>
        </div>
        {/* <pre>
          <p>status: {lpVaultState.status}</p>
          <p>depositAmount: {lpVaultState.depositAmount.toString()}</p>
        </pre> */}

        {(() => {
          if (lpVaultState.status === "loading") {
            return "loading....";
          }
          if (
            lpVaultState.status === "allowance_transaction_idle" ||
            lpVaultState.status === "allowance_transaction_submitted" ||
            lpVaultState.status === "allowance_transaction_reverted"
          ) {
            return (
              <IncreaseAllowance
                user={user}
                lpVaultState={lpVaultState}
                lpVaultDispatch={lpVaultDispatch}
              />
            );
          }
          if (
            lpVaultState.status === "deposit_transaction_idle" ||
            lpVaultState.status === "deposit_transaction_submitted" ||
            lpVaultState.status === "deposit_transaction_confirmed" ||
            lpVaultState.status === "deposit_transaction_reverted"
          ) {
            return (
              <Deposit
                user={user}
                lpVaultState={lpVaultState}
                lpVaultDispatch={lpVaultDispatch}
              />
            );
          }
        })()}
      </ModalContent>
    </>
  );
}

function IncreaseAllowance({
  user,
  lpVaultState,
  lpVaultDispatch,
}: {
  user: TUserConnected;
  lpVaultState: LpVaultAllowance;
  lpVaultDispatch: (value: LpVaultEvent) => void;
}) {
  const chainConfig = getConfig(
    user.status === "CONNECTED" ? user.chain.id : "DEFAULT"
  );
  const { transactionsDispatch, transactionsState } = useTransactions();
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  console.log("allowance: ", lpVaultState.allowance);
  console.log("depositAmount: ", lpVaultState.depositAmount);

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
    console.log({ tx });
    if (tx?.status === "REVERTED") {
      lpVaultDispatch({ type: "TRANSACTION_REVERTED" });
    }
  }, [transactionsState, lpVaultState, lpVaultDispatch]);

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
    >
      Increase Allowance
    </Button>
  );
}

function Deposit({
  user,
  lpVaultState,
  lpVaultDispatch,
}: {
  user: TUserConnected;
  lpVaultState: LpVaultDeposit;
  lpVaultDispatch: (value: LpVaultEvent) => void;
}) {
  const { transactionsState, transactionsDispatch } = useTransactions();
  const chainConfig = getConfig(user.chain.id);

  useEffect(() => {
    transactionsDispatch({
      type: "NEW",
      payload: {
        data: { type: "LP_VAULT", transactionType: "DEPOSIT" },
      },
    });
  }, [transactionsDispatch]);

  const {
    status: prepareWriteStatus,
    error: prepareWriteError,
    config: prepareWriteConfig,
  } = usePrepareContractWrite({
    address: chainConfig.BUTTERED_BREAD.address,
    abi: BUTTERED_BREAD_ABI,
    functionName: "deposit",
    args: [chainConfig.LP_TOKEN.address, lpVaultState.depositAmount],
  });

  useEffect(() => {
    if (prepareWriteStatus === "error") {
      console.log({ prepareWriteError });
    }
  }, [prepareWriteStatus, prepareWriteError]);

  const {
    write: contractWriteWrite,
    status: contractWriteStatus,
    data: contractWriteData,
  } = useContractWrite(prepareWriteConfig);

  useEffect(() => {
    if (contractWriteStatus === "success" && contractWriteData) {
      console.log("SEtting submitted deposit...");
      transactionsDispatch({
        type: "SET_SUBMITTED",
        payload: { hash: contractWriteData.hash },
      });
      lpVaultDispatch({
        type: "TRANSACTION_SUBMITTED",
        payload: { hash: contractWriteData.hash },
      });
    }
  }, [
    contractWriteStatus,
    contractWriteData,
    transactionsDispatch,
    lpVaultDispatch,
  ]);

  useEffect(() => {
    console.log({ transactionsState });
    console.log("lpVaultState.status: ", lpVaultState.status);
    if (lpVaultState.status !== "deposit_transaction_submitted") return;
    const tx = transactionsState.submitted.find(
      (t) => t.hash === lpVaultState.txHash
    );
    console.log({ tx });
    if (tx?.status === "REVERTED") {
      lpVaultDispatch({ type: "TRANSACTION_REVERTED" });
    }
    if (tx?.status === "CONFIRMED") {
      console.log("deposit transaction confirmed!!");
      lpVaultDispatch({ type: "TRANSACTION_CONFIRMED" });
    }
  }, [transactionsState, lpVaultState, lpVaultDispatch]);

  if (lpVaultState.status === "deposit_transaction_confirmed") {
    return <div>CONFIRMED!</div>;
  }

  if (lpVaultState.status === "deposit_transaction_reverted") {
    return <div>reverted!</div>;
  }

  if (lpVaultState.status === "deposit_transaction_submitted") {
    return <div>in progress...</div>;
  }

  return (
    <Button
      onClick={() => {
        if (!contractWriteWrite) return;
        contractWriteWrite();
      }}
    >
      Deposit
    </Button>
  );
}
