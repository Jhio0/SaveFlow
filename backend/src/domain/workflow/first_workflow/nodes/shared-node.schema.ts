import z from "zod";
import { ExpenseSource } from "../../../entities/collected-expsense-data";

export const ExpenseResolveInputSchema = z.object({
  name: z.string(),
  amount: z.number(),
  source: z.enum(ExpenseSource),
});

export type ExpenseResolveInput = z.infer<typeof ExpenseResolveInputSchema>;

export const noInputSchema = z.object({});
