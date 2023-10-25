import type { UseTokenBalanceResult } from "../hooks/useTokenBalance";
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
      {/* <PanelHeader>
        <PanelBalance>
          <TokenBalance readings={balanceReadings} />
        </PanelBalance>
      </PanelHeader> */}
      <PanelLabel>You receive</PanelLabel>
      <PanelContent>
        <span className="w-0 flex-auto truncate overflow-ellipsistext-lg text-3xl text-neutral-500">
          {inputValue || "00.00"}
        </span>
        <Icon type={tokenType} />
        <span className="ml-4 w-20 pt-0.5 text-xl font-medium">
          {tokenType}
        </span>
      </PanelContent>
    </ToPanelContainer>
  );
}

export default ToPanel;
