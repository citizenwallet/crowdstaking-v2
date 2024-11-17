// import { DISTRIBUTOR_DEPLOYED } from "../src/chainConfig";
import { setClaimer } from "./lib";

async function main() {
  //   if (DISTRIBUTOR_DEPLOYED === null)
  //     throw new Error("DISTRIBUTOR_DEPLOYED is null!");
  await setClaimer("0x8ce361602B935680E8DeC218b820ff5056BeB7af");
}

main();
