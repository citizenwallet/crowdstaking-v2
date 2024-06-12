require("@nomicfoundation/hardhat-toolbox-viem");
require("dotenv").config();

const HARDHAT_RPC_URL = process.env.HARDHAT_RPC_URL;

if (!HARDHAT_RPC_URL) throw new Error("HARDHAT_RPC_URL not provided");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
  },
  networks: {
    hardhat: {
      forking: {
        url: HARDHAT_RPC_URL,
      },
      mining: {
        auto: false,
        interval: 3000,
      },
      hardfork: "merge",
    },
  },
};
