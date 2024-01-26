import { truncateAddress } from "@/app/core/util/formatter";
import { watchAsset } from "@/app/core/util/watchAsset";
import { BreadIcon } from "../../../Icons/TokenIcons";

export function WalletMenuContent({
  accountAddress,
  handleDisconnect,
}: {
  accountAddress: string;
  handleDisconnect: () => void;
}) {
  return (
    <div className="bg-breadgray-charcoal border-breadgray-burnt rounded p-4 text-xs flex flex-col items-end gap-4">
      <button
        onClick={() => {
          navigator.clipboard.writeText(accountAddress).catch((err): void => {
            console.log(err);
          });
        }}
        title="copy address"
        className="text-neutral-400 hover:text-neutral-300 text-base font-bold tracking-wider flex gap-4 items-center active:underline"
      >
        <span>{truncateAddress(accountAddress)}</span>
        <svg
          className="fill-current w-4 h-4"
          viewBox="0 0 16 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0H11V2H2V15H0V0ZM4 4H16V20H4V4ZM6 6V18H14V6H6Z"
          />
        </svg>
      </button>
      <button
        className="flex items-center gap-2 whitespace-nowrap rounded-full full px-3 py-2  bg-breadgray-og-dark text-base"
        onClick={watchAsset}
      >
        <BreadIcon />
        <span>Add token to wallet</span>
      </button>
      <WalletDisconnectButton handleDisconnect={handleDisconnect} />
    </div>
  );
}

function WalletDisconnectButton({
  handleDisconnect,
}: {
  handleDisconnect: () => void;
}) {
  return (
    <button
      className="py-2 px-6 rounded-lg border border-status-danger text-status-danger font-bold text-lg tracking-wider flex items-center gap-4"
      onClick={handleDisconnect}
    >
      <svg
        className="w-3.5 h-3.5 -translate-y-[0.05rem]"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          className="fill-current"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2 0H16H18V2V4H16V2H2V16H16V14H18V16V18H16H2H0V16V2V0H2ZM18 8H16V6H14V4H12V6H14V8H4V10L14 10V12H12V14H14V12H16V10L18 10V8Z"
        />
      </svg>

      <span>Disconnect</span>
    </button>
  );
}
