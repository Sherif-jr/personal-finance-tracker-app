import { Middleware } from "@reduxjs/toolkit";
import { StoreState } from "../slices";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocalStorageKeys } from "@/constants/enums";

export const persistState: Middleware<{}, StoreState> =
  ({ getState }) =>
  (next) =>
  async (action) => {
    let result = next(action);
    try {
      const state = getState();
      const { transactions, loading: transactionsLoading } = state.transactions;
      console.log({
        transactions,
        transactionsLoading,
      });

      if (!transactionsLoading) {
        console.log("saving to local storage");

        AsyncStorage.setItem(
          LocalStorageKeys.transactions,
          JSON.stringify(transactions)
        );
      }
    } catch (error) {
      console.error("Failed to save persist state:", error);
    }
    return result;
  };
