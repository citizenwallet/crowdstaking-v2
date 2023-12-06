import { formatUnits } from "viem";
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

const AAVE_SUBGRAPH_URL =
  "https://api.thegraph.com/subgraphs/name/jaimehgb/aave-v3-polygon";

const graphQLClient = new GraphQLClient(AAVE_SUBGRAPH_URL);

interface IAAVEData {
  currentYield: number;
  poolPercentage: number;
}

const AAVE_QUERY = gql`
  query positions {
    positions(
      where: { account: "0x11d9efdf4ab4a3bfabf5c7089f56aa4f059aa14c" }
    ) {
      balance
      market {
        name
        totalValueLockedUSD
        totalDepositBalanceUSD
        inputTokenBalance
        rates {
          rate
          side
          type
        }
        inputToken {
          name
        }
        outputToken {
          name
        }
      }
    }
  }
`;

export default function useAAVE() {
  return useQuery("getAAVEData", async () => {
    const { positions } = await graphQLClient.request<any>(AAVE_QUERY);
    if (positions.length > 1)
      throw new Error("query should only return one position!");

    const position = positions[0];
    const currentRate = position.market.rates.find(
      (rate: { rate: string; side: string; type: string }) =>
        rate.side === "LENDER"
    );
    if (!currentRate) throw new Error("couldn't find rate!");
    const currentYield = currentRate.rate;

    const {
      balance,
      market: { inputTokenBalance },
    } = position;
    const poolPercentage = (balance / inputTokenBalance) * 100;

    return { currentYield, poolPercentage } as IAAVEData;
  });
}
