import { gql } from "apollo-server";

import { getEnumList } from "myLibrary";
import { ApplicationScreen } from "../../../../domain/entities/application";

export const applicationSchema = gql`
  enum ApplicationScreen {
    ${getEnumList(ApplicationScreen)}
  }

  type CreateApplicationPayload {
    screen: ApplicationScreen
  }

  input CollectIncomeApplicationInput {
    applicationId: ID!
    incomeAmount: Int!
  }

  type Mutation {
    createApplication: CreateApplicationPayload!
    submitCollectIncomeApplication(input: CollectIncomeApplicationInput!): CreateApplicationPayload!
  }
`;
