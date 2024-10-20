import { Hex } from "viem";

export type WithdrawState =
  | WithdrawStateIdle
  | WithdrawStateSubmitted
  | WithdrawStateConfirmed
  | WithdrawStateReverted;

export type WithdrawStateIdle = {
  status: "idle";
};

export type WithdrawStateSubmitted = {
  status: "submitted";
  hash: Hex;
};

export type WithdrawStateConfirmed = {
  status: "confirmed";
  hash: Hex;
};
export type WithdrawStateReverted = {
  status: "reverted";
  hash: Hex;
};

export type WithdrawEvent =
  | WithdrawTransactionSubmitted
  | WithdrawTransactionConfirmed
  | WithdrawTransactionReverted;

export type WithdrawTransactionSubmitted = {
  type: "TRANSACTION_SUBMITTED";
  payload: { hash: Hex };
};

export type WithdrawTransactionReverted = {
  type: "TRANSACTION_REVERTED";
};

export type WithdrawTransactionConfirmed = {
  type: "TRANSACTION_CONFIRMED";
};

export function withdrawReducer(
  state: WithdrawState,
  event: WithdrawEvent
): WithdrawState {
  switch (state.status) {
    case "idle":
      if (event.type === "TRANSACTION_SUBMITTED") {
        return {
          ...state,
          status: "submitted",
          hash: event.payload.hash,
        };
      }
      return state;

    case "submitted":
      if (event.type === "TRANSACTION_CONFIRMED") {
        return {
          ...state,
          status: "confirmed",
        };
      }
      if (event.type === "TRANSACTION_REVERTED") {
        return {
          ...state,
          status: "reverted",
        };
      }
      return state;

    default:
      return state;
  }
}
