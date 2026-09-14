import { inject } from "tsyringe";
import ApplicationProviderPort from "../../../../../../domain/provider/application.provider.port";
import { ProviderTokens } from "../../../../../../lib/injection-tokens/provider-tokens";
import { GraphQLContext, Resolver } from "myLibrary";
import {
  CollectIncomeApplicationInput,
  CreateApplicationPayload,
} from "../../../schema";
import SubmitIncomeNodeHandlerProviderPort from "../../../../../../domain/provider/node-handlers/submit-income-node-handler.provider.port";
import { mapDomainToSchemaScreen } from "./screen-mapper";

@Resolver
export class SubmitIncomeScreenMutationResolver {
  constructor(
    @inject(ProviderTokens.SubmitIncomeNodeHandlerProviderAdapter)
    private submitIncomeNodeHandlerProvider: SubmitIncomeNodeHandlerProviderPort,
  ) {}

  async submitCollectIncomeApplication(
    _: unknown,
    args: { input: CollectIncomeApplicationInput },
    context: GraphQLContext,
  ): Promise<CreateApplicationPayload> {
    const screen =
      await this.submitIncomeNodeHandlerProvider.handleIncomeNodeHandler({
        applicationId: args.input.applicationId,
        incomeAmount: args.input.incomeAmount,
      });

    return { screen: mapDomainToSchemaScreen(screen) };
  }
}
