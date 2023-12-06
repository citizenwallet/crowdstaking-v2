import { formatUnits } from "viem";
import { useQuery } from "react-query";
import { GraphQLClient, gql } from "graphql-request";

import { SUBGRAPH_URL } from "@/constants";

const graphQLClient = new GraphQLClient(SUBGRAPH_URL);

interface IQueryWeeklySnapshot {
  timestamp: string;
  weeklyTotalSupply: number;
}

export interface IWeeklySnapshot {
  supply: number;
  date: string;
}

export interface IWeeklyChartData {
  tokenWeeklySnapshots: IWeeklySnapshot[];
}

interface IQueryData {
  tokenWeeklySnapshots: IQueryWeeklySnapshot[];
}

export default function useWeeklyBread() {
  return useQuery("getBreadWeekly", async () => {
    const { tokenWeeklySnapshots } = await graphQLClient.request<IQueryData>(
      gql`
        query TokenWeeklySnapshots($skip: Int, $first: Int) {
          tokenWeeklySnapshots(
            skip: $skip
            first: $first
            orderBy: timestamp
            orderDirection: desc
          ) {
            timestamp
            weeklyTotalSupply
          }
        }
      `,
      {
        skip: 0,
      }
    );

    return tokenWeeklySnapshots
      .map((day) => {
        const date = new Date(
          parseInt(day.timestamp, 10) * 1000
        ).toDateString();
        const supply = parseInt(
          formatUnits(BigInt(day.weeklyTotalSupply), 18),
          10
        );
        return {
          date,
          supply,
        };
      })
      .reverse();
  });
}

// const TOKEN_DAILY_QUERY = gql`
//   query TokenWeeklySnapshots($skip: Int, $first: Int) {
//     tokenWeeklySnapshots(
//       skip: $skip
//       first: $first
//       orderBy: timestamp
//       orderDirection: desc
//     ) {
//       timestamp
//       weeklyTotalSupply
//     }
//   }
// `;

// export default function useWeeklyBread() {
//   const { data: apolloData, loading, fetchMore } = useQuery(TOKEN_DAILY_QUERY);

//   useEffect(() => {
//     if (!apolloData) return;
//     fetchMore({
//       variables: {
//         skip: apolloData.tokenWeeklySnapshots.length,
//       },
//     });
//   }, [apolloData, fetchMore]);

//   const chartData: null | IWeeklyChartData = useMemo(() => {
//     if (!apolloData) return null;

//     return {
//       tokenWeeklySnapshots: apolloData.tokenWeeklySnapshots
//         .map((day: IQueryWeeklySnapshot) => {
//           const date = new Date(
//             parseInt(day.timestamp, 10) * 1000
//           ).toDateString();
//           const supply = parseInt(
//             formatUnits(BigInt(day.weeklyTotalSupply), 18),
//             10
//           );
//           return {
//             date,
//             supply,
//           };
//         })
//         .reverse(),
//     };
//   }, [apolloData]);

//   return {
//     data: chartData,
//     loading,
//   };
// }
