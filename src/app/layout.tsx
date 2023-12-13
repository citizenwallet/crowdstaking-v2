"use client";
import "./app.css";
import Header from "./core/components/Header";
import { WagmiProvider } from "./core/hooks/WagmiProvider/WagmiProvider";
import { TokenBalancesProvider } from "./core/context/TokenBalanceContext";
import { ConnectedUserProvider } from "./core/hooks/useConnectedUser";
import { AnimatePresence } from "framer-motion";
import Footer from "./core/components/Footer";
import { ReactNode } from "react";
import clsx from "clsx";
import { pressStart, redhat } from "./core/components/Fonts";

import "@rainbow-me/rainbowkit/styles.css";
import { TransactionsProvider } from "./core/context/TransactionsContext/TransactionsContext";
import { Toaster } from "./core/components/Toaster/Toaster";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={clsx("relative", pressStart.variable, redhat.variable)}>
        <WagmiProvider>
          <ConnectedUserProvider>
            <TokenBalancesProvider>
              <TransactionsProvider>
                <Layout>{children}</Layout>
              </TransactionsProvider>
            </TokenBalancesProvider>
          </ConnectedUserProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <AnimatePresence
        //  initial={false}
        mode="wait"
        // onExitComplete={() => null}
      ></AnimatePresence>
      <AnimatePresence
        //  initial={false}
        mode="wait"
        // onExitComplete={() => null}
      ></AnimatePresence>
      <div className="flex min-h-screen flex-col">
        <Header />
        <Toaster />
        {children}
        <Footer />
      </div>
    </>
  );
}
