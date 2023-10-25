interface IToken {
  address: `0x${string}`;
  symbol: string;
  decimals: number;
}

export interface ChainConfiguration {
  ID: number;
  NETWORK_STRING: string;
  EXPLORER: string;
  DAI: IToken;
  DERIVATIVE: IToken;
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
    DAI: {
      symbol: "DAI",
      decimals: 18,
      address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    },
    DERIVATIVE: {
      symbol: "ADAI",
      decimals: 18,
      address: "0x82E64f49Ed5EC1bC6e43DAD4FC8Af9bb3A2312EE",
    },
    BREAD: {
      symbol: "BREAD",
      decimals: 18,
      address: "0x11d9efDf4Ab4A3bfabf5C7089F56AA4F059AA14C",
    },
  },
  137: {
    ID: 137,
    NETWORK_STRING: "polygon",
    EXPLORER: "https://polygonscan.com",
    DAI: {
      symbol: "DAI",
      decimals: 18,
      address: "0x8f3Cf7ad23Cd3CaDbD9735AFf958023239c6A063",
    },
    DERIVATIVE: {
      symbol: "ADAI",
      decimals: 18,
      address: "0x82E64f49Ed5EC1bC6e43DAD4FC8Af9bb3A2312EE",
    },
    BREAD: {
      symbol: "BREAD",
      decimals: 18,
      address: "0x11d9efDf4Ab4A3bfabf5C7089F56AA4F059AA14C",
    },
  },
  80001: {
    ID: 80001,
    NETWORK_STRING: "mumbai",
    EXPLORER: "https://mumbai.polygonscan.com",
    DAI: {
      symbol: "DAI",
      decimals: 18,
      address: "0x9A753f0F7886C9fbF63cF59D0D4423C5eFaCE95B",
    },
    DERIVATIVE: {
      symbol: "ADAI",
      decimals: 18,
      address: "0xDD4f3Ee61466C4158D394d57f3D4C397E91fBc51",
    },
    BREAD: {
      symbol: "BREAD",
      decimals: 18,
      address: "0x9AEe3dBCaC747bc41BcdFd94885fA6679151A931",
    },
  },
};

export default config;
