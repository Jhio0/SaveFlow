// viewModels/useCollectPresetExpensesViewModel.ts
import { useState } from "react";
import { PresetExpenseCategory } from "../models/essential-expense";

const DEFAULT_CATEGORIES: PresetExpenseCategory[] = [
  { id: "rent", name: "Rent", enabled: false, amount: null, source: "preset" },
  { id: "car", name: "Car", enabled: false, amount: null, source: "preset" },
  {
    id: "insurance",
    name: "Insurance",
    enabled: false,
    amount: null,
    source: "preset",
  },
  {
    id: "grocery",
    name: "Grocery",
    enabled: false,
    amount: null,
    source: "preset",
  },
  {
    id: "phone",
    name: "Phone",
    enabled: false,
    amount: null,
    source: "preset",
  },
  {
    id: "going_out",
    name: "Going out",
    enabled: false,
    amount: null,
    source: "preset",
  },
  {
    id: "student_loan",
    name: "Student loan",
    enabled: false,
    amount: null,
    source: "preset",
  },
];

export function useCollectPresetExpensesViewModel() {
  const [categories, setCategories] =
    useState<PresetExpenseCategory[]>(DEFAULT_CATEGORIES);

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
      source: "custom",
    };
    setCategories((prev) => [...prev, newCategory]);
  };

  const submit = () => {
    const enabledCategories = categories.filter((c) => c.enabled);
    console.log("Preset expenses:", enabledCategories);
  };

  return {
    categories,
    onToggleCategory,
    onAmountChange,
    onAddCustomCategory,
    submit,
  };
}
