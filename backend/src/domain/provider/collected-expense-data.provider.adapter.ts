import { Provider } from "myLibrary";
import {
  CollectedExpenseDataProviderPort,
  handleExpenseNodeInput,
} from "./collected-expense-data.provider.port";
import { ApplicationScreen } from "../entities/application";
import { inject } from "tsyringe";
import { ProviderTokens } from "../../lib/injection-tokens/provider-tokens";
import ApplicationProviderPort from "./application.provider.port";
import { ExpenseResolveInput } from "../workflow/first_workflow/nodes/shared-node.type";

@Provider
export class CollectedExpenseDataProviderAdapter implements CollectedExpenseDataProviderPort {
  constructor(
    @inject(ProviderTokens.ApplicationProviderAdapter)
    private applicationProviderPort: ApplicationProviderPort,
  ) {}

  async handleExpenseNode(
    input: handleExpenseNodeInput,
  ): Promise<ApplicationScreen> {
    return await this.applicationProviderPort.submitScreen<ExpenseResolveInput>(
      input.applicationId,
      {
        items: input.items,
      },
    );
  }
}
