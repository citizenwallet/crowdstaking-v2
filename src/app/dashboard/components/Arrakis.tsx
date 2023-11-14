import { ExternalLink } from "@/app/core/components/Icons/ExternalLink";
import useArrakis from "../hooks/useArrakis";
import { yieldFormatter } from "./Yield/Yield";

const formatter = new Intl.NumberFormat("en-US", {
  maximumFractionDigits: 0,
  minimumIntegerDigits: 1,
  useGrouping: true,
});

export default function Arrakis() {
  const { data } = useArrakis();

  return (
    <figure className="flex flex-col gap-1 items-center grow">
      <div className="flex flex-row gap-2 items-center">
        <span className="font-normal">Arrakis TVL </span>
        <div className="w-5 h-5 inline-block transform -translate-y-0.5">
          <ExternalLink />
        </div>
      </div>
      <span className="text-xl font-bold h-6">
        {data && <span>${formatter.format(parseFloat(data.tvl))}</span>}
      </span>
    </figure>
  );
}
