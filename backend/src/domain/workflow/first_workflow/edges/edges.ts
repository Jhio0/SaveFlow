import { Workflow } from "myLibrary";
import { WorkflowNodes } from "../nodes";

export function registerEdges(workflow: Workflow, nodes: WorkflowNodes): void {
  workflow.addEdge({
    sourceNodeId: nodes.start.id,
    sourcePinId: "outputNavigationPin",
    targetNodeId: nodes.collectIncome.id,
    targetPinId: "inputNavigationPin",
  });

  workflow.addEdge({
    sourceNodeId: nodes.collectIncome.id,
    sourcePinId: "outputNavigationPin",
    targetNodeId: nodes.essentialExpense.id,
    targetPinId: "inputNavigationPin",
  });

  workflow.addEdge({
    sourceNodeId: nodes.essentialExpense.id,
    sourcePinId: "outputNavigationPin",
    targetNodeId: nodes.end.id,
    targetPinId: "inputNavigationPin",
  });
}
