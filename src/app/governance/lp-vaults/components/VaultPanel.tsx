import { ReactNode, useState } from "react";
import { formatUnits, parseEther } from "viem";
import { useContractRead } from "wagmi";
import {
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from "@radix-ui/react-accordion";

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
import { SelectTransaction } from "./SelectTransaction";
import { sanitizeInputValue } from "@/app/core/util/sanitizeInput";
import { WXDAIIcon, BreadIcon } from "@/app/core/components/Icons/TokenIcons";

export type TransactionType = "LOCK" | "UNLOCK";

export function VaultPanel() {
  const [inputValue, setInputValue] = useState("");
  const [transactionType, setTransactionType] =
    useState<TransactionType>("LOCK");
  const { user } = useConnectedUser();

  const debouncedValue = useDebounce(inputValue, 500);

  const parsedValue = parseEther(
    debouncedValue === "." ? "0" : debouncedValue || "0"
  );

  const { setModal } = useModal();

  return (
    <AccordionItem
      value="first"
      className="flex w-full flex-col dark:bg-breadgray-grey200 border-2 rounded-xl dark:border-breadgray-burnt"
    >
      <AccordionHeader className="p-4">
        <AccordionTrigger className="flex w-full group">
          <div className="flex pr-4">
            <BreadIcon />
            <div className="transform -translate-x-1">
              <WXDAIIcon />
            </div>
          </div>
          <h2 className="grow text-left font-medium text-xl">BREAD / WXDAI</h2>
          <div className="size-6 text-breadgray-grey100 dark:text-breadgray-ultra-white">
            <svg
              className="w-full h-full fill-current group-data-[state=open]:rotate-180"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7 8H5V10H7V12H9V14H11V16H13V14H15V12H17V10H19V8H17V10H15V12H13V14H11V12H9V10H7V8Z"
              />
            </svg>
          </div>
        </AccordionTrigger>
      </AccordionHeader>
      <AccordionContent className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <section className="col-span-2 lg:col-span-1 flex flex-col gap-4">
            <h2 className="font-bold text-xl">
              Lock LP tokens, get voting power
            </h2>
            <p>
              Enter a desired amount of LP tokens to lock to receive voting
              power. The amount you choose to lock can always be retrieved by
              selecting the unlock button.
            </p>
          </section>
          <div className="col-span-2 lg:col-span-1">
            <div className="py-4">
              <SelectTransaction
                transactionType={transactionType}
                setTransactionType={setTransactionType}
              />
            </div>
            <div className="text-xs text-breadgray-grey pb-2">You deposit</div>
            <form className="flex flex-col gap-4">
              <div className="p-4 bg-breadgray-charcoal rounded-md border border-breadgray-rye">
                <input
                  type="text"
                  value={inputValue}
                  className="text-breadgray-ultra-lightgrey bg-[#00000000] text-4xl placeholder-breadgray-grey100 dark:placeholder-neutral-200 max-w-full"
                  onChange={(event) => {
                    setInputValue(sanitizeInputValue(event.target.value));
                  }}
                  placeholder="00.00"
                  inputMode="decimal"
                  autoComplete="off"
                  autoCorrect="off"
                  pattern="^[0-9]*[.,]?[0-9]*$"
                  minLength={1}
                  maxLength={79}
                  spellCheck="false"
                />
              </div>
              {user.status === "CONNECTED" ? (
                <Button
                  size="large"
                  onClick={() => {
                    console.log({ transactionType });
                    setModal({
                      type: "LP_VAULT_TRANSACTION",
                      transactionType: transactionType,
                      parsedValue,
                    });
                  }}
                >
                  {transactionType === "UNLOCK" ? "Unlock" : "Lock"} LP Tokens
                </Button>
              ) : (
                <div>Connect Wallet</div>
              )}
            </form>
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}

// function LPTokenBalance({
//   user,
// }: // tokenAddress,
// {
//   user: TUserConnected;
//   // tokenAddress: Hex;
// }) {
//   const chainConfig = getConfig(user.chain.id);
//   const tokenBalance = useTokenBalance(user, chainConfig.LP_TOKEN.address);
//   return tokenBalance.status === "success" ? (
//     <div>LP Token Balance: {formatUnits(tokenBalance.data as bigint, 18)}</div>
//   ) : null;
// }

// function LockedTokenBalance({
//   user,
// }: // tokenAddress,
// {
//   user: TUserConnected;
//   // tokenAddress: Hex;
// }) {
//   const chainConfig = getConfig(user.chain.id);
//   const lockedBalance = useContractRead({
//     address: chainConfig.BUTTERED_BREAD.address,
//     abi: BUTTERED_BREAD_ABI,
//     functionName: "accountToLPBalance",
//     args: [user.address, chainConfig.LP_TOKEN.address],
//     watch: true,
//   });
//   return lockedBalance.status === "success" ? (
//     <div>Locked Tokens: {formatUnits(lockedBalance.data as bigint, 18)}</div>
//   ) : null;
// }

// function Toggle({
//   children,
//   onClick,
// }: {
//   children: ReactNode;
//   onClick: () => void;
// }) {
//   return <button onClick={onClick}>{children}</button>;
// }
