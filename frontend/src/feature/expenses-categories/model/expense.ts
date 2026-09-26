import { ExpenseSource } from "@/network/__generated__/graphql";

export interface ExpenseCategory {
  id: string;
  name: string;
  enabled: boolean;
  amount: number | null;
  source: ExpenseSource;
}

export interface ExpenseItem {
  name: string;
  amount: number;
  source: ExpenseSource;
}
