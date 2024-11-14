import { useEffect, useState } from "react";
import { CardBox } from "@/app/core/components/CardBox";
import { FistIcon } from "@/app/core/components/Icons/FistIcon";
import { AccountMenu } from "@/app/core/components/Header/AccountMenu";
import { LinkIcon } from "@/app/core/components/Icons/LinkIcon";
import TooltipIcon from "@/app/core/components/Icons/TooltipIcon";
import { useConnectedUser } from "@/app/core/hooks/useConnectedUser";

export function VotingPowerPanel() {
  const { user } = useConnectedUser();
  const [userIsConnected, setUserIsConnected] = useState(false);

  useEffect(() => {
    setUserIsConnected(user.status === "CONNECTED");
  }, [user]);

  const renderAsConnected = (value: String) => {
    return userIsConnected ? <span>{value}</span> : "-";
  };

  return (
    <CardBox>
      <div className="p-4 flex flex-col items-center">
        <h2 className="font-medium text-xl dark:text-breadgray-light-grey">
          MY VOTING POWER
        </h2>
        <div className="flex gap-2 items-center mb-2">
          <span className="size-6 flex rounded-full bg-white dark:bg-breadgray-charcoal">
            <FistIcon />
          </span>
          <div className="font-bold text-3xl text-breadgray-rye dark:text-breadgray-ultra-white">
            {/* TODO: add dynamic value */}
            5000
          </div>
        </div>
        <div className="pb-4">
          <p className="font-medium text-xs text-breadgray-rye dark:text-breadgray-grey">
            Accessible voting power
            <span className=" ">
              <TooltipIcon />
            </span>
          </p>
        </div>

        {/* voting power grid */}
        <div className="grid grid-cols-[repeat(2, max-content)] gap-3 py-3 border-1 border-t border-t-breadgray-light-grey dark:border-t-breadgray-rye">
          <p className="text-breadgray-rye dark:text-breadgray-grey">
            Voting power from locked LP
          </p>

          <span className="font-bold text-breadgray-grey100 dark:text-breadgray-white">
            {/* TODO: add dynamic value */}
            {renderAsConnected("1000")}
          </span>

          <p className="text-breadgray-rye dark:text-breadgray-grey">
            Voting power from $BREAD
          </p>
          <span className="text-right font-bold text-breadgray-grey100 dark:text-breadgray-white">
            {/* TODO: add dynamic value */}
            {renderAsConnected("500")}
          </span>

          <div className="col-span-2 h-[1px] bg-breadgray-rye" />

          <p className="text-breadgray-rye dark:text-breadgray-grey">
            Total locked LP tokens
          </p>

          <span className="text-right font-bold text-breadpink-100">
            {/* TODO: add dynamic value */}
            {renderAsConnected("100")}
          </span>

          {userIsConnected && (
            <>
              <p className="text-breadgray-rye dark:text-breadgray-grey">
                Pending voting power
              </p>

              <span className="text-right font-bold text-breadgray-rye dark:text-breadgray-grey">
                {/* TODO: add dynamic value */}
                {renderAsConnected("500")}
              </span>
            </>
          )}
          {!userIsConnected && (
            <AccountMenu fullWidth={true} size="large">
              Connect
            </AccountMenu>
          )}
        </div>
        <a
          className="flex items-center gap-2 text-sm font-medium pt-4 text-breadgray-grey100 hover:text-breadpink-shaded dark:text-breadgray-ultra-white"
          href="https://breadchain.notion.site/BREAD-Voting-Power-UI-0f2d350320b94e4ba9aeec2ef6fdcb84"
          target="_blank"
          rel="noopener noreferrer"
        >
          How does this work?
          <div className="text-breadpink-shaded">
            <LinkIcon />
          </div>
        </a>
      </div>
    </CardBox>
  );
}
