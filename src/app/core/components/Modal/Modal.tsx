import * as DialogPrimitive from "@radix-ui/react-dialog";

import { useModal, TModalState } from "@/app/core/hooks/useModal";
import {
  TTransactionDisplayState,
  useTransactionDisplay,
} from "@/app/core/hooks/useTransactionDisplay";

import Prose from "@/app/core/components/Prose";
import AddTokens from "./AddTokens";
import { ModalContainer, ModalHeading, ModalMessage } from "./ui";

// import { html as disclaimerHtml } from "@/markdown/disclaimer.md";
import Elipsis from "@/app/core/components/Elipsis";
import { ReactNode, Ref, forwardRef } from "react";
import { useNetwork } from "wagmi";
import { watchAsset } from "../../util/watchAsset";

const Modal = () => {
  const { state: modalState, dispatch: modalDispatch } = useModal();
  const { state: txState } = useTransactionDisplay();
  const { chain: activeChain } = useNetwork();

  const txStatus = txState?.status;

  const handleCloseModal = () => {
    if (modalState?.status === "UNLOCKED")
      modalDispatch({ type: "CLEAR_MODAL" });
  };

  const handleAddToken = async (token: "DAI" | "BREAD") => {
    if (!activeChain || activeChain.unsupported)
      throw new Error("Active chain not valid");
    const { id: chainId } = activeChain;
    watchAsset(token, chainId);
  };

  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed top-0 bg-neutral-900 transition-opacity opacity-70 h-screen w-screen" />

        <DialogPrimitive.Content
          onPointerDownOutside={(event) => {
            modalState?.status === "LOCKED" && event.preventDefault();
          }}
        >
          {modalState && (
            <ModalContent
              modalState={modalState}
              txState={txState}
              handleCloseModal={handleCloseModal}
              handleAddToken={handleAddToken}
            />
          )}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export function ModalContent({
  modalState,
  txState,
  handleCloseModal,
  handleAddToken,
}: {
  modalState: Exclude<TModalState, null>;
  txState: TTransactionDisplayState;
  handleCloseModal: () => void;
  handleAddToken: (tokenType: "BREAD" | "DAI") => void;
}) {
  switch (modalState.type) {
    case "DISCLAIMER":
      return (
        <ModalContainer>
          <Prose html="<h2>Disclaimer</h2>" />
          <div className="overflow-y-auto">
            {/* <Prose html={disclaimerHtml} /> */}
          </div>
        </ModalContainer>
      );
    case "BAKING":
      return (
        <ModalContainer>
          <ModalHeading>Baking Bread</ModalHeading>
          {modalState.status === "LOCKED" && (
            <ModalMessage>
              Awaiting user response
              <Elipsis />
            </ModalMessage>
          )}

          {modalState.status === "UNLOCKED" && (
            <>
              {txState?.status === "PENDING" && (
                <ModalMessage>
                  Transaction in progress <Elipsis />
                </ModalMessage>
              )}
              {txState?.status === "COMPLETE" && (
                <ModalMessage>Transaction complete!</ModalMessage>
              )}
              <AddTokens handleAddToken={handleAddToken} />
            </>
          )}
        </ModalContainer>
      );
    case "BURNING":
      return (
        <ModalContainer>
          <ModalHeading>Burning Bread</ModalHeading>
          {modalState.status === "LOCKED" && (
            <ModalMessage>
              Awaiting user response
              <Elipsis />
            </ModalMessage>
          )}

          {modalState.status === "UNLOCKED" && (
            <>
              {txState?.status === "PENDING" && (
                <ModalMessage>
                  Transaction in progress <Elipsis />
                </ModalMessage>
              )}
              {txState?.status === "COMPLETE" && (
                <ModalMessage>Transaction complete!</ModalMessage>
              )}
              <AddTokens handleAddToken={handleAddToken} />
            </>
          )}
        </ModalContainer>
      );
    case "CLAIMING":
      return (
        <ModalContainer>
          <ModalHeading>Claiming Yield</ModalHeading>
          {modalState.status === "LOCKED" && (
            <ModalMessage>
              Awaiting user response
              <Elipsis />
            </ModalMessage>
          )}
          {modalState.status === "UNLOCKED" && (
            <>
              {txState?.status === "PENDING" && (
                <ModalMessage>
                  Transaction in progress <Elipsis />
                </ModalMessage>
              )}
              {txState?.status === "COMPLETE" && (
                <ModalMessage>Transaction complete!</ModalMessage>
              )}
            </>
          )}
        </ModalContainer>
      );
    case "CONNECT_WALLET":
      return (
        <ModalContainer>
          <ModalHeading>Connecting Wallet</ModalHeading>
          <ModalMessage>
            Awaiting user response
            <Elipsis />
          </ModalMessage>
        </ModalContainer>
      );
    case "APPROVAL":
      return (
        <ModalContainer>
          <ModalHeading>Approving Contract</ModalHeading>
          <ModalMessage>
            Awaiting user response
            <Elipsis />
          </ModalMessage>
        </ModalContainer>
      );
    case "CHANGE_NETWORK":
      return (
        <ModalContainer>
          <ModalHeading>Changing Network</ModalHeading>
          <ModalMessage>
            Awaiting user response
            <Elipsis />
          </ModalMessage>
        </ModalContainer>
      );
    case "CHANGING_NETWORK":
      return (
        <ModalContainer>
          <ModalHeading>Changing Network</ModalHeading>
          <ModalMessage>please wait a moment!</ModalMessage>
        </ModalContainer>
      );
    case "SAFE_TRANSACTION":
      return (
        <ModalContainer>
          <ModalHeading>Transaction Submitted</ModalHeading>
        </ModalContainer>
      );
    default:
      throw new Error("modal type invalid");
  }
}

export default Modal;
