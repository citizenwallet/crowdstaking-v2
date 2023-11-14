import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";

import type { ChainConfiguration } from "@/config";

// import Button from '../Button';
import ApproveContract from "../ApproveContract";
// import BakeOrBurn from "../BakeOrBurn/BakeOrBurn";
import CheckingApproval from "../CheckingApproval";
import FromPanel from "../FromPanel";
import SwapReverse from "../SwapReverse";
import ToPanel from "../ToPanel";
import Transaction from "../Transaction";
import { sanitizeInputValue } from "../swapUtils";
import { useToast } from "@/app/core/hooks/useToast";
import { useTransactionDisplay } from "@/app/core/hooks/useTransactionDisplay";

import NativeBalance from "../NativeBalance";
import {
  TConnectedUserState,
  TUserConnected,
  useConnectedUser,
} from "@/app/core/hooks/useConnectedUser";
import Button from "@/app/core/components/Button";
import ConnectWallet from "@/app/core/components/ConnectWallet";
import { useDAIAllowance } from "../../hooks/useDAIAllowance";
import Elipsis from "@/app/core/components/Elipsis";
import BakeOrBurn from "../BakeOrBurn";

export type TSwapMode = "BAKE" | "BURN";

export type TSwapState = {
  mode: TSwapMode;
  value: string;
  isContractApproved: null | boolean;
};

const initialSwapState: TSwapState = {
  mode: "BAKE",
  value: "",
  isContractApproved: null,
};

export function Swap() {
  const { user } = useConnectedUser();

  const { state: transactionDisplay, dispatch: dispatchTransactionDisplay } =
    useTransactionDisplay();
  const { dispatch: dispatchToast } = useToast();
  const [swapState, setSwapState] = useState<TSwapState>(initialSwapState);

  const resetSwapState = () => {
    setSwapState(initialSwapState);
  };

  const clearInputValue = () => {
    setSwapState((state) => ({ ...state, value: "" }));
  };

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
      ...state,
      mode: state.mode === "BAKE" ? "BURN" : "BAKE",
    }));
  };

  const handleBalanceClick = (value: string) => {
    setSwapState((state) => ({
      ...state,
      value,
    }));
  };

  return (
    <div className="w-full p-4">
      <div className="w-full max-w-[30rem] m-auto relative rounded-xl bg-breadgray-grey200 border-breadgray-burnt flex flex-col items-center">
        <div className="w-full">
          <div className="w-full px-4 pt-2">
            <h2 className="text-[1.6rem] md:text-[1.8rem] font-medium">
              {swapState.mode === "BAKE" ? "Bake" : "Burn"}
            </h2>
          </div>
          <div className="relative w-full p-2 flex flex-col gap-1">
            <FromPanel
              inputValue={swapState.value}
              tokenType={swapState.mode === "BAKE" ? "DAI" : "BREAD"}
              handleBalanceClick={handleBalanceClick}
              handleInputChange={handleInputChange}
            />
            <SwapReverse onClick={handleSwapReverse} />
            <ToPanel
              inputValue={swapState.value}
              tokenType={swapState.mode === "BAKE" ? "BREAD" : "DAI"}
            />
          </div>
        </div>
        <div className="w-full">
          <div className="p-2 w-full flex flex-col gap-2">
            <div className="w-full p-2 text-neutral-500 rounded-md border-[0.1rem] font-medium border-neutral-800">
              Matic Balance{" "}
              <>
                {user.status === "CONNECTED" && (
                  <NativeBalance address={user.address} />
                )}
                {user.status === "LOADING" && <Elipsis />}
              </>
            </div>
          </div>
        </div>
        {user.status === "LOADING" && (
          <div className="p-3 w-full">
            <div className="h-16 bg-neutral-800 rounded-xl" />
          </div>
        )}
        {user.status === "NOT_CONNECTED" && (
          <div className="p-3 w-full">
            <ConnectWallet fullWidth={true} variant="large" />
          </div>
        )}
        {user.status === "UNSUPPORTED_CHAIN" && <button>Switch Chain</button>}
        {user.status === "CONNECTED" && (
          <BakeOrBurn user={user} mode={swapState.mode} />
        )}
        {user.status === "CONNECTED" && transactionDisplay && (
          <Transaction
            status={transactionDisplay.status}
            hash={transactionDisplay.hash}
            user={user}
          />
        )}
      </div>
    </div>
  );
}

export default Swap;
