"use client";
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { type Chain, useAccount, useNetwork } from "wagmi";
import config, { type ChainConfiguration } from "@/chainConfig";
import { useAutoConnect } from "./useAutoConnect";
import { Features } from "@/app/layout";

export type TUserLoading = { status: "LOADING"; features: Features };
export type TUserNotConnected = { status: "NOT_CONNECTED"; features: Features };
export type TUserConnected = {
  status: "CONNECTED";
  address: `0x${string}`;
  config: ChainConfiguration;
  chain: Chain;
  features: Features;
};
export type TUnsupportedChain = {
  status: "UNSUPPORTED_CHAIN";
  address: `0x${string}`;
  chain: Chain;
  features: Features;
};

export type TConnectedUserState =
  | TUserLoading
  | TUserNotConnected
  | TUserConnected
  | TUnsupportedChain;

const ConnectedUserContext = createContext<{
  user: TConnectedUserState;
  isSafe: boolean;
}>({
  user: {
    status: "LOADING",
    features: { governancePage: false, breadCounter: false },
  },
  isSafe: false,
});

interface IConnectedUserProviderProps {
  children: ReactNode;
  features: Features;
}

function ConnectedUserProvider({
  children,
  features,
}: IConnectedUserProviderProps) {
  const [user, setUser] = useState<TConnectedUserState>({
    status: "LOADING",
    features,
  });
  const {
    isConnected,
    connector: activeConnector,
    address: accountAddress,
    status,
  } = useAccount();
  const { chain: activeChain } = useNetwork();

  useEffect(() => {
    const configuration =
      activeChain?.id && config[activeChain.id] ? config[activeChain.id] : null;

    if (activeConnector && activeChain && accountAddress && isConnected) {
      setUser(
        configuration
          ? {
              status: "CONNECTED",
              address: accountAddress,
              config: configuration,
              chain: activeChain,
              features,
            }
          : {
              status: "UNSUPPORTED_CHAIN",
              address: accountAddress,
              chain: activeChain,
              features,
            }
      );
    } else if (status === "disconnected") {
      setUser({ status: "NOT_CONNECTED", features });
    }
  }, [
    isConnected,
    activeConnector,
    accountAddress,
    activeChain,
    status,
    features,
  ]);

  const { isSafe } = useAutoConnect(activeConnector);

  const value = useMemo(() => ({ user, isSafe }), [user, isSafe]);

  return (
    <ConnectedUserContext.Provider value={value}>
      {children}
    </ConnectedUserContext.Provider>
  );
}

const useConnectedUser = () => {
  const context = useContext(ConnectedUserContext);
  if (context === undefined) {
    throw new Error(
      "useConnectedUser must be used within a ConnectedUserProvider"
    );
  }
  return context;
};

export { ConnectedUserProvider, useConnectedUser };
