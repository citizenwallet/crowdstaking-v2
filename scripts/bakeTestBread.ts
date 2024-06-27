import { DEV_ACCOUNT, anvilAccounts } from "./lib";
import { bakeBread, balanceOf } from "./lib";

/**
 *
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
