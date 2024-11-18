import { setClaimer, castVote, distributeYield, lockLpTokens } from "./lib";

async function main() {
  //   if (DISTRIBUTOR_DEPLOYED === null)
  //     throw new Error("DISTRIBUTOR_DEPLOYED is null!");

  // need to lock some LP tokens so that dev wallet gets some LP voting power
  await lockLpTokens();

  await setClaimer("0x8ce361602B935680E8DeC218b820ff5056BeB7af");

  // cast a vote
  await castVote();

  // claim the yield
  await distributeYield();
}

main();
