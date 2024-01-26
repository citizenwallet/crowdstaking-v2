import { type ReactNode } from "react";
import Image from "next/image";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { truncateAddress } from "../../../../util/formatter";
import { IconContainer } from "../../../Icons";
import CaretIcon from "../../../Icons/CaretIcon";
import { TEnsNameState, useEnsName } from "@/app/core/hooks/useEnsName";
import { WalletMenuContent } from "./WalletMenuContent";

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
  };
  chainString: string;
  handleDisconnect: () => void;
}

function WalletInfo({ account, handleDisconnect, chainString }: IProps) {
  const ensNameResult = useEnsName(account.address);
  return (
    <WalletMenu
      account={account}
      chainString={chainString}
      handleDisconnect={handleDisconnect}
      ensNameResult={ensNameResult}
    />
  );
}

export function WalletMenu({
  account,
  handleDisconnect,
  ensNameResult,
}: {
  account: { address: string; displayName: string };
  handleDisconnect: () => void;
  chainString: string;
  ensNameResult: TEnsNameState;
}) {
  function preventHover(event: any) {
    event.preventDefault();
  }

  return (
    <NavigationMenu.Root className="relative">
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger
            onPointerMove={preventHover}
            onPointerLeave={preventHover}
            className="px-4 py-2 flex items-center gap-2 rounded-full bg-breadgray-charcoal text-breadgray-grey hover:bg-breadgray-og-dark hover:text-neutral-300"
          >
            <Image
              src={"/ens_fallback.png"}
              alt="ens avatar"
              width="24"
              height="24"
            />

            <span
              className={
                "flex w-full items-center justify-center truncate text-ellipsis pt-0.5 font-bold md:justify-end"
              }
            >
              {(() => {
                switch (ensNameResult.status) {
                  case "LOADING":
                    return null;
                  case "SUCCESS":
                    return (
                      ensNameResult.ensName || truncateAddress(account.address)
                    );
                }
              })()}
            </span>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content
            onPointerEnter={preventHover}
            onPointerLeave={preventHover}
          >
            <WalletMenuContent
              accountAddress={account.address}
              handleDisconnect={handleDisconnect}
            />
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Viewport className="absolute top-14 right-0 z-10" />
    </NavigationMenu.Root>
  );
}

export default WalletInfo;
