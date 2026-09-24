/** Internal type. DO NOT USE DIRECTLY. */
type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** Internal type. DO NOT USE DIRECTLY. */
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
import type { TypedDocumentNode as DocumentNode } from "@graphql-typed-document-node/core";
export type ApplicationScreen =
  | "CompletedScreen"
  | "EssentialExpenseScreen"
  | "FinancialLoanExpenseScreen"
  | "IncomeDetailScreen"
  | "InformationReviewScreen"
  | "SubscriptionExpenseScreen";

export type CollectIncomeApplicationInput = {
  applicationId: string | number;
  incomeAmount: number;
};

export type SubmitCollectIncomeScreenMutationVariables = Exact<{
  input: CollectIncomeApplicationInput;
}>;

export type SubmitCollectIncomeScreenMutation = {
  submitCollectIncomeScreen:
    | { __typename: "CollectIncomePayload"; screen: ApplicationScreen }
    | { __typename: "CompletedPayload" }
    | { __typename: "EssentialExpensePayload"; screen: ApplicationScreen }
    | { __typename: "FinancialLoanExpensePayload" }
    | { __typename: "InformationReviewPayload" }
    | { __typename: "SubscriptionExpensePayload" };
};

export const SubmitCollectIncomeScreenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SubmitCollectIncomeScreen" },
      variableDefinitions: [
        {
          kind: "VariableDefinition",
          variable: {
            kind: "Variable",
            name: { kind: "Name", value: "input" },
          },
          type: {
            kind: "NonNullType",
            type: {
              kind: "NamedType",
              name: { kind: "Name", value: "CollectIncomeApplicationInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "submitCollectIncomeScreen" },
            arguments: [
              {
                kind: "Argument",
                name: { kind: "Name", value: "input" },
                value: {
                  kind: "Variable",
                  name: { kind: "Name", value: "input" },
                },
              },
            ],
            selectionSet: {
              kind: "SelectionSet",
              selections: [
                { kind: "Field", name: { kind: "Name", value: "__typename" } },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "CollectIncomePayload" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "screen" },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "EssentialExpensePayload" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "screen" },
                      },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  SubmitCollectIncomeScreenMutation,
  SubmitCollectIncomeScreenMutationVariables
>;
