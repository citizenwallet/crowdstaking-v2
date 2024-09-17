import { formatUnits, Hex } from "viem";
import Button from "../../Button";
import { ModalContent, ModalHeading } from "../ModalUI";
import { useEffect } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { BUTTERED_BREAD_ABI } from "@/abi";
import { TUserConnected } from "@/app/core/hooks/useConnectedUser";
import { LPVaultTransactionModalState } from "@/app/core/context/ModalContext";
import { getConfig } from "@/chainConfig";
import { TransactionData } from "./LPVaultTransactionModal";
import { TTransaction } from "@/app/core/context/TransactionsContext/TransactionsReducer";

export function WithdrawTransaction({
  user,
  modalState,
  txData,
  setTxData,
  submittedTransaction,
  isConfirmed,
}: {
  user: TUserConnected;
  modalState: LPVaultTransactionModalState;
  txData: TransactionData;
  setTxData: (data: TransactionData) => void;
  submittedTransaction: TTransaction | null;
  isConfirmed: boolean;
}) {
  const chainConfig = getConfig(user.chain.id);
  const lockedBalance = useContractRead({
    address: chainConfig.BUTTERED_BREAD.address,
    abi: BUTTERED_BREAD_ABI,
    functionName: "accountToLPBalance",
    args: [user.address, chainConfig.LP_TOKEN.address],
    watch: true,
  });

  const prepareWrite = usePrepareContractWrite({
    address: chainConfig.BUTTERED_BREAD.address,
    abi: BUTTERED_BREAD_ABI,
    functionName: "withdraw",
    args: [chainConfig.LP_TOKEN.address, modalState.parsedValue],
    enabled:
      lockedBalance.status === "success" &&
      modalState.parsedValue <= (lockedBalance.data as bigint),
  });

  useEffect(() => {
    if (prepareWrite.status === "error") {
      console.log(prepareWrite.error);
    }
  }, [prepareWrite]);

  const contractWrite = useContractWrite(prepareWrite.config);

  useEffect(() => {
    console.log(contractWrite);
    if (contractWrite.status === "success" && contractWrite.data) {
      setTxData({ type: "WITHDRAW", hash: contractWrite.data.hash });
    }
    if (contractWrite.status === "error") {
      console.log(contractWrite.error);
    }
  }, [contractWrite, setTxData]);

  return (
    <>
      <ModalHeading>Unlocking LP Tokens</ModalHeading>
      <div>{formatUnits(modalState.parsedValue, 18)}</div>
      <ModalContent>
        {!isConfirmed && (
          <Button
            onClick={() => {
              if (!contractWrite.write) return;
              console.log("unlocking...");
              contractWrite.write();
            }}
          >
            Unlock
          </Button>
        )}
      </ModalContent>
    </>
  );
}
