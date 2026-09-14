export enum ApplicationStatus {
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum ApplicationScreen {
  IncomeDetailScreen = "IncomeDetailScreen",
  CompletedScreen = "CompletedScreen",
}

export interface Application {
  id: string;
  userId: string;
  workflowContext: {
    context: any;
    currentNodeId: string;
  };
  status: ApplicationStatus;
  screen?: string;
  submittedAt?: Date;
}
