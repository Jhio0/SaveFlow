// viewModels/useExpensesViewModel.ts
import { ExpenseSource } from "@/network/__generated__/graphql";
import { useState } from "react";
import { ExpenseCategory, ExpenseItem } from "../model/expense";

interface UseExpensesViewModelParams<TResult> {
  defaultCategories: ExpenseCategory[];
  source: ExpenseSource;
  initialItems?: ExpenseItem[];
  onSubmit: (items: ExpenseItem[]) => Promise<TResult>;
}

export function useExpensesViewModel<TResult>({
  defaultCategories,
  source,
  onSubmit,
  initialItems,
}: UseExpensesViewModelParams<TResult>) {
  const [categories, setCategories] = useState<ExpenseCategory[]>(() => {
    // No existing items → normal create mode
    if (!initialItems || initialItems.length === 0) {
      return defaultCategories;
    }

    // Existing items → edit mode
    return initialItems.map((item, index) => ({
      id: `${item.source}_${item.name}_${index}`,
      name: item.name,
      enabled: true,
      amount: item.amount,
      source: item.source,
    }));
  });

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

  const getItems = (): ExpenseItem[] => {
    return categories
      .filter((c) => c.enabled && c.amount !== null)
      .map((c) => ({
        name: c.name,
        amount: c.amount!,
        source,
      }));
  };

  const submit = async () => {
    const items = getItems();

    return onSubmit(items);
  };

  return {
    categories,
    onToggleCategory,
    onAmountChange,
    onAddCustomCategory,
    onRemoveCategory,
    hasAtLeastOneAmount,
    getItems,
    submit,
  };
}
