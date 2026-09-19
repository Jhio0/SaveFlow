import { WorkflowContext } from "myLibrary";

export enum ApplicationStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum ApplicationScreen {
  IncomeDetailScreen = "IncomeDetailScreen",
  EssentialExpenseScreen = "EssentialExpenseScreen",
  FinancialLoanExpenseScreen = "FinancialLoanExpenseScreen",
  SubscriptionExpenseScreen = "SubscriptionExpenseScreen",
  InformationReviewScreen = "InformationReviewScreen",
  CompletedScreen = "CompletedScreen",
}

export type ApplicationPayload = {
  screen: ApplicationScreen;
  context: WorkflowContext;
};

export interface Application {
  id: string;
  userId: string;
  workflowContext: {
    context: any;
    currentNodeId: string;
  };
  screen?: string;
  status: ApplicationStatus;
  submittedAt?: Date;
}
