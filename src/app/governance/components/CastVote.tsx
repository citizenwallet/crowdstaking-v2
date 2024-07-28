import { useContractWrite, useNetwork, usePrepareContractWrite } from "wagmi";
import {
  Root as DialogPrimitiveRoot,
  Portal as DialogPrimitivePortal,
  Trigger as DialogPrimitiveTrigger,
} from "@radix-ui/react-dialog";

import Button from "@/app/core/components/Button";

import { getConfig } from "@/chainConfig";
import { DISBURSER_ABI } from "@/abi";
import { AnimatePresence } from "framer-motion";
import { useTransactions } from "@/app/core/context/TransactionsContext/TransactionsContext";
import { ReactNode, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { VoteTransactionModal } from "@/app/core/components/Modal/TransactionModal/VoteTransactionModal";
import SafeAppsSDK from "@safe-global/safe-apps-sdk/dist/src/sdk";
import { TransactionStatus } from "@safe-global/safe-apps-sdk/dist/src/types";
import {
  TConnectedUserState,
  TUserConnected,
} from "@/app/core/hooks/useConnectedUser";
import { AccountMenu } from "@/app/core/components/Header/AccountMenu";
import { CheckIcon } from "@/app/core/components/Icons/CheckIcon";
import { useChainModal } from "@rainbow-me/rainbowkit";
import { ConfirmRecastModal } from "@/app/core/components/Modal/ConfirmRecastModal";
import { useModal } from "@/app/core/context/ModalContext";

export function CastVotePanel({
  user,
  userVote,
  userHasVoted,
  userCanVote,
  isSafe,
  isRecasting,
}: {
  user: TConnectedUserState;
  userVote: Array<number>;
  userHasVoted: boolean;
  userCanVote: boolean;
  isSafe: boolean;
  isRecasting: boolean;
}) {
  const { openChainModal } = useChainModal();

  return (
    <div className="pt-3">
      {user.status === "NOT_CONNECTED" ? (
        <AccountMenu size="large" fullWidth>
          <div className="tracking-wider">Connect to vote</div>
        </AccountMenu>
      ) : user.status === "UNSUPPORTED_CHAIN" ? (
        <Button
          fullWidth={true}
          size="large"
          variant="danger"
          onClick={() => openChainModal?.()}
        >
          Change network
        </Button>
      ) : user.status === "CONNECTED" ? (
        isRecasting || !userHasVoted ? (
          <CastVote
            vote={userVote}
            isSafe={isSafe}
            userCanVote={userCanVote}
            userHasVoted={userHasVoted}
            isRecasting={isRecasting}
            user={user}
          />
        ) : (
          <VoteIsCast>{user.features.recastVote && <RecastVote />}</VoteIsCast>
        )
      ) : null}
    </div>
  );
}

export function CastVote({
  vote,
  userCanVote,
  isSafe,
}: {
  vote: Array<number>;
  userCanVote: boolean;
  isSafe: boolean;
  userHasVoted: boolean;
  isRecasting: boolean;
  user: TUserConnected;
}) {
  const { transactionsState, transactionsDispatch } = useTransactions();
  const { setModal } = useModal();
  const [txId, setTxId] = useState<string | null>(null);
  const writeIsEnabled = !!(vote.reduce((acc, num) => (acc += num), 0) > 0);

  const { chain: activeChain } = useNetwork();
  const config = activeChain ? getConfig(activeChain.id) : getConfig("DEFAULT");
  const distributorAddress = config.DISBURSER.address;

  const {
    config: prepareConfig,
    status: prepareConfigStatus,
    error: prepareConfigError,
  } = usePrepareContractWrite({
    address: distributorAddress,
    abi: DISBURSER_ABI,
    functionName: "castVote",
    args: [vote],
    enabled: writeIsEnabled && distributorAddress !== "0x",
  });

  const {
    write,
    data: writeData,
    isError: writeIsError,
    error: writeError,
  } = useContractWrite(prepareConfig);

  useEffect(() => {
    (async () => {
      if (!writeData?.hash || !txId) return;
      if (isSafe) {
        const safeSdk = new SafeAppsSDK();
        const tx = await safeSdk.txs.getBySafeTxHash(writeData.hash);
        if (tx.txStatus === TransactionStatus.AWAITING_CONFIRMATIONS) {
          transactionsDispatch({
            type: "SET_SAFE_SUBMITTED",
            payload: { hash: writeData.hash },
          });
          return;
        }
        if (tx.txStatus === TransactionStatus.SUCCESS) {
          transactionsDispatch({
            type: "SET_SUBMITTED",
            payload: { hash: writeData.hash },
          });
          return;
        }
      }
      // not safe
      transactionsDispatch({
        type: "SET_SUBMITTED",
        payload: { hash: writeData.hash },
      });
    })();
  }, [txId, writeData, transactionsDispatch, isSafe]);

  useEffect(() => {
    if (!writeIsError && !writeError) return;
    if (!txId) return;
    // clear transaction closing modal on error including if user rejects the request
    transactionsDispatch({ type: "CLEAR_NEW" });
    setTxId(null);
  }, [writeIsError, writeError, txId, transactionsDispatch]);

  return (
    <Button
      fullWidth
      size="large"
      onClick={() => {
        if (!write) return;
        if (prepareConfigStatus !== "success") {
          console.log("castVote tx prepare failed: ", prepareConfigError);
          return;
        }
        const newId = nanoid();
        setTxId(newId);
        transactionsDispatch({
          type: "NEW",
          payload: {
            data: {
              type: "VOTE",
            },
          },
        });
        setModal({
          type: "VOTE_TRANSACTION",
          hash: "",
        });
        write();
      }}
      disabled={!userCanVote || !writeIsEnabled}
    >
      Cast Vote
    </Button>
  );
}

function VoteIsCast({ children }: { children: ReactNode }) {
  return (
    <div className="flex gap-2">
      <div className="py-2.5 bg-breadgray-ultra-white dark:bg-breadgray-charcoal rounded-lg grow flex justify-center text-lg font-bold dark:text-status-success">
        <span className="flex gap-4">
          <div className="w-7 h-7 flex items-center text-status-success">
            <CheckIcon />
          </div>
          Vote cast
        </span>
      </div>
      {children}
    </div>
  );
}

function RecastVote({}: {}) {
  const { setModal } = useModal();

  return (
    <button
      className="bg-[#FFCCF1] dark:bg-[#402639] px-6 py-2 flex items-center gap-2.5 rounded-lg font-bold text-breadpink-400 dark:text-breadpink-shaded text-lg border-2 border-[#FFCCF1] dark:border-[#402639] hover:border-breadpink-400 dark:hover:border-breadpink-shaded hover:transition-[border]"
      onClick={() => setModal({ type: "CONFIRM_RECAST", isConfirmed: false })}
    >
      <div className="w-4 h-4">
        <svg
          className="w-full h-full fill-current"
          viewBox="0 0 16 16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M12 0H10V2H12V4H2V6H0V14H2V16H8V14H2V6H12V8H10V10H12V8H14V6H16V4H14V2H12V0Z"
          />
        </svg>
      </div>

      <span>Recast Vote</span>
    </button>
  );
}
