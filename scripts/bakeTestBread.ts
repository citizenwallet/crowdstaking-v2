import { DEV_ACCOUNT, anvilAccounts, testClient } from "./lib";
import { setClaimer, bakeBread, balanceOf, submitVote } from "./lib";

/**
 *
 * Sets Yield Claimer
 * Bakes BREAD for test wallets
 *
 */

export async function main() {
  const bakePromises = anvilAccounts.map(async (account) => {
    return bakeBread(account);
  });

  bakePromises.push(bakeBread(DEV_ACCOUNT));

  await Promise.all(bakePromises);

  anvilAccounts.forEach(async (account) => {
    await balanceOf(account);
  });
}

main();
