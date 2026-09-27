import { z } from "zod";
import { ExpenseItemSchema, noInputSchema } from "./shared-node.type";
import { AsyncNode, NoInput, NoOutput } from "myLibrary";
import { injectable } from "tsyringe";
import { ApplicationScreen } from "../../../entities/application";
import { ExpenseItem } from "../../../../application/api/customer/schema";

export const InformationReviewResolveSchema = z.object({
  incomeAmount: z.number().optional(),
  essentialItems: z.array(ExpenseItemSchema).optional(),
  financialLoanItems: z.array(ExpenseItemSchema).optional(),
  subscriptionItems: z.array(ExpenseItemSchema).optional(),
});

export const InformationReviewExecuteInputSchema = z.object({
  incomeAmount: z.number(),
  essentialItems: z.array(ExpenseItemSchema),
  financialLoanItems: z.array(ExpenseItemSchema),
  subscriptionItems: z.array(ExpenseItemSchema),
});

export const InformationReviewExecuteOutputSchema = z.object({
  incomeAmount: z.number().optional(),
  screen: z.literal("InformationReviewScreen"),
  essentialItems: z.array(ExpenseItemSchema),
  financialLoanItems: z.array(ExpenseItemSchema),
  subscriptionItems: z.array(ExpenseItemSchema),
});

export type InformationReviewResolveInput = z.infer<
  typeof InformationReviewResolveSchema
>;

export type InformationReviewResolveOutput = z.infer<
  typeof InformationReviewResolveSchema
>;

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
  InformationReviewResolveInput,
  InformationReviewResolveOutput
> {
  static readonly NODE_ID = "InformationReview";
  readonly executeInputSchema = InformationReviewExecuteInputSchema;
  readonly executeOutputSchema = InformationReviewExecuteOutputSchema;
  readonly resolveInputSchema = InformationReviewResolveSchema;
  readonly resolveOutputSchema = noInputSchema;

  constructor() {
    super(InformationReviewNode.NODE_ID);
  }

  async executionAction(
    input: InformationReviewExecuteInput,
  ): Promise<InformationReviewExecuteOutput> {
    return {
      incomeAmount: input.incomeAmount,
      screen: ApplicationScreen.InformationReviewScreen,
      essentialItems: input.essentialItems,
      financialLoanItems: input.financialLoanItems,
      subscriptionItems: input.subscriptionItems,
    };
  }

  async resolutionAction(
    input: InformationReviewResolveInput,
  ): Promise<InformationReviewResolveOutput> {
    return {
      incomeAmount: input.incomeAmount,
      essentialItems: this.mapExpenseItems(input.essentialItems),
      financialLoanItems: this.mapExpenseItems(input.financialLoanItems),
      subscriptionItems: this.mapExpenseItems(input.subscriptionItems),
    };
  }

  private mapExpenseItems(items?: ExpenseItem[]): ExpenseItem[] | undefined {
    return items?.map((item) => ({
      name: item.name,
      amount: item.amount,
      source: item.source,
    }));
  }

  async determineOutputPin(context: NoInput) {
    return "outputNavigationPin";
  }
}
