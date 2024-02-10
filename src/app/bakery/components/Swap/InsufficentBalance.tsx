import { ButtonVariants } from "@/app/core/components/Button/Button";
import clsx from "clsx";
import Image from "next/image";

export function InsufficentBalance() {
  return (
    <div
      className={clsx(
        ButtonVariants["large"],
        "flex justify-center gap-4 w-full bg-breadgray-og-dark text-status-danger rounded-xl font-medium text-center border-2 border-status-danger"
      )}
    >
      <Image src="warning_icon.svg" width={25} height={24} alt="warning icon" />
      Insufficient Funds
    </div>
  );
}
