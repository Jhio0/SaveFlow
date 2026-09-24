// model/CollectPresetExpenses.ts
export type PresetExpenseCategory = {
  id: string;
  name: string;
  enabled: boolean;
  amount: number | null;
  source: "preset" | "custom";
};

export type CollectPresetExpenses = {
  categories: PresetExpenseCategory[];
};
