export enum ExpenseSource {
  ESSENTIALS = "ESSENTIALS",
}

export type ExpenseItems = {
  name: string;
  amount: number;
  source: ExpenseSource;
};

export interface CollectedExpenseData {
  id: string;
  userId: string;
  applicationId: string;
  income: number;
  totalExpense: number;
  moneyLeft: number;
  savingsRate: number;
  items: ExpenseItems;
}
