import { CollectIncomeScreen } from "@/feature/collect-income/views/collect-income-screen";
import { useLocalSearchParams } from "expo-router";

export default function IncomeRoute() {
  const {
    applicationId,
    editing,
    incomeAmount,
    essentialItems,
    financialLoanItems,
    subscriptionItems,
  } = useLocalSearchParams<{
    applicationId: string;
    editing?: string;
    incomeAmount?: string;
    essentialItems?: string;
    financialLoanItems?: string;
    subscriptionItems?: string;
  }>();

  return (
    <CollectIncomeScreen
      applicationId={applicationId}
      editing={editing === "true"}
      initialIncomeAmount={incomeAmount}
      essentialItems={essentialItems}
      financialLoanItems={financialLoanItems}
      subscriptionItems={subscriptionItems}
    />
  );
}
