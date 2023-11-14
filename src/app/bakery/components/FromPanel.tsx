import type { ChangeEventHandler, ReactNode } from "react";
import Icon from "./Icon";
import Input from "./Input";
import {
  FromPanelContainer,
  PanelBalanceButton,
  PanelContent,
  PanelHeader,
  PanelLabel,
} from "./TokenDisplay";
import {
  useTokenBalance,
  type UseTokenBalanceResult,
} from "../hooks/useTokenBalance";
import TokenBalance from "./TokenBalance";
import config from "@/config";

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
  // useTokenBalance(tokenType === "BREAD" ? config.BREAD.address : "");
  return (
    <FromPanelContainer>
      <PanelLabel>You pay</PanelLabel>
      <PanelContent>
        <Input
          name="from"
          value={inputValue}
          handleInputChange={handleInputChange}
        />
        <div className="flex flex-col gap-2">
          <div className="flex justify-end pt-1">
            <TokenLabelContainer>
              <Icon type={tokenType} />
              <TokenLabelText>{tokenType}</TokenLabelText>
            </TokenLabelContainer>
          </div>
          <TokenBalanceContainer>
            <TokenBalanceText>Balance: 234.45</TokenBalanceText>
            <button
              type="button"
              className="px-4 py-2 font-bold text-breadpink-shaded text-sm"
              // onClick={() => handleBalanceClick()}
            >
              max.
            </button>
          </TokenBalanceContainer>
        </div>
      </PanelContent>
    </FromPanelContainer>
  );
}

export function TokenLabelContainer({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-full bg-[#343434] px-4 py-2 flex items-center sm:text-xl w-auto">
      {children}
    </div>
  );
}

export function TokenLabelText({ children }: { children: ReactNode }) {
  return <span className="ml-4 pt-0.5 font-medium">{children}</span>;
}

export function TokenBalanceContainer({ children }: { children: ReactNode }) {
  return <div className="h-8 flex items-center justify-end">{children}</div>;
}

export function TokenBalanceText({ children }: { children: ReactNode }) {
  return (
    <div className="font-medium text-neutral-500 text-xs sm:text-[0.85rem] text-right">
      {children}
    </div>
  );
}

export default FromPanel;
