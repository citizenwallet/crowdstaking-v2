import { WriteContractReturnType } from "viem";

export type TTransactionHash = WriteContractReturnType;

export type TTransactionNew = {
  id: string;
  status: "PREPARED";
  value: string;
};
export type TTransactionPending = {
  id: string;
  status: "SUBMITTED";
  value: string;
  hash: TTransactionHash;
};
export type TTransactionSuccess = {
  id: string;
  status: "CONFIRMED";
  value: string;
  hash: TTransactionHash;
};
export type TTransactionReverted = {
  id: string;
  status: "REVERTED";
  value: string;
  hash: TTransactionHash;
};
export type TSafeTransactionSubmitted = {
  id: string;
  status: "SAFE_SUBMITTED";
  value: string;
  hash: TTransactionHash;
};

export type TTransaction =
  | TTransactionNew
  | TTransactionPending
  | TTransactionSuccess
  | TTransactionReverted
  | TSafeTransactionSubmitted;

export type TTransactionStatus = TTransaction["status"];

export type TTransactionsState = TTransaction[];

export type TTransactionsAction =
  | {
      type: "NEW";
      payload: { id: string; value: string; isSafe?: boolean };
    }
  | {
      type: "SET_PENDING";
      payload: { id: string; hash: TTransactionHash };
    }
  | {
      type: "SET_SUCCESS";
      payload: { id: string };
    }
  | {
      type: "SET_REVERTED";
      payload: { id: string };
    }
  | {
      type: "CLEAR";
      payload: { id: string };
    }
  | {
      type: "SET_SAFE_SUBMITTED";
      payload: { id: string; hash: TTransactionHash };
    };

export type TTransactionsDispatch = (action: TTransactionsAction) => void;

export function TransactionsReducer(
  state: TTransactionsState,
  action: TTransactionsAction
): TTransactionsState {
  switch (action.type) {
    case "NEW": {
      return [
        {
          id: action.payload.id,
          status: "PREPARED",
          value: action.payload.value,
        },
        ...state,
      ];
    }
    case "SET_PENDING": {
      return state.map((tx) => {
        if (tx.id === action.payload.id) {
          if (tx.status !== "PREPARED") {
            throw new Error("can only set SUBMITTED status on NEW tx!");
          }
          return {
            ...tx,
            status: "SUBMITTED",
            hash: action.payload.hash,
          };
        }
        return tx;
      });
    }
    case "SET_SUCCESS": {
      return state.map((tx) => {
        if (tx.id === action.payload.id) {
          if (tx.status !== "SUBMITTED") {
            throw new Error("can only set CONFIRMED status on SUBMITTED tx!");
          }
          return {
            ...tx,
            status: "CONFIRMED",
          };
        }
        return tx;
      });
    }
    case "SET_REVERTED":
      return state.map((tx) => {
        if (tx.id === action.payload.id) {
          if (tx.status !== "SUBMITTED") {
            throw new Error("can only set REVERTED status on SUBMITTED tx!");
          }
          return {
            ...tx,
            status: "REVERTED",
          };
        }
        return tx;
      });
    case "SET_SAFE_SUBMITTED":
      return state.map((tx) => {
        if (tx.id === action.payload.id) {
          if (tx.status !== "PREPARED") {
            throw new Error("can only set SAFE_SUBMITTED status on NEW tx!");
          }
          return {
            ...tx,
            status: "SAFE_SUBMITTED",
            hash: action.payload.hash,
          };
        }
        return tx;
      });
    case "CLEAR":
      return state.filter(
        (transaction) => transaction.id !== action.payload.id
      );
    default:
      throw new Error(`TransactionDisplay action not recognised`);
  }
}

function getIndex(state: TTransactionsState, id: string): number {
  const txIndex = state.findIndex((tx) => tx.id === id);
  if (txIndex < 0) throw new Error("no tx found with that id!");
  return txIndex;
}
