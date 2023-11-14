import { ExternalLink } from "@/app/core/components/Icons/ExternalLink";
import useAAVE from "../hooks/useAAVE";

export const yieldRateFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  minimumIntegerDigits: 1,
  maximumFractionDigits: 2,
  useGrouping: true,
});

export default function AAVE() {
  const { data: aaveData } = useAAVE();

  return (
    <figure className="flex flex-col gap-1 items-center grow">
      <div className="flex flex-row gap-2 items-center">
        <div className="font-normal">AAVE Yield</div>
        <div className="w-5 h-5 inline-block transform -translate-y-0.5">
          <ExternalLink />
        </div>
      </div>
      <span className="text-xl font-bold h-6">
        {aaveData && (
          <span className="flex gap-2 grow text-breadgray-white">
            <span>{yieldRateFormatter.format(aaveData.currentYield)}</span>
            <span>%</span>
          </span>
        )}
      </span>
    </figure>
  );
}
