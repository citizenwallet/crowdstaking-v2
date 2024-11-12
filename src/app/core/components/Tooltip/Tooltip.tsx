import { forwardRef, Ref, useId, type ReactNode } from "react";
import { Tooltip as ReactTooltip } from "react-tooltip";
import TooltipIcon from "@/app/core/components/Icons/TooltipIcon";

interface IProps {
  children: ReactNode;
}

const Tooltip = forwardRef(
  ({ children }: IProps, ref: Ref<HTMLButtonElement>) => {
    const id = useId();

    return (
      <div>
        <ReactTooltip anchorSelect=".my-tooltip" place="top"></ReactTooltip>
        <a data-tooltip-id={id}>
          {" "}
          <TooltipIcon />
        </a>
        <ReactTooltip
          id={id}
          className="!bg-breadgray-white/80 dark:!bg-breadgray-burnt/80 !rounded-[15px] !text-breadgray-grey100 dark:!text-breadgray-ultra-white !p-5 !backdrop-blur-sm"
          opacity={1}
        >
          <div className="max-w-[210px] text-base font-normal">{children}</div>
        </ReactTooltip>
      </div>
    );
  }
);

Tooltip.displayName = "Tooltip";

export default Tooltip;
