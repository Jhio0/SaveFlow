import { z } from "zod";
import { ExpenseItemSchema, noInputSchema } from "./shared-node.type";
import { AsyncNode, NoInput, NoOutput } from "myLibrary";
import { injectable } from "tsyringe";
import { ApplicationScreen } from "../../../entities/application";

export const InformationReviewExecuteInputSchema = z.object({
  essentialItems: z.array(ExpenseItemSchema),
  financialLoanItems: z.array(ExpenseItemSchema),
  subscriptionItems: z.array(ExpenseItemSchema),
});

export const InformationReviewExecuteOutputSchema = z.object({
  screen: z.literal("InformationReviewScreen"),
  essentialItems: z.array(ExpenseItemSchema),
  financialLoanItems: z.array(ExpenseItemSchema),
  subscriptionItems: z.array(ExpenseItemSchema),
});

export type InformationReviewExecuteInput = z.infer<
  typeof InformationReviewExecuteInputSchema
>;
export type InformationReviewExecuteOutput = z.infer<
  typeof InformationReviewExecuteOutputSchema
>;

@injectable()
export class InformationReviewNode extends AsyncNode<
  InformationReviewExecuteInput,
  InformationReviewExecuteOutput,
  NoInput,
  NoOutput
> {
  static readonly NODE_ID = "InformationReview";
  readonly executeInputSchema = InformationReviewExecuteInputSchema;
  readonly executeOutputSchema = InformationReviewExecuteOutputSchema;
  readonly resolveInputSchema = noInputSchema;
  readonly resolveOutputSchema = noInputSchema;

  constructor() {
    super(InformationReviewNode.NODE_ID);
  }

  async executionAction(
    input: InformationReviewExecuteInput,
  ): Promise<InformationReviewExecuteOutput> {
    return {
      screen: ApplicationScreen.InformationReviewScreen,
      essentialItems: input.essentialItems,
      financialLoanItems: input.financialLoanItems,
      subscriptionItems: input.subscriptionItems,
    };
  }

  async resolutionAction(_: NoInput): Promise<NoOutput> {
    console.log("Printing data:");
    return {};
  }

  async determineOutputPin(context: NoInput) {
    return "outputNavigationPin";
  }
}
