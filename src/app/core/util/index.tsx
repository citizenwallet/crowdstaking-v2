export { Providers } from "./Providers";

export const formatAddress = (address: string): string =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

export const balanceFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  minimumIntegerDigits: 2,
  useGrouping: false,
});

export const WRAPPER_CLASSES =
  "max-w-6xl m-auto justify-between p-4 md:py-6 md:px-8";

import config from "@/config";

export const watchAsset = async (
  tokenKey: "DAI" | "BREAD" | "DERIVATIVE",
  chainId: number
): Promise<void> => {
  const { ethereum } = window as any;
  const { address, symbol, decimals } = config[chainId][tokenKey];

  ethereum.request({
    method: "wallet_watchAsset",
    params: {
      type: "ERC20", // Initially only supports ERC20, but eventually more!
      options: {
        address, // The address that the token is at.
        symbol, // A ticker symbol or shorthand, up to 5 chars.
        decimals, // The number of decimals in the token
      },
    },
  });
};
