import { Hex } from "viem";

import { projectsMeta } from "@/app/projectsMeta";
import { formatVotePercentage } from "@/app/core/util/formatter";
import { CurrentVotingDistributionState } from "../useCurrentVotingDistribution";

export function ResultsPanel({
  distribution,
}: {
  distribution: CurrentVotingDistributionState;
}) {
  const totalPoints =
    distribution.status === "SUCCESS"
      ? distribution.data[1].reduce((acc, points) => acc + points, 0)
      : 0;

  return (
    <section className="max-w-96 m-auto grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 gap-8 rounded-lg bg-breadgray-ultra-white dark:bg-breadgray-charcoal border dark:border-breadgray-toast p-4">
        <div className="grid grid-cols-1 gap-4">
          <h3 className="uppercase font-medium text-xl dark:text-breadgray-light-grey">
            results
          </h3>
          <div className="grid grid-cols-1 gap-6">
            {distribution.status === "SUCCESS" &&
              distribution.data[0].map((account, i) => (
                <ResultsProject
                  key={`project_result_${account}`}
                  address={account}
                  projectPoints={distribution.data[1][i]}
                  totalPoints={totalPoints}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ResultsProject({
  projectPoints,
  totalPoints,
  address,
}: {
  projectPoints: number;
  totalPoints: number;
  address: Hex;
}) {
  const percentage = totalPoints > 0 ? (projectPoints / totalPoints) * 100 : 0;
  return (
    <div className="grid grid-cols-1 gap-2">
      <div className="flex gap-2">
        <h3 className="grow font-bold text-xl">{projectsMeta[address].name}</h3>
        <span>{`${formatVotePercentage(percentage)}%`}</span>
      </div>
      <div className="bg-breadgray-white dark:bg-breadgray-grey100 overflow-clip rounded-full border-[4px] border-breadgray-ultra-white dark:border-breadgray-grey100">
        <div
          className="h-1.5 bg-breadviolet-shaded transform transition-width duration-1000 ease-in-out"
          style={{
            width: `${percentage}%`,
          }}
        >
          {" "}
        </div>
      </div>
    </div>
  );
}
