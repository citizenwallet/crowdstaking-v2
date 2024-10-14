import { CardBox } from "@/app/core/components/CardBox";
import { PowerIcon } from "@/app/core/components/Icons/PowerIcon";

export function VotingPowerPanel() {
  return (
    <CardBox>
      <div className="p-4 flex flex-col items-center">
        <h2 className="font-medium text-xl dark:text-breadgray-light-grey">
          MY VOTING POWER
        </h2>
        <div className="flex gap-2">
          <PowerIcon />
          <div className="font-bold text-3xl text-breadgray-ultra-white">
            5000
          </div>
        </div>
      </div>
    </CardBox>
  );
}
