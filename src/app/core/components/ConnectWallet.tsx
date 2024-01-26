import { ConnectButton } from "@rainbow-me/rainbowkit";

import Button from "./Button";
import { TButtonVariant } from "./Button/Button";
import Image from "next/image";
import WalletInfo from "./Header/WalletDisplay/WalletInfo/WalletInfo";
import { useDisconnect } from "wagmi";

export default function ConnectWallet({
  variant,
  fullWidth,
}: {
  variant: TButtonVariant;
  fullWidth?: boolean;
}) {
  const { disconnectAsync } = useDisconnect();
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    variant={variant}
                    fullWidth={fullWidth}
                  >
                    Connect
                  </Button>
                );
              }

              return (
                <div className="flex gap-12">
                  <button
                    onClick={openChainModal}
                    className="flex gap-2 items-center stroke-breadgray-rye hover:stroke-breadgray-grey"
                  >
                    {chain.hasIcon ? (
                      <div
                        className="w-6 h-6 relative rounded-full overflow-hidden"
                        style={{
                          background: chain.iconBackground,
                        }}
                      >
                        <div className="w-6 h-6 relative">
                          {chain.iconUrl && (
                            <Image
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              layout="fill"
                            />
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="w-5 h-5 flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="fill-none h-full w-full stroke-inherit"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                          <line x1="12" y1="9" x2="12" y2="13"></line>
                          <line x1="12" y1="17" x2="12.01" y2="17"></line>
                        </svg>
                      </div>
                    )}
                    <div className="h-full flex items-center stroke-inherit">
                      <svg
                        className="stroke-inherit"
                        height="7"
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.75 1.54001L8.51647 5.0038C7.77974 5.60658 6.72026 5.60658 5.98352 5.0038L1.75 1.54001"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2.5"
                          xmlns="http://www.w3.org/2000/svg"
                        ></path>
                      </svg>
                    </div>
                  </button>
                  <WalletInfo
                    account={account}
                    chainString={"unknown"}
                    handleDisconnect={() => disconnectAsync()}
                  />
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
}
