import Elipsis from "@/app/core/components/Elipsis";

import {
  PanelContent,
  PanelLabel,
  PanelContainer,
  PanelTokenRow,
  TokenBalanceContainer,
  TokenBalanceText,
  TokenLabelContainer,
  TokenLabelText,
} from "./ui";

import { balanceFormatter } from "@/app/core/util/formatter";
import { TSwapMode } from "./Swap";
import { TTokenBalanceState } from "@/app/core/context/TokenBalanceContext";
import { BreadIcon, XDAIIcon } from "@/app/core/components/Icons/TokenIcons";

interface IProps {
  inputValue: string;
  swapMode: TSwapMode;
  tokenBalance: null | TTokenBalanceState;
}
function ToPanel({ inputValue, swapMode, tokenBalance }: IProps) {
  return (
    <PanelContainer>
      <PanelLabel>You receive</PanelLabel>
      <PanelContent>
        <PanelTokenRow>
          <span className="w-0 flex-auto truncate text-[2.3rem] text-neutral-500">
            {inputValue || "00.00"}
          </span>

          <div className="flex justify-end pt-1">
            <TokenLabelContainer>
              {swapMode === "BURN" ? <XDAIIcon /> : <BreadIcon />}
              <TokenLabelText>
                {swapMode === "BURN" ? "DAI" : "BREAD"}
              </TokenLabelText>
            </TokenLabelContainer>
          </div>
        </PanelTokenRow>
        {tokenBalance ? (
          <TokenBalance tokenBalance={tokenBalance} />
        ) : (
          <TokenBalanceContainer> </TokenBalanceContainer>
        )}
      </PanelContent>
    </PanelContainer>
  );
}

function TokenBalance({ tokenBalance }: { tokenBalance: TTokenBalanceState }) {
  return (
    <TokenBalanceContainer>
      <TokenBalanceText>
        Balance:{" "}
        {tokenBalance.status === "LOADING" ? (
          <Elipsis />
        ) : tokenBalance.status === "SUCCESS" ? (
          tokenBalance.value &&
          balanceFormatter.format(parseInt(tokenBalance.value))
        ) : (
          ""
        )}
      </TokenBalanceText>
    </TokenBalanceContainer>
  );
}

export default ToPanel;
