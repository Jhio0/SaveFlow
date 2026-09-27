import { ExpensesScreen } from "@/feature/expenses-categories/view/expense-screen";
import { useSubscriptionExpensesViewModel } from "@/feature/expenses-categories/viewModel/subscription-expense/subscriptionExpenseViewModal";
import { SCREEN_TO_ROUTE } from "@/feature/helper/screenRouteMapper";
import { router, useLocalSearchParams } from "expo-router";

export default function SubscriptionExpensesRoute() {
  const { applicationId } = useLocalSearchParams<{ applicationId: string }>();
  const vm = useSubscriptionExpensesViewModel(applicationId);

  const handleSubmit = async () => {
    const payload = await vm.submit();
    if (!payload || !("screen" in payload) || !payload.screen) {
      console.log("no screen on payload — not navigating");
      return;
    }

    const route = SCREEN_TO_ROUTE[payload.screen];

    if (!route) {
      console.log("no route");
      return;
    }

    router.push({
      pathname: route,
      params: {
        applicationId,
        ...(payload.__typename === "InformationReviewPayload" && {
          incomeAmount: payload.incomeAmount?.toString(),
          essentialItems: JSON.stringify(payload.essentialItems ?? []),
          financialLoanItems: JSON.stringify(payload.financialLoanItems ?? []),
          subscriptionItems: JSON.stringify(payload.subscriptionItems ?? []),
        }),
      },
    });
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
