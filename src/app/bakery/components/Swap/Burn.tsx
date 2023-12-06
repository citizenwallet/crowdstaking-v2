import { usePrepareContractWrite } from "wagmi";

import { TUserConnected } from "@/app/core/hooks/useConnectedUser";
import Button from "@/app/core/components/Button";
import config from "@/config";

export default function Burn({
  user,
  inputValue,
}: {
  user: TUserConnected;
  inputValue: string;
}) {
  config[user.chain.id];
  // const {} = usePrepareContractWrite();

  return (
    <div className="p-2 w-full flex flex-col gap-2">
      <Button fullWidth={true} variant="large" onClick={() => {}}>
        Burn
      </Button>
    </div>
  );
}
