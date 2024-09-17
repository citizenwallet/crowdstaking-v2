import { Hex } from "viem";
import { TUserConnected } from "./useConnectedUser";
import { useContractRead } from "wagmi";
import { ERC20_ABI } from "@/abi";

export function useTokenBalance(user: TUserConnected, tokenAddress: Hex) {
  return useContractRead({
    address: tokenAddress,
    abi: ERC20_ABI,
    functionName: "balanceOf",
    args: [user.address],
    watch: true,
  });
}
