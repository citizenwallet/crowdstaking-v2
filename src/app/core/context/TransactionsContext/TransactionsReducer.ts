import { WriteContractReturnType } from "viem";

export type TTransactionHash = WriteContractReturnType;

export type TTransactionPending = {
  status: "PENDING";
  hash: TTransactionHash;
};
export type TTransactionSuccess = {
  status: "SUCCESS";
  hash: TTransactionHash;
};
export type TTransactionReverted = {
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
      payload: { hash: TTransactionHash };
    };

export type TTransactionsDispatch = (action: TTransactionsAction) => void;

export function TransactionsReducer(
  state: TTransactionsState,
  action: TTransactionsAction
): TTransactionsState {
  const {
    type: actionType,
    payload: { hash },
  } = action;
  console.log(`${actionType} action received`);
  console.log("current tx array: ", state);
  switch (actionType) {
    case "PENDING":
      return [{ status: "PENDING", hash }, ...state];
    case "SUCCESS":
      return [{ status: "SUCCESS", hash }, ...state];
    case "REVERTED":
      return [{ status: "REVERTED", hash }, ...state];
    case "CLEAR":
      return [...state.filter((transaction) => transaction.hash !== hash)];
    default:
      throw new Error(`TransactionDisplay action ${actionType} not recognised`);
  }
}
