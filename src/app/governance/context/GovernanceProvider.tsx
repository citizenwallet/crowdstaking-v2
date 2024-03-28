import { QueryClient, QueryClientProvider } from "react-query";
import type { ReactNode } from "react";

const client = new QueryClient();

export default function SubgraphProvider({
  children,
}: {
  children: ReactNode;
}) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
