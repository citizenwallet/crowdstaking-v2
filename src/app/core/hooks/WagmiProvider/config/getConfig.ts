export function getConfig() {
  switch (process.env.NODE_ENV) {
    case "development":
      const { devConfig, devChains } = require("./devConfig");
      return { chains: devChains, config: devConfig };
    case "production":
      const { prodConfig, prodChains } = require("./prodConfig");
      return { chains: prodChains, config: prodConfig };
    default:
      throw new Error("unable to get wagmi config!!");
  }
}
