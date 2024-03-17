import { configureChains, createConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { gnosis } from "wagmi/chains";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  rainbowWallet,
  argentWallet,
  injectedWallet,
  ledgerWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { publicProvider } from "wagmi/providers/public";
import { getWallets } from "./wallets";
import { SafeConnector } from "wagmi/connectors/safe";

const NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
if (!NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID)
  throw new Error("NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID not set!");

const NEXT_PUBLIC_QUIKNODE_URL = process.env.NEXT_PUBLIC_QUIKNODE_URL;
if (!NEXT_PUBLIC_QUIKNODE_URL)
  throw new Error("NEXT_PUBLIC_QUIKNODE_URL not set!");

const chainsConfig = configureChains(
  [
    {
      ...gnosis,
      iconUrl: "gnosis_icon.svg",
    },
  ],
  [
    publicProvider(),
    jsonRpcProvider({
      rpc: () => ({
        http: NEXT_PUBLIC_QUIKNODE_URL,
      }),
    }),
  ]
);

const { chains } = chainsConfig;

const { publicClient } = chainsConfig;

const projectId = NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;

const connectors = connectorsForWallets([
  {
    groupName: "Wallets",
    wallets: getWallets(chains, projectId),
  },
]);

const config = createConfig({
  autoConnect: true,
  connectors: [
    ...connectors(),
    new SafeConnector({
      chains,
      options: {
        allowedDomains: [/app.safe.global$/],
        debug: false,
      },
    }),
  ],
  publicClient,
});

export { chains as prodChains, config as prodConfig };
