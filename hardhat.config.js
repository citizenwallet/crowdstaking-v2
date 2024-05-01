require("@nomicfoundation/hardhat-toolbox-viem");
require("dotenv").config();

const RPC_URL = process.env.RPC_URL;

if (!RPC_URL) throw new Error("RPC_URL not provided");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
  },
  networks: {
    hardhat: {
      forking: {
        url: RPC_URL,
      },
      mining: {
        auto: false,
        interval: 3000,
      },
      hardfork: "merge",
    },
  },
};
