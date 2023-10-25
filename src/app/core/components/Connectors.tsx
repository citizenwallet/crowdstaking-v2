import { useEffect } from "react";
import { useConnect } from "wagmi";

import { useModal } from "../hooks/useModal";
import { useToast } from "../hooks/useToast";
import Button from "./Button";
import { Metamask } from "./Icons/Metamask";
import { Coinbase } from "./Icons/Coinbase";
import { WalletConnect } from "./Icons/WalletConnect";

import safeLogo from "./Icons/safe_logo.jpg";
import clsx from "clsx";

export default function Connectors() {
  // const { connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, error, status } = useConnect();
  const { dispatch: toastDispatch } = useToast();
  const { state: modalState, dispatch: modalDispatch } = useModal();

  // if (!!activeConnector && isConnected) throw new Error('Connector error!');

  useEffect(() => {
    const safeConnector = connectors.find(
      (c) => c.name.toUpperCase() === "SAFE"
    );
    if (safeConnector?.ready) {
      safeConnector.connect();
    }
  }, [connectors]);

  useEffect(() => {
    if (error)
      toastDispatch({
        type: "SET_TOAST",
        payload: { type: "ERROR", message: error.message },
      });
  }, [error, toastDispatch]);

  useEffect(() => {
    if (!modalState) return;
    if (status === "success" || status === "error")
      modalDispatch({
        type: "CLEAR_MODAL",
      });
  }, [status, modalDispatch, modalState]);

  return (
    <div>
      <div className="max-w-72 m-auto flex flex-col gap-4">
        {connectors &&
          connectors.map((connector) =>
            connector.ready ? (
              <article
                key={`connector_${connector.name}`}
                className="flex gap-6"
              >
                <button
                  disabled={!connector.ready}
                  key={connector.id}
                  onClick={() => connect({ connector })}
                  className="flex items-center gap-4 text-base font-bold opacity-60 hover:opacity-100"
                >
                  <div className="rounded overflow-clip">
                    <ConnectorIcon name={connector.name} />
                  </div>

                  {connector.name}
                </button>
              </article>
            ) : null
          )}
      </div>
    </div>
  );
}

function ConnectorIcon({ name }: { name: string }) {
  switch (name) {
    case "MetaMask":
      return <Metamask />;
    case "Coinbase Wallet":
      return <Coinbase />;
    case "Wallet Connect":
      return <WalletConnect />;
    default:
      return <div className="w-[40px] h-[40px] bg-breadgray-rye"></div>;
  }
}
