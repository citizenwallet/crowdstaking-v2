require("@nomicfoundation/hardhat-toolbox-viem");
require("dotenv").config();

const GNOSIS_RPC_URL = process.env.GNOSIS_RPC_URL;
const FORK_BLOCK_NUMBER = process.env.FORK_BLOCK_NUMBER
  ? parseInt(process.env.FORK_BLOCK_NUMBER)
  : undefined;

if (!GNOSIS_RPC_URL || !FORK_BLOCK_NUMBER) throw new Error("check env vars!");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.20",
  },
  networks: {
    hardhat: {
      forking: {
        url: GNOSIS_RPC_URL,
        blockNumber: FORK_BLOCK_NUMBER,
      },
      hardfork: "merge",
    },
  },
};
