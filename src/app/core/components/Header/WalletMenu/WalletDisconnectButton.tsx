import Button from "@/app/core/components/Button";

export function WalletDisconnectButton({
  handleDisconnect,
}: {
  handleDisconnect: () => void;
}) {
  return (
    <Button variant="danger" onClick={handleDisconnect}>
      <div className="flex gap-2 p-1 items-center justify-center">
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
      </div>
    </Button>
  );
}
