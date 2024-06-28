import {
  Overlay as DialogPrimitiveOverlay,
  Content as DialogPrimitiveContent,
  Portal as DialogPrimitivePortal,
} from "@radix-ui/react-dialog";
import {
  ModalAdviceText,
  ModalContainer,
  ModalContent,
  ModalHeading,
  ModalOverlay,
  TransactionStatusCheck,
  TransactionStatusCross,
  TransactionStatusSpinner,
} from "../ModalUI";
import {
  TTransaction,
  TTransactionStatus,
} from "../../../context/TransactionsContext/TransactionsReducer";

import { ExplorerLink } from "../../ExplorerLink";

const modalAdviceText: {
  [key in TTransactionStatus]: string;
} = {
  PREPARED: "Please confirm transaction in your wallet",
  SUBMITTED: "Waiting for on-chain confimation",
  SAFE_SUBMITTED: "Safe Transaction Submitted",
  CONFIRMED: "Transaction Confirmed",
  REVERTED: "Transaction Reverted",
};

export function VoteTransactionModal({
  transaction,
}: {
  transaction: TTransaction;
}) {
  return (
    <DialogPrimitivePortal>
      <DialogPrimitiveOverlay forceMount asChild>
        <ModalOverlay />
      </DialogPrimitiveOverlay>
      <DialogPrimitiveContent forceMount asChild>
        <ModalContainer>
          <ModalHeading>Casting Vote</ModalHeading>
          <ModalContent>
            {transaction.status === "PREPARED" && <TransactionStatusSpinner />}
            {transaction.status === "SUBMITTED" && <TransactionStatusSpinner />}
            {transaction.status === "CONFIRMED" && <TransactionStatusCheck />}
            {transaction.status === "SAFE_SUBMITTED" && (
              <TransactionStatusCheck />
            )}
            {transaction.status === "REVERTED" && <TransactionStatusCross />}
            {transaction.status === "PREPARED" ? (
              <ModalAdviceText>
                {modalAdviceText[transaction.status]}
              </ModalAdviceText>
            ) : (
              <>
                <ModalAdviceText>
                  {modalAdviceText[transaction.status]}
                </ModalAdviceText>
                {transaction.status !== "SAFE_SUBMITTED" && (
                  <ExplorerLink
                    to={`https://gnosisscan.io/tx/${transaction.hash}`}
                  />
                )}
              </>
            )}
          </ModalContent>
        </ModalContainer>
      </DialogPrimitiveContent>
    </DialogPrimitivePortal>
  );
}
