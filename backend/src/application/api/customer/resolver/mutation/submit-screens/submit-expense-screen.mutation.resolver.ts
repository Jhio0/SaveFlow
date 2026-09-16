import { GraphQLContext, Resolver } from "myLibrary";
import { inject } from "../../../../../../lib/strict-inject";
import { ProviderTokens } from "../../../../../../lib/injection-tokens/provider-tokens";
import { CollectedExpenseDataProviderPort } from "../../../../../../domain/provider/collected-expense-data.provider.port";
import {
  CreateApplicationPayload,
  ExpenseApplicationInput,
} from "../../../schema";
import { mapDomainToSchemaScreen } from "./screen-mapper";

@Resolver
class SubmitExpenseScreenMutationResolver {
  constructor(
    @inject(ProviderTokens.CollectedExpenseDataProviderAdapter)
    private collectedExpenseDataProviderPort: CollectedExpenseDataProviderPort,
  ) {}

  async submitEssentialExpenseApplication(
    _: unknown,
    args: { input: ExpenseApplicationInput },
    context: GraphQLContext,
  ): Promise<CreateApplicationPayload> {
    const { items, applicationId } = args.input;
    const screen = this.collectedExpenseDataProviderPort.handleExpenseNode({
      name: items.name,
      amount: items.amount,
      source: items.source,
      applicationId,
    });

    return { screen: mapDomainToSchemaScreen(screen) };
  }
}
