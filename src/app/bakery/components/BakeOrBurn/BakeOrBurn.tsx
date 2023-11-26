import { TUserConnected } from "@/app/core/hooks/useConnectedUser";
import Button from "@/app/core/components/Button";
import { useDAIAllowance } from "../../hooks/useDAIAllowance";
import ApproveContract from "../ApproveContract";

export default function BakeOrBurn({
  user,
  mode,
}: {
  user: TUserConnected;
  mode: "BAKE" | "BURN";
}) {
  const { data: daiAllowance, status: daiAllowanceStatus } = useDAIAllowance({
    user,
  });

  return (
    <div className="p-2 w-full flex flex-col gap-2">
      {daiAllowance !== "0" ? (
        <Button fullWidth={true} variant="large" onClick={() => {}}>
          {mode === "BAKE" ? "Bake" : "Burn"}
        </Button>
      ) : (
        <ApproveContract chainConfig={user.config} />
      )}
    </div>
  );
}
