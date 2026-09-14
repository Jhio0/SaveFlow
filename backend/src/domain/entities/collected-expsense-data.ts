export type ExpenseItems = {
  name: string;
  amount: number;
  source: "preset" | "subscription";
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
