export type PresetExpenseCategory = {
  id: string;
  name: string;
  enabled: boolean;
  amount: number | null;
  source: "ESSENTIALS";
};

export type CollectPresetExpenses = {
  categories: PresetExpenseCategory[];
};
