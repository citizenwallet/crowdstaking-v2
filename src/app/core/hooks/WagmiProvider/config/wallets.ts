import {
  frameWallet,
  injectedWallet,
  metaMaskWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { Chain } from "wagmi";

export function getWallets(chains: Chain[], projectId: string) {
  return [
    injectedWallet({ chains, projectId, appName: "Breadchain Crowdstaking" }),
    metaMaskWallet({ chains, projectId }),
    frameWallet({ chains, projectId }),
  ];
}
