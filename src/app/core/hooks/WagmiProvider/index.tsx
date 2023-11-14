import type { ReactNode } from "react";
import { WagmiConfig } from "wagmi";

// import { devConfig } from "./devConfig";
import * as testConfig from "./testConfig";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
// import { prodConfig } from "./prodConfig";

// export type IViteMode = "production" | "development" | "testing" | undefined;

// const env = process.env.MODE;

// if (env === undefined) throw new Error("NODE_ENV not set!");

// const config = env === "development" ? testConfig : prodConfig;
const { chains, config } = testConfig;

const baseTheme = darkTheme({
  accentColor: "#E873D3",
  accentColorForeground: "#2E2E2E",
  borderRadius: "small",
  fontStack: "system",
  overlayBlur: "small",
});

const theme = {
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    modalBackground: "#242424",
  },
  fonts: {
    body: "var(--font-redhat)",
  },
};

export default function WagmiProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiConfig config={config}>
      <RainbowKitProvider modalSize="compact" theme={theme} chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
