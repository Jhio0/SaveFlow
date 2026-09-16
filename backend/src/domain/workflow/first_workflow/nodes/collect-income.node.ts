import { AsyncNode, injectable, NoInput, NoOutput } from "myLibrary";
import z from "zod";
import { ApplicationScreen } from "../../../entities/application";
import { noInputSchema } from "./shared-node.schema";

const collectIncomeExecuteOutputSchema = z.object({
  screen: z.literal(ApplicationScreen.IncomeDetailScreen),
});
const collectIncomeResolveInputSchema = z.object({
  incomeAmount: z.number(),
});

type CollectIncomeExecuteOuput = z.infer<
  typeof collectIncomeExecuteOutputSchema
>;

export type CollectIncomeResolveInput = z.infer<
  typeof collectIncomeResolveInputSchema
>;

@injectable()
export class CollectIncomeNode extends AsyncNode<
  NoInput,
  CollectIncomeExecuteOuput,
  CollectIncomeResolveInput,
  NoInput
> {
  static readonly NODE_ID = "CollectIncome";
  readonly executeInputSchema = noInputSchema;
  readonly executeOutputSchema = collectIncomeExecuteOutputSchema;
  readonly resolveInputSchema = collectIncomeResolveInputSchema;
  readonly resolveOutputSchema = noInputSchema;

  constructor() {
    super(CollectIncomeNode.NODE_ID);
  }

  async executionAction(_: NoInput): Promise<CollectIncomeExecuteOuput> {
    return {
      screen: ApplicationScreen.IncomeDetailScreen,
    };
  }

  async resolutionAction(_: CollectIncomeResolveInput): Promise<NoOutput> {
    return {};
  }

  async determineOutputPin(context: NoInput) {
    return "outputNavigationPin";
  }
}
