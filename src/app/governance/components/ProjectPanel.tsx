import { useEffect, useMemo, useState } from "react";
import { ProjectRow } from "./ProjectRow";
import { useQuery } from "react-query";
import { SubmitVote } from "./SubmitVote/SubmitVote";
import { useConnect } from "wagmi";
import { useConnectedUser } from "@/app/core/hooks/useConnectedUser";
import { VotesPanel } from "./VotesPanel";
import Button from "@/app/core/components/Button";
import { AccountMenu } from "@/app/core/components/Header/AccountMenu";

export type ProjectAPI = {
  id: string;
  name: string;
  wallet_address: string;
  value: number | null;
};

export type VoteAPI = {
  id: string;
  createdAt: Date;
  projectId: string;
  value: number;
  walletAddress: string;
};
export function ProjectPanel() {
  const [projects, setProjects] = useState<ProjectAPI[]>([]);
  const { user } = useConnectedUser();

  const { data, error, isLoading } = useQuery<ProjectAPI[]>(
    "memberProjects",

    async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BREAD_API_URL}/projects`
      );
      return res.json();
    },
    {
      refetchInterval: 1000,
    }
  );

  useEffect(() => {
    if (data) {
      setProjects(data);
    }
  }, [data, error]);

  function updateValue(value: number | null, id: string) {
    const newProjects = projects.map((project) => {
      if (project.id === id) {
        return { ...project, value };
      }
      return project;
    });
    setProjects(newProjects);
  }

  const { pointsRemaining, total } = projects.reduce(
    (acc, project) => {
      return {
        total: acc.total + (project.value || 0),
        pointsRemaining: acc.pointsRemaining - (project.value || 0),
      };
    },
    { pointsRemaining: 100, total: 0 } as {
      pointsRemaining: number;
      total: number;
    }
  );

  return (
    <div className="grid grid-cols-12 p-4 md:p-8 gap-8">
      <div className="col-span-12 md:col-span-8">
        <div className="grid grid-cols-1 gap-4">
          {projects.length === 0 && !isLoading && <div>no projects</div>}
          {projects.length > 0 &&
            projects.map((project) => (
              <ProjectRow
                key={project.id}
                id={project.id}
                name={project.name}
                value={project.value}
                updateValue={updateValue}
                pointsRemaining={pointsRemaining}
                total={total}
              />
            ))}
          <div>
            {user.status === "NOT_CONNECTED" && (
              <AccountMenu variant="large" fullWidth>
                <div className="tracking-wider">Connect to vote</div>
              </AccountMenu>
            )}
            {user.status === "CONNECTED" && (
              <SubmitVote projects={projects} user={user} />
            )}
          </div>
        </div>
      </div>
      <div className="col-span-4">
        {projects.length > 0 && <VotesPanel projects={projects} />}
      </div>
    </div>
  );
}
