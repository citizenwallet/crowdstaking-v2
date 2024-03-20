import { useEffect } from "react";
import { parseEther } from "viem";
import {
  useContractEvent,
  useContractWrite,
  usePrepareContractWrite,
  useWalletClient,
} from "wagmi";

import type { UseTokenBalanceResult } from "@/app/bakery/hooks/useTokenBalance";
import { BREAD_GNOSIS_ABI } from "@/abi";
import type { ChainConfiguration } from "@/config";
import { useModal } from "@/app/core/hooks/useModal";
import { useTransactionDisplay } from "@/app/core/hooks/useTransactionDisplay";
import { useToast } from "@/app/core/hooks/useToast";
import useDebounce from "@/app/bakery/hooks/useDebounce";
import Button from "@/app/core/components/Button";
import { BREAD_ADDRESS } from "@/constants";

import SafeAppsSDK, { TransactionStatus } from "@safe-global/safe-apps-sdk";
import PreparingTransaction from "../BakeOrBurn/PreparingTransaction";

const { abi } = BREAD_GNOSIS_ABI;

interface IProps {
  mode: "BAKE" | "BURN";
  value: string;
  balanceReadings: UseTokenBalanceResult;
  accountAddress: string;
  chainConfig: ChainConfiguration;
  clearInputValue: () => void;
}

new SafeAppsSDK();

function BakeOrBurn({
  mode,
  value,
  balanceReadings,
  chainConfig,
  accountAddress,
  clearInputValue,
}: IProps) {
  // const { data: daiAllowance, status: daiAllowanceStatus } = useDAIAllowance({
  //   user,
  // });

  // if (daiAllowance !== "0") {
  //   return (
  //     <div className="p-3 w-full">
  //       <Button fullWidth={true} variant="large" onClick={() => {}}>
  //         {mode === "BAKE" ? "Bake" : "Burn"}
  //       </Button>
  //     </div>
  //   );
  // }
  // return <ApproveContract chainConfig={user.config} />;

  const { state: modalState, dispatch: dispatchModal } = useModal();
  const { dispatch: dispatchToast } = useToast();
  const { dispatch: dispatchTransactionDisplay } = useTransactionDisplay();

  const { data: walletClient, isError, isLoading } = useWalletClient();

  const debouncedValue = useDebounce(value, 500);

  const { BREAD } = chainConfig;

  const parsedValue = parseEther(
    debouncedValue === "." ? "0" : debouncedValue || "0"
  );

  const prepareResult = usePrepareContractWrite({
    address: BREAD.address,
    abi,
    functionName: mode === "BAKE" ? "mint" : "burn",
    args: [parsedValue, accountAddress],
    enabled:
      parseFloat(debouncedValue) > 0 &&
      !!balanceReadings.value &&
      parseFloat(debouncedValue) <= parseFloat(balanceReadings.value),
  });

  const { config, status: prepareStatus } = prepareResult;

  if (config.request && !config.request.value) {
    config.request.value = BigInt(0);
  }

  const {
    error: writeError,
    data: writeData,
    isSuccess,
    write,
  } = useContractWrite(config);

  const handleSubmit = async () => {
    dispatchModal({
      type: "SET_MODAL",
      payload: (() => {
        if (mode === "BAKE") {
          return {
            type: "BAKING",
            title: `Baking ${value} BREAD`,
          };
        }
        return {
          type: "BURNING",
          title: `Burning ${value} BREAD`,
        };
      })(),
    });

    write?.();
  };

  useEffect(() => {
    if (writeError) {
      if (modalState) dispatchModal({ type: "CLEAR_MODAL" });
      dispatchToast({
        type: "SET_TOAST",
        payload: {
          type: "ERROR",
          message: "transaction failed",
        },
      });
      clearInputValue();
    }
  }, [writeError, dispatchModal, dispatchToast, clearInputValue, modalState]);

  //
  useEffect(() => {
    (async () => {
      if (isSuccess && writeData) {
        if (walletClient) {
          console.log({ walletClient });
        }

        // TODO only run this if we're in the SAFE app
        // const safeSdk = new SafeAppsSDK();
        // const tx = await safeSdk.txs.getBySafeTxHash(writeData.hash);
        // if (tx.txStatus !== TransactionStatus.SUCCESS) {
        //   // Update Modal
        //   console.log("-------------------");
        //   console.log("awaited safe tx: ", tx);
        //   console.log("writeData: ", writeData);
        //   console.log("-------------------");
        //   dispatchModal({
        //     type: "SET_MODAL",
        //     payload: {
        //       type: "SAFE_TRANSACTION",
        //       title: tx.txStatus,
        //     },
        //   });
        //   return;
        // }

        console.log("tx pending");
        console.log(writeData);

        if (modalState) dispatchModal({ type: "UNLOCK_MODAL" });
        dispatchTransactionDisplay({
          type: "SET_PENDING",
          payload: {
            status: "PENDING",
            hash: writeData.hash,
          },
        });
        clearInputValue();
      }
    })();
  }, [
    writeError,
    isSuccess,
    writeData,
    dispatchModal,
    dispatchTransactionDisplay,
    modalState,
    clearInputValue,
    walletClient,
  ]);

  return (
    <>
      <Button
        onClick={handleSubmit}
        disabled={prepareStatus !== "success"}
        variant="large"
        fullWidth
      >
        {mode === "BURN" ? "BURN BREAD" : "BAKE BREAD"}
      </Button>
      {prepareStatus === "loading" && <PreparingTransaction />}
    </>
  );
}
[];
