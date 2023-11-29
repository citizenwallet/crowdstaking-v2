import { type ReactNode } from "react";
import Image from "next/image";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { formatAddress } from "../../../util";
import { IconContainer } from "../../Icons";
import CaretIcon from "../../Icons/CaretIcon";
import Button from "../../Button";
import { useEnsName } from "@/app/core/hooks/useEnsName";

export function Row({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center justify-center gap-4 text-center text-xs md:justify-end">
      {children}
    </span>
  );
}

interface IProps {
  account: {
    address: string;
    displayName: string;
    ensAvatar?: string;
    ensName?: string;
  };
  chainString: string;
  handleDisconnect: () => void;
}

function WalletInfo({ account, handleDisconnect, chainString }: IProps) {
  const ensNameResult = useEnsName(account.address);
  return (
    <NavigationMenu.Root>
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="flex items-center gap-2">
            <Image
              src={account.ensAvatar || "/ens_fallback.png"}
              alt="ens avatar"
              width="24"
              height="24"
            />

            <span
              className={
                "flex w-full items-center justify-center truncate text-ellipsis pt-0.5 pr-2 font-bold text-breadgray-grey hover:text-neutral-300 md:justify-end"
              }
            >
              {(() => {
                switch (ensNameResult.status) {
                  case "LOADING":
                    return null;
                  case "SUCCESS":
                    return (
                      ensNameResult.ensName || formatAddress(account.address)
                    );
                }
              })()}
            </span>
            <IconContainer>
              <CaretIcon />
            </IconContainer>
          </NavigationMenu.Trigger>

          <NavigationMenu.Content>
            <div className="pt-2 pb-1">
              <a
                className="text-neutral-400 underline hover:text-neutral-300 text-base font-medium"
                target="_blank"
                href={`https://polygonscan.com/address/${account.address}`}
                rel="noreferrer"
              >
                View Account
              </a>
            </div>
            <div className="pb-5">
              <a
                className="text-neutral-400 underline hover:text-neutral-300 text-base font-medium"
                target="_blank"
                href="https://beta.arrakis.finance/vaults/137/0x3055C602454ddE1BDa3e98B1bCfD2Ed68ab9789E"
                rel="noreferrer"
              >
                Add Liquidity
              </a>
            </div>
            <Button variant="small" onClick={handleDisconnect}>
              Disconnect
            </Button>
            <NavigationMenu.Link href="#">bloop</NavigationMenu.Link>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Viewport className="absolute top-14 right-0 z-10 flex transform flex-col items-end gap-4 whitespace-nowrap bg-breadgray-og-dark border-2 border-breadgray-burnt rounded p-6 text-xs" />
    </NavigationMenu.Root>
  );
}

export default WalletInfo;
