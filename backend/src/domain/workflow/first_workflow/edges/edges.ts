import { Workflow } from "myLibrary";
import { WorkflowNodes } from "../nodes";

export function registerEdges(workflow: Workflow, nodes: WorkflowNodes): void {
  workflow.addEdge({
    sourceNodeId: nodes.start.id,
    sourcePinId: "outputNavigationPin",
    targetNodeId: nodes.fetch.id,
    targetPinId: "inputNavigationPin",
  });

  workflow.addEdge({
    sourceNodeId: nodes.fetch.id,
    sourcePinId: "outputNavigationPin",
    targetNodeId: nodes.print.id,
    targetPinId: "inputNavigationPin",
  });

  workflow.addEdge({
    sourceNodeId: nodes.print.id,
    sourcePinId: "outputNavigationPin",
    targetNodeId: nodes.end.id,
    targetPinId: "inputNavigationPin",
  });
}
