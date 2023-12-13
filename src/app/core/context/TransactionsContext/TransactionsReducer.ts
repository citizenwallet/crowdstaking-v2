import { WriteContractReturnType } from "viem";

export type TTransactionHash = WriteContractReturnType;

export type TTransaction =
  | {
      status: "PENDING";
      hash: TTransactionHash;
    }
  | {
      status: "SUCCESS";
      hash: TTransactionHash;
    }
  | {
      status: "FAILED";
      hash: TTransactionHash;
    };

export type TTransactionsState = TTransaction[];

export type TTransactionsAction =
  | {
      type: "WATCH";
      payload: { hash: TTransactionHash };
    }
  | {
      type: "SUCCESS";
      payload: { hash: TTransactionHash };
    }
  | {
      type: "FAILED";
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
  switch (actionType) {
    case "WATCH":
      return [{ status: "PENDING", hash }, ...state];
    case "SUCCESS":
      return [{ status: "SUCCESS", hash }, ...state];
    case "FAILED":
      return [{ status: "FAILED", hash }, ...state];
    default:
      throw new Error("TransactionDisplay action not recognised");
  }
}
