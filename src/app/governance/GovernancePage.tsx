"use client";
import { useEffect, useMemo, useState } from "react";

import { ProjectRow, VoteDisplay, VoteForm } from "./components/ProjectRow";
import { CastVotePanel } from "./components/CastVote";
import { useConnectedUser } from "@/app/core/hooks/useConnectedUser";
import { ResultsPanel } from "./components/ResultsPanel";
import { useCurrentVotingDistribution } from "./useCurrentVotingDistribution";
import { useCastVote } from "./useCastVote";
import { useUserVotingPower } from "./useUserVotingPower";
import { DistributionOverview } from "./components/DistributionOverview";
import { Hex } from "viem";
import { VotingPower } from "./components/VotingPower";
import { useLastClaimedBlockNumber } from "./useLastClaimedBlockNumber";
import { useCycleLength } from "./useCycleLength";
import { Spinner } from "../core/components/Icons/Spinner";
import { useCycleEndDate } from "./useCycleEndDate";
import { useMinRequiredVotingPower } from "./useMinRequiredVotingPower";
import { InfoCallout } from "./components/InfoCallout";
import { useDistributions } from "./useDistributions";
import { useModal } from "../core/context/ModalContext";

export type Project = {
  address: Hex;
  points: number;
};

export function GovernancePage() {
  const { user, isSafe } = useConnectedUser();
  const { currentVotingDistribution } = useCurrentVotingDistribution();
  const { lastClaimedBlocknumber } = useLastClaimedBlockNumber();
  const { cycleLength } = useCycleLength();
  const { castVote } = useCastVote(user, lastClaimedBlocknumber);
  const { userVotingPower } = useUserVotingPower(user, cycleLength);
  const { minRequiredVotingPower } = useMinRequiredVotingPower();
  const distributions = useDistributions();

  const { cycleEndDate } = useCycleEndDate(cycleLength);

  const [projects, setProjects] = useState<Array<Project>>([]);
  const [isRecasting, setIsRecasting] = useState<boolean>(false);

  const { modalState, setModal } = useModal();

  useEffect(() => {
    if (modalState?.type === "CONFIRM_RECAST" && modalState.isConfirmed) {
      setModal(null);
      setIsRecasting(true);
    }
  }, [modalState, setModal]);

  useEffect(() => {
    if (projects.length) return;
    if (currentVotingDistribution.status === "SUCCESS") {
      setProjects(
        currentVotingDistribution.data[0].map((address) => ({
          address,
          points: 0,
        }))
      );
    }
  }, [currentVotingDistribution]);

  function updateValue(value: number, address: Hex) {
    const updatedProjects = projects.map((project) => {
      if (project.address === address) {
        return { ...project, points: value };
      }
      return project;
    });
    setProjects(updatedProjects);
  }

  function distributeEqually() {
    setProjects(projects.map((project) => ({ ...project, points: 1 })));
  }

  const totalPoints = projects.reduce((acc, project) => {
    return acc + project.points;
  }, 0);

  const castTotalPoints = castVote
    ? castVote.reduce((acc, num) => acc + num, 0)
    : 0;

  const userHasVoted = useMemo(() => {
    return castVote && castVote.length > 0 ? true : false;
  }, [castVote]);

  useEffect(() => {
    if (castVote && castVote.length > 0) {
      console.log("here it is:::::::::::", castVote, "\n");
      setProjects((projects) =>
        projects.map((p, i) => ({
          ...p,
          points: castVote[i],
        }))
      );
    }
  }, [castVote]);

  const userCanVote =
    userVotingPower &&
    minRequiredVotingPower &&
    userVotingPower > Number(minRequiredVotingPower)
      ? true
      : false;

  if (
    currentVotingDistribution.status === "ERROR" ||
    cycleEndDate.status === "ERROR" ||
    cycleLength.status === "ERROR"
  )
    return (
      <div className="w-full flex justify-center pt-32">
        <h1>ERROR</h1>
      </div>
    );

  if (
    !projects.length ||
    currentVotingDistribution.status === "LOADING" ||
    cycleEndDate.status === "LOADING" ||
    cycleLength.status === "LOADING"
  )
    return (
      <div className="w-full flex justify-center pt-32">
        <div className="size-10 text-breadgray-grey">
          <Spinner />
        </div>
      </div>
    );

  console.log({ projects });
  console.log({ projects });

  return (
    <section className="grow max-w-[44rem] lg:max-w-[67rem] w-full m-auto pb-16">
      <div className="max-w-96 m-auto sm:max-w-none grid w-full grid-cols-12 governance-rows p-4 md:p-8 gap-y-8 sm:gap-8 lg:gap-5 lg:gap-y-3">
        <div className="col-span-12 lg:col-span-8 row-start-1 row-span-1">
          <h3 className="text-3xl font-bold text-breadgray-grey100 dark:text-breadgray-ultra-white">
            Bread Governance
          </h3>
          <p className="pt-4 text-lg max-w-xl text-breadgray-rye dark:text-breadgray-light-grey">
            Distribute your voting power across the various projects in the
            Breadchain Network to influence how much yield is given to each. The
            actual distribution will be made at the end of the month based on
            all votes received.
          </p>
        </div>

        <DistributionOverview cycleEndDate={cycleEndDate} />

        <div className="max-w-md m-auto col-span-12 row-start-3 row-span-1 lg:row-start-3 lg:col-start-9 lg:col-span-4 h-full flex flex-col gap-4">
          <ResultsPanel distribution={currentVotingDistribution} />
          <InfoCallout />
        </div>

        <div className="col-span-12 row-start-4 lg:col-start-1 lg:col-span-8 lg:row-start-2">
          <VotingPower
            minRequiredVotingPower={minRequiredVotingPower}
            userVotingPower={userVotingPower}
            userHasVoted={userHasVoted}
            cycleEndDate={cycleEndDate}
            cycleLength={cycleLength}
            userCanVote={userCanVote}
            user={user}
            distributeEqually={distributeEqually}
            isRecasting={isRecasting}
          />
        </div>
        <div className="col-span-12 row-start-5 lg:col-start-1 lg:col-span-8 lg:row-start-3 grid grid-cols-1 gap-3">
          {currentVotingDistribution.data[0].map((address, i) => {
            return (
              <ProjectRow key={address} address={address}>
                {!isRecasting && castVote && castVote.length > 0 ? (
                  <VoteDisplay
                    points={castVote[i]}
                    percentage={(castVote[i] / castTotalPoints) * 100 || 0}
                  />
                ) : (
                  <VoteForm
                    value={projects[i].points}
                    updateValue={updateValue}
                    address={address}
                    totalPoints={totalPoints}
                    user={user}
                    userCanVote={userCanVote}
                  />
                )}
              </ProjectRow>
            );
          })}
          <CastVotePanel
            user={user}
            userVote={projects.map((project) => project.points)}
            userHasVoted={userHasVoted}
            userCanVote={userCanVote}
            isSafe={isSafe}
            isRecasting={isRecasting}
            setIsRecasting={setIsRecasting}
          />
        </div>
      </div>
      {/* <Diagnostics /> */}
    </section>
  );
}
