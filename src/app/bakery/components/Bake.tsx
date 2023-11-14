import { type ReactNode, Suspense, lazy } from "react";

import Elipsis from "@/app/core/components/Elipsis";
import { useConnectedUser } from "@/app/core/hooks/useConnectedUser";
import ConnectWallet from "@/app/core/components/ConnectWallet";
import SiteTitle from "@/app/core/components/SiteTitle";
import UnsupportedNetwork from "@/app/bakery/components/UnsupportedNetwork";

import { Swap } from "./Swap";

function BakeLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <SiteTitle />
      <div className="m-auto flex w-full max-w-[425px] flex-col items-center px-3 pb-16 sm:max-w-[490px] sm:px-4 md:px-6">
        {children}
      </div>
    </>
  );
}

export function Bake() {
  const { user } = useConnectedUser();

  // if (user.status === "LOADING") {
  //   return <>loading...</>;
  // }

  // if (user.status === "UNSUPPORTED_CHAIN")
  //   return (
  //     <BakeLayout>
  //       <UnsupportedNetwork />
  //     </BakeLayout>
  //   );

  return (
    <BakeLayout>
      <Suspense
        fallback={
          <p className="pt-16">
            loading
            <Elipsis />
          </p>
        }
      >
        {/* <Swap /> */}
      </Suspense>
    </BakeLayout>
  );
}

export default Bake;
