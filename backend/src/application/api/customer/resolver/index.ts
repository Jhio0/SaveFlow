import { buildResolvers } from "myLibrary";
import { UserAuthQueryResolver } from "./userAuth/userAuth.query.resolver";
import { UserAuthMutationResolver } from "./userAuth/userAuth.mutation.resolver";
import { CreateApplicationMutationResolver } from "./mutation/createApplication.mutation.resolver";

export function createResolvers() {
  return buildResolvers({
    Query: [UserAuthQueryResolver],
    Mutation: [UserAuthMutationResolver, CreateApplicationMutationResolver],
  });
}
