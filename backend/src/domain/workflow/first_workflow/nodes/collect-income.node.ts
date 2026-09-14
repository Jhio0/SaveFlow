import { AsyncNode, injectable, NoInput } from "myLibrary";
import z from "zod";
import { ApplicationScreen } from "../../../entities/application";

const collectIncomeExecuteInputSchema = z.object({});
const collectIncomeExecuteOutputSchema = z.object({
  screen: z.literal(ApplicationScreen.IncomeDetailScreen),
});
const collectIncomeResolveInputSchema = z.object({
  incomeAmount: z.number(),
});
const collectIncomeResolveOuputSchema = z.object({});

type CollectIncomeResolveInput = z.infer<
  typeof collectIncomeExecuteInputSchema
>;
type CollectIncomeResolveOutput = z.infer<
  typeof collectIncomeExecuteOutputSchema
>;

export type CollectIncomeExecuteInput = z.infer<
  typeof collectIncomeResolveInputSchema
>;
export type CollectIncomeExecuteOutput = z.infer<
  typeof collectIncomeResolveOuputSchema
>;

@injectable()
export class CollectIncomeNode extends AsyncNode<
  CollectIncomeResolveInput,
  CollectIncomeResolveOutput,
  CollectIncomeExecuteInput,
  CollectIncomeExecuteOutput
> {
  static readonly NODE_ID = "CollectIncome";
  readonly executeInputSchema = collectIncomeExecuteInputSchema;
  readonly executeOutputSchema = collectIncomeExecuteOutputSchema;
  readonly resolveInputSchema = collectIncomeResolveInputSchema;
  readonly resolveOutputSchema = collectIncomeResolveOuputSchema;

  constructor() {
    super(CollectIncomeNode.NODE_ID);
  }

  async executionAction(_: NoInput): Promise<CollectIncomeResolveOutput> {
    return {
      screen: ApplicationScreen.IncomeDetailScreen,
    };
  }

  async resolutionAction(
    _: CollectIncomeExecuteInput,
  ): Promise<CollectIncomeExecuteOutput> {
    return {};
  }

  async determineOutputPin(context: NoInput) {
    return "outputNavigationPin";
  }
}
