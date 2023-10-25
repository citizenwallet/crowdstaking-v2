import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { IconContainer, NetworkIcon } from "../../Icons";
import Button from "@/app/core/components/Button";

interface IProps {
  chainString: string;
  accountAddress: string;
  handleCloseMenu: () => void;
  handleDisconnect: () => void;
}

function WalletMenu({
  chainString,
  accountAddress,
  handleCloseMenu,
  handleDisconnect,
}: IProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (!menuRef?.current?.contains(event.target as HTMLDivElement)) {
        handleCloseMenu();
      }
    };
    document.body.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.body.removeEventListener("mousedown", handleDocumentClick);
    };
  }, [handleCloseMenu]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 5,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: 5,
      }}
      transition={{ duration: 0.1 }}
      ref={menuRef}
      className="absolute top-14 right-0 z-10 flex transform flex-col items-end gap-4 whitespace-nowrap bg-breadgray-og-dark border-2 border-breadgray-burnt rounded p-6 text-xs"
    >
      <div className="flex items-center gap-4 text-neutral-300 text-lg">
        <IconContainer>
          <NetworkIcon />
        </IconContainer>
        <span className="font-medium">{chainString}</span>
      </div>
      <div className="pt-2 pb-1">
        <a
          className="text-neutral-400 underline hover:text-neutral-300 text-base font-medium"
          target="_blank"
          href={`https://polygonscan.com/address/${accountAddress}`}
          rel="noreferrer"
        >
          View Account
        </a>
      </div>
      <div className="pb-5">
        <a
          className="text-neutral-400 underline hover:text-neutral-300 text-base font-medium"
          target="_blank"
          href="https://beta.arrakis.finance/vaults/137/0x3055C602454ddE1BDa3e98B1bCfD2Ed68ab9789E"
          rel="noreferrer"
        >
          Add Liquidity
        </a>
      </div>
      <Button variant="small" onClick={handleDisconnect}>
        Disconnect
      </Button>
    </motion.div>
  );
}

export default WalletMenu;
