import type { ReactNode } from "react";

import WalletInfo from "./WalletInfo";
import { useConnectedUser } from "@/app/core/hooks/useConnectedUser";
import { useDisconnect } from "wagmi";
import ConnectWallet from "../../ConnectWallet";

export function Container({ children }: { children: ReactNode }) {
  return (
    <section className="hover: relative hidden flex-col items-end justify-center gap-2 md:flex h-10">
      {children}
    </section>
  );
}

function WalletDisplay() {
  const { user } = useConnectedUser();
  const { disconnectAsync } = useDisconnect();

  console.log({ user });
  return (
    <Container>
      {(() => {
        switch (user.status) {
          case "LOADING":
            return "loading";
          case "NOT_CONNECTED":
            return <ConnectWallet />;
          case "CONNECTED" || "UNSUPPORTED_CHAIN":
            return (
              <WalletInfo
                accountAddress={user.address}
                chainString={user.config.NETWORK_STRING}
                handleDisconnect={() => disconnectAsync()}
              />
            );

          default:
            throw new Error("user.status not handled!");
        }
      })()}
    </Container>
  );
}

export default WalletDisplay;
