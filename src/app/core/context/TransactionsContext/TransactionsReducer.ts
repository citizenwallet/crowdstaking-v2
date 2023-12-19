import { WriteContractReturnType } from "viem";
import { nanoid } from "nanoid";

export type TTransactionHash = WriteContractReturnType;

export type TTransactionNew = {
  id: string;
  status: "PREPARED";
  value: string;
};
export type TTransactionPending = {
  id: string;
  status: "PENDING";
  value: string;
  hash: TTransactionHash;
};
export type TTransactionSuccess = {
  id: string;
  status: "SUCCESS";
  value: string;
  hash: TTransactionHash;
};
export type TTransactionReverted = {
  id: string;
  status: "REVERTED";
  value: string;
  hash: TTransactionHash;
};

export type TTransaction =
  | TTransactionNew
  | TTransactionPending
  | TTransactionSuccess
  | TTransactionReverted;

export type TTransactionsState = TTransaction[];

export type TTransactionsAction =
  | {
      type: "NEW";
      payload: { id: string; value: string };
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
    };

export type TTransactionsDispatch = (action: TTransactionsAction) => void;

/*

User clicks BAKE/BURN etc

  Creates potential transaction
  
  if user rejects
    --> tx is discarded
  
    if user confirms we have a hash 

*/

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
            throw new Error("can only set PENDING status on NEW tx!");
          }
          return {
            ...tx,
            status: "PENDING",
            hash: action.payload.hash,
          };
        }
        return tx;
      });
    }
    case "SET_SUCCESS": {
      return state.map((tx) => {
        if (tx.id === action.payload.id) {
          if (tx.status !== "PENDING") {
            throw new Error("can only set SUCCESS status on PENDING tx!");
          }
          return {
            ...tx,
            status: "SUCCESS",
          };
        }
        return tx;
      });
    }
    case "SET_REVERTED":
      return state.map((tx) => {
        if (tx.id === action.payload.id) {
          if (tx.status !== "PENDING") {
            throw new Error("can only set REVERTED status on PENDING tx!");
          }
          return {
            ...tx,
            status: "REVERTED",
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
