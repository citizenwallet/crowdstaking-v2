import { ConnectButton } from "@rainbow-me/rainbowkit";

import Button from "./Button";
import { TButtonVariant } from "./Button/Button";
import Image from "next/image";
import WalletDisplay from "./Header/WalletDisplay";
import WalletInfo from "./Header/WalletDisplay/WalletInfo";
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
        openAccountModal,
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

              // if (chain.unsupported) {
              //   return (
              //     <Button
              //       onClick={openChainModal}
              //       variant={variant}
              //       fullWidth={fullWidth}
              //     >
              //       Switch Network
              //     </Button>
              //   );
              // }

              return (
                <div className="flex gap-12">
                  <button onClick={openChainModal} className="flex gap-2">
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
                      <div className="w-6 h-6 relative rounded-full overflow-hidden bg-breadgray-rye" />
                    )}
                    <div className="h-full flex items-center text-breadgray-rye">
                      <svg
                        height="7"
                        width="14"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M12.75 1.54001L8.51647 5.0038C7.77974 5.60658 6.72026 5.60658 5.98352 5.0038L1.75 1.54001"
                          stroke="currentColor"
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
