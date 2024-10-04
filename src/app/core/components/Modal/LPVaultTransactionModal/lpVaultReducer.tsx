import { Hex } from "viem";

/**
 * STATES
 */
export type LpVaultLoading = {
  depositAmount: bigint;
  status: "loading";
};

export type LpVaultAllowanceIdle = {
  depositAmount: bigint;
  allowance: bigint;
  status: "allowance_transaction_idle";
};

export type LpVaultAllowanceSubmitted = {
  depositAmount: bigint;
  allowance: bigint;
  status: "allowance_transaction_submitted";
  txHash: Hex;
};

export type LpVaultAllowanceReverted = {
  depositAmount: bigint;
  allowance: bigint;
  status: "allowance_transaction_reverted";
  txHash: Hex;
};

export type LpVaultAllowance =
  | LpVaultAllowanceIdle
  | LpVaultAllowanceSubmitted
  | LpVaultAllowanceReverted;

export type LpVaultDepositIdle = {
  depositAmount: bigint;
  status: "deposit_transaction_idle";
};

export type LpVaultDepositSubmitted = {
  depositAmount: bigint;
  status: "deposit_transaction_submitted";
  txHash: Hex;
};

export type LpVaultDepositConfirmed = {
  depositAmount: bigint;
  status: "deposit_transaction_confirmed";
  txHash: Hex;
};

export type LpVaultDepositReverted = {
  depositAmount: bigint;
  status: "deposit_transaction_reverted";
  txHash: Hex;
};

export type LpVaultDeposit =
  | LpVaultDepositIdle
  | LpVaultDepositSubmitted
  | LpVaultDepositConfirmed
  | LpVaultDepositReverted;

export type LpVaultState = LpVaultLoading | LpVaultAllowance | LpVaultDeposit;

/**
 * EVENTS
 */
export type LpVaultAllowanceUpdate = {
  type: "ALLOWANCE_UPDATE";
  payload: {
    allowance: bigint;
  };
};

export type LpVaultTransactionSubmitted = {
  type: "TRANSACTION_SUBMITTED";
  payload: { hash: Hex };
};

export type LpVaultTransactionReverted = {
  type: "TRANSACTION_REVERTED";
};

export type LpVaultTransactionConfirmed = {
  type: "TRANSACTION_CONFIRMED";
};

export type LpVaultEvent =
  | LpVaultAllowanceUpdate
  | LpVaultTransactionSubmitted
  | LpVaultTransactionReverted
  | LpVaultTransactionConfirmed;

export function lpVaultReducer(
  state: LpVaultState,
  event: LpVaultEvent
): LpVaultState {
  console.log(`\nSTATE: ${state.status}`);
  console.log(`EVENT: ${event.type}\n\n`);
  switch (state.status) {
    case "loading":
      if (event.type === "ALLOWANCE_UPDATE") {
        return {
          ...state,
          allowance: event.payload.allowance,
          status:
            event.payload.allowance >= state.depositAmount
              ? "deposit_transaction_idle"
              : "allowance_transaction_idle",
        };
      }
      return state;

    case "allowance_transaction_idle":
      if (event.type === "TRANSACTION_SUBMITTED") {
        return {
          ...state,
          status: "allowance_transaction_submitted",
          txHash: event.payload.hash,
        };
      }
      if (event.type === "ALLOWANCE_UPDATE") {
        return {
          ...state,
          allowance: event.payload.allowance,
          status:
            event.payload.allowance >= state.depositAmount
              ? "deposit_transaction_idle"
              : "allowance_transaction_idle",
        };
      }
      return state;

    case "allowance_transaction_submitted":
      if (event.type === "ALLOWANCE_UPDATE") {
        return {
          ...state,
          allowance: event.payload.allowance,
          status:
            event.payload.allowance >= state.depositAmount
              ? "deposit_transaction_idle"
              : "allowance_transaction_idle",
        };
      }
      if (event.type === "TRANSACTION_REVERTED") {
        return {
          ...state,
          status: "allowance_transaction_reverted",
        };
      }
      return state;

    case "deposit_transaction_idle":
      if (event.type === "TRANSACTION_SUBMITTED") {
        return {
          ...state,
          status: "deposit_transaction_submitted",
          txHash: event.payload.hash,
        };
      }
      return state;

    case "deposit_transaction_submitted":
      if (event.type === "TRANSACTION_CONFIRMED") {
        return {
          ...state,
          status: "deposit_transaction_confirmed",
        };
      }
      if (event.type === "TRANSACTION_REVERTED") {
        return {
          ...state,
          status: "deposit_transaction_reverted",
        };
      }
      return state;

    default:
      return state;
  }
}
