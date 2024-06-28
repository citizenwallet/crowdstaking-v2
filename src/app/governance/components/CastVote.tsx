import { useContractWrite, useNetwork, usePrepareContractWrite } from "wagmi";
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
import { CheckIcon } from "@/app/core/components/Icons/CheckIcon";

export function CastVotePanel({
  user,
  userVote,
  userHasVoted,
  userCanVote,
  isSafe,
}: {
  user: TConnectedUserState;
  userVote: Array<number>;
  userHasVoted: boolean;
  userCanVote: boolean;
  isSafe: boolean;
}) {
  if (user.status === "NOT_CONNECTED")
    return (
      <AccountMenu variant="large" fullWidth>
        <div className="tracking-wider">Connect to vote</div>
      </AccountMenu>
    );

  return (
    <div>
      {user.status === "CONNECTED" && (
        <CastVote
          vote={userVote}
          isSafe={isSafe}
          userCanVote={userCanVote}
          userHasVoted={userHasVoted}
        />
      )}
    </div>
  );
}

export function CastVote({
  vote,
  userCanVote,
  isSafe,
  userHasVoted,
}: {
  vote: Array<number>;
  userCanVote: boolean;
  isSafe: boolean;
  userHasVoted: boolean;
}) {
  const { transactionsState, transactionsDispatch } = useTransactions();
  const [txId, setTxId] = useState<string | null>(null);
  const writeIsEnabled = !!(vote.reduce((acc, num) => (acc += num), 0) > 0);

  const { chain: activeChain } = useNetwork();
  const distributorAddress = activeChain
    ? config[activeChain.id].DISBURSER.address
    : config["DEFAULT"].BREAD.address;

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
            payload: { id: txId, hash: writeData.hash },
          });
          return;
        }
      }
      // not safe
      transactionsDispatch({
        type: "SET_SUBMITTED",
        payload: { id: txId, hash: writeData.hash },
      });
    })();
  }, [txId, writeData, transactionsDispatch, isSafe]);

  useEffect(() => {
    if (!writeIsError && !writeError) return;
    if (!txId) return;
    // clear transaction closing modal on error including if user rejects the request
    transactionsDispatch({ type: "CLEAR", payload: { id: txId } });
    setTxId(null);
  }, [writeIsError, writeError, txId, transactionsDispatch]);

  const transaction = transactionsState.find(
    (transaction) => transaction.id === txId
  );

  if (userHasVoted) return <VoteIsCast />;

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
          disabled={!userCanVote || !writeIsEnabled}
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
        <div className="w-7 h-7 flex items-center text-status-success">
          <CheckIcon />
        </div>
        Voted
      </span>
    </div>
  );
}
