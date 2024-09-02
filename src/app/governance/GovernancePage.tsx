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
import { useCycleDates } from "./useCycleDates";
import { useMinRequiredVotingPower } from "./useMinRequiredVotingPower";
import { InfoCallout } from "./components/InfoCallout";
import { useDistributions } from "./useDistributions";
import { useModal } from "../core/context/ModalContext";
import { ProjectMeta, projectsMeta } from "../projectsMeta";

export type Project = {
  address: Hex;
  points: number;
};

type ProjectWithMeta = Prettify<
  ProjectMeta & { account: Hex; currentDistribution: number }
>;

type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type CurrentProjectsLoading = { status: "LOADING"; data: null };
export type CurrentProjectsSuccess = {
  status: "SUCCESS";
  data: ProjectWithMeta[];
  sortedData: ProjectWithMeta[];
};
export type CurrentProjectsError = { status: "ERROR"; data: null };
export type CurrentProjectsState =
  | CurrentProjectsLoading
  | CurrentProjectsSuccess
  | CurrentProjectsError;

export function GovernancePage() {
  const { user, isSafe } = useConnectedUser();
  const { currentVotingDistribution } = useCurrentVotingDistribution();
  const { lastClaimedBlocknumber } = useLastClaimedBlockNumber();
  const { cycleLength } = useCycleLength();
  const { castVote } = useCastVote(user, lastClaimedBlocknumber);
  const { userVotingPower } = useUserVotingPower(user, cycleLength);
  const { minRequiredVotingPower } = useMinRequiredVotingPower();
  const { data: distributionsData } = useDistributions();

  const { cycleDates } = useCycleDates(cycleLength);

  const [projects, setProjects] = useState<Array<Project>>([]);
  const [isRecasting, setIsRecasting] = useState<boolean>(false);

  const { modalState, setModal } = useModal();

  useEffect(() => {
    if (modalState?.type === "CONFIRM_RECAST" && modalState.isConfirmed) {
      setModal(null);
      setIsRecasting(true);
    }
  }, [modalState, setModal]);

  const currentProjects = useMemo<CurrentProjectsState>(() => {
    if (currentVotingDistribution.status === "LOADING")
      return { status: "LOADING", data: null };

    if (currentVotingDistribution.status === "ERROR")
      return { status: "ERROR", data: null };
    let data;
    try {
      data = currentVotingDistribution.data[0].map(
        (account, i): ProjectWithMeta => {
          if (!projectsMeta[account])
            throw new Error("no metadata found for project!");
          return {
            account,
            ...projectsMeta[account],
            currentDistribution: currentVotingDistribution.data[1][i],
          };
        }
      );
    } catch (err) {
      console.log(err);
      return {
        status: "ERROR",
        data: null,
      };
    }
    return {
      status: "SUCCESS",
      data,
      sortedData: data.toSorted((a, b) => a.order - b.order),
    };
  }, [currentVotingDistribution]);

  useEffect(() => {
    if (projects.length) return;
    if (currentProjects.status === "SUCCESS") {
      setProjects(
        currentProjects.data.map((project) => ({
          address: project.account,
          points: 0,
        }))
      );
    }
  }, [currentProjects, projects]);

  function updateValue(value: number, address: Hex) {
    console.log("value: ", value);
    console.log("address: ", address);
    const updatedProjects = projects.map((project) => {
      if (project.address === address) {
        return { ...project, points: value };
      }
      return project;
    });
    console.dir({ projects });
    console.dir({ updatedProjects });
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
    currentProjects.status === "ERROR" ||
    cycleDates.status === "ERROR" ||
    cycleLength.status === "ERROR"
  )
    return (
      <div className="w-full flex justify-center pt-32">
        <h1>ERROR</h1>
      </div>
    );

  if (
    currentProjects.status === "LOADING" ||
    currentVotingDistribution.status === "LOADING" ||
    cycleDates.status === "LOADING" ||
    cycleLength.status === "LOADING"
  )
    return (
      <div className="w-full flex justify-center pt-32">
        <div className="size-10 text-breadgray-grey">
          <Spinner />
        </div>
      </div>
    );

  return (
    <section className="grow w-full max-w-[44rem] lg:max-w-[67rem] m-auto pb-16 lg:px-8">
      <div className="grid w-full grid-cols-12 governance-rows p-4 md:py-8 md:px-2 gap-y-8 sm:gap-8 lg:gap-5 lg:gap-y-3">
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

        <DistributionOverview
          cycleDates={cycleDates}
          distributions={distributionsData}
        />

        <div className="max-w-md m-auto col-span-12 row-start-3 row-span-1 lg:row-start-3 lg:col-start-9 lg:col-span-4 h-full flex flex-col gap-4">
          <ResultsPanel projects={currentProjects} />
          <InfoCallout />
        </div>

        <div className="col-span-12 row-start-4 lg:col-start-1 lg:col-span-8 lg:row-start-2">
          <VotingPower
            minRequiredVotingPower={minRequiredVotingPower}
            userVotingPower={userVotingPower}
            userHasVoted={userHasVoted}
            cycleDates={cycleDates}
            cycleLength={cycleLength}
            userCanVote={userCanVote}
            user={user}
            distributeEqually={distributeEqually}
            isRecasting={isRecasting}
          />
        </div>
        <div className="col-span-12 row-start-5 lg:col-start-1 lg:col-span-8 lg:row-start-3 grid grid-cols-1 gap-3">
          {currentProjects.sortedData.map((project, i) => {
            return (
              <ProjectRow key={project.account} address={project.account}>
                {!isRecasting && castVote && castVote.length > 0 ? (
                  <VoteDisplay
                    points={castVote[i]}
                    percentage={(castVote[i] / castTotalPoints) * 100 || 0}
                  />
                ) : (
                  <VoteForm
                    value={projects[i].points}
                    updateValue={updateValue}
                    address={project.account}
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
