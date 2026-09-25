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

export type ExpenseApplicationInput = {
  applicationId: string | number;
  items: Array<ExpenseItemsInput>;
};

export type ExpenseItemsInput = {
  amount: number;
  name: string;
  source: ExpenseSource;
};

export type ExpenseSource = "ESSENTIALS" | "FINANCIAL_LOAN" | "SUBSCRIPTION";

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

export type SubmitEssentialExpenseScreenMutationVariables = Exact<{
  input: ExpenseApplicationInput;
}>;

export type SubmitEssentialExpenseScreenMutation = {
  submitEssentialExpenseScreen:
    | { __typename: "CollectIncomePayload" }
    | { __typename: "CompletedPayload"; screen: ApplicationScreen }
    | { __typename: "EssentialExpensePayload"; screen: ApplicationScreen }
    | { __typename: "FinancialLoanExpensePayload"; screen: ApplicationScreen }
    | {
        __typename: "InformationReviewPayload";
        screen: ApplicationScreen;
        essentialItems: Array<{
          name: string;
          amount: number;
          source: ExpenseSource;
        }>;
        financialLoanItems: Array<{
          name: string;
          amount: number;
          source: ExpenseSource;
        }>;
        subscriptionItems: Array<{
          name: string;
          amount: number;
          source: ExpenseSource;
        }>;
      }
    | { __typename: "SubscriptionExpensePayload"; screen: ApplicationScreen };
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
export const SubmitEssentialExpenseScreenDocument = {
  kind: "Document",
  definitions: [
    {
      kind: "OperationDefinition",
      operation: "mutation",
      name: { kind: "Name", value: "SubmitEssentialExpenseScreen" },
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
              name: { kind: "Name", value: "ExpenseApplicationInput" },
            },
          },
        },
      ],
      selectionSet: {
        kind: "SelectionSet",
        selections: [
          {
            kind: "Field",
            name: { kind: "Name", value: "submitEssentialExpenseScreen" },
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
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: {
                      kind: "Name",
                      value: "FinancialLoanExpensePayload",
                    },
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
                    name: { kind: "Name", value: "SubscriptionExpensePayload" },
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
                    name: { kind: "Name", value: "InformationReviewPayload" },
                  },
                  selectionSet: {
                    kind: "SelectionSet",
                    selections: [
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "screen" },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "essentialItems" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "amount" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "source" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "financialLoanItems" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "amount" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "source" },
                            },
                          ],
                        },
                      },
                      {
                        kind: "Field",
                        name: { kind: "Name", value: "subscriptionItems" },
                        selectionSet: {
                          kind: "SelectionSet",
                          selections: [
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "name" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "amount" },
                            },
                            {
                              kind: "Field",
                              name: { kind: "Name", value: "source" },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: "InlineFragment",
                  typeCondition: {
                    kind: "NamedType",
                    name: { kind: "Name", value: "CompletedPayload" },
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
  SubmitEssentialExpenseScreenMutation,
  SubmitEssentialExpenseScreenMutationVariables
>;
