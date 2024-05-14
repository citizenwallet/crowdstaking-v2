import { viemClient } from "@/app/core/viemClient";
import { useQuery } from "react-query";

export function useCurrentBlockNumber() {
  const { data } = useQuery({
    queryKey: "getCurrentBlockNumber",
    refetchInterval: 500,
    queryFn: async () => {
      const currentBlockNumber = await viemClient.getBlockNumber();
      return currentBlockNumber;
    },
  });

  return { data };
}
