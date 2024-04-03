import Image from "next/image";
import { useQuery } from "react-query";
import { ProjectAPI, VoteAPI } from "./ProjectPanel";
import { useMemo } from "react";
import { truncateAddress } from "@/app/core/util/formatter";
import { blo } from "blo";

export function VotesPanel({ projects }: { projects: ProjectAPI[] }) {
  const { data, error, isLoading } = useQuery<VoteAPI[]>(
    "votes",
    async () => {
      // console.log("fetching votes");
      const res = await fetch(`${process.env.NEXT_PUBLIC_BREAD_API_URL}/votes`);
      return res.json();
    },
    {
      refetchInterval: 1000,
    }
  );

  const totals = useMemo(() => {
    return data?.reduce(
      (acc, vote) => {
        const projectName = projects.find(
          (project) => project.id === vote.projectId
        )?.name;
        if (!projectName) {
          return acc;
        }
        acc.projects[projectName] =
          acc.projects[projectName] + vote.value || vote.value;
        acc.count += 1;

        if (!acc.voters.find((voter) => voter.address === vote.walletAddress)) {
          acc.voters.push({
            address: vote.walletAddress,
            votedAt: vote.createdAt,
          });
        }
        return acc;
      },
      { count: 0, voters: [], projects: {} } as {
        projects: {
          [key: string]: number;
        };
        voters: {
          votedAt: Date;
          address: string;
        }[];
        count: number;
      }
    );
  }, [data, projects]);

  console.log(
    "totals?.projectstotals?.projectstotals?.projects ",
    totals?.projects
  );

  const totalVotes = totals
    ? Object.keys(totals.projects).reduce((acc, key) => {
        return acc + totals.projects[key];
      }, 0)
    : 0;

  return (
    <section className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 gap-8 rounded-lg bg-breadgray-charcoal border border-breadgray-toast p-4">
        <div className="grid grid-cols-1 gap-4">
          <h3 className="uppercase font-medium text-xl text-breadgray-light-grey">
            results
          </h3>
          <div className="grid grid-cols-1 gap-6">
            {totals &&
              Object.keys(totals.projects).map((key) => (
                <ResultsProject
                  key={`project_votes_${key}`}
                  projectKey={key}
                  value={totals.projects[key]}
                  total={totalVotes}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="grid grid-coles-1 gap-3 rounded-lg bg-breadgray-charcoal border border-breadgray-toast p-4">
        {totals?.voters
          .sort((a, b) => {
            return (
              new Date(b.votedAt).getTime() - new Date(a.votedAt).getTime()
            );
          })
          .map((val) => (
            <div
              key={`voter_${val.address}`}
              className="flex gap-4 items-center"
            >
              <div className="rounded-full overflow-clip w-6 h-6">
                <Image
                  src={blo(val.address as `0x${string}`)}
                  alt="ens avatar"
                  width="24"
                  height="24"
                  className="transform scale-110"
                />
              </div>
              <div className="text-lg">{truncateAddress(val.address)}</div>
            </div>
          ))}
      </div>
    </section>
  );
}

function ResultsProject({
  value,
  total,
  projectKey,
}: {
  value: number;
  total: number;
  projectKey: string;
}) {
  return (
    <div className="grid grid-cols-1 gap-1">
      <h3 className="font-bold text-xl">{projectKey}</h3>
      <div className="bg-breadgray-grey100 overflow-clip rounded-full border-[4px] border-breadgray-grey100">
        <div
          className="h-1.5 bg-breadviolet-shaded transform transition-width duration-1000 ease-in-out"
          style={{ width: value !== 0 ? `${(value / total) * 100}%` : "50%" }}
        >
          {" "}
        </div>
      </div>
    </div>
  );
}
