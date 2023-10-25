import { useConnectedUser } from "@/app/core/hooks/useConnectedUser";
import { formatAddress } from "../../util";
import Button from "../Button";
import { IconContainer, NetworkIcon, WalletIcon } from "../Icons";
import { useDisconnect } from "wagmi";

function MobileWalletDisplay() {
  const { user } = useConnectedUser();

  const { disconnectAsync } = useDisconnect();

  return (
    <section className="flex flex-col px-5 text-xs text-neutral-400">
      <div className="flex items-center justify-end gap-4 pb-6">
        <IconContainer size="6">
          <NetworkIcon />
        </IconContainer>
        {user.status === "LOADING" && <>loading</>}
        {/* {!user &&
            ? "Unsupported"
            : 
          : "Not Connected"} */}
      </div>
      {user.status === "CONNECTED" || user.status === "UNSUPPORTED_CHAIN" ? (
        <div className="flex flex-col gap-4">
          <span>{user.chain.name}</span>
          <span className="items-right flex w-full items-center justify-end gap-4 truncate text-ellipsis pt-0.5 text-xs md:justify-end">
            <IconContainer size="5">
              <WalletIcon />
            </IconContainer>
            {formatAddress(user.address)}
          </span>

          <div className="flex justify-end">
            <a
              className="text-neutral-400 underline hover:text-neutral-300"
              target="_blank"
              href={`https://polygonscan.com/address/${user.address}`}
              rel="noreferrer"
            >
              View account
            </a>
          </div>
          <div className="flex justify-end pt-6">
            <Button variant="small" onClick={() => disconnectAsync()}>
              Disconnect
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-end gap-4">
          <IconContainer>
            <WalletIcon />
          </IconContainer>
          <span className="flex items-center justify-center truncate text-ellipsis pt-0.5 pr-2 text-xs text-neutral-400  md:justify-end ">
            Not connected
          </span>
        </div>
      )}
    </section>
  );
}
export default MobileWalletDisplay;
