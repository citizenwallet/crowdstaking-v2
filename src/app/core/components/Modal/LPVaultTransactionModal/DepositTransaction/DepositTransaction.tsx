import { formatUnits, Hex, parseUnits } from "viem";
import { ModalContent, ModalHeading } from "../../ModalUI";
import { ReactNode, useEffect, useReducer, useState } from "react";
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

import { lpVaultReducer } from "../lpVaultReducer";
import { CheckIcon } from "../../../Icons/CheckIcon";

import { FistIcon } from "../../../Icons/FistIcon";
import { LinkIcon } from "../../../Icons/LinkIcon";
import { ExternalLink } from "@/app/bakery/components/FAQ/ExternalLink";
import { IncreaseAllowance } from "./IncreaseAllowance";
import { Lock } from "./Lock";

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
      <ModalContent>
        <StatusBadge
          variant={
            lpVaultState.status !== "deposit_transaction_confirmed"
              ? "in-progress"
              : "complete"
          }
        />

        <TransactionStage
          status={
            !lpVaultState.status.includes("allowance_transaction")
              ? "success"
              : "pending"
          }
        >
          1. Token allowance
        </TransactionStage>
        <TransactionStage
          status={
            !lpVaultState.status.includes("deposit_transaction")
              ? "disabled"
              : lpVaultState.status === "deposit_transaction_confirmed"
              ? "success"
              : "pending"
          }
        >
          2. Token locking
        </TransactionStage>

        {/* <DepositSuccess value={modalState.parsedValue} explorerLink="" /> */}

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
              <Lock
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

export function StatusBadge({
  variant,
}: {
  variant: "complete" | "in-progress";
}) {
  return (
    <span
      className={clsx(
        "rounded-full px-1 font-bold text-xs bg-opacity-10",
        variant === "in-progress" && "bg-status-success text-status-success",
        variant === "complete" && "bg-breadpink-shaded text-breadpink-shaded"
      )}
    >
      {variant === "in-progress" && "In progress"}
      {variant === "complete" && "Complete"}
    </span>
  );
}

function TransactionStage({
  status,
  children,
}: {
  status: "disabled" | "pending" | "success";
  children: ReactNode;
}) {
  console.log({ children, status });
  return (
    <div
      className={clsx(
        "px-1.5 py-1 flex gap-2 items-center dark:bg-breadgray-burnt rounded",
        status === "disabled" && "opacity-50"
      )}
    >
      <span
        className={clsx(
          "rounded-full p-[3.5px] border-[3px] transform size-6 flex items-center",
          status === "success"
            ? "border-status-success"
            : "border-breadgray-toast"
        )}
      >
        {status === "success" && (
          <div className="size-full translate-y-0.5 text-status-success">
            <CheckIcon />
          </div>
        )}
      </span>
      <div className="grow dark:text-white font-bold">{children}</div>
    </div>
  );
}
