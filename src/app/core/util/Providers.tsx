import "../../app.css";
import React, { type ReactNode } from "react";
import { WagmiProvider } from "../hooks/WagmiProvider";
import { ConnectedUserProvider } from "../hooks/useConnectedUser";
import { ModalProvider } from "../hooks/useModal";
import { ToastProvider } from "../hooks/useToast";
import { TransactionDisplayProvider } from "../hooks/useTransactionDisplay";

export const Providers = ({ children }: { children: ReactNode }) => (
  <WagmiProvider>
    <ConnectedUserProvider>
      <ModalProvider>
        <TransactionDisplayProvider>
          <ToastProvider>{children}</ToastProvider>
        </TransactionDisplayProvider>
      </ModalProvider>
    </ConnectedUserProvider>
  </WagmiProvider>
);
