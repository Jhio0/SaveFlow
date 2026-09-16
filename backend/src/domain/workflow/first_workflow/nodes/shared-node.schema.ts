import z from "zod";
import { ExpenseSource } from "../../../entities/collected-expsense-data";

export const ExpenseResolveSchema = z.object({
  items: z.array(
    z.object({
      name: z.string(),
      amount: z.number(),
      source: z.enum(ExpenseSource),
    }),
  ),
});

export const noInputSchema = z.object({});
