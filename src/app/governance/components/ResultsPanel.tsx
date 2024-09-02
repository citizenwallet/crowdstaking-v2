import { Hex } from "viem";

import { projectsMeta } from "@/app/projectsMeta";
import { formatVotePercentage } from "@/app/core/util/formatter";
import { CardBox } from "@/app/core/components/CardBox";
import { CurrentProjectsSuccess } from "../GovernancePage";

export function ResultsPanel({
  projects,
}: {
  projects: CurrentProjectsSuccess;
}) {
  const totalPoints = projects.sortedData.reduce(
    (acc, points) => acc + points.currentDistribution,
    0
  );

  return (
    <section className="grid grid-cols-1 gap-4">
      <CardBox>
        <div className="grid grid-cols-1 gap-8 p-4">
          <div className="grid grid-cols-1 gap-4">
            <h3 className="uppercase font-medium text-xl text-breadgray-grey100 dark:text-breadgray-ultra-white">
              results
            </h3>
            <div className="grid grid-cols-1 gap-4">
              {projects.sortedData.map((project, i) => (
                <ResultsProject
                  key={`project_result_${project.account}`}
                  address={project.account}
                  projectPoints={projects.sortedData[i].currentDistribution}
                  totalPoints={totalPoints}
                />
              ))}
            </div>
          </div>
        </div>
      </CardBox>
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
        <h3 className="grow font-bold text-xl text-breadgray-grey100 dark:text-breadgray-ultra-white tracking-wide">
          {projectsMeta[address].name}
        </h3>
        <span>{`${formatVotePercentage(percentage)}%`}</span>
      </div>
      <div className="bg-breadgray-white dark:bg-breadgray-grey100 overflow-clip rounded-full border-[4px] border-breadgray-white dark:border-breadgray-grey100">
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
