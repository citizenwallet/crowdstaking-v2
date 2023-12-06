import config from "@/config";

export const formatAddress = (address: string): string =>
  `${address.slice(0, 5)}...${address.slice(address.length - 4)}`;

export const balanceFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 4,
  minimumIntegerDigits: 1,
  useGrouping: true,
});

export const watchAsset = async (
  tokenKey: "DAI" | "BREAD" | "DERIVATIVE",
  chainId: number
): Promise<void> => {
  const { ethereum } = window as any;
  const { address, symbol, decimals } = config[chainId]["BREAD"];

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
