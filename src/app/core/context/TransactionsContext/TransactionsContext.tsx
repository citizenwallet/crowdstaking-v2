import {
  type ReactNode,
  createContext,
  useContext,
  useReducer,
  useMemo,
} from "react";
import {
  TTransactionsDispatch,
  TTransactionsState,
  TransactionsReducer,
} from "./TransactionsReducer";

const TransactionsContext = createContext<
  | {
      state: TTransactionsState;
      dispatch: TTransactionsDispatch;
    }
  | undefined
>(undefined);

function TransactionsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(TransactionsReducer, []);

  const value = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <TransactionsContext.Provider value={value}>
      {children}
    </TransactionsContext.Provider>
  );
}

const useTransactions = () => {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error(
      "useTransactions must be used within a TransactionsProvider"
    );
  }
  return context;
};

export { TransactionsProvider, useTransactions };
