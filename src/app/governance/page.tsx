"use client";
import { useRouter } from "next/navigation";
import { useConnectedUser } from "../core/hooks/useConnectedUser";
import { useEffect } from "react";
import { ProjectPanel } from "./components/ProjectPanel";
import { QueryClient, QueryClientProvider } from "react-query";
import { SlicesPanel } from "./components/SlicesPanel";

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
        <SlicesPanel />
      </section>
    </QueryClientProvider>
  ) : null;
}
