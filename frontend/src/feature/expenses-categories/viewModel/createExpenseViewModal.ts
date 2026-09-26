// viewModels/createExpenseViewModel.ts
import { ExpenseSource } from "@/network/__generated__/graphql";
import { OperationVariables } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import { ExpenseCategory, ExpenseItem } from "../model/expense";
import { useExpensesViewModel } from "./useExpenseViewModal";

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
  return function useExpenseScreenViewModel(applicationId: string) {
    const [submitMutation, { loading, error }] = useMutation(mutationDocument);

    const vm = useExpensesViewModel<TPayload>({
      defaultCategories,
      source,
      onSubmit: async (items) => {
        const result = await submitMutation({
          variables: buildVariables(applicationId, items),
        });

        console.log(
          "expense mutation result:",
          JSON.stringify(result, null, 2),
        ); // ← add this

        const payload = getPayload(result.data);
        console.log("extracted payload:", payload); // ← add this

        return payload;
      },
    });

    return { ...vm, loading, error };
  };
}
