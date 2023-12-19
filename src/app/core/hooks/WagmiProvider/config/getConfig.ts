import { devConfig, devChains } from "./devConfig";
import { prodConfig, prodChains } from "./prodConfig";

export function getConfig() {
  switch (process.env.NODE_ENV) {
    case "development":
      return { chains: devChains, config: devConfig };
    case "production":
      return { chains: prodChains, config: prodConfig };
    default:
      throw new Error("unable to get config!!");
  }
}
