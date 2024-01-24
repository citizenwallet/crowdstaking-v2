import type { ReactNode } from "react";

import { useConnectedUser } from "@/app/core/hooks/useConnectedUser";
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

  return (
    <Container>
      {(() => {
        switch (user.status) {
          case "LOADING":
            return "loading";
          default:
            return <ConnectWallet variant="regular" />;
        }
      })()}
    </Container>
  );
}

export default WalletDisplay;
