import { useWriteContract, useSimulateContract } from "wagmi";
import { parseEther, encodeFunctionData } from "viem";
import {
  TUserConnected,
  TUserSignatureConnected,
} from "@/app/core/hooks/useConnectedUser";
import { BREAD_ABI } from "@/abi";
import Button from "@/app/core/components/Button";
import { getChain } from "@/chainConfig";
import useDebounce from "@/app/bakery/hooks/useDebounce";
import { useTransactions } from "@/app/core/context/TransactionsContext/TransactionsContext";
import { useEffect, useState } from "react";
import SafeAppsSDK from "@safe-global/safe-apps-sdk/dist/src/sdk";
import { TransactionStatus } from "@safe-global/safe-apps-sdk";
import { useModal } from "@/app/core/context/ModalContext";
import { ExternalLink } from "@/app/core/components/ExternalLink";
import SwapBreadButton from "@/app/bakery/components/Swap/SwapBreadButton";
import { generateCalldataLink } from "@citizenwallet/sdk";

export default function Burn({
  user,
  connectedUser,
  inputValue,
  clearInputValue,
  isSafe,
}: {
  user?: TUserConnected;
  connectedUser?: TUserSignatureConnected;
  inputValue: string;
  clearInputValue: () => void;
  isSafe: boolean;
}) {
  const { transactionsState, transactionsDispatch } = useTransactions();
  const [buttonIsEnabled, setButtonIsEnabled] = useState(false);
  const { BREAD } = getChain(
    connectedUser?.community.primaryToken.chain_id ??
      user?.chain?.id ??
      "DEFAULT"
  );
  const { setModal } = useModal();
  const debouncedValue = useDebounce(inputValue, 500);

  const parsedValue = parseEther(
    debouncedValue === "." ? "0" : debouncedValue || "0"
  );

  const userAddress = connectedUser?.address ?? user?.address ?? "0x";

  const {
    data: prepareConfig,
    status: prepareStatus,
    error: prepareError,
  } = useSimulateContract({
    address: BREAD.address,
    abi: BREAD_ABI,
    functionName: "burn",
    args: [parsedValue, userAddress],
    query: {
      enabled: parseFloat(debouncedValue) > 0,
    },
  });

  useEffect(() => {
    setButtonIsEnabled(false);
    if (connectedUser && parseFloat(debouncedValue) > 0) {
      setButtonIsEnabled(true);
    }
  }, [setButtonIsEnabled, connectedUser, debouncedValue]);

  useEffect(() => {
    console.log("prepareStatus", prepareStatus);
    if (prepareStatus === "success") setButtonIsEnabled(true);
  }, [debouncedValue, prepareStatus, setButtonIsEnabled]);

  const {
    writeContract,
    isPending: writeIsLoading,
    isError: writeIsError,
    error: writeError,
    isSuccess: writeIsSuccess,
    data: writeData,
  } = useWriteContract();

  useEffect(() => {
    (async () => {
      if (!writeData) return;
      if (transactionsState.submitted.find((tx) => tx.hash === writeData)) {
        return;
      }
      if (isSafe) {
        const safeSdk = new SafeAppsSDK();
        const tx = await safeSdk.txs.getBySafeTxHash(writeData);
        if (tx.txStatus === TransactionStatus.AWAITING_CONFIRMATIONS) {
          transactionsDispatch({
            type: "SET_SAFE_SUBMITTED",
            payload: { hash: writeData },
          });
          setModal({
            type: "BAKERY_TRANSACTION",
            hash: null,
          });
          return;
        }
      }
      // not safe
      transactionsDispatch({
        type: "SET_SUBMITTED",
        payload: { hash: writeData },
      });
      setModal({
        type: "BAKERY_TRANSACTION",
        hash: writeData,
      });
      clearInputValue();
    })();
  }, [
    writeData,
    transactionsState,
    transactionsDispatch,
    clearInputValue,
    isSafe,
    setModal,
  ]);

  useEffect(() => {
    if (!writeIsError && !writeError) return;
    setModal(null);
  }, [writeIsError, writeError, setModal]);

  const handleBurnRequest = () => {
    setModal({
      type: "CONFIRM_BURN",
      breadValue: inputValue,
      xdaiValue: debouncedValue,
      write: () => writeContract(prepareConfig!.request),
    });
  };

  const handleConnectedUserBurnRequest = () => {
    if (!connectedUser?.redirectUrl) return;

    setModal({
      type: "CONFIRM_BURN",
      breadValue: inputValue,
      xdaiValue: debouncedValue,
      write: async () => {
        const calldata = encodeFunctionData({
          abi: BREAD_ABI,
          functionName: "burn",
          args: [parsedValue, userAddress],
        });

        const calldataUrl = generateCalldataLink(
          connectedUser.redirectUrl,
          connectedUser.community,
          BREAD.address,
          parsedValue,
          calldata
        );

        console.log("calldataUrl", calldataUrl);
        window.open(calldataUrl);

        // TODO: this should be called on the resulting success navigation by the app
        // transactionsDispatch({
        //   type: "SET_SUBMITTED",
        //   payload: { hash: "0x" },
        // });
        // setModal({
        //   type: "BAKERY_TRANSACTION",
        //   hash: "0x",
        // });
        // clearInputValue();
      },
    });
  };

  return (
    <div className="relative">
      <div className="group">
        <SwapBreadButton withRecommended={true} />
      </div>
      <div className="m-3"></div>
      <Button
        fullWidth={true}
        size="xl"
        variant={"cancel"}
        disabled={!buttonIsEnabled}
        onClick={
          connectedUser ? handleConnectedUserBurnRequest : handleBurnRequest
        }
      >
        Burn
      </Button>
    </div>
  );
}
