// ******** THIS FILE IS GENERATED, MANUAL CHANGES WILL BE OVERWRITTEN ******** //

import { buildResolvers } from "myLibrary";
import { CreateApplicationMutationResolver } from "./mutation/createApplication.mutation.resolver";
import { SubmitExpenseScreenMutationResolver } from "./mutation/submit-screens/submit-expense-screen.mutation.resolver";
import { SubmitIncomeScreenMutationResolver } from "./mutation/submit-screens/submit-income-screen.mutation.resolver";
import { UserAuthMutationResolver } from "./userAuth/userAuth.mutation.resolver";
import { UserAuthQueryResolver } from "./userAuth/userAuth.query.resolver";

export function createResolvers() {
  return buildResolvers({
    Query: [
      UserAuthQueryResolver,
    ],
    Mutation: [
      CreateApplicationMutationResolver,
      SubmitExpenseScreenMutationResolver,
      SubmitIncomeScreenMutationResolver,
      UserAuthMutationResolver,
    ],
  });
}
