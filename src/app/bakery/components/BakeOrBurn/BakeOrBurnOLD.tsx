import { useEffect } from "react";
import { parseEther } from "viem";
import {
  useContractEvent,
  useContractWrite,
  usePrepareContractWrite,
  useWalletClient,
} from "wagmi";

import PreparingTransaction from "./PreparingTransaction";
import type { UseTokenBalanceResult } from "@/app/bakery/hooks/useTokenBalance";
import { BREAD_POLYGON_ABI } from "@/abi";
import type { ChainConfiguration } from "@/config";
import { useModal } from "@/app/core/hooks/useModal";
import { useTransactionDisplay } from "@/app/core/hooks/useTransactionDisplay";
import { useToast } from "@/app/core/hooks/useToast";
import useDebounce from "@/app/bakery/hooks/useDebounce";
import Button from "@/app/core/components/Button";
import { BREAD_ADDRESS } from "@/constants";

import SafeAppsSDK, { TransactionStatus } from "@safe-global/safe-apps-sdk";

const { abi } = BREAD_POLYGON_ABI;

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

export default BakeOrBurn;

/*

Example response to checking safe sdk for tx hash 

{
    "safeAddress": "0xf6fA97A91e3d190e067846269aaAdECBC9A8C87a",
    "txId": "multisig_0xf6fA97A91e3d190e067846269aaAdECBC9A8C87a_0x7de0a709e0da273728c02a123d1533e412604c5d1935ebbcce1423e9a9b0a30a",
    "executedAt": null,
    "txStatus": "AWAITING_CONFIRMATIONS",
    "txInfo": {
        "type": "Custom",
        "to": {
            "value": "0x11d9efDf4Ab4A3bfabf5C7089F56AA4F059AA14C",
            "name": "Breadchain Stablecoin",
            "logoUri": "https://safe-transaction-assets.safe.global/tokens/logos/0x11d9efDf4Ab4A3bfabf5C7089F56AA4F059AA14C.png"
        },
        "dataSize": "68",
        "value": "0",
        "methodName": "burn",
        "actionCount": null,
        "isCancellation": false
    },
    "txData": {
        "hexData": "0xfcd3533c0000000000000000000000000000000000000000000000000de0b6b3a7640000000000000000000000000000f6fa97a91e3d190e067846269aaadecbc9a8c87a",
        "dataDecoded": {
            "method": "burn",
            "parameters": [
                {
                    "name": "_tokenId",
                    "type": "uint256",
                    "value": "1000000000000000000"
                },
                {
                    "name": "_of",
                    "type": "address",
                    "value": "0xf6fA97A91e3d190e067846269aaAdECBC9A8C87a"
                }
            ]
        },
        "to": {
            "value": "0x11d9efDf4Ab4A3bfabf5C7089F56AA4F059AA14C",
            "name": "Breadchain Stablecoin",
            "logoUri": "https://safe-transaction-assets.safe.global/tokens/logos/0x11d9efDf4Ab4A3bfabf5C7089F56AA4F059AA14C.png"
        },
        "value": "0",
        "operation": 0,
        "trustedDelegateCallTarget": null,
        "addressInfoIndex": null
    },
    "txHash": null,
    "detailedExecutionInfo": {
        "type": "MULTISIG",
        "submittedAt": 1693398131768,
        "nonce": 6,
        "safeTxGas": "0",
        "baseGas": "0",
        "gasPrice": "0",
        "gasToken": "0x0000000000000000000000000000000000000000",
        "refundReceiver": {
            "value": "0x0000000000000000000000000000000000000000",
            "name": null,
            "logoUri": null
        },
        "safeTxHash": "0x7de0a709e0da273728c02a123d1533e412604c5d1935ebbcce1423e9a9b0a30a",
        "executor": null,
        "signers": [
            {
                "value": "0x8a35D1EB766f4f0Cb3Bb34760B7628f3e04c1c0d",
                "name": null,
                "logoUri": null
            }
        ],
        "confirmationsRequired": 1,
        "confirmations": [],
        "rejectors": [],
        "gasTokenInfo": null,
        "trusted": false
    },
    "safeAppInfo": null
}



////////////////////////////

{
    "safeAddress": "0xf6fA97A91e3d190e067846269aaAdECBC9A8C87a",
    "txId": "multisig_0xf6fA97A91e3d190e067846269aaAdECBC9A8C87a_0xcf3b59aa1cb02f6aefaf5f3bc7b16454fa01690e05ab9db3333461888ef8d11a",
    "executedAt": null,
    "txStatus": "AWAITING_CONFIRMATIONS",
    "txInfo": {
        "type": "Custom",
        "to": {
            "value": "0x11d9efDf4Ab4A3bfabf5C7089F56AA4F059AA14C",
            "name": "Breadchain Stablecoin",
            "logoUri": "https://safe-transaction-assets.safe.global/tokens/logos/0x11d9efDf4Ab4A3bfabf5C7089F56AA4F059AA14C.png"
        },
        "dataSize": "68",
        "value": "0",
        "methodName": "burn",
        "actionCount": null,
        "isCancellation": false
    },
    "txData": {
        "hexData": "0xfcd3533c0000000000000000000000000000000000000000000000001f10e5478e619874000000000000000000000000f6fa97a91e3d190e067846269aaadecbc9a8c87a",
        "dataDecoded": {
            "method": "burn",
            "parameters": [
                {
                    "name": "_tokenId",
                    "type": "uint256",
                    "value": "2238541110297335924"
                },
                {
                    "name": "_of",
                    "type": "address",
                    "value": "0xf6fA97A91e3d190e067846269aaAdECBC9A8C87a"
                }
            ]
        },
        "to": {
            "value": "0x11d9efDf4Ab4A3bfabf5C7089F56AA4F059AA14C",
            "name": "Breadchain Stablecoin",
            "logoUri": "https://safe-transaction-assets.safe.global/tokens/logos/0x11d9efDf4Ab4A3bfabf5C7089F56AA4F059AA14C.png"
        },
        "value": "0",
        "operation": 0,
        "trustedDelegateCallTarget": null,
        "addressInfoIndex": null
    },
    "txHash": null,
    "detailedExecutionInfo": {
        "type": "MULTISIG",
        "submittedAt": 1693403187368,
        "nonce": 8,
        "safeTxGas": "0",
        "baseGas": "0",
        "gasPrice": "0",
        "gasToken": "0x0000000000000000000000000000000000000000",
        "refundReceiver": {
            "value": "0x0000000000000000000000000000000000000000",
            "name": null,
            "logoUri": null
        },
        "safeTxHash": "0xcf3b59aa1cb02f6aefaf5f3bc7b16454fa01690e05ab9db3333461888ef8d11a",
        "executor": null,
        "signers": [
            {
                "value": "0x8a35D1EB766f4f0Cb3Bb34760B7628f3e04c1c0d",
                "name": null,
                "logoUri": null
            }
        ],
        "confirmationsRequired": 1,
        "confirmations": [],
        "rejectors": [],
        "gasTokenInfo": null,
        "trusted": false
    },
    "safeAppInfo": null
}
*/
