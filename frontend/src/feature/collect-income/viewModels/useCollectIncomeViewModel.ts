import { useMutation } from "@apollo/client/react";
import { Href, useRouter } from "expo-router";
import { useState } from "react";

import { SubmitCollectIncomeScreenDocument } from "@/network/__generated__/graphql";

const SCREEN_TO_ROUTE: Record<string, Href> = {
  IncomeDetailScreen: "/screens/income-screen",
  EssentialExpenseScreen: "/screens/essential-expense-screen",
};

export function useCollectIncomeViewModel() {
  const [incomeAmount, setIncomeAmount] = useState("");
  const router = useRouter();

  const [submitIncome, { loading, error }] = useMutation(
    SubmitCollectIncomeScreenDocument,
  );

  const onIncomeAmountChange = (value: string) => {
    setIncomeAmount(value);
  };

  const submit = async () => {
    const result = await submitIncome({
      variables: {
        input: {
          applicationId: "6ab5949e7031aff2b1c8a57e",
          incomeAmount: Number(incomeAmount),
        },
      },
    });

    const payload = result.data?.submitCollectIncomeScreen;

    if (payload && "screen" in payload) {
      const route = SCREEN_TO_ROUTE[payload.screen];
      if (route) router.push(route);
    }
  };

  return {
    incomeAmount,
    onIncomeAmountChange,
    submit,
    isSubmitting: loading,
    submitError: error,
  };
}
