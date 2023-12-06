import * as DialogPrimitive from "@radix-ui/react-dialog";

import { useModal, TModalState } from "@/app/core/hooks/useModal";
import {
  TTransactionDisplayState,
  useTransactionDisplay,
} from "@/app/core/hooks/useTransactionDisplay";

import Prose from "@/app/core/components/Prose";
import AddTokens from "./AddTokens";
import { Container, Heading, Message } from "./ui";

// import { html as disclaimerHtml } from "@/markdown/disclaimer.md";
import Elipsis from "@/app/core/components/Elipsis";
import { ReactNode, Ref, forwardRef } from "react";
import { useNetwork } from "wagmi";
import { watchAsset } from "../../util/formatter";

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
        <Container status={modalState.status} closeModal={handleCloseModal}>
          <Prose html="<h2>Disclaimer</h2>" />
          <div className="overflow-y-auto">
            {/* <Prose html={disclaimerHtml} /> */}
          </div>
        </Container>
      );
    case "BAKING":
      return (
        <Container status={modalState.status} closeModal={handleCloseModal}>
          <Heading>Baking Bread</Heading>
          {modalState.status === "LOCKED" && (
            <Message>
              Awaiting user response
              <Elipsis />
            </Message>
          )}

          {modalState.status === "UNLOCKED" && (
            <>
              {txState?.status === "PENDING" && (
                <Message>
                  Transaction in progress <Elipsis />
                </Message>
              )}
              {txState?.status === "COMPLETE" && (
                <Message>Transaction complete!</Message>
              )}
              <AddTokens handleAddToken={handleAddToken} />
            </>
          )}
        </Container>
      );
    case "BURNING":
      return (
        <Container status={modalState.status} closeModal={handleCloseModal}>
          <Heading>Burning Bread</Heading>
          {modalState.status === "LOCKED" && (
            <Message>
              Awaiting user response
              <Elipsis />
            </Message>
          )}

          {modalState.status === "UNLOCKED" && (
            <>
              {txState?.status === "PENDING" && (
                <Message>
                  Transaction in progress <Elipsis />
                </Message>
              )}
              {txState?.status === "COMPLETE" && (
                <Message>Transaction complete!</Message>
              )}
              <AddTokens handleAddToken={handleAddToken} />
            </>
          )}
        </Container>
      );
    case "CLAIMING":
      return (
        <Container status={modalState.status} closeModal={handleCloseModal}>
          <Heading>Claiming Yield</Heading>
          {modalState.status === "LOCKED" && (
            <Message>
              Awaiting user response
              <Elipsis />
            </Message>
          )}
          {modalState.status === "UNLOCKED" && (
            <>
              {txState?.status === "PENDING" && (
                <Message>
                  Transaction in progress <Elipsis />
                </Message>
              )}
              {txState?.status === "COMPLETE" && (
                <Message>Transaction complete!</Message>
              )}
            </>
          )}
        </Container>
      );
    case "CONNECT_WALLET":
      return (
        <Container status={modalState.status} closeModal={handleCloseModal}>
          <Heading>Connecting Wallet</Heading>
          <Message>
            Awaiting user response
            <Elipsis />
          </Message>
        </Container>
      );
    case "APPROVAL":
      return (
        <Container status={modalState.status} closeModal={handleCloseModal}>
          <Heading>Approving Contract</Heading>
          <Message>
            Awaiting user response
            <Elipsis />
          </Message>
        </Container>
      );
    case "CHANGE_NETWORK":
      return (
        <Container status={modalState.status} closeModal={handleCloseModal}>
          <Heading>Changing Network</Heading>
          <Message>
            Awaiting user response
            <Elipsis />
          </Message>
        </Container>
      );
    case "CHANGING_NETWORK":
      return (
        <Container status={modalState.status} closeModal={handleCloseModal}>
          <Heading>Changing Network</Heading>
          <Message>please wait a moment!</Message>
        </Container>
      );
    case "SAFE_TRANSACTION":
      return (
        <Container status={modalState.status} closeModal={handleCloseModal}>
          <Heading>Transaction Submitted</Heading>
        </Container>
      );
    default:
      throw new Error("modal type invalid");
  }
}

export default Modal;
