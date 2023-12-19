import {
  Overlay as DialogPrimitiveOverlay,
  Content as DialogPrimitiveContent,
  Close as DialogPrimitiveClose,
} from "@radix-ui/react-dialog";
import {
  ModalContainer,
  ModalHeading,
  ModalMessage,
  ModalOverlay,
  TransactionLink,
  TransactionValue,
} from "../ModalUI";
import CloseIcon from "../../Icons/CloseIcon";
import { TTransaction } from "../../../context/TransactionsContext/TransactionsReducer";

export function BakeModal({ transaction }: { transaction: TTransaction }) {
  return (
    <>
      <DialogPrimitiveOverlay asChild>
        <ModalOverlay />
      </DialogPrimitiveOverlay>

      <DialogPrimitiveContent>
        <ModalContainer>
          <div className="absolute top-0 right-0 pt-5 pr-3 md:p-8">
            <DialogPrimitiveClose className="w-6 h-6">
              <CloseIcon />
            </DialogPrimitiveClose>
          </div>
          <ModalHeading>Baking Bread</ModalHeading>

          <TransactionValue value={transaction.value} />
          {transaction.status === "PREPARED" && (
            <ModalMessage>
              Please confirm transaction in your wallet
            </ModalMessage>
          )}
          {transaction.status === "PENDING" && (
            <ModalMessage>
              <p>transaction in progress</p>
              <TransactionLink hash={transaction.hash} />
            </ModalMessage>
          )}
          {transaction.status === "SUCCESS" && (
            <ModalMessage>
              <p>transaction complete</p>
              <TransactionLink hash={transaction.hash} />
            </ModalMessage>
          )}
          {transaction.status === "REVERTED" && (
            <ModalMessage>
              <p>transaction failed</p>
              <TransactionLink hash={transaction.hash} />
            </ModalMessage>
          )}
        </ModalContainer>
      </DialogPrimitiveContent>
    </>
  );
}
