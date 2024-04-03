import { ReactNode, useState } from "react";
import { DecrementIcon, IncrementIcon } from "./Icons";
import { formatVotePercentage } from "@/app/core/util/formatter";

export function ProjectRow({
  id,
  name,
  value,
  updateValue,
  pointsRemaining,
  total,
}: {
  id: string;
  name: string;
  value: number | null;
  updateValue: (value: number | null, id: string) => void;
  pointsRemaining: number;
  total: number;
}) {
  const [isRed, setIsRed] = useState(false);

  function increment() {
    updateValue((value || 0) + 1, id);
  }

  function decrement() {
    updateValue((value || 0) - 1 >= 0 ? (value || 0) - 1 : value, id);
  }

  return (
    <div className="flex flex-row rounded-lg p-4 justify-start gap-4 bg-breadgray-charcoal border border-breadgray-toast">
      <span className="rounded-full bg-neutral-700 w-8 h-8"></span>
      <span className="text-xl grow">{name}</span>
      <div className="flex items-center gap-2 pr-2 border-2 border-breadgray-rye rounded-lg dark:bg-breadgray-burnt">
        <InputButton onClick={decrement}>
          <div className="w-5 h-5">
            <DecrementIcon />
          </div>
        </InputButton>
        <input
          className={`min-w-14 max-w-0 p-1 dark:bg-breadgray-burnt border-neutral-300 text-2xl font-medium ${
            isRed ? "text-red-500" : ""
          }`}
          type="text"
          placeholder="00"
          inputMode="decimal"
          autoComplete="off"
          autoCorrect="off"
          pattern="^[0-9]*[.,]?[0-9]*$"
          minLength={1}
          maxLength={79}
          spellCheck="false"
          onChange={(event) => {
            if (pointsRemaining < 0) {
              setIsRed(true);
            } else {
              if (isRed) {
                setIsRed(false);
              }
            }
            updateValue(
              event.target.value ? parseInt(event.target.value) : null,
              id
            );
          }}
          value={value === null ? "" : value}
        />
        <InputButton onClick={increment}>
          <div className="w-5 h-5">
            <IncrementIcon />
          </div>
        </InputButton>
        <div>{formatVotePercentage(value ? (value / total) * 100 : 0)}%</div>
      </div>
    </div>
  );
}

function InputButton({
  onClick,
  children,
}: {
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button className="p-2" onClick={onClick}>
      {children}
    </button>
  );
}
