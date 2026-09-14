import { Provider } from "myLibrary";
import { ProviderTokens } from "../../../lib/injection-tokens/provider-tokens";
import { inject } from "../../../lib/strict-inject";

import { CollectIncomeExecuteInput } from "../../workflow/first_workflow/nodes/collect-income.node";
import ApplicationProviderPort from "../application.provider.port";
import SubmitIncomeNodeHandlerProviderPort, {
  handleIncomeNodeHandlerInput,
} from "./submit-income-node-handler.provider.port";
import { ApplicationScreen } from "../../entities/application";

@Provider
export class SubmitIncomeNodeHandlerProviderAdapter implements SubmitIncomeNodeHandlerProviderPort {
  constructor(
    @inject(ProviderTokens.ApplicationProviderAdapter)
    private applicationProviderPort: ApplicationProviderPort,
  ) {}

  async handleIncomeNodeHandler(
    input: handleIncomeNodeHandlerInput,
  ): Promise<ApplicationScreen> {
    return await this.applicationProviderPort.submitScreen<CollectIncomeExecuteInput>(
      input.applicationId,
      { incomeAmount: input.incomeAmount },
    );
  }
}
