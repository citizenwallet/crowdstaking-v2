import config from "@/chainConfig";

export const watchAsset = async (): Promise<void> => {
  const { ethereum } = window as any;
  const { address, symbol, decimals } = config[100]["BREAD"];

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
