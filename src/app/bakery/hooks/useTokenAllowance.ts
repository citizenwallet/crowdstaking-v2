import { ERC20_ABI } from "@/abi";
import { formatUnits } from "viem";
import { useContractRead } from "wagmi";

export interface IUseTokenAllowanceResult {
  value?: string;
  status: "error" | "idle" | "loading" | "success";
  error: Error | null;
}

export function useTokenAllowance(
  tokenAddress: `0x${string}`,
  holderAddress: string,
  spenderAddress: string
): IUseTokenAllowanceResult {
  const args = [holderAddress, spenderAddress];
  const watch = true;

  const { data, status, error } = useContractRead({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "allowance",
    args,
    watch,
  });

  const value = data ? formatUnits(BigInt(data as string), 18) : undefined;

  return {
    value,
    status,
    error,
  };
}
