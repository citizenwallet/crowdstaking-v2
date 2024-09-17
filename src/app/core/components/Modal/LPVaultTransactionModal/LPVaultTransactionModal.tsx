import { ReactNode, useEffect, useState } from "react";
import {
  LPVaultTransactionModalState,
  useModal,
} from "../../../context/ModalContext";
import { ModalContainer } from "../ModalUI";
import { useConnectedUser } from "../../../hooks/useConnectedUser";
import { useTransactions } from "../../../context/TransactionsContext/TransactionsContext";
import { Hex } from "viem";
import { WithdrawTransaction } from "./WithdrawTransaction";
import { DepositTransaction } from "./DepositTransaction";
import { Spinner } from "../../Icons/Spinner";

// INIT
// ALLOWANCE IN PROGRESS
// ALLOWANCE COMPLETE
// DEPOSIT IN PROGRESS
// DEPOSIT CONFIRMED (IF ALLOWANCE subsequentially changes)

/*

init

// approval needed

allowance tx - wallet is open
allowance tx - tx in progress

// approval not needed

// deposit tx - wallet is open
// deposit tx - tx in progress

// deposit confirmed

*/

export type ModalTransactionStatus =
  | "NOT_APPROVED"
  | "WALLET_OPEN"
  | "SUBMITTED"
  | "APPROVED";

export type ModalTransactionDeposit = {
  type: "DEPOSIT";
  allowance: ModalTransactionStatus;
  deposit: ModalTransactionStatus;
};

export type ModalTransactionWithdraw = {
  type: "DEPOSIT";
  allowance: ModalTransactionStatus;
  deposit: ModalTransactionStatus;
};

export type ModalTransactionState =
  | ModalTransactionDeposit
  | ModalTransactionWithdraw;

export type TransactionData = {
  type:
    | "ALLOWANCE_WALLET_OPEN"
    | "ALLOWANCE_SUBMITTED"
    | "DEPOSIT_WALLET_OPEN"
    | "DEPOSIT_SUBMITTED"
    | "WITHDRAW";

  hash: Hex;
} | null;

const initialState = {
  status: "loading",
};

type SomeState = {
  allowance: number;
};

export function LPVaultTransactionModal({
  modalState,
}: {
  modalState: LPVaultTransactionModalState;
}) {
  const { user } = useConnectedUser();
  const { transactionsState } = useTransactions();
  const { setModal } = useModal();
  const [txHash, setTxHash] = useState<Hex | null>(null);

  useEffect(() => {
    if (user.status !== "CONNECTED") {
      setModal(null);
    }
  }, [user, setModal]);

  function setTransactionHash(hash: Hex) {
    setTxHash(hash);
  }

  const submittedTransaction =
    txHash &&
    transactionsState.submitted.length &&
    transactionsState.submitted.find((tx) => tx.hash === txHash);

  return (
    <ModalContainer>
      {user.status === "CONNECTED" &&
        (modalState.transactionType === "DEPOSIT" ? (
          <DepositTransaction
            user={user}
            modalState={modalState}
            txHash={txHash}
            setTxHash={setTransactionHash}
            submittedTransaction={submittedTransaction || null}
          />
        ) : // <WithdrawTransaction
        //   user={user}
        //   modalState={modalState}
        //   txHash={txHash}
        //   setTxHash={setTransactionHash}
        //   submittedTransaction={submittedTransaction || null}
        // />
        null)}
      {submittedTransaction && submittedTransaction.status === "SUBMITTED" && (
        <Spinner />
      )}
    </ModalContainer>
  );
}
