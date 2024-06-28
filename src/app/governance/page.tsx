"use client";
import { useRouter } from "next/navigation";
import { useConnectedUser } from "../core/hooks/useConnectedUser";
import { useEffect } from "react";

import { QueryClient, QueryClientProvider } from "react-query";

import { GovernancePage } from "./GovernancePage";
import { ClaimableYield } from "./components/ClaimableYield";
import { Diagnostics } from "./components/Diagnostics";

const client = new QueryClient();

export default function Governance() {
  const router = useRouter();
  const {
    user: { features },
  } = useConnectedUser();
  useEffect(() => {
    if (!features.governancePage) {
      router.push("/");
    }
  }, [features, router]);

  return features.governancePage ? (
    <QueryClientProvider client={client}>
      <GovernancePage />
    </QueryClientProvider>
  ) : null;
}
