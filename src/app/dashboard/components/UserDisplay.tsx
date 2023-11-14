import clsx from "clsx";

import { WRAPPER_CLASSES } from "@/app/core/util";
import useWeeklyBread from "../hooks/useWeeklyBread";
import ConnectWallet from "@/app/core/components/ConnectWallet";
import { useConnectedUser } from "@/app/core/hooks/useConnectedUser";

export default function UserDisplay() {
  const { user } = useConnectedUser();

  return (
    <div className={clsx(WRAPPER_CLASSES)}>
      <section
        className={clsx(
          "px-6 md:px-12 py-6 bg-breadgray-burnt rounded-xl border border-breadgray-toast"
        )}
      >
        <h2 className="font-bold text-xl pb-6">Your Wallet</h2>
        <div className="flex justify-center">
          <ConnectWallet variant="regular" />
        </div>
      </section>
    </div>
  );
}
