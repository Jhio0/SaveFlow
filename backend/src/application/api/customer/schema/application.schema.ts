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

  type CreateApplicationPayload {
    screen: ApplicationScreen
  }

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
    items: ExpenseItemsInput!
  }

  type Mutation {
    createApplication: CreateApplicationPayload!
    submitCollectIncomeApplication(input: CollectIncomeApplicationInput!): CreateApplicationPayload!
    submitEssentialExpenseApplication(input: ExpenseApplicationInput!): CreateApplicationPayload!
  }
`;
