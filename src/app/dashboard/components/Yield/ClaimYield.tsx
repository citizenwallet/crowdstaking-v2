import { useEffect } from "react";
import { parseEther } from "viem";
import { useContractWrite } from "wagmi";

import type { ChainConfiguration } from "@/config";
import { useConnectedUser } from "@/app/core/hooks/useConnectedUser";
import { useModal } from "@/app/core/hooks/useModal";
import { useToast } from "@/app/core/hooks/useToast";
import { useTransactionDisplay } from "@/app/core/hooks/useTransactionDisplay";
import { BREAD_GNOSIS_ABI } from "@/abi";
import Button from "@/app/core/components/Button";
import ConnectWallet from "@/app/core/components/ConnectWallet";
import Elipsis from "@/app/core/components/Elipsis";
import useClaimableYield from "@/app/dashboard/hooks/useClaimableYield";

function ClaimYieldButton({ config }: { config: ChainConfiguration }) {
  const { state: modalState, dispatch: dispatchModal } = useModal();
  const { dispatch: dispatchToast } = useToast();
  const { dispatch: dispatchTransactionDisplay } = useTransactionDisplay();

  const { claimable } = useClaimableYield();

  const parsedAmount = parseEther(claimable ? claimable : "0");

  const {
    error: writeError,
    data: writeData,
    isSuccess,
    write,
  } = useContractWrite({
    address: config.BREAD.address,
    abi: BREAD_GNOSIS_ABI,
    functionName: "claimYield",
    args: [parsedAmount],
  });

  const handleSubmit = async () => {
    dispatchModal({
      type: "SET_MODAL",
      payload: {
        type: "CLAIMING",
      },
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
    }
    if (isSuccess && writeData) {
      if (modalState) dispatchModal({ type: "UNLOCK_MODAL" });
      dispatchTransactionDisplay({
        type: "SET_PENDING",
        payload: {
          status: "PENDING",
          hash: writeData.hash,
        },
      });
    }
  }, [
    writeError,
    isSuccess,
    writeData,
    dispatchModal,
    dispatchToast,
    dispatchTransactionDisplay,
    modalState,
  ]);

  return <Button onClick={handleSubmit}>Claim</Button>;
}

interface IProps {
  amount: string;
}

export default function ClaimYield() {
  const { user } = useConnectedUser();

  return (
    <section className="m-auto flex w-2/3 items-center justify-between p-6">
      {user === null && (
        <>
          <span>connect wallet to claim</span>
          <ConnectWallet variant="regular" />
        </>
      )}
      {user.status === "LOADING" && <Elipsis />}
      {user && user.status === "CONNECTED" && (
        <>
          <span>Claim Yield</span>
          <ClaimYieldButton config={user.config} />
        </>
      )}
    </section>
  );
}
