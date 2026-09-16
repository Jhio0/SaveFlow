import { enumFromKeyStringThrow, GraphQLContext, Resolver } from "myLibrary";
import { inject } from "../../../../../../lib/strict-inject";
import { ProviderTokens } from "../../../../../../lib/injection-tokens/provider-tokens";
import { CollectedExpenseDataProviderPort } from "../../../../../../domain/provider/collected-expense-data.provider.port";
import {
  CreateApplicationPayload,
  ExpenseApplicationInput,
} from "../../../schema";
import { mapDomainToSchemaScreen } from "./screen-mapper";
import { ExpenseSource } from "../../../../../../domain/entities/collected-expsense-data";

@Resolver
export class SubmitExpenseScreenMutationResolver {
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
    const screen =
      await this.collectedExpenseDataProviderPort.handleExpenseNode({
        name: items.name,
        amount: items.amount,
        source: enumFromKeyStringThrow(ExpenseSource, items.source),
        applicationId,
      });

    return { screen: mapDomainToSchemaScreen(screen) };
  }
}
