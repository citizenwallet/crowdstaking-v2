import clsx from "clsx";

import { CheckIcon } from "@/app/core/components/Icons/CheckIcon";
import { formatBalance, formatDate } from "@/app/core/util/formatter";
import { PowerIcon } from "@/app/core/components/Icons/PowerIcon";
import { TConnectedUserState } from "@/app/core/hooks/useConnectedUser";
import { CycleEndDateState } from "../useCycleEndDate";
import { CycleLengthSuccess } from "../useCycleLength";

export function VotingPower({
  minRequiredVotingPower,
  userVotingPower,
  userHasVoted,
  userCanVote,
  cycleEndDate,
  cycleLength,
  user,
}: {
  minRequiredVotingPower: number | null;
  userVotingPower: number | null;
  userHasVoted: boolean;
  userCanVote: boolean;
  cycleEndDate: CycleEndDateState;
  cycleLength: CycleLengthSuccess;
  user: TConnectedUserState;
}) {
  const days = (cycleLength.data * 5) / 60 / 60 / 24;
  return (
    <section className="sm:pt-8 sm:pb-4 flex flex-col sm:flex-row">
      <div className="grow">
        <div className="flex gap-2 items-center">
          <span className="size-5">
            <PowerIcon />
          </span>
          <span className="font-bold text-2xl leading-none">
            Voting power:{" "}
          </span>
          <span className="font-medium text-xl">
            {user.status === "NOT_CONNECTED"
              ? null
              : // <span className="text-base text-breadgray-grey">
                //   connect wallet
                // </span>
                userVotingPower &&
                formatBalance(userVotingPower / cycleLength.data, 2)}
          </span>
        </div>
        <p className="max-w-96 dark:text-breadgray-light-grey pt-2">
          {`Your Voting Power is equal to the average amount of BREAD you held during the ${Math.round(
            days
          )} days up until the current round of voting opened.`}
        </p>
      </div>
      <div className="pt-6 sm:p-0">
        {userHasVoted ? (
          <UserHasVoted cycleEndDate={cycleEndDate} />
        ) : !userCanVote &&
          minRequiredVotingPower !== null &&
          userVotingPower !== null &&
          userVotingPower < minRequiredVotingPower ? (
          <NotEnoughPower />
        ) : null}
      </div>
    </section>
  );
}
const widgetBaseClasses =
  "py-3 sm:py-2 px-4 sm:w-[215px] flex flex-col items-center justify-center rounded-xl border-2";

function NotEnoughPower() {
  return (
    <div className={clsx(widgetBaseClasses, "border-status-danger")}>
      <span className="dark:text-breadgray-ultra-white font-bold text-xl">
        No Power
      </span>
      <a
        className="font-bold text-breadpink-shaded"
        href="https://breadchain.notion.site/BREAD-Voting-Power-UI-0f2d350320b94e4ba9aeec2ef6fdcb84"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn why
      </a>
    </div>
  );
}

function UserHasVoted({ cycleEndDate }: { cycleEndDate: CycleEndDateState }) {
  return (
    <div className={clsx(widgetBaseClasses, "border-status-success")}>
      <div className="flex gap-4">
        <div className="w-7 h-7 flex items-center text-status-success">
          <CheckIcon />
        </div>
        <span className="dark:text-breadgray-ultra-white font-bold text-xl">
          Voted
        </span>
      </div>
      <div>
        <span className="dark:text-breadgray-grey">Next round: </span>
        {(() => {
          switch (cycleEndDate.status) {
            case "LOADING":
              return <span>--/--/--</span>;
            case "SUCCESS":
              return <span>{formatDate(cycleEndDate.data)}</span>;
            case "ERROR":
            default:
              throw new Error("Invalid status!");
          }
        })()}
      </div>
    </div>
  );
}
