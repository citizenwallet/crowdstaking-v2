import { BUTTERED_BREAD_ABI } from "@/abi";
import useDebounce from "@/app/bakery/hooks/useDebounce";
import Button from "@/app/core/components/Button";
import { useModal } from "@/app/core/context/ModalContext";
import { useTransactions } from "@/app/core/context/TransactionsContext/TransactionsContext";
import {
  TUserConnected,
  useConnectedUser,
} from "@/app/core/hooks/useConnectedUser";
import { useTokenBalance } from "@/app/core/hooks/useTokenBalance";
import { getConfig } from "@/chainConfig";
import clsx from "clsx";
import { useState } from "react";
import { formatUnits, parseEther } from "viem";
import { useContractRead } from "wagmi";

export type TransactionType = "DEPOSIT" | "WITHDRAW";

export function VaultPanel() {
  const [inputValue, setInputValue] = useState("");
  const [transactionType, setTransactionType] =
    useState<TransactionType>("DEPOSIT");
  const { user } = useConnectedUser();
  const { transactionsDispatch } = useTransactions();

  const debouncedValue = useDebounce(inputValue, 500);

  const parsedValue = parseEther(
    debouncedValue === "." ? "0" : debouncedValue || "0"
  );

  const { setModal } = useModal();

  return (
    <div>
      <div className="flex w-full">
        <div className="grow">
          <div className="flex gap-20">
            <button
              className={clsx(
                "bg-breadgray-burnt rounded-full font-bold",
                transactionType === "DEPOSIT" &&
                  "border-2 border-breadpink-pink"
              )}
              onClick={() => setTransactionType("DEPOSIT")}
            >
              Lock
            </button>
            <button
              className={clsx(
                "bg-breadgray-burnt rounded-full font-bold",
                transactionType === "WITHDRAW" &&
                  "border-2 border-breadpink-pink"
              )}
              onClick={() => setTransactionType("WITHDRAW")}
            >
              Unlock
            </button>
          </div>
        </div>
        {user.status === "CONNECTED" && (
          <div>
            <LockedTokenBalance user={user} />
            <LPTokenBalance user={user} />
          </div>
        )}
      </div>
      <form>
        <input
          type="text"
          value={inputValue}
          className="text-breadgray-grey100"
          onChange={(event) => {
            console.log(event.target.value);
            setInputValue(event.target.value);
          }}
        />
        {user.status === "CONNECTED" ? (
          <Button
            onClick={() => {
              setModal({
                type: "LP_VAULT_TRANSACTION",
                transactionType: transactionType,
                parsedValue,
              });
            }}
          >
            {transactionType === "WITHDRAW" ? "Unlock" : "Lock"} Tokens
          </Button>
        ) : (
          <div>Connect Wallet</div>
        )}
      </form>
    </div>
  );
}

function LPTokenBalance({
  user,
}: // tokenAddress,
{
  user: TUserConnected;
  // tokenAddress: Hex;
}) {
  const chainConfig = getConfig(user.chain.id);
  const tokenBalance = useTokenBalance(user, chainConfig.LP_TOKEN.address);
  return tokenBalance.status === "success" ? (
    <div>LP Token Balance: {formatUnits(tokenBalance.data as bigint, 18)}</div>
  ) : null;
}

function LockedTokenBalance({
  user,
}: // tokenAddress,
{
  user: TUserConnected;
  // tokenAddress: Hex;
}) {
  const chainConfig = getConfig(user.chain.id);
  const lockedBalance = useContractRead({
    address: chainConfig.BUTTERED_BREAD.address,
    abi: BUTTERED_BREAD_ABI,
    functionName: "accountToLPBalance",
    args: [user.address, chainConfig.LP_TOKEN.address],
    watch: true,
  });
  return lockedBalance.status === "success" ? (
    <div>Locked Tokens: {formatUnits(lockedBalance.data as bigint, 18)}</div>
  ) : null;
}
