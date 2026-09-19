// application-payload.ts
import { WorkflowContext } from "myLibrary";
import { ApplicationScreen as DomainScreen } from "../../../../../../../domain/entities/application";
import { InformationReviewExecuteOutput } from "../../../../../../../domain/workflow/first_workflow/nodes/information-review.node";
import {
  ApplicationScreen as SchemaScreen,
  ApplicationPayload as SchemaApplicationPayload,
} from "../../../../schema";

import {
  mapDomainToSchemaScreen,
  mapExpenseItems,
} from "./screen-source.mapper";

// ---- Union type resolution ----

const screenToTypename: Record<SchemaScreen, string> = {
  [SchemaScreen.IncomeDetailScreen]: "CollectIncomePayload",
  [SchemaScreen.EssentialExpenseScreen]: "EssentialExpensePayload",
  [SchemaScreen.FinancialLoanExpenseScreen]: "FinancialLoanExpensePayload",
  [SchemaScreen.SubscriptionExpenseScreen]: "SubscriptionExpensePayload",
  [SchemaScreen.InformationReviewScreen]: "InformationReviewPayload",
  [SchemaScreen.CompletedScreen]: "CompletedPayload",
};

export const ApplicationPayload = {
  __resolveType(obj: { screen: SchemaScreen }) {
    const typename = screenToTypename[obj.screen];
    if (!typename) {
      throw new Error(
        `No payload typename registered for screen: ${obj.screen}`,
      );
    }
    return typename;
  },
};

// ---- Per-screen payload builders ----

function buildDefaultScreenPayload(
  schemaScreen: SchemaScreen,
): SchemaApplicationPayload {
  return { screen: schemaScreen };
}

function buildInformationReviewPayload(
  schemaScreen: SchemaScreen,
  context: WorkflowContext,
): SchemaApplicationPayload {
  return {
    screen: schemaScreen,
    essentialItems: mapExpenseItems(context.essentialItems),
    financialLoanItems: mapExpenseItems(context.financialLoanItems),
    subscriptionItems: mapExpenseItems(context.subscriptionItems),
  };
}

// ---- Handler result -> schema payload (dispatch only) ----

export type HandlerResult = {
  screen: DomainScreen;
  context: WorkflowContext;
};

export function buildApplicationPayload(
  result: HandlerResult,
): SchemaApplicationPayload {
  const schemaScreen = mapDomainToSchemaScreen(result.screen);

  switch (result.screen) {
    case DomainScreen.InformationReviewScreen:
      return buildInformationReviewPayload(schemaScreen, result.context);

    case DomainScreen.EssentialExpenseScreen:
    case DomainScreen.FinancialLoanExpenseScreen:
    case DomainScreen.IncomeDetailScreen:
    case DomainScreen.SubscriptionExpenseScreen:
    case DomainScreen.CompletedScreen:
      return buildDefaultScreenPayload(schemaScreen);

    default:
      throw new Error(
        `buildApplicationPayload: unhandled screen ${result.screen}`,
      );
  }
}
