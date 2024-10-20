import Image from "next/image";
import { LogoSVG } from "./Logo";
import clsx from "clsx";

export function XDAIIcon() {
  return (
    <div className="rounded-full overflow-hidden w-6 h-6">
      <Image src={"/xdai_icon.png"} alt="xdai icon" width="30" height="30" />
    </div>
  );
}

export function WXDAIIcon({ size = "regular" }: { size?: "regular" | "full" }) {
  return (
    <div
      className={clsx(
        "rounded-full overflow-hidden",
        size === "full" && "size-full",
        size === "regular" && "w-6 h-6"
      )}
    >
      <Image src={"/wxdai_icon.png"} alt="wxdai icon" width="30" height="30" />
    </div>
  );
}

export function BreadIcon({
  size = "regular",
  className = "",
}: {
  size?: "small" | "regular" | "full";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "rounded-full bg-breadpink-200 bg-opacity-10 dark:bg-breadgray-rye flex items-center justify-center",
        size === "small" && "size-4",
        size === "regular" && "size-6",
        size === "full" && "size-full",
        className
      )}
    >
      <div className="w-6/12">
        <LogoSVG />
      </div>
    </div>
  );
}
