import type { ChangeEventHandler, ReactNode } from "react";
import Input from "../Input";

import { useConnectedUser } from "@/app/core/hooks/useConnectedUser";
import { balanceFormatter } from "@/app/core/util/formatter";
import Elipsis from "@/app/core/components/Elipsis";
import type { TSwapMode } from "./Swap";
import { TTokenBalanceState } from "@/app/core/context/TokenBalanceContext";
import { XDAIIcon, BreadIcon } from "@/app/core/components/Icons/TokenIcons";
import {
  PanelContainer,
  PanelContent,
  PanelLabel,
  PanelTokenRow,
  TokenBalanceContainer,
  TokenBalanceText,
  TokenLabelContainer,
  TokenLabelText,
} from "./ui";

interface IProps {
  inputValue: string;
  swapMode: TSwapMode;
  tokenBalance: null | TTokenBalanceState;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  /* eslint-disable-next-line */
  handleBalanceClick: (balance: string) => void;
}

export function FromPanel({
  inputValue,
  swapMode,
  tokenBalance,
  handleBalanceClick,
  handleInputChange,
}: IProps) {
  const { user } = useConnectedUser();

  return (
    <PanelContainer>
      <PanelLabel>You pay</PanelLabel>
      <PanelContent>
        <PanelTokenRow>
          <Input
            name="from"
            value={inputValue}
            handleInputChange={handleInputChange}
          />
          <TokenLabelContainer>
            {swapMode === "BURN" ? <BreadIcon /> : <XDAIIcon />}
            <TokenLabelText>
              {swapMode === "BURN" ? "BREAD" : "xDAI"}
            </TokenLabelText>
          </TokenLabelContainer>
        </PanelTokenRow>
        {tokenBalance ? (
          <TokenBalance
            tokenBalance={tokenBalance}
            handleBalanceClick={handleBalanceClick}
          />
        ) : (
          <TokenBalanceContainer> </TokenBalanceContainer>
        )}
      </PanelContent>
    </PanelContainer>
  );
}

function TokenBalance({
  tokenBalance,
  handleBalanceClick,
}: {
  tokenBalance: TTokenBalanceState;
  /* eslint-disable-next-line */
  handleBalanceClick: (balance: string) => void;
}) {
  return (
    <TokenBalanceContainer>
      <TokenBalanceText>
        Balance:{" "}
        {tokenBalance.status === "LOADING" ? (
          <Elipsis />
        ) : tokenBalance.status === "SUCCESS" ? (
          <span
            title={`${parseFloat(tokenBalance.value).toString()} ${
              tokenBalance.tokenName
            }`}
          >
            {balanceFormatter.format(parseFloat(tokenBalance.value))}
          </span>
        ) : (
          ""
        )}
      </TokenBalanceText>
      {tokenBalance.status === "SUCCESS" && (
        <button
          type="button"
          className="px-4 py-2 font-bold text-breadpink-shaded text-sm"
          onClick={() => {
            const maxValue =
              parseFloat(tokenBalance.value) - 0.01 > 0
                ? parseFloat(tokenBalance.value) - 0.01
                : 0;
            handleBalanceClick(maxValue.toString());
          }}
        >
          max
        </button>
      )}
    </TokenBalanceContainer>
  );
}
