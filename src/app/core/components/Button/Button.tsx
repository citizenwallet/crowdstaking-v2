import { type MouseEvent, type ReactNode } from "react";
import clsx from "clsx";

export type TButtonVariant = "small" | "regular" | "large";

interface IProps {
  children: ReactNode;
  onClick: (event: MouseEvent) => void;
  disabled?: boolean;
  variant?: TButtonVariant;
  fullWidth?: boolean;
}

const EVariants = {
  small: "px-4 py-2 text-sm",
  regular: "px-4 py-2 text-base",
  large: "px-7 py-4 text-xl sm:text-2xl",
};

function Button({
  children,
  onClick,
  variant = "regular",
  fullWidth = false,
  disabled = false,
}: IProps) {
  return (
    <button
      type="button"
      className={clsx(
        "bg-breadpink-shaded text-breadgray-og-dark hover:bg-opacity-100 disabled:bg-opacity-50 bg-opacity-85 rounded-xl inline-block font-bold",
        EVariants[variant],
        fullWidth && "w-full"
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default Button;
