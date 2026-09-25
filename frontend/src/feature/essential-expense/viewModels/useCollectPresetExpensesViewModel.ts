// viewModels/useCollectPresetExpensesViewModel.ts
import { SubmitEssentialExpenseScreenDocument } from "@/network/__generated__/graphql";
import { useMutation } from "@apollo/client/react";
import { useState } from "react";
import { PresetExpenseCategory } from "../models/essential-expense";

const DEFAULT_CATEGORIES: PresetExpenseCategory[] = [
  {
    id: "rent",
    name: "Rent",
    enabled: false,
    amount: null,
    source: "ESSENTIALS",
  },
  {
    id: "insurance",
    name: "Insurance",
    enabled: false,
    amount: null,
    source: "ESSENTIALS",
  },
  {
    id: "grocery",
    name: "Grocery",
    enabled: false,
    amount: null,
    source: "ESSENTIALS",
  },
  {
    id: "phone",
    name: "Phone",
    enabled: false,
    amount: null,
    source: "ESSENTIALS",
  },
];

export function useCollectPresetExpensesViewModel() {
  const [categories, setCategories] =
    useState<PresetExpenseCategory[]>(DEFAULT_CATEGORIES);

  const [submitEssentialExpenseScreen, { loading, error }] = useMutation(
    SubmitEssentialExpenseScreenDocument,
  );

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
    const newCategory: PresetExpenseCategory = {
      id: `custom_${Date.now()}`,
      name,
      enabled: true,
      amount: null,
      source: "ESSENTIALS",
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  // NEW — removes a category entirely, whether preset or custom
  const onRemoveCategory = (id: string) => {
    setCategories((prev) => prev.filter((category) => category.id !== id));
  };

  const submit = async () => {
    const enabledCategories = categories.filter(
      (category) => category.enabled && category.amount !== null,
    );

    const items = enabledCategories.map((category) => ({
      name: category.name,
      amount: category.amount!,
      source: "ESSENTIALS" as const,
    }));

    const result = await submitEssentialExpenseScreen({
      variables: {
        input: {
          applicationId: "6ab5cb40466505ea78f1f663",
          items,
        },
      },
    });

    const payload = result.data?.submitEssentialExpenseScreen;
  };

  return {
    categories,
    onToggleCategory,
    onAmountChange,
    onAddCustomCategory,
    onRemoveCategory,
    submit,
    loading,
    error,
  };
}
