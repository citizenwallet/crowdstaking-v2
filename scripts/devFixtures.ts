import { Hex, parseUnits } from "viem";
import { DEV_ACCOUNT, anvilAccounts, publicClient, testClient } from "./lib";
import { bakeBread, balanceOf } from "./lib";
import { ERC20_ABI } from "../src/abi";
import { BREAD_ADDRESS } from "../src/chainConfig";

const LP_TOKEN_WHALE = "0xc2fB4B3EA53E10c88D193E709A81C4dc7aEC902e" as Hex;
const LP_TOKEN_CONTRACT = "0xf3d8f3de71657d342db60dd714c8a2ae37eac6b4" as Hex;
const BB_CONTRACT = "0x8ce361602B935680E8DeC218b820ff5056BeB7af" as Hex;

/**
 *
 * Bakes BREAD for test wallets
 *
 */

export async function main() {
  await bakeBread(DEV_ACCOUNT);

  await balanceOf(DEV_ACCOUNT, BREAD_ADDRESS);

  await fundWhale();

  await testClient.impersonateAccount({
    address: LP_TOKEN_WHALE,
  });

  const hash = await testClient.writeContract({
    account: LP_TOKEN_WHALE,
    address: LP_TOKEN_CONTRACT,
    abi: ERC20_ABI,
    functionName: "transfer",
    args: [DEV_ACCOUNT, parseUnits("1000", 18)],
  });

  try {
    await publicClient.waitForTransactionReceipt({ hash });
  } catch (err) {
    console.log(err);
  }

  await balanceOf(DEV_ACCOUNT, LP_TOKEN_CONTRACT);

  // lock tokens
  await testClient.impersonateAccount({
    address: LP_TOKEN_WHALE,
  });

  await testClient.writeContract({
    account: LP_TOKEN_WHALE,
    address: LP_TOKEN_CONTRACT,
    abi: ERC20_ABI,
    functionName: "transfer",
    args: [DEV_ACCOUNT, parseUnits("1000", 18)],
  });

  try {
    await publicClient.waitForTransactionReceipt({ hash });
  } catch (err) {
    console.log(err);
  }

  await balanceOf(DEV_ACCOUNT, LP_TOKEN_CONTRACT);
}

main();

async function fundWhale() {
  await testClient.impersonateAccount({
    address: DEV_ACCOUNT,
  });

  await testClient.sendTransaction({
    account: DEV_ACCOUNT,
    to: LP_TOKEN_WHALE,
    value: parseUnits("5", 18),
  });
}
