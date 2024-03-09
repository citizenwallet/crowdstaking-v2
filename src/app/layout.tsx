"use client";
import { ReactNode } from "react";
import clsx from "clsx";

import { pressStart, redhat } from "@/app/core/components/Fonts";
import { WagmiProvider } from "@/app/core/hooks/WagmiProvider/WagmiProvider";
import { TokenBalancesProvider } from "@/app/core/context/TokenBalanceContext/TokenBalanceContext";
import { ConnectedUserProvider } from "@/app/core/hooks/useConnectedUser";
import { TransactionsProvider } from "@/app/core/context/TransactionsContext/TransactionsContext";
import { ToastProvider } from "@/app/core/context/ToastContext/ToastContext";
import Header from "@/app/core/components/Header/Header";
import { Footer } from "@/app/core/components/Footer/Footer";

import "./app.css";
import "@rainbow-me/rainbowkit/styles.css";

export default function App({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "relative bg-[#F0F0F0] dark:bg-breadgray-grey100 dark:text-breadgray-white",
          pressStart.variable,
          redhat.variable
        )}
      >
        <WagmiProvider>
          <ConnectedUserProvider>
            <TokenBalancesProvider>
              <ToastProvider>
                <TransactionsProvider>
                  <Layout>{children}</Layout>
                </TransactionsProvider>
              </ToastProvider>
            </TokenBalancesProvider>
          </ConnectedUserProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}

function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {children}
      <Footer />
    </div>
  );
}
