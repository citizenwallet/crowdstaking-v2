import { useMemo } from "react";
import { yieldFormatter } from "./Yield";

export default function ClaimedYield({
  data,
  isLoading,
}: {
  data: { amount: string } | undefined;
  isLoading: boolean;
}) {
  const claimed = useMemo(
    () => (data ? yieldFormatter.format(parseFloat(data.amount)) : "..."),
    [data]
  );

  return (
    <section className="m-auto flex w-2/3 items-center justify-between p-6">
      <span>Claimed Yield</span>
      <span>{isLoading ? "loading..." : claimed}</span>
    </section>
  );
}
