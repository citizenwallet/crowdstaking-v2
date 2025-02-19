import { getConfig } from "@/chainConfig";
import { useContractRead, useNetwork } from "wagmi";
import { SDAI_ADAPTOR_ABI } from "@/abi";

export function useVaultAPY() {
  const { chain: activeChain } = useNetwork();
  const config = activeChain ? getConfig(activeChain.id) : getConfig("DEFAULT");

  return useContractRead({
    address: config.SDAI_ADAPTOR.address,
    abi: SDAI_ADAPTOR_ABI,
    functionName: "vaultAPY",
  });
}
