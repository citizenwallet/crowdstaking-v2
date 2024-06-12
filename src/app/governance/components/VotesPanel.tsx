import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

import { truncateAddress } from "@/app/core/util/formatter";
import { blo } from "blo";
import { Project } from "./ProjectPanel";
import config from "@/chainConfig";
import { DISBURSER_ABI } from "@/abi";
import { useContractRead } from "wagmi";
import { projectsMeta } from "@/app/projectsMeta";
import { ParsedVote, useVotes } from "../useVotes";

export type VoteAPI = {
  id: string;
  createdAt: Date;
  projectId: string;
  value: number;
  walletAddress: string;
};

export function VotesPanel({
  projectAccounts,
}: {
  projectAccounts: Array<`0x${string}`>;
}) {
  // get start of round blocknumber
  const {
    data: lastClaimedBlockNumberData,
    status: lastClaimedBlockNumberStatus,
  } = useContractRead({
    address: config[100].DISBURSER.address,
    abi: DISBURSER_ABI,
    functionName: "lastClaimedBlocknumber",
    watch: true,
  });

  // console.log({ lastClaimedBlockNumberData, lastClaimedBlockNumberStatus });
  const { data: votesData } = useVotes(
    lastClaimedBlockNumberStatus == "success"
      ? (lastClaimedBlockNumberData as bigint)
      : null
  );

  const totals = useMemo(() => {
    if (!votesData) return;
    return calculateResults(votesData);
  }, [votesData]);

  return (
    <section className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 gap-8 rounded-lg bg-breadgray-charcoal border border-breadgray-toast p-4">
        <div className="grid grid-cols-1 gap-4">
          <h3 className="uppercase font-medium text-xl text-breadgray-light-grey">
            results
          </h3>
          <div className="grid grid-cols-1 gap-6">
            {projectAccounts &&
              projectAccounts.map((account) => (
                <ResultsProject
                  key={`project_result_${account}`}
                  address={account}
                  value={totals?.projects[account] || null}
                  total={(totals?.count && totals.count * 10000) || null}
                />
              ))}
          </div>
        </div>
      </div>
      {/* <div className="grid grid-cols-1 gap-3 rounded-lg bg-breadgray-charcoal border border-breadgray-toast p-4">
        <h3 className="uppercase font-medium text-xl text-breadgray-light-grey">
          Votes
        </h3>
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
      </div> */}
    </section>
  );
}

function ResultsProject({
  value,
  total,
  address,
}: {
  value: number | null;
  total: number | null;
  address: `0x${string}`;
}) {
  return (
    <div className="grid grid-cols-1 gap-1">
      <h3 className="font-bold text-xl">{projectsMeta[address].name}</h3>
      <div className="bg-breadgray-grey100 overflow-clip rounded-full border-[4px] border-breadgray-grey100">
        <div
          className="h-1.5 bg-breadviolet-shaded transform transition-width duration-1000 ease-in-out"
          style={{
            width:
              value && total && value !== 0
                ? `${(value / total) * 100}%`
                : "0%",
          }}
        >
          {" "}
        </div>
      </div>
    </div>
  );
}

function calculateResults(votesData: Array<ParsedVote>) {
  return votesData.reduce(
    (acc, vote) => {
      vote.projects.forEach((project, i) => {
        if (!acc.projects[project]) {
          acc.projects[project] = vote.permyriadDistribution[i];
          return;
        }
        acc.projects[project] += vote.permyriadDistribution[i];
      });

      acc.count += 1;
      return acc;
    },
    { count: 0, projects: {} } as {
      projects: {
        [key: string]: number;
      };
      count: number;
    }
  );
}

// const totals = useMemo(() => {
//   return data?.reduce(
//     (acc, vote) => {
//       const projectName = projects.find(
//         (project) => project.id === vote.projectId
//       )?.name;
//       if (!projectName) {
//         return acc;
//       }
//       acc.projects[projectName] =
//         acc.projects[projectName] + vote.value || vote.value;
//       acc.count += 1;

//       if (!acc.voters.find((voter) => voter.address === vote.walletAddress)) {
//         acc.voters.push({
//           address: vote.walletAddress,
//           votedAt: vote.createdAt,
//         });
//       }
//       return acc;
//     },
//     { count: 0, voters: [], projects: {} } as {
//       projects: {
//         [key: string]: number;
//       };
//       voters: {
//         votedAt: Date;
//         address: string;
//       }[];
//       count: number;
//     }
//   );
// }, [data, projects]);
