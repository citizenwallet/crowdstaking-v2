import { useConnectedUser } from "@/app/core/hooks/useConnectedUser";
import type { ChangeEvent } from "react";

type TProps = {
  name: string;
  value: string;
  /* eslint-disable-next-line no-unused-vars */
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function Input({ name, value, handleInputChange }: TProps) {
  return (
    <input
      name={name}
      className="px-2 truncate text-ellipsis text-[2.3rem] md:text-[2.5rem] text-neutral-200 bg-breadgray-grey300 placeholder-neutral-200"
      placeholder="00.00"
      inputMode="decimal"
      autoComplete="off"
      autoCorrect="off"
      type="text"
      pattern="^[0-9]*[.,]?[0-9]*$"
      minLength={1}
      maxLength={79}
      spellCheck="false"
      onChange={handleInputChange}
      value={value}
    />
  );
}

export default Input;
