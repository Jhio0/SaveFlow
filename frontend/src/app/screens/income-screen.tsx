import { useLocalSearchParams } from "expo-router";

import { CollectIncomeScreen } from "@/feature/collect-income/views/collect-income-screen";

export default function IncomeRoute() {
  const { applicationId } = useLocalSearchParams<{ applicationId: string }>();

  return <CollectIncomeScreen applicationId={applicationId} />;
}
