import { ExpensesScreen } from "@/feature/expenses-categories/view/expense-screen";
import { useFinancialLoanExpensesViewModel } from "@/feature/expenses-categories/viewModel/financial-expense/financialExpenseViewModal";

import { SCREEN_TO_ROUTE } from "@/feature/helper/screenRouteMapper";
import { router, useLocalSearchParams } from "expo-router";

export default function FinancialLoanExpensesRoute() {
  const { applicationId } = useLocalSearchParams<{
    applicationId: "6ab7475c3f3bc3ff7d616948";
  }>();
  const vm = useFinancialLoanExpensesViewModel(applicationId);

  const handleSubmit = async () => {
    const nextScreen = await vm.submit();
    console.log("nextScreen:", nextScreen); // ← add this

    if (nextScreen) {
      const route = SCREEN_TO_ROUTE[nextScreen];
      console.log("resolved route:", route); // ← add this

      router.push({
        pathname: route,
        params: { applicationId },
      });
    } else {
      console.log("nextScreen was falsy — not navigating");
    }
  };
  return (
    <ExpensesScreen
      stepLabel="Step 4 of 4"
      title="Any loan payments?"
      categories={vm.categories}
      onToggleCategory={vm.onToggleCategory}
      onAmountChange={vm.onAmountChange}
      onAddCustomCategory={vm.onAddCustomCategory}
      onRemoveCategory={vm.onRemoveCategory}
      onSubmit={handleSubmit}
      canSubmit={vm.hasAtLeastOneAmount}
    />
  );
}
