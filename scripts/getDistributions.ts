import { createPublicClient, http } from "viem";
import { foundry, gnosis } from "viem/chains";

import { getConfig } from "../src/chainConfig";

import { DISBURSER_ABI } from "../src/abi";

async function main() {
  const publicClient = createPublicClient({
    chain: gnosis,
    transport: http(),
  });

  const config = getConfig(100);

  const logs = await publicClient.getContractEvents({
    address: config.DISBURSER.address,
    abi: DISBURSER_ABI,
    // eventName: "YieldDistributed",
    fromBlock: BigInt(34695057),
    toBlock: "latest",
  });

  console.log({ logs });
  return logs;
}

main();
