import { useMutation } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { useState } from "react";

import { SCREEN_TO_ROUTE } from "@/feature/helper/screenRouteMapper";
import { SubmitCollectIncomeScreenDocument } from "@/network/__generated__/graphql";

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
          applicationId: "6ab5cb40466505ea78f1f663",
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
