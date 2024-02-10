// TODO: use this type!!

// import { Chain } from "@rainbow-me/rainbowkit";

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

function getConfig(): IConfig {
  if (process.env.NODE_ENV === "development") {
    return {
      31337: {
        ID: 31337,
        NETWORK_STRING: "Hardhat",
        EXPLORER: "NONE",
        BREAD: {
          symbol: "BREAD",
          decimals: 18,
          address: "0x2993bD6dA994378Eadf1A5ba5c9017FdFc92f111",
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
  }

  if (process.env.NEXT_PUBLIC_TEST_CONNECTOR === "true") {
    return {
      31337: {
        ID: 31337,
        NETWORK_STRING: "Hardhat",
        EXPLORER: "NONE",
        BREAD: {
          symbol: "BREAD",
          decimals: 18,
          address: "0x2993bD6dA994378Eadf1A5ba5c9017FdFc92f111",
        },
      },
    };
  }

  return {
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
}

const config: IConfig = getConfig();

export default config;
