import * as ToastPrimitive from "@radix-ui/react-toast";

import { useToast } from "@/app/core/context/ToastContext/ToastContext";
import {
  TToast,
  TToastDispatch,
} from "@/app/core/context/ToastContext/ToastContextReducer";
import { Toast as ToastUI, ToastContainer } from "./Toast";

export function Toaster() {
  const { toastState, toastDispatch } = useToast();

  return (
    <ToastContainer>
      {toastState.map((toast) => (
        <Toast
          key={`toast_${toast.id}`}
          toast={toast}
          toastDispatch={toastDispatch}
        />
      ))}
    </ToastContainer>
  );
}

function Toast({
  toast,
  toastDispatch,
}: {
  toast: TToast;
  toastDispatch: TToastDispatch;
}) {
  const { id, toastType, txHash } = toast;

  function handleOpenChange() {
    toastDispatch({ type: "CLEAR", payload: { id } });
  }

  return (
    <ToastPrimitive.Provider>
      <ToastPrimitive.Root onOpenChange={handleOpenChange}>
        <ToastUI toastType={toastType} explorerUrl={txHash} />
      </ToastPrimitive.Root>
      <ToastPrimitive.Viewport />
    </ToastPrimitive.Provider>
  );
}
