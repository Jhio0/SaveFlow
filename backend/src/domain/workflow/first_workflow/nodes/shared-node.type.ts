import z from "zod";

export const noInputSchema = z.object({});

export const ExpenseItemSchema = z.object({
  name: z.string(),
  amount: z.number(),
  source: z.string(),
});

export const ExpenseResolveInputSchema = z.object({
  items: z.array(ExpenseItemSchema),
});

export type ExpenseResolveInput = z.infer<typeof ExpenseResolveInputSchema>;
