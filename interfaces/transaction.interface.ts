export interface Transaction {
  id: string;
  description: string;
  amount: number;
  /** ISO Date string */
  date: string;
  type: "income" | "expense";
  category: string;
}

export type TransactionInput = Omit<Transaction, "id">;

export interface TransactionSort {
  field: keyof Transaction;
  order: "asc" | "desc";
}
