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
  TransactionValue,
} from "../ModalUI";
import { TTransaction } from "../../../context/TransactionsContext/TransactionsReducer";
import {
  TokenLabelContainer,
  TokenLabelText,
} from "@/app/bakery/components/Swap/SwapUI";
import { BreadIcon } from "../../Icons/TokenIcons";
import { ExplorerLink } from "../../ExplorerLink";

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
        <ModalContainer txStatus={transaction.status}>
          <ModalHeading>
            {transactionType === "BAKE" ? "Baking Bread" : "Burning Bread"}
          </ModalHeading>
          <ModalContent>
            {transaction.status === "PREPARED" && (
              <div className="py-5">
                <svg
                  width="32"
                  height="32"
                  className="stroke-current text-breadpink-shaded"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g className="spinner_QPB9">
                    <circle
                      cx="12"
                      cy="12"
                      r="9.5"
                      fill="none"
                      strokeWidth="2"
                    ></circle>
                  </g>
                </svg>
              </div>
            )}
            {transaction.status === "SUBMITTED" && (
              <div className="py-5">
                <svg
                  width="32"
                  height="32"
                  className="stroke-current text-breadpink-shaded"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g className="spinner_QPB9">
                    <circle
                      cx="12"
                      cy="12"
                      r="9.5"
                      fill="none"
                      strokeWidth="2"
                    ></circle>
                  </g>
                </svg>
              </div>
            )}
            {transaction.status === "CONFIRMED" && (
              <div className="pt-3 pb-4">
                <svg
                  width="44"
                  height="33"
                  viewBox="0 0 44 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M38 0.5H43.3334V5.83333H38V0.5ZM32.6667 11.1667V5.83333H38L38 11.1667H32.6667ZM27.3334 16.5V11.1667H32.6667V16.5H27.3334ZM22 21.8333H27.3334V16.5L22 16.5V21.8333ZM16.6667 27.1667H22V21.8333H16.6667L16.6667 27.1667ZM11.3334 27.1667V32.5H16.6667V27.1667H11.3334ZM6.00002 21.8333H11.3334V27.1667H6.00002V21.8333ZM6.00002 21.8333H0.666687V16.5H6.00002V21.8333Z"
                    fill="#9EC958"
                  />
                </svg>
              </div>
            )}
            {transaction.status === "REVERTED" && (
              <div className="pt-3 pb-4">
                <svg
                  width="32"
                  height="33"
                  viewBox="0 0 32 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M0 0.5H4.57143V5.07014H9.14285V9.64145H4.57142V5.07131H0V0.5ZM4.57143 27.9285H0V32.4998H4.57143V27.9285ZM27.4286 27.9285H32V32.4998H27.4286V27.9285ZM13.7143 9.64306H9.14286V14.2144H13.7143L13.7143 18.7838H18.2857V14.2125H13.7143L13.7143 9.64306ZM22.8571 18.7861H18.2857V23.3574H22.8571L22.8571 27.9269H27.4286V23.3556H22.8571L22.8571 18.7861ZM22.8571 5.07014H27.4286L27.4286 0.5H32V5.07131H27.4286L27.4286 9.64145H22.8571V5.07014ZM18.2857 9.64306H22.8571V14.2144H18.2857V9.64306ZM13.7143 18.7861H9.14286L9.14286 23.3556H4.57143V27.9269H9.14286L9.14286 23.3574H13.7143V18.7861Z"
                    fill="#D8745C"
                  />
                </svg>
              </div>
            )}
            <div className="flex gap-2 items-center justify-center">
              <TransactionValue value={transaction.value} />
              <TokenLabelContainer>
                <BreadIcon />
                <TokenLabelText>BREAD</TokenLabelText>
              </TokenLabelContainer>
            </div>
            {transaction.status === "PREPARED" && (
              <ModalAdviceText>
                Please confirm transaction in your wallet
              </ModalAdviceText>
            )}
            {transaction.status === "SUBMITTED" && (
              <>
                <ModalAdviceText>
                  Waiting for on-chain confimation
                </ModalAdviceText>
                <ExplorerLink
                  to={`https://gnosisscan.io/tx/${transaction.hash}`}
                />
              </>
            )}
            {transaction.status === "CONFIRMED" && (
              <>
                <ModalAdviceText>Transaction Confirmed</ModalAdviceText>
                <ExplorerLink
                  to={`https://gnosisscan.io/tx/${transaction.hash}`}
                />
              </>
            )}
            {transaction.status === "REVERTED" && (
              <>
                <ModalAdviceText>Transaction Failed</ModalAdviceText>
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
