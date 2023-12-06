import useClaimableYield from "@/app/dashboard/hooks/useClaimableYield";
import { yieldFormatter } from "./Yield";

export default function ClaimableYield() {
  const { claimable } = useClaimableYield();

  return (
    <section className="m-auto flex w-2/3 items-center justify-between p-6">
      <span>Claimable Yield</span>
      <span>{claimable && yieldFormatter.format(parseFloat(claimable))}</span>
    </section>
  );
}
