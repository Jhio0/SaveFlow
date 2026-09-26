import { ExpensesScreen } from "@/feature/expenses-categories/view/expense-screen";
import { useSubscriptionExpensesViewModel } from "@/feature/expenses-categories/viewModel/subscription-expense/subscriptionExpenseViewModal";
import { SCREEN_TO_ROUTE } from "@/feature/helper/screenRouteMapper";
import { router, useLocalSearchParams } from "expo-router";

export default function SubscriptionExpensesRoute() {
  const { applicationId } = useLocalSearchParams<{
    applicationId: "6ab7475c3f3bc3ff7d616948";
  }>();
  const vm = useSubscriptionExpensesViewModel(applicationId);

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
      stepLabel="Step 3 of 4"
      title="Any subscriptions to track?"
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
