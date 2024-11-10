import { LocalStorageKeys } from "@/constants/enums";
import { Transaction } from "@/interfaces/transaction.interface";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TransactionState {
  transactions: Transaction[];

  loading: boolean;
}
const INITIAL_STATE: TransactionState = {
  transactions: [],
  loading: false,
};

const fetchLocalTransactions = createAsyncThunk(
  "transactions/fetchLocalTransactions",
  async () => {
    const transactions = await AsyncStorage.getItem(
      LocalStorageKeys.transactions
    );
    if (transactions) {
      return JSON.parse(transactions) as Transaction[];
    }
    return [];
  }
);

const transactionSlice = createSlice({
  name: "transactions",
  initialState: INITIAL_STATE,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload);
    },
    updateTransaction: (state, action: PayloadAction<Transaction>) => {
      const index = state.transactions.findIndex(
        (transaction) => transaction.id === action.payload.id
      );
      if (index !== -1) {
        state.transactions[index] = action.payload;
      }
    },
    deleteTransaction: (state, action: PayloadAction<string>) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchLocalTransactions.fulfilled, (state, action) => {
      state.transactions = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchLocalTransactions.rejected, (state) => {
      state.transactions = [];
      state.loading = false;
    });
    builder.addCase(fetchLocalTransactions.pending, (state) => {
      state.transactions = [];
      state.loading = true;
    });
  },
});

export const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
  setTransactions,
} = transactionSlice.actions;
export { fetchLocalTransactions };

const transactionReducer = transactionSlice.reducer;
export default transactionReducer;
