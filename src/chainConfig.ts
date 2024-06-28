import { connectorsForWallets } from "@rainbow-me/rainbowkit";
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

export interface IConfig {
  [chainId: number]: ChainConfiguration;
  DEFAULT: ChainConfiguration;
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
    address: "0xA15BB66138824a1c7167f5E85b957d04Dd34E468",
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
    address: "0xA15BB66138824a1c7167f5E85b957d04Dd34E468",
  },
};

const developmentConfig: IConfig = {
  100: gnosis,
  11155111: sepolia,
  31337: anvil,
  DEFAULT: anvil,
};

const stagingConfig: IConfig = {
  100: gnosis,
  11155111: sepolia,
  DEFAULT: sepolia,
};

const prodConfig: IConfig = {
  100: gnosis,
  DEFAULT: gnosis,
};

export function getConfig(id: number | "DEFAULT"): ChainConfiguration {
  if (process.env.NODE_ENV === "development") {
    return developmentConfig[id] || developmentConfig["DEFAULT"];
  }

  if (process.env.NEXT_PUBLIC_TESTNET === "true") {
    return stagingConfig[id] || stagingConfig["DEFAULT"];
  }

  return prodConfig[id] || prodConfig["DEFAULT"];
}

export function isChainSupported(id: number) {
  if (process.env.NODE_ENV === "development") {
    return !!developmentConfig[id];
  }

  if (process.env.NEXT_PUBLIC_TESTNET === "true") {
    return !!stagingConfig[id];
  }

  return !!prodConfig[id];
}
