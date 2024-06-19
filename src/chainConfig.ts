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
  DISBURSER: {
    address: `0x${string}`;
  };
}

export const BREAD_ADDRESS = "0xa555d5344f6FB6c65da19e403Cb4c1eC4a1a5Ee3";
export const DISBURSER_ADDRESS = "0xb19b36b1456E65E3A6D514D3F715f204BD59f431";

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
          address: "0xa555d5344f6FB6c65da19e403Cb4c1eC4a1a5Ee3",
        },
        DISBURSER: {
          address: DISBURSER_ADDRESS,
        },
      },
      100: {
        ID: 100,
        NETWORK_STRING: "Gnosis",
        EXPLORER: "https://gnosisscan.io",
        BREAD: {
          symbol: "BREAD",
          decimals: 18,
          address: "0xa555d5344f6FB6c65da19e403Cb4c1eC4a1a5Ee3",
        },
        DISBURSER: {
          address: DISBURSER_ADDRESS,
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
        address: "0xa555d5344f6FB6c65da19e403Cb4c1eC4a1a5Ee3",
      },
      DISBURSER: {
        address: DISBURSER_ADDRESS,
      },
    },
  };
}

const config: IConfig = getConfig();

export default config;
