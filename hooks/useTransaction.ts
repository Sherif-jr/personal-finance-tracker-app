import {
  Transaction,
  TransactionInput,
  TransactionSort,
} from "@/interfaces/transaction.interface";
import uuid from "react-native-uuid";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import {
  addTransaction,
  deleteTransaction as deleteTransactionAction,
  updateTransaction as updateTransactionAction,
} from "@/store/slices/transaction.slice";
import { useMemo } from "react";

const useTransaction = (config?: Partial<TransactionSort>) => {
  const transactions = useAppSelector(
    (state) => state.transactions.transactions,
    (a, b) => JSON.stringify(a) === JSON.stringify(b)
  );
  const dispatch = useAppDispatch();

  // A function to get the sorted array anywhere
  const getSortedTransactions = ({ field, order }: TransactionSort) => {
    const newTransactionArray = [...transactions];

    return newTransactionArray.sort((a, b) => {
      if (order === "asc") {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });
  };
  // a ready-to-use value of the sorted array based on the passed config
  const sortedTransactions = useMemo(
    () =>
      getSortedTransactions({
        field: config?.field || "date",
        order: config?.order || "desc",
      }),
    [transactions, config?.field, config?.order]
  );

  const getTransaction = (id: string) => {
    return transactions.find((transaction) => transaction.id === id);
  };

  const createTransaction = (transaction: TransactionInput) => {
    const newId = uuid.v4().toString();
    dispatch(addTransaction({ ...transaction, id: newId }));
    return {
      ...transaction,
      id: newId,
    };
  };

  const updateTransaction = (transaction: Transaction) => {
    dispatch(updateTransactionAction(transaction));
    return transaction;
  };

  const deleteTransaction = (id: string) => {
    dispatch(deleteTransactionAction(id));
  };

  return {
    transactions,
    sortedTransactions,
    getTransaction,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    getSortedTransactions,
  };
};

export default useTransaction;
