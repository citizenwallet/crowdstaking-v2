import { BreadIcon } from "@/app/core/components/Icons/TokenIcons";
import { useWatchAsset } from "@/app/core/hooks/useWatchAsset";

export function AddTokenButton() {
  const { watchAsset } = useWatchAsset();

  return (
    <button
      className="flex w-full whitespace-nowrap rounded-full
      mt-2 px-3 py-2
      dark:bg-breadgray-toast bg-breadgray-white border
      border-breadgray-white dark:hover:bg-breadgray-burnt
      dark:border-none dark:hover:border-none
      hover:border-breadpink-pink text-base"
      onClick={watchAsset}
    >
      <div className="flex gap-2 m-auto items-center">
        <BreadIcon />
        <span className="text-center">Add token to wallet</span>
      </div>
    </button>
  );
}
