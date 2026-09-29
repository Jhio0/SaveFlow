// viewModels/createExpenseViewModel.ts
import { ExpenseSource } from "@/network/__generated__/graphql";
import { OperationVariables } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { ExpenseCategory, ExpenseItem } from "../model/expense";
import { useExpensesViewModel } from "./useExpenseViewModal";

interface ExpenseViewModelOptions {
  initialItems?: ExpenseItem[];
}

interface CreateExpenseViewModelParams<
  TData,
  TVariables extends OperationVariables,
  TPayload,
> {
  mutationDocument: TypedDocumentNode<TData, TVariables>;
  source: ExpenseSource;
  defaultCategories: ExpenseCategory[];
  buildVariables: (applicationId: string, items: ExpenseItem[]) => TVariables;
  getPayload: (data: TData | null | undefined) => TPayload;
}

export function createExpenseViewModel<
  TData,
  TVariables extends OperationVariables,
  TPayload,
>({
  mutationDocument,
  source,
  defaultCategories,
  buildVariables,
  getPayload,
}: CreateExpenseViewModelParams<TData, TVariables, TPayload>) {
  return function useExpenseScreenViewModel(
    applicationId: string,
    options: ExpenseViewModelOptions = {},
  ) {
    const [submitMutation, { loading, error }] = useMutation(mutationDocument);

    const vm = useExpensesViewModel<TPayload>({
      defaultCategories,
      source,
      initialItems: options.initialItems,
      onSubmit: async (items) => {
        const result = await submitMutation({
          variables: buildVariables(applicationId, items),
        });

        const payload = getPayload(result.data);

        return payload;
      },
    });

    return { ...vm, loading, error };
  };
}
