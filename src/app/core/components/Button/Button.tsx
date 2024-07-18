import { forwardRef, Ref, type MouseEvent, type ReactNode } from "react";
import clsx from "clsx";

export type TButtonSize = "small" | "regular" | "large" | "xl";
export type TButtonVariant = "primary" | "danger";

interface IProps {
  children: ReactNode;
  onClick: (event: MouseEvent) => void;
  disabled?: boolean;
  size?: TButtonSize;
  variant?: TButtonVariant;
  fullWidth?: boolean;
}

export const ButtonSizes = {
  small: "px-4 py-2 text-sm",
  regular: "px-4 py-2 text-base",
  large: "px-7 py-2.5 text-lg sm:text-lg",
  xl: "px-7 py-3 text-xl sm:text-xl tracking-wider",
};

export const ButtonVariants = {
  primary:
    "bg-breadviolet-shaded dark:bg-breadpink-shaded text-breadgray-ultra-white dark:text-breadgray-og-dark disabled:bg-opacity-60",
  danger:
    "bg-status-danger-light dark:bg-status-danger text-breadgray-ultra-white dark:text-breadgray-grey100 bg-opacity-85 hover:bg-opacity-100",
};

const Button = forwardRef(
  (
    {
      children,
      onClick,
      size = "regular",
      variant = "primary",
      fullWidth = false,
      disabled = false,
    }: IProps,
    ref: Ref<HTMLButtonElement>
  ) => {
    return (
      <button
        ref={ref}
        type="button"
        className={clsx(
          "rounded-xl inline-block font-bold transition-all",
          ButtonSizes[size],
          ButtonVariants[variant],
          fullWidth && "w-full"
        )}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
