interface IToken {
  address: `0x${string}`;
  symbol: string;
  decimals: number;
}

export interface ChainConfiguration {
  ID: number;
  NETWORK_STRING: string;
  EXPLORER: string;
  BREAD: IToken;
}

export interface IConfig {
  [chainId: number]: ChainConfiguration;
}

const config: IConfig = {
  31337: {
    ID: 31337,
    NETWORK_STRING: "Hardhat",
    EXPLORER: "http://localhost:8545",
    BREAD: {
      symbol: "BREAD",
      decimals: 18,
      address: "0x7887978a762AaEA3C02Ddc23f323fAA128745fa1",
    },
  },
  137: {
    ID: 137,
    NETWORK_STRING: "Gnosis",
    EXPLORER: "https://polygonscan.com",
    BREAD: {
      symbol: "BREAD",
      decimals: 18,
      address: "0x11d9efDf4Ab4A3bfabf5C7089F56AA4F059AA14C",
    },
  },
};

export default config;
