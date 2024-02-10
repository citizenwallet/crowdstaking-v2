import { Chain } from "@rainbow-me/rainbowkit";

const NEXT_PUBLIC_QUIKNODE_URL = process.env.NEXT_PUBLIC_QUIKNODE_URL;
if (!NEXT_PUBLIC_QUIKNODE_URL)
  throw new Error("NEXT_PUBLIC_QUIKNODE_URL not set!");

export const gnosis: Chain = {
  id: 100,
  name: "gnosis",
  network: "gnosis",
  iconUrl: "/gnosis.png",
  nativeCurrency: {
    decimals: 18,
    name: "xDAI",
    symbol: "xDAI",
  },
  rpcUrls: {
    public: {
      http: ["https://rpc.ankr.com/gnosis"],
    },
    default: {
      http: [NEXT_PUBLIC_QUIKNODE_URL],
    },
  },
  blockExplorers: {
    etherscan: { name: "Gnosis Etherscan", url: "https://gnosisscan.io/" },
    default: { name: "Gnosis Etherscan", url: "https://gnosisscan.io/" },
  },
};
