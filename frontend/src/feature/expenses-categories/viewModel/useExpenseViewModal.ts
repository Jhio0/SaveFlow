// viewModels/useExpensesViewModel.ts
import { ExpenseSource } from "@/network/__generated__/graphql";
import { useState } from "react";
import { ExpenseCategory, ExpenseItem } from "../model/expense";

interface UseExpensesViewModelParams<TResult> {
  defaultCategories: ExpenseCategory[];
  source: ExpenseSource;
  onSubmit: (items: ExpenseItem[]) => Promise<TResult>;
}

export function useExpensesViewModel<TResult>({
  defaultCategories,
  source,
  onSubmit,
}: UseExpensesViewModelParams<TResult>) {
  const [categories, setCategories] =
    useState<ExpenseCategory[]>(defaultCategories);

  const onToggleCategory = (id: string) => {
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id
          ? {
              ...category,
              enabled: !category.enabled,
              amount: !category.enabled ? category.amount : null,
            }
          : category,
      ),
    );
  };

  const onAmountChange = (id: string, value: string) => {
    const parsed = value === "" ? null : Number(value);
    setCategories((prev) =>
      prev.map((category) =>
        category.id === id ? { ...category, amount: parsed } : category,
      ),
    );
  };

  const onAddCustomCategory = (name: string) => {
    const newCategory: ExpenseCategory = {
      id: `custom_${Date.now()}`,
      name,
      enabled: true,
      amount: null,
      source,
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const onRemoveCategory = (id: string) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  const hasAtLeastOneAmount = categories.some(
    (c) => c.enabled && c.amount !== null && c.amount > 0,
  );

  const submit = async () => {
    const items: ExpenseItem[] = categories
      .filter((c) => c.enabled && c.amount !== null)
      .map((c) => ({ name: c.name, amount: c.amount!, source }));

    return onSubmit(items);
  };

  return {
    categories,
    onToggleCategory,
    onAmountChange,
    onAddCustomCategory,
    onRemoveCategory,
    hasAtLeastOneAmount,
    submit,
  };
}
