import { useEffect } from "react";
import { hexToBigInt } from "viem";
import { useContractWrite, usePrepareContractWrite } from "wagmi";

import type { ChainConfiguration } from "@/config";
import {
  useTransactionDisplay,
  type TTransactionDisplayState,
} from "@/app/core/hooks/useTransactionDisplay";
import { useModal } from "@/app/core/hooks/useModal";
import { useToast } from "@/app/core/hooks/useToast";
import { ERC20_ABI } from "@/abi";
import Button from "@/app/core/components/Button";

const MAX_INT = BigInt(
  "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
);

function transactionIsPending(
  transactionDisplay: TTransactionDisplayState
): boolean {
  if (transactionDisplay && transactionDisplay.status === "PENDING") {
    return true;
  }
  return false;
}

interface IProps {
  chainConfig: ChainConfiguration;
}

function ApproveContract({ chainConfig }: IProps) {
  const { state: modalState, dispatch: dispatchModal } = useModal();
  const { dispatch: dispatchToast } = useToast();
  const { state: transactionDisplay, dispatch: dispatchTransactionDisplay } =
    useTransactionDisplay();

  const { DAI, BREAD } = chainConfig;

  const { config } = usePrepareContractWrite({
    address: DAI.address,
    abi: ERC20_ABI,
    functionName: "approve",
    args: [BREAD.address, MAX_INT],
  });

  if (config.request && !config.request.value) {
    config.request.value = BigInt(0);
  }

  const { data, error, isSuccess, write } = useContractWrite(config);

  useEffect(() => {
    if (error) {
      if (modalState) dispatchModal({ type: "CLEAR_MODAL" });
      dispatchToast({
        type: "SET_TOAST",
        payload: {
          type: "ERROR",
          message: "transaction failed",
        },
      });
    }
    if (isSuccess && data) {
      dispatchModal({ type: "CLEAR_MODAL" });
      dispatchTransactionDisplay({
        type: "SET_PENDING",
        payload: {
          status: "PENDING",
          hash: data.hash,
        },
      });
    }
  }, [
    isSuccess,
    data,
    error,
    dispatchModal,
    dispatchToast,
    dispatchTransactionDisplay,
    modalState,
  ]);

  const handleApproveContract = async () => {
    dispatchModal({
      type: "SET_MODAL",
      payload: { type: "APPROVAL", title: "Approving BREAD Contract" },
    });
    write?.();
  };

  return (
    <div className="flex flex-col gap-6 w-full">
      <Button
        data-test="approve_contract_btn"
        onClick={handleApproveContract}
        variant="large"
        fullWidth={true}
        disabled={transactionIsPending(transactionDisplay)}
      >
        Approve Contract
      </Button>
      <div className="px-2 pb-4 text-sm font-medium text-neutral-400">
        You&apos;ll need to approve the BREAD contract to mint BREAD
      </div>
    </div>
  );
}

export default ApproveContract;
