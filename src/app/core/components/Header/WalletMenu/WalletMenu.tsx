import { type ReactNode } from "react";
import Image from "next/image";
import { Hex } from "viem";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { blo } from "blo";
import { truncateAddress } from "@/app/core/util/formatter";
import { TEnsNameState, useEnsName } from "@/app/core/hooks/useEnsName";
import { MenuDetails } from "@/app/core/components/Header/MenuDetails";
import { WalletDisconnectButton } from "@/app/core/components/Header/WalletMenu/WalletDisconnectButton";
import { AddTokenButton } from "@/app/core/components/Header/AddTokenButton";

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

export function WalletMenu({ account, handleDisconnect, chainString }: IProps) {
  const ensNameResult = useEnsName(account.address);
  return (
    <WalletMenuContent
      account={account}
      chainString={chainString}
      handleDisconnect={handleDisconnect}
      ensNameResult={ensNameResult}
    />
  );
}

export function WalletMenuContent({
  account,
  handleDisconnect,
  ensNameResult,
}: {
  account: { address: string; displayName: string };
  handleDisconnect: () => void;
  chainString: string;
  ensNameResult: TEnsNameState;
}) {
  return (
    <NavigationMenu.Root className="relative">
      <NavigationMenu.List>
        <NavigationMenu.Item>
          <NavigationMenu.Trigger className="px-4 py-2 flex items-center gap-2 rounded-full bg-breadgray-ultra-white dark:bg-breadgray-charcoal text-breadgray-grey100 dark:text-breadgray-grey dark:hover:bg-breadgray-og-dark dark:hover:text-neutral-300">
            <span
              className={
                "flex w-full gap-4 items-center justify-center truncate text-ellipsis md:justify-end"
              }
            >
              {(() => {
                switch (ensNameResult.status) {
                  case "LOADING":
                    return null;
                  case "SUCCESS":
                    return (
                      <>
                        <div className="rounded-full overflow-clip w-6 h-6">
                          <Image
                            src={blo(account.address as Hex)}
                            alt="ens avatar"
                            width="24"
                            height="24"
                            className="transform scale-110"
                          />
                        </div>
                        {ensNameResult.ensName ||
                          truncateAddress(account.address)}
                      </>
                    );
                }
              })()}
            </span>
          </NavigationMenu.Trigger>
          <NavigationMenu.Content>
            <div className="w-[380px] bg-breadgray-ultra-white dark:bg-breadgray-charcoal border border-breadgray-lightgrey dark:border-none rounded-[15px] px-6 py-4 text-xs flex flex-col gap-4">
              <h3 className="text-[24px] mt-2 mb-4 font-semibold">Account</h3>
              <MenuDetails address={account.address} />
              <AddTokenButton />
              <WalletDisconnectButton handleDisconnect={handleDisconnect} />
            </div>
          </NavigationMenu.Content>
        </NavigationMenu.Item>
      </NavigationMenu.List>

      <NavigationMenu.Viewport className="absolute top-14 right-0 z-10" />
    </NavigationMenu.Root>
  );
}
