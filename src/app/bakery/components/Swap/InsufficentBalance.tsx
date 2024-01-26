import { ButtonVariants } from "@/app/core/components/Button/Button";
import clsx from "clsx";

export function InsufficentBalance() {
  return (
    <div
      className={clsx(
        ButtonVariants["large"],
        "w-full bg-breadgray-og-dark text-breadgray-grey rounded-xl font-medium text-center"
      )}
    >
      Insufficient balance
    </div>
  );
}
