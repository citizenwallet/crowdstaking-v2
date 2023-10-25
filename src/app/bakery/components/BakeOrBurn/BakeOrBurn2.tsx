import NativeBalance from "../NativeBalance";
import { TUserConnected } from "@/app/core/hooks/useConnectedUser";
import Button from "@/app/core/components/Button";

export default function BakeOrBurn({
  user,
  mode,
}: {
  user: TUserConnected;
  mode: "BAKE" | "BURN";
}) {
  return (
    <div className="w-full">
      <div className="p-2 w-full flex flex-col gap-2">
        <div className="w-full p-2 text-neutral-500 rounded-md border-[0.1rem] font-medium border-neutral-800">
          Matic Balance <NativeBalance address={user.address} />
        </div>
        <Button fullWidth={true} variant="large" onClick={() => {}}>
          {mode === "BAKE" ? "Bake" : "Burn"}
        </Button>
      </div>
    </div>
  );
}
