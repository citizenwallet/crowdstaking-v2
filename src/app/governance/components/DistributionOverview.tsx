import { BreadIcon } from "@/app/core/components/Icons/TokenIcons";
import { formatBalance, formatDate } from "@/app/core/util/formatter";
import { CycleEndDateState, CycleEndDateSuccess } from "../useCycleEndDate";
import { useClaimableYield } from "../useClaimableYield";
import { LinkIcon } from "@/app/core/components/Icons/LinkIcon";
import { CardBox } from "@/app/core/components/CardBox";
import { useContractRead } from "wagmi";
import { SDAI_ADAPTOR_ABI } from "@/abi";
import { useEffect } from "react";

export function DistributionOverview({
  cycleEndDate,
}: {
  cycleEndDate: CycleEndDateState;
}) {
  const { claimableYield } = useClaimableYield();

  const { data, error, status } = useContractRead({
    abi: SDAI_ADAPTOR_ABI,
  });

  useEffect(() => {
    console.log({ status });
    console.log({ data });
  }, [status, data]);

  return (
    <div className="col-span-12 lg:col-span-4 row-start-2 lg:row-start-1 row-span-2">
      <CardBox>
        <div className="max-w-96 m-auto lg:max-w-full flex flex-col items-center justify-center gap-6 p-5 shadow-card">
          <h4 className="text-xl font-medium text-breadgray-rye dark:text-breadgray-light-grey tracking-wide uppercase">
            Amount to Distribute
          </h4>
          <div>
            <div className="flex gap-2 items-center md:justify-end">
              <BreadIcon />
              <span className="text-3xl font-bold dark:text-breadgray-ultra-white leading-none">
                {claimableYield && formatBalance(claimableYield, 2)}
              </span>
            </div>
            <p>Current accumulated yield</p>
          </div>
          <div className="flex w-full">
            <p className="grow">estimated after 30 days</p>
            <span>2204</span>
          </div>

          <div className="flex w-full">
            <p className="grow">Voting cycle #2</p>
            <span>1 Aug - 30 Aug</span>
          </div>
          {cycleEndDate.status === "LOADING" ? (
            <span>--/--/--</span>
          ) : cycleEndDate.status === "ERROR" ? (
            <span>err </span>
          ) : (
            <DaysRemaining cycleEndDate={cycleEndDate} />
          )}
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
      </CardBox>
    </div>
  );
}

function DaysRemaining({
  cycleEndDate,
}: {
  cycleEndDate: CycleEndDateSuccess;
}) {
  const daysRemaining =
    Date.parse(cycleEndDate.data.toDateString()) - Date.now();

  console.log("------------------------------------");
  console.log(Date.parse(cycleEndDate.data.toDateString()));
  console.log(Date.now());
  console.log({ daysRemaining });
  const secondsRemaining = daysRemaining / 1000;
  const hoursRemaining = secondsRemaining / 60;
  console.log("secondsRemaining: ", secondsRemaining);
  console.log("hoursRemaining: ", hoursRemaining);

  console.log(daysRemaining / (1000 * 360 * 24));
  return (
    <span>
      Distributing in
      {formatDate(cycleEndDate.data)}
    </span>
  );
}
