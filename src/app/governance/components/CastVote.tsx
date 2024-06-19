import { useContractWrite, usePrepareContractWrite } from "wagmi";
import {
  Root as DialogPrimitiveRoot,
  Portal as DialogPrimitivePortal,
  Trigger as DialogPrimitiveTrigger,
} from "@radix-ui/react-dialog";

import Button from "@/app/core/components/Button";

import config from "@/chainConfig";
import { DISBURSER_ABI } from "@/abi";
import { AnimatePresence } from "framer-motion";
import { useTransactions } from "@/app/core/context/TransactionsContext/TransactionsContext";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { VoteTransactionModal } from "@/app/core/components/Modal/TransactionModal/VoteTransactionModal";
import SafeAppsSDK from "@safe-global/safe-apps-sdk/dist/src/sdk";
import { TransactionStatus } from "@safe-global/safe-apps-sdk/dist/src/types";
import { TConnectedUserState } from "@/app/core/hooks/useConnectedUser";
import { AccountMenu } from "@/app/core/components/Header/AccountMenu";

export function CastVotePanel({
  user,
  userVote,
  voteIsCast,
  breadBalance,
  votingPower,
  isSafe,
}: {
  user: TConnectedUserState;
  userVote: Array<number>;
  voteIsCast: boolean;
  breadBalance: number | null;
  votingPower: number | null;
  isSafe: boolean;
}) {
  const canVote =
    (breadBalance && breadBalance > 0) || (votingPower && votingPower > 0);

  if (user.status === "NOT_CONNECTED")
    return (
      <AccountMenu variant="large" fullWidth>
        <div className="tracking-wider">Connect to vote</div>
      </AccountMenu>
    );

  if (voteIsCast) return <VoteIsCast />;

  if (!canVote) return <div>cant vote!!</div>;
  return (
    <div>
      {user.status === "CONNECTED" && (
        <CastVote vote={userVote} isSafe={isSafe} />
      )}
    </div>
  );
}

export function CastVote({
  vote,
  isSafe,
}: {
  vote: Array<number>;
  isSafe: boolean;
}) {
  const { transactionsState, transactionsDispatch } = useTransactions();
  const [txId, setTxId] = useState<string | null>(null);
  const writeIsEnabled = !!(vote.reduce((acc, num) => (acc += num), 0) > 0);

  const {
    config: prepareConfig,
    status: prepareConfigStatus,
    error: prepareConfigError,
  } = usePrepareContractWrite({
    address: config[100].DISBURSER.address,
    abi: DISBURSER_ABI,
    functionName: "castVote",
    args: [vote],
    enabled: writeIsEnabled,
  });

  const { write, data: writeData } = useContractWrite(prepareConfig);

  useEffect(() => {
    (async () => {
      if (!writeData?.hash || !txId) return;
      if (isSafe) {
        const safeSdk = new SafeAppsSDK();
        const tx = await safeSdk.txs.getBySafeTxHash(writeData.hash);
        if (tx.txStatus === TransactionStatus.AWAITING_CONFIRMATIONS) {
          transactionsDispatch({
            type: "SET_SAFE_SUBMITTED",
            payload: { id: txId, hash: writeData.hash },
          });
          return;
        }
      }
      // not safe
      transactionsDispatch({
        type: "SET_PENDING",
        payload: { id: txId, hash: writeData.hash },
      });
    })();
  }, [txId, writeData, transactionsDispatch, isSafe]);

  const transaction = transactionsState.find(
    (transaction) => transaction.id === txId
  );

  return (
    <DialogPrimitiveRoot
    // onOpenChange={setModalOpen}
    >
      <DialogPrimitiveTrigger asChild>
        <Button
          fullWidth
          variant="large"
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
                id: newId,
                data: {
                  type: "VOTE",
                },
              },
            });
            write();
          }}
          disabled={!writeIsEnabled}
        >
          Cast Vote
        </Button>
      </DialogPrimitiveTrigger>

      <DialogPrimitivePortal forceMount>
        <AnimatePresence>
          {transaction && <VoteTransactionModal transaction={transaction} />}
        </AnimatePresence>
      </DialogPrimitivePortal>
    </DialogPrimitiveRoot>
  );
}

function VoteIsCast() {
  return (
    <div className="py-2.5 border-2 border-status-success rounded-lg w-full flex justify-center text-lg font-bold">
      <span className="flex gap-4">
        <div className="w-7 h-7 flex items-center transform ">
          <svg
            viewBox="0 0 44 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M38 0.5H43.3334V5.83333H38V0.5ZM32.6667 11.1667V5.83333H38L38 11.1667H32.6667ZM27.3334 16.5V11.1667H32.6667V16.5H27.3334ZM22 21.8333H27.3334V16.5L22 16.5V21.8333ZM16.6667 27.1667H22V21.8333H16.6667L16.6667 27.1667ZM11.3334 27.1667V32.5H16.6667V27.1667H11.3334ZM6.00002 21.8333H11.3334V27.1667H6.00002V21.8333ZM6.00002 21.8333H0.666687V16.5H6.00002V21.8333Z"
              fill="#9EC958"
            />
          </svg>
        </div>
        Voted
      </span>
    </div>
  );
}
