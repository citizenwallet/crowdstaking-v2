import { MockConnector } from "wagmi/connectors/mock";
import { Chain, createWalletClient, http } from "viem";
import { hardhat } from "viem/chains";

export function mockWallet({ chains }: { chains: Chain[] }) {
  return {
    id: "mock",
    name: "Mock Wallet",
    iconUrl: "",
    iconBackground: "",
    createConnector() {
      const connector = new MockConnector({
        chains,
        options: {
          walletClient: createWalletClient({
            transport: http("http://localhost:8545"),
            chain: hardhat,
            account: "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266",
            key: "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
            pollingInterval: 100,
          }),
        },
      });
      return { connector };
    },
  };
}
