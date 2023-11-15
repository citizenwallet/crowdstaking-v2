import { configureChains, createConfig } from "wagmi";

import { polygon } from "wagmi/chains";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { publicProvider } from "wagmi/providers/public";

const chainsConfig = configureChains([polygon], [publicProvider()]);

export const { chains } = chainsConfig;

const { publicClient } = chainsConfig;

const projectId = "YOUR_PROJECT_ID";

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId,
  chains,
});

export const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
