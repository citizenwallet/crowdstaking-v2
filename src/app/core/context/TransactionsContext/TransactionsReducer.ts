import { WriteContractReturnType } from "viem";

export type TTransactionHash = WriteContractReturnType;

export type TTransactionData =
  | {
      type: "BAKERY";
      value: string;
      isSafe?: boolean;
    }
  | {
      type: "VOTE";
    };

export type TTransactionNew = {
  id: string;
  status: "PREPARED";
  data: TTransactionData;
};
export type TTransactionSubmitted = {
  id: string;
  status: "SUBMITTED";
  data: TTransactionData;
  hash: TTransactionHash;
};
export type TTransactionSuccess = {
  id: string;
  status: "CONFIRMED";
  data: TTransactionData;
  hash: TTransactionHash;
};
export type TTransactionReverted = {
  id: string;
  status: "REVERTED";
  data: TTransactionData;
  hash: TTransactionHash;
};
export type TSafeTransactionSubmitted = {
  id: string;
  status: "SAFE_SUBMITTED";
  data: TTransactionData;
  hash: TTransactionHash;
};

export type TTransaction =
  | TTransactionNew
  | TTransactionSubmitted
  | TTransactionSuccess
  | TTransactionReverted
  | TSafeTransactionSubmitted;

export type TTransactionStatus = TTransaction["status"];

export type TTransactionsState = TTransaction[];

// TODO made value optional for now
// value could be a union eg. eth/bread amount | vote points

export type TTransactionsAction =
  | {
      type: "NEW";
      payload: { id: string; data: TTransactionData };
    }
  | {
      type: "SET_SUBMITTED";
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
          data: action.payload.data,
        },
        ...state,
      ];
    }
    case "SET_SUBMITTED": {
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
