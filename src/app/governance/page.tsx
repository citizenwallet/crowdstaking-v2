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
import { ClaimableYield } from "./components/ClaimableYield";

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
      <section className="grow max-w-[67rem] w-full m-auto">
        <div className="grid grid-cols-12 p-4 md:p-8 gap-8">
          <div className="col-span-12 md:col-span-8">
            <h3 className="text-2xl font-bold">Bread Governance</h3>
            <p className="pt-4 text-lg max-w-xl">
              Decide which listed bread post-capitalism solidarity projects
              receive your vote. Projects receive a percentage of the total
              yield accrued each month to continue their plight.{" "}
            </p>
          </div>
          <div className="col-span-12 md:col-span-4">
            <ClaimableYield />
          </div>
        </div>
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
