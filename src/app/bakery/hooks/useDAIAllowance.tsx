import { TUserConnected } from "@/app/core/hooks/useConnectedUser";

import config from "@/config";
import { useContractRead } from "wagmi";
import { ERC20_ABI } from "@/abi";
import { formatUnits } from "viem";
import { useMemo } from "react";

export function useDAIAllowance({ user }: { user: TUserConnected }) {
  const { DAI, BREAD } = config[user.chain.id];

  const {
    data: allowanceReadData,
    status,
    error,
  } = useContractRead({
    address: DAI.address,
    abi: ERC20_ABI,
    functionName: "allowance",
    args: [user.address, BREAD.address],
    watch: true,
  });

  const data = useMemo(() => {
    if (status === "success") {
      return formatUnits(BigInt(allowanceReadData as string), 18);
    }
    if (status === "error") {
      console.log(error);
    }
    return null;
  }, [allowanceReadData, status, error]);

  return { data, status, error };
}
