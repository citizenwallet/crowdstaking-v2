import { BREAD_ADDRESS, DISBURSER_ADDRESS } from "../src/chainConfig";
import { BREAD_GNOSIS_ABI, DISBURSER_ABI } from "../src/abi";
import { publicClient, testClient } from "./helpers";

export async function bakeBread(anvilAccount: `0x${string}`) {
  await testClient.impersonateAccount({
    address: anvilAccount,
  });

  try {
    const hash = await testClient.writeContract({
      account: anvilAccount,
      address: BREAD_ADDRESS,
      abi: BREAD_GNOSIS_ABI,
      functionName: "mint",
      value: 9500000000000000000000n,
      args: [anvilAccount],
    });

    const transaction = await publicClient.waitForTransactionReceipt({ hash });

    console.log(`Bread baked by ${anvilAccount} - ${transaction.status}`);
  } catch (err) {
    console.log(err);
  }
}

export async function balanceOf(anvilAccount: `0x${string}`) {
  await testClient.impersonateAccount({
    address: anvilAccount,
  });

  const res = await publicClient.readContract({
    address: BREAD_ADDRESS,
    abi: BREAD_GNOSIS_ABI,
    functionName: "balanceOf",
    args: [anvilAccount],
  });

  console.log(`Bread balance of ${anvilAccount} - ${res}`);
}

function generateVote() {
  const vote = Math.floor(Math.random() * 10) + 1;
  console.log(`Vote: ${vote}`);
  return vote;
}

export async function submitVote(anvilAccount: `0x${string}`) {
  await testClient.impersonateAccount({
    address: anvilAccount,
  });

  try {
    const hash = await testClient.writeContract({
      address: DISBURSER_ADDRESS,
      abi: DISBURSER_ABI,
      functionName: "castVote",
      account: anvilAccount,
      args: [
        [
          generateVote(),
          generateVote(),
          generateVote(),
          generateVote(),
          generateVote(),
        ],
      ],
    });

    const transaction = await publicClient.waitForTransactionReceipt({ hash });

    if (transaction.status !== "success") {
      console.log(
        `Failed to vote: ${anvilAccount} - `,
        Object.keys(transaction)
      );
      return;
    }

    console.log(
      `Mock Bread Holder voted: ${anvilAccount} - ${transaction.status}`
    );
  } catch (err) {
    console.log(err);
  }
}
