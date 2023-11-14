import { TUserConnected } from "@/app/core/hooks/useConnectedUser";
import { useDAIAllowance } from "../../hooks/useDAIAllowance";
import { TSwapMode } from "./Swap";
import Button from "@/app/core/components/Button";
import ApproveContract from "../ApproveContract";

export function BakeOrBurn({
  user,
  mode,
}: {
  user: TUserConnected;
  mode: TSwapMode;
}) {
  const { data: daiAllowance, status: daiAllowanceStatus } = useDAIAllowance({
    user,
  });

  if (daiAllowance !== "0") {
    return (
      <div className="p-3 w-full">
        <Button fullWidth={true} variant="large" onClick={() => {}}>
          {mode === "BAKE" ? "Bake" : "Burn"}
        </Button>
      </div>
    );
  }
  return <ApproveContract chainConfig={user.config} />;
}
