import Elipsis from "@/app/core/components/Elipsis";
import {
  useTokenBalance,
  type UseTokenBalanceResult,
} from "../hooks/useTokenBalance";
import {
  TokenBalanceContainer,
  TokenBalanceText,
  TokenLabelContainer,
  TokenLabelText,
} from "./FromPanel";
import Icon from "./Icon";
import {
  PanelBalance,
  ToPanelContainer,
  PanelContent,
  PanelHeader,
  PanelLabel,
} from "./TokenDisplay";
import config from "@/config";
import {
  TUserConnected,
  useConnectedUser,
} from "@/app/core/hooks/useConnectedUser";
import { balanceFormatter } from "@/app/core/util";
import { TSwapMode } from "./Swap/Swap";

interface IProps {
  inputValue: string;
  swapMode: TSwapMode;
}
function ToPanel({ inputValue, swapMode }: IProps) {
  const { user } = useConnectedUser();

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
              <Icon type={swapMode === "BURN" ? "DAI" : "BREAD"} />
              <TokenLabelText>
                {swapMode === "BURN" ? "DAI" : "BREAD"}
              </TokenLabelText>
            </TokenLabelContainer>
          </div>
          {user.status === "CONNECTED" ? (
            <TokenBalance user={user} swapMode={swapMode} />
          ) : (
            <TokenBalanceContainer> </TokenBalanceContainer>
          )}
        </div>
      </PanelContent>
    </ToPanelContainer>
  );
}

function TokenBalance({
  user,
  swapMode,
}: {
  user: TUserConnected;
  swapMode: TSwapMode;
  /* eslint-disable-next-line */
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
    </TokenBalanceContainer>
  );
}

export default ToPanel;
