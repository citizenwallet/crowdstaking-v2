import { formatUnits } from "viem";
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

import { SUBGRAPH_URL } from "@/constants";

const graphQLClient = new GraphQLClient(SUBGRAPH_URL);

export interface ITotalClaimedYield {
  totalClaimedYield: {
    amount: string;
  };
}

const TOTAL_CLAIMED_YIELD_QUERY = gql`
  query TotalClaimedYield {
    totalClaimedYield(id: "0x11d9efdf4ab4a3bfabf5c7089f56aa4f059aa14c") {
      amount
    }
  }
`;

export default function useYield() {
  return useQuery({
    queryKey: ["getClaimedYield"],
    staleTime: 1000,
    queryFn: async () => {
      const { totalClaimedYield } =
        await graphQLClient.request<ITotalClaimedYield>(
          TOTAL_CLAIMED_YIELD_QUERY
        );

      const amount = formatUnits(BigInt(totalClaimedYield.amount), 18);
      console.log("getClaimedYield runnung!", amount);
      return {
        amount,
      };
    },
  });
}
