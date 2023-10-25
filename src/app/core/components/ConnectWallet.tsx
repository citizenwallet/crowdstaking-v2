import { useModal } from "../hooks/useModal";
import Button from "./Button";
import { TButtonVariant } from "./Button/Button";

export default function ConnectWallet({
  variant,
  fullWidth,
}: {
  variant: TButtonVariant;
  fullWidth?: boolean;
}) {
  const { dispatch } = useModal();
  return (
    <Button
      variant={variant}
      fullWidth={fullWidth}
      onClick={() =>
        dispatch({
          type: "SET_MODAL",
          payload: {
            type: "CONNECTORS",
            title: "Connect Wallet",
          },
        })
      }
    >
      Connect
    </Button>
  );
}
