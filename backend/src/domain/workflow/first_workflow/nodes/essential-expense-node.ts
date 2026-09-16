import { AsyncNode, injectable, NoInput, NoOutput } from "myLibrary";
import z from "zod";
import { ApplicationScreen } from "../../../entities/application";
import {
  ExpenseResolveInput,
  ExpenseResolveInputSchema,
  noInputSchema,
} from "./shared-node.schema";

const EssentialExpenseExecuteOutputSchema = z.object({
  screen: z.literal(ApplicationScreen.EssentialExpenseScreen),
});

type EssentialExpenseExecuteOutput = z.infer<
  typeof EssentialExpenseExecuteOutputSchema
>;

@injectable()
export class EssentialExpenseNode extends AsyncNode<
  NoInput,
  EssentialExpenseExecuteOutput,
  ExpenseResolveInput,
  NoOutput
> {
  static readonly NODE_ID = "EssentialExpense";
  readonly executeInputSchema = noInputSchema;
  readonly executeOutputSchema = EssentialExpenseExecuteOutputSchema;
  readonly resolveInputSchema = ExpenseResolveInputSchema;
  readonly resolveOutputSchema = noInputSchema;

  constructor() {
    super(EssentialExpenseNode.NODE_ID);
  }

  async executionAction(_: NoInput): Promise<EssentialExpenseExecuteOutput> {
    return {
      screen: ApplicationScreen.EssentialExpenseScreen,
    };
  }

  async resolutionAction(_: ExpenseResolveInput): Promise<NoOutput> {
    return {};
  }

  async determineOutputPin(context: NoInput) {
    return "outputNavigationPin";
  }
}
