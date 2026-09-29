import { navigateFromPayload } from "@/feature/helper/buildNextRouteParam";
import { parseJsonParam } from "@/feature/helper/parseJsonParam";
import {
  ExpenseSource,
  SubmitInformationReviewScreenDocument,
} from "@/network/__generated__/graphql";
import { useMutation } from "@apollo/client/react";
import { useLocalSearchParams, useRouter } from "expo-router";

type ExpenseItem = {
  name: string;
  amount: number;
  source: ExpenseSource;
};

export function useInformationReviewViewModel() {
  const router = useRouter();

  const params = useLocalSearchParams<{
    applicationId: string;
    incomeAmount?: string;
    essentialItems?: string;
    financialLoanItems?: string;
    subscriptionItems?: string;
  }>();

  const applicationId = params.applicationId;

  const incomeAmount = params.incomeAmount ? Number(params.incomeAmount) : null;

  const essentialItems = parseJsonParam<ExpenseItem[]>(
    params.essentialItems,
    [],
  ).map(({ name, amount, source }) => ({
    name,
    amount,
    source,
  }));

  const financialLoanItems = parseJsonParam<ExpenseItem[]>(
    params.financialLoanItems,
    [],
  ).map(({ name, amount, source }) => ({
    name,
    amount,
    source,
  }));

  const subscriptionItems = parseJsonParam<ExpenseItem[]>(
    params.subscriptionItems,
    [],
  ).map(({ name, amount, source }) => ({
    name,
    amount,
    source,
  }));

  const [submitReview, { loading, error }] = useMutation(
    SubmitInformationReviewScreenDocument,
  );

  const totalExpenses =
    essentialItems.reduce((s, i) => s + i.amount, 0) +
    financialLoanItems.reduce((s, i) => s + i.amount, 0) +
    subscriptionItems.reduce((s, i) => s + i.amount, 0);

  const moneyLeft = (incomeAmount ?? 0) - totalExpenses;

  const editParams = {
    applicationId,
    editing: "true",
    incomeAmount: incomeAmount?.toString(),
    essentialItems: JSON.stringify(essentialItems),
    financialLoanItems: JSON.stringify(financialLoanItems),
    subscriptionItems: JSON.stringify(subscriptionItems),
  };

  const editIncome = () => {
    router.push({
      pathname: "/screens/income-screen",
      params: editParams,
    });
  };

  const editEssentialExpenses = () => {
    router.push({
      pathname: "/screens/essential-expense-screen",
      params: editParams,
    });
  };

  const editFinancialLoanExpenses = () => {
    router.push({
      pathname: "/screens/financial-loan-expense-screen",
      params: editParams,
    });
  };

  const editSubscriptions = () => {
    router.push({
      pathname: "/screens/subscription-expense-screen",
      params: editParams,
    });
  };

  const submit = async () => {
    if (!applicationId) return;

    const result = await submitReview({
      variables: {
        input: {
          applicationId,
          incomeAmount,
          essentialItems: essentialItems,
          financialLoanItems: financialLoanItems,
          subscriptionItems: subscriptionItems,
        },
      },
    });

    navigateFromPayload(
      router,
      applicationId,
      result.data?.submitInformationReviewScreen,
    );
  };

  return {
    incomeAmount,
    essentialItems,
    financialLoanItems,
    subscriptionItems,
    totalExpenses,
    moneyLeft,
    editIncome,
    editEssentialExpenses,
    editFinancialLoanExpenses,
    editSubscriptions,
    submit,
    isSubmitting: loading,
    submitError: error,
  };
}
