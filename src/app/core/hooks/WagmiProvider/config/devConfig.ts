// import type { ReactNode } from "react";
// import { WagmiConfig, configureChains, createConfig } from "wagmi";
// import { polygon, polygonMumbai } from "wagmi/chains";
// import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
// import { InjectedConnector } from "wagmi/connectors/injected";
// import { MetaMaskConnector } from "wagmi/connectors/metaMask";
// import { SafeConnector } from "wagmi/connectors/safe";
// import { alchemyProvider } from "wagmi/providers/alchemy";
// import { publicProvider } from "wagmi/providers/public";

// const apiKey = import.meta.env.PUBLIC_ALCHEMY_ID as string;

// const { chains, publicClient, webSocketPublicClient } = configureChains(
//   [polygon, polygonMumbai],
//   [alchemyProvider({ apiKey }), publicProvider()]
// );

// export const devConfig = createConfig({
//   autoConnect: true,
//   connectors: [
//     new MetaMaskConnector({ chains }),
//     new CoinbaseWalletConnector({
//       chains,
//       options: {
//         appName: "wagmi",
//       },
//     }),
//     new InjectedConnector({
//       chains,
//       options: {
//         name: "Injected",
//         shimDisconnect: true,
//       },
//     }),
//   ],
//   publicClient,
//   webSocketPublicClient,
// });
