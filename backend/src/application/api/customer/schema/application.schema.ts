import { gql } from "apollo-server";
import { ApplicationScreen } from "../../../../domain/entities/application-screen";
import { getEnumList } from "myLibrary";

export const applicationSchema = gql`
  enum ApplicationScreen {
    ${getEnumList(ApplicationScreen)}
  }

  type CreateApplicationPayload {
    screen: ApplicationScreen
  }

  type Mutation {
    createApplication: CreateApplicationPayload!
  }
`;
