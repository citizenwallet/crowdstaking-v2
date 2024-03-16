require("@nomicfoundation/hardhat-toolbox-viem");
require("dotenv").config();

const RPC_URL = process.env.RPC_URL;
const FORK_BLOCK_NUMBER = process.env.FORK_BLOCK_NUMBER
  ? parseInt(process.env.FORK_BLOCK_NUMBER)
  : undefined;

if (!RPC_URL || !FORK_BLOCK_NUMBER) throw new Error("check env vars!");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
  },
  networks: {
    hardhat: {
      forking: {
        url: RPC_URL,
        // blockNumber: FORK_BLOCK_NUMBER,
      },
      mining: {
        auto: false,
        interval: 3000,
      },
    },
  },
};
