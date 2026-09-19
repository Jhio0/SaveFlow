export enum ApplicationStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum ApplicationScreen {
  IncomeDetailScreen = "IncomeDetailScreen",
  EssentialExpenseScreen = "EssentialExpenseScreen",
  FinancialLoanExpenseScreen = "FinancialLoanExpenseScreen",
  CompletedScreen = "CompletedScreen",
}

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
