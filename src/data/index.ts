// import json data
import data from "./data.json";
import type { Transaction } from "./types";

export const getTransactions = (): Transaction[] => {
  return data as Transaction[];
};

// get transaction by id
export const getTransactionById = (id: string): Transaction | undefined => {
  const transactions = getTransactions();
  return transactions.find((tx) => tx.id === id);
};
