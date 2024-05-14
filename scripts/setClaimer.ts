import { BREAD_GNOSIS_ABI } from "../src/abi";
import { BREAD_ADDRESS, DISBURSER_ADDRESS } from "../src/chainConfig";
import { publicClient, testClient } from "./helpers";

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
