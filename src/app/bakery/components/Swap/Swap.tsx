"use client";
import type { ChangeEvent } from "react";
import { useCallback, useEffect, useState } from "react";
import { useChainModal } from "@rainbow-me/rainbowkit";

import { FromPanel } from "./FromPanel";
import SwapReverse from "../SwapReverse";
import ToPanel from "./ToPanel";
import Transaction from "../Transaction";
import { sanitizeInputValue } from "../swapUtils";
import { useTransactionDisplay } from "@/app/core/hooks/useTransactionDisplay";
import { useConnectedUser } from "@/app/core/hooks/useConnectedUser";
import Button from "@/app/core/components/Button";
import ConnectWallet from "@/app/core/components/ConnectWallet";
import Bake from "./Bake";
import { useTokenBalances } from "@/app/core/context/TokenBalanceContext";
import Burn from "./Burn";
import { Address } from "viem";
// import { useFeeData } from "wagmi";
// import { formatEther } from "viem";

export type TSwapMode = "BAKE" | "BURN";

export type TSwapState = {
  mode: TSwapMode;
  value: string;
};

const initialSwapState: TSwapState = {
  mode: "BAKE",
  value: "",
};

export function Swap() {
  const { user } = useConnectedUser();
  const [connectedAccountAddress, setConnectedAccountAddress] =
    useState<null | Address>(null);
  // const { data: feeData, isError, isLoading } = useFeeData();

  useEffect(() => {
    if (user.status === "CONNECTED") {
      if (connectedAccountAddress !== user.address) {
        setConnectedAccountAddress(user.address);
        setSwapState((state) => ({ ...state, value: "" }));
      }
    }
  }, [user, connectedAccountAddress]);

  const clearInputValue = () => {
    setSwapState((state) => ({ ...state, value: "" }));
  };

  const { state: transactionDisplay, dispatch: dispatchTransactionDisplay } =
    useTransactionDisplay();
  const [swapState, setSwapState] = useState<TSwapState>(initialSwapState);
  const { openChainModal } = useChainModal();

  const { xDAI, BREAD } = useTokenBalances();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (transactionDisplay && transactionDisplay.status !== "PENDING") {
      dispatchTransactionDisplay({ type: "CLEAR" });
    }
    const { value } = event.target;

    const sanitizedValue = sanitizeInputValue(value);
    setSwapState({
      ...swapState,
      value: sanitizedValue,
    });
  };

  const handleSwapReverse = () => {
    setSwapState((state) => ({
      mode: state.mode === "BAKE" ? "BURN" : "BAKE",
      value: "",
    }));
  };

  const handleBalanceClick = (value: string) => {
    setSwapState((state) => ({
      ...state,
      value:
        state.mode === "BAKE"
          ? parseFloat(value) - 0.01 > 0
            ? (parseFloat(value) - 0.01).toString()
            : "00.00"
          : parseFloat(value) === 0
          ? "00.00"
          : value,
    }));
  };

  return (
    <div className="w-full p-2 sm:p-4">
      <div className="w-full max-w-[30rem] m-auto relative rounded-xl bg-breadgray-grey200 border-breadgray-burnt flex flex-col items-center">
        <div className="w-full drop-shadow-swap">
          <div className="w-full px-4 pt-2">
            <h2 className="text-[1.5rem] md:text-[1.9rem] font-medium">
              {swapState.mode === "BAKE" ? "Bake" : "Burn"}
            </h2>
          </div>
          <div className="relative w-full p-2 flex flex-col gap-1">
            <FromPanel
              inputValue={swapState.value}
              swapMode={swapState.mode}
              handleBalanceClick={handleBalanceClick}
              handleInputChange={handleInputChange}
              tokenBalance={swapState.mode === "BAKE" ? xDAI : BREAD}
            />
            <SwapReverse onClick={handleSwapReverse} />
            <ToPanel
              swapMode={swapState.mode}
              inputValue={swapState.value}
              tokenBalance={swapState.mode === "BURN" ? xDAI : BREAD}
            />
          </div>
        </div>
        {(() => {
          switch (user.status) {
            case "LOADING":
              return (
                <div className="p-3 w-full">
                  <div className="h-16 bg-neutral-800 rounded-xl" />
                </div>
              );
            case "NOT_CONNECTED":
              return (
                <div className="p-3 w-full">
                  <ConnectWallet fullWidth={true} variant="large" />
                </div>
              );
            case "UNSUPPORTED_CHAIN":
              return (
                <div className="p-3 w-full">
                  <Button
                    fullWidth={true}
                    variant="large"
                    onClick={() => openChainModal?.()}
                  >
                    Switch Chain
                  </Button>
                </div>
              );
            case "CONNECTED":
              return swapState.mode === "BAKE" ? (
                <Bake user={user} inputValue={swapState.value} />
              ) : (
                <Burn user={user} inputValue={swapState.value} />
              );
          }
        })()}

        {user.status === "CONNECTED" && transactionDisplay && (
          <Transaction
            status={transactionDisplay.status}
            hash={transactionDisplay.hash}
            user={user}
          />
        )}
      </div>
      {/* <pre>
        {JSON.stringify(
          feeData
            ? {
                lastBaseFeePerGas: feeData.lastBaseFeePerGas
                  ? formatEther(feeData.lastBaseFeePerGas)
                  : null,
                gasPrice: feeData.gasPrice
                  ? formatEther(feeData.gasPrice)
                  : null,

                maxFeePerGas: feeData.maxFeePerGas
                  ? formatEther(feeData.maxFeePerGas)
                  : null,

                maxPriorityFeePerGas: feeData.maxPriorityFeePerGas
                  ? formatEther(feeData.maxPriorityFeePerGas)
                  : null,
                //  gasPrice: bigint | null;
                //  maxFeePerGas: bigint | null;
                //  maxPriorityFeePerGas: bigint | null;
              }
            : "bloop",
          null,
          2
        )}
      </pre> */}
    </div>
  );
}

export default Swap;
