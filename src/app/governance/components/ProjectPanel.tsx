"use client";
import { useEffect, useState } from "react";
import { ProjectRow, VoteDisplay, VoteForm } from "./ProjectRow";
import { CastVote, CastVotePanel } from "./CastVote";
import {
  TConnectedUserState,
  useConnectedUser,
} from "@/app/core/hooks/useConnectedUser";
import { VotesPanel } from "./VotesPanel";
import { AccountMenu } from "@/app/core/components/Header/AccountMenu";
import { useCurrentVotingDistribution } from "../useCurrentVotingDistribution";
import { useCastVote } from "../useCastVote";
import { useCurrentVotes } from "../useCurrentVotes";
import { useUserVotingPower } from "../useUserVotingPower";
import { useTokenBalances } from "@/app/core/context/TokenBalanceContext/TokenBalanceContext";
import { VotingPower } from "./VotingPower";

export type Project = {
  address: `0x${string}`;
  points: number;
};

export function ProjectPanel() {
  const { user, isSafe } = useConnectedUser();
  const { currentVotingDistribution } = useCurrentVotingDistribution();
  const { castVote } = useCastVote(user);
  const { userVotingPower } = useUserVotingPower(user);
  const { BREAD } = useTokenBalances();

  const [projects, setProjects] = useState<Array<Project>>([]);

  useEffect(() => {
    if (currentVotingDistribution) {
      setProjects(
        currentVotingDistribution[0].map((address) => ({
          address,
          points: 0,
        }))
      );
    }
  }, [currentVotingDistribution]);

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
    <div>
      <div className="p-4 md:p-8">
        <div>voting power: {JSON.stringify(userVotingPower)}</div>
        <div>
          BREAD balance:{" "}
          {JSON.stringify(
            BREAD?.status === "SUCCESS" ? BREAD.value : "loading???"
          )}
        </div>
      </div>
      <div className="grid grid-cols-12 p-4 md:p-8 gap-8">
        <div className="col-span-12 md:col-span-8">
          <div className="grid grid-cols-1 gap-4">
            {currentVotingDistribution &&
              currentVotingDistribution[0].map((address, i) => {
                return (
                  <ProjectRow key={address} address={address}>
                    {castVote && castVote.length > 0 ? (
                      <VoteDisplay
                        points={castVote[i]}
                        percentage={(castVote[i] / castTotalPoints) * 100 || 0}
                      />
                    ) : (
                      <VoteForm
                        value={projects[i]?.points}
                        updateValue={updateValue}
                        address={address}
                        totalPoints={totalPoints}
                      />
                    )}
                  </ProjectRow>
                );
              })}
            <CastVotePanel
              user={user}
              userVote={projects.map((project) => project.points)}
              voteIsCast={castVote && castVote.length > 0 ? true : false}
              breadBalance={
                BREAD?.status === "SUCCESS" ? Number(BREAD.value) : null
              }
              isSafe={isSafe}
              votingPower={userVotingPower}
            />
          </div>
        </div>
        <div className="col-span-12 md:col-span-4">
          <VotesPanel distribution={currentVotingDistribution} />
        </div>
      </div>
    </div>
  );
}
