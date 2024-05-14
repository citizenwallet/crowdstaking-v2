"use client";
import { useRouter } from "next/navigation";
import { useConnectedUser } from "../core/hooks/useConnectedUser";
import { useEffect } from "react";

import { QueryClient, QueryClientProvider } from "react-query";
import { SlicesPanel } from "./components/SlicesPanel";

import { ProjectPanel } from "./components/ProjectPanel";
import { VotingPower } from "./components/VotingPower";
import { useContractRead } from "wagmi";
import config from "@/chainConfig";
import { BREAD_GNOSIS_ABI } from "@/abi";
import { formatUnits } from "viem";
import { Diagnostics } from "./components/Diagnostics";

const client = new QueryClient();

export default function Governance() {
  const router = useRouter();
  const {
    user: { features },
  } = useConnectedUser();
  useEffect(() => {
    console.log({ features });
    if (!features.governancePage) {
      router.push("/");
    }
  }, [features, router]);

  return features.governancePage ? (
    <QueryClientProvider client={client}>
      <section className="grow max-w-6xl w-full m-auto">
        <ProjectPanel />
        <Diagnostics />
        {/* <SlicesPanel /> */}
        {/* <div className="max-w-2xl m-auto">
          {breadHolders.map((address) => (
            <VotingPower key={address} address={address} />
          ))}
        </div> */}
      </section>
    </QueryClientProvider>
  ) : null;
}
