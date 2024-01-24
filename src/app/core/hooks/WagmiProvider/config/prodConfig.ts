import { configureChains, createConfig } from "wagmi";
import { jsonRpcProvider } from "wagmi/providers/jsonRpc";

import { gnosis } from "wagmi/chains";
import {
  connectorsForWallets,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  injectedWallet,
  ledgerWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { publicProvider } from "wagmi/providers/public";

const WALLET_CONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID;
if (!WALLET_CONNECT_PROJECT_ID)
  throw new Error("WALLET_CONNECT_PROJECT_ID not set!");
const QUIKNODE_API_KEY = process.env.NEXT_PUBLIC_QUIKNODE_API_KEY;
if (!QUIKNODE_API_KEY) throw new Error("WALLET_CONNECT_PROJECT_ID not set!");

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
        http: `https://bitter-radial-dust.xdai.quiknode.pro/${QUIKNODE_API_KEY}`, // 👈 Replace this with your HTTP URL
      }),
    }),
  ]
);

const { chains } = chainsConfig;

const { publicClient } = chainsConfig;

const projectId = WALLET_CONNECT_PROJECT_ID;

const { wallets } = getDefaultWallets({
  appName: "Breadchain Crowdstaking",
  projectId,
  chains,
});

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      injectedWallet({ chains }),
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
]);

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export { chains as prodChains, config as prodConfig };
