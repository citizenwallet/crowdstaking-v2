import {
  Overlay as DialogPrimitiveOverlay,
  Content as DialogPrimitiveContent,
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
  TransactionValue,
} from "../ModalUI";
import {
  TTransaction,
  TTransactionStatus,
} from "../../../context/TransactionsContext/TransactionsReducer";
import {
  TokenLabelContainer,
  TokenLabelText,
} from "@/app/bakery/components/Swap/SwapUI";
import { BreadIcon } from "../../Icons/TokenIcons";
import { ExplorerLink } from "../../ExplorerLink";

const modalHeaderText = {
  BAKE: "Baking Bread",
  BURN: "Burning Bread",
};

const modalAdviceText: {
  [key in TTransactionStatus]: string;
} = {
  PREPARED: "Please confirm transaction in your wallet",
  SUBMITTED: "Waiting for on-chain confimation",
  CONFIRMED: "Transaction Confirmed",
  REVERTED: "Transaction Reverted",
};

export function TransactionModal({
  transaction,
  transactionType,
}: {
  transaction: TTransaction;
  transactionType: "BAKE" | "BURN";
}) {
  return (
    <>
      <DialogPrimitiveOverlay asChild>
        <ModalOverlay />
      </DialogPrimitiveOverlay>
      <DialogPrimitiveContent>
        <ModalContainer>
          <ModalHeading>{modalHeaderText[transactionType]}</ModalHeading>
          <ModalContent>
            {transaction.status === "PREPARED" && <TransactionStatusSpinner />}
            {transaction.status === "SUBMITTED" && <TransactionStatusSpinner />}
            {transaction.status === "CONFIRMED" && <TransactionStatusCheck />}
            {transaction.status === "REVERTED" && <TransactionStatusCross />}
            <div className="flex gap-2 items-center justify-center">
              <TransactionValue value={transaction.value} />
              <TokenLabelContainer>
                <BreadIcon />
                <TokenLabelText>BREAD</TokenLabelText>
              </TokenLabelContainer>
            </div>
            {transaction.status === "PREPARED" ? (
              <ModalAdviceText>
                {modalAdviceText[transaction.status]}
              </ModalAdviceText>
            ) : (
              <>
                <ModalAdviceText>
                  {modalAdviceText[transaction.status]}
                </ModalAdviceText>
                <ExplorerLink
                  to={`https://gnosisscan.io/tx/${transaction.hash}`}
                />
              </>
            )}
          </ModalContent>
        </ModalContainer>
      </DialogPrimitiveContent>
    </>
  );
}
