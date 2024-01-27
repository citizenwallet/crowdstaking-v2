require("@nomicfoundation/hardhat-toolbox-viem");
require("dotenv").config();

const QUIKNODE_URL = process.env.QUIKNODE_URL;
const FORK_BLOCK_NUMBER = process.env.FORK_BLOCK_NUMBER
  ? parseInt(process.env.FORK_BLOCK_NUMBER)
  : undefined;

if (!QUIKNODE_URL || !FORK_BLOCK_NUMBER) throw new Error("check env vars!");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
  },
  networks: {
    hardhat: {
      forking: {
        url: QUIKNODE_URL,
        blockNumber: FORK_BLOCK_NUMBER,
      },
      mining: {
        auto: false,
        interval: 3000,
      },
      hardfork: "merge",
    },
  },
};
