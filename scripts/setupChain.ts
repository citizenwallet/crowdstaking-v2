import { DEV_ACCOUNT, anvilAccounts, testClient } from "./helpers";
import { setClaimer } from "./setClaimer";
import { bakeBread, balanceOf, submitVote } from "./submitVotes";

export async function main() {
  await setClaimer();

  const bakePromises = anvilAccounts.map(async (account) => {
    return bakeBread(account);
  });

  bakePromises.push(bakeBread(DEV_ACCOUNT));

  await Promise.all(bakePromises);

  anvilAccounts.forEach(async (account) => {
    await balanceOf(account);
  });

  await testClient.mine({ blocks: 10 });

  for (let i = 0; i < anvilAccounts.length; i++) {
    await submitVote(anvilAccounts[i]);
  }
}

main();
