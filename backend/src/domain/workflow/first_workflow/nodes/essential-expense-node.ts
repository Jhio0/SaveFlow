import { AsyncNode, injectable, NoInput, NoOutput } from "myLibrary";
import z from "zod";
import { ApplicationScreen } from "../../../entities/application";
import { ExpenseResolveSchema, noInputSchema } from "./shared-node.schema";

const EssentialExpenseExecuteOutputSchema = z.object({
  screen: z.literal(ApplicationScreen.EssentialExpenseScreen),
});

type EssentialExpenseExecuteOutput = z.infer<
  typeof EssentialExpenseExecuteOutputSchema
>;

export type ExpenseResolveInput = z.infer<typeof ExpenseResolveSchema>;
export type ExpenseResolveOutput = z.infer<typeof ExpenseResolveSchema>;

@injectable()
export class EssentialExpenseNode extends AsyncNode<
  NoInput,
  EssentialExpenseExecuteOutput,
  ExpenseResolveInput,
  ExpenseResolveOutput
> {
  static readonly NODE_ID = "EssentialExpense";
  readonly executeInputSchema = noInputSchema;
  readonly executeOutputSchema = EssentialExpenseExecuteOutputSchema;
  readonly resolveInputSchema = ExpenseResolveSchema;
  readonly resolveOutputSchema = ExpenseResolveSchema;

  constructor() {
    super(EssentialExpenseNode.NODE_ID);
  }

  async executionAction(_: NoInput): Promise<EssentialExpenseExecuteOutput> {
    return {
      screen: ApplicationScreen.EssentialExpenseScreen,
    };
  }

  async resolutionAction(
    input: ExpenseResolveInput,
  ): Promise<ExpenseResolveOutput> {
    return {
      items: input.items.map((item) => ({
        name: item.name,
        amount: item.amount,
        source: item.source,
      })),
    };
  }

  async determineOutputPin(context: NoInput) {
    return "outputNavigationPin";
  }
}
