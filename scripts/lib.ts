import {
  createPublicClient,
  createTestClient,
  http,
  walletActions,
} from "viem";
import { foundry } from "viem/chains";
import { BREAD_ADDRESS, DISBURSER_ADDRESS } from "../src/chainConfig";
import { BREAD_GNOSIS_ABI, DISBURSER_ABI } from "../src/abi";

export const anvilAccounts: Array<`0x${string}`> = [
  "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
  "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
  "0x90f79bf6eb2c4f870365e785982e1f101e93b906",
  "0x15d34aaf54267db7d7c367839aaf71a00a2c6a65",
  "0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc",
  "0x976ea74026e726554db657fa54763abd0c3a0aa9",
  "0x14dc79964da2c08b23698b3d3cc7ca32193d9955",
  "0x23618e81e3f5cdf7f54c3d65f7fbc0abf5b21e8f",
  "0xa0ee7a142d267c1f36714e4a8f75612f20a79720",
];

export const DEV_ACCOUNT = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

export const testClient = createTestClient({
  chain: foundry,
  mode: "anvil",
  transport: http(),
}).extend(walletActions);

export const publicClient = createPublicClient({
  chain: foundry,
  transport: http(),
});
export async function setClaimer() {
  await testClient.impersonateAccount({
    address: "0x918def5d593f46735f74f9e2b280fe51af3a99ad",
  });

  const addresses = await testClient.getAddresses();

  const hash = await testClient.writeContract({
    account: addresses[addresses.length - 1],
    address: BREAD_ADDRESS,
    abi: BREAD_GNOSIS_ABI,
    functionName: "setYieldClaimer",
    args: [DISBURSER_ADDRESS],
  });

  const transaction = await publicClient.waitForTransactionReceipt({ hash });

  console.log("Claimer set: ", transaction.status);
}

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
      value: 2000000000000000000000n,
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

    const receipt = await publicClient.waitForTransactionReceipt({ hash });

    if (receipt.status !== "success") {
      console.log(`Failed to vote: ${anvilAccount} - `, Object.keys(receipt));
      // console.log({ receipt });

      const transaction = await publicClient.getTransaction({ hash });

      console.log({ transaction });

      // const callData = {
      //   to: receipt.to,
      //   data: transaction.input,
      //   from: receipt.from,
      //   gas: receipt.gasUsed,
      // };

      await publicClient
        .call({ data: transaction.input, blockNumber: receipt.blockNumber })
        .catch((error) => {
          const revertReason = error.data;
          console.log("Revert error:", error);
          console.log("Revert reason:", revertReason);
        });

      return;
    }

    console.log(`Mock Bread Holder voted: ${anvilAccount} - ${receipt.status}`);
  } catch (err) {
    console.log(err);
  }
}
