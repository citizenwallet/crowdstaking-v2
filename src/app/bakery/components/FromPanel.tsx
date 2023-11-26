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
import config from "@/config";
import {
  TUserConnected,
  useConnectedUser,
} from "@/app/core/hooks/useConnectedUser";
import { balanceFormatter } from "@/app/core/util";
import Elipsis from "@/app/core/components/Elipsis";
import type { TSwapMode } from "./Swap/Swap";

interface IProps {
  inputValue: string;
  swapMode: TSwapMode;
  handleInputChange: ChangeEventHandler<HTMLInputElement>;
  /* eslint-disable-next-line */
  handleBalanceClick: (balance: string) => void;
}
function FromPanel({
  inputValue,
  swapMode,
  handleBalanceClick,
  handleInputChange,
}: IProps) {
  const { user } = useConnectedUser();

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
              <Icon type={swapMode === "BAKE" ? "DAI" : "BREAD"} />
              <TokenLabelText>
                {swapMode === "BURN" ? "BREAD" : "DAI"}
              </TokenLabelText>
            </TokenLabelContainer>
          </div>
          {user.status === "CONNECTED" ? (
            <TokenBalance
              user={user}
              swapMode={swapMode}
              handleBalanceClick={handleBalanceClick}
            />
          ) : (
            <TokenBalanceContainer> </TokenBalanceContainer>
          )}
        </div>
      </PanelContent>
    </FromPanelContainer>
  );
}

export function TokenLabelContainer({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-full bg-[#343434] px-1.5 py-0.5 pr-3 flex items-center sm:text-xl w-auto">
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

function TokenBalance({
  user,
  swapMode,
  handleBalanceClick,
}: {
  user: TUserConnected;
  swapMode: TSwapMode;
  /* eslint-disable-next-line */
  handleBalanceClick: (balance: string) => void;
}) {
  const { value, status, error } = useTokenBalance(
    swapMode === "BURN"
      ? config[user.chain.id].BREAD.address
      : config[user.chain.id].DAI.address,
    user.address
  );
  return (
    <TokenBalanceContainer>
      <TokenBalanceText>
        Balance:{" "}
        {status === "loading" ? (
          <Elipsis />
        ) : status === "success" ? (
          value && balanceFormatter.format(parseInt(value))
        ) : (
          ""
        )}
      </TokenBalanceText>
      <button
        type="button"
        className="px-4 py-2 font-bold text-breadpink-shaded text-sm"
        onClick={() => handleBalanceClick(value || "")}
      >
        max.
      </button>
    </TokenBalanceContainer>
  );
}

export default FromPanel;
