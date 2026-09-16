import { invertMap } from "myLibrary";
import { CollectIncomeNode } from "../workflow/first_workflow/nodes/collect-income.node";
import { ApplicationScreen } from "./application";
import { EssentialExpenseNode } from "../workflow/first_workflow/nodes/essential-expense-node";

export const screenToNodeId: Record<ApplicationScreen, string> = {
  [ApplicationScreen.IncomeDetailScreen]: CollectIncomeNode.NODE_ID,
  [ApplicationScreen.EssentialExpenseScreen]: EssentialExpenseNode.NODE_ID,
  [ApplicationScreen.CompletedScreen]: "asdsa",
};

export const nodeIdToScreen: Record<string, ApplicationScreen> =
  invertMap(screenToNodeId);
