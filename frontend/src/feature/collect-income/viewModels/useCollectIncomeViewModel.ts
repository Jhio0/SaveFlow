import { useMutation } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { useState } from "react";

import { SCREEN_TO_ROUTE } from "@/feature/helper/screenRouteMapper";
import { SubmitCollectIncomeScreenDocument } from "@/network/__generated__/graphql";

const APPLICATION_ID = "6ab74f4e3f3bc3ff7d6169ac"; // TODO: replace with real createApplication result

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
          applicationId: APPLICATION_ID,
          incomeAmount: Number(incomeAmount),
        },
      },
    });

    const payload = result.data?.submitCollectIncomeScreen;

    if (payload && "screen" in payload) {
      const route = SCREEN_TO_ROUTE[payload.screen];
      if (route) {
        router.push({
          pathname: route,
          params: { applicationId: APPLICATION_ID }, // ← forward it
        });
      }
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
