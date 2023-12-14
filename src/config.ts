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
    EXPLORER: "NONE",
    BREAD: {
      symbol: "BREAD",
      decimals: 18,
      address: "0x7887978a762AaEA3C02Ddc23f323fAA128745fa1",
    },
  },
  100: {
    ID: 100,
    NETWORK_STRING: "Gnosis",
    EXPLORER: "https://gnosisscan.io",
    BREAD: {
      symbol: "BREAD",
      decimals: 18,
      address: "0x2993bD6dA994378Eadf1A5ba5c9017FdFc92f111",
    },
  },
};

export default config;
