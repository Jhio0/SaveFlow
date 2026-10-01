import { gql } from "apollo-server";

import { getEnumList } from "myLibrary";
import { ExpenseSource } from "../../../../domain/entities/collected-expsense-data";

export const collectedExpenseSchema = gql`
  enum CollectedExpenseSource {
    ${getEnumList(ExpenseSource)}
  }

  type CollectedExpenseItem {
    name: String!
    amount: Int!
    source: CollectedExpenseSource!
  }

  type CollectedExpenseData {
    userId: ID!
    applicationId: ID!
    income: Int!
    totalExpense: Int!
    moneyLeft: Int!
    savingsRate: Float!
    essentialItems: [CollectedExpenseItem!]!
    financialItems: [CollectedExpenseItem!]!
    subscriptionItems: [CollectedExpenseItem!]!
  }

  type Query {
    collectedExpenseData: CollectedExpenseData!
  }
`;
