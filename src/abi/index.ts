import SDAI_ADAPTOR from "./SDAIAdaptor.json";

import { breadAbi } from "./Bread";
import { distributorAbi } from "./Distributor";
import { butteredBreadAbi } from "./ButteredBread";
import { multicall3Abi } from "./Multicall3";
import { erc20ABI } from "wagmi";

let BREAD = breadAbi;
let DISTRIBUTOR = distributorAbi;
let BUTTERED_BREAD = butteredBreadAbi;

// if (process.env.NODE_ENV === "development") {
//   BREAD = require("../../contracts/out/Bread.sol/Bread.json").abi ;
//   DISTRIBUTOR =
//     require("../../contracts/out/YieldDistributor.sol/YieldDistributor.json").abi;
//   BUTTERED_BREAD =
//     require("../../contracts/out/ButteredBread.sol/ButteredBread.json").abi;
// }

export const BREAD_ABI = BREAD;
export const ERC20_ABI = erc20ABI;
export const MULTICALL3_ABI = multicall3Abi;
export const DISTRIBUTOR_ABI = DISTRIBUTOR;
export const SDAI_ADAPTOR_ABI = SDAI_ADAPTOR;
export const BUTTERED_BREAD_ABI = BUTTERED_BREAD;
