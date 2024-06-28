import { BreadIcon } from "@/app/core/components/Icons/TokenIcons";
import { formatBalance, formatDate } from "@/app/core/util/formatter";
import { CycleEndDateState } from "../useCycleEndDate";
import { useClaimableYield } from "../useClaimableYield";
import Link from "next/link";
import { LinkIcon } from "@/app/core/components/Icons/LinkIcon";

export function ClaimableYield({
  cycleEndDate,
}: {
  cycleEndDate: CycleEndDateState;
}) {
  const { claimableYield } = useClaimableYield();
  return (
    <div className="col-span-12 lg:col-span-4 row-start-2 lg:row-start-1 row-span-1">
      <div className="max-w-96 m-auto lg:max-w-full flex flex-col items-center justify-center gap-2 p-3 rounded-lg bg-breadgray-ultra-white dark:bg-breadgray-charcoal border dark:border-breadgray-toast">
        <h4 className="text-xl font-bold dark:text-breadgray-light-grey">
          Amount to Distribute
        </h4>
        <div className="flex gap-4 items-center md:justify-end">
          <BreadIcon />
          <span className="text-3xl font-medium dark:text-breadgray-ultra-white">
            {claimableYield && formatBalance(claimableYield, 2)}
          </span>
        </div>
        <span>
          Voting ends{" "}
          {cycleEndDate.status === "LOADING" ? (
            <span>--/--/--</span>
          ) : cycleEndDate.status === "SUCCESS" ? (
            formatDate(cycleEndDate.data)
          ) : cycleEndDate.status === "ERROR" ? (
            <span>err</span>
          ) : null}
        </span>
        <div>
          <a
            className="flex items-center gap-2 text-xs mt-2"
            href="https://breadchain.notion.site/BREAD-Voting-Power-UI-0f2d350320b94e4ba9aeec2ef6fdcb84"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn more
            <div className="text-breadpink-shaded">
              <LinkIcon />
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
