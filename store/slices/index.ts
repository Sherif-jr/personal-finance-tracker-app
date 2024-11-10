import transactionReducer from "./transaction.slice";

const reducers = {
  transactions: transactionReducer,
};

export default reducers;

export interface StoreState {
  transactions: ReturnType<typeof transactionReducer>;
}
