import { useConnectedUser } from "@/app/core/hooks/useConnectedUser";
import type { ChangeEvent } from "react";

type TProps = {
  name: string;
  value: string;
  /* eslint-disable-next-line no-unused-vars */
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

function Input({ name, value, handleInputChange }: TProps) {
  const { user } = useConnectedUser();
  return (
    <input
      name={name}
      className="w-0 flex-auto truncate text-ellipsis text-[2.3rem] bg-breadgray-grey300 placeholder-neutral-500"
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
