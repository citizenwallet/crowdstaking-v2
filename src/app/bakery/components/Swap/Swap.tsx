import type { ChangeEvent } from "react";
import { useEffect, useState } from "react";

import type { ChainConfiguration } from "@/config";

// import Button from '../Button';
import ApproveContract from "../ApproveContract";
// import BakeOrBurn from "../BakeOrBurn/BakeOrBurn";
import BakeOrBurn from "../BakeOrBurn/BakeOrBurn2";

import CheckingApproval from "../CheckingApproval";
import FromPanel from "../FromPanel";
import SwapReverse from "../SwapReverse";
import ToPanel from "../ToPanel";
import Transaction from "../Transaction";
import { sanitizeInputValue } from "../swapUtils";
import { useToast } from "@/app/core/hooks/useToast";
import { useTransactionDisplay } from "@/app/core/hooks/useTransactionDisplay";
import { useTokenBalance } from "../../hooks/useTokenBalance";
import { useTokenAllowance } from "../../hooks/useTokenAllowance";
import NativeBalance from "../NativeBalance";
import {
  TUserConnected,
  useConnectedUser,
} from "@/app/core/hooks/useConnectedUser";
import Button from "@/app/core/components/Button";
import ConnectWallet from "@/app/core/components/ConnectWallet";

interface ISwapState {
  mode: "BAKE" | "BURN";
  value: string;
  isContractApproved: null | boolean;
}

const initialSwapState: ISwapState = {
  mode: "BAKE",
  value: "",
  isContractApproved: null,
};

interface IProps {
  user: TUserConnected;
}

export function Swap() {
  const [swapState, setSwapState] = useState<ISwapState>(initialSwapState);

  const { state: transactionDisplay, dispatch: dispatchTransactionDisplay } =
    useTransactionDisplay();
  const { dispatch: dispatchToast } = useToast();
  const { user } = useConnectedUser();

  // const breadBalanceReadings = useTokenBalance(BREAD.address, user.address);
  // const daiBalanceReadings = useTokenBalance(DAI.address, user.address);

  const resetSwapState = () => {
    setSwapState(initialSwapState);
  };

  const clearInputValue = () => {
    setSwapState((state) => ({ ...state, value: "" }));
  };

  // useEffect(() => {
  //   resetSwapState();
  // }, [chainConfig.NETWORK_STRING]);

  // useEffect(() => {
  //   if (daiAllowanceError) {
  //     dispatchToast({
  //       type: "SET_TOAST",
  //       payload: {
  //         type: "ERROR",
  //         message: "Failed to check contract approval",
  //       },
  //     });
  //     return;
  //   }

  //   if (daiAllowanceValue) {
  //     setSwapState((state) => ({
  //       ...state,
  //       isContractApproved: parseFloat(daiAllowanceValue) > 0,
  //     }));
  //   }
  // }, [daiAllowanceStatus, daiAllowanceValue, daiAllowanceError, dispatchToast]);

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
      <div className="w-full max-w-[24rem] m-auto relative rounded-xl bg-breadgray-grey200 border-breadgray-burnt flex flex-col items-center">
        <div className="w-full">
          <div className="w-full px-4 pt-2">
            <h2 className="text-[1.8rem] font-medium">
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
        {user.status === "NOT_CONNECTED" && (
          <div className="p-3 w-full">
            <ConnectWallet fullWidth={true} variant="large" />
          </div>
        )}
        {user.status === "CONNECTED" && (
          <BakeOrBurn user={user} mode={swapState.mode} />
          // {daiAllowanceStatus === "loading" && <CheckingApproval />}
          // {daiAllowanceStatus === "success" &&
          //   (() => {
          //     if (swapState.isContractApproved === true) {
          //       return (
          //         <BakeOrBurn
          //           mode={swapState.mode}
          //           value={swapState.value}
          //           balanceReadings={
          //             swapState.mode === "BAKE"
          //               ? daiBalanceReadings
          //               : breadBalanceReadings
          //           }
          //           accountAddress={user.address}
          //           chainConfig={user.config}
          //           clearInputValue={clearInputValue}
          //           />
          //           );
          //         }
          //     return <ApproveContract chainConfig={user.config} />;
          //   })()}
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
