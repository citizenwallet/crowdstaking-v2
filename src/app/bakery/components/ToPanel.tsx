import type { UseTokenBalanceResult } from "../hooks/useTokenBalance";
import {
  TokenBalanceContainer,
  TokenBalanceText,
  TokenLabelContainer,
  TokenLabelText,
} from "./FromPanel";
import Icon from "./Icon";
import TokenBalance from "./TokenBalance";
import {
  PanelBalance,
  ToPanelContainer,
  PanelContent,
  PanelHeader,
  PanelLabel,
} from "./TokenDisplay";

interface IProps {
  inputValue: string;
  tokenType: "DAI" | "BREAD";
}
function ToPanel({ inputValue, tokenType }: IProps) {
  return (
    <ToPanelContainer>
      <PanelLabel>You receive</PanelLabel>
      <PanelContent>
        <span className="w-0 flex-auto truncate overflow-ellipsistext-lg text-[2.3rem] text-neutral-500">
          {inputValue || "00.00"}
        </span>

        <div className="flex flex-col gap-2">
          <div className="flex justify-end pt-1">
            <TokenLabelContainer>
              <Icon type={tokenType} />
              <TokenLabelText>{tokenType}</TokenLabelText>
            </TokenLabelContainer>
          </div>
          <TokenBalanceContainer>
            <div className="pr-2 md:pr-4">
              <TokenBalanceText>Balance:</TokenBalanceText>
            </div>
          </TokenBalanceContainer>
        </div>
      </PanelContent>
    </ToPanelContainer>
  );
}

export default ToPanel;
