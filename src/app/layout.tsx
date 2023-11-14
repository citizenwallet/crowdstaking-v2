"use client";
import "./app.css";
import type { Metadata } from "next";
import Header from "./core/components/Header";
import WagmiProvider from "./core/hooks/WagmiProvider";
import { ConnectedUserProvider } from "./core/hooks/useConnectedUser";
import { TransactionDisplayProvider } from "./core/hooks/useTransactionDisplay";
import { ModalProvider, useModal } from "./core/hooks/useModal";
import { ToastProvider, useToast } from "./core/hooks/useToast";
import { AnimatePresence } from "framer-motion";
import Modal from "./core/components/Modal";
import Toast from "./core/components/Toast";
import Footer from "./core/components/Footer";
import { ReactNode } from "react";
import clsx from "clsx";
import { pressStart, redhat } from "./core/components/Fonts";

import "@rainbow-me/rainbowkit/styles.css";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx("relative", pressStart.variable, redhat.variable)}>
        <WagmiProvider>
          <ConnectedUserProvider>
            <TransactionDisplayProvider>
              <ModalProvider>
                <ToastProvider>
                  <Layout>{children}</Layout>
                </ToastProvider>
              </ModalProvider>
            </TransactionDisplayProvider>
          </ConnectedUserProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}

function Layout({ children }: { children: ReactNode }) {
  const { state: toast } = useToast();

  return (
    <>
      <AnimatePresence
        //  initial={false}
        mode="wait"
        // onExitComplete={() => null}
      >
        <Modal />
      </AnimatePresence>
      <AnimatePresence
        //  initial={false}
        mode="wait"
        // onExitComplete={() => null}
      >
        {toast && <Toast type={toast.type} message={toast.message} />}
      </AnimatePresence>
      <div className="flex min-h-screen flex-col">
        <Header />
        {children}
        <Footer />
      </div>
    </>
  );
}
