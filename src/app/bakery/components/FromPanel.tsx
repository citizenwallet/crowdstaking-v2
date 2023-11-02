import type { ChangeEventHandler } from "react";
import Icon from "./Icon";
import Input from "./Input";
import {
  FromPanelContainer,
  PanelBalanceButton,
  PanelContent,
  PanelHeader,
  PanelLabel,
} from "./TokenDisplay";
import type { UseTokenBalanceResult } from "../hooks/useTokenBalance";
import TokenBalance from "./TokenBalance";

interface IProps {
  inputValue: string;
  tokenType: "DAI" | "BREAD";
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  /* eslint-disable-next-line */
  handleBalanceClick: (balance: string) => void;
}
function FromPanel({
  inputValue,
  tokenType,
  handleBalanceClick,
  handleInputChange,
}: IProps) {
  return (
    <FromPanelContainer>
      <PanelLabel>You pay</PanelLabel>
      <PanelContent>
        <Input
          name="from"
          value={inputValue}
          handleInputChange={handleInputChange}
        />
        <div className="rounded-full bg-[#343434] px-4 py-2 flex items-center text-xl">
          <Icon type={tokenType} />
          <span className="ml-4 pt-0.5 font-medium">{tokenType}</span>
        </div>
      </PanelContent>
    </FromPanelContainer>
  );
}

export default FromPanel;
