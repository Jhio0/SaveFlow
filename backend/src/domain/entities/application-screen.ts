import { invertMap } from "myLibrary";

export enum ApplicationScreen {
  IncomeDetailScreen = "IncomeDetailScreen",
}

export const screenToNodeId: Record<ApplicationScreen, string> = {
  [ApplicationScreen.IncomeDetailScreen]: "exampleforNow", //nodeId
};

export const nodeIdToScreen: Record<string, ApplicationScreen> =
  invertMap(screenToNodeId);
