import { Hex } from "viem";

interface IToken {
  address: Hex;
  symbol: string;
  decimals: number;
}

export interface ChainConfiguration {
  ID: number;
  NETWORK_STRING: string;
  EXPLORER: string;
  BREAD: IToken;
  DISBURSER: {
    address: Hex;
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
      100: gnosis,
      11155111: sepolia,
      31337: anvil,
    };
  }

  return {
    100: gnosis,
    11155111: sepolia,
  };
}

const sepolia: ChainConfiguration = {
  ID: 11155111,
  NETWORK_STRING: "Sepolia",
  EXPLORER: "NONE",
  BREAD: {
    symbol: "BREAD",
    decimals: 18,
    address: "0x689666145b8e80f705b87f4e4190820d9a4c1646",
  },
  DISBURSER: {
    address: "0x3df19344e31ba689fe1f56b3ef43ef6cfaa13096",
  },
};

const gnosis: ChainConfiguration = {
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
};

const anvil: ChainConfiguration = {
  ID: 31337,
  NETWORK_STRING: "Anvil",
  EXPLORER: "NONE",
  BREAD: {
    symbol: "BREAD",
    decimals: 18,
    address: "0xa555d5344f6FB6c65da19e403Cb4c1eC4a1a5Ee3",
  },
  DISBURSER: {
    address: DISBURSER_ADDRESS,
  },
};

const config: IConfig = getConfig();

export default config;
