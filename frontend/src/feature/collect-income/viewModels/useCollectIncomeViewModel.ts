import { useMutation } from "@apollo/client/react";
import { useRouter } from "expo-router";
import { useState } from "react";

import { SCREEN_TO_ROUTE } from "@/feature/helper/screenRouteMapper";
import { SubmitCollectIncomeScreenDocument } from "@/network/__generated__/graphql";

interface IncomeViewModelOptions {
  editing?: boolean;
  initialIncomeAmount?: string;
  essentialItems?: string;
  financialLoanItems?: string;
  subscriptionItems?: string;
}

export function useCollectIncomeViewModel(
  applicationId: string,
  options: IncomeViewModelOptions = {},
) {
  const router = useRouter();

  const {
    editing = false,
    initialIncomeAmount = "",
    essentialItems,
    financialLoanItems,
    subscriptionItems,
  } = options;

  const [incomeAmount, setIncomeAmount] = useState(initialIncomeAmount ?? "");

  const [submitIncome, { loading, error }] = useMutation(
    SubmitCollectIncomeScreenDocument,
  );

  const onIncomeAmountChange = (value: string) => {
    setIncomeAmount(value);
  };

  const submit = async () => {
    // EDIT MODE
    if (editing) {
      router.replace({
        pathname: "/screens/information-review-screen",
        params: {
          applicationId,
          incomeAmount,
          essentialItems,
          financialLoanItems,
          subscriptionItems,
        },
      });

      return;
    }

    const result = await submitIncome({
      variables: {
        input: {
          applicationId,
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
          params: {
            applicationId: payload.applicationId,
          },
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
