"use client";
import { useEffect, useState } from "react";
import { ProjectRow, VoteDisplay, VoteForm } from "./ProjectRow";
import { SubmitVote } from "./SubmitVote/SubmitVote";
import { useConnectedUser } from "@/app/core/hooks/useConnectedUser";
import { VotesPanel } from "./VotesPanel";
import { AccountMenu } from "@/app/core/components/Header/AccountMenu";
import { useMemberProjects } from "../useMemberProjects";
import { useCastVote } from "../useCastVote";
import { formatUnits } from "viem";

export type Project = {
  address: `0x${string}`;
  points: number;
};

export function ProjectPanel() {
  const { user } = useConnectedUser();
  const { memberProjects } = useMemberProjects();
  const { castVote } = useCastVote(user);

  const [projects, setProjects] = useState<Array<Project>>([]);

  useEffect(() => {
    if (memberProjects) {
      setProjects(
        memberProjects.map((address) => ({
          address,
          points: 0,
        }))
      );
    }
  }, [memberProjects]);

  function updateValue(value: number, address: `0x${string}`) {
    const updatedProjects = projects.map((project) => {
      if (project.address === address) {
        return { ...project, points: value };
      }
      return project;
    });
    setProjects(updatedProjects);
  }

  const totalPoints = projects.reduce((acc, project) => {
    return acc + project.points;
  }, 0);

  const castTotalPoints = castVote
    ? castVote.reduce((acc, num) => acc + num, 0)
    : 0;

  return (
    <div className="grid grid-cols-12 p-4 md:p-8 gap-8">
      <div className="col-span-12 md:col-span-8">
        <div className="grid grid-cols-1 gap-4">
          {memberProjects &&
            memberProjects.map((projectAddress, i) => (
              <ProjectRow key={projectAddress} address={projectAddress}>
                {castVote && castVote.length > 0 ? (
                  <VoteDisplay
                    points={castVote[i]}
                    percentage={(castVote[i] / castTotalPoints) * 100 || 0}
                  />
                ) : (
                  <VoteForm
                    value={projects[i]?.points}
                    updateValue={updateValue}
                    address={projectAddress}
                    totalPoints={totalPoints}
                  />
                )}
              </ProjectRow>
            ))}
          <div>
            {user.status === "NOT_CONNECTED" && (
              <AccountMenu variant="large" fullWidth>
                <div className="tracking-wider">Connect to vote</div>
              </AccountMenu>
            )}
            {user.status === "CONNECTED" && (
              <SubmitVote
                vote={projects.map((project) => project.points)}
                user={user}
              />
            )}
          </div>
        </div>
      </div>
      <div className="col-span-4">
        <VotesPanel projects={projects} />
      </div>
    </div>
  );
}
