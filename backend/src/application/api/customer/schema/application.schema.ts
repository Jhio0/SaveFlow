import { gql } from "apollo-server";

import { getEnumList } from "myLibrary";
import { ApplicationScreen } from "../../../../domain/entities/application";
import { ExpenseSource } from "../../../../domain/entities/collected-expsense-data";

export const applicationSchema = gql`
  enum ApplicationScreen {
    ${getEnumList(ApplicationScreen)}
  }

  enum ExpenseSource {
    ${getEnumList(ExpenseSource)}
  }

  type ExpenseItem {
    name: String!
    amount: Int!
    source: ExpenseSource!
  }

  interface ScreenPayload {
    screen: ApplicationScreen!
  }

  type CollectIncomePayload implements ScreenPayload {
    screen: ApplicationScreen!
  }

  type EssentialExpensePayload implements ScreenPayload {
    screen: ApplicationScreen!
  }

  type FinancialLoanExpensePayload implements ScreenPayload {
    screen: ApplicationScreen!
  }

  type SubscriptionExpensePayload implements ScreenPayload {
    screen: ApplicationScreen!
  }

  type InformationReviewPayload implements ScreenPayload {
    screen: ApplicationScreen!
    essentialItems: [ExpenseItem!]!
    financialLoanItems: [ExpenseItem!]!
    subscriptionItems: [ExpenseItem!]!
  }

  type CompletedPayload implements ScreenPayload {
    screen: ApplicationScreen!
  }

  union ApplicationPayload =
      CollectIncomePayload
    | EssentialExpensePayload
    | FinancialLoanExpensePayload
    | SubscriptionExpensePayload
    | InformationReviewPayload
    | CompletedPayload

  input ExpenseItemsInput {
    name: String!
    amount: Int!
    source: ExpenseSource!
  }

  input CollectIncomeApplicationInput {
    applicationId: ID!
    incomeAmount: Int!
  }
  
  input ExpenseApplicationInput {
    applicationId: ID!
    items: [ExpenseItemsInput!]!
  }

  input InformationReviewScreenInput {
    applicationId: ID!
  }

  type Mutation {
    createApplication: ApplicationPayload!
    submitCollectIncomeScreen(input: CollectIncomeApplicationInput!): ApplicationPayload!
    submitEssentialExpenseScreen(input: ExpenseApplicationInput!): ApplicationPayload!
    submitInformationReviewScreen(input: InformationReviewScreenInput!): ApplicationPayload!
  }
`;
