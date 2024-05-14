import { anvilAccounts, testClient } from "./helpers";
import { setClaimer } from "./setClaimer";
import { bakeBread, balanceOf, submitVote } from "./submitVotes";

export async function main() {
  await setClaimer();

  await Promise.all(
    anvilAccounts.map(async (account) => {
      return bakeBread(account);
    })
  );

  anvilAccounts.forEach(async (account) => {
    await balanceOf(account);
  });

  // await testClient.increaseTime({
  //   seconds: 60 * 60 * 24 * 10,
  // });
  const mine = await testClient.mine({ blocks: 10 });

  // await new Promise((resolve) => setTimeout(resolve, 10000));

  for (let i = 0; i < anvilAccounts.length; i++) {
    await submitVote(anvilAccounts[i]);
  }
}

main();
