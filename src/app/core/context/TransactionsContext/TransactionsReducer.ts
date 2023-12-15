import { WriteContractReturnType } from "viem";

export type TTransactionHash = WriteContractReturnType;

export type TTransactionPending = {
  id: string;
  status: "PENDING";
  hash: TTransactionHash;
};
export type TTransactionSuccess = {
  id: string;
  status: "SUCCESS";
  hash: TTransactionHash;
};
export type TTransactionReverted = {
  id: string;
  status: "REVERTED";
  hash: TTransactionHash;
};

export type TTransaction =
  | TTransactionPending
  | TTransactionSuccess
  | TTransactionReverted;

export type TTransactionsState = TTransaction[];

export type TTransactionsAction =
  | {
      type: "PENDING";
      payload: { hash: TTransactionHash };
    }
  | {
      type: "SUCCESS";
      payload: { hash: TTransactionHash };
    }
  | {
      type: "REVERTED";
      payload: { hash: TTransactionHash };
    }
  | {
      type: "CLEAR";
      payload: { id: string };
    };

export type TTransactionsDispatch = (action: TTransactionsAction) => void;

export function TransactionsReducer(
  state: TTransactionsState,
  action: TTransactionsAction
): TTransactionsState {
  switch (action.type) {
    case "PENDING":
      return [
        {
          id: generateId(action.payload.hash),
          status: "PENDING",
          hash: action.payload.hash,
        },
        ...state,
      ];
    case "SUCCESS":
      return [
        {
          id: generateId(action.payload.hash),
          status: "SUCCESS",
          hash: action.payload.hash,
        },
        ...state,
      ];
    case "REVERTED":
      return [
        {
          id: generateId(action.payload.hash),
          status: "REVERTED",
          hash: action.payload.hash,
        },
        ...state,
      ];
    case "CLEAR":
      return [
        ...state.filter((transaction) => transaction.id !== action.payload.id),
      ];
    default:
      throw new Error(`TransactionDisplay action not recognised`);
  }
}

function generateId(hash: TTransactionHash): string {
  return Date.now().toString() + hash;
}
