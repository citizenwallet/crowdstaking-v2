import SDAI_ADAPTOR from "./SDAIAdaptor.json";
import ERC20 from "./ERC20.json";

import BREAD_PROD from "./Bread.json";
import DISTRIBUTOR_PROD from "./Distributor.json";
import BUTTERED_BREAD_PROD from "./ButteredBread.json";

let BREAD = BREAD_PROD;
let DISTRIBUTOR = DISTRIBUTOR_PROD;
let BUTTERED_BREAD = BUTTERED_BREAD_PROD;

if (process.env.NODE_ENV === "development") {
  BREAD = require("../../contracts/out/Bread.sol/Bread.json").abi;
  DISTRIBUTOR =
    require("../../contracts/out/YieldDistributor.sol/YieldDistributor.json").abi;
  BUTTERED_BREAD =
    require("../../contracts/out/ButteredBread.sol/ButteredBread.json").abi;
}

export const BREAD_ABI = BREAD;
export const ERC20_ABI = ERC20;
export const DISTRIBUTOR_ABI = DISTRIBUTOR;
export const SDAI_ADAPTOR_ABI = SDAI_ADAPTOR;
export const BUTTERED_BREAD_ABI = BUTTERED_BREAD;
