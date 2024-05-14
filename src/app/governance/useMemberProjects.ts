import { DISBURSER_ABI } from "@/abi";
import config from "@/chainConfig";
import { useEffect, useState } from "react";
import { useContractRead } from "wagmi";

export function useMemberProjects() {
  const [memberProjects, setMemberProjects] = useState<null | `0x${string}`[]>(
    []
  );

  const { data: memberProjectsData, status: memberProjectsStatus } =
    useContractRead({
      address: config[100].DISBURSER.address,
      abi: DISBURSER_ABI,
      functionName: "getCurrentProjects",
      watch: true,
    });

  useEffect(() => {
    if (memberProjectsStatus === "success" && memberProjectsData) {
      setMemberProjects(memberProjectsData as `0x${string}`[]);
    }
  }, [memberProjectsStatus, memberProjectsData]);

  return { memberProjects };
}
